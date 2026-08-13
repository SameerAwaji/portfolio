# Sameer Awaji — Portfolio

Sameer Awaji’s personal portfolio, built with Next.js, React, TypeScript, and
vinext. The site presents an honest early-career engineering profile supported
by product, marketing, and project-delivery experience.

## Portfolio structure

The homepage is ordered for fast recruiter scanning:

1. concise product-minded engineering position and prominent GitHub link;
2. featured QARAR engineering case-study preview;
3. visual, live MIP and Maeen project cards;
4. product judgment demonstrated through implementation decisions;
5. professional experience, working stack, prototypes, and contact.

QARAR has a dedicated technical route at `app/work/qarar/page.tsx`. It covers
architecture, identity-safe token rotation, bounded retries, UTF-8 SSE cursor
recovery, API contract integrity, sanitized code patterns, and validation.

## Career and project context

Keep these distinctions intact whenever the portfolio is updated:

- Mrasim is current employment beginning in April 2026. QARAR is private team
  work performed within that role.
- MIP followed Nana. Sameer’s primary MIP role was Marketing Manager, with the
  public Next.js website rebuild as an additional engineering contribution.
- Nana was a Product Manager internship.
- Maeen is ongoing freelance work that began in 2023, not employment.
- Automatic Marketing is a personal local prototype, separate from Mrasim, MIP,
  and Maeen.

## Evidence conventions

Lead with the implementation and why it mattered. Avoid repository activity
counts, headline test totals, intended-capacity metrics, and repeated defensive
disclaimers.

- QARAR: describe the technical decisions and exact team contribution. The
  published screenshots use non-sensitive simulator states. Proprietary code is
  represented as sanitized pseudocode.
- MIP: the Lighthouse improvement from 77 to 100 and LCP improvement from 4.8s
  to 0.8s apply to the public website rebuild.
- Maeen: describe the shipped React site, database-backed forms, and internal
  workflow dashboard without inventing usage or adoption numbers.
- Prototypes use one clear status label such as “Local prototype” or “In
  development.”

Tests support a claim but do not replace the real user path. Do not turn the
portfolio into a changelog or test dashboard.

## Public assets

- `public/Sameer_Awaji_Resume.pdf` — downloadable resume
- `public/og-v2.png` — social-preview visual
- `public/projects/` — live website and non-sensitive simulator captures

## Main files

- `app/page.tsx` — homepage content and structure
- `app/work/qarar/page.tsx` — QARAR technical case study
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

Before publishing, run `npm test`, `npm run lint`, and visually verify both the
homepage and QARAR case study at desktop and mobile breakpoints.
