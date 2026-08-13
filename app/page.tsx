import Image from "next/image";

const experience = [
  {
    period: "2026—Now",
    role: "Software Engineering",
    organization: "Mrasim",
    note: "Flutter and Laravel work on QARAR.",
  },
  {
    period: "2025—2026",
    role: "Marketing Manager",
    organization: "MIP Marketing Agency",
    note: "Led the team and rebuilt the agency website.",
  },
  {
    period: "2025",
    role: "Product Manager Intern",
    organization: "Nana",
    note: "Research, product documentation, and acceptance testing.",
  },
  {
    period: "2023—Now",
    role: "Developer & AI Tutor",
    organization: "Maeen",
    note: "Web products, internal tools, and student activities.",
  },
];

export default function Home() {
  return (
    <>
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
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
          </nav>
          <a className="header-cv" href="/Sameer_Awaji_Resume.pdf" download>
            CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero page" id="top">
          <div className="hero-index" aria-hidden="true">
            00
          </div>
          <div className="hero-main">
            <p className="eyebrow">Software engineer · Jeddah</p>
            <h1>
              I build software. I care whether it works outside the demo.
            </h1>
            <p className="hero-lead">
              I’m Sameer. I work across mobile, web, and backend systems,
              usually where product decisions and engineering meet.
            </p>
            <div className="hero-links">
              <a className="arrow-link" href="#work">
                See the work <span aria-hidden="true">↘</span>
              </a>
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
          <aside className="now-note">
            <span>Right now</span>
            <strong>QARAR at Mrasim</strong>
            <p>Flutter, Laravel, authentication, and Arabic user journeys.</p>
          </aside>
        </section>

        <div className="belief-strip">
          <div className="page belief-inner">
            <span aria-hidden="true">✦</span>
            <p>
              The question I keep coming back to: does this work in the real
              user journey?
            </p>
          </div>
        </div>

        <section className="work-section page" id="work" aria-labelledby="work-title">
          <div className="section-index" aria-hidden="true">
            01
          </div>
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Three products. Three different kinds of problems.</h2>
          </div>

          <article className="project project-qarar" id="qarar">
            <header className="project-heading">
              <div className="project-number">01 / QARAR</div>
              <div>
                <p className="project-role">Software engineering · Current work</p>
                <h3>The happy path passed. The real sign-in journey didn’t.</h3>
              </div>
              <span className="project-external">Flutter + Laravel</span>
            </header>

            <div className="qarar-layout">
              <div className="phone-stage" aria-label="QARAR mobile app screens">
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

              <div className="project-notes">
                <p className="project-intro">
                  QARAR is an Arabic decision-support app. I work across its
                  Flutter client and Laravel API, especially on the quiet parts
                  users notice only when they fail: sessions, recovery, and
                  live updates.
                </p>
                <dl className="note-list">
                  <div>
                    <dt>What I noticed</dt>
                    <dd>
                      Several failures could compete to recover one session,
                      while a passing screen test could miss the full journey.
                    </dd>
                  </div>
                  <div>
                    <dt>What changed</dt>
                    <dd>
                      One recovery path stays in control. Risky actions are not
                      replayed when they may already have completed.
                    </dd>
                  </div>
                  <div>
                    <dt>How I checked it</dt>
                    <dd>
                      The complete local suites passed on 13 Aug 2026: 1,070
                      Flutter tests and 696 Laravel tests. Live providers remain
                      a separate check.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>

          <article className="project project-web">
            <header className="project-heading">
              <div className="project-number">02 / MIP</div>
              <div>
                <p className="project-role">Marketing + web development</p>
                <h3>A marketing site that was carrying too much weight.</h3>
              </div>
              <a
                className="project-external"
                href="https://mipksa.com"
                target="_blank"
                rel="noreferrer"
              >
                Open site ↗
              </a>
            </header>
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
            <p className="project-caption">
              I led marketing at MIP and rebuilt the agency website in Next.js.
              The work joined brand judgment with engineering: responsive
              layouts, lighter image delivery, metadata, and technical SEO.
            </p>
          </article>

          <article className="project project-web">
            <header className="project-heading">
              <div className="project-number">03 / MAEEN</div>
              <div>
                <p className="project-role">Development + teaching</p>
                <h3>Close to the team, close to the students.</h3>
              </div>
              <a
                className="project-external"
                href="https://maeen.com.sa"
                target="_blank"
                rel="noreferrer"
              >
                Open site ↗
              </a>
            </header>
            <a
              className="website-shot website-shot-maeen"
              href="https://maeen.com.sa"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the live Maeen website"
            >
              <Image
                src="/projects/maeen-home.png"
                alt="Maeen education and training homepage"
                width={1440}
                height={900}
                unoptimized
              />
            </a>
            <p className="project-caption">
              I build Maeen’s public website, enquiry forms, and internal tools.
              I also help create and teach AI activities for students aged
              15–18. If I can’t explain an idea clearly, I probably don’t
              understand it yet.
            </p>
          </article>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="page about-layout">
            <div className="section-index section-index-light" aria-hidden="true">
              02
            </div>
            <div className="about-main">
              <p className="eyebrow">A little more like me</p>
              <h2 id="about-title">I’m thoughtful before I’m loud.</h2>
              <p>
                My path has moved through engineering, product, marketing, and
                teaching. I don’t see those as four separate identities. They
                are one way of working: understand the person, understand the
                system, then make the two meet.
              </p>
              <p>
                I use AI in almost everything I build. I don’t hide that, and I
                don’t treat its answer as proof. My part is choosing the
                direction, noticing what is wrong, and owning the final behavior.
              </p>
              <p>
                I learn by building. I ask a lot of questions, care about the
                details, and can be stubborn about calling something finished
                before the real path has been tried.
              </p>
            </div>
            <aside className="personal-notes" aria-label="Personal notes">
              <div>
                <span>Temperament</span>
                <p>Calm over noise. Direct over impressive.</p>
              </div>
              <div>
                <span>Usually thinking about</span>
                <p>How people learn, and why products feel harder than they should.</p>
              </div>
              <div>
                <span>Playlist whiplash</span>
                <p>Eminem → Billie Eilish → Sherine → Abdel Halim.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="experience-section page" id="experience" aria-labelledby="experience-title">
          <div className="section-index" aria-hidden="true">
            03
          </div>
          <div className="experience-heading">
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">The route here wasn’t a straight line.</h2>
            <p>
              Bachelor of Software Engineering, University of Jeddah · 2024 ·
              GPA 4.48 / 5.0
            </p>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.role}-${item.period}`}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="experience-org">{item.organization}</p>
                </div>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page contact-layout">
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
                <a
                  href="https://linkedin.com/in/sameer-awaji-6a0986211"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/SameerAwaji"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
                <a href="/Sameer_Awaji_Resume.pdf" download>
                  CV ↓
                </a>
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
