import { ButtonLink } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div className="container-editorial grid-editorial min-h-[calc(100svh-4rem)] content-center gap-y-10 py-16 lg:py-24">
        <div className="col-span-4 flex flex-col gap-8 md:col-span-8 lg:col-span-7">
          <p className="eyebrow">
            {siteConfig.name} · {siteConfig.headline}
          </p>
          <h1 id="hero-title" className="font-display text-text text-4xl text-balance">
            I build intelligent systems and <em className="text-accent">digital experiences.</em>
          </h1>
          <p className="text-text-muted max-w-xl text-lg">
            I&apos;m Saif, a B.Tech student in Artificial Intelligence &amp; Data Science. I build software and run
            applied machine-learning experiments, and I&apos;m slowly working my way toward making games.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/projects">View selected work</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>
          {siteConfig.availability && (
            <p className="text-text-muted flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="bg-accent size-1.5 rounded-full" />
              {siteConfig.availability.label}
            </p>
          )}
        </div>
        <HeroCanvas className="col-span-4 aspect-square w-full max-w-[28rem] justify-self-center md:col-span-6 md:col-start-2 lg:col-span-5 lg:max-w-none" />
      </div>
    </section>
  );
}
