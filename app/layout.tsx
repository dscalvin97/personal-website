import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SiteLoader } from "@/components/site-loader";
import { ReactiveField } from "@/components/reactive-field";
import { home, profile, shared } from "@/lib/content";

// Instrument Serif dropped: the locked colophon names only mono + sans
// (Leo's ruling, carried as risk 2 in discussions/2026-10-23-redesign-intent.md).
const schibsted = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calvin.makes.fyi"),
  title: {
    default: shared.brandName,
    template: `%s · ${shared.brandName}`,
  },
  description: profile.summary || profile.headline || home.lede,
};

// Pre-paint: apply the saved reactive-field preference before first paint
// so off-switchers never see a flash of dots (inline script, no hydration).
const fieldBootScript = `try{if(localStorage.getItem("cf-field")==="0")document.documentElement.classList.add("no-field")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-term text-wht">
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: fieldBootScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brass focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteLoader />
        <ReactiveField />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
