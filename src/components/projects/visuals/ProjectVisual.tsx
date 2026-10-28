import type { Project } from "@/data/projects";
import { VisualFrame } from "./Frame";
import { CortexTopology } from "./CortexTopology";
import { CIPipeline } from "./CIPipeline";
import { FraudForensics } from "./FraudForensics";
import { LungPending } from "./LungPending";
import { BrainMetrics } from "./BrainMetrics";
import { NutrientScreening } from "./NutrientScreening";

export function ProjectVisual({ project }: { project: Project }) {
  const { kind, illustrative, alt } = project.visual;
  const body = (() => {
    switch (kind) {
      case "cortex-topology":
        return <CortexTopology />;
      case "ci-pipeline":
        return <CIPipeline />;
      case "fraud-forensics":
        return <FraudForensics />;
      case "lung-pending":
        return <LungPending />;
      case "brain-metrics":
        return <BrainMetrics groups={project.resultGroups ?? []} />;
      case "nutrient-screening":
        return <NutrientScreening />;
    }
  })();
  return (
    <VisualFrame illustrative={illustrative} caption={alt}>
      {body}
    </VisualFrame>
  );
}
