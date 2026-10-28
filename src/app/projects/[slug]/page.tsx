import type { Metadata } from "next";
import { canonical } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { renderable } from "@/lib/evidence";
import { ButtonLink, UnavailableButton } from "@/components/ui/Button";
import { Disclaimer } from "@/components/projects/Disclaimer";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ProjectVisual } from "@/components/projects/visuals/ProjectVisual";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    ...canonical(`/projects/${project.slug}`),
    openGraph: { title: `${project.title} — Saif`, description: project.summary },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const stack = renderable(project.stack);
  const features = renderable(project.features);
  const facts = renderable(project.facts);

  return (
    <article className="pt-28 pb-24 lg:pt-36">
      <header className="container-editorial grid-editorial gap-y-6 pb-12">
        <nav aria-label="Breadcrumb" className="text-text-muted col-span-full text-sm">
          <Link href="/projects" className="hover:text-text inline-flex min-h-11 items-center">
            ← All projects
          </Link>
        </nav>
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-9">
          <p className="eyebrow flex flex-wrap gap-x-3">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.category.join(" · ")}</span>
          </p>
          <h1 className="font-display text-text text-4xl text-balance">{project.title}</h1>
          <p className="text-text-muted text-xl">{project.subtitle.value}</p>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge project={project} />
          </div>
        </div>
        <div className="col-span-4 flex flex-wrap gap-3 md:col-span-8 lg:col-span-3 lg:flex-col lg:items-stretch lg:self-end">
          {project.repoUrl ? (
            <ButtonLink href={project.repoUrl} external variant="ghost">
              Source on GitHub<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          ) : (
            <UnavailableButton label="Source" reason="not linked yet" />
          )}
          {project.demoUrl ? (
            <ButtonLink href={project.demoUrl} external>
              Live demo<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          ) : (
            <UnavailableButton label="Live demo" reason="not deployed" />
          )}
        </div>
      </header>

      {project.disclaimer && (
        <div className="container-editorial pb-12">
          <Disclaimer kind={project.disclaimer} />
        </div>
      )}

      <section aria-label="Project visual" className="container-editorial pb-20">
        <ProjectVisual project={project} />
      </section>

      <div className="container-editorial grid-editorial gap-y-16">
        <section aria-labelledby="overview" className="col-span-4 md:col-span-8 lg:col-span-7">
          <h2 id="overview" className="eyebrow mb-6">
            Overview
          </h2>
          <div className="text-text/90 flex flex-col gap-5 text-lg">
            {project.description.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </section>

        {facts.length > 0 && (
          <section aria-labelledby="facts" className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <h2 id="facts" className="eyebrow mb-6">
              Key facts
            </h2>
            <dl className="border-border flex flex-col gap-5 border-l pl-5">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="text-accent text-sm">{f.label}</dt>
                  <dd className="text-text-muted text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {features.length > 0 && (
          <section aria-labelledby="features" className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 id="features" className="eyebrow mb-6">
              What it does
            </h2>
            <ul className="border-border flex flex-col border-t">
              {features.map((f) => (
                <li key={f.value} className="border-border text-text/90 flex gap-4 border-b py-4">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  <span>
                    {f.value}
                    {f.evidence === "reported" && <span className="text-text-muted ml-2 text-xs">(reported)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.methodology.length > 0 && (
          <section aria-labelledby="method" className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <h2 id="method" className="eyebrow mb-6">
              Method
            </h2>
            <ol className="flex flex-col gap-4">
              {project.methodology.map((m, i) => (
                <li key={m} className="text-text-muted flex gap-4 text-sm">
                  <span className="font-display text-accent text-lg tabular-nums">{i + 1}</span>
                  <span>{m}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {stack.length > 0 && (
          <section aria-labelledby="stack" className="col-span-full">
            <h2 id="stack" className="eyebrow mb-6">
              Stack
            </h2>
            <ul className="text-text flex flex-wrap gap-x-6 gap-y-2">
              {stack.map((s) => (
                <li key={s.value}>
                  {s.value}
                  {s.evidence === "reported" && <span className="text-text-muted ml-1 text-xs">(reported)</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="limits" className="col-span-4 md:col-span-8 lg:col-span-8">
          <h2 id="limits" className="eyebrow mb-6">
            Limitations
          </h2>
          <ul className="text-text/90 flex flex-col gap-4">
            {project.limitations.map((l) => (
              <li key={l.slice(0, 32)} className="flex gap-4">
                <span aria-hidden="true" className="text-warning">
                  !
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <nav aria-label="Next project" className="container-editorial border-border mt-24 border-t pt-10">
        <Link href={`/projects/${next.slug}`} className="group flex min-h-11 flex-col gap-2">
          <span className="eyebrow">Next project</span>
          <span className="font-display text-text group-hover:text-accent text-3xl transition-colors">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
