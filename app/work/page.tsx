import type { Metadata } from "next";
import { workPage } from "@/lib/content";
import { WorkPageClient } from "./work-client";

export const metadata: Metadata = {
  title: "Work",
  description: "Calvin Dsouza — work history. Kolors, Snapwork, Fynd, HERE.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}

// keep tree-shaking happy if workPage is only used in client
void workPage;
