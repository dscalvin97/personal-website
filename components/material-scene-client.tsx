"use client";

import dynamic from "next/dynamic";

const MaterialScene = dynamic(() => import("@/components/material-scene"), {
  ssr: false,
  loading: () => (
    <div
      className="h-64 w-full bg-[radial-gradient(ellipse_at_center,#1a1714_0%,#12100e_70%)] sm:h-80"
      aria-hidden="true"
    />
  ),
});

export function MaterialSceneClient() {
  return <MaterialScene />;
}
