'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import WorksWheel, { type WorksWheelItem } from '../ui/works-wheel';
import PerspectiveTunnelHero, { type TunnelItem } from '../ui/perspective-tunnel-hero';

/* ─── Project data ─── */
interface ProjectConfig {
  id: string;
  number: string;
  label: string;
  headline: string[];
  description: string;
  metrics: { value: string; label: string }[];
  visual: 'orbital' | 'brain' | 'curve' | 'waveform';
}

const PROJECTS: ProjectConfig[] = [
  {
    id: 'cortex-nids',
    number: '01',
    label: 'CORTEX NIDS',
    headline: ["ATTACKS DON'T", "ANNOUNCE", "THEMSELVES."],
    description: "AI-powered Network Intrusion Detection System combining machine learning, explainability, and automated response pipelines.",
    metrics: [
      { value: '99.77%', label: 'Accuracy' },
      { value: '2.91ms', label: 'Latency' },
      { value: '70+', label: 'QA Tests' },
    ],
    visual: 'orbital',
  },
  {
    id: 'brain-tumor',
    number: '02',
    label: 'BRAIN TUMOR DETECTION',
    headline: ["SEE WHAT", "THE HUMAN EYE", "CAN MISS."],
    description: "Deep-learning MRI segmentation platform engineered for accurate tumor localization and clinical decision support.",
    metrics: [
      { value: '88.39%', label: 'Dice Score' },
      { value: '99.55%', label: 'Specificity' },
      { value: '3929', label: 'MRI Scans' },
    ],
    visual: 'brain',
  },
  {
    id: 'nutrient-ai',
    number: '03',
    label: 'NUTRIENT DEFICIENCY AI',
    headline: ["PREDICT DEFICIENCIES", "BEFORE THEY", "BECOME DISEASES."],
    description: "Explainable healthcare AI platform predicting nutritional deficiencies before symptomatic onset.",
    metrics: [
      { value: '11', label: 'Nutrients' },
      { value: '45ms', label: 'Inference' },
      { value: 'SHAP', label: 'Explainability' },
    ],
    visual: 'curve',
  },
  {
    id: 'aura',
    number: '04',
    label: 'AURA',
    headline: ["WHERE VISION", "MEETS VOICE."],
    description: "Privacy-first voice assistant capable of intelligent local automation without cloud dependence.",
    metrics: [
      { value: '100%', label: 'Local Processing' },
      { value: 'Voice', label: 'Commands' },
      { value: 'System', label: 'Automation' },
    ],
    visual: 'waveform',
  },
];

const WHEEL_PROJECTS: WorksWheelItem[] = [
  {
    title: "Cortex NIDS",
    image: "https://www.crafterui.com/art/prismatic-rift-anime.jpg",
    href: "#cortex-nids",
  },
  {
    title: "Brain Tumor AI",
    image: "https://www.crafterui.com/art/celestial-light-figure.jpg",
    href: "#brain-tumor",
  },
  {
    title: "Nutrient AI",
    image: "https://www.crafterui.com/art/indigo-liquid-marble.jpg",
    href: "#nutrient-ai",
  },
  {
    title: "Aura Voice AI",
    image: "https://www.crafterui.com/art/neon-portrait-uplight.jpg",
    href: "#aura",
  },
  {
    title: "Autonomous Agents",
    image: "https://www.crafterui.com/art/black-hole-ember-clouds.jpg",
    href: "#cortex-nids",
  },
  {
    title: "Edge ML Engine",
    image: "https://www.crafterui.com/art/rocket-launch-gradient.jpg",
    href: "#aura",
  },
  {
    title: "Neural Vision",
    image: "https://www.crafterui.com/art/neon-cave-portal-silhouette.jpg",
    href: "#brain-tumor",
  },
  {
    title: "Cyber Shield",
    image: "https://www.crafterui.com/art/red-ribbon-typography.jpg",
    href: "#cortex-nids",
  },
];

