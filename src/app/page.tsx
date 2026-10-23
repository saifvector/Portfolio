'use client';

import React, { useState } from 'react';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import BackgroundCanvas from '../components/canvas/BackgroundCanvas';
import CustomCursor from '../components/ui/CustomCursor';
import Preloader from '../components/ui/Preloader';
import Navbar from '../components/ui/Navbar';
import ScrollProgress from '../components/ui/ScrollProgress';

// Sections
import OpeningSection from '../components/sections/OpeningSection';
import ManifestoSection from '../components/sections/ManifestoSection';
import IdentitySection from '../components/sections/IdentitySection';
import TimelineJourneySection from '../components/sections/TimelineJourneySection';
import ProjectShowcase from '../components/sections/ProjectShowcase';
import ProcessSection from '../components/sections/ProcessSection';
import TechStackSection from '../components/sections/TechStackSection';
import PrinciplesSection from '../components/sections/PrinciplesSection';
import CredentialsSection from '../components/sections/CredentialsSection';
import FinalSection from '../components/sections/FinalSection';
import Footer from '../components/sections/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* Preloader */}
      <Preloader onLoaded={() => setIsLoaded(true)} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ambient Particle Field */}
      <BackgroundCanvas />

      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Main Experience */}
      <div className="relative min-h-screen">
        <Navbar />

        <main id="hero" className="relative z-10">
          {/* 01 — THE OPENING */}
          <OpeningSection />

          {/* 02 — THE MANIFESTO */}
          <ManifestoSection />

          {/* 03 — IDENTITY */}
          <IdentitySection />

          {/* 04 — TIMELINE JOURNEY */}
          <TimelineJourneySection />

          {/* 05 — PROJECT SHOWCASE */}
          <ProjectShowcase />

          {/* 06 — THE PROCESS */}
          <ProcessSection />

          {/* 07 — TECHNICAL STACK */}
          <TechStackSection />

          {/* 08 — PRINCIPLES */}
          <PrinciplesSection />

          {/* 09 — CREDENTIALS */}
          <CredentialsSection />

          {/* 10 — FINAL SECTION */}
          <FinalSection />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
