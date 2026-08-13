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
    title: {
      default: "Sameer Awaji — Product-minded Software Engineer",
      template: "%s",
    },
    description:
      "Sameer Awaji is a product-minded software engineer in Jeddah working across mobile, web, backend systems, and Arabic products.",
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
      title: "Sameer Awaji — Product-minded Software Engineer",
      description:
        "I build software. I care whether it works outside the demo.",
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og-v5.png`,
          width: 1672,
          height: 941,
          alt: "Sameer Awaji — product-minded software engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sameer Awaji — Product-minded Software Engineer",
      description:
        "I build software. I care whether it works outside the demo.",
      images: [`${origin}/og-v5.png`],
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
