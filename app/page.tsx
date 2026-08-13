import Image from "next/image";
import Link from "next/link";

const experience = [
  {
    period: "Apr 2026–Present",
    role: "Software Engineering",
    organization: "Mrasim",
    text: "Flutter and Laravel work on QARAR, focused on authentication, reliability, Arabic flows, and releases.",
  },
  {
    period: "2025–Mar 2026",
    role: "Marketing Manager",
    organization: "MIP Marketing Agency",
    text: "Led the marketing team and rebuilt the agency website in Next.js.",
  },
  {
    period: "Feb–Apr 2025",
    role: "Product Manager Intern",
    organization: "Nana",
    text: "Worked across product research, documentation, and user acceptance testing.",
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
            <a href="#qarar-work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
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
            <h1>Hi, I’m Sameer. I build mobile and web products.</h1>
            <p className="hero-intro">
              I work on QARAR’s Flutter app and Laravel API at Mrasim, and
              build websites and internal tools for Maeen. My recent work
              focuses on authentication, reliability, and Arabic user flows.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#qarar-work">
                See my work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/SameerAwaji"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section className="technical-preview" id="qarar-work" aria-labelledby="qarar-preview-title">
          <div className="shell technical-preview-grid">
            <div className="technical-preview-copy">
              <p className="section-kicker light-kicker">Current work · QARAR at Mrasim</p>
              <h2 id="qarar-preview-title">
                Making sign-in and live updates more reliable.
              </h2>
              <p>
                QARAR is an Arabic decision-support app. I work on failure
                paths across its Flutter client and Laravel API, especially
                expired sessions and dropped connections.
              </p>
              <ul className="technical-points">
                <li>One token refresh when several requests fail together</li>
                <li>No replay when an action may have already completed</li>
                <li>Arabic updates that reconnect without broken text or duplicates</li>
              </ul>
              <p className="technical-proof">
                Checked on 13 Aug 2026: 1,070 Flutter tests and 696 Laravel
                tests passed locally.
              </p>
              <Link className="text-link text-link-light" href="/work/qarar">
                Read the QARAR story →
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
              <p className="section-kicker">More work</p>
              <h2 id="live-work-title">Two websites you can open.</h2>
            </div>
            <p>Both are live. The screenshots below link to the real sites.</p>
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
                <p className="project-overline">MIP · Website rebuild</p>
                <div className="project-title-line">
                  <h3>MIP</h3>
                  <a href="https://mipksa.com" target="_blank" rel="noreferrer">
                    Open site ↗
                  </a>
                </div>
                <p>
                  I rebuilt the agency website in Next.js and improved its
                  image delivery, responsive behavior, metadata, and technical SEO.
                </p>
                <p className="project-stack">Next.js · Responsive web · Technical SEO</p>
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
                <p className="project-overline">Maeen · Ongoing freelance</p>
                <div className="project-title-line">
                  <h3>Maeen</h3>
                  <a href="https://maeen.com.sa" target="_blank" rel="noreferrer">
                    Open site ↗
                  </a>
                </div>
                <p>
                  I build Maeen’s public website, enquiry forms, and internal
                  workflow tools, working directly with the team.
                </p>
                <p className="project-stack">React · Supabase · Internal tools</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-kicker">Experience</p>
              <h2>Where I’ve worked.</h2>
              <p>
                Before moving into engineering full-time, I worked in product
                and marketing.
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
                    Ongoing work on the public website, enquiry forms, and
                    internal workflow tools.
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
              <h2>Want to work together?</h2>
            </div>
            <div className="contact-panel">
              <p>
                I’m open to software engineering roles and a small number of
                freelance projects.
              </p>
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
          <span>Jeddah, Saudi Arabia · Arabic &amp; English</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
