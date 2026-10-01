import type { CSSProperties } from "react";
import Link from "next/link";
import { IndexItem } from "@/components/page-parts";

const index = [
  {
    href: "/work/",
    n: "01",
    title: "Work",
    meta: "Archive",
    blurb:
      "Kolors, Snapwork, Fynd, HERE — fullstack, firmware-adjacent product work, and 3D pipelines.",
  },
  {
    href: "/developer/",
    n: "02",
    title: "Developer",
    meta: "Practice",
    blurb: "APIs, apps, CMS, and the infrastructure underneath.",
  },
  {
    href: "/studio/",
    n: "03",
    title: "3D",
    meta: "Practice",
    blurb: "Blender, Unity, automated image pipelines.",
  },
  {
    href: "/craft/",
    n: "04",
    title: "Craft",
    meta: "Practice",
    blurb: "Crochet — tension, loops, gauge, finished objects.",
  },
] as const;

export default function HomePage() {
  return (
    <main id="main">
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20">
        <div className="mx-auto w-full max-w-4xl px-5 enter">
          <p
            className="meta text-copper"
            style={{ "--i": 0 } as CSSProperties}
          >
            Mumbai · fullstack · 3D · fiber
          </p>
          <h1
            className="mt-5 font-display text-[clamp(3rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-paper"
            style={{ "--i": 1 } as CSSProperties}
          >
            Calvin
            <span className="block italic text-brass">Dsouza</span>
          </h1>
          <p
            className="measure mt-8 text-lg leading-relaxed text-paper/85 sm:text-xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            Senior fullstack developer at Kolors India. Before that: 3D and
            fullstack at Fynd, delivery lead at Snapwork, Blender and Unity at
            HERE. I also crochet.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase"
            style={{ "--i": 3 } as CSSProperties}
          >
            <a
              href="https://www.linkedin.com/in/dscalvin"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brass"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/dscalvin97"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brass"
            >
              GitHub
            </a>
            <a
              href="https://dscalvin.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brass"
            >
              Gumroad
            </a>
            <Link href="/work/" className="transition-colors hover:text-brass">
              Work →
            </Link>
            <a
              href="/calvin-dsouza-resume.pdf"
              download="Calvin-Dsouza-Resume.pdf"
              className="transition-colors hover:text-brass"
            >
              Resume ↓
            </a>
          </div>
        </div>
      </section>

      <section
        className="border-t border-line py-12 sm:py-16"
        aria-label="Index"
      >
        <div className="mx-auto w-full max-w-4xl px-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="meta text-brass">Index</h2>
            <div className="tick-rule flex-1" aria-hidden="true" />
          </div>
          <div className="mt-6">
            {index.map((item) => (
              <IndexItem
                key={item.href}
                n={item.n}
                title={item.title}
                meta={item.meta}
                href={item.href}
              >
                {item.blurb}
              </IndexItem>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-5">
          <div className="measure">
            <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
              Currently
            </h2>
            <p className="mt-5">
              Senior fullstack developer at{" "}
              <a
                href="https://www.kolorsworld.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
              >
                Kolors India
              </a>
              . Web products, firmware-adjacent work, and home automation.
            </p>
            <p>
              Based in Mumbai. Open to interesting work. Full timeline on the{" "}
              <Link
                href="/work/"
                className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
              >
                work page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
