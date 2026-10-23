'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const sentences = [
    "THINK LIKE A RESEARCHER.",
    "BUILD LIKE AN ENGINEER.",
    "SHIP LIKE A STARTUP."
  ];

  return (
    <section
      id="philosophy"
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="space-y-4 sm:space-y-6">
        {sentences.map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{
                duration: 0.85,
                delay: idx * 0.18,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.95]"
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>
    </section>
  );
}
