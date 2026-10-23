'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SKILLS = [
  { name: "Python", size: "text-5xl sm:text-7xl md:text-8xl", speed: -40 },
  { name: "PyTorch", size: "text-6xl sm:text-8xl md:text-9xl font-bold", speed: 50 },
  { name: "FastAPI", size: "text-4xl sm:text-6xl md:text-7xl", speed: -30 },
  { name: "C++", size: "text-6xl sm:text-8xl md:text-9xl font-bold", speed: 60 },
  { name: "XGBoost", size: "text-5xl sm:text-7xl md:text-8xl", speed: -50 },
  { name: "PostgreSQL", size: "text-4xl sm:text-6xl md:text-7xl", speed: 30 },
  { name: "Docker", size: "text-5xl sm:text-7xl md:text-8xl", speed: -40 },
  { name: "Linux", size: "text-6xl sm:text-8xl md:text-9xl font-bold", speed: 45 },
  { name: "OpenCV", size: "text-4xl sm:text-6xl md:text-7xl", speed: -25 },
  { name: "SHAP", size: "text-5xl sm:text-7xl md:text-8xl", speed: 35 },
  { name: "SQL", size: "text-6xl sm:text-8xl md:text-9xl font-bold", speed: -45 },
  { name: "Java", size: "text-4xl sm:text-6xl md:text-7xl", speed: 25 },
  { name: "VMware", size: "text-5xl sm:text-7xl md:text-8xl", speed: -35 }
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32 overflow-hidden"
    >
      <div className="space-y-16">
        <div className="text-xs uppercase tracking-widest text-[#888888]">
          SKILLS &amp; TECHNOLOGIES
        </div>

        {/* Huge Floating Typography (No cards, no boxes) */}
        <div className="flex flex-wrap items-baseline gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-4 sm:gap-y-8 select-none">
          {SKILLS.map((skill, idx) => {
            const yOffset = idx % 2 === 0 ? y1 : y2;
            return (
              <motion.div
                key={skill.name}
                style={{ y: yOffset }}
                className="inline-block"
              >
                <span
                  className={`${skill.size} uppercase tracking-tight text-[#888888] hover:text-white transition-colors duration-300 cursor-default inline-block`}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
