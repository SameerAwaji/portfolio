import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

function openingTagIndex(html, tag, id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.search(
    new RegExp(`<${tag}\\b(?=[^>]*\\bid=["']${escapedId}["'])[^>]*>`, "i"),
  );
}

function sectionContainingTextIndex(html, phrase) {
  const sections = html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi);

  for (const section of sections) {
    if (textContent(section[0]).includes(phrase)) {
      return section.index;
    }
  }

  return -1;
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

test("server-renders Sameer Awaji's engineering-first portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const title = textContent(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
  assert.equal(title, "Sameer Awaji Software Engineer");

  const hero = textContent(elementContent(html, "section", "top"));
  const heroHeading = textContent(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? "");
  assert.match(heroHeading, /\b(?:software|engineer(?:ing)?)\b/i);

  const softwareIndex = hero.search(/\b(?:software|engineer(?:ing)?)\b/i);
  const productIndex = hero.search(/\bproduct\b/i);
  assert.ok(softwareIndex >= 0, "Expected engineering to lead the hero");
  assert.ok(
    productIndex < 0 || softwareIndex < productIndex,
    "Expected engineering to appear before product in the hero",
  );
});

test("presents featured work in the approved order and evidence format", async () => {
  const html = await (await render()).text();
  const selectedWork = textContent(elementContent(html, "section", "work"));

  assertInOrder(selectedWork, ["QARAR", "MIP", "Maeen"]);

  for (const label of ["The problem", "My part", "Evidence", "Scope"]) {
    const occurrences = selectedWork.match(new RegExp(`\\b${label}\\b`, "gi")) ?? [];
    assert.ok(
      occurrences.length >= 3,
      `Expected “${label}” for each featured project`,
    );
  }
});

test("keeps experience ahead of process and separates employment from freelance work", async () => {
  const html = await (await render()).text();
  const experienceIndex = openingTagIndex(html, "section", "experience");
  const approachIndex = sectionContainingTextIndex(html, "How I work");

  assert.ok(experienceIndex >= 0, "Expected the experience section");
  assert.ok(approachIndex >= 0, "Expected the How I work section");
  assert.ok(experienceIndex < approachIndex, "Expected Experience before How I work");

  const experience = textContent(elementContent(html, "section", "experience"));
  assert.match(experience, /\bMrasim\b/i);
  assert.match(experience, /\bMIP\b/i);
  assert.match(experience, /\bNana\b/i);
  assert.match(experience, /\bMaeen\b/i);
  assert.match(experience, /\bfreelance\b/i);
  assert.match(experience, /(?:since\s+2023|2023\s*[–—-]\s*(?:present|current))/i);
});

test("states the Maeen metric conservatively", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.match(
    pageText,
    /dashboard\s+(?:was\s+)?(?:built|designed)\s+to\s+support\s+60\+\s+users/i,
  );
  assert.doesNotMatch(pageText, /People supported/i);
});

test("contains no AI-tool paragraph, decorative Arabic line, or starter residue", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);
  const [pageSource, layoutSource, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

  assert.doesNotMatch(pageText, /\bAI tools?\b/i);
  assert.doesNotMatch(pageText, /\bConvex\b/i);
  assert.doesNotMatch(html, /\barabic-line\b/i);
  assert.doesNotMatch(html, /\bcodex-preview\b/i);
  assert.doesNotMatch(pageText, /Your site is taking shape|Building your site/i);
  assert.doesNotMatch(html, /react-loading-skeleton|SkeletonPreview|_sites-preview/i);
  assert.doesNotMatch(pageSource, /codex-preview|SkeletonPreview|_sites-preview/i);
  assert.doesNotMatch(layoutSource, /Starter Project|codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);

});

test("ships the resume and social-preview image", async () => {
  await Promise.all([
    access(new URL("public/Sameer_Awaji_Resume.pdf", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
  ]);
});
