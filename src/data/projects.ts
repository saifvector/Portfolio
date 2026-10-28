import type { Claim, Evidence } from "@/lib/evidence";

export type ProjectStatus = "Completed" | "Prototype" | "In progress" | "Research experiment";
export type VisualKind =
  "cortex-topology" | "ci-pipeline" | "fraud-forensics" | "lung-pending" | "brain-metrics" | "nutrient-screening";

export interface ProjectResultGroup {
  id: string;
  label: string;
  note: string;
  results: { label: string; value: string; context: string; evidence: Evidence }[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: Claim<string>;
  category: string[];
  summary: string;
  description: string[];
  status: ProjectStatus;
  statusEvidence: Evidence;
  stack: Claim<string>[];
  features: Claim<string>[];
  /** Short labelled facts the brief requires per project (e.g. "Data processed"). */
  facts: { label: string; value: string; evidence: Evidence }[];
  methodology: string[];
  resultGroups?: ProjectResultGroup[];
  limitations: string[];
  disclaimer?: "medical" | "security" | "experimental";
  visual: { kind: VisualKind; illustrative: boolean; alt: string };
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  /** Evidence source, for the report only. */
  source: string;
}

const v = (value: string): Claim<string> => ({ value, evidence: "verified" });
const rep = (value: string): Claim<string> => ({ value, evidence: "reported" });

export const projects: Project[] = [
  {
    slug: "cortex-nids",
    title: "Cortex NIDS",
    // Brief subtitle "Sequential Anomaly Detection" is not supported by the code (per-flow classifier).
    subtitle: v("Flow-based network intrusion detection"),
    category: ["Cybersecurity", "Machine learning"],
    summary:
      "Groups captured packets into network flows and asks a tree-ensemble classifier which flows look like known intrusion patterns.",
    description: [
      "Cortex NIDS is my network intrusion detection project. It captures packets with Scapy, groups them into bidirectional flows keyed by the 5-tuple (source/destination IP and port, protocol), and computes 20 flow-level statistics for each flow.",
      "A supervised classifier trained on the public CICIDS2017 benchmark then labels each flow as benign or as one of the benchmark's intrusion categories. I compared several tree ensembles (Extra Trees, Random Forest, LightGBM, XGBoost, CatBoost) and generated SHAP plots to see which flow features drive the predictions.",
      "A FastAPI backend streams model outputs to a React dashboard over a WebSocket, and a script can replay synthetic traffic for demos.",
    ],
    status: "Prototype",
    statusEvidence: "verified",
    stack: [
      v("Python"),
      v("Scapy"),
      v("scikit-learn"),
      v("LightGBM"),
      v("XGBoost"),
      v("CatBoost"),
      v("SHAP"),
      v("FastAPI"),
      v("WebSockets"),
      v("React"),
      v("TypeScript"),
      v("Docker"),
    ],
    features: [
      v("Packet capture with Scapy and bidirectional 5-tuple flow aggregation"),
      v("20 flow-level features per flow (durations, packet counts, TCP window sizes, etc.)"),
      v("Multi-class flow classifier trained on CICIDS2017; five tree ensembles compared"),
      v("SHAP feature-attribution plots for model predictions"),
      v("FastAPI backend with a WebSocket alert stream to a React dashboard"),
      v("Synthetic traffic replay script for demos (simulate_live_attacks.py)"),
    ],
    facts: [
      {
        label: "Data processed",
        value:
          "Network flows built from captured packets; trained and evaluated on the CICIDS2017 flow dataset (20 selected features).",
        evidence: "verified",
      },
      {
        label: "What “sequential” means here",
        value:
          "Only the flow-building step is sequential: packets are accumulated in order into flows. Each finished flow is then classified on its own. There is no sequence model over flows yet.",
        evidence: "verified",
      },
      {
        label: "Traffic in the visual",
        value: "Simulated. The diagram below is illustrative and does not show real captured traffic.",
        evidence: "verified",
      },
    ],
    methodology: [
      "Packets → bidirectional flows (5-tuple) → 20 statistical features",
      "Train/test split of CICIDS2017; compare five tree-ensemble classifiers",
      "Inspect feature influence with SHAP before trusting a model",
      "Serve predictions through FastAPI and stream them to the dashboard",
    ],
    limitations: [
      "CICIDS2017 was recorded in a lab in 2017. Doing well on its held-out split says little about how the model would behave on today's real networks.",
      "Flows are classified one at a time, so attacks that only show up across many flows over time are out of scope.",
      "I haven't tested it on production traffic, and I make no claims about its throughput or real-time performance.",
      "A flagged flow is the model's prediction, not a confirmed attack. Someone still has to check it.",
    ],
    disclaimer: "security",
    visual: {
      kind: "cortex-topology",
      illustrative: true,
      alt: "Illustrative network topology with simulated flows between hosts; one flow is highlighted as a model prediction, with an event timeline and an inspection panel.",
    },
    repoUrl: "https://github.com/saifvector/cortex-nids",
    featured: true,
    source:
      "github.com/saifvector/cortex-nids — src/flow_builder.py, src/packet_capture.py, api/routes.py, reports/evaluation, reports/explainability",
  },
  {
    slug: "ci-doctor-ai",
    title: "CI Doctor AI",
    subtitle: rep("NLP & LLM Diagnostics"),
    category: ["Developer tools", "LLM applications"],
    summary:
      "Pulls failed GitHub Actions logs, finds the lines that matter, and asks an LLM for a likely cause and next steps.",
    description: [
      "CI Doctor AI looks at failed GitHub Actions runs. It fetches the run and job logs through the GitHub REST API (Octokit), strips terminal escape codes, and pulls out the error section.",
      "The trimmed log goes to Google Gemini with a structured JSON prompt that asks for a likely root cause, the files involved, and suggested next steps. If the API is unavailable, a rule-based pattern matcher covering Node, Python, Docker, lint, TypeScript and missing-secret failures produces the diagnosis instead.",
      "Every failure gets a deterministic fingerprint, and Jaccard similarity over its tokens surfaces similar past incidents. It can also draft a suggested patch, which a person has to review.",
    ],
    status: "Prototype",
    statusEvidence: "verified",
    stack: [
      v("Node.js"),
      v("Express"),
      v("Octokit (GitHub REST API)"),
      v("Google Gemini API"),
      v("React"),
      v("Vite"),
      v("Tailwind CSS"),
      v("GitHub Actions"),
    ],
    features: [
      v("Log ingestion: workflow runs, jobs and logs fetched via Octokit"),
      v("Log sanitising and error-snippet extraction"),
      v("Rule-based failure classification (Node, Python, Docker, lint, TypeScript, missing secrets)"),
      v("LLM explanation via Gemini with JSON-structured output and pattern-matcher fallback"),
      v("Failure fingerprints and Jaccard-similarity retrieval of similar past incidents"),
      v("Unit tests for fingerprinting, similarity search and incident memory (node:test)"),
    ],
    facts: [
      {
        label: "Implemented",
        value:
          "Log ingestion, rule-based classification, LLM explanation, GitHub integration (reading runs and logs), similar-incident retrieval.",
        evidence: "verified",
      },
      {
        label: "Not claimed",
        value:
          "It doesn't fix pipelines on its own, and I haven't run it in production. Suggested patches are drafts for a person to review.",
        evidence: "verified",
      },
    ],
    methodology: [
      "Fetch the failed run, its jobs and step logs",
      "Sanitise the log and extract the error window",
      "Fingerprint the failure and look up similar past incidents",
      "Ask the LLM for cause and next steps; fall back to rules when unavailable",
    ],
    limitations: [
      "LLM explanations can be wrong or overconfident, so treat them as hints and not as answers.",
      "The fallback matcher only knows the failure patterns I wrote rules for.",
      "Incident memory is a small local store, not a shared knowledge base.",
    ],
    disclaimer: "experimental",
    visual: {
      kind: "ci-pipeline",
      illustrative: true,
      alt: "Illustrative CI pipeline with a failed test step, the relevant log lines, and a diagnosis panel showing a likely cause and next steps.",
    },
    repoUrl: "https://github.com/saifvector/ci-doctor-ai",
    featured: true,
    source:
      "github.com/saifvector/ci-doctor-ai (fork of techenthusiasticindia/ci-doctor-ai) — backend/services/*.js, backend/tests",
  },
  {
    slug: "fraud-app-detection",
    title: "Fraud App Detection",
    subtitle: v("Multi-modal Android app risk analysis"),
    category: ["Cybersecurity", "Machine learning", "NLP"],
    summary:
      "Combines static APK features and Play Store listing text into a risk score, and keeps what was observed separate from what was predicted.",
    description: [
      "This project estimates whether an Android app resembles the fraudulent or malicious apps in its training data. It has separate pipelines for separate inputs.",
      "For an uploaded APK, Androguard parses the manifest and code to extract static features such as requested permissions. A Random Forest scores those features, and TreeSHAP explains which ones pushed the score up or down. For a Play Store link, the listing text (title, description, developer) goes through a fine-tuned DistilBERT model. A behaviour module (Bi-LSTM over event sequences) and a meta-classifier that fuses the outputs are also in the code.",
      "The interface shows observed evidence (what the app actually requests) apart from model predictions (what the classifiers estimate).",
    ],
    status: "Prototype",
    statusEvidence: "verified",
    stack: [
      v("Python"),
      v("FastAPI"),
      v("Androguard"),
      v("scikit-learn"),
      v("PyTorch"),
      v("Hugging Face Transformers"),
      v("SHAP"),
      v("React"),
      v("Vite"),
    ],
    features: [
      v("Static APK analysis with Androguard (manifest permissions and code features)"),
      v("Random Forest static classifier with TreeSHAP explanations"),
      v("DistilBERT text classifier for Play Store listing metadata"),
      v("Bi-LSTM behaviour-sequence model and a fusion meta-classifier in the codebase"),
      v("Separate routing: a Play Store link alone never produces an APK-level verdict"),
    ],
    facts: [
      {
        label: "Inputs analysed",
        value: "APK files (static features) and Play Store listing metadata (text).",
        evidence: "verified",
      },
      {
        label: "Model types",
        value:
          "Random Forest (static), DistilBERT (text), Bi-LSTM (behaviour), Random Forest meta-classifier (fusion).",
        evidence: "verified",
      },
      {
        label: "What the score means",
        value:
          "A model estimate of how closely the app resembles fraudulent samples in the training data. It is not a verdict that an app is malicious.",
        evidence: "verified",
      },
    ],
    methodology: [
      "Parse APK → extract static feature vector",
      "Score with the static model; explain with TreeSHAP",
      "Score listing text with DistilBERT when a store link is given",
      "Show observed evidence and model predictions in separate panels",
    ],
    limitations: [
      "The evaluation set in the repo is small (100 apps), so I don't report accuracy figures.",
      "Static features can't see behaviour that only appears at runtime.",
      "Requested permissions are evidence for a closer look. They don't prove intent.",
    ],
    disclaimer: "security",
    visual: {
      kind: "fraud-forensics",
      illustrative: true,
      alt: "Illustrative forensic inspection view of a sample app: metadata, requested permissions as observed evidence, and a separate model risk estimate.",
    },
    repoUrl: "https://github.com/saifvector/MultiModal-Android-Fraud-Detection",
    featured: true,
    source:
      "github.com/saifvector/MultiModal-Android-Fraud-Detection — backend/app/ml/{static_analysis,nlp,behavior_analysis,fusion}, reports/evaluation_report.md",
  },
  {
    slug: "lung-tumor-detection",
    title: "Lung Tumor Detection",
    subtitle: rep("Medical imaging experiment"),
    category: ["Healthcare AI", "Computer vision"],
    summary:
      "A medical-imaging experiment. I'll publish the task, dataset and method once the source is linked and checked.",
    description: [
      "This is one of my medical-imaging experiments. I haven't linked its repository to this site yet, so I'm not publishing the imaging modality, the exact task (classification, detection or segmentation), the dataset or any results.",
      "Details will appear here once they can be checked against the code and evaluation outputs.",
    ],
    status: "Research experiment",
    statusEvidence: "reported",
    stack: [],
    features: [],
    facts: [
      {
        label: "Task, dataset, modality",
        value: "Not published until verified against the repository.",
        evidence: "verified",
      },
    ],
    methodology: [],
    limitations: ["Nothing on this page should be taken as a description of a working diagnostic system."],
    disclaimer: "medical",
    visual: {
      kind: "lung-pending",
      illustrative: false,
      alt: "Placeholder indicating that verified project details are pending.",
    },
    featured: true,
    source: "No repository found under github.com/saifvector",
  },
  {
    slug: "brain-tumor-detection",
    title: "Brain Tumor Detection",
    subtitle: v("MRI tumor screening and segmentation"),
    category: ["Healthcare AI", "Computer vision"],
    summary:
      "A two-stage MRI pipeline with a slice classifier and a U-Net segmenter. In-distribution and external results are shown side by side.",
    description: [
      "This is a two-stage pipeline for brain MRI slices. A MobileNetV2 classifier screens each slice first, and slices it flags go to a ResNet34-encoder U-Net (segmentation-models-pytorch) that predicts a pixel-level tumor mask.",
      "Training uses the TCGA lower-grade glioma (LGG) MRI segmentation data with a patient-ordered split, so slices from one patient never land in both train and validation. The loss combines Dice and Focal terms. Post-processing applies a 0.70 probability threshold and drops connected components smaller than 100 px.",
      "I also converted BraTS 2021 volumes to slices to test the model on data from a different source. That external test is where its weaknesses show.",
    ],
    status: "Research experiment",
    statusEvidence: "verified",
    stack: [
      v("Python"),
      v("PyTorch"),
      v("segmentation-models-pytorch"),
      v("torchvision"),
      v("OpenCV"),
      v("SciPy"),
      v("Streamlit"),
    ],
    features: [
      v("MobileNetV2 slice classifier as a screening gate"),
      v("ResNet34 U-Net segmentation with Dice + Focal loss"),
      v("Patient-ordered train/validation split to avoid slice leakage"),
      v("Threshold and connected-component post-processing"),
      v("BraTS 2021 conversion script for external evaluation"),
      v("Streamlit interface for loading a scan and viewing the predicted mask"),
    ],
    facts: [
      {
        label: "Task",
        value: "Slice-level tumor screening (classification) followed by binary tumor segmentation.",
        evidence: "verified",
      },
      {
        label: "Data",
        value: "TCGA-LGG MRI segmentation dataset for training/validation; BraTS 2021 for external testing.",
        evidence: "verified",
      },
    ],
    methodology: [
      "Classify each slice; send flagged slices to the segmenter",
      "Train U-Net with Dice + Focal loss on a patient-ordered split",
      "Calibrate threshold and minimum component size",
      "Evaluate in-distribution, then on an external dataset",
    ],
    resultGroups: [
      {
        id: "in-distribution",
        label: "In-distribution (TCGA-LGG)",
        note: "Held-out patients from the same dataset the model was trained on.",
        results: [
          {
            label: "Volumetric Dice",
            value: "88.39%",
            context: "Overlap between predicted and true tumor volume",
            evidence: "reported",
          },
          { label: "Median slice Dice", value: "88.40%", context: "Median overlap per slice", evidence: "reported" },
          {
            label: "Specificity",
            value: "99.55%",
            context: "Tumor-free slices correctly left empty",
            evidence: "reported",
          },
        ],
      },
      {
        id: "external",
        label: "External (BraTS 2021)",
        note: "A different dataset from different scanners and institutions. This is a harder and more honest test.",
        results: [
          {
            label: "Specificity",
            value: "98.00%",
            context: "Tumor-free slices correctly left empty",
            evidence: "reported",
          },
          { label: "Sensitivity", value: "44.00%", context: "Tumor slices the model detected", evidence: "reported" },
          { label: "Precision", value: "95.65%", context: "Detections that were real tumors", evidence: "reported" },
          { label: "F1", value: "60.27%", context: "Balance of precision and sensitivity", evidence: "reported" },
          {
            label: "Positive-tumor mean Dice",
            value: "21.96%",
            context: "Mask overlap on slices that contain tumor",
            evidence: "reported",
          },
        ],
      },
    ],
    limitations: [
      "On the external BraTS 2021 data the model missed more than half of the tumor slices (44% sensitivity), and where it did find tumor, mask overlap was low (21.96% mean Dice).",
      "High specificity on its own doesn't show the model detects tumors well. A model that rarely predicts tumor will score high specificity anyway.",
      "The strong in-distribution numbers don't carry over to a new data source, so this is a research experiment and not a usable tool.",
    ],
    disclaimer: "medical",
    visual: {
      kind: "brain-metrics",
      illustrative: false,
      alt: "Comparison frames for MRI, ground truth and prediction, plus tabs for in-distribution and external metrics.",
    },
    repoUrl: "https://github.com/saifvector/brain-tumor-ai",
    featured: true,
    source:
      "github.com/saifvector/brain-tumor-ai — train_advanced.py, train_classifer.py, batch_inference_eval.py, conversion to png brats.py",
  },
  {
    slug: "nutrient-screening",
    title: "Nutrient Deficiency Screening & Personalized Nutrition Platform",
    subtitle: v("Explainable risk screening across 11 nutrients"),
    category: ["Healthcare AI", "Explainable ML", "Full stack"],
    summary:
      "Estimates deficiency risk for 11 nutrients from questionnaire inputs and explains each estimate with SHAP-based risk factors.",
    description: [
      "This is a screening platform that estimates deficiency risk for 11 baseline nutrients: protein, vitamins A, B12, C, D and E, folate (B9), iron, calcium, zinc and magnesium. The inputs are diet, lifestyle, symptom and medical-history answers.",
      "Each estimate comes with SHAP-based risk factors, and a structured reasoning layer turns those factors into a readable summary and suggested confirmatory lab tests. The backend is FastAPI with Pydantic v2 validation, and assessments are stored in PostgreSQL using JSONB columns.",
      "Separately, I trained per-target classifiers on NHANES data (N = 11,933) for nine deficiency targets and compared logistic regression, random forest, XGBoost and LightGBM for each one.",
    ],
    status: "Prototype",
    statusEvidence: "verified",
    stack: [
      v("Python"),
      v("FastAPI"),
      v("Pydantic v2"),
      v("PostgreSQL (JSONB)"),
      v("scikit-learn"),
      v("XGBoost"),
      v("LightGBM"),
      v("SHAP"),
      v("React"),
      v("TypeScript"),
      v("Docker"),
      { value: "Multi-output XGBoost ensemble", evidence: "unverified" },
    ],
    features: [
      v("Risk estimates for 11 baseline nutrients"),
      v("SHAP-based explanation of the factors behind each estimate"),
      v("Structured clinical-reasoning layer producing summaries and confirmatory-test suggestions"),
      v("FastAPI + Pydantic v2 API; PostgreSQL storage with JSONB payloads"),
      v("Per-target model comparison on NHANES data for nine deficiency targets"),
    ],
    facts: [
      {
        label: "Input vs. output",
        value:
          "Inputs are self-reported answers. Outputs are estimated risk levels. A high estimate is a reason to get tested; it does not confirm a deficiency.",
        evidence: "verified",
      },
      {
        label: "Data provenance",
        value:
          "The 11-nutrient screening layer includes a synthetic data generator built from epidemiological rules. The nine NHANES targets come from real survey data.",
        evidence: "verified",
      },
    ],
    methodology: [
      "Collect diet, lifestyle, symptom and history inputs",
      "Estimate per-nutrient risk; compute SHAP attributions",
      "Turn attributions into readable risk factors and test suggestions",
      "Compare model families per target on NHANES with cross-validation and a holdout set",
    ],
    limitations: [
      "Part of the training data is synthetic, generated from rules, so it reflects my assumptions as much as real populations.",
      "On the real NHANES targets, holdout discrimination was modest: ROC-AUC between about 0.60 and 0.83 depending on the target.",
      "It hasn't been clinically validated. A prediction cannot confirm a deficiency; only a lab test can.",
    ],
    disclaimer: "medical",
    visual: {
      kind: "nutrient-screening",
      illustrative: true,
      alt: "Illustrative screening workflow with risk levels for 11 nutrients, a risk-factor summary, and a SHAP-style explanation panel for one sample profile.",
    },
    repoUrl: "https://github.com/saifvector/nutriscan-platform",
    featured: true,
    source:
      "github.com/saifvector/nutriscan-platform — backend/app/ml/{constants,reasoning,dataset_generator,models}.py, backend/app/core/persistence.py, phase10b_* reports",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
