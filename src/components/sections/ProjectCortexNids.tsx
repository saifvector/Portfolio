'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectCortexNids() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-15% 0px -15% 0px" });

  // Monochrome, elegant radar visualization. No glowing effects.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const points = [
      { r: 70, theta: 1.2 },
      { r: 120, theta: 2.8 },
      { r: 90, theta: 4.5 },
      { r: 140, theta: 5.6 }
    ];

    const render = () => {
      angle += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Radar Concentric Circles (Crisp, thin monochromatic lines)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';

      [40, 80, 120, 160].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Axis crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 170, cy);
      ctx.lineTo(cx + 170, cy);
      ctx.moveTo(cx, cy - 170);
      ctx.lineTo(cx, cy + 170);
      ctx.stroke();

      // Sweeping Sector Line (Monochrome, subtle fade)
      const sweepX = cx + Math.cos(angle) * 160;
      const sweepY = cy + Math.sin(angle) * 160;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 160, angle - 0.35, angle);
      ctx.lineTo(cx, cy);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();

      // Discrete detected points
      points.forEach((pt) => {
        const px = cx + Math.cos(pt.theta) * pt.r;
        const py = cy + Math.sin(pt.theta) * pt.r;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="projects"
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
              CORTEX NIDS
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              DETECT THREATS <br />
              BEFORE THEY <br />
              BECOME BREACHES
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-lg font-normal pt-2"
            >
              AI-powered Network Intrusion Detection System using machine learning, explainable AI and automated security workflows.
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
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">99.77%</div>
              <div className="text-xs text-[#888888] mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">2.91ms</div>
              <div className="text-xs text-[#888888] mt-1">Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">70+</div>
              <div className="text-xs text-[#888888] mt-1">QA Tests</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Monochrome Radar Visualization */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-square max-w-[400px] flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
