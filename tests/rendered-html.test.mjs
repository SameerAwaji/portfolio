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

test("renders a short engineering introduction", async () => {
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
  assert.match(hero, /I build mobile apps, web products, and backend systems/i);
  assert.match(hero, /Flutter, Laravel, React, Next\.js, and Vue/i);
  assert.match(hero, /Software engineer at Mrasim/i);
  assert.match(hero, /Email me/i);
  assert.match(pageText, /Selected projects/i);
  assert.doesNotMatch(hero, /real problem is bigger|outside the demo/i);
  assert.match(html, /href=["']https:\/\/github\.com\/SameerAwaji["']/i);
  assert.match(html, /href=["']mailto:sameer2study@gmail\.com\?subject=Engineering%20role["']/i);
});

test("keeps the entire portfolio in one coherent page", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assertInOrder(pageText, [
    "Selected projects",
    "Mrasim",
    "Maeen",
    "MIP",
    "Numo Ads",
    "Experience",
    "About",
    "Contact",
  ]);
  assert.match(html, /id=["']work["']/i);
  assert.match(html, /id=["']about["']/i);
  assert.match(html, /id=["']experience["']/i);
  assert.match(html, /id=["']contact["']/i);
  assert.doesNotMatch(html, /href=["']\/work\/qarar["']/i);
});

test("presents QARAR without case-study narration", async () => {
  const html = await (await render()).text();
  const project = textContent(elementContent(html, "article", "mrasim"));

  assert.match(project, /QARAR/i);
  assert.match(project, /Flutter and Laravel work on sessions, account recovery, and live updates/i);
  assertInOrder(project, ["Flutter", "Laravel", "Arabic UX"]);
  assert.match(project, /Private project · simulator screens/i);
  assert.doesNotMatch(project, /What I built|My contribution|How I checked it/i);
  assert.doesNotMatch(project, /ApiClient|TokenStorage|AccessTokenRotationService|last_id/i);
  assert.match(html, /brands\/mrasim-logo-white\.svg/i);
  assert.match(html, /href=["']https:\/\/mrasim\.sa["']/i);

  for (const asset of [
    "qarar-login-clean.png",
    "qarar-home-clean.png",
    "qarar-decision-clean.png",
  ]) {
    assert.match(html, new RegExp(`projects\\/${asset.replace(".", "\\.")}`, "i"));
  }
});

test("presents the verified Maeen journey and latest program impact", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.match(html, /href=["']https:\/\/maeen\.com\.sa["']/i);
  assert.match(pageText, /Student, teacher, then developer/i);
  assertInOrder(pageText, ["2018", "Student", "Teacher", "Developer"]);
  assert.match(pageText, /40\+ active team users/i);
  assert.match(pageText, /1,400\+ students benefited in the latest summer program/i);
  assert.match(pageText, /Built the summer-program registration flow and an internal dashboard/i);
  assert.match(pageText, /keeping the team’s Google Drive workflow/i);
  assert.match(pageText, /Real 2026 program pages shown above/i);
  assert.doesNotMatch(pageText, /5,?000\+|200\+ users/i);
  assert.match(html, /projects\/maeen-summer-home\.png/i);
  assert.match(html, /projects\/maeen-summer-form\.png/i);
  assert.match(html, /projects\/maeen-summer-program\.png/i);
});

test("keeps the MIP project factual and brief", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.match(html, /href=["']https:\/\/mipksa\.com["']/i);
  assert.match(html, /projects\/mip-home\.png/i);
  assert.match(html, /class=["'][^"']*mip-browser[^"']*["']/i);
  assert.match(pageText, /migrated mipksa\.com from WordPress to Next\.js/i);
  assert.doesNotMatch(pageText, /broader work across|public website linked above/i);
  assert.doesNotMatch(pageText, /77.*100|4\.8|0\.8|60\+ users/i);
});

test("presents the actual Numo Ads prototype in plain language", async () => {
  const html = await (await render()).text();
  const project = textContent(elementContent(html, "article", "numo"));

  assert.match(project, /Numo Ads نمو ادز/i);
  assert.match(project, /Personal project/i);
  assert.match(project, /Local prototype/i);
  assertInOrder(project, ["Vue 3", "Laravel 12", "MySQL"]);
  assert.match(project, /Arabic-first prototype for Snapchat campaigns/i);
  assert.match(project, /Campaign setup · Content Lab · Reports/i);
  assert.match(project, /1080 × 1920 MP4 · 60 FPS/i);
  assert.match(project, /Local simulators · no live ad spend/i);
  assert.doesNotMatch(project, /What I built|What works today|Scope/i);
  assert.doesNotMatch(project, /production-ready|live campaigns|real provider integration/i);
});

test("keeps the personal section short and removes music", async () => {
  const html = await (await render()).text();
  const about = textContent(elementContent(html, "section", "about"));

  assert.match(about, /Sameer Awaji/i);
  assert.match(about, /Software engineer in Jeddah/i);
  assert.match(about, /product, marketing, and teaching/i);
  assert.match(about, /Jeddah, Saudi Arabia/i);
  assert.match(about, /Arabic and English/i);
  assert.doesNotMatch(about, /I use AI in almost everything I build/i);
  assert.doesNotMatch(about, /Playlist whiplash|Eminem|Billie Eilish|Sherine|Abdel Halim/i);
  assert.doesNotMatch(about, /Intellection|Achiever|Responsibility|Harmony|Relator|DISC/i);
  assert.doesNotMatch(about, /innovative|passionate|results-driven|unique blend|leverage AI/i);
});

test("keeps the full experience path and education", async () => {
  const html = await (await render()).text();
  const experience = textContent(elementContent(html, "section", "experience"));

  assertInOrder(experience, [
    "Employment",
    "Mrasim",
    "MIP Marketing Agency",
    "Nana",
    "Concurrent freelance work",
    "Maeen",
  ]);
  assert.match(experience, /Bachelor of Software Engineering/i);
  assert.match(experience, /University of Jeddah/i);
  assert.match(experience, /4\.48 \/ 5\.0/i);
  assert.match(experience, /Freelance Developer & AI Tutor/i);
});

test("stays concise and avoids unsupported padding", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.ok(
    wordCount(pageText) < 500,
    `Expected homepage under 500 words, received ${wordCount(pageText)}`,
  );
  assert.doesNotMatch(pageText, /What I built|My contribution|How I checked it|What works today/i);
  assert.doesNotMatch(pageText, /Automatic Marketing|While It Runs|Rescuel/i);
  assert.doesNotMatch(pageText, /repository commits|69 commits|29 commits/i);
  assert.match(html, /href=["']mailto:sameer2study@gmail\.com["']/i);
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
  const [pageSource, motionSource, caseSource, layoutSource, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/scroll-motion.tsx", projectRoot), "utf8"),
    readFile(new URL("app/work/qarar/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

  assert.doesNotMatch(html, /\bcodex-preview\b|\b_sites-preview\b/i);
  assert.doesNotMatch(pageText, /Your site is taking shape|Building your site/i);
  assert.doesNotMatch(pageSource, /codex-preview|SkeletonPreview|_sites-preview/i);
  assert.match(motionSource, /IntersectionObserver/i);
  assert.match(motionSource, /--scroll-progress/i);
  assert.doesNotMatch(caseSource, /codex-preview|SkeletonPreview|_sites-preview/i);
  assert.doesNotMatch(layoutSource, /Starter Project|codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);
});

test("keeps the resume source aligned with the latest Maeen figures", async () => {
  const resumeSource = await readFile(
    new URL("scripts/build_resume.py", projectRoot),
    "utf8",
  );

  assert.match(resumeSource, /40\+ active team users/i);
  assert.match(resumeSource, /1,400\+ students/i);
  assert.doesNotMatch(resumeSource, /60\+ users/i);
});

test("ships the resume, brand, social card, and project proof assets", async () => {
  await Promise.all([
    access(new URL("public/Sameer_Awaji_Resume.pdf", projectRoot)),
    access(new URL("public/og-v5.png", projectRoot)),
    access(new URL("public/brands/mrasim-logo-white.svg", projectRoot)),
    access(new URL("public/projects/mip-home.png", projectRoot)),
    access(new URL("public/projects/maeen-summer-home.png", projectRoot)),
    access(new URL("public/projects/maeen-summer-form.png", projectRoot)),
    access(new URL("public/projects/maeen-summer-program.png", projectRoot)),
    access(new URL("public/projects/qarar-login-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-home-clean.png", projectRoot)),
    access(new URL("public/projects/qarar-decision-clean.png", projectRoot)),
    access(new URL("app/icon.png", projectRoot)),
  ]);
});
