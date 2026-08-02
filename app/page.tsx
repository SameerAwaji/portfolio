const featuredProjects = [
  {
    index: "01",
    title: "MIP",
    label: "Performance-led website rebuild",
    role: "Frontend Developer · 2024–2025",
    status: "Production result",
    summary:
      "A media-heavy agency website rebuilt around speed, clarity, and a stronger first impression.",
    problem:
      "The site needed a complete frontend refresh without letting high-resolution visual content compromise performance.",
    contribution:
      "Rebuilt the experience in Next.js, improved frontend delivery and media handling, and strengthened its SEO foundation.",
    proof: "Lighthouse 77 → 100 · LCP 4.8s → 0.8s",
    boundary:
      "Performance is verified through the professional record; no conversion or revenue claim is attached.",
    stack: ["Next.js", "React", "Performance", "SEO"],
    href: "https://mipksa.com",
    linkLabel: "Visit MIP",
  },
  {
    index: "02",
    title: "Maeen",
    label: "Public experience and operations platform",
    role: "Web Developer · 2024–2025",
    status: "Operational product",
    summary:
      "A public website and internal product connecting stakeholder needs, program visibility, and day-to-day operations.",
    problem:
      "The team needed a polished public experience and better internal visibility across progress, milestones, and operational workflows.",
    contribution:
      "Built the React and Supabase experience from design, added database-backed forms, and delivered dashboard workflows while iterating directly with stakeholders.",
    proof: "Internal software supporting 60+ users",
    boundary:
      "The audience figure means supported users, not monthly active users. Current games and payment work are not presented as launched.",
    stack: ["React", "Supabase", "Operations", "Stakeholders"],
    href: "https://maeen.com.sa",
    linkLabel: "Visit Maeen",
  },
  {
    index: "03",
    title: "QARAR",
    label: "Arabic-first mobile authentication",
    role: "Selected product engineering · 2026",
    status: "Committed release checkpoint",
    summary:
      "Cross-system mobile work that restored the intended expert onboarding journey and made release evidence part of the solution.",
    problem:
      "Phone verification could succeed while an expert was sent into the wrong role journey or left behind an apparently unresponsive screen.",
    contribution:
      "Coordinated Flutter and Laravel OTP behavior, separated identity from role continuation, strengthened recovery paths, and verified the real application journey.",
    proof: "Verify phone → continue to the expert form",
    boundary:
      "This is a verified historical delivery checkpoint, not a claim of permanent production health or sole authorship.",
    stack: ["Flutter", "Laravel", "Authentication", "Release QA"],
  },
];

const explorations = [
  {
    number: "04",
    title: "Saudi Advertising Platform",
    status: "Specification + preview",
    text: "Translated a broad AI advertising idea into Arabic-first journeys, provider boundaries, approval states, reporting behavior, governance, and release gates.",
    note: "Validated product baseline; no live provider execution or campaign spend is claimed.",
  },
  {
    number: "05",
    title: "Maeen Games",
    status: "Active development",
    text: "Shaped a public, mobile-first student games and trip experience around discovery, progression, accessibility, and honest release criteria.",
    note: "Local work in progress; engagement and production readiness are not yet established.",
  },
  {
    number: "06",
    title: "While It Runs",
    status: "Local prototype",
    text: "Defined a privacy-conscious Mac learning product that turns one topic into a focused, source-backed briefing and verified media path.",
    note: "A disciplined product definition and local prototype, not a public SaaS launch.",
  },
  {
    number: "07",
    title: "Rescuel",
    status: "Product exploration",
    text: "Assessed a profitability product for agencies and narrowed a sophisticated dashboard concept to the activation loop needed for trustworthy decisions.",
    note: "Product prioritization and prototype evidence; paying customers are not claimed.",
  },
];

const experience = [
  {
    period: "2026",
    title: "Selected Product Engineering Work",
    organization: "Independent project portfolio",
    text: "Arabic-first web and mobile systems spanning Flutter/Laravel authentication, operational workflows, product specifications, QA, and release preparation.",
  },
  {
    period: "Feb–Apr 2025",
    title: "Product Manager Intern",
    organization: "Nana",
    text: "Contributed to engagement concepts, cross-functional product documentation, competitive analysis, and user acceptance testing.",
  },
  {
    period: "2024–2025",
    title: "Web Developer",
    organization: "Maeen",
    text: "Built the public React/Supabase product and an internal progress dashboard supporting 60+ users while managing stakeholder requirements directly.",
  },
  {
    period: "2024–2025",
    title: "Frontend Developer",
    organization: "MIP Marketing Agency",
    text: "Rebuilt the agency website in Next.js and delivered measurable improvements in Lighthouse performance and Largest Contentful Paint.",
  },
];

