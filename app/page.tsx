const featuredProjects = [
  {
    index: "01",
    title: "MIP",
    label: "Marketing management and web development",
    role: "Marketing Manager · Web development · 2025–Mar 2026",
    status: "Live website",
    summary:
      "My main role at MIP was Marketing Manager. I also rebuilt the agency website and worked on its performance and SEO.",
    problem:
      "The agency needed a better website for its marketing work, but its large visual assets made performance a challenge.",
    contribution:
      "I rebuilt the site in Next.js, improved how images were delivered, and worked on SEO and performance alongside my marketing responsibilities.",
    proof: "Lighthouse 77 → 100 · LCP 4.8s → 0.8s",
    boundary:
      "These figures are for website performance only; I don’t have a separate sales or lead figure to attach to them.",
    stack: ["Marketing", "Next.js", "Performance", "SEO"],
    href: "https://mipksa.com",
    linkLabel: "Visit MIP",
  },
  {
    index: "02",
    title: "Maeen",
    label: "Freelance website and internal tools",
    role: "Freelance developer · Since 2023",
    status: "Freelance since 2023",
    summary:
      "Maeen has been a freelance project since 2023. I built its public website and later worked on internal tools and other product needs.",
    problem:
      "The team needed a public website and a clearer way to follow work, progress, and milestones.",
    contribution:
      "I built the React and Supabase website from the design, connected forms to the database, and worked directly with stakeholders on dashboard workflows.",
    proof: "Internal software supporting 60+ users",
    boundary:
      "The dashboard was built to support 60+ users; that is not a monthly active-user figure. Games and payment work are still in progress.",
    stack: ["React", "Supabase", "Operations", "Stakeholders"],
    href: "https://maeen.com.sa",
    linkLabel: "Visit Maeen",
  },
  {
    index: "03",
    title: "QARAR",
    label: "Mobile app work through Mrasim",
    role: "Mrasim project · Since Apr 2026",
    status: "Mrasim project",
    summary:
      "QARAR is one of the projects I work on at Mrasim. My contribution includes product clarification, mobile UX, authentication, QA, and release preparation.",
    problem:
      "Phone verification could succeed, but an expert could still be sent to the wrong next step or left on a screen that appeared stuck.",
    contribution:
      "I worked across the Flutter app and Laravel API to keep phone verification separate from role onboarding, improve recovery, and test the expert journey end to end.",
    proof: "Verify phone → continue to the expert form",
    boundary:
      "This describes the part I handled within the Mrasim team, not the entire QARAR product or its permanent production status.",
    stack: ["Flutter", "Laravel", "Authentication", "Release QA"],
  },
];

const explorations = [
  {
    number: "04",
    title: "Saudi Advertising Platform",
    status: "Product spec and preview",
    text: "I worked through what an Arabic AI advertising platform would actually need: user flows, budgets, approvals, provider rules, reporting, and a frontend preview.",
    note: "It is not a live advertising platform and has not spent real campaign budgets.",
  },
  {
    number: "05",
    title: "Maeen Games",
    status: "In progress",
    text: "I’m working on a mobile-first games experience for students, including discovery, replayability, accessibility, and offline use.",
    note: "Still in local development. I am not presenting usage or launch results yet.",
  },
  {
    number: "06",
    title: "While It Runs",
    status: "Local prototype",
    text: "A Mac learning tool that turns one topic into a short briefing with cited sources and a useful video.",
    note: "It is a local prototype, not a public product.",
  },
  {
    number: "07",
    title: "Rescuel",
    status: "Product concept",
    text: "A profitability dashboard concept for agencies. I focused it on the first useful decision instead of filling the product with charts.",
    note: "It is still a concept and prototype, not a product with paying customers.",
  },
];

const experience = [
  {
    period: "Apr 2026–Present",
    title: "Mrasim",
    organization: "Current employment",
    text: "I joined Mrasim in April 2026. QARAR is one of the projects I work on, with responsibilities across product clarification, Flutter and Laravel coordination, Arabic UX, QA, and release preparation.",
  },
  {
    period: "2025–Mar 2026",
    title: "Marketing Manager",
    organization: "MIP Marketing Agency",
    text: "I joined after Nana. My main role was Marketing Manager, and I also rebuilt and improved MIP’s Next.js website.",
  },
  {
    period: "Feb–Apr 2025",
    title: "Product Manager Intern",
    organization: "Nana",
    text: "This was my first formal product role. I worked on engagement ideas, product documents, competitor research, and user acceptance testing with design, development, and marketing teams.",
  },
  {
    period: "Freelance · 2023–Present",
    title: "Freelance developer",
    organization: "Maeen",
    text: "A freelance project I started in 2023. I built the public React and Supabase website, worked directly with stakeholders, and delivered an internal dashboard built to support 60+ users.",
  },
];

const operatingPrinciples = [
  {
    number: "01",
    title: "Start with the user flow",
    text: "Before writing code, I map what the user needs to do, where it can fail, and what success should look like.",
  },
  {
    number: "02",
    title: "Stay close to the details",
    text: "I don’t throw requirements over the wall. I stay involved through design, implementation, feedback, and QA.",
  },
  {
    number: "03",
    title: "Test the actual experience",
    text: "Automated tests help, but I also run the product and follow the same path a real user will take.",
  },
  {
    number: "04",
    title: "Be clear about what shipped",
    text: "I keep local work, committed code, test releases, and production separate when I report progress.",
  },
];

