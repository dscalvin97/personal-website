import type { Metadata } from "next";
import { craft } from "@/lib/content";
import { CraftPageClient } from "./craft-client";

export const metadata: Metadata = {
  title: "Craft",
  description: craft.metaDescription,
};

export default function CraftPage() {
  return <CraftPageClient />;
}
