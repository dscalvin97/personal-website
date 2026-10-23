import type { Metadata } from "next";
import { developer } from "@/lib/content";
import { DeveloperPageClient } from "./developer-client";

export const metadata: Metadata = {
  title: "Software",
  description: developer.metaDescription,
  alternates: { canonical: "/developer/" },
};

export default function DeveloperPage() {
  return <DeveloperPageClient />;
}
