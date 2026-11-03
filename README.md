# Sameer Awaji — Portfolio

Sameer Awaji’s bilingual software-engineering portfolio, built with Next.js,
React, TypeScript, vinext, and Cloudflare Sites.

## Public structure

- `/` — English portfolio
- `/ar` — deliberately translated Arabic RTL portfolio
- `/notes/[slug]` and `/ar/notes/[slug]` — three bilingual engineering notes
- `/work/qarar` — legacy redirect to the QARAR section
- `/api/portfolio-events` — anonymous, allowlisted interaction events written to
  server logs without analytics cookies or form data

The homepage order is hero, selected work, experience and technical skills, notes,
about, and contact. QARAR, Maeen, MIP, and Numo Ads are selected work. Numo is attributed
to Mrasim employment and explicitly remains in development.

Project cards use one short contribution paragraph with project context, stack,
and a brief result or status. The opening introduces Sameer, his current work,
and remote role intent. Real Maeen web and QARAR simulator screens introduce the work together.
Experience preserves the factual roles and dates. Both languages use plain copy;
the homepage copy budget is 500 words, including navigation and captions.

The visual system uses a light introduction, green accents, editorial typography,
and actual project screenshots. QARAR and Maeen are flagship projects; MIP and Numo
share a supporting row. Notes use a compact reading list. Narrow layouts keep
contributions near the project title and retain a keyboard-focusable QARAR gallery.
Reduced-motion and print styles keep content visible. Browser visual QA remains
required before treating a design change as verified.

About includes Sameer’s recorded Gallup CliftonStrengths top five, in order:
Intellection, Achiever, Positivity, Harmony, and Responsibility. The brief assessment
description links to Gallup; results were retrieved from the ChatGPT conversation
“Memory and Obsidian Use” on October 4, 2026. They are personal assessment results,
not a professional certification. The one-page résumé remains engineering-focused.

## Factual source

`content/portfolio.json` is the shared source for public claims, translations,
career dates, project boundaries, note content, and résumé data. The website and
`scripts/build_resume.py` both read it.

Keep these distinctions intact:

- Mrasim is current employment beginning in April 2026. QARAR is private team
  work; public screens are sanitized simulator states.
- MIP followed Nana. Sameer’s primary role was Marketing Manager, with the
  public Next.js rebuild as an additional engineering contribution. Verified
  performance metrics belong in the résumé, not the homepage.
- Nana was a Product Manager internship from February to April 2025.
- Maeen is ongoing freelance work beginning in 2023. The registration site is
  hosted on Netlify, not Vercel. The latest summer program had 40+ active team
  users and benefited 1,400+ students; the wider impact must not be attributed
  to the website alone.
- Sameer clarified on September 7 that Numo Ads is employment work, not a
  personal project. Its Vue/Laravel system is presented as in development.
  The diagram is explicitly a workflow schematic rather than a product
  screenshot. Do not infer production launch, campaign results, provider
  approval, or ad spend from this portfolio representation.

Use short factual copy. Tests support a claim but do not replace the visible
user path or a real external dependency.

## Public hosting

Netlify publishes `dist/client`. `npm run build` runs vinext, then
`scripts/prerender-client.mjs` writes the English and Arabic HTML into that
folder. vinext alone does not emit `.next` or HTML pages. Hashed assets keep
the `_headers` file vinext already generates. `public/_redirects` sends
`/work/qarar` to `/#qarar`.

`@netlify/plugin-nextjs` is not used. `NETLIFY_NEXT_PLUGIN_SKIP=true` stops a
plugin installed in the Netlify UI from forcing `publish=.next`.

Maeen’s registration product is hosted on Netlify. This portfolio is a
separate Netlify site. `site.portfolio` stays `null` until the live
`*.netlify.app` address exists. The résumé omits that link until then. When
Netlify sets `URL` during the build, canonical tags use it.

Netlify UI, then clear cache and deploy:

1. Site configuration → Build & deploy → Continuous deployment → Build settings
   - Base directory: empty
   - Build command: `npm run build`
   - Publish directory: `dist/client`
   - Clear any UI value of `.next` so `netlify.toml` wins
2. Site configuration → Build & deploy → Plugins
   - Remove `@netlify/plugin-nextjs`
3. If the site framework is locked to Next.js, clear that detection or set the
   framework to none / Other so Netlify does not reinstall the Next plugin or
   reset the publish directory to `.next`
4. Deploys → Trigger deploy → Clear cache and deploy site
5. Open `/` and `/ar` in a private window. Paste the public URL into
   `site.portfolio`, run `python3 scripts/build_resume.py`, and push.

`/api/portfolio-events` is not deployed. The page treats that request as
optional and continues if it fails.

## Main files

- `content/portfolio.json` — facts, translations, notes, and résumé content
- `components/portfolio-page.tsx` — shared English/Arabic homepage
- `components/project-image.tsx` — direct responsive assets and progressive image-viewer links
- `components/note-page.tsx` — shared bilingual note template
- `app/(en)` and `app/(ar)` — locale-specific root layouts and routes
- `app/globals.css` — visual system, responsive layout, motion, and RTL rules
- `app/scroll-motion.tsx` — reveal behavior, mobile menu close, and anonymous events
- `app/api/portfolio-events/route.ts` — bounded analytics event ingestion
- `scripts/build_resume.py` — one-page PDF and plain-text résumé source
- `tests/rendered-html.test.mjs` — rendered claims, locale, SEO, privacy, and asset checks

