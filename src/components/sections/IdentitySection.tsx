'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function IdentitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="identity"
      ref={ref}
      className="relative flex items-center px-6 sm:px-12 md:px-20 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Portrait placeholder — monochrome abstract silhouette */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 1, ease }}
          className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full"
        >
          {/* Monochrome abstract portrait frame */}
          <div className="absolute inset-0 border border-white/10" />
          <div className="absolute inset-4 border border-white/[0.06]" />

          {/* Abstract representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 200 280"
              className="w-3/5 h-auto opacity-[0.12]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Minimal human silhouette — editorial style */}
              <ellipse cx="100" cy="70" rx="40" ry="48" stroke="white" strokeWidth="0.8" />
              <path d="M 40,160 Q 40,120 100,110 Q 160,120 160,160 L 160,280 L 40,280 Z" stroke="white" strokeWidth="0.8" fill="none" />
              {/* Subtle cross lines */}
              <line x1="100" y1="0" x2="100" y2="280" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
              <line x1="0" y1="140" x2="200" y2="140" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
            </svg>
          </div>

          {/* Corner label */}
          <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-[#555] font-mono">
            SSR — 2026
          </div>
        </motion.div>

        {/* Right: Editorial content */}
        <div className="space-y-10">
          {/* Name */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 0.9, ease }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[0.92]"
            >
              Shaik<br />
              Saifur<br />
              Rahman
            </motion.h2>
          </div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex flex-col gap-1 text-sm uppercase tracking-[0.15em] text-[#888]"
          >
            <span>AI Engineer</span>
            <span>Researcher</span>
            <span>System Builder</span>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="w-16 h-px bg-white/20 origin-left"
          />

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="space-y-5 max-w-lg"
          >
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light">
              Focused on building intelligent systems that combine research, engineering, and deployment.
            </p>
            <p className="text-base text-[#888] leading-relaxed">
              Currently pursuing B.Tech in Artificial Intelligence &amp; Data Science while developing projects across healthcare, cybersecurity, and AI automation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
