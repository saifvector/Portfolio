'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATEMENTS = [
  "THINK LIKE A RESEARCHER.",
  "BUILD LIKE AN ENGINEER.",
  "SHIP LIKE A STARTUP.",
  "SOLVE REAL PROBLEMS."
];

function ManifestoLine({ text, index, total, scrollYProgress }: {
  text: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const segment = 1 / total;
  const start = index * segment;
  const peakStart = start + segment * 0.2;
  const peakEnd = start + segment * 0.7;
  const end = start + segment;

  const opacity = useTransform(
    scrollYProgress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, peakStart, peakEnd, end],
    [60, 0, 0, -60]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, peakStart, peakEnd, end],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <h2 className="text-[clamp(2rem,7vw,7rem)] font-bold tracking-tight text-white uppercase text-center leading-[0.95] max-w-5xl">
        {text}
      </h2>
    </motion.div>
  );
}

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="manifesto" ref={containerRef} style={{ height: `${STATEMENTS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {STATEMENTS.map((text, idx) => (
          <ManifestoLine
            key={idx}
            text={text}
            index={idx}
            total={STATEMENTS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
