import { existsSync } from "node:fs";
import path from "node:path";

export const siteConfig = {
  name: "Shaik Saifur Rahman",
  displayName: "Saif",
  headline: "Software Developer | AI & Data Science Student | Aspiring Game Developer",
  title: "Saif — Software Developer & AI/DS Student",
  description:
    "Explore Saif's software engineering projects, AI experiments, machine learning research, cybersecurity work, and interactive 3D portfolio.",
  location: "Ongole, Andhra Pradesh, India",

  // TODO(saif): confirm contact email. Email links are hidden while null.
  email: null as string | null,
  // GitHub account that owns the project repositories (verified via the repos themselves).
  githubUrl: "https://github.com/saifvector" as string | null,
  // TODO(saif): add LinkedIn profile URL.
  linkedinUrl: null as string | null,

  /**
   * TODO(saif): availability text. Hidden while null.
   * Example: { label: "Open to internships for 2026–27" }
   */
  availability: null as { label: string } | null,

  /** Drop the PDF at public/resume/<this file name>; the download button appears at build time. Hidden otherwise. */
  resumeFile: "Shaik-Saifur-Rahman-Resume.pdf",
} as const;

export function resumeHref(): string | null {
  const file = path.join(process.cwd(), "public", "resume", siteConfig.resumeFile);
  return existsSync(file) ? `/resume/${siteConfig.resumeFile}` : null;
}

export function sameAsLinks(): string[] {
  return [siteConfig.githubUrl, siteConfig.linkedinUrl].filter((v): v is string => Boolean(v));
}
