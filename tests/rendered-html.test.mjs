import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function request(path = "/", init, env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", ...(init?.headers ?? {}) },
      ...init,
    }),
    env,
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
    const index = text.indexOf(label, previousIndex + 1);
    assert.ok(index >= 0, `Expected to find “${label}”`);
    assert.ok(index > previousIndex, `Expected “${label}” in order`);
    previousIndex = index;
  }
}

test("renders the new engineering position and current context", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const pageText = textContent(html);
  const hero = textContent(elementContent(html, "section", "top"));

  assert.match(html, /<html[^>]+lang=["']en["'][^>]+dir=["']ltr["']/i);
  assert.match(html, /<title>Sameer Awaji — Software Engineer<\/title>/i);
  assert.match(hero, /Sameer Awaji\. Full-stack engineer\./i);
  assert.match(hero, /Open to remote full-stack roles/i);
  assert.match(hero, /Arabic and RTL products/i);
  assert.match(hero, /Flutter, React\/Next\.js, and Laravel APIs/i);
  assert.match(hero, /Mrasim and Maeen/i);
  assert.match(hero, /React \/ Next\.js.*TypeScript.*Flutter.*Laravel/i);
  assert.match(hero, /Download résumé/i);
  assert.match(hero, /GitHub/i);
  assert.match(hero, /LinkedIn/i);
  assert.match(hero, /UTC\+3/i);
  assert.match(pageText, /Selected work\./i);
  assert.match(pageText, /Remote roles\. Jeddah, UTC\+3\./i);
  assert.match(html, /href=["']mailto:sameer2study@gmail\.com\?subject=Remote%20full-stack%20engineering%20role["']/i);
  assert.match(html, /href=["']\/Sameer_Awaji_Resume\.pdf["']/i);
  assert.match(html, /href=["']\/Sameer_Awaji_Resume\.txt["']/i);
  assert.doesNotMatch(html, /chatgpt\.site|signin-with-chatgpt|kill7737/i);
});

test("keeps the homepage narrative and project groups in order", async () => {
  const html = await (await request()).text();
  const pageText = textContent(html);

  assertInOrder(pageText, [
    "Selected work",
    "QARAR",
    "Maeen",
    "MIP website",
    "Numo Ads",
    "Experience",
    "Notes from the work.",
    "A little about me.",
    "Let’s talk.",
  ]);
  for (const id of ["work", "qarar", "maeen", "mip", "numo", "experience", "notes", "about", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`, "i"));
  }
});

test("presents QARAR specifically without exposing private material", async () => {
  const html = await (await request()).text();
  const project = textContent(elementContent(html, "article", "qarar"));

  assert.match(project, /Private/i);
  assert.match(project, /Mrasim/i);
  assert.match(project, /Mrasim’s team/i);
  assert.match(project, /Flutter and Laravel/i);
  assert.match(project, /login, account recovery, and realtime updates/i);
  assert.match(project, /simulator previews/i);
  assert.match(html, /projects\/qarar-login-preview\.webp/i);
  assert.match(html, /projects\/qarar-account-clean\.png/i);
  assert.match(html, /projects\/qarar-decision-preview\.webp/i);
  assert.match(project, /Swipe through screens/i);
  const hero = elementContent(html, "section", "top");
  assert.match(hero, /qarar-decision-preview/);
  assert.doesNotMatch(elementContent(html, "article", "qarar"), /qarar-decision-preview|qarar-home-preview/);
  assert.doesNotMatch(project, /ApiClient|TokenStorage|last_id|production-ready/i);
});

test("keeps Maeen attribution and MIP claims within verified boundaries", async () => {
  const html = await (await request()).text();
  const maeen = textContent(elementContent(html, "article", "maeen"));
  const mip = textContent(elementContent(html, "article", "mip"));

  assert.match(maeen, /Maeen · freelance/i);
  assert.match(maeen, /hosted on Netlify/i);
  assert.match(maeen, /40\+ active team users/i);
  assert.match(maeen, /wider program benefited 1,400\+ students/i);
  assert.doesNotMatch(maeen, /Vercel/i);
  assert.match(html, /projects\/maeen-summer-home-preview\.webp/i);
  assert.match(html, /projects\/maeen-summer-form\.png/i);
  assert.match(html, /projects\/maeen-summer-program-preview\.webp/i);

  assert.match(mip, /rebuilt mipksa\.com from WordPress to Next\.js/i);
  assert.match(mip, /Marketing Manager/i);
  assert.match(mip, /Live/i);
  assert.doesNotMatch(mip, /77.*100|4\.8|0\.8/i);
  assert.match(html, /href=["']https:\/\/mipksa\.com["']/i);
});

test("attributes Numo to employment and distinguishes its schematic from product evidence", async () => {
  const html = await (await request()).text();
  const project = textContent(elementContent(html, "article", "numo"));

  assert.match(project, /Mrasim · web development/i);
  assert.doesNotMatch(project, /Personal project|Personal product lab/i);
  assert.match(project, /In development/i);
  assertInOrder(project, ["Vue 3", "Laravel", "MySQL"]);
  assertInOrder(project, ["01", "Project selection", "02", "Campaign planning", "03", "Content", "04", "Review"]);
  assert.match(project, /Workflow diagram/i);
  assert.doesNotMatch(project, /live campaigns|real provider integration|production-ready/i);
});

test("ships a deliberately translated RTL route with language alternates", async () => {
  const response = await request("/ar");
  assert.equal(response.status, 200);
  const html = await response.text();
  const pageText = textContent(html);

  assert.match(html, /<html[^>]+lang=["']ar["'][^>]+dir=["']rtl["']/i);
  assert.match(pageText, /سمير عواجي\. مهندس برمجيات فل-ستاك\./i);
  assert.match(pageText, /متاح لأدوار فل-ستاك عن بُعد/i);
  assert.match(pageText, /Netlify/i);
  assert.doesNotMatch(pageText, /Vercel/i);
  assert.match(pageText, /أعمال مختارة\./i);
  assert.match(pageText, /الأرشفة ليست حذفاً/i);
  assert.match(html, /hreflang=["']en["'][^>]+href=["'][^"']+\/["']/i);
  assert.match(html, /hreflang=["']ar["'][^>]+href=["'][^"']+\/ar["']/i);
  assert.doesNotMatch(pageText, /Products with real constraints/i);
});

test("renders all three bilingual engineering notes", async () => {
  const slugs = [
    "archive-is-not-delete",
    "what-local-tests-prove",
    "arabic-first-is-not-translation",
  ];

  for (const slug of slugs) {
    const english = await request(`/notes/${slug}`);
    const arabic = await request(`/ar/notes/${slug}`);
    assert.equal(english.status, 200, `Expected English note ${slug}`);
    assert.equal(arabic.status, 200, `Expected Arabic note ${slug}`);

    const englishHtml = await english.text();
    const arabicHtml = await arabic.text();
    assert.match(englishHtml, /<html[^>]+lang=["']en["']/i);
    assert.match(arabicHtml, /<html[^>]+lang=["']ar["']/i);
    assert.match(englishHtml, /application\/ld\+json/i);
    assert.match(arabicHtml, /application\/ld\+json/i);
    assert.match(textContent(englishHtml), /3 min read/i);
    assert.match(textContent(arabicHtml), /قراءة 3 دقائق/i);
  }
});

test("keeps the personal section human and attributes CliftonStrengths to Gallup", async () => {
  const html = await (await request()).text();
  const about = textContent(elementContent(html, "section", "about"));

  assert.match(about, /A little about me/i);
  assert.match(about, /Jeddah, Saudi Arabia/i);
  assert.match(about, /Arabic and English/i);
  assert.match(about, /product management, marketing, and teaching/i);
  assert.match(about, /Gallup CliftonStrengths.*Formerly StrengthsFinder/i);
  assert.match(about, /research-based assessment.*34 talent themes/i);
  assertInOrder(about, ["Intellection", "Achiever", "Positivity", "Harmony", "Responsibility"]);
  assert.match(elementContent(html, "section", "about"), /href=["']https:\/\/support\.gallup\.com\/hc\/en-us\/articles\/44814767818643-What-is-the-CliftonStrengths-assessment["']/i);
  const arabicHtml = await (await request("/ar")).text();
  const arabicAbout = textContent(elementContent(arabicHtml, "section", "about"));
  assert.match(arabicAbout, /أبرز خمس سمات لدي/i);
  assertInOrder(arabicAbout, ["Intellection", "Achiever", "Positivity", "Harmony", "Responsibility"]);
  assert.doesNotMatch(about, /DISC|Gallup-certified|certified engineer/i);
  assert.doesNotMatch(about, /innovative|passionate|results-driven|unique blend/i);
});

test("records only allowlisted anonymous interaction events", async () => {
  const valid = await request("/api/portfolio-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event: "project_link", path: "/", locale: "en", project: "mip" }),
  });
  assert.equal(valid.status, 204);

  const invalid = await request("/api/portfolio-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event: "freeform_event", path: "/", locale: "en", email: "person@example.com" }),
  });
  assert.equal(invalid.status, 400);

  const html = await (await request()).text();
  assert.match(textContent(html), /No analytics cookies or form data/i);
  assert.doesNotMatch(html, /google-analytics|googletagmanager|facebook\.com\/tr/i);
});

test("rejects non-object analytics payloads without server errors", async () => {
  for (const payload of [null, [], "project_link", 42, true]) {
    const response = await request("/api/portfolio-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(response.status, 400, `Expected rejection for ${JSON.stringify(payload)}`);
  }
});

test("rejects image sources that normalize to another origin", async () => {
  const sources = [
    "https://example.test/image.webp",
    "//example.test/image.webp",
    "/\\example.test/image.webp",
    "/\n/example.test/image.webp",
    "/\r/example.test/image.webp",
    "/\t/example.test/image.webp",
  ];

  for (const source of sources) {
    const path = `/_vinext/image?${new URLSearchParams({ url: source, w: "640", q: "75" })}`;
    for (const env of [{}, { ASSETS: { fetch: async () => assert.fail("Rejected image must not reach ASSETS") } }]) {
      const response = await request(path, undefined, env);
      assert.equal(response.status, 400, `Expected rejection for ${JSON.stringify(source)}`);
      assert.equal(response.headers.get("location"), null);
    }
  }
});

test("preserves local image fallback with and without an asset binding", async () => {
  const source = "/projects/maeen-summer-home-preview.webp";
  const path = `/_vinext/image?${new URLSearchParams({ url: source, w: "640", q: "75" })}`;
  const fetched = [];
  const assetResponse = await request(path, undefined, {
    ASSETS: {
      fetch: async (assetRequest) => {
        fetched.push(assetRequest.url);
        return new Response("local-image", { headers: { "content-type": "image/webp" } });
      },
    },
  });
  assert.equal(assetResponse.status, 200);
  assert.equal(assetResponse.headers.get("content-type"), "image/webp");
  assert.equal(await assetResponse.text(), "local-image");
  assert.deepEqual(fetched, [`http://localhost${source}`]);

  const redirectResponse = await request(path, undefined, {});
  assert.equal(redirectResponse.status, 307);
  assert.equal(redirectResponse.headers.get("location"), `http://localhost${source}`);
});

test("keeps the homepage short and readable", async () => {
  const html = await (await request()).text();
  const pageText = textContent(html);
  assert.ok(wordCount(pageText) < 500, `Expected homepage under 500 words, received ${wordCount(pageText)}`);
  assert.doesNotMatch(pageText, /Engineering details|My contribution|Validation|identity and session continuity|verification boundary/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /property=["']og:image["'][^>]+og\.jpg/i);
  assert.match(html, /name=["']twitter:card["'][^>]+summary_large_image/i);
  assert.doesNotMatch(pageText, /repository commits|test dashboard|69 commits|29 commits/i);
});

test("serves lightweight direct screenshots and an accessible image viewer", async () => {
  for (const path of ["/", "/ar"]) {
    const html = await (await request(path)).text();
    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    assert.ok(images.length >= 7);
    assert.equal(images.filter((image) => /loading="eager"/.test(image)).length, 2);
    for (const image of images) {
      assert.match(image, /width="\d+"/);
      assert.match(image, /height="\d+"/);
      assert.match(image, /alt="[^"]+"/);
      assert.doesNotMatch(image, /_vinext\/image|_next\/image/);
      assert.doesNotMatch(image, /src="[^"]+\.png"/);
    }
    assert.match(html, /srcSet="[^\"]*qarar-account-520\.webp 520w[^\"]*qarar-account-1040\.webp 1040w/i);
    assert.match(html, /<dialog[^>]*aria-labelledby="image-viewer-caption"/);
    assert.match(html, /href="\/projects\/qarar-account-clean\.png"[^>]*data-image-viewer/);
  }
  const compactPhone = await stat(new URL("public/projects/qarar-account-520.webp", projectRoot));
  assert.ok(compactPhone.size < 30_000);
  const fullForm = await stat(new URL("public/projects/maeen-form-1280.webp", projectRoot));
  assert.ok(fullForm.size < 35_000);
});

test("presents short project contributions and useful skills in both locales", async () => {
  for (const path of ["/", "/ar"]) {
    const html = await (await request(path)).text();
    for (const id of ["qarar", "maeen", "mip", "numo"]) {
      const project = elementContent(html, "article", id);
      const contribution = /<p[^>]*class=["']project-contribution["'][^>]*>([\s\S]*?)<\/p>/i.exec(project);
      assert.ok(contribution, `Missing contribution for ${id}`);
      assert.ok(wordCount(textContent(contribution[1])) <= 30, `Contribution for ${id} is too long`);
    }
    const experience = textContent(elementContent(html, "section", "experience"));
    for (const skill of ["TypeScript", "Vue 3", "Flutter", "REST APIs", "Supabase"]) {
      assert.ok(experience.includes(skill), `Missing technical skill: ${skill}`);
    }
    assert.match(experience, /Marketing Manager|مدير تسويق/);
    assert.match(html, /class=["'][^"']*is-supporting[^"']*["']/);
    assert.match(html, /id=["']skills-title["']/i);
  }
});

test("redirects the legacy QARAR route", async () => {
  const response = await request("/work/qarar");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/#qarar$/i);
});

test("ships optimized proof assets and a one-source resume generator", async () => {
  const assets = [
    "public/Sameer_Awaji_Resume.pdf",
    "public/Sameer_Awaji_Resume.txt",
    "public/og.jpg",
    "public/brands/mrasim-logo-white.svg",
    "public/projects/mip-home-preview.webp",
    "public/projects/maeen-summer-home-preview.webp",
    "public/projects/maeen-summer-form-preview.webp",
    "public/projects/maeen-summer-program-preview.webp",
    "public/projects/qarar-login-preview.webp",
    "public/projects/qarar-home-preview.webp",
    "public/projects/qarar-decision-preview.webp",
    "app/icon.png",
  ];
  await Promise.all(assets.map((asset) => access(new URL(asset, projectRoot))));

  const og = await stat(new URL("public/og.jpg", projectRoot));
  assert.ok(og.size < 400_000, `Expected social card below 400 KB, received ${og.size}`);

  const [resumeSource, portfolioSource, pageSource, behaviorSource, stylesSource] = await Promise.all([
    readFile(new URL("scripts/build_resume.py", projectRoot), "utf8"),
    readFile(new URL("content/portfolio.json", projectRoot), "utf8"),
    readFile(new URL("components/portfolio-page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/scroll-motion.tsx", projectRoot), "utf8"),
    readFile(new URL("app/globals.css", projectRoot), "utf8"),
  ]);
  assert.match(resumeSource, /content.*portfolio\.json/i);
  assert.match(resumeSource, /tier.*compact|is_compact/i);
  assert.match(portfolioSource, /40\+ active team users/i);
  assert.match(portfolioSource, /1,400\+ students/i);
  assert.match(portfolioSource, /hosted on Netlify/i);
  assert.match(portfolioSource, /77 to 100/);
  assert.match(portfolioSource, /4\.8s to 0\.8s/);
  assert.doesNotMatch(portfolioSource, /chatgpt\.site|github\.io|workers\.dev|vercel/i);
  assert.equal(JSON.parse(portfolioSource).site.portfolio, null);
  const packageJson = JSON.parse(await readFile(new URL("package.json", projectRoot), "utf8"));
  assert.match(packageJson.scripts.build, /vinext build && node scripts\/prerender-client\.mjs/);
  const netlifyToml = await readFile(new URL("netlify.toml", projectRoot), "utf8");
  assert.match(netlifyToml, /command\s*=\s*"npm run build"/);
  assert.match(netlifyToml, /publish\s*=\s*"dist\/client"/);
  assert.match(netlifyToml, /NETLIFY_NEXT_PLUGIN_SKIP\s*=\s*"true"/);
  assert.doesNotMatch(netlifyToml, /\[\[plugins\]\]|github\.io|chatgpt\.site/);
  const publishedHome = await readFile(new URL("dist/client/index.html", projectRoot), "utf8");
  const publishedArabic = await readFile(new URL("dist/client/ar/index.html", projectRoot), "utf8");
  assert.match(publishedHome, /Full-stack engineer/);
  assert.match(publishedHome, /hosted on Netlify/);
  assert.match(publishedArabic, /فل-ستاك/);
  assert.match(await readFile(new URL("dist/client/_headers", projectRoot), "utf8"), /\/assets\/\*/);
  assert.match(await readFile(new URL("dist/client/_redirects", projectRoot), "utf8"), /\/work\/qarar/);

  const resumeTxt = await readFile(new URL("public/Sameer_Awaji_Resume.txt", projectRoot), "utf8");
  assert.match(resumeTxt, /Full-stack Engineer \| React\/Next\.js, Flutter, APIs/);
  assert.match(resumeTxt, /Jeddah, Saudi Arabia \(UTC\+3\)/);
  assert.match(resumeTxt, /hosted on Netlify/);
  assert.match(resumeTxt, /77 to 100/);
  assert.match(resumeTxt, /4\.8s to 0\.8s/);
  assert.match(resumeTxt, /40\+ active team users/);
  assert.match(resumeTxt, /1,400\+ students; that figure is not website traffic/);
  assert.match(resumeTxt, /sanitized simulator states/);
  assert.match(resumeTxt, /no launch metrics/);
  assert.match(resumeTxt, /ADDITIONAL EXPERIENCE\nMarketing Manager \| MIP Marketing Agency/);
  assert.doesNotMatch(resumeTxt, /chatgpt\.site|Vercel/i);
  assert.doesNotMatch(resumeTxt, /^Portfolio:/m);
  assert.match(pageSource, /content\/portfolio\.json/i);
  assert.match(pageSource, /note-card-link/i);
  assert.match(behaviorSource, /IntersectionObserver/i);
  assert.match(behaviorSource, /sendBeacon/i);
  assert.match(behaviorSource, /aria-current/i);
  assert.match(stylesSource, /\.project-qarar\s*{[^}]*grid-column:\s*1\s*\/\s*-1/is);
});
