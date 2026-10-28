import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { navigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="container-editorial grid-editorial gap-y-8 py-12">
        <div className="col-span-4 md:col-span-4 lg:col-span-6">
          <p className="font-display text-text text-2xl">{siteConfig.name}</p>
          <p className="text-text-muted mt-2 text-sm">
            B.Tech student in AI &amp; Data Science · {siteConfig.location}
          </p>
        </div>
        <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-3">
          <ul className="flex flex-col gap-1 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-text-muted hover:text-text inline-flex min-h-11 items-center">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-2 lg:col-span-3">
          <ul className="flex flex-col gap-1 text-sm">
            {siteConfig.githubUrl && (
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text inline-flex min-h-11 items-center"
                >
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {siteConfig.linkedinUrl && (
              <li>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text inline-flex min-h-11 items-center"
                >
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
        <p className="border-border text-text-muted col-span-full border-t pt-6 text-xs">
          Visuals labelled “Illustrative” are original diagrams, not screenshots of running software.
        </p>
      </div>
    </footer>
  );
}
