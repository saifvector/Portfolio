'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="contact"
      ref={ref}
      className="flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 py-20 sm:py-28 text-center"
    >
      {/* Massive statement */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: '0%' } : { y: '100%' }}
          transition={{ duration: 1, ease }}
          className="text-[clamp(2.2rem,7vw,8rem)] font-bold tracking-tight text-white uppercase leading-[0.92]"
        >
          <span className="block">BUILDING</span>
          <span className="block">INTELLIGENT</span>
          <span className="block">SYSTEMS FOR</span>
          <span className="block">THE REAL WORLD.</span>
        </motion.h2>
      </div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className="mt-12 text-base sm:text-lg text-[#888] max-w-md leading-relaxed"
      >
        Open to collaborations,<br />
        research opportunities,<br />
        and ambitious engineering challenges.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="w-12 h-px bg-white/20 mt-12"
      />

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="mt-10 flex items-center gap-10 sm:gap-14"
      >
        <a
          href="https://github.com/shaiksaifurrahman"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors duration-300"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/shaiksaifurrahman"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors duration-300"
        >
          LinkedIn
        </a>
        <a
          href="mailto:saifur.rahman.ai@gmail.com"
          className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors duration-300"
        >
          Email
        </a>
      </motion.div>
    </section>
  );
}
