import type { Metadata } from "next";
import { canonical } from "@/lib/utils";
import { projects } from "@/data/projects";
import { ProjectIndex } from "@/components/projects/ProjectIndex";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Six projects across cybersecurity, developer tools, medical imaging and explainable ML. Each one lists its limitations.",
  ...canonical("/projects"),
};

export default function ProjectsPage() {
  return (
    <div className="container-editorial pt-32 pb-24 lg:pt-40">
      <header className="mb-16 flex max-w-3xl flex-col gap-6">
        <p className="eyebrow">Work · {projects.length} projects</p>
        <h1 className="font-display text-text text-4xl text-balance">Things I&apos;ve built and tested.</h1>
        <p className="text-text-muted text-lg">
          Every project page separates what I verified in the code from what is only reported, and lists what the
          project can&apos;t do. Visuals marked “Illustrative” are diagrams I made, not screenshots.
        </p>
      </header>
      <ProjectIndex projects={projects} headingLevel="h2" />
    </div>
  );
}
