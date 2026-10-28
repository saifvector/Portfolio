import type { Metadata } from "next";
import { canonical } from "@/lib/utils";
import { skillCategories } from "@/data/skills";
import { renderable } from "@/lib/evidence";
import { resumeHref } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Saif is a B.Tech student in Artificial Intelligence & Data Science at QIS College of Engineering and Technology, graduating in 2027.",
  ...canonical("/about"),
};

const interests = [
  "Software engineering",
  "Applied AI and machine learning",
  "Developer tools and automation",
  "Cybersecurity",
  "Interactive 3D on the web",
  "Game development (long-term goal)",
];

export default function AboutPage() {
  const resume = resumeHref();
  return (
    <div className="pt-32 pb-24 lg:pt-40">
      <section aria-labelledby="about-title" className="container-editorial grid-editorial gap-y-10">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-7">
          <p className="eyebrow">About</p>
          <h1 id="about-title" className="font-display text-text text-4xl text-balance">
            Curious by nature. Engineer by practice.
          </h1>
        </div>
        <div className="text-text/90 col-span-4 flex flex-col gap-5 text-lg md:col-span-8 lg:col-span-7">
          <p>
            I&apos;m Shaik Saifur Rahman, and most people call me Saif. I&apos;m in the third year of a B.Tech in
            Artificial Intelligence and Data Science, and I spend most of my time outside class building things.
          </p>
          <p>
            My projects so far cover network intrusion detection, a CI failure diagnosis tool, Android fraud signals,
            brain MRI segmentation and nutrient-risk screening. What I&apos;ve learned from them is that getting a model
            to run is the easy part. Working out where it fails, and saying so plainly, is harder and matters more.
          </p>
          <p>
            In the long run I want to make games. For now I&apos;m picking up the pieces that lead there: rendering,
            interaction and building software that holds up.
          </p>
        </div>
        {resume && (
          <aside className="col-span-4 flex flex-col gap-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:row-start-2">
            <ButtonLink href={resume} variant="ghost" download>
              Download résumé (PDF)
            </ButtonLink>
          </aside>
        )}
      </section>

      <section
        aria-labelledby="education-title"
        className="container-editorial grid-editorial border-border mt-24 gap-y-6 border-t pt-12"
      >
        <h2 id="education-title" className="eyebrow col-span-4 md:col-span-2 lg:col-span-3">
          Education
        </h2>
        <div className="col-span-4 flex flex-col gap-2 md:col-span-6 lg:col-span-9">
          <p className="font-display text-text text-2xl">B.Tech, Artificial Intelligence and Data Science</p>
          <p className="text-text-muted">QIS College of Engineering and Technology · Ongole, Andhra Pradesh, India</p>
          <p className="text-text-muted text-sm">Expected graduation: 2027</p>
        </div>
      </section>

      <section
        aria-labelledby="interests-title"
        className="container-editorial grid-editorial border-border mt-16 gap-y-6 border-t pt-12"
      >
        <h2 id="interests-title" className="eyebrow col-span-4 md:col-span-2 lg:col-span-3">
          Interests
        </h2>
        <ul className="text-text col-span-4 grid gap-x-8 gap-y-3 md:col-span-6 md:grid-cols-2 lg:col-span-9">
          {interests.map((i) => (
            <li key={i} className="border-border border-b pb-3">
              {i}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="skills"
        className="container-editorial grid-editorial border-border mt-16 gap-y-8 border-t pt-12"
      >
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <h2 id="skills" className="eyebrow">
            Skills
          </h2>
          <p className="text-text-muted mt-4 text-sm">
            Grouped by area. “Used in projects” means it appears in one of the repositories above. No percentages,
            because I don&apos;t think skill works that way.
          </p>
        </div>
        <div className="bg-border col-span-4 grid gap-px md:col-span-6 md:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <section key={cat.id} aria-labelledby={`skill-${cat.id}`} className="bg-bg flex flex-col gap-4 p-6">
              <h3 id={`skill-${cat.id}`} className="font-display text-text text-xl">
                {cat.label}
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {renderable(cat.skills).map((s) => (
                  <li key={s.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-text">{s.name}</span>
                    {s.familiarity !== "Unclassified" && (
                      <span className="text-text-muted text-right text-xs">{s.familiarity}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
