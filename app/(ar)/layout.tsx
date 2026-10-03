import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = siteMetadata("ar");

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
