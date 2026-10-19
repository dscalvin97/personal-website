import type { Metadata } from "next";
import { templates } from "@/lib/content";
import { TemplatesPageClient } from "./templates-client";

export const metadata: Metadata = {
  title: "Templates",
  description: templates.metaDescription,
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
