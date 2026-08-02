const featuredProjects = [
  {
    title: "QARAR",
    label: "Mobile product development · Mrasim project",
    role: "Since Apr 2026",
    status: "Mrasim project",
    summary:
      "QARAR is one of the projects I work on at Mrasim. I help turn product issues into reliable mobile flows, then test those flows before release.",
    problem:
      "An expert could verify their phone successfully but still reach the wrong next step in the onboarding flow.",
    contribution:
      "I traced the journey across the Flutter app and Laravel API, kept phone verification separate from expert onboarding, improved recovery states, and tested the complete flow.",
    proof: "Verified path: phone verification → expert form",
    boundary:
      "My contribution within the Mrasim team; this is not a claim of ownership of the full product or its current production status.",
    stack: ["Flutter", "Laravel", "Authentication", "Arabic UX", "Release QA"],
  },
  {
    title: "MIP",
    label: "Marketing management and web development",
    role: "Marketing Manager · 2025–Mar 2026",
    status: "Website rebuild",
    summary:
      "My main role at MIP was Marketing Manager. I also rebuilt the agency website and improved its performance and SEO.",
    problem:
      "Large visual assets were slowing down a website that needed to present the agency’s marketing work well.",
    contribution:
      "I rebuilt the site in Next.js and improved image delivery, technical SEO, and performance alongside my marketing responsibilities.",
    proof: "Lighthouse 77 → 100 · LCP 4.8s → 0.8s",
    boundary: "Website-performance results only; no sales or lead claim.",
    stack: ["Marketing", "Next.js", "Performance", "SEO"],
    href: "https://mipksa.com",
    linkLabel: "Visit MIP",
  },
  {
    title: "Maeen",
    label: "Long-term freelance development",
    role: "Freelance developer · Since 2023",
    status: "Ongoing freelance work",
    summary:
      "I’ve worked with Maeen as a freelance developer since 2023. What began with the public website grew into forms, internal workflows, and other product improvements requested by the team.",
    problem:
      "The team needed a public website that could collect enquiries, followed by internal tools for tracking work, progress, and milestones.",
    contribution:
      "I built the React and Supabase website from the supplied design, connected its forms to the database, and worked directly with the team on dashboard workflows.",
    proof: "Dashboard built to support 60+ users",
    boundary:
      "The 60+ figure is intended capacity, not active-user data. Games and payment improvements remain in development.",
    stack: ["React", "Supabase", "Internal tools", "Stakeholder feedback"],
    href: "https://maeen.com.sa",
    linkLabel: "Visit Maeen",
  },
];

const employmentExperience = [
  {
    period: "Apr 2026–Present",
    title: "Mrasim",
    organization: "Current employment",
    text: "I joined Mrasim in April 2026. QARAR is one of the projects I work on. My responsibilities include clarifying requirements, coordinating Flutter and Laravel changes, improving Arabic UX, testing real user flows, and preparing releases.",
  },
  {
    period: "2025–Mar 2026",
    title: "Marketing Manager",
    organization: "MIP Marketing Agency",
    text: "Marketing was my main responsibility. I also rebuilt the agency’s Next.js website and improved its performance and SEO.",
  },
  {
    period: "Feb–Apr 2025",
    title: "Product Manager Intern",
    organization: "Nana",
    text: "I worked on engagement ideas, product documents, competitor research, and user acceptance testing with design, development, and marketing teams.",
  },
];

const operatingPrinciples = [
  {
    title: "Understand the flow before coding",
    text: "I work through what the user needs to do, where the journey can fail, and what a useful result should look like.",
  },
  {
    title: "Keep talking while building",
    text: "I stay in touch with the team and stakeholders as questions come up instead of treating the first brief as final.",
  },
  {
    title: "Test the same path users take",
    text: "I run the product in the browser, simulator, or release build and report clearly what works, what is local, and what is unfinished.",
  },
];

