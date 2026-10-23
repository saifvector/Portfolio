'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

export default function OpeningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 text-center px-6"
      >
        {/* Main statement */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,9rem)] font-bold tracking-tight leading-[0.9] uppercase text-white"
          >
            <span className="block">FROM RESEARCH</span>
            <span className="block">TO REAL-WORLD</span>
            <span className="block">SYSTEMS.</span>
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-base sm:text-lg text-[#888] max-w-lg mx-auto leading-relaxed font-normal"
        >
          Building intelligent systems across healthcare,
          <br className="hidden sm:block" />
          cybersecurity, and automation.
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo('#manifesto')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-20 text-[10px] uppercase tracking-[0.3em] text-[#555] hover:text-white transition-colors duration-500 focus:outline-none"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            SCROLL
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
}
