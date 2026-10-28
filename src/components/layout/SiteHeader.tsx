import Link from "next/link";
import { navigation } from "@/data/navigation";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/85 supports-[backdrop-filter]:bg-bg/70 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-sm">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-text flex min-h-11 items-center gap-3 text-xl tracking-tight"
          aria-label="Saif — home"
        >
          <span aria-hidden="true" className="bg-accent inline-block size-2 rotate-45" />
          Saif
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-text inline-flex min-h-11 items-center px-4 text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