## Commands

Node.js 22.13 or newer is required.

```bash
npm install
npm run lint
npm run build
npm test
python3 scripts/build_resume.py
```

Before publishing, visually verify `/`, `/ar`, and one note at desktop and
mobile widths. Publishing, custom-domain changes, and access-policy changes are
external operations and require explicit approval.

## Local design verification — 2026-09-05

- Browser inspected the English and Arabic homepages and archive note at
  desktop and mobile widths (1440, 390, and narrow Arabic 320 pixels).
- Verified menu opening, Escape focus return, closing after section selection,
  language switching, note navigation, loaded project images, and keyboard
  scrolling in the Arabic QARAR gallery. No page-width overflow was observed
  in the checked views; the browser reported no current client errors.
- Fixed note reveals after client navigation by refreshing the behavior effect
  when the pathname changes. At 320 pixels the resume is available in the menu.
- Lint, production build, and all 12 rendered-route checks pass. Full TypeScript
  checking still reports Cloudflare declarations and an optional IMAGES binding
  issue in the existing database/worker files. Production was not deployed.

## Local portfolio refinement — 2026-09-07

- Preserved the existing uncommitted bilingual routes, content boundaries, assets,
  event logging, and Numo employment correction. No commit or deployment.
- Opening connects mobile/web engineering, Arabic products, and product judgment.
  AI-assisted development is explained as part of the working process.
- QARAR uses distinct decision-entry, sign-in, and guest-account screens. Maeen
  features the original higher-resolution registration capture with supporting
  discovery/detail views. No product screens or outcomes were generated.
- Arabic uses a clearer sans-serif reading face, logical spacing, and matching
  section destinations when switching language. Gallery arrow keys and Home/End
  work in both directions; mobile Menu supports Enter and Escape with focus return.
- The one-page English résumé uses larger body text, clickable shared-source
  contact details, and explicit Numo development status. It is linked at contact.
- Lint, production build, all 12 rendered-route tests, and full TypeScript checking
  pass. Cloudflare runtime declarations come from the installed Wrangler tool;
  the optional DB declaration does not provision a database. Regenerate after
  changing the Cloudflare configuration or upgrading Wrangler:

  ```bash
  npm run build
  WRANGLER_LOG_PATH=.wrangler/wrangler.log npx wrangler types worker-runtime.d.ts --config dist/server/wrangler.json --include-env false
  npx tsc --noEmit --incremental false
  ```

- Browser QA: individual viewport captures at 1440×1000 and 390×844 in both
  languages, native browser zoom at 200%, keyboard gallery/menu controls, same
  project language switching, matching note routes, PDF download, all public
  project assets, reduced motion, and content with JavaScript disabled. The PDF
  was rendered and visually reviewed. No full-page stitching was used as proof.
- Project and professional-profile URLs returned HTTP 200. This checks link
  availability only. Mail-client delivery, real-device Safari/Firefox behavior,
  live Cloudflare bindings, and production deployment remain unverified.

## Remote engineering application update — 2026-10-03

- Personal introduction with current Mrasim work, remote role intent, core stack,
  résumé, GitHub, email, and UTC+3 location.
- Web and mobile composition uses actual Maeen and sanitized QARAR captures.
  Flagship contributions are specific; Maeen’s 40+ active team users are distinct
  from the wider program’s 1,400+ students. Supporting work and notes are compact.
- One-page English résumé has 11pt body text, embedded fonts, engineering-first
  experience, clearly emphasized results, and four clickable contacts. PDF and
  plain-text copy are generated from the shared content.
- Production build, all 16 rendered-route tests, lint, and TypeScript pass.
  English and Arabic layouts were reviewed at desktop and phone widths; the
  one-page résumé was rendered and checked. Analytics rejects non-object JSON,
  and image fallback stays on the local origin, with regression coverage.

## Visual and performance refresh — 2026-10-05

- Preserved bilingual content, factual project boundaries, and the pending
  CliftonStrengths addition. Refined the forest-green showcase, project index,
  staggered screenshots, skills, experience, and numbered strengths.
- Screenshots use server-rendered native images with explicit dimensions,
  lazy loading below the opening, and two high-priority opening images.
  Local WebP variants replace the large PNG previews; original screenshots
  open on demand in a keyboard-accessible dialog or via normal links without JS.
- QARAR account preview: 237,106-byte PNG to 22,936-byte 520px WebP
  (90.3% smaller); a 1040px variant is available. Maeen form variants retain
  full 1280px detail when needed. Original captures are preserved.
- Production client JavaScript totals 92,883 bytes gzip versus the prior
  local build's 106,563 bytes (12.8% reduction). These are aggregate build
  sizes, not a measured production loading-time or Core Web Vitals score.
- Scroll effects read geometry before writing styles, avoid repeatedly
  scanning reveal elements, and keep section highlighting independent of
  the project index. Optional analytics failures do not interrupt navigation.
- Browser checks cover English and Arabic at desktop and phone widths,
  narrow 320px Arabic, image enlargement and Escape focus return, mobile
  menu keyboard dismissal, RTL gallery keys, language hash preservation,
  and a note at desktop/phone widths. No overflow or browser errors appeared
  in those checks. Evidence is in the sibling `portfolio-evidence` directory.
