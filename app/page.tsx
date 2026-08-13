import Image from "next/image";
import Link from "next/link";

const experience = [
  {
    period: "Apr 2026–Present",
    role: "Software Engineer",
    organization: "Mrasim",
    text: "I work across Flutter and Laravel on QARAR: clarifying requirements, aligning app and API contracts, strengthening authentication and real-time flows, testing Arabic journeys, and preparing releases.",
  },
  {
    period: "2025–Mar 2026",
    role: "Marketing Manager",
    organization: "MIP Marketing Agency",
    text: "I led marketing work and rebuilt the agency website in Next.js, improving image delivery, responsive behavior, metadata, and technical SEO.",
  },
  {
    period: "Feb–Apr 2025",
    role: "Product Manager Intern",
    organization: "Nana",
    text: "I worked on product documents, competitor research, engagement ideas, and user acceptance testing with design, engineering, and marketing teams.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top" aria-label="Sameer Awaji, home">
            <span className="wordmark-mark">SA</span>
            <span>Sameer Awaji</span>
          </a>

          <nav className="primary-nav" aria-label="Primary navigation">
            <Link href="/work/qarar">QARAR case study</Link>
            <a href="#live-work">Live work</a>
            <a href="#experience">Experience</a>
          </nav>

          <div className="header-actions">
            <a
              className="header-link"
              href="https://github.com/SameerAwaji"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a className="header-action" href="/Sameer_Awaji_Resume.pdf" download>
              Download CV
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="signal" aria-hidden="true" />
              Software engineer · Jeddah, Saudi Arabia
            </p>
            <h1>Software engineer working across Flutter, Laravel, and Next.js.</h1>
            <p className="hero-intro">
              At Mrasim, I work on authentication, request recovery, and
              real-time updates for QARAR. I also build public websites and
              internal workflow tools for Maeen, with earlier experience in
              product management and marketing.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/work/qarar">
                View the QARAR case study <span aria-hidden="true">→</span>
              </Link>
              <a
                className="button button-secondary"
                href="https://github.com/SameerAwaji"
                target="_blank"
                rel="noreferrer"
              >
                Explore GitHub ↗
              </a>
            </div>
          </div>

        </section>

        <nav className="project-index" aria-label="Featured projects">
          <div className="shell project-index-grid">
            <Link href="/work/qarar">
              <span>01 · Technical case study</span>
              <strong>QARAR</strong>
              <em>Flutter + Laravel →</em>
            </Link>
            <a href="https://mipksa.com" target="_blank" rel="noreferrer">
              <span>02 · Live website</span>
              <strong>MIP</strong>
              <em>Open site ↗</em>
            </a>
            <a href="https://maeen.com.sa" target="_blank" rel="noreferrer">
              <span>03 · Live website</span>
              <strong>Maeen</strong>
              <em>Open site ↗</em>
            </a>
          </div>
        </nav>

        <section className="technical-preview" id="qarar-work" aria-labelledby="qarar-preview-title">
          <div className="shell technical-preview-grid">
            <div className="technical-preview-copy">
              <p className="section-kicker light-kicker">Featured engineering work</p>
              <span className="status-chip status-chip-light">Private team product · details generalized</span>
              <h2 id="qarar-preview-title">
                QARAR: session refresh, retry safety, and SSE recovery.
              </h2>
              <p>
                I worked on client and API behavior for token refresh, account
                changes, retry decisions, and interrupted real-time updates.
                The public case study explains the failure modes and current
                verification without exposing internal identifiers.
              </p>
              <ul className="technical-points">
                <li>Concurrent 401 responses share one token refresh</li>
                <li>Requests from an old account stop after an account change</li>
                <li>Arabic text remains intact when an SSE chunk splits a UTF-8 character</li>
                <li>Full Flutter and Laravel suites passed on 13 Aug 2026</li>
              </ul>
              <Link className="text-link text-link-light" href="/work/qarar">
                Read the technical case study →
              </Link>
            </div>

            <div className="phone-proof" aria-label="QARAR simulator screens">
              <figure className="phone-frame phone-frame-splash">
                <Image
                  src="/projects/qarar-splash-clean.png"
                  alt="QARAR loading screen in the iOS simulator"
                  width={1206}
                  height={2622}
                  priority
                  unoptimized
                />
              </figure>
              <figure className="phone-frame phone-frame-login">
                <Image
                  src="/projects/qarar-login-clean.png"
                  alt="QARAR Arabic main login screen in the iOS simulator"
                  width={1206}
                  height={2622}
                  priority
                  unoptimized
                />
              </figure>
              <figure className="phone-frame phone-frame-home">
                <Image
                  src="/projects/qarar-home-clean.png"
                  alt="QARAR Arabic guest home screen in the iOS simulator"
                  width={1206}
                  height={2622}
                  priority
                  unoptimized
                />
              </figure>
              <figure className="phone-frame phone-frame-decision">
                <Image
                  src="/projects/qarar-decision-clean.png"
                  alt="QARAR Arabic decision entry flow"
                  width={1206}
                  height={2622}
                  priority
                  unoptimized
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section shell" id="live-work" aria-labelledby="live-work-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Live work</p>
              <h2 id="live-work-title">Public websites I built.</h2>
            </div>
            <p>
              Open either site to inspect the work directly. My role and the
              technologies used are listed below each screenshot.
            </p>
          </div>

          <div className="live-project-grid">
            <article className="live-project-card">
              <a
                className="project-image-link"
                href="https://mipksa.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the live MIP website"
              >
                <Image
                  src="/projects/mip-home.png"
                  alt="MIP marketing agency live website homepage"
                  width={1272}
                  height={716}
                  unoptimized
                />
              </a>
              <div className="project-card-body">
                <div className="project-title-line">
                  <div>
                    <span className="status-chip">Live website</span>
                    <h3>MIP</h3>
                  </div>
                  <a href="https://mipksa.com" target="_blank" rel="noreferrer">
                    Open live site ↗
                  </a>
                </div>
                <p>
                  I rebuilt the agency website in Next.js, improving image
                  delivery, responsive behavior, metadata, and technical SEO
                  for a media-heavy public site.
                </p>
                <ul className="deliverable-list" aria-label="MIP deliverables">
                  <li>Next.js rebuild</li>
                  <li>Image delivery</li>
                  <li>Responsive and technical SEO work</li>
                </ul>
              </div>
            </article>

            <article className="live-project-card">
              <a
                className="project-image-link"
                href="https://maeen.com.sa"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the live Maeen website"
              >
                <Image
                  src="/projects/maeen-home.png"
                  alt="Maeen education and training live website homepage"
                  width={1440}
                  height={900}
                  unoptimized
                />
              </a>
              <div className="project-card-body">
                <div className="project-title-line">
                  <div>
                    <span className="status-chip">Live website · Ongoing freelance</span>
                    <h3>Maeen</h3>
                  </div>
                  <a href="https://maeen.com.sa" target="_blank" rel="noreferrer">
                    Open live site ↗
                  </a>
                </div>
                <p>
                  I build Maeen’s public website, enquiry forms, and internal
                  workflow tools in React and Supabase, working directly with
                  the team.
                </p>
                <ul className="deliverable-list" aria-label="Maeen deliverables">
                  <li>Public React website</li>
                  <li>Database-backed forms</li>
                  <li>Internal workflow dashboard</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-kicker">Experience</p>
              <h2>Work and education.</h2>
              <p>
                I have built web software since 2023, with additional experience
                in product management and marketing. I earned my Software
                Engineering degree in 2024.
              </p>
              <a className="text-link" href="/Sameer_Awaji_Resume.pdf" download>
                Download CV (PDF) →
              </a>
            </div>

            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.role}-${item.period}`}>
                  <span className="timeline-period">{item.period}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-org">{item.organization}</p>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
              <article className="timeline-item">
                <span className="timeline-period">2023–Present</span>
                <div>
                  <h3>Freelance Developer</h3>
                  <p className="timeline-org">Maeen · alongside employment</p>
                  <p>
                    I build Maeen’s public website, enquiry forms, and internal
                    workflow tools in React and Supabase, working directly with
                    the team.
                  </p>
                </div>
              </article>
              <article className="timeline-item education-item">
                <span className="timeline-period">2024</span>
                <div>
                  <h3>Bachelor of Software Engineering</h3>
                  <p className="timeline-org">University of Jeddah · GPA 4.48 / 5.0</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>Available for software engineering roles and selected projects.</h2>
            </div>
            <div className="contact-panel">
              <div className="contact-links">
                <a href="https://github.com/SameerAwaji" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="https://linkedin.com/in/sameer-awaji-6a0986211" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="/Sameer_Awaji_Resume.pdf" download>Download CV</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>Software engineer · Product and marketing experience · Arabic & English</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
