import Image from "@/components/project-image";
import Link from "next/link";
import content from "@/content/portfolio.json";
import SiteBehavior from "@/app/scroll-motion";
import { canonicalOrigin } from "@/lib/site-metadata";

export type Locale = "en" | "ar";

const labels = {
  en: {
    skip: "Skip to content",
    home: "Home",
    nav: "Primary navigation",
    menu: "Menu",
    work: "Work",
    experience: "Experience",
    notes: "Notes",
    about: "About",
    contact: "Contact",
    resume: "Résumé",
    language: "العربية",
    languageLabel: "Read in Arabic",
    selectedEyebrow: "Selected work",
    selectedTitle: "Selected work.",
    skills: "Technical skills",
    downloadResume: "Download résumé",
    openSite: "Visit",
    swipe: "Swipe through screens · ← → keys",
    workflow: "Campaign workflow",
    schematic: "Workflow diagram",
    experienceTitle: "Experience.",
    employment: "Employment",
    freelance: "Freelance work",
    education: "Education",
    notesTitle: "Notes from the work.",
    readNote: "Read",
    technologies: "Technologies",
    aboutTitle: "A little about me.",
    based: "Based in",
    languages: "Languages",
    contactTitle: "Let’s talk.",
    email: "Email",
    privacy: "Privacy",
    privacyCopy: "Anonymous interaction logs only. No analytics cookies or form data.",
    backTop: "Back to top",
  },
  ar: {
    skip: "تجاوز إلى المحتوى",
    home: "الرئيسية",
    nav: "التنقل الرئيسي",
    menu: "القائمة",
    work: "الأعمال",
    experience: "الخبرة",
    notes: "ملاحظات",
    about: "عني",
    contact: "تواصل",
    resume: "السيرة الذاتية",
    language: "English",
    languageLabel: "Read in English",
    selectedEyebrow: "أعمال مختارة",
    selectedTitle: "أعمال مختارة.",
    skills: "المهارات التقنية",
    downloadResume: "تحميل السيرة",
    openSite: "زيارة",
    swipe: "اسحب أو استخدم مفتاحَي ← →",
    workflow: "مسار الحملة",
    schematic: "مخطط لمسار العمل",
    experienceTitle: "الخبرة.",
    employment: "الوظائف",
    freelance: "عمل مستقل",
    education: "التعليم",
    notesTitle: "ملاحظات من العمل.",
    readNote: "اقرأ الملاحظة",
    technologies: "التقنيات",
    aboutTitle: "نبذة عني.",
    based: "الموقع",
    languages: "اللغات",
    contactTitle: "لنتواصل.",
    email: "البريد",
    privacy: "الخصوصية",
    privacyCopy: "سجلات تفاعل مجهولة فقط. بلا ملفات تحليلات أو بيانات نماذج.",
    backTop: "العودة للأعلى",
  },
} as const;

function pick(value: { en: string; ar: string }, locale: Locale) {
  return value[locale];
}

function projectById(id: string) {
  const project = content.projects.find((item) => item.id === id);
  if (!project) throw new Error(`Missing project: ${id}`);
  return project;
}

const numoStages = {
  en: ["Project selection", "Campaign planning", "Content", "Review"],
  ar: ["اختيار المشروع", "تخطيط الحملة", "إعداد المحتوى", "المراجعة"],
} as const;

function NumoStages({ locale }: { locale: Locale }) {
  return (
    <ol aria-label={labels[locale].workflow}>
      {numoStages[locale].map((stage, index) => (
        <li key={stage}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{stage}</strong>
        </li>
      ))}
    </ol>
  );
}

function localePath(locale: Locale, path = "") {
  if (locale === "ar") return `/ar${path}`;
  return path || "/";
}

