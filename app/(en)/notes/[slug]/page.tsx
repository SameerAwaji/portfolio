import type { Metadata } from "next";
import { notFound } from "next/navigation";
import content from "@/content/portfolio.json";
import { findNote, NotePage } from "@/components/note-page";
import { noteMetadata } from "@/lib/site-metadata";

export function generateStaticParams() {
  return content.notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) return {};
  return noteMetadata({
    locale: "en",
    slug,
    title: note.title.en,
    description: note.dek.en,
  });
}

export default async function EnglishNote({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findNote(slug)) notFound();
  return <NotePage slug={slug} locale="en" />;
}
