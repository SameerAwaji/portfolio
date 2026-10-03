import Link from "next/link";
import content from "@/content/portfolio.json";
import SiteBehavior from "@/app/scroll-motion";
import type { Locale } from "@/components/portfolio-page";

function pick(value: { en: string; ar: string }, locale: Locale) {
  return value[locale];
}

export function findNote(slug: string) {
  return content.notes.find((note) => note.slug === slug);
}

export function NotePage({ slug, locale }: { slug: string; locale: Locale }) {
  const note = findNote(slug);
  if (!note) return null;

  const isArabic = locale === "ar";
  const home = isArabic ? "/ar" : "/";
  const otherPath = isArabic ? `/notes/${slug}` : `/ar/notes/${slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pick(note.title, locale),
    description: pick(note.dek, locale),
    author: { "@type": "Person", name: content.site.name },
    inLanguage: locale,
  };

  return (
    <div className="site-shell note-shell" lang={locale} dir={isArabic ? "rtl" : "ltr"} data-locale={locale}>
      <SiteBehavior locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#note-content">
        {isArabic ? "تجاوز إلى المقال" : "Skip to article"}
      </a>
      <header className="site-header note-header">
        <div className="page header-inner">
          <Link className="wordmark" href={home} aria-label={isArabic ? "سمير عواجي — الرئيسية" : "Sameer Awaji — Home"}>
            <span className="wordmark-mark" aria-hidden="true">SA</span>
            <span>{isArabic ? "سمير عواجي" : content.site.name}</span>
          </Link>
          <div className="header-actions">
            <Link className="language-link" href={otherPath} hrefLang={isArabic ? "en" : "ar"} lang={isArabic ? "en" : "ar"} dir={isArabic ? "ltr" : "rtl"}>
              {isArabic ? "English" : "العربية"}
            </Link>
            <Link className="resume-link" href={`${home}#notes`}>
              {isArabic ? "كل الملاحظات" : "All notes"} <span aria-hidden="true">↙</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="note-content" className="note-main page">
        <header className="note-intro" data-reveal>
          <p className="eyebrow">{isArabic ? "ملاحظة هندسية" : "Engineering note"}</p>
          <h1>{pick(note.title, locale)}</h1>
          <p>{pick(note.dek, locale)}</p>
          <div className="note-meta">
            <span>{isArabic ? "سمير عواجي" : content.site.name}</span>
            <span>2026</span>
            <span>{isArabic ? "قراءة 3 دقائق" : "3 min read"}</span>
          </div>
        </header>

        <article className="note-article">
          {note.sections.map((section) => (
            <section key={section.heading.en} data-reveal>
              <h2>{pick(section.heading, locale)}</h2>
              {section.paragraphs[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>

        <nav className="note-end" aria-label={isArabic ? "تنقل الملاحظات" : "Note navigation"}>
          <Link href={`${home}#notes`}>{isArabic ? "العودة إلى الملاحظات" : "Back to notes"} ↑</Link>
          <a href={`mailto:${content.site.email}`} data-analytics="email_click">
            {isArabic ? "ناقش الفكرة" : "Discuss the idea"} ↗
          </a>
        </nav>
      </main>
    </div>
  );
}
