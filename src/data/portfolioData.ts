import { ProjectData, SkillItem, CertificationItem, TimelineItem } from '../types';

export const OWNER_INFO = {
  name: "SHAIK SAIFUR RAHMAN",
  shortName: "Saifur Rahman",
  roles: [
    "AI ENGINEER",
    "DATA SCIENTIST",
    "INTELLIGENT SYSTEMS DEVELOPER",
    "SYSTEM BUILDER"
  ],
  tagline: "Building Intelligent Systems That Solve Real-World Problems.",
  location: "Andhra Pradesh, India",
  coordinates: "15.5057° N, 80.0499° E",
  status: "OPEN TO HIGH-IMPACT ROLES & RESEARCH COLLABORATIONS",
  education: {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "QIS College of Engineering and Technology",
    location: "Ongole, Andhra Pradesh, India",
    focus: "Neural Architectures, Medical AI, Computer Vision, Adversarial Machine Learning"
  },
  bio: `I am a B.Tech Artificial Intelligence and Data Science student passionate about building intelligent systems that solve real-world problems. My interests include machine learning, cybersecurity, healthcare AI, computer vision, explainable AI, and advanced software engineering. I focus on transforming research concepts into scalable, production-ready solutions.`,
  socials: {
    github: "https://github.com/shaiksaifurrahman",
    linkedin: "https://linkedin.com/in/shaiksaifurrahman",
    email: "saifur.rahman.ai@gmail.com",
    twitter: "https://x.com/saifur_ai"
  }
};

