'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  "Research",
  "Design",
  "Model Development",
  "Validation",
  "Deployment",
  "Iteration",
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="process"
      ref={ref}
      className="flex items-center px-6 sm:px-12 md:px-20 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Label + Headline */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, ease }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#555] font-mono"
          >
            THE PROCESS
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[0.92]"
            >
              HOW IDEAS<br />
              BECOME<br />
              SYSTEMS.
            </motion.h2>
          </div>
        </div>

        {/* Right: Animated vertical flow */}
        <div className="flex flex-col items-start">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease }}
                className="flex items-baseline gap-6 py-5"
              >
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#444] w-8">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {step}
                </span>
              </motion.div>

              {/* Connector line between steps */}
              {idx < STEPS.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.15, ease }}
                  className="ml-[14px] w-px h-6 bg-white/15 origin-top"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
