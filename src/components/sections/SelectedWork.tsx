import { projects } from "@/data/projects";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="container-editorial py-24 lg:py-32">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="work-title" index="01" eyebrow="Selected work" title="Six projects, described honestly." />
        <ButtonLink href="/projects" variant="ghost">
          All project details
        </ButtonLink>
      </Reveal>
      <ProjectIndex projects={projects.filter((p) => p.featured)} />
    </section>
  );
}
