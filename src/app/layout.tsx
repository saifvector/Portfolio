import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saifur-ai.vercel.app"),
  title: {
    default: "SHAIK SAIFUR RAHMAN | AI Engineer, Data Scientist & System Builder",
    template: "%s | Shaik Saifur Rahman"
  },
  description: "Portfolio and research laboratory of Shaik Saifur Rahman — AI Engineer, Data Scientist, and Intelligent Systems Developer specializing in cybersecurity AI, healthcare computer vision, explainable AI, and low-latency systems.",
  keywords: [
    "Shaik Saifur Rahman",
    "AI Engineer",
    "Data Scientist",
    "Intelligent Systems",
    "CORTEX NIDS",
    "Cybersecurity AI",
    "Brain Tumor MRI Segmentation",
    "U-Net PyTorch",
    "Medical AI",
    "Nutrient Deficiency AI",
    "Explainable AI",
    "SHAP",
    "FastAPI",
    "Deep Learning",
    "Andhra Pradesh AI Engineer",
    "QIS College AI & Data Science"
  ],
  authors: [{ name: "Shaik Saifur Rahman", url: "https://saifur-ai.vercel.app" }],
  creator: "Shaik Saifur Rahman",
  publisher: "Shaik Saifur Rahman",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saifur-ai.vercel.app",
    siteName: "Shaik Saifur Rahman // AI Research & Intelligent Systems",
    title: "SHAIK SAIFUR RAHMAN | AI Engineer & Data Scientist",
    description: "Building Intelligent Systems That Solve Real-World Problems across Cybersecurity, Healthcare AI, and Computer Vision.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shaik Saifur Rahman - AI Engineer Portfolio & Research Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAIK SAIFUR RAHMAN | AI Engineer & Data Scientist",
    description: "Building Intelligent Systems That Solve Real-World Problems.",
    creator: "@saifur_ai",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://saifur-ai.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-[#050505] antialiased">
        {children}
      </body>
    </html>
  );
}