const TUNNEL_PROJECTS: TunnelItem[] = [
  {
    title: "Cortex NIDS",
    tag: "Network Threat Defense // 99.77% Acc",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900&auto=format&fit=crop",
    href: "#cortex-nids",
  },
  {
    title: "Brain Tumor AI",
    tag: "Clinical MRI Vision // U-Net",
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=900&auto=format&fit=crop",
    href: "#brain-tumor",
  },
  {
    title: "Nutrient AI",
    tag: "Preventive Healthcare // SHAP",
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop",
    href: "#nutrient-ai",
  },
  {
    title: "Aura Voice AI",
    tag: "Edge Automation // Local LLM",
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop",
    href: "#aura",
  },
  {
    title: "Deepfake Detection",
    tag: "Forensic Computer Vision",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop",
    href: "#cortex-nids",
  },
  {
    title: "CSIFormer RF Sensing",
    tag: "Channel State Transformers",
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
  {
    title: "Autonomous Agents",
    tag: "Distributed Swarm Reasoning",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900&auto=format&fit=crop",
    href: "#cortex-nids",
  },
  {
    title: "AI Job Copilot",
    tag: "Autonomous Workflow Orchestration",
    src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=900&auto=format&fit=crop",
    href: "#aura",
  },
  {
    title: "PharmaScan",
    tag: "Bioinformatics Comparative Engine",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=900&auto=format&fit=crop",
    href: "#nutrient-ai",
  },
];

/* ─── Canvas Visuals ─── */

function OrbitalVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.008;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Orbital rings
      [60, 100, 140, 180].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, t * (0.3 + i * 0.1), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.06 + i * 0.02})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Nodes on orbits
      [60, 100, 140, 180].forEach((r, i) => {
        const angle = t * (1 + i * 0.3) + i * 1.5;
        const nx = cx + Math.cos(angle) * r;
        const ny = cy + Math.sin(angle) * r * 0.4;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.4 + i * 0.1})`;
        ctx.fill();
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[400px] max-h-[400px]" />;
}

function BrainVisual() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full max-w-[360px] max-h-[360px] opacity-60" fill="none">
      <ellipse cx="150" cy="150" rx="110" ry="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      <ellipse cx="150" cy="150" rx="95" ry="85" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M 150,65 L 150,235" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
      <path d="M 130,110 Q 115,150 130,190" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      <path d="M 170,110 Q 185,150 170,190" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      {/* Lesion */}
      <path d="M 180,120 Q 210,115 215,140 Q 218,162 195,168 Q 175,168 170,148 Z" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
      <circle cx="193" cy="143" r="2" fill="white" />
    </svg>
  );
}

function CurveVisual() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full max-w-[360px] max-h-[220px] opacity-60" fill="none">
      <line x1="20" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <line x1="20" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <line x1="20" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <path d="M 20,165 C 80,165 120,140 160,100 C 200,60 240,35 300,35" stroke="white" strokeWidth="1.2" fill="none" />
      <circle cx="160" cy="100" r="3" fill="white" />
      <line x1="160" y1="100" x2="160" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3" />
      <text x="164" y="112" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">threshold</text>
    </svg>
  );
}

function WaveformVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.018;
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      [
        { amp: 22, freq: 0.02, phase: t, alpha: 0.5, lw: 1.2 },
        { amp: 14, freq: 0.028, phase: t * 1.4, alpha: 0.2, lw: 0.8 },
        { amp: 8, freq: 0.015, phase: t * 0.7, alpha: 0.1, lw: 0.6 },
      ].forEach(l => {
        ctx.beginPath();
        ctx.lineWidth = l.lw;
        ctx.strokeStyle = `rgba(255,255,255,${l.alpha})`;
        for (let x = 0; x < w; x++) {
          const env = Math.sin((x / w) * Math.PI);
          const y = cy + Math.sin(x * l.freq + l.phase) * l.amp * env;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={400} height={160} className="w-full h-auto max-w-[400px]" />;
}

const VISUAL_MAP: Record<string, React.FC> = {
  orbital: OrbitalVisual,
  brain: BrainVisual,
  curve: CurveVisual,
  waveform: WaveformVisual,
};

/* ─── Single Project Section ─── */

function ProjectSection({ project, index }: { project: ProjectConfig; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const ease = [0.16, 1, 0.3, 1] as const;
  const isEven = index % 2 === 0;

  const Visual = VISUAL_MAP[project.visual];

  return (
    <section
      id={project.id}
      ref={ref}
      className="flex items-center px-6 sm:px-12 md:px-20 py-16 sm:py-20 scroll-mt-24"
    >
      <div className={`max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
        {/* Text Column */}
        <div className={`lg:col-span-7 space-y-8 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
          {/* Number + Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-baseline gap-4"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#444]">{project.number}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">{project.label}</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92]"
            >
              {project.headline.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h3>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="text-base sm:text-lg text-[#888] leading-relaxed max-w-xl"
          >
            {project.description}
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="flex gap-10 sm:gap-14 pt-6 border-t border-white/10"
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">{m.value}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#888] mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual Column */}
        <div className={`lg:col-span-5 flex items-center justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="w-full flex items-center justify-center"
          >
            <Visual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Export: All Projects with 3D Works Wheel ─── */

export default function ProjectShowcase() {
  const introRef = useRef<HTMLDivElement>(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.1 });

  return (
    <div id="projects" className="relative">
      {/* ─── Works Wheel Interactive Showcase ─── */}
      <section ref={introRef} className="pt-16 pb-8 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
                05 // Selected Works
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]"
            >
              ENGINEERED<br />INTELLIGENCE.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-sm text-[#888] leading-relaxed">
              3D interactive index of research projects, autonomous systems, and deep-learning pipelines. Turn the drum or drag to browse; click inspect to jump directly to the system architecture.
            </p>
          </motion.div>
        </div>

        {/* 3D Wheel Stage */}
        <div className="w-full h-[65vh] min-h-[480px] max-h-[700px] relative overflow-hidden my-6 rounded-2xl border border-white/5 bg-[#050505]/40 shadow-2xl">
          <WorksWheel items={WHEEL_PROJECTS} label="SYSTEMS // '26" action="Inspect" />
        </div>
      </section>

      {/* ─── Detailed System Telemetry & Deep-Dives ─── */}
      <div className="divide-y divide-white/5">
        {PROJECTS.map((p, i) => (
          <ProjectSection key={p.number} project={p} index={i} />
        ))}
      </div>

      {/* ─── 3D Perspective Tunnel Corridor ─── */}
      <section className="pt-14 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
                Spatial Corridor // Research Depth
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              INTO THE<br />RESEARCH ETHER.
            </h2>
          </div>
          <p className="text-sm text-[#888] leading-relaxed max-w-md">
            Fly through the spatial 3D corridor of autonomous models, transformers, and edge intelligences. Scroll your wheel or trackpad to accelerate forward in Z-space.
          </p>
        </div>

        <PerspectiveTunnelHero
          items={TUNNEL_PROJECTS}
          badge="WARP DRIVE // SPATIAL ARCHIVE"
          headline={
            <>
              ARCHITECTING
              <br />
              INTELLIGENCE.
            </>
          }
          subtitle="Scroll trackpad or mouse wheel to fly through the 3D research corridor."
        />
      </section>
    </div>
  );
}
