import type { Metadata } from "next";
import { developer } from "@/lib/content";
import { DeveloperPageClient } from "./developer-client";

export const metadata: Metadata = {
  title: "Developer",
  description: developer.metaDescription,
};

export default function DeveloperPage() {
  return <DeveloperPageClient />;
}
