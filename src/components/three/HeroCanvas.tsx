"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { detectSceneTier, type SceneTier } from "@/lib/capability";
import { cn } from "@/lib/utils";
import { HeroFallback } from "./HeroFallback";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Hero object wrapper: poster first, then the WebGL scene once idle, if the device supports it. */
export function HeroCanvas({ className }: { className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [tier, setTier] = useState<SceneTier | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = () => setTier(detectSceneTier());
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1500 });
    else setTimeout(start, 200);
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!tier || tier === "none" || tier === "static") return;
    const el = wrapper.current;
    if (!el) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: el.closest("section") ?? el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });
      kill = () => st.kill();
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, [tier]);

  const showScene = tier && tier !== "none" && !failed;

  return (
    <div ref={wrapper} className={cn("relative", className)} aria-hidden="true">
      <HeroFallback
        className={cn(
          "absolute inset-0 m-auto size-full max-h-full max-w-full transition-opacity duration-700",
          ready && showScene ? "opacity-0" : "opacity-100",
        )}
      />
      {showScene && (
        <SceneBoundary onError={() => setFailed(true)}>
          <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
            <HeroScene tier={tier} active={visible} scrollRef={scrollRef} onReady={() => setReady(true)} />
          </div>
        </SceneBoundary>
      )}
    </div>
  );
}
