import Image from "next/image";
import ScrollMotion from "./scroll-motion";

const experience = [
  {
    period: "2026—Now",
    role: "Software Engineering",
    organization: "Mrasim",
    note: "Product engineering across mobile, backend, internal tools, and project work.",
  },
  {
    period: "2023—Now",
    role: "Developer & AI Tutor",
    organization: "Maeen",
    note: "Student journeys, internal operations, websites, and learning activities.",
  },
  {
    period: "2025—2026",
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
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
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
              <p className="eyebrow">Software engineer · Jeddah</p>
              <h1>I build software. I care whether it works outside the demo.</h1>
              <p className="hero-lead">
                I’m Sameer. I work across mobile, web, backend systems, and
                product decisions—usually where the real problem is bigger than
                the first request.
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
            <aside className="now-note" data-reveal>
              <span>Right now</span>
              <strong>Product engineering at Mrasim</strong>
              <p>Flutter, Laravel, internal tools, and Arabic user journeys.</p>
            </aside>
            <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
              <span>Scroll</span>
              <i aria-hidden="true"><b /></i>
            </a>
          </div>
        </section>

        <div className="belief-strip">
          <div className="page belief-inner" data-reveal>
            <span aria-hidden="true">✦</span>
            <p>
              Better user experience matters. So does changing a real workflow
              at a pace the team can actually absorb.
            </p>
          </div>
        </div>

        <section className="work-section page" id="work" aria-labelledby="work-title">
          <div className="section-index" aria-hidden="true">01</div>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">The organization first. The project inside it.</h2>
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
                <h3>QARAR is one project inside a wider role.</h3>
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

            <div className="organization-summary" data-reveal>
              <p>
                At Mrasim, I move across mobile and backend engineering,
                internal tools, reliability work, and other project needs.
                QARAR is the clearest public example I can show—not the full job.
              </p>
              <div>
                <span>Public example</span>
                <strong>QARAR</strong>
                <small>Arabic decision-support product</small>
              </div>
            </div>

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
                <p className="project-intro">
                  My recent QARAR work focused on the quiet parts users notice
                  only when they fail: sessions, recovery, and live updates
                  across Flutter and Laravel.
                </p>
                <dl className="note-list">
                  <div>
                    <dt>What I noticed</dt>
                    <dd>
                      A passing screen test could still miss a broken real
                      journey, especially when several failures happened together.
                    </dd>
                  </div>
                  <div>
                    <dt>What changed</dt>
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
                <h3>Improve the student experience without breaking the team’s workflow.</h3>
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

            <div className="maeen-copy" data-reveal>
              <p>
                For the 2026 summer program, I built a clearer student sign-up
                form and a dashboard for the team. The visible experience became
                specific to Maeen instead of feeling like a generic form.
              </p>
              <p>
                Behind it, a small script still saves registrations into Google
                Drive—the system the team already knows. I did not have time to
                build a complete student-management replacement, and forcing one
                would have created more risk than value during the program.
              </p>
            </div>

            <div className="workflow-evolution" data-reveal aria-label="Maeen registration workflow evolution">
              <div>
                <span>Before</span>
                <strong>Google Forms</strong>
                <p>Fast and familiar, but not designed around Maeen’s exact journey.</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Summer 2026</span>
                <strong>Custom form + dashboard</strong>
                <p>A better experience for students and a clearer view for the team.</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Kept for now</span>
                <strong>Google Drive workflow</strong>
                <p>The operation changes gradually; the user experience improves now.</p>
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
          </article>

          <article className="organization mip-work" id="mip">
            <header className="organization-heading" data-reveal>
              <div className="organization-number">03 / Previous role</div>
              <div className="organization-title">
                <p>Business development + marketing management · MIP</p>
                <h3>Technology was one tool for developing the business.</h3>
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

            <div className="mip-role" data-reveal>
              <span>Business development</span>
              <span>Team support</span>
              <span>Management</span>
              <span>Technology transition</span>
            </div>

            <a
              className="website-shot reveal-media"
              data-reveal
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
            <p className="project-caption" data-reveal>
              I worked on developing the business as a whole: helping the
              marketing team, improving how work was managed, and moving the
              agency toward better use of technology. Migrating the website from
              WordPress to Next.js was one visible project—not the whole role.
            </p>
          </article>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="page about-layout">
            <div className="section-index section-index-light" aria-hidden="true">02</div>
            <div className="about-main" data-reveal>
              <p className="eyebrow">A little more like me</p>
              <h2 id="about-title">I’m thoughtful before I’m loud.</h2>
              <p>
                My path has moved through engineering, product, marketing, and
                teaching. I don’t see those as separate identities. They are one
                way of working: understand the person, understand the system,
                then make the two meet.
              </p>
              <p>
                I like better systems, but I don’t confuse a rewrite with
                progress. I change a workflow when the user benefit justifies
                the disruption—and I make the next improvement possible.
              </p>
              <p>
                I use AI in almost everything I build. I don’t hide that, and I
                don’t treat its answer as proof. My part is choosing the
                direction, noticing what is wrong, and owning the final behavior.
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
              <div>
                <span>Playlist whiplash</span>
                <p>Eminem → Billie Eilish → Sherine → Abdel Halim.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="experience-section page" id="experience" aria-labelledby="experience-title">
          <div className="section-index" aria-hidden="true">03</div>
          <div className="experience-heading" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">The route here wasn’t a straight line.</h2>
            <p>
              Bachelor of Software Engineering, University of Jeddah · 2024 ·
              GPA 4.48 / 5.0
            </p>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
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
                <a href="https://github.com/SameerAwaji" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="/Sameer_Awaji_Resume.pdf" download>CV ↓</a>
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
