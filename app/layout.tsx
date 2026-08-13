import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Sameer Awaji — Software Engineer",
    description:
      "Sameer Awaji is a software engineer working across Flutter, Laravel, web, APIs, Arabic UX, backend workflows, and release testing.",
    authors: [{ name: "Sameer Awaji" }],
    keywords: [
      "Sameer Awaji",
      "Product Engineer",
      "Software Engineer",
      "React",
      "Next.js",
      "Flutter",
      "Laravel",
      "API Reliability",
      "Product Management",
      "Arabic UX",
    ],
    openGraph: {
      title: "Sameer Awaji — Software Engineer",
      description:
        "Flutter, Laravel, web software, API workflows, Arabic UX, and release testing, supported by product and marketing experience.",
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og.png`,
          width: 1672,
          height: 941,
          alt: "Sameer Awaji — software engineer working across Flutter, Laravel, web, and Arabic UX",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sameer Awaji — Software Engineer",
      description:
        "Flutter, Laravel, web software, API workflows, Arabic UX, and release testing.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
