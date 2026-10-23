'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PRINCIPLES = [
  { number: '01', text: 'BUILD FOR IMPACT.' },
  { number: '02', text: 'MEASURE EVERYTHING.' },
  { number: '03', text: 'RESEARCH IS ONLY THE BEGINNING.' },
  { number: '04', text: 'DEPLOYMENT CREATES VALUE.' },
];

function PrincipleSlide({ principle, index, total, scrollYProgress }: {
  principle: { number: string; text: string };
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const segment = 1 / total;
  const start = index * segment;
  const fadeIn = start + segment * 0.15;
  const hold = start + segment * 0.7;
  const fadeOut = start + segment;

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, hold, fadeOut],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, hold, fadeOut],
    [50, 0, 0, -50]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="text-[10px] font-mono tracking-[0.3em] text-[#444] mb-8">
        {principle.number}
      </div>
      <h2 className="text-[clamp(1.8rem,6vw,6rem)] font-bold tracking-tight text-white uppercase leading-[0.95] max-w-5xl">
        {principle.text}
      </h2>
    </motion.div>
  );
}

export default function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="principles"
      ref={containerRef}
      style={{ height: `${PRINCIPLES.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {PRINCIPLES.map((p, idx) => (
          <PrincipleSlide
            key={p.number}
            principle={p}
            index={idx}
            total={PRINCIPLES.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