export const PROJECTS: ProjectData[] = [
  {
    id: "cortex-nids",
    number: "01",
    title: "AI-POWERED NETWORK DEFENSE",
    subtitle: "CORTEX NIDS",
    tagline: "Detect threats before they become breaches.",
    category: "Cybersecurity & Intelligent Systems",
    description: "An AI-powered Network Intrusion Detection System that identifies malicious traffic in real time using machine learning, explainable AI, and automated security workflows.",
    metrics: [
      { label: "Detection Accuracy", value: "99.77%", sublabel: "Evaluated on multi-attack benchmarks" },
      { label: "False Positive Rate", value: "0.000016", sublabel: "Near-zero false alarms" },
      { label: "Inference Latency", value: "2.91ms", sublabel: "Ultra-low line rate inspection" },
      { label: "Automated QA Tests", value: "70+", sublabel: "End-to-end integration verified" }
    ],
    features: [
      "Real-Time Deep Threat Detection",
      "Explainable AI with SHAP Attribution",
      "Automated SIEM Alert Dispatch",
      "SOAR Incident Response Automation",
      "Continuous Packet Flow Inspection",
      "Zero-Day Pattern Anomaly Clustering"
    ],
    techStack: ["Python", "Scikit-Learn", "SHAP", "FastAPI", "Suricata", "Kafka", "Docker"],
    status: "PRODUCTION ACTIVE"
  },
  {
    id: "brain-tumor-detection",
    number: "02",
    title: "SEEING WHAT THE HUMAN EYE CAN MISS",
    subtitle: "BRAIN TUMOR DETECTION SYSTEM",
    tagline: "Deep learning precision for critical neuro-oncology.",
    category: "Medical AI & Computer Vision",
    description: "Deep learning-based MRI tumor segmentation system built using U-Net architecture and PyTorch to deliver pixel-level neoplastic boundary delineation.",
    metrics: [
      { label: "Dice Similarity Score", value: "88.39%", sublabel: "High spatial overlap index" },
      { label: "Clinical Specificity", value: "99.55%", sublabel: "Minimizing false positives" },
      { label: "MRI Scans Processed", value: "3,929", sublabel: "Multi-sequence T1, T2, FLAIR" },
      { label: "Segmentation Paradigm", value: "U-Net + ResNet", sublabel: "Skip-connected feature maps" }
    ],
    features: [
      "Multi-Modal MRI Preprocessing Pipeline",
      "Pixel-Wise Neoplastic Segmentation",
      "U-Net Architecture with Skip Connections",
      "Automated Tumor Volume Quantification",
      "Dice Loss & Focal Loss Optimization",
      "Clinical Heatmap & Contour Visualization"
    ],
    techStack: ["PyTorch", "U-Net", "OpenCV", "NumPy", "Albumentations", "Matplotlib", "FastAPI"],
    status: "RESEARCH BENCHMARK"
  },
  {
    id: "nutrient-ai",
    number: "03",
    title: "PREDICTING NUTRITIONAL RISKS BEFORE THEY BECOME DISEASES",
    subtitle: "NUTRIENT DEFICIENCY AI PLATFORM",
    tagline: "Proactive biochemical intelligence with explainable reasoning.",
    category: "Healthcare AI & Predictive Analytics",
    description: "An explainable AI healthcare platform capable of predicting multiple nutrient deficiencies simultaneously from non-invasive biomarker panels.",
    metrics: [
      { label: "Nutrient Predictions", value: "11 Panels", sublabel: "Simultaneous multi-target inference" },
      { label: "Engine Architecture", value: "XGBoost Ensemble", sublabel: "Gradient boosted decision trees" },
      { label: "End-to-End Latency", value: "15–45ms", sublabel: "Instant clinical feedback" },
      { label: "Interpretability", value: "SHAP Explainability", sublabel: "Patient-level feature impact" }
    ],
    features: [
      "11 Simultaneous Nutrient Biomarker Predictions",
      "XGBoost Gradient Boosted Ensemble",
      "SHAP Force Plots & Waterfall Interpretability",
      "Personalized Diet & Clinical Recommendations",
      "High-Throughput FastAPI Asynchronous Backend",
      "Relational PostgreSQL Telemetry Store"
    ],
    techStack: ["Python", "XGBoost", "SHAP", "FastAPI", "PostgreSQL", "Pandas", "Scikit-Learn"],
    status: "DEPLOYED PLATFORM"
  },
  {
    id: "aura-voice-assistant",
    number: "04",
    title: "WHERE VISION MEETS VOICE",
    subtitle: "AURA VOICE ASSISTANT",
    tagline: "Local, privacy-preserving multimodal intelligence.",
    category: "Conversational AI & Systems Automation",
    description: "A privacy-focused voice assistant capable of speech recognition, natural text-to-speech communication, computer vision synergy, and local operating system automation.",
    metrics: [
      { label: "Privacy Protocol", value: "100% Local", sublabel: "Zero cloud telemetry leakage" },
      { label: "Audio Processing", value: "Real-time FFT", sublabel: "Dynamic spectrogram pipeline" },
      { label: "Automation Modules", value: "25+ Handlers", sublabel: "OS & browser script execution" },
      { label: "Response Latency", value: "<120ms", sublabel: "Instant synthesized playback" }
    ],
    features: [
      "Offline Speech Recognition Engine",
      "Natural Neural Text-to-Speech Synthesis",
      "System-Level Command Automation Engine",
      "Computer Vision Screen Context Integration",
      "Interactive Audio Waveform Spectrogram",
      "Low-Footprint Background Daemon Architecture"
    ],
    techStack: ["Python", "VOSK", "PyTTSx3", "OpenCV", "Threading", "PyAutoGUI", "WebSockets"],
    status: "CORE FRAMEWORK"
  }
];

