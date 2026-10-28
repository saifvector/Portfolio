import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const focus = [
  { label: "Software engineering", body: "APIs, dashboards and tools that other people can actually run." },
  {
    label: "Applied AI / ML",
    body: "Medical imaging, intrusion detection, fraud signals, nutrition risk. I measure them carefully and write down the limits.",
  },
  { label: "Developer tools & automation", body: "Making CI failures quicker to understand." },
  { label: "Interactive experiences", body: "3D on the web for now, and games in the long run." },
];

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="border-border bg-surface border-y">
      <div className="container-editorial grid-editorial gap-y-12 py-24 lg:py-32">
        <Reveal className="col-span-4 md:col-span-8 lg:col-span-5">
          <SectionHeading
            id="about-preview-title"
            index="02"
            eyebrow="About"
            title="Curious by nature. Engineer by practice."
          />
          <p className="text-text-muted mt-6 max-w-md">
            I&apos;m studying AI &amp; Data Science at QIS College of Engineering and Technology in Ongole, and I expect
            to graduate in 2027. I learn by building things and then checking where they break.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="ghost">
              More about me
            </ButtonLink>
          </div>
        </Reveal>
        <dl className="bg-border col-span-4 grid gap-px md:col-span-8 md:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {focus.map((f) => (
            <div key={f.label} className="bg-surface flex flex-col gap-2 p-6">
              <dt className="text-accent text-sm">{f.label}</dt>
              <dd className="text-text-muted text-sm">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
