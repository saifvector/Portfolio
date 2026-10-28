"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { SceneTier } from "@/lib/capability";
import { HeroObject } from "./HeroObject";

export default function HeroScene({
  tier,
  active,
  scrollRef,
  onReady,
}: {
  tier: Exclude<SceneTier, "none">;
  active: boolean;
  scrollRef: React.RefObject<number>;
  onReady: () => void;
}) {
  const dpr: [number, number] = tier === "high" ? [1, 1.75] : [1, 1.25];
  return (
    <Canvas
      aria-hidden="true"
      tabIndex={-1}
      dpr={dpr}
      frameloop={active && tier !== "static" ? "always" : "demand"}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 35 }}
      onCreated={() => onReady()}
      style={{ pointerEvents: "none", touchAction: "auto" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#f5e6c8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#c9a66b" />
      <Environment resolution={tier === "high" ? 128 : 64}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 1, 1]} color="#f5e6c8" />
        <Lightformer intensity={1.2} position={[-3, -1, 1]} scale={[1, 4, 1]} color="#c9a66b" />
        <Lightformer intensity={0.6} position={[3, 0, -2]} scale={[2, 2, 1]} color="#ffffff" />
      </Environment>
      <HeroObject tier={tier} scrollRef={scrollRef} />
    </Canvas>
  );
}
