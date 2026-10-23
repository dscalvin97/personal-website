import type { Metadata } from "next";
import { craft } from "@/lib/content";
import { CraftPageClient } from "./craft-client";

export const metadata: Metadata = {
  title: "Crochet",
  description: craft.metaDescription,
  alternates: { canonical: "/craft/" },
};

export default function CraftPage() {
  return <CraftPageClient />;
}
