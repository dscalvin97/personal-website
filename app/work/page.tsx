import type { Metadata } from "next";
import { WorkPageClient } from "./work-client";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Calvin Dsouza — work history. Kolors, Snapwork, Fynd, HERE.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}
