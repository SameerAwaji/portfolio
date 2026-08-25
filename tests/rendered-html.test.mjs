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

  assert.equal(title, "Sameer Awaji Software Engineer");
  assert.match(hero, /I build software\. I care whether it works outside the demo/i);
  assert.match(hero, /where the real problem is bigger than the first request/i);
  assert.match(hero, /Flutter, Laravel, React, and Next\.js/i);
  assert.match(hero, /Building software at Mrasim/i);
  assert.match(hero, /Discuss an engineering role/i);
  assert.match(pageText, /Work I can show/i);
  assert.match(html, /href=["']https:\/\/github\.com\/SameerAwaji["']/i);
  assert.match(html, /href=["']mailto:sameer2study@gmail\.com\?subject=Engineering%20role["']/i);
});

test("keeps the entire portfolio in one coherent page", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assertInOrder(pageText, [
    "Selected work",
    "Mrasim",
    "Maeen",
    "MIP",
    "Numo Ads",
    "Experience",
    "A little more like me",
    "Contact",
  ]);
  assert.match(html, /id=["']work["']/i);
  assert.match(html, /id=["']about["']/i);
  assert.match(html, /id=["']experience["']/i);
  assert.match(html, /id=["']contact["']/i);
  assert.doesNotMatch(html, /href=["']\/work\/qarar["']/i);
});

test("presents QARAR with concise, bounded evidence", async () => {
  const html = await (await render()).text();
  const project = textContent(elementContent(html, "article", "mrasim"));

  assert.match(project, /QARAR: mobile and backend reliability/i);
  assert.match(project, /A public example from my wider work at Mrasim/i);
  assert.match(project, /Flutter and Laravel changes around sessions, recovery, and live updates/i);
  assertInOrder(project, ["Flutter", "Laravel", "Arabic UX"]);
  assertInOrder(project, ["What I built", "My contribution", "How I checked it"]);
  assert.match(project, /complete local Flutter and Laravel suites passed/i);
  assert.match(project, /Live providers and deployed behavior remain separate checks/i);
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
  assert.match(pageText, /I joined as a student\. Now I teach and build for Maeen/i);
  assertInOrder(pageText, ["2018", "Student", "Teacher", "Developer"]);
  assert.match(pageText, /40\+ active team users/i);
  assert.match(pageText, /1,400\+ students benefited in the latest summer program/i);
  assert.match(pageText, /Maeen-specific summer-program form and a dashboard/i);
  assert.match(pageText, /keeping registrations in the Google Drive workflow/i);
  assert.match(pageText, /screenshots are from the real 2026 summer-program pages/i);
  assert.doesNotMatch(pageText, /5,?000\+|200\+ users/i);
  assert.match(html, /projects\/maeen-summer-home\.png/i);
  assert.match(html, /projects\/maeen-summer-form\.png/i);
  assert.match(html, /projects\/maeen-summer-program\.png/i);
});

test("frames the MIP website as one part of the wider role", async () => {
  const html = await (await render()).text();
  const pageText = textContent(html);

  assert.match(html, /href=["']https:\/\/mipksa\.com["']/i);
  assert.match(html, /projects\/mip-home\.png/i);
  assert.match(html, /class=["'][^"']*mip-browser[^"']*["']/i);
  assert.match(pageText, /migrated the MIP website from WordPress to Next\.js/i);
  assert.match(pageText, /broader work across business development, team support, management, and technology adoption/i);
  assert.match(pageText, /public website linked above/i);
  assert.doesNotMatch(pageText, /77.*100|4\.8|0\.8|60\+ users/i);
});

test("presents Numo Ads as a private locally validated build", async () => {
  const html = await (await render()).text();
  const project = textContent(elementContent(html, "article", "numo"));

  assert.match(project, /Numo Ads نمو ادز/i);
  assert.match(project, /Personal product · Private build/i);
  assertInOrder(project, ["Vue 3", "Laravel 12", "Arabic RTL"]);
  assert.match(project, /complete path is locally validated against deterministic HTTP simulators/i);
  assert.match(project, /protected vertical MP4 exports/i);
  assert.match(project, /Real ad publication, spend, provider approval/i);
  assert.match(project, /live Numo Store or Studio integrations are not claimed/i);
  assert.doesNotMatch(project, /production-ready|live campaigns|real provider integration/i);
});

test("keeps the personal section short and specific", async () => {
  const html = await (await render()).text();
  const about = textContent(elementContent(html, "section", "about"));

  assert.match(about, /I’m thoughtful before I’m loud/i);
  assert.match(about, /engineering, product, marketing, and teaching/i);
  assert.match(about, /without mistaking a rewrite for progress/i);
  assert.doesNotMatch(about, /I use AI in almost everything I build/i);
  assert.match(about, /Build it, test it, explain it, then find what I missed/i);
  assert.match(about, /Calm over noise\. Direct over impressive/i);
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
    wordCount(pageText) < 700,
    `Expected homepage under 700 words, received ${wordCount(pageText)}`,
  );
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