function ProjectHeading({
  project,
  locale,
}: {
  project: (typeof content.projects)[number];
  locale: Locale;
}) {
  const l = labels[locale];

  return (
    <header className="project-heading">
      <div className="project-number" aria-hidden="true">
        {project.number}
      </div>
      <div className="project-title-group">
        <p>{pick(project.context, locale)}</p>
        <h3>{pick(project.title, locale)}</h3>
      </div>
      <span className="status-pill">{pick(project.status, locale)}</span>
      {project.link && project.id !== "mip" ? (
        <a
          className="project-link"
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-analytics="project_link"
          data-project={project.id}
        >
          {project.id === "qarar" ? (locale === "ar" ? "موقع مراسم" : "Mrasim website") : l.openSite} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </header>
  );
}

function ProjectCopy({
  project,
  locale,
}: {
  project: (typeof content.projects)[number];
  locale: Locale;
}) {
  const l = labels[locale];

  return (
    <div className="project-copy">
      <p className="project-contribution">{pick(project.summary, locale)}</p>
      <ul
        className="stack-list"
        aria-label={`${pick(project.title, locale)} — ${l.technologies}`}
      >
        {project.stack.map((item) => (
          <li key={item.en}>{pick(item, locale)}</li>
        ))}
      </ul>
      <p className="evidence-note">{pick(project.evidence, locale)}</p>
    </div>
  );
}

function QararProject({ locale }: { locale: Locale }) {
  const project = projectById("qarar");
  const l = labels[locale];

  return (
    <article className="project-card project-qarar" id="qarar" data-reveal>
      <ProjectHeading project={project} locale={locale} />
      <div className="project-body project-body-split">
        <p className="project-summary">{pick(project.description, locale)}</p>
        <ProjectCopy project={project} locale={locale} />
        <div
          className="phone-gallery"
          tabIndex={0}
          role="region"
          aria-label={locale === "ar" ? "شاشات محاكاة قرار" : "QARAR simulator screens"}
        >
          <figure>
            <Image
              src="/projects/qarar-login-preview.webp"
              alt={locale === "ar" ? "شاشة دخول عربية في قرار" : "QARAR Arabic sign-in screen"}
              width={420}
              height={913}
              sizes="(max-width: 640px) 60vw, 260px"
              zoom locale={locale}
            />
            <figcaption>{locale === "ar" ? "01 / تسجيل الدخول" : "01 / Sign in"}</figcaption>
          </figure>
          <figure>
            <Image
              src="/projects/qarar-account-clean.png"
              alt={locale === "ar" ? "إعدادات الحساب والخصوصية لضيف في قرار" : "QARAR guest account and privacy controls"}
              width={1206}
              height={2622}
              sizes="(max-width: 640px) 60vw, 260px"
              zoom locale={locale}
            />
            <figcaption>{locale === "ar" ? "02 / الحساب والخصوصية" : "02 / Account & privacy"}</figcaption>
          </figure>
        </div>
        <p className="swipe-hint">
          {l.swipe} <span aria-hidden="true">↔</span>
        </p>
      </div>
    </article>
  );
}

function MaeenProject({ locale }: { locale: Locale }) {
  const project = projectById("maeen");

  return (
    <article className="project-card project-maeen" id="maeen" data-reveal>
      <ProjectHeading project={project} locale={locale} />
      <div className="project-body">
        <p className="project-summary">{pick(project.description, locale)}</p>
        <ProjectCopy project={project} locale={locale} />
        <div className="project-impact">
          <strong><bdi>40+</bdi></strong>
          <span>{locale === "ar" ? "مستخدم نشط من الفريق" : "active team users"}</span>
        </div>
        <div className="maeen-gallery">
          <figure className="maeen-feature">
            <Image src="/projects/maeen-summer-form.png"
              alt={locale === "ar" ? "نموذج بيانات ولي الأمر والطالب للتسجيل في معين" : "Maeen registration form for guardian and student details"}
              width={1280} height={720} sizes="(max-width: 900px) 85vw, 680px" zoom locale={locale} />
            <figcaption>{locale === "ar" ? "التسجيل / بيانات ولي الأمر والطالب" : "Registration / guardian & student details"}</figcaption>
          </figure>
          <figure>
            <Image src="/projects/maeen-summer-home-preview.webp"
              alt={locale === "ar" ? "صفحة البرنامج الصيفي في معين" : "Maeen summer program homepage"}
              width={900} height={506} sizes="(max-width: 900px) 40vw, 280px" zoom locale={locale} />
            <figcaption>{locale === "ar" ? "اكتشاف البرنامج" : "Discover the program"}</figcaption>
          </figure>
          <figure>
            <Image src="/projects/maeen-summer-program-preview.webp"
              alt={locale === "ar" ? "تفاصيل البرنامج الصيفي في معين" : "Maeen summer program details"}
              width={560} height={315} sizes="(max-width: 900px) 40vw, 280px" zoom locale={locale} />
            <figcaption>{locale === "ar" ? "تفاصيل البرنامج" : "Program details"}</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

function MipProject({ locale }: { locale: Locale }) {
  const project = projectById("mip");

  return (
    <article className="project-card project-mip" id="mip" data-reveal>
      <ProjectHeading project={project} locale={locale} />
      <div className="project-body project-body-split">
        <p className="project-summary">{pick(project.description, locale)}</p>
        <ProjectCopy project={project} locale={locale} />
        <a
          className="browser-frame"
          href="https://mipksa.com"
          target="_blank"
          rel="noreferrer"
          aria-label={locale === "ar" ? "فتح موقع MIP" : "Open the MIP website"}
          data-analytics="project_visual"
          data-project="mip"
        >
          <span className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <small>mipksa.com</small>
          </span>
          <Image
            src="/projects/mip-home-preview.webp"
            alt={locale === "ar" ? "الصفحة الرئيسية لموقع MIP" : "MIP marketing agency homepage"}
            width={1000}
            height={625}
            sizes="(max-width: 780px) 92vw, 55vw"
          />
        </a>
      </div>
    </article>
  );
}

function NumoProject({ locale }: { locale: Locale }) {
  const project = projectById("numo");

  return (
    <article className="project-card project-numo" id="numo" data-reveal>
      <ProjectHeading project={project} locale={locale} />
      <div className="project-body project-body-split">
        <p className="project-summary">{pick(project.description, locale)}</p>
        <ProjectCopy project={project} locale={locale} />
        <div className="numo-schematic">
          <div className="numo-topline">
            <span>Numo Ads</span>
            <strong lang="ar" dir="rtl">
              نمو ادز
            </strong>
          </div>
          <NumoStages locale={locale} />
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const l = labels[locale];
  const isArabic = locale === "ar";
  const heroTitle = pick(content.hero.title, locale).split(/(?<=\.)\s+/);
  const languageHref = isArabic ? "/" : "/ar";
  const notePrefix = isArabic ? "/ar/notes" : "/notes";
  const emailSubject = encodeURIComponent(
    isArabic ? "دور فل-ستاك عن بعد" : "Remote full-stack engineering role",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.site.name,
    email: `mailto:${content.site.email}`,
    url: new URL(localePath(locale), canonicalOrigin).href,
    sameAs: [content.site.github, content.site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jeddah",
      addressCountry: "SA",
    },
    jobTitle: "Software Engineer",
    knowsLanguage: ["ar", "en"],
  };

  return (
    <div className="site-shell" lang={locale} dir={isArabic ? "rtl" : "ltr"} data-locale={locale}>
      <SiteBehavior locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#main-content">
        {l.skip}
      </a>

      <header className="site-header">
        <div className="page header-inner">
          <a className="wordmark" href="#top" aria-label={`${content.site.name}, ${l.home}`}>
            <span className="wordmark-mark" aria-hidden="true">SA</span>
            <span>{isArabic ? "سمير عواجي" : content.site.name}</span>
          </a>
          <nav className="desktop-nav" aria-label={l.nav}>
            <a href="#work">{l.work}</a>
            <a href="#experience">{l.experience}</a>
            <a href="#notes">{l.notes}</a>
            <a href="#about">{l.about}</a>
            <a href="#contact">{l.contact}</a>
          </nav>
          <div className="header-actions">
            <a
              className="language-link"
              href={languageHref}
              hrefLang={isArabic ? "en" : "ar"} lang={isArabic ? "en" : "ar"} dir={isArabic ? "ltr" : "rtl"}
              aria-label={l.languageLabel}
              data-analytics="language_switch"
            >
              {l.language}
            </a>
            <a
              className="resume-link"
              href="/Sameer_Awaji_Resume.pdf"
              download
              data-analytics="resume_download"
            >
              {l.resume} <span aria-hidden="true">↓</span>
            </a>
            <details className="mobile-menu">
              <summary>{l.menu}</summary>
              <nav aria-label={l.nav}>
                <a href="#work">{l.work}</a>
                <a href="#experience">{l.experience}</a>
                <a href="#notes">{l.notes}</a>
                <a href="#about">{l.about}</a>
                <a href="#contact">{l.contact}</a>
                <a className="compact-resume" href="/Sameer_Awaji_Resume.pdf" download data-analytics="resume_download">{l.resume} ↓</a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="page hero-grid">
            <div className="hero-copy">
              <p className="opportunity-label"><span className="status-dot" aria-hidden="true" />{pick(content.site.opportunities, locale)}</p>
              <p className="eyebrow">{pick(content.hero.eyebrow, locale)}</p>
              <h1><span>{heroTitle[0]}</span><em>{heroTitle[1]}</em></h1>
              <p className="hero-lead">{pick(content.hero.lead, locale)}</p>
              <ul className="hero-stack" aria-label={l.technologies} dir="ltr">
                {content.hero.stack.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <div className="hero-actions">
                <a className="button button-dark" href="#work" data-analytics="hero_work">
                  {l.selectedEyebrow}
                </a>
                <a className="button button-light" href="/Sameer_Awaji_Resume.pdf" download data-analytics="resume_download">
                  {l.downloadResume}
                </a>
              </div>
              <div className="hero-profile-links">
                <a href={content.site.github} target="_blank" rel="noreferrer" data-analytics="github_click">GitHub</a>
                <a href={content.site.linkedin} target="_blank" rel="noreferrer" data-analytics="linkedin_click">LinkedIn</a>
                <a
                  href={`mailto:${content.site.email}?subject=${emailSubject}`}
                  data-analytics="email_click"
                >
                  {l.email}
                </a>
                <span>{pick(content.site.timezone, locale)}</span>
              </div>
            </div>
            <div className="hero-showcase">
              <p className="showcase-label">{isArabic ? "الويب والجوال" : "Web & mobile"}</p>
              <a className="hero-mobile" href="#qarar" data-analytics="project_visual" data-project="qarar" aria-label={isArabic ? "استكشف مشروع قرار" : "Explore the QARAR project"}>
                <Image src="/projects/qarar-decision-preview.webp" alt={isArabic ? "إدخال القرار وتصنيفه في واجهة قرار العربية" : "QARAR’s Arabic decision entry and category selection"} width={420} height={913} sizes="(max-width: 640px) 40vw, 185px" priority />
                <span className="hero-visual-name">QARAR <span aria-hidden="true">{projectById("qarar").number}</span></span>
              </a>
              <a className="hero-web" href="#maeen" data-analytics="project_visual" data-project="maeen" aria-label={isArabic ? "استكشف مشروع معين" : "Explore the Maeen project"}>
                <span className="browser-bar" aria-hidden="true"><i /><i /><i /><small>maeen.com.sa</small></span>
                <Image src="/projects/maeen-summer-home-preview.webp" alt={isArabic ? "موقع التسجيل للبرنامج الصيفي في معين" : "Maeen’s summer program registration website"} width={900} height={506} sizes="(max-width: 640px) 75vw, 420px" priority />
                <span className="hero-visual-name">Maeen <span aria-hidden="true">{projectById("maeen").number}</span></span>
              </a>
              <a className="hero-numo" href="#numo" data-analytics="project_visual" data-project="numo" aria-label={isArabic ? "استكشف مشروع نمو ادز" : "Explore the Numo Ads project"}>
                <span className="hero-numo-name">
                  <bdi>{pick(projectById("numo").title, locale)}</bdi>
                  <span aria-hidden="true">{projectById("numo").number}</span>
                  <small>{pick(projectById("numo").status, locale)}</small>
                </span>
              </a>
              <p className="showcase-footnote">{isArabic ? "محاكاة الجوال" : "Mobile simulator"}</p>
            </div>
          </div>
        </section>

        <section className="section page" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <p className="section-index">01 / 05</p>
            <div>
              <h2 id="work-title">{l.selectedTitle}</h2>
            </div>
            <nav className="project-index" aria-label={isArabic ? "انتقل إلى المشروع" : "Jump to a project"}>
              {content.projects.map((project) => <a key={project.id} href={`#${project.id}`}>{pick(project.title, locale)}</a>)}
            </nav>
          </div>
          <div className="project-list">
            <QararProject locale={locale} />
            <MaeenProject locale={locale} />
            <NumoProject locale={locale} />
            <div className="supporting-projects">
              <MipProject locale={locale} />
            </div>
          </div>
        </section>

        <section className="section section-toned" id="experience" aria-labelledby="experience-title">
          <div className="page">
            <div className="section-heading" data-reveal>
              <p className="section-index">02 / 05</p>
              <div>
                <h2 id="experience-title">{l.experienceTitle}</h2>
              </div>
            </div>
            <div className="experience-grid">
              <div>
                <p className="list-label">{l.employment}</p>
                <div className="experience-list">
                  {content.experience.map((item) => (
                    <article
                      key={`${item.organization}-${item.period}`}
                      className={item.emphasis === "supporting" ? "is-supporting" : undefined}
                      data-reveal
                    >
                      <time>{isArabic ? item.periodAr : item.period}</time>
                      <div>
                        <h3>{pick(item.role, locale)}</h3>
                        <p>{item.organization}</p>
                        <p className="experience-description">{pick(item.note, locale)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="experience-aside" data-reveal>
                <div>
                  <p className="list-label">{l.freelance}</p>
                  <time>{isArabic ? content.freelance.periodAr : content.freelance.period}</time>
                  <h3>{pick(content.freelance.role, locale)}</h3>
                  <strong>{content.freelance.organization}</strong>
                  <p>{pick(content.freelance.note, locale)}</p>
                </div>
                <div>
                  <p className="list-label">{l.education}</p>
                  <h3>{pick(content.education.degree, locale)}</h3>
                  <strong>{pick(content.education.school, locale)}</strong>
                  <p>{content.education.year} · GPA {content.education.gpa}</p>
                </div>
              </aside>
            </div>
            <div className="skills-panel" aria-labelledby="skills-title" data-reveal>
              <h3 className="list-label" id="skills-title">{l.skills}</h3>
              <dl className="skills-grid">
                {content.skills.map((group) => (
                  <div key={group.label.en}>
                    <dt>{pick(group.label, locale)}</dt>
                    <dd><ul>{group.items.map((skill) => <li key={skill.en}><bdi>{pick(skill, locale)}</bdi></li>)}</ul></dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section page" id="notes" aria-labelledby="notes-title">
          <div className="section-heading" data-reveal>
            <p className="section-index">03 / 05</p>
            <div>
              <h2 id="notes-title">{l.notesTitle}</h2>
            </div>
          </div>
          <div className="notes-grid">
            {content.notes.map((note, index) => (
              <article key={note.slug} data-reveal>
                <Link
                  className="note-card-link"
                  href={`${notePrefix}/${note.slug}`}
                  data-analytics="note_open"
                  data-note={note.slug}
                >
                  <span className="note-card-index">0{index + 1}</span>
                  <h3>{pick(note.title, locale)}</h3>
                  <p className="note-card-description">{pick(note.dek, locale)}</p>
                  <span className="note-card-action">
                    {l.readNote} <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="page about-grid">
            <p className="section-index">04 / 05</p>
            <div data-reveal>
              <h2 id="about-title">{l.aboutTitle}</h2>
              <p className="about-description">{pick(content.about, locale)}</p>
              <aside className="about-strengths" aria-labelledby="strengths-title">
                <h3 id="strengths-title"><bdi lang="en" dir="ltr">{content.strengths.title}</bdi></h3>
                <p className="strengths-former-name">{pick(content.strengths.formerName, locale)}</p>
                <p className="strengths-description">{pick(content.strengths.description, locale)}</p>
                <p className="strengths-results-label" id="strengths-results">{pick(content.strengths.resultsLabel, locale)}</p>
                <ol className="strengths-list" aria-labelledby="strengths-results">
                  {content.strengths.topFive.map((theme) => (
                    <li key={theme.name}>
                      <bdi lang="en" dir="ltr">{theme.name}</bdi>
                      {isArabic ? <span className="strengths-translation">{" "}{theme.ar}</span> : null}
                    </li>
                  ))}
                </ol>
                <a className="strengths-source" href={content.strengths.link.url} target="_blank" rel="noreferrer">
                  {pick(content.strengths.link.label, locale)}
                </a>
              </aside>
            </div>
            <dl className="about-facts" data-reveal>
              <div>
                <dt>{l.based}</dt>
                <dd>{pick(content.site.location, locale)}</dd>
              </div>
              <div>
                <dt>{l.languages}</dt>
                <dd>{pick(content.site.languages, locale)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page contact-grid" data-reveal>
            <p className="section-index">05 / 05</p>
            <div>
              <h2 id="contact-title">{l.contactTitle}</h2>
              <p className="contact-description">
                {isArabic
                  ? "أدوار عن بُعد. جدة، UTC+3."
                  : "Remote roles. Jeddah, UTC+3."}
              </p>
            </div>
            <div className="contact-links">
              <a href="/Sameer_Awaji_Resume.pdf" download data-analytics="resume_download">
                {isArabic ? "السيرة الذاتية (PDF · الإنجليزية)" : "Résumé (PDF)"} <span aria-hidden="true">↓</span>
              </a>
              <a href="/Sameer_Awaji_Resume.txt" download>
                {isArabic ? "نسخة نصية للتقديم (الإنجليزية)" : "Plain-text résumé"}
              </a>
              <a href={`mailto:${content.site.email}?subject=${emailSubject}`} data-analytics="email_click">
                <span dir="ltr">{content.site.email}</span> <span aria-hidden="true">↗</span>
              </a>
              <a href={content.site.linkedin} target="_blank" rel="noreferrer" data-analytics="linkedin_click">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href={content.site.github} target="_blank" rel="noreferrer" data-analytics="github_click">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <dialog className="image-viewer" aria-labelledby="image-viewer-caption">
        <div className="image-viewer-toolbar">
          <p id="image-viewer-caption" />
          <button type="button" data-close-viewer autoFocus>{isArabic ? "إغلاق" : "Close"}<span aria-hidden="true">×</span></button>
        </div>
        <div className="image-viewer-content" />
      </dialog>

      <footer className="site-footer">
        <div className="page footer-grid">
          <span>© 2026 {isArabic ? "سمير عواجي" : content.site.name}</span>
          <details>
            <summary>{l.privacy}</summary>
            <p>{l.privacyCopy}</p>
          </details>
          <a href="#top">{l.backTop} ↑</a>
        </div>
      </footer>
    </div>
  );
}
