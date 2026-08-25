import Image from "next/image";
import ScrollMotion from "./scroll-motion";

const employment = [
  {
    period: "2026—Now",
    role: "Software Engineering",
    organization: "Mrasim",
    note: "Flutter, Laravel, internal tools, and Arabic products.",
  },
  {
    period: "2025—Mar 2026",
    role: "Marketing & Business Development",
    organization: "MIP Marketing Agency",
    note: "Marketing management, business development, and website work.",
  },
  {
    period: "2025",
    role: "Product Manager Intern",
    organization: "Nana",
    note: "Research, product documentation, and acceptance testing.",
  },
];

const freelance = [
  {
    period: "2023—Now",
    role: "Freelance Developer & AI Tutor",
    organization: "Maeen",
    note: "Teaching, registration tools, websites, and learning activities.",
  },
];

export default function Home() {
  return (
    <>
      <ScrollMotion />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="page header-inner">
          <a className="wordmark" href="#top" aria-label="Sameer Awaji, home">
            Sameer Awaji
          </a>
          <nav className="primary-nav" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cv" href="/Sameer_Awaji_Resume.pdf" download>
            CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="page hero-grid">
            <div className="hero-index" aria-hidden="true">
              00
            </div>
            <div className="hero-main" data-reveal>
              <p className="eyebrow">Software engineer · Jeddah · Arabic / English</p>
              <h1>I build mobile apps, web products, and backend systems.</h1>
              <p className="hero-lead">
                Flutter, Laravel, React, Next.js, and Vue. I build product features,
                APIs, internal tools, and Arabic user journeys.
              </p>
              <div className="hero-links">
                <a
                  className="arrow-link"
                  href="mailto:sameer2study@gmail.com?subject=Engineering%20role"
                >
                  Email me <span aria-hidden="true">↗</span>
                </a>
                <a className="plain-link" href="#work">Projects ↘</a>
                <a
                  className="plain-link"
                  href="https://github.com/SameerAwaji"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <aside className="now-note" data-reveal>
              <span>Current</span>
              <strong>Software engineer at Mrasim</strong>
              <p>Flutter · Laravel · internal tools</p>
            </aside>
            <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
              <span>Scroll</span>
              <i aria-hidden="true"><b /></i>
            </a>
          </div>
        </section>

        <section className="work-section page" id="work" aria-labelledby="work-title">
          <div className="section-index" aria-hidden="true">01</div>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Work</p>
            <h2 id="work-title">Selected projects.</h2>
          </div>

          <article className="organization mrasim-work" id="mrasim">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">01</div>
              <div className="mrasim-lockup">
                <Image
                  src="/brands/mrasim-logo-white.svg"
                  alt="Mrasim"
                  width={187}
                  height={63}
                  unoptimized
                />
              </div>
              <div className="organization-title">
                <p>Mrasim · current role</p>
                <h3>QARAR</h3>
              </div>
              <a
                className="organization-link"
                href="https://mrasim.sa"
                target="_blank"
                rel="noreferrer"
              >
                Mrasim ↗
              </a>
            </header>

            <div className="qarar-layout" id="qarar">
              <div className="phone-stage reveal-media" data-reveal aria-label="QARAR mobile app screens">
                <figure className="phone phone-one">
                  <Image
                    src="/projects/qarar-login-clean.png"
                    alt="QARAR Arabic sign-in screen"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </figure>
                <figure className="phone phone-two">
                  <Image
                    src="/projects/qarar-home-clean.png"
                    alt="QARAR Arabic guest home screen"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </figure>
                <figure className="phone phone-three">
                  <Image
                    src="/projects/qarar-decision-clean.png"
                    alt="QARAR Arabic decision entry screen"
                    width={1206}
                    height={2622}
                    unoptimized
                  />
                </figure>
              </div>

              <div className="project-notes" data-reveal>
                <div className="qarar-stack" aria-label="QARAR technology and product context">
                  <span>Flutter</span>
                  <span>Laravel</span>
                  <span>Arabic UX</span>
                </div>
                <p className="project-summary">
                  Flutter and Laravel work on sessions, account recovery, and live
                  updates.
                </p>
                <p className="project-meta">Private project · simulator screens</p>
              </div>
            </div>
          </article>

          <article className="organization maeen-work" id="maeen">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">02</div>
              <div className="organization-title">
                <p>Maeen · freelance</p>
                <h3>Student, teacher, then developer.</h3>
              </div>
              <a
                className="organization-link"
                href="https://maeen.com.sa"
                target="_blank"
                rel="noreferrer"
              >
                Maeen ↗
              </a>
            </header>

            <div className="maeen-context" data-reveal>
              <div className="maeen-journey">
                <p className="project-label">My path with Maeen</p>
                <div
                  className="maeen-journey-path"
                  aria-label="Student in 2018, then teacher, then developer"
                >
                  <span>
                    <small>2018</small>
                    <strong>Student</strong>
                  </span>
                  <b aria-hidden="true">→</b>
                  <span>
                    <small>Later</small>
                    <strong>Teacher</strong>
                  </span>
                  <b aria-hidden="true">→</b>
                  <span>
                    <small>Today</small>
                    <strong>Developer</strong>
                  </span>
                </div>
              </div>
              <div className="maeen-impact" aria-label="Latest Maeen program impact">
                <div>
                  <strong>40+</strong>
                  <span>active team users</span>
                </div>
                <div>
                  <strong>1,400+</strong>
                  <span>students benefited in the latest summer program</span>
                </div>
              </div>
            </div>

            <div className="maeen-gallery" data-reveal>
              <figure className="maeen-shot maeen-shot-wide">
                <Image
                  src="/projects/maeen-summer-home.png"
                  alt="Maeen public homepage featuring the 2026 summer program"
                  width={1440}
                  height={900}
                  unoptimized
                />
                <figcaption>Summer program launch</figcaption>
              </figure>
              <figure className="maeen-shot">
                <Image
                  src="/projects/maeen-summer-form.png"
                  alt="Maeen summer program student registration form"
                  width={1440}
                  height={900}
                  unoptimized
                />
                <figcaption>Student sign-up journey</figcaption>
              </figure>
              <figure className="maeen-shot">
                <Image
                  src="/projects/maeen-summer-program.png"
                  alt="Maeen public 2026 summer program details page"
                  width={1440}
                  height={900}
                  unoptimized
                />
                <figcaption>Program details</figcaption>
              </figure>
            </div>

            <div className="project-copy" data-reveal>
              <p className="project-summary">
                Built the summer-program registration flow and an internal dashboard
                while keeping the team’s Google Drive workflow.
              </p>
              <p className="project-meta">Real 2026 program pages shown above</p>
            </div>
          </article>

          <article className="organization mip-work" id="mip">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">03</div>
              <div className="organization-title">
                <p>MIP · previous role</p>
                <h3>Website rebuild</h3>
              </div>
              <a
                className="organization-link"
                href="https://mipksa.com"
                target="_blank"
                rel="noreferrer"
              >
                MIP ↗
              </a>
            </header>

            <div className="mip-browser reveal-media" data-reveal>
              <div className="mip-browser-bar" aria-hidden="true">
                <span><i /><i /><i /></span>
                <small>mipksa.com</small>
              </div>
              <a
                className="website-shot"
                href="https://mipksa.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the live MIP website"
              >
                <Image
                  src="/projects/mip-home.png"
                  alt="MIP marketing agency homepage"
                  width={1272}
                  height={716}
                  unoptimized
                />
              </a>
            </div>

            <div className="project-copy" data-reveal>
              <p className="project-summary">
                Migrated mipksa.com from WordPress to Next.js.
              </p>
            </div>
          </article>

          <article className="organization numo-work" id="numo">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">04</div>
              <div className="organization-title">
                <p>Personal project</p>
                <h3>
                  Numo Ads <span className="numo-title-ar" lang="ar" dir="rtl">نمو ادز</span>
                </h3>
              </div>
              <div className="organization-status">Local prototype</div>
            </header>

            <div className="numo-card" data-reveal>
              <div className="numo-brand">
                <span>Numo Ads</span>
                <strong lang="ar" dir="rtl">نمو ادز</strong>
              </div>
              <div className="numo-details">
                <div className="qarar-stack numo-stack" aria-label="Numo Ads technology stack">
                  <span>Vue 3</span>
                  <span>Laravel 12</span>
                  <span>MySQL</span>
                </div>
                <p className="project-summary">
                  Arabic-first prototype for Snapchat campaigns.
                </p>
                <dl className="numo-facts">
                  <div>
                    <dt>Product</dt>
                    <dd>Campaign setup · Content Lab · Reports</dd>
                  </div>
                  <div>
                    <dt>Export</dt>
                    <dd>1080 × 1920 MP4 · 60 FPS</dd>
                  </div>
                </dl>
                <p className="project-meta">Local simulators · no live ad spend</p>
              </div>
            </div>
          </article>
        </section>

        <section className="experience-section page" id="experience" aria-labelledby="experience-title">
          <div className="section-index" aria-hidden="true">02</div>
          <div className="experience-heading" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">Work history.</h2>
            <p>
              Bachelor of Software Engineering, University of Jeddah · 2024 ·
              GPA 4.48 / 5.0
            </p>
          </div>
          <div className="experience-groups">
            <div className="experience-group">
              <p className="experience-group-label">Employment</p>
              <div className="experience-list">
                {employment.map((item) => (
                  <article key={`${item.role}-${item.period}`} data-reveal>
                    <span>{item.period}</span>
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience-org">{item.organization}</p>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="experience-group">
              <p className="experience-group-label">Concurrent freelance work</p>
              <div className="experience-list">
                {freelance.map((item) => (
                  <article key={`${item.role}-${item.period}`} data-reveal>
                    <span>{item.period}</span>
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience-org">{item.organization}</p>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="page about-layout">
            <div className="section-index section-index-light" aria-hidden="true">03</div>
            <div className="about-main" data-reveal>
              <p className="eyebrow">About</p>
              <h2 id="about-title">Sameer Awaji.</h2>
              <p>
                Software engineer in Jeddah. I’ve also worked in product,
                marketing, and teaching.
              </p>
            </div>
            <aside className="personal-notes" data-reveal aria-label="Personal notes">
              <div>
                <span>Based in</span>
                <p>Jeddah, Saudi Arabia</p>
              </div>
              <div>
                <span>Languages</span>
                <p>Arabic and English</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page contact-layout" data-reveal>
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Say hello.</h2>
            </div>
            <div className="contact-copy">
              <p>
                Open to software engineering and product-engineering roles.
              </p>
              <div className="contact-links">
                <a href="https://linkedin.com/in/sameer-awaji-6a0986211" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="mailto:sameer2study@gmail.com">Email ↗</a>
                <a href="https://github.com/SameerAwaji" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>Jeddah · Arabic &amp; English</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
