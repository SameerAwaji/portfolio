import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const clientDir = filePath(new URL("../dist/client/", import.meta.url));
const content = JSON.parse(await readFile(new URL("../content/portfolio.json", import.meta.url), "utf8"));

const workerUrl = pathToFileURL(filePath(new URL("../dist/server/index.js", import.meta.url)));
workerUrl.searchParams.set("prerender", String(Date.now()));
const { default: worker } = await import(workerUrl.href);

const routes = ["/", "/ar", "/robots.txt", "/sitemap.xml"];
for (const note of content.notes) {
  routes.push(`/notes/${note.slug}`, `/ar/notes/${note.slug}`);
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

for (const route of routes) {
  const response = await worker.fetch(new Request(`http://localhost${route}`), env, ctx);
  if (!response.ok) {
    throw new Error(`Prerender ${route} failed with HTTP ${response.status}`);
  }
  const file = outputFile(route);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}

const missing = await worker.fetch(new Request("http://localhost/not-a-page"), env, ctx);
if (missing.status === 404) {
  await writeFile(join(clientDir, "404.html"), Buffer.from(await missing.arrayBuffer()));
}

await copyFile(filePath(new URL("../app/icon.png", import.meta.url)), join(clientDir, "icon.png"));
console.log(`Wrote ${routes.length} routes into dist/client`);

function outputFile(route) {
  if (route === "/") return join(clientDir, "index.html");
  if (route.endsWith(".txt") || route.endsWith(".xml")) return join(clientDir, route.slice(1));
  return join(clientDir, route.slice(1), "index.html");
}

function filePath(url) {
  return decodeURIComponent(url.pathname);
}
