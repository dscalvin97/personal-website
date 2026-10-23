import type { Metadata } from "next";
import { studio } from "@/lib/content";
import { StudioPageClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Studio",
  description: studio.metaDescription,
  alternates: { canonical: "/studio/" },
};

export default function StudioPage() {
  return <StudioPageClient />;
}
