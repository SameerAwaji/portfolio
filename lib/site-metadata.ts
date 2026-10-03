import type { Metadata } from "next";
import type { Locale } from "@/components/portfolio-page";

export const canonicalOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sameer-awaji-portfolio.kill7737.chatgpt.site";

const descriptions = {
  en: "Sameer Awaji, software engineer in Jeddah. I build web and mobile apps and am looking for a remote role.",
  ar: "سمير عواجي، مهندس برمجيات في جدة. أطوّر تطبيقات للويب والجوال وأبحث عن فرصة عمل عن بُعد.",
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
