"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function YarnRing({
  color,
  metalness,
  roughness,
  radius,
  tube,
  speed,
  wireframe = false,
}: {
  color: string;
  metalness: number;
  roughness: number;
  radius: number;
  tube: number;
  speed: number;
  wireframe?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.x += d * speed * 0.35;
    ref.current.rotation.y += d * speed * 0.55;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.35}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 32, 96]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
}

function CrochetChain() {
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 8;
      const r = 0.55 + Math.sin(t * 1.5) * 0.12;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * r,
          Math.sin(t * 0.5) * 0.55,
          Math.sin(t) * r
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 160, 0.04, 8, false]} />
      <meshStandardMaterial color="#e8a87c" metalness={0.15} roughness={0.55} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0f0e0c"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} color="#f2ebe0" />
      <directionalLight position={[-5, 2, -2]} intensity={0.5} color="#6ec8ff" />
      <pointLight position={[0, -1.5, 2.5]} intensity={0.7} color="#ff6b4a" />
      <group position={[0, 0.1, 0]}>
        <YarnRing
          color="#e8a87c"
          metalness={0.2}
          roughness={0.45}
          radius={1.15}
          tube={0.14}
          speed={0.65}
        />
        <YarnRing
          color="#6ec8ff"
          metalness={0.85}
          roughness={0.2}
          radius={0.95}
          tube={0.05}
          speed={1.0}
        />
        <YarnRing
          color="#ff6b4a"
          metalness={0.05}
          roughness={0.7}
          radius={1.35}
          tube={0.035}
          speed={0.4}
          wireframe
        />
        <CrochetChain />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.35, 4.1], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
