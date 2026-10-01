"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CopperLoop() {
  const group = useRef<THREE.Group>(null);
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i++) {
      const t = (i / 160) * Math.PI * 6;
      const r = 0.85 + Math.sin(t * 1.2) * 0.08;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * r,
          Math.sin(t * 0.45) * 0.35,
          Math.sin(t) * r
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[curve, 200, 0.055, 10, false]} />
        <meshStandardMaterial color="#b45f3c" metalness={0.75} roughness={0.35} />
      </mesh>
      <mesh scale={0.92}>
        <torusGeometry args={[1.05, 0.025, 16, 100]} />
        <meshStandardMaterial color="#c4a35a" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.02, 12, 64]} />
        <meshStandardMaterial color="#5a6b4a" metalness={0.4} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#12100e"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color="#f3efe7" />
      <directionalLight position={[-3, 1, -2]} intensity={0.7} color="#b45f3c" />
      <pointLight position={[0, -1, 2]} intensity={0.5} color="#c4a35a" />
      <CopperLoop />
    </>
  );
}

export default function MaterialScene() {
  return (
    <div className="relative h-64 w-full sm:h-80" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 40 }}
        dpr={[1, 1.4]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        frameloop="demand"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
