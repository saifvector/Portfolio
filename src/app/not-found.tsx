import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-32 pb-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-display text-text text-4xl text-balance">This page doesn&apos;t exist.</h1>
      <p className="text-text-muted max-w-lg text-lg">
        The link may be old, or the address may have a typo. The projects are a good place to start.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/projects">See projects</ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
