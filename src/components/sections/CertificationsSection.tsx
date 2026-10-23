'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE_DATA = [
  {
    category: "EDUCATION",
    year: "2022 — 2026",
    title: "B.Tech in Artificial Intelligence & Data Science",
    institution: "QIS College of Engineering and Technology",
    details: "Foundational mathematics, deep learning topologies, adversarial robustness, and distributed computing."
  },
  {
    category: "INTERNSHIPS",
    year: "2024",
    title: "AI Research & Deep Learning Residency",
    institution: "Indian Institute of Technology Hyderabad (IITH)",
    details: "Neural convergence diagnostics, empirical benchmarking, and mathematical optimization in PyTorch."
  },
  {
    category: "INTERNSHIPS",
    year: "2024",
    title: "Cloud Infrastructure Engineering",
    institution: "AWS Cloud Programs",
    details: "Architecting high-availability infrastructure, secure S3 pipelines, and model deployment automation."
  },
  {
    category: "CERTIFICATIONS",
    year: "2024",
    title: "Ethical Hacking & Defensive Hardening",
    institution: "Certified Security Program",
    details: "Network vulnerability auditing, packet inspection, and defensive firewall automation."
  },
  {
    category: "CERTIFICATIONS",
    year: "2024",
    title: "Generative AI & Autonomous Agent Architecture",
    institution: "Advanced AI Institute",
    details: "Large Language Models, vector retrieval pipelines, and function-calling agentic workflows."
  },
  {
    category: "ACHIEVEMENTS",
    year: "2024",
    title: "CORTEX NIDS Benchmark Validation",
    institution: "Autonomous Research",
    details: "Achieved 99.77% detection accuracy and 0.000016 FPR across 70+ automated QA test suites."
  }
];

export default function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="credentials"
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-widest text-[#888888]"
        >
          CREDENTIALS &amp; TIMELINE
        </motion.div>

        {/* Minimal Timeline Layout */}
        <div className="border-t border-white/10">
          {TIMELINE_DATA.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="py-8 sm:py-10 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-3 text-xs uppercase tracking-wider text-[#888888] font-mono">
                {item.category} · {item.year}
              </div>

              <div className="md:col-span-5 space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <div className="text-sm text-[#888888]">
                  {item.institution}
                </div>
              </div>

              <div className="md:col-span-4 text-xs sm:text-sm text-[#888888] font-light leading-relaxed">
                {item.details}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
