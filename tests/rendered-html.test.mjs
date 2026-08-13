import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'");
}

function textContent(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function elementContent(html, tag, id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const element = new RegExp(
    `<${tag}\\b(?=[^>]*\\bid=["']${escapedId}["'])[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    "i",
  ).exec(html);

  assert.ok(element, `Expected a <${tag}> with id="${id}"`);
  return element[1];
}

function assertInOrder(text, labels) {
  let previousIndex = -1;

  for (const label of labels) {
    const currentIndex = text.indexOf(label, previousIndex + 1);
    assert.ok(currentIndex >= 0, `Expected to find “${label}”`);
    assert.ok(currentIndex > previousIndex, `Expected “${label}” in order`);
    previousIndex = currentIndex;
  }
}

test("server-renders an honest early-career engineering position", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const pageText = textContent(html);
  const hero = textContent(elementContent(html, "section", "top"));
  const title = textContent(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  assert.equal(title, "Sameer Awaji Software Engineer");
  assert.match(hero, /product-minded software engineer/i);
  assert.match(hero, /early-career software engineer/i);
  assert.match(hero, /View the QARAR case study/i);
  assert.match(html, /href=["']https:\/\/github\.com\/SameerAwaji["']/i);
  assert.ok(
    pageText.indexOf("GitHub") < pageText.indexOf("Contact"),
    "Expected GitHub proof before the contact footer",
  );
});

test("removes the weekly changelog and vanity counts", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.doesNotMatch(pageText, /What changed this week/i);
  assert.doesNotMatch(pageText, /repository commits|69 commits|29 commits/i);
  assert.doesNotMatch(pageText, /1,014 Flutter tests/i);
  assert.doesNotMatch(pageText, /60\+ users/i);
  assert.doesNotMatch(pageText, /\bBoundary\b|\bScope\b/i);
});

test("makes MIP and Maeen visual live projects", async () => {
  const html = await (await render()).text();
  const liveWork = textContent(elementContent(html, "section", "live-work"));

  assertInOrder(liveWork, ["MIP", "Maeen"]);
  assert.match(html, /href=["']https:\/\/mipksa\.com["']/i);
  assert.match(html, /href=["']https:\/\/maeen\.com\.sa["']/i);
  assert.match(html, /projects\/mip-home\.png/i);
  assert.match(html, /projects\/maeen-home\.png/i);
  assert.match(liveWork, /77 to 100/i);
  assert.match(liveWork, /4\.8 seconds.*0\.8 seconds/i);
  assert.match(liveWork, /database-backed enquiry forms/i);
  assert.match(liveWork, /internal workflow dashboard/i);
});

test("ships a technical QARAR case study with architecture, trade-offs, and code", async () => {
  const response = await render("/work/qarar");
  assert.equal(response.status, 200);
  const html = await response.text();
  const pageText = textContent(html);

  assert.match(pageText, /Stabilizing a Flutter\/Laravel decision platform/i);
  assertInOrder(pageText, ["Architecture", "Engineering decisions", "Implementation patterns", "Validation"]);
  assert.match(pageText, /identity-bound session refresh|Bind refresh to identity/i);
  assert.match(pageText, /Retry only work that is safe to repeat/i);
  assert.match(pageText, /UTF-8 stream with a cursor/i);
  assert.match(pageText, /OpenAPI contract/i);
  assert.ok((html.match(/<pre>/gi) ?? []).length >= 2, "Expected two code excerpts");
  assert.ok((pageText.match(/Trade-off/g) ?? []).length >= 4, "Expected a trade-off for every decision");
});

test("uses device-only QARAR simulator captures and states their safe path", async () => {
  const html = await (await render("/work/qarar")).text();
  const pageText = textContent(html);

  for (const asset of [
    "qarar-splash-clean.png",
    "qarar-login-clean.png",
    "qarar-home-clean.png",
    "qarar-decision-clean.png",
    "qarar-account-clean.png",
  ]) {
    assert.match(html, new RegExp(`projects\\/${asset.replace(".", "\\.")}`, "i"));
  }

  assert.match(pageText, /non-sensitive first-run and guest states/i);
  assert.match(pageText, /stops before submitting a decision or entering an identifier/i);
  assert.match(pageText, /captured directly from iOS Simulator as device-only images/i);
});

test("keeps the full experience path and education", async () => {
  const html = await (await render()).text();
  const experience = textContent(elementContent(html, "section", "experience"));

  assertInOrder(experience, ["Mrasim", "MIP Marketing Agency", "Nana", "Maeen"]);
  assert.match(experience, /Bachelor of Software Engineering/i);
  assert.match(experience, /University of Jeddah/i);
  assert.match(experience, /4\.48 \/ 5\.0/i);
});

test("contains no starter residue or generic AI-tool claim", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);
  const [pageSource, caseSource, layoutSource, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/work/qarar/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

  assert.doesNotMatch(pageText, /\bAI tools?\b/i);
  assert.doesNotMatch(pageText, /\bConvex\b/i);
  assert.doesNotMatch(html, /\bcodex-preview\b|\b_sites-preview\b/i);
  assert.doesNotMatch(pageText, /Your site is taking shape|Building your site/i);
  assert.doesNotMatch(pageSource, /codex-preview|SkeletonPreview|_sites-preview/i);
  assert.doesNotMatch(caseSource, /codex-preview|SkeletonPreview|_sites-preview/i);
  assert.doesNotMatch(layoutSource, /Starter Project|codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);
});

test("ships the resume, social card, and project proof assets", async () => {
  await Promise.all([
    access(new URL("public/Sameer_Awaji_Resume.pdf", projectRoot)),
    access(new URL("public/og-v2.png", projectRoot)),
    access(new URL("public/projects/mip-home.png", projectRoot)),
    access(new URL("public/projects/maeen-home.png", projectRoot)),
    access(new URL("public/projects/qarar-splash-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-login-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-home-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-decision-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-account-clean.png", projectRoot)),
  ]);
});