const capabilities = [
  {
    title: "Web",
    items: "React · Next.js · TypeScript · JavaScript · Tailwind CSS",
  },
  {
    title: "Mobile",
    items: "Flutter · Dart · Mobile UX · Simulator and device testing",
  },
  {
    title: "Backend",
    items: "Laravel · Supabase · MySQL · REST APIs · Authentication",
  },
  {
    title: "Product and release",
    items: "Requirements · Stakeholder feedback · UAT · Git · SEO · Release verification",
  },
];

const otherWork = [
  {
    title: "Saudi Advertising Platform",
    status: "Specification and preview",
    text: "An Arabic-first product specification and frontend preview covering campaign setup, budgets, approvals, provider rules, and reporting.",
    note: "Not a live advertising platform; no real campaigns or budget spend.",
  },
  {
    title: "Maeen Games",
    status: "In progress",
    text: "A mobile-first student games experience focused on discovery, replayability, accessibility, and offline use.",
    note: "Still in local development; no launch or usage claim.",
  },
  {
    title: "While It Runs",
    status: "Local prototype",
    text: "A Mac learning tool that turns one topic into a short briefing with cited sources and a useful video.",
    note: "Runs locally and has not been released publicly.",
  },
  {
    title: "Rescuel",
    status: "Product concept",
    text: "A profitability dashboard concept for agencies, focused on helping the user make one useful decision first.",
    note: "Concept and prototype; no customer or revenue claim.",
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
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#about">About</a>
          </nav>

          <a className="header-action" href="/Sameer_Awaji_Resume.pdf" download>
            Download CV
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="signal" aria-hidden="true" />
              Software engineer · Arabic & English
            </p>
            <h1>I build web and mobile software, from requirements to release.</h1>
            <p className="hero-intro">
              My work includes Flutter apps, React and Next.js websites, APIs,
              internal tools, Arabic UX, and release testing. My background in
              product and marketing helps me understand the user and business
              need behind the code.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="mailto:sameer2study@gmail.com?subject=Engineering%20role"
              >
                Discuss an engineering role
              </a>
              <a className="button button-secondary" href="#work">
                View my projects
              </a>
            </div>
          </div>

          <aside className="hero-ledger hero-snapshot" aria-label="Sameer at a glance">
            <div className="ledger-heading">
              <span>Right now</span>
              <span className="ledger-status">Software engineer</span>
            </div>
            <dl className="snapshot-list">
              <div className="snapshot-row">
                <dt>Mrasim</dt>
                <dd>Working on QARAR since April 2026.</dd>
              </div>
              <div className="snapshot-row">
                <dt>Maeen</dt>
                <dd>Ongoing freelance development since 2023.</dd>
              </div>
              <div className="snapshot-row">
                <dt>Focus</dt>
                <dd>Web, mobile, APIs, Arabic UX, and QA.</dd>
              </div>
            </dl>
            <div className="ledger-footer">
              <span>Arabic & English</span>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Selected measurable outcomes">
          <div className="shell proof-grid">
            <div className="proof-item">
              <strong>77 → 100</strong>
              <span>Lighthouse score · MIP website</span>
            </div>
            <div className="proof-item">
              <strong>4.8s → 0.8s</strong>
              <span>LCP · MIP website</span>
            </div>
            <div className="proof-item">
              <strong>60+</strong>
              <span>Dashboard built to support 60+ users · Maeen</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="work" data-section="selected-work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>Projects I’ve worked on.</h2>
            </div>
            <p>
              These three projects show my work across mobile flows, website
              performance, and long-term freelance development.
            </p>
          </div>

          <div className="case-list">
            {featuredProjects.map((project) => (
              <article className="case-study" key={project.title}>
                <div className="case-main">
                  <div className="case-title-row">
                    <div>
                      <span className="case-status">{project.status}</span>
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
                      <span className="detail-label">My part</span>
                      <p>{project.contribution}</p>
                    </div>
                  </div>

                  <div className="case-proof">
                    <span>Evidence</span>
                    <strong>{project.proof}</strong>
                  </div>

                  <p className="case-boundary">
                    <span>Scope</span> {project.boundary}
                  </p>

                  <div className="case-footer">
                    <ul aria-label={`${project.title} technologies and capabilities`}>
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.linkLabel}
                      </a>
                    ) : (
                      <span className="private-label">No public link</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="project-cta">
            <p>Hiring a software engineer who can work across product and implementation?</p>
            <div>
              <a href="mailto:sameer2study@gmail.com?subject=Engineering%20role">
                Email me
              </a>
              <a href="/Sameer_Awaji_Resume.pdf" download>
                Download CV
              </a>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-kicker">Experience</p>
              <h2>My path so far.</h2>
              <a href="/Sameer_Awaji_Resume.pdf" download>
                Download CV (PDF)
              </a>
            </div>

            <div className="timeline">
              <p className="timeline-group-label">Employment</p>
              {employmentExperience.map((item) => (
                <article className="timeline-item" key={`${item.title}-${item.period}`}>
                  <span className="timeline-period">{item.period}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="timeline-org">{item.organization}</p>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}

              <p className="timeline-group-label">Freelance alongside employment</p>
              <article className="timeline-item">
                <span className="timeline-period">2023–Present</span>
                <div>
                  <h3>Freelance Developer</h3>
                  <p className="timeline-org">Maeen</p>
                  <p>
                    I built the public React and Supabase website, connected
                    database-backed forms, worked directly with the team, and
                    delivered an internal dashboard built to support 60+ users.
                  </p>
                </div>
              </article>

              <p className="timeline-group-label">Education</p>
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

        <section className="section shell" id="skills">
          <div className="section-heading">
            <div>
              <p className="section-kicker">How I work</p>
              <h2>I stay involved while the work takes shape.</h2>
            </div>
            <p>
              I do my best work when I understand the user journey, stay close
              to implementation, and can test the result myself.
            </p>
          </div>

          <div className="principle-grid">
            {operatingPrinciples.map((principle) => (
              <article className="principle" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>

          <div className="capability-ledger">
            <div className="capability-intro">
              <p className="section-kicker">Tools</p>
              <h3>Tools I use for the work above.</h3>
              <p>
                The stack changes by project. These are the tools and practices
                I’ve used in the work shown on this page.
              </p>
            </div>
            <div className="capability-list">
              {capabilities.map((capability) => (
                <div className="capability-row" key={capability.title}>
                  <strong>{capability.title}</strong>
                  <p>{capability.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark other-work-section" aria-labelledby="other-work-title">
          <div className="shell">
            <div className="section-heading inverse compact-heading">
              <div>
                <p className="section-kicker">Other work</p>
                <h2 id="other-work-title">Prototypes and work in progress.</h2>
              </div>
              <p>
                Each item says where it stands. None is presented as a launched
                product with customers or usage results.
              </p>
            </div>

            <div className="other-work-list">
              {otherWork.map((project) => (
                <article className="other-work-row" key={project.title}>
                  <div>
                    <span>{project.status}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.text}</p>
                  <small>{project.note}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell about-section" id="about">
          <div className="about-marker" aria-hidden="true">
            <span>SA</span>
            <span>AR / EN</span>
          </div>
          <div className="about-copy">
            <p className="section-kicker">About</p>
            <h2>A little more about me.</h2>
            <p>
              I graduated in Software Engineering from the University of Jeddah
              in 2024. Since then, I’ve worked in product at Nana, led marketing
              at MIP while rebuilding its website, and moved into software and
              product work at Mrasim. I’ve also continued freelancing with Maeen
              since 2023.
            </p>
            <p>
              I work in Arabic and English. That mix of experience helps me talk
              with technical and non-technical people while keeping the work
              grounded in what the user actually needs.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>If you think I could help your team, send me a message.</h2>
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
                <a href="https://github.com/SameerAwaji" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/sameer-awaji-6a0986211"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a href="/Sameer_Awaji_Resume.pdf" download>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>Software engineer · Product and marketing experience · Arabic & English</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
