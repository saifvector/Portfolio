'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
      setTimeout(onLoaded, 500);
    }, 900);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white px-6 select-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-widest text-[#888888] font-mono"
          >
            Shaik Saifur Rahman
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