const operatingPrinciples = [
  {
    number: "01",
    title: "Frame the real problem",
    text: "I turn unclear goals into user journeys, explicit constraints, and a scope the team can actually test.",
  },
  {
    number: "02",
    title: "Build across the handoff",
    text: "I stay close to product decisions and implementation so intent is not lost between requirements, code, and QA.",
  },
  {
    number: "03",
    title: "Verify the real path",
    text: "Tests are evidence, not the finish line. I check the journey a real user will take and preserve the limitation honestly.",
  },
  {
    number: "04",
    title: "Control the release",
    text: "I separate local, committed, released, and production states so the team can move quickly without confusing activity with delivery.",
  },
];

const capabilities = [
  {
    title: "Product UI",
    items: "Next.js · React · TypeScript · JavaScript · Flutter · Tailwind CSS",
  },
  {
    title: "Systems & data",
    items: "Supabase · Convex · REST APIs · Laravel · MySQL · Authentication",
  },
  {
    title: "Quality & delivery",
    items: "Git · Automated tests · Browser and simulator QA · Release verification",
  },
  {
    title: "Product practice",
    items: "Requirements · Acceptance criteria · Stakeholder iteration · UAT · Release gates",
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
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
          </nav>

          <a className="header-action" href="/Sameer_Awaji_Resume.pdf" download>
            Résumé <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="signal" aria-hidden="true" />
              <span className="eyebrow-full">
                Software engineering · Product thinking · Delivery
              </span>
              <span className="eyebrow-short">Engineering · Product · Delivery</span>
            </p>
            <h1>
              I turn ambiguous product ideas into software people can
              <em> trust.</em>
            </h1>
            <p className="hero-intro">
              Product-minded software engineer connecting product judgment,
              implementation, Arabic-first UX, and real-path verification across
              web and mobile products.
            </p>
            <p className="arabic-line" lang="ar" dir="rtl">
              من فكرة غير واضحة إلى منتج يمكن اختباره والثقة به
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View selected work <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-secondary" href="mailto:sameer2study@gmail.com">
                Start a conversation
              </a>
            </div>
          </div>

          <aside className="hero-ledger" aria-label="Delivery snapshot">
            <div className="ledger-heading">
              <span>Delivery ledger</span>
              <span className="ledger-status">Verified where it matters</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">01</span>
              <div>
                <strong>Product judgment</strong>
                <span>Turn the brief into the right problem.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">→</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">02</span>
              <div>
                <strong>Engineering ownership</strong>
                <span>Build across interface and system boundaries.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">→</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">03</span>
              <div>
                <strong>Release evidence</strong>
                <span>Prove the user path, not just the activity.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">✓</span>
            </div>
            <div className="ledger-footer">
              <span>AR / EN</span>
              <span>WEB / MOBILE</span>
              <span>PRODUCT / DELIVERY</span>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Selected measurable outcomes">
          <div className="shell proof-grid">
            <div className="proof-item">
              <strong>77 → 100</strong>
              <span>Lighthouse performance</span>
            </div>
            <div className="proof-item">
              <strong>4.8s → 0.8s</strong>
              <span>Largest Contentful Paint</span>
            </div>
            <div className="proof-item">
              <strong>60+</strong>
              <span>Users supported by internal software</span>
            </div>
            <div className="proof-note">
              <span>Evidence over adjectives.</span>
              <span>Scope over noise.</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected work / 01–03</p>
              <h2>Products shaped from problem to proof.</h2>
            </div>
            <p>
              Three stories that show performance, operational ownership, and
              cross-system delivery—with the evidence boundary kept visible.
            </p>
          </div>

          <div className="case-list">
            {featuredProjects.map((project) => (
              <article className="case-study" key={project.title}>
                <div className="case-rail">
                  <span className="case-index">{project.index}</span>
                  <span className="case-status">{project.status}</span>
                </div>

                <div className="case-main">
                  <div className="case-title-row">
                    <div>
                      <p>{project.label}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="case-role">{project.role}</span>
                  </div>

                  <p className="case-summary">{project.summary}</p>

                  <div className="case-details">
                    <div>
                      <span className="detail-label">The problem</span>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <span className="detail-label">My contribution</span>
                      <p>{project.contribution}</p>
                    </div>
                  </div>

                  <div className="case-proof">
                    <span>Proof</span>
                    <strong>{project.proof}</strong>
                  </div>

                  <div className="case-footer">
                    <ul aria-label={`${project.title} technologies and capabilities`}>
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="private-label">Private case study</span>
                    )}
                  </div>

                  <p className="case-boundary">
                    <span>Boundary</span> {project.boundary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-dark" aria-labelledby="more-work-title">
          <div className="shell">
            <div className="section-heading inverse">
              <div>
                <p className="section-kicker">More work / 04–07</p>
                <h2 id="more-work-title">Explorations with honest status.</h2>
              </div>
              <p>
                Architecture, games, learning, and commercial product thinking—
                presented for what each project proves today.
              </p>
            </div>

            <div className="exploration-grid">
              {explorations.map((project) => (
                <article className="exploration-card" key={project.title}>
                  <div className="exploration-topline">
                    <span>{project.number}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  <div className="exploration-note">
                    <span>Current boundary</span>
                    <p>{project.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell" id="approach">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Operating method</p>
              <h2>How I move work forward.</h2>
            </div>
            <p>
              The useful part of crossing engineering, product, and delivery is
              reducing the gaps between them.
            </p>
          </div>

          <div className="principle-grid">
            {operatingPrinciples.map((principle) => (
              <article className="principle" key={principle.title}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>

          <div className="capability-ledger">
            <div className="capability-intro">
              <p className="section-kicker">Working toolkit</p>
              <h3>Broad enough to connect the system. Focused enough to ship.</h3>
              <p>
                I use AI-assisted workflows to accelerate research, implementation,
                and review while owning the constraints, acceptance standards, and
                final decisions.
              </p>
            </div>
            <div className="capability-list">
              {capabilities.map((capability, index) => (
                <div className="capability-row" key={capability.title}>
                  <span>0{index + 1}</span>
                  <strong>{capability.title}</strong>
                  <p>{capability.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-kicker">Experience & education</p>
              <h2>A software engineering foundation, expanded through product ownership.</h2>
              <a href="/Sameer_Awaji_Resume.pdf" download>
                Download résumé (PDF) <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.title}-${item.period}`}>
                  <span className="timeline-period">{item.period}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="timeline-org">{item.organization}</p>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}

              <article className="timeline-item education-item">
                <span className="timeline-period">2024</span>
                <div>
                  <h3>Bachelor of Software Engineering</h3>
                  <p className="timeline-org">University of Jeddah</p>
                  <p>GPA 4.48 / 5.0 · Web development, algorithms, and software architecture.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section shell about-section" id="about">
          <div className="about-marker" aria-hidden="true">
            <span>SA</span>
            <span>AR / EN</span>
          </div>
          <div className="about-copy">
            <p className="section-kicker">About Sameer</p>
            <h2>I work best where product decisions and implementation need to stay connected.</h2>
            <p>
              I am a Software Engineering graduate with formal product-management
              experience and a frontend-first technical foundation. I build in
              Arabic and English, care about clear scope and reliable user journeys,
              and enjoy the point where a business need becomes a real product
              decision and then a testable implementation.
            </p>
            <p>
              My value is not a long list of tools. It is the ability to frame the
              right problem, move between product and engineering detail, challenge
              false completion, and leave the team with evidence it can trust.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">Let’s work together</p>
              <h2>Have a product problem that needs both engineering and product judgment?</h2>
            </div>
            <div className="contact-panel">
              <p>
                For product engineering roles, technical product opportunities, or
                project conversations, I would be glad to hear what you are building.
              </p>
              <a className="contact-email" href="mailto:sameer2study@gmail.com">
                sameer2study@gmail.com <span aria-hidden="true">↗</span>
              </a>
              <div className="contact-links">
                <a href="https://github.com/SameerAwaji" target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://linkedin.com/in/sameer-awaji-6a0986211"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a href="/Sameer_Awaji_Resume.pdf" download>
                  Résumé <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>Product judgment · Engineering craft · Verified delivery</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
