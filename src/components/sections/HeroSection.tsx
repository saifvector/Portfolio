'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

export default function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-24 z-10"
    >
      <div className="space-y-12 sm:space-y-16">
        {/* Massive Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-tight text-white uppercase leading-[0.88]"
          >
            <div>SHAIK</div>
            <div>SAIFUR</div>
            <div>RAHMAN</div>
          </motion.h1>
        </div>

        {/* Subheading & Short Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-xl"
        >
          <div className="text-sm sm:text-base font-normal tracking-wide text-[#888888]">
            AI Engineer · Researcher · System Builder
          </div>

          <p className="text-base sm:text-xl text-[#888888] font-normal leading-relaxed">
            Building intelligent systems across healthcare, cybersecurity and automation.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 pt-2"
        >
          <button
            onClick={() => scrollTo('#projects', { offset: -20 })}
            className="text-sm tracking-wider uppercase font-medium text-white hover:text-[#888888] transition-colors focus:outline-none"
          >
            View Work →
          </button>

          <button
            onClick={() => scrollTo('#contact', { offset: -20 })}
            className="text-sm tracking-wider uppercase font-medium text-[#888888] hover:text-white transition-colors focus:outline-none"
          >
            Contact
          </button>
        </motion.div>
      </div>
    </section>
  );
}
