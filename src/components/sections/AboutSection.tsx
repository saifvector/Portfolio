'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="space-y-16 sm:space-y-20">
        {/* Storytelling Headline */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[0.95]"
          >
            I DON&apos;T CHASE TRENDS.
          </motion.h2>
        </div>

        {/* Storytelling Body */}
        <div className="space-y-8 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed"
          >
            I focus on building systems that solve measurable problems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl font-light text-[#888888] leading-relaxed"
          >
            From medical image segmentation to network intrusion detection and explainable healthcare AI, my work sits at the intersection of research, engineering and deployment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl font-normal text-[#888888] leading-relaxed pt-4 border-t border-white/10"
          >
            Currently pursuing B.Tech in Artificial Intelligence &amp; Data Science while building production-ready AI systems.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
