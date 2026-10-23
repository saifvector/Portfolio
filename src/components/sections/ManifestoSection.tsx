'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATEMENTS = [
  { index: "01", text: "THINK LIKE A RESEARCHER.", desc: "First-principles inquiry, theoretical rigor, and deep algorithmic foundations." },
  { index: "02", text: "BUILD LIKE AN ENGINEER.", desc: "Scalable architectures, deterministic telemetry, and production-grade reliability." },
  { index: "03", text: "SHIP LIKE A STARTUP.", desc: "Fast execution velocity, rapid feedback loops, and continuous deployment." },
  { index: "04", text: "SOLVE REAL PROBLEMS.", desc: "High-stakes impact across healthcare, cybersecurity, and intelligent automation." }
];

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "300px 0px 300px 0px" });

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative px-6 sm:px-12 md:px-20 py-20 sm:py-28 max-w-7xl mx-auto border-t border-b border-white/5 scroll-mt-20"
    >
      <div className="flex items-center gap-3 mb-12">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
          02 // Core Manifesto
        </span>
      </div>

      <div className="space-y-10 sm:space-y-14">
        {STATEMENTS.map((item, idx) => (
          <motion.div
            key={item.index}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-8 border-b border-white/5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-baseline gap-6 sm:gap-10">
              <span className="text-xs sm:text-sm font-mono text-[#444] group-hover:text-white transition-colors">
                {item.index}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] group-hover:text-white transition-colors">
                {item.text}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#777] max-w-xs md:text-right font-light leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
