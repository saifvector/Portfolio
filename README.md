# Shaik Saifur Rahman // Intelligent Systems & AI Engineering Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

<br/>

**Personal portfolio, research laboratory, and systems engineering showcase of Shaik Saifur Rahman.**  
Bridging theoretical artificial intelligence, clinical vision, cyber threat detection, and production-grade architectures.

[Live Demonstration](https://github.com/saifvector/Portfolio) • [Report Issue](https://github.com/saifvector/Portfolio/issues) • [Contact Author](mailto:saifur.rahman.ai@gmail.com)

</div>

---

## ✦ Overview

This portfolio is an interactive, editorial-grade web application built to showcase applied AI research, full-stack machine learning architectures, and production-grade intelligent systems. Designed with a Swiss minimalist dark aesthetic (`#050505`), custom Lenis momentum scrolling, and custom 3D spatial canvas interfaces.

### Key Highlights
- **Spatial 3D Indexing**: Custom interactive cylindrical carousel (`WorksWheel`) and 3D research tunnel corridor (`PerspectiveTunnelHero`) built with Three.js and Framer Motion.
- **Continuous Editorial Roadmap**: Zero-lag responsive timeline documenting academic and engineering milestones from foundational mathematics to high-throughput production systems.
- **Deep-Dive Case Studies**: End-to-end telemetry, accuracy curves, confusion matrix metrics, and architecture explanations for 4 core AI engineering projects.
- **Performance Optimized**: Sub-millisecond rendering, zero layout shift (CLS 0), pre-rendered viewport viewports (`margin: 300px`), and 100% TypeScript type safety.

---

## ✦ Featured Systems & Research

### 1. [CORTEX NIDS // Network Threat Defense](#)
- **Domain**: Cybersecurity AI & Automated Threat Mitigation
- **Key Metrics**: `99.77%` Accuracy • `2.91ms` Latency • `70+` Test Suites
- **Architecture**: Real-time packet parsing engine coupled with gradient-boosted decision trees, low-latency telemetry logging, and SHAP explainability pipelines for automated threat isolation.

### 2. [Brain Tumor AI // Clinical MRI Segmentation](#)
- **Domain**: Healthcare Computer Vision & Diagnostic Support
- **Key Metrics**: `88.39%` Dice Coefficient • `99.55%` Specificity • `3,929` Scans
- **Architecture**: Modified U-Net segmentation pipeline trained on multi-modal MRI scans (T1, T1Gd, T2, FLAIR) for automated tumor boundary localization with clinical decision support.

### 3. [Nutrient Deficiency AI // Predictive Healthcare](#)
- **Domain**: Predictive Medicine & Bio-signal Interpretability
- **Key Metrics**: `11` Nutrient Deficiencies • `45ms` Inference • `SHAP` Explainability
- **Architecture**: Symptom-to-biomarker mapping engine diagnosing macro- and micronutrient deficiencies prior to acute symptomatic progression, backed by interpretable attribution weights.

### 4. [Aura Voice System // Edge Intelligence](#)
- **Domain**: Privacy-First Local Automation
- **Key Metrics**: `100%` Local Processing • Zero Cloud Dependence • Sub-100ms Voice Action
- **Architecture**: Edge-native speech recognition pipeline and lightweight quantized local LLMs for hands-free operating system telemetry and workflow automation without external network transmission.

---

## ✦ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Machine Learning & AI** | Python, PyTorch, Scikit-Learn, XGBoost, OpenCV, SHAP, Hugging Face, U-Net |
| **Backend & Cloud** | FastAPI, Docker, Linux, AWS Cloud Architecture, PostgreSQL, VMware |
| **Frontend & Visualization** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, Lenis Scroll |
| **Testing & CI/CD** | ESLint, Turbopack, Git, GitHub Actions, Vercel |

---

## ✦ Engineering Principles

1. **Think Like a Researcher** — Ground every project in first-principles inquiry, theoretical rigor, and algorithmic validity.
2. **Build Like an Engineer** — Implement scalable schemas, deterministic telemetry, and production-grade error resilience.
3. **Ship Like a Startup** — Maintain high execution velocity, rapid validation cycles, and continuous delivery.
4. **Solve Real Problems** — Focus on high-stakes applications across healthcare, cybersecurity, and intelligent automation.

---

## ✦ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.18.0` or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saifvector/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

Compile optimized static and SSR assets:
```bash
npm run build
npm run start
```

---

## ✦ Project Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Metadata, fonts, viewport & SEO configuration
│   │   ├── page.tsx                  # Main single-page portfolio experience
│   │   ├── works-wheel/page.tsx      # Standalone 3D wheel route
│   │   └── tunnel/page.tsx           # Standalone 3D tunnel corridor route
│   ├── components/
│   │   ├── canvas/                   # Ambient Three.js particle canvas
│   │   ├── providers/                # Lenis smooth scroll provider
│   │   ├── sections/                 # Modular editorial sections (01 to 10)
│   │   │   ├── OpeningSection.tsx
│   │   │   ├── ManifestoSection.tsx
│   │   │   ├── IdentitySection.tsx
│   │   │   ├── TimelineJourneySection.tsx
│   │   │   ├── ProjectShowcase.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── PrinciplesSection.tsx
│   │   │   ├── CredentialsSection.tsx
│   │   │   └── FinalSection.tsx
│   │   └── ui/                       # Reusable UI & 3D components
│   │       ├── works-wheel.tsx       # 3D cylindrical carousel
│   │       ├── perspective-tunnel-hero.tsx # 3D Z-space corridor
│   │       ├── CustomCursor.tsx
│   │       └── Navbar.tsx
│   └── lib/
│       └── utils.ts                  # Classname merging & utility helpers
├── public/                           # Static assets, icons, and diagrams
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind design tokens
└── package.json
```

---

## ✦ Author & Connect

**Shaik Saifur Rahman**  
*AI Engineer & Intelligent Systems Architect*  
B.Tech in Artificial Intelligence & Data Science

- **GitHub**: [@saifvector](https://github.com/saifvector)
- **LinkedIn**: [Shaik Saifur Rahman](https://linkedin.com/in/shaiksaifurrahman)
- **Email**: [saifur.rahman.ai@gmail.com](mailto:saifur.rahman.ai@gmail.com)

---

## ✦ License

This project is licensed under the [MIT License](LICENSE).
