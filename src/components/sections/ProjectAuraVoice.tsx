'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectAuraVoice() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-15% 0px -15% 0px" });

  // Very subtle audio waveform animation. Monochrome.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 2 delicate monochromatic harmonic lines
      const lines = [
        { amp: 20, freq: 0.02, speed: t, alpha: 0.7, width: 1.5 },
        { amp: 12, freq: 0.028, speed: t * 1.3, alpha: 0.25, width: 1 }
      ];

      lines.forEach((l) => {
        ctx.beginPath();
        ctx.lineWidth = l.width;
        ctx.strokeStyle = `rgba(255, 255, 255, ${l.alpha})`;

        for (let x = 0; x < w; x++) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = cy + Math.sin(x * l.freq + l.speed) * l.amp * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="aura"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Very subtle audio waveform animation (Alternating layout) */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-square max-w-[400px] flex items-center justify-center p-8 border border-white/10"
          >
            <canvas
              ref={canvasRef}
              width={340}
              height={140}
              className="w-full h-auto"
            />
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
              AURA
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              WHERE VISION <br />
              MEETS VOICE
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-lg font-normal pt-2"
            >
              Privacy-first voice assistant capable of local automation and intelligent system control.
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
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">100%</div>
              <div className="text-xs text-[#888888] mt-1">Local Processing</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-medium text-white tracking-tight mt-1">Voice</div>
              <div className="text-xs text-[#888888]">Commands</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-medium text-white tracking-tight mt-1">System</div>
              <div className="text-xs text-[#888888]">Automation</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
