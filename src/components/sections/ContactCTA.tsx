import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="container-editorial py-24 lg:py-40">
      <Reveal className="flex flex-col items-start gap-8">
        <p className="eyebrow">
          <span className="text-accent">03</span> &nbsp;Contact
        </p>
        <h2 id="cta-title" className="font-display text-text max-w-4xl text-4xl text-balance">
          Have an interesting problem to solve?
        </h2>
        <p className="text-text-muted max-w-xl text-lg">
          If you&apos;re hiring for an internship, want to collaborate, or have a question about one of these projects,
          send me a note.
        </p>
        <ButtonLink href="/contact">Start a conversation</ButtonLink>
      </Reveal>
    </section>
  );
}
