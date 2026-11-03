import type { Metadata } from "next";
import type { Locale } from "@/components/portfolio-page";
import content from "@/content/portfolio.json";

function hostedOrigin(): string | null {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || content.site.portfolio;
  if (
    explicit &&
    explicit.startsWith("http") &&
    !explicit.includes("chatgpt.site") &&
    !explicit.includes("github.io")
  ) {
    return explicit;
  }
  // Netlify sets URL to the primary site address, including https://.
  const netlifyUrl = process.env.URL;
  if (netlifyUrl && netlifyUrl.startsWith("http") && !netlifyUrl.includes("chatgpt.site")) {
    return netlifyUrl.replace(/\/$/, "");
  }
  return null;
}

// Local builds have no public host yet.
export const canonicalOrigin = hostedOrigin() || "http://127.0.0.1:3000";

const descriptions = {
  en: "Sameer Awaji, full-stack engineer in Jeddah (UTC+3). Arabic and RTL products with Flutter, React/Next.js, and Laravel APIs. Open to remote roles.",
  ar: "سمير عواجي، مهندس برمجيات فل-ستاك في جدة (UTC+3). منتجات عربية باتجاه RTL باستخدام Flutter وReact/Next.js وواجهات Laravel. متاح للعمل عن بُعد.",
};

export function siteMetadata(locale: Locale): Metadata {
  const isArabic = locale === "ar";
  const canonical = isArabic ? "/ar" : "/";
  const title = isArabic ? "سمير عواجي — مهندس برمجيات" : "Sameer Awaji — Software Engineer";

  return {
    metadataBase: new URL(canonicalOrigin),
    title: {
      default: title,
      template: isArabic ? "%s — سمير عواجي" : "%s — Sameer Awaji",
    },
    description: descriptions[locale],
    authors: [{ name: "Sameer Awaji" }],
    keywords: [
      "Sameer Awaji",
      "Software Engineer",
      "Remote Software Engineer",
      "Full-stack Developer",
      "Product Engineer",
      "Arabic UX",
      "Flutter",
      "Laravel",
      "Next.js",
      "React",
    ],
    alternates: {
      canonical,
      languages: {
        en: "/",
        ar: "/ar",
        "x-default": "/",
      },
    },
    openGraph: {
      title,
      description: descriptions[locale],
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? ["en_US"] : ["ar_SA"],
      url: canonical,
      images: [
        {
          url: "/og.jpg",
          width: 1672,
          height: 941,
          alt: isArabic
            ? "سمير عواجي — مهندس برمجيات"
            : "Sameer Awaji — software engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptions[locale],
      images: ["/og.jpg"],
    },
  };
}

export function noteMetadata({
  locale,
  slug,
  title,
  description,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
}): Metadata {
  const path = locale === "ar" ? `/ar/notes/${slug}` : `/notes/${slug}`;
  const other = locale === "ar" ? `/notes/${slug}` : `/ar/notes/${slug}`;

  return {
    metadataBase: new URL(canonicalOrigin),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        [locale]: path,
        [locale === "ar" ? "en" : "ar"]: other,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: ["/og.jpg"],
    },
  };
}
