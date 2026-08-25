import Image from "next/image";
import ScrollMotion from "./scroll-motion";

const employment = [
  {
    period: "2026—Now",
    role: "Software Engineering",
    organization: "Mrasim",
    note: "Product engineering across mobile, backend, internal tools, and project work.",
  },
  {
    period: "2025—Mar 2026",
    role: "Marketing & Business Development",
    organization: "MIP Marketing Agency",
    note: "Team support, management, business development, and technology adoption.",
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
    note: "Student journeys, internal operations, websites, and learning activities.",
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
            <a href="#numo">Numo</a>
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
              <p className="eyebrow">Software engineer · Arabic &amp; English · Jeddah</p>
              <h1>I build software. I care whether it works outside the demo.</h1>
              <p className="hero-lead">
                I’m Sameer. I work across Flutter, Laravel, React, and Next.js—from
                Arabic user journeys to APIs and release checks—usually where the
                real problem is bigger than the first request.
              </p>
              <div className="hero-links">
                <a
                  className="arrow-link"
                  href="mailto:sameer2study@gmail.com?subject=Engineering%20role"
                >
                  Discuss an engineering role <span aria-hidden="true">↗</span>
                </a>
                <a className="plain-link" href="#work">See the work ↘</a>
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
              <span>Right now</span>
              <strong>Building software at Mrasim</strong>
              <p>Flutter, Laravel, internal tools, and Arabic user journeys.</p>
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
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Work I can show.</h2>
          </div>

          <article className="organization mrasim-work" id="mrasim">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">01 / Current role</div>
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
                <p>Software engineering · Mrasim</p>
                <h3>QARAR: mobile and backend reliability.</h3>
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
                <div className="project-intro-group">
                  <div className="qarar-stack" aria-label="QARAR technology and product context">
                    <span>Flutter</span>
                    <span>Laravel</span>
                    <span>Arabic UX</span>
                  </div>
                  <p className="project-intro">
                    A public example from my wider work at Mrasim.
                  </p>
                </div>
                <dl className="note-list">
                  <div>
                    <dt>What I built</dt>
                    <dd>
                      Flutter and Laravel changes around sessions, recovery, and
                      live updates.
                    </dd>
                  </div>
                  <div>
                    <dt>My contribution</dt>
                    <dd>
                      One recovery path stays in control, and risky actions are
                      not replayed when they may already have completed.
                    </dd>
                  </div>
                  <div>
                    <dt>How I checked it</dt>
                    <dd>
                      The complete local Flutter and Laravel suites passed. Live
                      providers and deployed behavior remain separate checks.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>

          <article className="organization maeen-work" id="maeen">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">02 / Ongoing</div>
              <div className="organization-title">
                <p>Development + teaching · Maeen</p>
                <h3>I joined as a student. Now I teach and build for Maeen.</h3>
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

            <dl className="note-list note-list-wide" data-reveal>
              <div>
                <dt>What I built</dt>
                <dd>A Maeen-specific summer-program form and a dashboard for the team.</dd>
              </div>
              <div>
                <dt>My contribution</dt>
                <dd>
                  I replaced the generic student-facing form while keeping
                  registrations in the Google Drive workflow the team already used.
                </dd>
              </div>
              <div>
                <dt>How I checked it</dt>
                <dd>
                  The screenshots are from the real 2026 summer-program pages.
                </dd>
              </div>
            </dl>
          </article>

          <article className="organization mip-work" id="mip">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">03 / Previous role</div>
              <div className="organization-title">
                <p>Business development + marketing management · MIP</p>
                <h3>A Next.js website project inside a wider business role.</h3>
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

            <dl className="note-list note-list-wide" data-reveal>
              <div>
                <dt>What I built</dt>
                <dd>I migrated the MIP website from WordPress to Next.js.</dd>
              </div>
              <div>
                <dt>My contribution</dt>
                <dd>
                  The website was one part of broader work across business
                  development, team support, management, and technology adoption.
                </dd>
              </div>
              <div>
                <dt>How I checked it</dt>
                <dd>The screenshot is from the public website linked above.</dd>
              </div>
            </dl>
          </article>

          <article className="organization numo-work" id="numo">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">04 / Current build</div>
              <div className="organization-title">
                <p>Personal product · Private build</p>
                <h3>
                  Numo Ads <span className="numo-title-ar" lang="ar" dir="rtl">نمو ادز</span>
                </h3>
              </div>
              <div className="organization-status">Locally validated</div>
            </header>

            <div className="numo-layout">
              <div
                className="numo-system reveal-media"
                data-reveal
                aria-label="Numo Ads four-stage customer journey"
              >
                <div className="numo-system-head">
                  <span>Numo Ads</span>
                  <strong lang="ar" dir="rtl">نمو ادز</strong>
                </div>
                <ol className="numo-stages">
                  <li>
                    <small>01</small>
                    <div>
                      <strong lang="ar" dir="rtl">اختيار المشروع</strong>
                      <span>Project selection</span>
                    </div>
                  </li>
                  <li>
                    <small>02</small>
                    <div>
                      <strong lang="ar" dir="rtl">تجهيز المحتوى</strong>
                      <span>Content preparation</span>
                    </div>
                  </li>
                  <li>
                    <small>03</small>
                    <div>
                      <strong lang="ar" dir="rtl">نشر الحملة</strong>
                      <span>Campaign publishing</span>
                    </div>
                  </li>
                  <li>
                    <small>04</small>
                    <div>
                      <strong lang="ar" dir="rtl">التسويق</strong>
                      <span>Marketing and reporting</span>
                    </div>
                  </li>
                </ol>
                <p className="numo-boundary">
                  <span>LOCAL_VALIDATED</span>
                  Synthetic provider evidence
                </p>
              </div>

              <div className="project-notes" data-reveal>
                <div className="project-intro-group">
                  <div className="qarar-stack numo-stack" aria-label="Numo Ads technology stack">
                    <span>Vue 3</span>
                    <span>Laravel 12</span>
                    <span>Arabic RTL</span>
                  </div>
                  <p className="project-intro">
                    A private Arabic-first workspace for the campaign journey
                    from project selection through reporting.
                  </p>
                </div>
                <dl className="note-list">
                  <div>
                    <dt>What I built</dt>
                    <dd>
                      A Vue customer app and Laravel modular monolith for
                      campaign, content, finance, and report workflows.
                    </dd>
                  </div>
                  <div>
                    <dt>What works today</dt>
                    <dd>
                      The complete path is locally validated against deterministic
                      HTTP simulators, including protected vertical MP4 exports.
                    </dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>
                      Real ad publication, spend, provider approval, and live Numo
                      Store or Studio integrations are not claimed.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        </section>

        <section className="experience-section page" id="experience" aria-labelledby="experience-title">
          <div className="section-index" aria-hidden="true">02</div>
          <div className="experience-heading" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">The route here wasn’t a straight line.</h2>
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
              <p className="eyebrow">A little more like me</p>
              <h2 id="about-title">I’m thoughtful before I’m loud.</h2>
              <p>
                My path has moved through engineering, product, marketing, and
                teaching. I try to understand the person and the system, then
                make the two meet—without mistaking a rewrite for progress.
              </p>
            </div>
            <aside className="personal-notes" data-reveal aria-label="Personal notes">
              <div>
                <span>Temperament</span>
                <p>Calm over noise. Direct over impressive.</p>
              </div>
              <div>
                <span>How I learn</span>
                <p>Build it, test it, explain it, then find what I missed.</p>
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
                I’m open to software and product-engineering roles, and a small
                number of freelance projects.
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
