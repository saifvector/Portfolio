"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneTier } from "@/lib/capability";

interface Props {
  tier: Exclude<SceneTier, "none">;
  /** 0 → 1 scroll progress through the hero, written by GSAP ScrollTrigger. */
  scrollRef: React.RefObject<number>;
}

/**
 * Three interlocking tori: an "instrument" made of dark metal rings with champagne edges.
 * All geometry is procedural (no model files).
 */
export function HeroObject({ tier, scrollRef }: Props) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const entrance = useRef(tier === "static" ? 1 : 0);
  const pointer = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  const { geometries, materials } = useMemo(() => {
    const segments = tier === "high" ? [220, 28] : [120, 16];
    const geos = [
      new THREE.TorusGeometry(1.15, 0.075, segments[1], segments[0]),
      new THREE.TorusGeometry(0.92, 0.06, segments[1], segments[0]),
      new THREE.TorusKnotGeometry(0.52, 0.045, segments[0], segments[1], 2, 3),
    ];
    const metal = new THREE.MeshStandardMaterial({ color: "#1d1d1f", metalness: 0.95, roughness: 0.32 });
    const gold = new THREE.MeshStandardMaterial({
      color: "#c9a66b",
      metalness: 1,
      roughness: 0.22,
      emissive: "#2a2012",
      emissiveIntensity: 0.25,
    });
    return { geometries: geos, materials: [metal, gold, gold] };
  }, [tier]);

  useEffect(
    () => () => {
      geometries.forEach((g) => g.dispose());
      new Set(materials).forEach((m) => m.dispose());
    },
    [geometries, materials],
  );

  useEffect(() => {
    if (tier !== "high") return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tier]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    const animated = tier !== "static";

    if (entrance.current < 1) entrance.current = Math.min(1, entrance.current + dt / 1.8);
    const e = 1 - Math.pow(1 - entrance.current, 4);
    const s = animated ? (scrollRef.current ?? 0) : 0;

    g.scale.setScalar(0.82 + 0.18 * e - 0.12 * s);
    g.position.y = (1 - e) * -0.25 + s * 0.35;

    const [a, b, c] = rings.current;
    if (a && b && c) {
      if (animated) {
        a.rotation.x += dt * 0.12;
        b.rotation.y += dt * 0.09;
        c.rotation.z -= dt * 0.15;
      }
      // Scroll-linked transformation: rings separate and open up as the hero scrolls away.
      a.rotation.y = 0.5 + s * 1.1;
      b.rotation.x = 1.15 - s * 0.9;
      c.position.z = s * 0.4;
    }

    if (tier === "high") {
      g.rotation.y += (pointer.current.x * 0.25 - g.rotation.y) * 0.05;
      g.rotation.x += (pointer.current.y * 0.15 - g.rotation.x) * 0.05;
    }

    if (animated) invalidate();
  });

  return (
    <group ref={group}>
      {geometries.map((geo, i) => (
        <mesh
          key={i}
          ref={(m) => {
            rings.current[i] = m;
          }}
          geometry={geo}
          material={materials[i]}
          rotation={i === 0 ? [0.4, 0.5, 0] : i === 1 ? [1.15, 0, 0.3] : [0.2, 0.3, 0]}
        />
      ))}
    </group>
  );
}
