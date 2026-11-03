import type { MetadataRoute } from "next";
import content from "@/content/portfolio.json";
import { canonicalOrigin } from "@/lib/site-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const noteRoutes = content.notes.flatMap((note) => [
    {
      url: `${canonicalOrigin}/notes/${note.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.55,
      alternates: {
        languages: {
          en: `${canonicalOrigin}/notes/${note.slug}`,
          ar: `${canonicalOrigin}/ar/notes/${note.slug}`,
        },
      },
    },
    {
      url: `${canonicalOrigin}/ar/notes/${note.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.55,
      alternates: {
        languages: {
          en: `${canonicalOrigin}/notes/${note.slug}`,
          ar: `${canonicalOrigin}/ar/notes/${note.slug}`,
        },
      },
    },
  ]);

  return [
    {
      url: canonicalOrigin,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: canonicalOrigin,
          ar: `${canonicalOrigin}/ar`,
        },
      },
    },
    {
      url: `${canonicalOrigin}/ar`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: canonicalOrigin,
          ar: `${canonicalOrigin}/ar`,
        },
      },
    },
    ...noteRoutes,
  ];
}
