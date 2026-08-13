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

function wordCount(text) {
  return text.match(/[\p{L}\p{N}’.-]+/gu)?.length ?? 0;
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

test("renders a direct and distinctive engineering position", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const pageText = textContent(html);
  const hero = textContent(elementContent(html, "section", "top"));
  const title = textContent(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  assert.equal(title, "Sameer Awaji Product minded Software Engineer");
  assert.match(hero, /I build software\. I care whether it works outside the demo/i);
  assert.match(hero, /where product decisions and engineering meet/i);
  assert.match(hero, /QARAR at Mrasim/i);
  assert.match(pageText, /The question I keep coming back to/i);
  assert.match(html, /href=["']https:\/\/github\.com\/SameerAwaji["']/i);
});

test("keeps the entire portfolio in one coherent page", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assertInOrder(pageText, [
    "Selected work",
    "01 / QARAR",
    "02 / MIP",
    "03 / MAEEN",
    "A little more like me",
    "Experience",
    "Contact",
  ]);
  assert.match(html, /id=["']work["']/i);
  assert.match(html, /id=["']about["']/i);
  assert.match(html, /id=["']experience["']/i);
  assert.match(html, /id=["']contact["']/i);
  assert.doesNotMatch(html, /href=["']\/work\/qarar["']/i);
});

test("shows grounded QARAR ownership and evidence", async () => {
  const html = await (await render()).text();
  const project = textContent(elementContent(html, "article", "qarar"));

  assert.match(project, /Flutter client and Laravel API/i);
  assertInOrder(project, ["What I noticed", "What changed", "How I checked it"]);
  assert.match(project, /1,070 Flutter tests/i);
  assert.match(project, /696 Laravel tests/i);
  assert.match(project, /Live providers remain a separate check/i);
  assert.doesNotMatch(project, /ApiClient|TokenStorage|AccessTokenRotationService|last_id/i);

  for (const asset of [
    "qarar-login-clean.png",
    "qarar-home-clean.png",
    "qarar-decision-clean.png",
  ]) {
    assert.match(html, new RegExp(`projects\\/${asset.replace(".", "\\.")}`, "i"));
  }
});

test("makes the two live websites visual and concrete", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.match(html, /href=["']https:\/\/mipksa\.com["']/i);
  assert.match(html, /href=["']https:\/\/maeen\.com\.sa["']/i);
  assert.match(html, /projects\/mip-home\.png/i);
  assert.match(html, /projects\/maeen-home\.png/i);
  assert.match(pageText, /led marketing at MIP and rebuilt the agency website/i);
  assert.match(pageText, /public website, enquiry forms, and internal tools/i);
  assert.match(pageText, /teach AI activities for students aged 15–18/i);
  assert.doesNotMatch(pageText, /77.*100|4\.8|0\.8|60\+ users/i);
});

test("sounds personal without a generic personality inventory", async () => {
  const html = await (await render()).text();
  const about = textContent(elementContent(html, "section", "about"));

  assert.match(about, /I’m thoughtful before I’m loud/i);
  assert.match(about, /engineering, product, marketing, and teaching/i);
  assert.match(about, /I use AI in almost everything I build/i);
  assert.match(about, /I don’t treat its answer as proof/i);
  assert.match(about, /I learn by building/i);
  assert.match(about, /Calm over noise\. Direct over impressive/i);
  assert.match(about, /Eminem.*Billie Eilish.*Sherine.*Abdel Halim/i);
  assert.doesNotMatch(about, /Intellection|Achiever|Responsibility|Harmony|Relator|DISC/i);
  assert.doesNotMatch(about, /innovative|passionate|results-driven|unique blend|leverage AI/i);
});

test("keeps the full experience path and education", async () => {
  const html = await (await render()).text();
  const experience = textContent(elementContent(html, "section", "experience"));

  assertInOrder(experience, ["Mrasim", "MIP Marketing Agency", "Nana", "Maeen"]);
  assert.match(experience, /Bachelor of Software Engineering/i);
  assert.match(experience, /University of Jeddah/i);
  assert.match(experience, /4\.48 \/ 5\.0/i);
  assert.match(experience, /Developer & AI Tutor/i);
});

test("stays concise and avoids unsupported padding", async () => {
  const pageText = textContent(await (await render()).text());

  assert.ok(
    wordCount(pageText) < 650,
    `Expected homepage under 650 words, received ${wordCount(pageText)}`,
  );
  assert.doesNotMatch(pageText, /Automatic Marketing|While It Runs|Rescuel/i);
  assert.doesNotMatch(pageText, /repository commits|69 commits|29 commits/i);
  assert.doesNotMatch(pageText, /sameer2study@gmail\.com/i);
  assert.doesNotMatch(pageText, /Built, shipped, and visible/i);
  assert.doesNotMatch(pageText, /Looking for an engineer who can connect product and implementation/i);
});

test("redirects the old QARAR case-study route into the homepage story", async () => {
  const response = await render("/work/qarar");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/#qarar$/i);
});

test("contains no starter residue", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);
  const [pageSource, caseSource, layoutSource, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/work/qarar/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

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
    access(new URL("public/og-v4.png", projectRoot)),
    access(new URL("public/projects/mip-home.png", projectRoot)),
    access(new URL("public/projects/maeen-home.png", projectRoot)),
    access(new URL("public/projects/qarar-login-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-home-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-decision-clean.png", projectRoot)),
    access(new URL("app/icon.png", projectRoot)),
  ]);
});
