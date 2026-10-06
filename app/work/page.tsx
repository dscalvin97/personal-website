import type { Metadata } from "next";
import { siteMeta, workPage } from "@/lib/content";
import { WorkPageClient } from "./work-client";

export const metadata: Metadata = {
  title: workPage.eyebrow || "Work",
  description: workPage.lede || `Updated ${siteMeta.updatedAt}`,
};

export default function WorkPage() {
  return <WorkPageClient />;
}
