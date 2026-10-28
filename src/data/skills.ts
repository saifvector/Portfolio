import type { Evidence } from "@/lib/evidence";

export type Familiarity = "Regularly used" | "Used in projects" | "Learning" | "Unclassified";

export interface Skill {
  name: string;
  familiarity: Familiarity;
  /** Where the evidence came from; used by the report, not rendered. */
  source: string;
  evidence: Evidence;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

const r = (name: string, source: string): Skill => ({
  name,
  familiarity: "Used in projects",
  source,
  evidence: "verified",
});
const u = (name: string): Skill => ({
  name,
  familiarity: "Unclassified",
  source: "brief only (needs classification)",
  evidence: "reported",
});

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      {
        name: "Python",
        familiarity: "Regularly used",
        source: "cortex-nids, brain-tumor-ai, nutriscan-platform, MultiModal-Android-Fraud-Detection",
        evidence: "verified",
      },
      r("JavaScript", "ci-doctor-ai (Node.js/Express backend, React frontend)"),
      r("TypeScript", "cortex-nids frontend, this portfolio"),
      u("Java"),
      u("C"),
      u("C++"),
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      r("HTML", "all web frontends"),
      r("CSS", "all web frontends"),
      r("React", "cortex-nids, ci-doctor-ai, nutriscan-platform frontends"),
      r("Next.js", "this portfolio"),
      r("Tailwind CSS", "ci-doctor-ai, cortex-nids, this portfolio"),
      u("Bootstrap"),
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    skills: [
      r("FastAPI", "cortex-nids, nutriscan-platform, MultiModal-Android-Fraud-Detection"),
      r("SQL", "nutriscan-platform persistence layer"),
      r("PostgreSQL", "nutriscan-platform (JSONB schema)"),
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      r("PyTorch", "brain-tumor-ai, MultiModal-Android-Fraud-Detection"),
      r("XGBoost", "cortex-nids, nutriscan-platform model comparisons"),
      r("CNNs", "brain-tumor-ai (MobileNetV2, ResNet34 U-Net)"),
      r("Transformers", "MultiModal-Android-Fraud-Detection (DistilBERT)"),
      r("Image segmentation", "brain-tumor-ai"),
      r("Model evaluation", "evaluation reports in cortex-nids, nutriscan-platform"),
      r("SHAP", "cortex-nids, nutriscan-platform, MultiModal-Android-Fraud-Detection"),
      r("NLP / LLM applications", "ci-doctor-ai (Gemini), fraud detection (DistilBERT)"),
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", familiarity: "Regularly used", source: "commit history across all repos", evidence: "verified" },
      {
        name: "GitHub",
        familiarity: "Regularly used",
        source: "all repos hosted under github.com/saifvector",
        evidence: "verified",
      },
      r("Docker", "Dockerfiles in cortex-nids, nutriscan-platform, fraud detection"),
      r("GitHub Actions", "ci-doctor-ai workflows"),
    ],
  },
  {
    id: "systems",
    label: "Systems",
    skills: [u("Linux"), u("VMware"), u("VirtualBox"), u("Hyper-V")],
  },
];
