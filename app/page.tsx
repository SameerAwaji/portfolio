import Image from "next/image";
import Link from "next/link";

const experience = [
  {
    period: "Apr 2026–Present",
    role: "Software Engineer",
    organization: "Mrasim",
    text: "I work across Flutter and Laravel on QARAR: clarifying requirements, aligning app and API contracts, strengthening authentication and realtime flows, testing Arabic journeys, and preparing releases.",
  },
  {
    period: "2025–Mar 2026",
    role: "Marketing Manager",
    organization: "MIP Marketing Agency",
    text: "I led marketing work and rebuilt the agency website in Next.js, improving its technical SEO, asset delivery, Lighthouse performance, and LCP.",
  },
  {
    period: "Feb–Apr 2025",
    role: "Product Manager Intern",
    organization: "Nana",
    text: "I worked on product documents, competitor research, engagement ideas, and user acceptance testing with design, engineering, and marketing teams.",
  },
];

const capabilities = [
  ["Mobile", "Flutter · Dart · Riverpod · GoRouter · iOS simulator testing"],
  ["Backend", "Laravel · MySQL · Supabase · REST APIs · Auth · Queues"],
  ["Web", "React · Next.js · TypeScript · Performance · Technical SEO"],
  ["Delivery", "Requirements · UAT · Git · CI · OpenAPI · Release checks"],
];

