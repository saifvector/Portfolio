import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { sameAsLinks, siteConfig } from "@/data/site-config";
import { siteUrl } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const url = siteUrl();

export const metadata: Metadata = {
  ...(url ? { metadataBase: new URL(url), alternates: { canonical: "/" } } : {}),
  title: { default: siteConfig.title, template: "%s — Saif" },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Saif",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.displayName,
  jobTitle: "Software Developer and AI & Data Science student",
  ...(url ? { url } : {}),
  ...(sameAsLinks().length ? { sameAs: sameAsLinks() } : {}),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "QIS College of Engineering and Technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ongole",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body className="bg-bg text-text">
        <a
          href="#main"
          className="sr-only-focusable bg-accent text-bg fixed top-4 left-4 z-50 px-4 py-3 text-sm font-medium"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
