"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface TunnelItem {
  title: string;
  tag?: string;
  src: string;
  href?: string;
}

const DEFAULT_PROJECT_ITEMS: TunnelItem[] = [
  {
    title: "Cortex NIDS",
    tag: "Security AI // 99.77% Acc",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900&auto=format&fit=crop",
    href: "#cortex-nids",
  },
  {
    title: "Brain Tumor AI",
    tag: "Clinical MRI // U-Net",
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=900&auto=format&fit=crop",
    href: "#brain-tumor",
  },
  {
    title: "Nutrient Deficiency AI",
    tag: "Healthcare // SHAP",
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop",
    href: "#nutrient-ai",
  },
  {
    title: "Aura Voice System",
    tag: "Edge AI // Local LLM",
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop",
    href: "#aura",
  },
  {
    title: "Deepfake Reality Checker",
    tag: "Vision // Forensics",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
  {
    title: "CSIFormer RF Sensing",
    tag: "Transformer // WiFi CSI",
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
  {
    title: "Autonomous Agents",
    tag: "Multi-Agent // Reasoning",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
  {
    title: "AI Job Copilot",
    tag: "Automation Engine",
    src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
  {
    title: "PharmaScan",
    tag: "Comparative Intelligence",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=900&auto=format&fit=crop",
    href: "#projects",
  },
];

interface TunnelCardData {
  item: TunnelItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    if (card.item.href?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(card.item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const Tag = (card.item.href ? "a" : "div") as "a";

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <Tag
        href={card.item.href}
        onClick={handleClick}
        className="group relative block h-full w-full overflow-hidden rounded-2xl bg-[#111] shadow-2xl shadow-black/90 ring-1 ring-white/10 transition-all duration-500 hover:ring-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
      >
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5">
          {card.item.tag && (
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#888] mb-1">
              {card.item.tag}
            </span>
          )}
          <span className="text-xs sm:text-sm font-semibold tracking-tight uppercase text-white/95 drop-shadow-md">
            {card.item.title}
          </span>
        </div>
      </Tag>
    </motion.div>
  );
}

export interface PerspectiveTunnelHeroProps {
  items?: TunnelItem[];
  badge?: string;
  headline?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function PerspectiveTunnelHero({
  items = DEFAULT_PROJECT_ITEMS,
  badge = "Warp Drive // Spatial Archive",
  headline = (
    <>
      INTO THE
      <br />
      ETHER.
    </>
  ),
  subtitle = "Scroll trackpad or drag to travel through the 3D research tunnel.",
  className,
}: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setStage({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
          isMobile: containerRef.current.clientWidth < 768,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cards = useMemo<TunnelCardData[]>(() => {
    return items.map((item, i) => {
      const goldenAngle = i * 137.5 * (Math.PI / 180);
      const radiusFactorX = 0.28 + (i % 3) * 0.08;
      const radiusFactorY = 0.26 + (i % 2) * 0.09;

      return {
        item,
        angleCos: Math.cos(goldenAngle),
        angleSin: Math.sin(goldenAngle),
        radiusFactorX,
        radiusFactorY,
        rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
        index: i,
      };
    });
  }, [items]);

  // Raw motion value controlled directly by mouse wheel / touch trackpad
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // Handle wheel scrolling locally inside the viewport container without page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = rawProgress.get();
      const delta = e.deltaY * 0.0008; // Speed of tunnel travel
      const next = Math.min(1, Math.max(0, current + delta));
      rawProgress.set(next);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  const pointer = useCameraParallax(!reduce);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className={cn(
        "relative h-[70vh] min-h-[480px] max-h-[720px] w-full overflow-hidden bg-[#050505] text-white select-none flex items-center justify-center rounded-3xl border border-white/5",
        className
      )}
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Immersive Background Grid & Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_75%)]" />

      {/* Depth Ring Guides */}
      <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-white/5" />

      {/* Central Anchor Typography */}
      <motion.div
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#888] mb-4">
          {badge}
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white uppercase">
          {headline}
        </h2>
        <p className="mt-4 max-w-[36ch] text-xs sm:text-sm font-light text-[#888] leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        style={{ opacity: promptOpacity }}
        className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#666]"
      >
        <span>Scroll / Wheel to Travel</span>
        <div className="h-6 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>

      {/* 3D Z-Space Plane */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {cards.map((card, i) => (
          <TunnelCard
            key={i}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={cards.length}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}

export default PerspectiveTunnelHero;
