import type { Metadata } from "next";
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

const canonicalOrigin = "https://sameer-awaji-portfolio.kill7737.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: "Sameer Awaji — Software Engineer",
    template: "%s",
  },
  description:
    "Sameer Awaji is a software engineer in Jeddah working across mobile, web, backend systems, Arabic products, and release testing.",
  authors: [{ name: "Sameer Awaji" }],
  keywords: [
    "Sameer Awaji",
    "Product Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "Vue 3",
    "Flutter",
    "Laravel",
    "API Reliability",
    "Product Management",
    "Arabic UX",
  ],
  openGraph: {
    title: "Sameer Awaji — Software Engineer",
    description: "I build mobile apps, web products, and backend systems.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-v5.png",
        width: 1672,
        height: 941,
        alt: "Sameer Awaji — product-minded software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Awaji — Software Engineer",
    description: "I build mobile apps, web products, and backend systems.",
    images: ["/og-v5.png"],
  },
};

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