export const SKILLS: SkillItem[] = [
  // Programming
  { name: "Python", category: "Programming", level: 98, highlight: "Async, PyTorch, NumPy, Cython, Performance Tuning", tag: "Primary" },
  { name: "Java", category: "Programming", level: 86, highlight: "Enterprise Architecture, OOP, Concurrency, Algorithms", tag: "Systems" },
  { name: "C", category: "Programming", level: 88, highlight: "Memory Management, Low-Level I/O, Embedded Systems", tag: "Low-Level" },
  { name: "C++", category: "Programming", level: 89, highlight: "STL, High-Performance Computations, CUDA basics", tag: "High-Perf" },
  { name: "SQL", category: "Programming", level: 92, highlight: "Complex Queries, Window Functions, Index Optimization", tag: "Databases" },

  // AI & ML
  { name: "PyTorch", category: "AI & ML", level: 95, highlight: "Custom Architectures, U-Net, Transfer Learning, Tensors", tag: "Deep Learning" },
  { name: "Scikit-Learn", category: "AI & ML", level: 96, highlight: "Ensembles, Feature Engineering, Cross-Validation Pipelines", tag: "ML Frameworks" },
  { name: "XGBoost", category: "AI & ML", level: 94, highlight: "Gradient Boosting, Hyperparameter Tuning, Multi-Output", tag: "Ensemble" },
  { name: "OpenCV", category: "AI & ML", level: 90, highlight: "Image Segmentation, Feature Detection, Video Processing", tag: "Vision" },
  { name: "SHAP", category: "AI & ML", level: 93, highlight: "Game Theory Explainability, Waterfall & Force Plots", tag: "Explainable AI" },

  // Backend
  { name: "FastAPI", category: "Backend", level: 94, highlight: "Async Endpoints, Pydantic Models, High-Throughput APIs", tag: "API Engine" },
  { name: "PostgreSQL", category: "Backend", level: 88, highlight: "Relational Modeling, Indexing, Vector Search, ACID", tag: "Storage" },
  { name: "REST APIs", category: "Backend", level: 95, highlight: "Microservices Architecture, OpenAPI, JWT Security", tag: "Protocols" },

  // Tools
  { name: "Git", category: "Tools", level: 92, highlight: "Branching Strategies, CI/CD Actions, Version Control", tag: "VCS" },
  { name: "Docker", category: "Tools", level: 88, highlight: "Multi-stage Builds, Containerization, Microservice Orchestration", tag: "DevOps" },
  { name: "Linux", category: "Tools", level: 92, highlight: "Bash Scripting, System Administration, Kernel Monitoring", tag: "OS" },
  { name: "VMware", category: "Tools", level: 84, highlight: "Virtual Networks, Isolated Cyber Testbeds, Sandbox Labs", tag: "Virtualization" }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-ethical-hacking",
    title: "Ethical Hacking & Cyber Defense",
    issuer: "Certified Security Program",
    date: "2024",
    credentialId: "CERT-EH-88921-SR",
    description: "Hands-on penetration testing, network reconnaissance, vulnerability assessment, packet inspection, and defensive hardening.",
    skills: ["Network Security", "Vulnerability Scanning", "Packet Analysis", "Wireshark", "Penetration Testing"],
    badgeColor: "#00E5FF"
  },
  {
    id: "cert-gen-ai",
    title: "Generative AI Bootcamp",
    issuer: "Advanced AI Institute",
    date: "2024",
    credentialId: "CERT-GENAI-44120-SR",
    description: "Comprehensive mastery of Large Language Models (LLMs), Transformer architectures, embeddings, RAG pipelines, and prompt orchestration.",
    skills: ["Transformers", "RAG Architecture", "Vector Embeddings", "LangChain", "Prompt Optimization"],
    badgeColor: "#4F46E5"
  },
  {
    id: "cert-chatgpt-bootcamp",
    title: "ChatGPT & Autonomous Agents Bootcamp",
    issuer: "Intelligent Systems Academy",
    date: "2024",
    credentialId: "CERT-AGENT-55931-SR",
    description: "Developing autonomous tool-calling agents, conversational workflows, function invocation, and system-level API integrations.",
    skills: ["Autonomous Agents", "Function Calling", "API Tooling", "Context Window Optimization"],
    badgeColor: "#10B981"
  },
  {
    id: "cert-aws-cloud",
    title: "AWS Cloud Architecture Internship",
    issuer: "AWS Cloud Programs",
    date: "2024",
    credentialId: "INTERN-AWS-77219-SR",
    description: "Practical engineering of scalable cloud architectures, EC2 server configuration, S3 data pipelines, IAM security policies, and serverless compute.",
    skills: ["AWS EC2", "AWS S3", "IAM", "Lambda Functions", "Cloud Security", "CloudWatch"],
    badgeColor: "#F59E0B"
  },
  {
    id: "cert-iith-internship",
    title: "AI Research & Machine Learning Internship",
    issuer: "IIT Hyderabad (IITH)",
    date: "2024",
    credentialId: "IITH-RESEARCH-99381-SR",
    description: "Elite research internship focused on deep learning model exploration, neural network training diagnostics, and applied machine learning benchmarking.",
    skills: ["Deep Learning Research", "Mathematical Modeling", "PyTorch", "Model Benchmarking", "Data Analysis"],
    badgeColor: "#EC4899"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    period: "2022 - 2026",
    title: "B.Tech in Artificial Intelligence & Data Science",
    organization: "QIS College of Engineering and Technology",
    location: "Andhra Pradesh, India",
    role: "Undergraduate AI Researcher & Engineer",
    description: "Pursuing rigorous academic and practical training at the intersection of mathematical computing, neural networks, distributed systems, and real-world AI applications.",
    achievements: [
      "Engineered CORTEX NIDS achieving 99.77% detection accuracy on cyberattack benchmark datasets.",
      "Developed deep learning brain MRI segmentation pipeline achieving 88.39% Dice coefficient.",
      "Built multi-output explainable nutrient deficiency diagnostic engine powered by XGBoost & SHAP.",
      "Spearheaded student research cohorts in applied computer vision and defensive cybersecurity."
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "Linux", "Scikit-Learn"]
  },
  {
    period: "2024",
    title: "AI Research & Machine Learning Internship",
    organization: "IIT Hyderabad (IITH)",
    location: "Hyderabad, India",
    role: "Research Intern",
    description: "Conducted advanced experimental work on deep learning models, mathematical optimization, and neural convergence diagnostics under esteemed academic mentorship.",
    achievements: [
      "Formulated and validated experimental deep learning architectures on high-dimensional datasets.",
      "Optimized training pipelines to accelerate convergence and reduce gradient instabilities.",
      "Presented empirical evaluation metrics and comparative benchmarks to research panels."
    ],
    technologies: ["PyTorch", "Deep Learning", "NumPy", "Tensor Diagnostics", "Mathematical Optimization"]
  },
  {
    period: "2024",
    title: "AWS Cloud Engineering Internship",
    organization: "Cloud Technologies",
    location: "Remote / Hybrid",
    role: "Cloud Engineering Intern",
    description: "Architected and deployed cloud-native infrastructure for machine learning workloads, ensuring high availability, security hardening, and cost-efficient compute allocation.",
    achievements: [
      "Configured automated deployment pipelines with EC2 and S3 object storage for model weights.",
      "Enforced granular IAM least-privilege policies to ensure strict zero-trust access control.",
      "Implemented CloudWatch monitoring hooks to track inference latency and compute saturation."
    ],
    technologies: ["AWS", "EC2", "S3", "IAM", "Cloud Architecture", "Docker"]
  }
];

export const CORE_PHILOSOPHY = [
  {
    code: "01",
    title: "RESEARCH RIGOR",
    description: "Every algorithm starts from mathematical foundations, statistical validation, and reproducible empirical evidence."
  },
  {
    code: "02",
    title: "PRODUCTION VELOCITY",
    description: "A model that remains trapped in a Jupyter notebook is zero value. We build containerized, low-latency, resilient APIs."
  },
  {
    code: "03",
    title: "EXPLAINABILITY AS DEFAULT",
    description: "Black-box AI is unacceptable in healthcare and cybersecurity. We utilize SHAP attribution to give clinicians and analysts total transparency."
  },
  {
    code: "04",
    title: "DEFENSIVE DISCIPLINE",
    description: "Security is engineered into the system architecture from day zero, not patched on top as an afterthought."
  }
];
