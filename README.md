# Sameer Awaji — Portfolio

Sameer Awaji’s personal portfolio, built with Next.js, React, TypeScript, and
vinext. The site presents an engineering-first profile supported by product,
marketing, and project-delivery experience.

## Portfolio structure

The homepage is intentionally ordered around the information a recruiter or
hiring manager needs first:

1. engineering-focused introduction;
2. a dated recent-work snapshot with evidence and limitations;
3. selected work: QARAR, MIP, then Maeen;
4. professional experience and freelance work;
5. working approach and capabilities;
6. background and contact information.

The downloadable resume lives at `public/Sameer_Awaji_Resume.pdf`, and
`public/og.png` is the social-preview image used by the page metadata.

## Career and project boundaries

Keep these distinctions intact whenever the portfolio is updated:

- Mrasim is current employment beginning in April 2026. QARAR is a project
  Sameer works on as part of that role. Do not invent a formal Mrasim job title.
- MIP followed Nana. Sameer’s primary MIP role was Marketing Manager, with web
  development as an additional responsibility.
- Nana was a Product Manager internship.
- Maeen is freelance work that began in 2023. Do not present it as employment.
- Automatic Marketing is a personal/local implementation track, not Mrasim,
  MIP, or Maeen work. Keep its local simulator evidence separate from live
  provider, payment, attribution, deployment, or production claims.

## Content and evidence conventions

Portfolio copy should sound direct and human. Lead with what Sameer did, explain
why it mattered, and avoid slogans, inflated adjectives, or generic claims about
ownership and impact.

Each featured case study uses the same four labels:

- **The problem** — the concrete situation or user need;
- **My part** — Sameer’s contribution without claiming the entire team’s work;
- **Evidence** — a measured result, verified behavior, or deliverable;
- **Scope** — the limitation or context needed to interpret that evidence.

Treat implementation, local verification, deployment, and business impact as
different claims. Plans and prototypes are not shipped products. Team outcomes
should not be written as solo achievements unless the evidence supports that
wording.

The August 5–12, 2026 snapshot is pinned to repository and validation evidence:

- QARAR had 22 Flutter commits and 7 Laravel/dashboard commits in the window.
  The 1,014-test figure belongs to the August 11 core Flutter repair; it is not
  proof of live SMS/email, Firebase, cPanel, storage, or AI-provider behavior.
- Automatic Marketing had 69 commits in the window. Its current Laravel/MySQL
  journey, provider adapters, campaign reports, and Content Lab are validated
  locally. The 1080 x 1920 H.264 export and QR decode are local render evidence,
  not proof of real Snapchat spend, Store attribution, Numo Studio integration,
  hosting, or deployment.

Metrics must preserve their original scope:

- The Lighthouse improvement from 77 to 100 and LCP improvement from 4.8s to
  0.8s refer to the MIP website rebuild.
- The Maeen dashboard was **built to support 60+ users**. This is a design and
  delivery scope, not an active-user count, adoption metric, or claim that 60+
  people were personally supported.

Do not add a paragraph about AI tools. Tools may change; the portfolio should
focus on Sameer’s engineering decisions, responsibilities, and evidence.

## Main files

- `app/page.tsx` — portfolio content and page structure
- `app/globals.css` — responsive layout and visual system
- `app/layout.tsx` — page metadata and social-sharing configuration
- `scripts/build_resume.py` — source used to generate the PDF resume
- `tests/rendered-html.test.mjs` — rendered-content and evidence-contract tests

## Commands

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
```

- `npm run dev` starts the local development server.
- `npm run build` creates the vinext production build.
- `npm test` builds the site and checks the rendered portfolio contract.
- `npm run lint` runs the repository’s ESLint configuration.

Before publishing a content change, run `npm test` and confirm that the resume
and social-preview image still match the public wording.
