import type { Metadata } from "next";
import { studio } from "@/lib/content";
import { StudioPageClient } from "./studio-client";

export const metadata: Metadata = {
  title: "3D",
  description: studio.metaDescription,
};

export default function StudioPage() {
  return <StudioPageClient />;
}
