'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PRINCIPLES = [
  { number: '01', title: 'BUILD FOR IMPACT.', detail: 'Every neural system must deliver measurable improvements to human decision quality.' },
  { number: '02', title: 'MEASURE EVERYTHING.', detail: 'Deterministic benchmarks, false-positive curves, and reproducible latencies.' },
  { number: '03', title: 'RESEARCH IS ONLY THE BEGINNING.', detail: 'Theoretical novelty only matters when hardened for unpredictable production environments.' },
  { number: '04', title: 'DEPLOYMENT CREATES VALUE.', detail: 'Autonomous pipelines, edge-native inference, and real-time execution.' },
];

export default function PrinciplesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });

  return (
    <section
      id="principles"
      ref={ref}
      className="relative px-6 sm:px-12 md:px-20 py-20 sm:py-28 max-w-7xl mx-auto border-t border-b border-white/5 scroll-mt-20"
    >
      <div className="flex items-center gap-3 mb-12">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
          08 // Engineering Principles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {PRINCIPLES.map((p, idx) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 hover:border-white/15 transition-all space-y-4"
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#666]">
              {p.number}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              {p.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#888] font-light leading-relaxed">
              {p.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
