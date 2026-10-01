import type { Metadata } from "next";
import { Instrument_Serif, Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Calvin Dsouza",
    template: "%s · Calvin Dsouza",
  },
  description:
    "Calvin Dsouza — fullstack developer, 3D artist, crocheter. Mumbai. Software, firmware-adjacent product work, and things made by hand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${schibsted.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-ink text-paper">
        <Analytics />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-copper focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
