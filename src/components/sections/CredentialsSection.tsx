'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CREDENTIALS = [
  {
    category: "EDUCATION",
    year: "2022 — 2026",
    title: "B.Tech in Artificial Intelligence & Data Science",
    org: "QIS College of Engineering and Technology",
  },
  {
    category: "RESEARCH",
    year: "2024",
    title: "AI Research & Deep Learning Residency",
    org: "Indian Institute of Technology Hyderabad",
  },
  {
    category: "ENGINEERING",
    year: "2024",
    title: "Cloud Infrastructure Engineering",
    org: "AWS Cloud Programs",
  },
  {
    category: "CERTIFICATION",
    year: "2024",
    title: "Ethical Hacking & Defensive Hardening",
    org: "Certified Security Program",
  },
  {
    category: "CERTIFICATION",
    year: "2024",
    title: "Generative AI & Autonomous Agent Architecture",
    org: "Advanced AI Institute",
  },
  {
    category: "ACHIEVEMENT",
    year: "2024",
    title: "CORTEX NIDS — 99.77% Detection Accuracy",
    org: "Independent Research & Engineering",
  },
];

export default function CredentialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="credentials"
      ref={ref}
      className="flex items-center px-6 sm:px-12 md:px-20 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto w-full space-y-14">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease }}
          className="text-[10px] uppercase tracking-[0.3em] text-[#555] font-mono"
        >
          CREDENTIALS
        </motion.div>

        {/* Timeline rows */}
        <div className="border-t border-white/10">
          {CREDENTIALS.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease }}
              className="py-7 sm:py-8 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline group hover:bg-white/[0.015] transition-colors duration-300 px-0 md:px-2"
            >
              {/* Category + Year */}
              <div className="md:col-span-3 flex items-baseline gap-3 text-[10px] uppercase tracking-[0.15em] text-[#555] font-mono">
                <span>{item.category}</span>
                <span className="text-[#333]">·</span>
                <span>{item.year}</span>
              </div>

              {/* Title */}
              <div className="md:col-span-5">
                <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight group-hover:text-white/90 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Organization */}
              <div className="md:col-span-4 text-sm text-[#888]">
                {item.org}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
