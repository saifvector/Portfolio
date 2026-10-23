'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MILESTONES = [
  { year: "2023", text: "Learning foundations.", detail: "Mathematics, algorithms, and first encounters with machine learning." },
  { year: "2024", text: "AI and machine learning projects.", detail: "IIT Hyderabad research internship. AWS cloud engineering. Deep learning explorations." },
  { year: "2025", text: "Healthcare AI research.", detail: "Brain tumor segmentation. Nutrient deficiency prediction. Explainable diagnostics." },
  { year: "2026", text: "Cybersecurity systems and explainable AI.", detail: "CORTEX NIDS. Production-grade detection. SHAP-driven transparency." },
  { year: "FUTURE", text: "Building production-scale intelligent systems.", detail: "Research-driven engineering at the intersection of healthcare, security, and automation." },
];

export default function TimelineJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  // Progress line
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative"
      style={{ height: `${MILESTONES.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section label */}
        <div className="px-6 sm:px-12 md:px-20 mb-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#555] font-mono">
            THE JOURNEY
          </div>
        </div>

        {/* Progress line */}
        <div className="px-6 sm:px-12 md:px-20 mb-12">
          <div className="h-px bg-white/10 relative">
            <motion.div
              style={{ width: lineWidth }}
              className="absolute inset-y-0 left-0 bg-white/40"
            />
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <motion.div
          style={{ x }}
          className="flex gap-0 pl-6 sm:pl-12 md:pl-20"
        >
          {MILESTONES.map((m, idx) => (
            <div
              key={m.year}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] pr-12 sm:pr-16 md:pr-20"
            >
              <div className="space-y-6">
                {/* Year */}
                <div className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white/10 leading-none">
                  {m.year}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight uppercase">
                  {m.text}
                </h3>

                {/* Detail */}
                <p className="text-sm sm:text-base text-[#888] leading-relaxed max-w-sm">
                  {m.detail}
                </p>

                {/* Index */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#444] font-mono pt-4">
                  {String(idx + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