const prototypes = [
  {
    title: "Automatic Marketing",
    status: "Local prototype",
    text: "An Arabic-first campaign system with API-backed workflows, queues, reporting, and deterministic creative composition.",
  },
  {
    title: "Maeen Games",
    status: "In development",
    text: "A mobile-first student games experience focused on discovery, accessibility, replay, and offline use.",
  },
  {
    title: "While It Runs",
    status: "Local learning tool",
    text: "A Mac app that turns a topic into a short briefing with cited sources and a useful video.",
  },
  {
    title: "Rescuel",
    status: "Product concept",
    text: "A profitability dashboard concept for agencies, organized around the first useful decision a user needs to make.",
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
              Product-minded software engineer · Arabic & English
            </p>
            <h1>I turn product problems into reliable web and mobile software.</h1>
            <p className="hero-intro">
              I’m an early-career software engineer with experience in product
              and marketing. At Mrasim, I work across Flutter and Laravel on
              QARAR; since 2023, I’ve built web and internal tools for Maeen.
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

          <aside className="hero-ledger" aria-label="Current work">
            <div className="ledger-heading">
              <span>Current work</span>
              <span className="ledger-status">Jeddah, Saudi Arabia</span>
            </div>
            <dl className="snapshot-list">
              <div className="snapshot-row">
                <dt>Mrasim</dt>
                <dd>Flutter and Laravel reliability work on QARAR.</dd>
              </div>
              <div className="snapshot-row">
                <dt>Maeen</dt>
                <dd>Ongoing freelance web and workflow development.</dd>
              </div>
              <div className="snapshot-row">
                <dt>Strength</dt>
                <dd>Connecting user needs, technical decisions, and release proof.</dd>
              </div>
            </dl>
          </aside>
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

        <section className="technical-preview" aria-labelledby="qarar-preview-title">
          <div className="shell technical-preview-grid">
            <div className="technical-preview-copy">
              <p className="section-kicker light-kicker">Featured engineering work</p>
              <span className="status-chip status-chip-light">Private Mrasim team product</span>
              <h2 id="qarar-preview-title">
                Stabilizing identity, retries, and realtime updates in QARAR.
              </h2>
              <p>
                I worked across the Arabic-first Flutter app and Laravel API
                where token rotation, account switching, interrupted requests,
                and SSE reconnects could collide under poor connectivity.
              </p>
              <ul className="technical-points">
                <li>Serialized, identity-bound session refresh</li>
                <li>Safe retries for idempotent work only</li>
                <li>UTF-8 SSE decoding with cursor recovery</li>
                <li>Dashboard-owned OpenAPI release contract</li>
              </ul>
              <Link className="text-link text-link-light" href="/work/qarar">
                Read the technical case study →
              </Link>
            </div>

            <div className="phone-proof" aria-label="QARAR simulator screens">
              <figure className="phone-frame phone-frame-back">
                <Image
                  src="/projects/qarar-decision-clean.png"
                  alt="QARAR Arabic decision entry flow"
                  width={1206}
                  height={2622}
                  priority
                  unoptimized
                />
              </figure>
              <figure className="phone-frame phone-frame-front">
                <Image
                  src="/projects/qarar-home-clean.png"
                  alt="QARAR Arabic guest home screen in the iOS simulator"
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
              <h2 id="live-work-title">Built, shipped, and visible.</h2>
            </div>
            <p>
              Two public websites that show how I work across customer-facing
              presentation, implementation, and long-term stakeholder needs.
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
                  The agency needed image-heavy work to remain visually
                  convincing, but those assets pushed LCP to 4.8 seconds. I
                  preserved the presentation while changing delivery and
                  technical SEO, bringing LCP to 0.8 seconds and Lighthouse
                  performance from 77 to 100.
                </p>
                <div className="result-pair" aria-label="MIP website results">
                  <div><strong>77 → 100</strong><span>Lighthouse performance</span></div>
                  <div><strong>4.8s → 0.8s</strong><span>Largest Contentful Paint</span></div>
                </div>
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
                  Since 2023, I’ve built and extended Maeen’s React and
                  Supabase website, database-backed enquiry forms, and internal
                  workflow tools in direct collaboration with the team.
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

        <section className="section judgment-section" aria-labelledby="judgment-title">
          <div className="shell judgment-grid">
            <div>
              <p className="section-kicker">Product judgment in code</p>
              <h2 id="judgment-title">The implementation follows the user risk.</h2>
            </div>
            <div className="judgment-examples">
              <article>
                <span>QARAR · identity safety</span>
                <h3>A retry is not always harmless.</h3>
                <p>
                  Read requests can recover automatically. OTP, AI, and other
                  mutations get one bounded attempt so a weak connection does
                  not duplicate a consequential user action.
                </p>
              </article>
              <article>
                <span>MIP · marketing performance</span>
                <h3>Speed did not require flattening the brand.</h3>
                <p>
                  The visual portfolio remained central to the site while its
                  assets, delivery, and technical SEO were rebuilt around a
                  faster first impression.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-kicker">Experience</p>
              <h2>Engineering, with product context.</h2>
              <p>
                I graduated in Software Engineering in 2024 and moved through
                product and marketing roles into hands-on engineering.
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
                    Public web development, database-backed forms, and internal
                    workflow tools shaped through direct stakeholder feedback.
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

        <section className="section shell tools-section" aria-labelledby="tools-title">
          <div className="section-heading compact-heading">
            <div>
              <p className="section-kicker">Working stack</p>
              <h2 id="tools-title">Tools used in the work above.</h2>
            </div>
          </div>
          <div className="capability-list">
            {capabilities.map(([title, items]) => (
              <div className="capability-row" key={title}>
                <strong>{title}</strong>
                <p>{items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-dark" aria-labelledby="other-work-title">
          <div className="shell">
            <div className="section-heading inverse compact-heading">
              <div>
                <p className="section-kicker">Exploration</p>
                <h2 id="other-work-title">Prototypes and work in progress.</h2>
              </div>
              <p>Smaller systems where I’m testing a specific product or implementation idea.</p>
            </div>
            <div className="prototype-grid">
              {prototypes.map((project) => (
                <article className="prototype-card" key={project.title}>
                  <span>{project.status}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>Looking for an engineer who can connect product and implementation?</h2>
            </div>
            <div className="contact-panel">
              <p>
                I’m open to software engineering and product-engineering roles,
                as well as selected freelance projects.
              </p>
              <a className="contact-email" href="mailto:sameer2study@gmail.com">
                sameer2study@gmail.com
              </a>
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
