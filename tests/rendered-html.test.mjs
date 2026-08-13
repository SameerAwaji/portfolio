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

test("server-renders a direct software engineering position", async () => {
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
  assert.match(html, /href=["'][^"']*\/icon\.png(?:\?[^"']*)?["']/i);
  assert.match(hero, /Software engineer working across Flutter, Laravel, and Next\.js/i);
  assert.match(hero, /authentication, request recovery, and real-time updates/i);
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
  assert.match(liveWork, /image delivery, responsive behavior, metadata, and technical SEO/i);
  assert.doesNotMatch(liveWork, /77.*100|4\.8|0\.8|Lighthouse performance/i);
  assert.match(liveWork, /enquiry forms/i);
  assert.match(liveWork, /internal workflow dashboard/i);
});

test("ships a generalized QARAR case study with ownership, risks, and evidence", async () => {
  const response = await render("/work/qarar");
  assert.equal(response.status, 200);
  const html = await response.text();
  const pageText = textContent(html);
  const title = textContent(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");

  assert.equal(title, "QARAR Reliability Case Study — Sameer Awaji");
  assert.match(pageText, /QARAR reliability work: authentication, retries, and SSE recovery/i);
  assertInOrder(pageText, ["My responsibility", "Risk → change → verification", "Current local verification", "Installed app screens"]);
  assert.match(pageText, /Private team product · details generalized/i);
  assert.match(pageText, /Reliability risk/i);
  assert.match(pageText, /What I changed/i);
  assert.match(pageText, /internal identifiers, test filenames, endpoints, and operational timing values/i);
  assert.match(html, /<pre>/i);
});

test("keeps four homepage captures and reduces the case-study gallery to three", async () => {
  const homeHtml = await (await render()).text();
  const html = await (await render("/work/qarar")).text();
  const pageText = textContent(html);

  for (const asset of [
    "qarar-splash-clean.png",
    "qarar-login-clean.png",
    "qarar-decision-clean.png",
  ]) {
    assert.match(html, new RegExp(`projects\\/${asset.replace(".", "\\.")}`, "i"));
  }

  assert.doesNotMatch(html, /projects\/qarar-home-clean\.png/i);
  assert.doesNotMatch(html, /projects\/qarar-account-clean\.png/i);

  for (const asset of [
    "qarar-splash-clean.png",
    "qarar-login-clean.png",
    "qarar-home-clean.png",
    "qarar-decision-clean.png",
  ]) {
    assert.match(homeHtml, new RegExp(`projects\\/${asset.replace(".", "\\.")}`, "i"));
  }

  assert.match(homeHtml, /id=["']qarar-work["']/i);
  assert.match(homeHtml, /id=["']live-work["']/i);

  assert.match(pageText, /Three points in the current iOS flow/i);
  assert.match(pageText, /These captures show the installed app’s startup, main sign-in/i);
  assert.match(pageText, /stop before an identifier, OTP, or decision is submitted/i);
});

test("states current full-suite results, release status, and external boundary", async () => {
  const html = await (await render("/work/qarar")).text();
  const pageText = textContent(html);

  assert.match(pageText, /1,070 Flutter tests passed/i);
  assert.match(pageText, /13 skipped/i);
  assert.match(pageText, /696 Laravel tests passed/i);
  assert.match(pageText, /4,383 assertions/i);
  assert.match(pageText, /flutter test --no-pub --reporter compact/i);
  assert.match(pageText, /php artisan test --compact/i);
  assert.match(pageText, /13 Aug 2026/i);
  assert.match(pageText, /Flutter 3\.41\.9/i);
  assert.match(pageText, /Merged to main; backend deployed; updated mobile release pending/i);
  assert.match(pageText, /do not prove live SMS or email delivery/i);
  assert.doesNotMatch(pageText, /MySQL test service was unavailable/i);
});

test("does not expose private implementation identifiers or unsupported MIP metrics", async () => {
  const homeText = textContent(await (await render()).text());
  const caseHtml = await (await render("/work/qarar")).text();
  const caseText = textContent(caseHtml);

  assert.doesNotMatch(homeText, /77.*100|4\.8|0\.8|sameer2study@gmail\.com/i);
  assert.doesNotMatch(caseText, /ApiClient|TokenStorage|AccessTokenRotationService/i);
  assert.doesNotMatch(caseText, /\.dart\b|last_id|120-second|120 second/i);
  assert.doesNotMatch(caseText, /What failed and what I changed|Observed risk/i);
});

test("removes unsupported padding and AI-style slogans", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);
  const caseText = textContent(await (await render("/work/qarar")).text());

  assert.doesNotMatch(pageText, /Prototypes and work in progress/i);
  assert.doesNotMatch(pageText, /Automatic Marketing|While It Runs|Rescuel/i);
  assert.doesNotMatch(pageText, /Built, shipped, and visible/i);
  assert.doesNotMatch(pageText, /The implementation follows the user risk/i);
  assert.doesNotMatch(pageText, /Looking for an engineer who can connect product and implementation/i);
  assert.doesNotMatch(caseText, /The product, not a mockup/i);
  assert.doesNotMatch(caseText, /impossible by construction|duplicate-safe|The path remains the proof/i);
  assert.doesNotMatch(caseText, /How I (handled|addressed)/i);
});

test("keeps the full experience path and education", async () => {
  const html = await (await render()).text();
  const experience = textContent(elementContent(html, "section", "experience"));

  assertInOrder(experience, ["Mrasim", "MIP Marketing Agency", "Nana", "Maeen"]);
  assert.match(experience, /Bachelor of Software Engineering/i);
  assert.match(experience, /University of Jeddah/i);
  assert.match(experience, /4\.48 \/ 5\.0/i);
  assert.match(experience, /I have built web software since 2023/i);
  assert.match(experience, /I build Maeen’s public website, enquiry forms, and internal workflow tools/i);
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
    access(new URL("app/icon.png", projectRoot)),
  ]);
});
