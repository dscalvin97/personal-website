"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1712_0%,#0f0e0c_70%)]"
      aria-hidden="true"
    />
  ),
});

export function HeroSceneClient() {
  return <HeroScene />;
}
