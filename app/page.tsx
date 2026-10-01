import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroSceneClient } from "@/components/hero-scene-client";

const paths = [
  {
    href: "/work/",
    label: "Work",
    line: "Kolors, Snapwork, Fynd — senior fullstack, 3D pipelines, firmware-adjacent product work.",
    accent: "text-amber",
  },
  {
    href: "/developer/",
    label: "Developer",
    line: "How I build: APIs, apps, CMS, and the boring glue that keeps demos from becoming outages.",
    accent: "text-studio",
  },
  {
    href: "/studio/",
    label: "3D",
    line: "Form, light, and materials — Blender years, live WebGL, and craft-meets-geometry thinking.",
    accent: "text-coral",
  },
  {
    href: "/craft/",
    label: "Craft",
    line: "Crochet, hooks, yarn — slow making that feeds the 3D work.",
    accent: "text-yarn",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-14">
        <div className="absolute inset-0">
          <HeroSceneClient />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 sm:pb-20">
          <div className="pointer-events-auto max-w-xl enter">
            <p
              className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
              style={{ "--i": 0 } as CSSProperties}
            >
              Mumbai · fullstack · 3D · craft
            </p>
            <h1
              className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-7xl"
              style={{ "--i": 1 } as CSSProperties}
            >
              Calvin
              <span className="block text-yarn">Dsouza</span>
            </h1>
            <p
              className="mt-6 max-w-md text-base leading-relaxed text-bone/80 sm:text-lg"
              style={{ "--i": 2 } as CSSProperties}
            >
              Senior fullstack developer at Kolors India — web, firmware, and
              home automation. Before that: 3D + fullstack at Fynd, team lead
              work at Snapwork, Unity/Blender at HERE.
            </p>
            <p
              className="mt-4 max-w-md text-sm leading-relaxed text-muted"
              style={{ "--i": 3 } as CSSProperties}
            >
              I build software that has to work on a Tuesday morning, render
              scenes that feel like they have weight, and crochet when I need
              my hands to move slower than my brain.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Areas of focus"
        className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20"
      >
        <div className="flex items-center gap-3">
          <span className="h-3 w-px bg-yarn/70" aria-hidden="true" />
          <h2 className="font-display text-2xl tracking-tight text-bone sm:text-3xl">
            Where to go from here
          </h2>
        </div>
        <div className="stitch-rule mt-4" aria-hidden="true" />
        <ul className="mt-8 divide-y divide-line/80 border-y border-line/80">
          {paths.map((path) => (
            <li key={path.href} className="reveal">
              <Link
                href={path.href}
                className="group flex flex-col gap-2 py-7 transition-colors hover:bg-bone/[0.02] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span
                  className={`font-display text-2xl tracking-tight sm:text-3xl ${path.accent}`}
                >
                  {path.label}
                </span>
                <span className="max-w-md text-sm leading-relaxed text-muted sm:text-right sm:text-base">
                  {path.line}
                  <span className="ml-2 inline-block text-bone/60 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line/80">
        <div className="mx-auto w-full max-w-5xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="prose-page">
              <h2 className="font-display text-2xl tracking-tight text-bone sm:text-3xl">
                Currently
              </h2>
              <p>
                Senior fullstack developer at{" "}
                <a
                  className="text-yarn underline-offset-4 hover:underline"
                  href="https://www.kolorsworld.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kolors India
                </a>{" "}
                — fullstack, firmware, and home automation on connected
                electrical products. Based in Mumbai. Hireable.
              </p>
              <p>
                Full timeline (Fynd, Snapwork, HERE, education) on the{" "}
                <Link className="text-yarn underline-offset-4 hover:underline" href="/work/">
                  work page
                </Link>
                . Code on GitHub, professional thread on LinkedIn, digital
                goods on Gumroad.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                {
                  label: "Work history",
                  href: "/work/",
                  internal: true,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/dscalvin",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/dscalvin97",
                },
                {
                  label: "Gumroad",
                  href: "https://dscalvin.gumroad.com/",
                },
              ].map((link) => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="inline-flex min-w-40 items-center justify-between gap-6 rounded-lg border border-line px-4 py-3 text-sm text-bone transition-colors hover:border-amber/50 hover:bg-bone/5"
                    >
                      {link.label}
                      <span className="text-muted" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-40 items-center justify-between gap-6 rounded-lg border border-line px-4 py-3 text-sm text-bone transition-colors hover:border-yarn/50 hover:bg-bone/5"
                    >
                      {link.label}
                      <span className="text-muted" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
