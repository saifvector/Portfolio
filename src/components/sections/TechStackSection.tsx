'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const TECH = [
  { name: "Python", size: "text-5xl sm:text-7xl md:text-8xl", weight: "font-bold" },
  { name: "PyTorch", size: "text-4xl sm:text-6xl md:text-7xl", weight: "font-light" },
  { name: "FastAPI", size: "text-3xl sm:text-5xl md:text-6xl", weight: "font-medium" },
  { name: "Docker", size: "text-5xl sm:text-7xl md:text-8xl", weight: "font-bold" },
  { name: "Linux", size: "text-4xl sm:text-6xl md:text-7xl", weight: "font-bold" },
  { name: "XGBoost", size: "text-3xl sm:text-5xl md:text-6xl", weight: "font-light" },
  { name: "PostgreSQL", size: "text-3xl sm:text-4xl md:text-5xl", weight: "font-medium" },
  { name: "OpenCV", size: "text-4xl sm:text-6xl md:text-7xl", weight: "font-light" },
  { name: "Java", size: "text-3xl sm:text-5xl md:text-6xl", weight: "font-medium" },
  { name: "C++", size: "text-5xl sm:text-7xl md:text-8xl", weight: "font-bold" },
  { name: "VMware", size: "text-3xl sm:text-4xl md:text-5xl", weight: "font-light" },
  { name: "SHAP", size: "text-4xl sm:text-6xl md:text-7xl", weight: "font-medium" },
  { name: "Scikit-Learn", size: "text-3xl sm:text-5xl md:text-6xl", weight: "font-light" },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] text-[#555] font-mono"
        >
          TECHNICAL STACK
        </motion.div>

        {/* Floating typography */}
        <div className="flex flex-wrap items-baseline gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-3 sm:gap-y-5 select-none">
          {TECH.map((t, idx) => {
            const yOffset = idx % 2 === 0 ? y1 : y2;
            return (
              <motion.span
                key={t.name}
                style={{ y: yOffset }}
                className={`${t.size} ${t.weight} uppercase tracking-tight text-white/30 hover:text-white transition-colors duration-300 cursor-default inline-block`}
              >
                {t.name}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