const capabilities = [
  {
    title: "Frontend & mobile",
    items: "Next.js · React · TypeScript · JavaScript · Flutter · Tailwind CSS",
  },
  {
    title: "Backend & data",
    items: "Supabase · Convex · REST APIs · Laravel · MySQL · Authentication",
  },
  {
    title: "Testing & release",
    items: "Git · Automated tests · Browser and simulator QA · Release verification",
  },
  {
    title: "Product & marketing",
    items: "Requirements · Stakeholder feedback · UAT · SEO · Marketing management",
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
            <a href="#approach">How I work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
          </nav>

          <a className="header-action" href="/Sameer_Awaji_Resume.pdf" download>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="signal" aria-hidden="true" />
              <span className="eyebrow-full">
                Software engineering · Product · Marketing
              </span>
              <span className="eyebrow-short">Engineering · Product · Marketing</span>
            </p>
            <h1>
              I build software and stay close to the
              <em> product.</em>
            </h1>
            <p className="hero-intro">
              I’m a software engineer with experience in product management and
              marketing. I work on websites, mobile apps, internal tools, Arabic
              UX, and release testing.
            </p>
            <p className="arabic-line" lang="ar" dir="rtl">
              أبني منتجات ويب وجوال واضحة، عملية، وتعمل كما يجب
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                See my work <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-secondary" href="mailto:sameer2study@gmail.com">
                Email me
              </a>
            </div>
          </div>

          <aside className="hero-ledger" aria-label="Current work snapshot">
            <div className="ledger-heading">
              <span>Current snapshot</span>
              <span className="ledger-status">As of 2026</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">01</span>
              <div>
                <strong>Mrasim</strong>
                <span>Software and product work since April 2026.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">→</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">02</span>
              <div>
                <strong>Maeen</strong>
                <span>Freelance development since 2023.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">→</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-index">03</span>
              <div>
                <strong>Background</strong>
                <span>Product management, marketing, and software.</span>
              </div>
              <span className="ledger-symbol" aria-hidden="true">✓</span>
            </div>
            <div className="ledger-footer">
              <span>ARABIC / ENGLISH</span>
              <span>WEB / MOBILE</span>
              <span>PRODUCT / MARKETING</span>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Selected measurable outcomes">
          <div className="shell proof-grid">
            <div className="proof-item">
              <strong>77 → 100</strong>
              <span>Lighthouse score on the MIP rebuild</span>
            </div>
            <div className="proof-item">
              <strong>4.8s → 0.8s</strong>
              <span>LCP on the MIP rebuild</span>
            </div>
            <div className="proof-item">
              <strong>60+</strong>
              <span>People supported by the Maeen dashboard</span>
            </div>
            <div className="proof-note">
              <span>Figures shown here relate</span>
              <span>to the projects below.</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected projects / 01–03</p>
              <h2>A few projects I’m proud of.</h2>
            </div>
            <p>
              These show my work across website performance, internal tools, and
              mobile product development.
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
                      <span className="detail-label">What needed work</span>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <span className="detail-label">What I did</span>
                      <p>{project.contribution}</p>
                    </div>
                  </div>

                  <div className="case-proof">
                    <span>Result</span>
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
                      <span className="private-label">No public link</span>
                    )}
                  </div>

                  <p className="case-boundary">
                    <span>Context</span> {project.boundary}
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
                <p className="section-kicker">Other projects / 04–07</p>
                <h2 id="more-work-title">Things I’m still exploring.</h2>
              </div>
              <p>
                These are prototypes or work in progress, so each card says where
                the project currently stands.
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
                    <span>Where it stands</span>
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
              <p className="section-kicker">How I work</p>
              <h2>I like to stay close to the whole product.</h2>
            </div>
            <p>
              I am most useful when I can understand the problem, help shape the
              solution, and follow the work through testing.
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
              <p className="section-kicker">Tools and skills</p>
              <h3>What I use day to day.</h3>
              <p>
                I use AI tools to speed up research, implementation, and review,
                but I define the requirements and verify the result myself.
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
              <p className="section-kicker">Work history, freelance work & education</p>
              <h2>Where I’ve worked and what I was responsible for.</h2>
              <a href="/Sameer_Awaji_Resume.pdf" download>
                Download CV (PDF) <span aria-hidden="true">↓</span>
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
            <p className="section-kicker">About me</p>
            <h2>I’m a software engineer who also understands product and marketing.</h2>
            <p>
              I studied Software Engineering at the University of Jeddah and
              graduated in 2024. Since then, my work has crossed software
              development, product management, marketing, and freelance work.
            </p>
            <p>
              I work in Arabic and English. I like clear scope, useful feedback,
              and staying close enough to the implementation to catch problems
              before they reach users.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>If my background fits what you’re building, let’s talk.</h2>
            </div>
            <div className="contact-panel">
              <p>
                I’m interested in software engineering, product engineering, and
                technical product roles, as well as selected freelance projects.
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
                  Download CV <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>Software engineering · Product work · Arabic & English</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
