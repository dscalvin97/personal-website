import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Calvin Dsouza — developer, 3D, craft",
    template: "%s · Calvin Dsouza",
  },
  description:
    "Calvin Dsouza builds software, renders in 3D, and makes things with yarn. Based in Mumbai. Open to interesting work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} dark`}
    >
      <body className="min-h-screen bg-ink text-bone">
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
