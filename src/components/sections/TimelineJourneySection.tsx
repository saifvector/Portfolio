'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
  {
    year: "2023",
    status: "Foundations",
    text: "Theoretical rigor & algorithm design.",
    detail: "Linear algebra, probability theory, discrete mathematics, and initial neural network implementations from scratch.",
    highlight: "Core Fundamentals",
  },
  {
    year: "2024",
    status: "Applied AI",
    text: "Research residency & deep learning.",
    detail: "AI research internship at IIT Hyderabad. Cloud infrastructure engineering on AWS. High-throughput inference pipelines.",
    highlight: "IIT Hyderabad Residency",
  },
  {
    year: "2025",
    status: "Clinical AI",
    text: "Healthcare intelligence & segmentation.",
    detail: "3D brain tumor MRI segmentation with U-Net. Explainable nutrient deficiency prediction using SHAP interpretability.",
    highlight: "Healthcare Systems",
  },
  {
    year: "2026",
    status: "Production",
    text: "Cybersecurity & real-time detection.",
    detail: "CORTEX NIDS: production-grade intrusion detection achieving 99.77% accuracy and 2.91ms sub-millisecond inference.",
    highlight: "CORTEX NIDS (99.77%)",
  },
  {
    year: "FUTURE",
    status: "Horizon",
    text: "Production-scale autonomous systems.",
    detail: "Architecting agentic reasoning frameworks at the intersection of medicine, offensive/defensive security, and robotics.",
    highlight: "Autonomous Frontier",
  },
];

export default function TimelineJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative px-6 sm:px-12 md:px-20 py-16 sm:py-24 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
              04 // The Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]"
          >
            RESEARCH &<br />TRAJECTORY.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-sm text-[#888] leading-relaxed max-w-md"
        >
          A continuous timeline from theoretical mathematics and research residencies to hardened production-grade intelligent engines.
        </motion.p>
      </div>

      {/* Progress Rail Header */}
      <div className="hidden lg:grid grid-cols-5 gap-6 mb-8 pb-4 border-b border-white/5">
        {MILESTONES.map((m, idx) => (
          <div key={m.year} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#666] uppercase">
              PHASE {String(idx + 1).padStart(2, '0')} // {m.year}
            </span>
          </div>
        ))}
      </div>

      {/* Responsive Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
        {MILESTONES.map((m, idx) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease }}
            className="group relative p-6 sm:p-7 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 hover:border-white/20 hover:bg-[#0d0d0d] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                  {m.status}
                </span>
                <span className="text-[10px] font-mono text-[#555]">
                  {String(idx + 1).padStart(2, '0')}/05
                </span>
              </div>

              {/* Year */}
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 group-hover:translate-x-1 transition-transform">
                {m.year}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-medium text-white/90 leading-snug mb-3">
                {m.text}
              </h3>

              {/* Detail */}
              <p className="text-xs text-[#777] leading-relaxed font-light">
                {m.detail}
              </p>
            </div>

            {/* Bottom Tag */}
            <div className="pt-6 mt-6 border-t border-white/5">
              <span className="text-[9px] font-mono tracking-[0.15em] text-[#555] uppercase block truncate group-hover:text-[#999] transition-colors">
                {m.highlight}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
