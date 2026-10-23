'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OWNER_INFO } from '../../data/portfolioData';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    const resumeText = `SHAIK SAIFUR RAHMAN
AI Engineer · Data Scientist · Intelligent Systems Developer
Email: ${OWNER_INFO.socials.email}
GitHub: ${OWNER_INFO.socials.github}
LinkedIn: ${OWNER_INFO.socials.linkedin}

EDUCATION
B.Tech in Artificial Intelligence & Data Science
QIS College of Engineering and Technology, Andhra Pradesh, India

CORE RESEARCH & SYSTEMS
1. CORTEX NIDS (AI-Powered Network Defense)
   - 99.77% Detection Accuracy, 0.000016 False Positive Rate, 2.91ms Latency
   - Explainable AI with SHAP Attribution, SIEM/SOAR Automation

2. Brain Tumor Detection System
   - Deep learning MRI segmentation with U-Net architecture and PyTorch
   - 88.39% Dice Score, 99.55% Clinical Specificity on 3,929 MRI images

3. Nutrient Deficiency AI Platform
   - Multi-output XGBoost ensemble predicting 11 biochemical panels
   - Sub-45ms inference latency with FastAPI and PostgreSQL

4. Aura Voice Assistant
   - Privacy-preserving on-device speech recognition and OS automation

TECHNICAL PROFICIENCIES
Python, PyTorch, C, C++, Java, SQL, Scikit-Learn, XGBoost, OpenCV, SHAP,
FastAPI, PostgreSQL, Docker, Linux.`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Shaik_Saifur_Rahman_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto py-32"
    >
      <div className="space-y-16 sm:space-y-24">
        {/* Massive Typography Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.95]">
            LET&apos;S BUILD <br />
            SOMETHING <br />
            MEANINGFUL.
          </h2>
        </motion.div>

        {/* Minimal Two-Column Layout: Direct Links & Minimal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-8 border-t border-white/10">
          {/* Direct Editorial Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6 text-base sm:text-lg">
              <div>
                <span className="text-xs font-normal text-[#888888] block uppercase tracking-wider mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${OWNER_INFO.socials.email}`}
                  className="text-white hover:text-[#888888] transition-colors font-normal tracking-tight"
                >
                  {OWNER_INFO.socials.email}
                </a>
              </div>

              <div>
                <span className="text-xs font-normal text-[#888888] block uppercase tracking-wider mb-1">
                  LinkedIn
                </span>
                <a
                  href={OWNER_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#888888] transition-colors font-normal tracking-tight"
                >
                  linkedin.com/in/shaiksaifurrahman
                </a>
              </div>

              <div>
                <span className="text-xs font-normal text-[#888888] block uppercase tracking-wider mb-1">
                  GitHub
                </span>
                <a
                  href={OWNER_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#888888] transition-colors font-normal tracking-tight"
                >
                  github.com/shaiksaifurrahman
                </a>
              </div>

              <div className="pt-2">
                <span className="text-xs font-normal text-[#888888] block uppercase tracking-wider mb-1">
                  Curriculum Vitae
                </span>
                <button
                  onClick={handleDownloadResume}
                  className="text-white hover:text-[#888888] transition-colors font-normal tracking-tight underline underline-offset-4 focus:outline-none"
                >
                  Download CV (.txt)
                </button>
              </div>
            </div>
          </div>

          {/* Minimal Form (Pure, clean underline inputs) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="py-12 space-y-3">
                <h4 className="text-2xl font-medium text-white tracking-tight">
                  Message Transmitted.
                </h4>
                <p className="text-sm text-[#888888]">
                  Thank you for reaching out. I will respond to your inquiry promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <label className="block text-xs text-[#888888] uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white placeholder:text-[#555555] focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-[#888888] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white placeholder:text-[#555555] focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-[#888888] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or inquiry"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-base text-white placeholder:text-[#555555] focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm tracking-tight hover:bg-white/90 transition-all focus:outline-none disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
