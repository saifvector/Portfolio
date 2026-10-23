'use client';

import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#stack' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 50);

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 md:px-20 py-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${hasScrolled ? 'bg-[#050505]/80 backdrop-blur-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => scrollTo('#hero')}
          className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#888] hover:text-white transition-colors duration-300 focus:outline-none"
        >
          SSR
        </button>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href, { offset: -30 })}
              className="text-[10px] tracking-[0.2em] uppercase text-[#555] hover:text-white transition-colors duration-300 focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
