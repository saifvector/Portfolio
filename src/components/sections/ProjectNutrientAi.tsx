'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectNutrientAi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      id="nutrient-ai"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Text & Metrics */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-widest text-[#888888]"
            >
              NUTRIENT DEFICIENCY AI
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              PREDICT DEFICIENCIES <br />
              BEFORE SYMPTOMS <br />
              APPEAR
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-lg font-normal pt-2"
            >
              Explainable AI platform predicting 11 nutritional deficiencies with SHAP-based reasoning.
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
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">11</div>
              <div className="text-xs text-[#888888] mt-1">Nutrients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">45ms</div>
              <div className="text-xs text-[#888888] mt-1">Inference</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-medium text-white tracking-tight mt-1">Clinical</div>
              <div className="text-xs text-[#888888]">Explainability</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Minimal Elegant Prediction Curve Visual */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-square max-w-[400px] flex items-center justify-center p-8 border border-white/10"
          >
            <svg
              className="w-full h-full max-w-[320px] overflow-visible"
              viewBox="0 0 300 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Minimal Grid Baselines */}
              <line x1="20" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.06)" />
              <line x1="20" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.12)" />
              <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(255,255,255,0.06)" />

              {/* Elegant Sigmoidal / Logistic Prediction Curve */}
              <path
                d="M 20,160 C 90,160 130,130 150,100 C 170,70 210,40 280,40"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Threshold point */}
              <circle cx="150" cy="100" r="3" fill="#ffffff" />
              <line x1="150" y1="100" x2="150" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
