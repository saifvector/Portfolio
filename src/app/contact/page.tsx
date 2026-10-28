import type { Metadata } from "next";
import { canonical } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Saif about internships, collaborations or questions about his projects.",
  ...canonical("/contact"),
};

export default function ContactPage() {
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  return (
    <div className="container-editorial grid-editorial gap-y-12 pt-32 pb-24 lg:pt-40">
      <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-5">
        <p className="eyebrow">Contact</p>
        <h1 className="font-display text-text text-4xl text-balance">Have an interesting problem to solve?</h1>
        <p className="text-text-muted text-lg">
          Internships, collaborations, or questions about my projects. I read every message and reply by email.
        </p>
        <ul className="flex flex-col gap-1 text-sm">
          {siteConfig.email && (
            <li>
              <a
                className="text-text hover:text-accent inline-flex min-h-11 items-center"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>
          )}
          {siteConfig.githubUrl && (
            <li>
              <a
                className="text-text hover:text-accent inline-flex min-h-11 items-center"
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {siteConfig.linkedinUrl && (
            <li>
              <a
                className="text-text hover:text-accent inline-flex min-h-11 items-center"
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
        <ContactForm configured={configured} fallbackEmail={siteConfig.email} />
      </div>
    </div>
  );
}
