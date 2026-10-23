'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectBrainTumor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      id="brain-tumor"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Minimal MRI Segmentation Illustration (Alternating layout) */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-square max-w-[400px] flex items-center justify-center p-6 border border-white/10"
          >
            <svg
              className="w-full h-full max-w-[320px] opacity-80"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Monochromatic Brain Skull & Parenchyma Boundary */}
              <ellipse cx="150" cy="150" rx="115" ry="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <ellipse cx="150" cy="150" rx="100" ry="88" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Anatomical sulci lines */}
              <path d="M 150,70 L 150,230" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <path d="M 135,120 Q 125,150 135,180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <path d="M 165,120 Q 175,150 165,180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Minimalist Segmentation Boundary (Thin, white, non-glowing) */}
              <path
                d="M 175,125 Q 200,118 210,138 Q 215,160 195,165 Q 180,165 172,148 Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="rgba(255,255,255,0.06)"
              />
              <circle cx="192" cy="144" r="2" fill="#ffffff" />
            </svg>
          </motion.div>
        </div>

        {/* Right Column: Text & Metrics */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-widest text-[#888888]"
            >
              BRAIN TUMOR DETECTION
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              SEE WHAT <br />
              THE HUMAN EYE <br />
              CAN MISS
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-lg font-normal pt-2"
            >
              Deep-learning MRI segmentation platform using U-Net architectures for precise tumor localization.
            </motion.p>
          </div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">88.39%</div>
              <div className="text-xs text-[#888888] mt-1">Dice Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">99.55%</div>
              <div className="text-xs text-[#888888] mt-1">Specificity</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">3,929</div>
              <div className="text-xs text-[#888888] mt-1">MRI Scans</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
