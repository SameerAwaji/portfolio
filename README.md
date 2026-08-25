# Sameer Awaji — Portfolio

Sameer Awaji’s personal portfolio, built with Next.js, React, TypeScript, and
vinext.

## Portfolio structure

The homepage contains:

1. a short engineering introduction;
2. QARAR, Maeen, MIP, and Numo Ads;
3. employment and freelance experience;
4. a brief about section and contact links.

The legacy QARAR route at `app/work/qarar/page.tsx` redirects to its section on
the homepage so the public story remains in one place.

## Career and project context

Keep these distinctions intact whenever the portfolio is updated:

- Mrasim is current employment beginning in April 2026. QARAR is private team
  work performed within that role.
- MIP followed Nana. Sameer’s primary MIP role was Marketing Manager, with the
  public Next.js website rebuild as an additional engineering contribution.
- Nana was a Product Manager internship.
- Maeen is ongoing freelance work that began in 2023, not employment.
- Numo Ads is the personal `Numo-Ads-prototype` project. It is an Arabic-first
  Vue 3 and Laravel 12 prototype for Snapchat campaign setup, Content Lab,
  1080 × 1920 / 60 FPS export, and reports. It uses local simulators and has no
  live ad-spend claim.

## Evidence conventions

Use short, factual copy. Do not add case-study headings such as “What I built,”
“My contribution,” or “How I checked it.” Avoid repository activity counts,
headline test totals, intended-capacity metrics, and repeated disclaimers.

- QARAR: describe the technical decisions and exact team contribution. The
  published screenshots use non-sensitive simulator states. Proprietary code is
  represented as sanitized pseudocode.
- MIP: the Lighthouse improvement from 77 to 100 and LCP improvement from 4.8s
  to 0.8s apply to the public website rebuild.
- Maeen: the latest summer program had 40+ active team users and benefited
  1,400+ students. Sameer first joined Maeen as a student in 2018, then became
  a teacher and developer. Do not publish estimated lifetime totals until they
  are verified, and do not attribute the program's full impact to the website.
- Numo Ads: keep the public description to the prototype’s visible product
  areas, stack, export format, and one short local-simulator boundary.
- Prototypes use one clear status label such as “Local prototype” or “In
  development.”

Tests support a claim but do not replace the real user path. Do not turn the
portfolio into a changelog or test dashboard.

## Public assets

- `public/Sameer_Awaji_Resume.pdf` — downloadable one-page resume, kept aligned
  with the latest verified portfolio figures
- `public/og-v5.png` — social-preview visual
- `public/projects/` — live website and non-sensitive simulator captures

## Main files

- `app/page.tsx` — homepage content and structure
- `app/work/qarar/page.tsx` — legacy redirect to the QARAR homepage section
- `app/globals.css` — responsive layout and visual system
- `app/layout.tsx` — metadata and social-sharing configuration
- `scripts/build_resume.py` — PDF resume source
- `tests/rendered-html.test.mjs` — rendered credibility and asset checks

## Commands

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
```

Before publishing, run `npm test`, `npm run lint`, and visually verify the
homepage at desktop and mobile breakpoints.
