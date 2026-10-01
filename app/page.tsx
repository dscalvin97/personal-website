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
      "Kolors, Snapwork, Fynd, HERE — fullstack, firmware-adjacent product work, and 3D pipelines. Listed like a ledger, not a pitch deck.",
  },
  {
    href: "/developer/",
    n: "02",
    title: "Developer",
    meta: "Practice",
    blurb:
      "How I build: APIs, apps, CMS, performance as a default rather than a phase. Proof lives in the work index.",
  },
  {
    href: "/studio/",
    n: "03",
    title: "3D",
    meta: "Practice",
    blurb:
      "Blender years, automated image pipelines, live WebGL on this site. Form, light, and material under a frame budget.",
  },
  {
    href: "/craft/",
    n: "04",
    title: "Craft",
    meta: "Practice",
    blurb:
      "Crochet — tension, loops, gauge. Same hands that ship firmware also finish a row before dinner.",
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
            I build software that has to work on a Tuesday morning, model
            things until the light sits right, and crochet when my hands need
            a slower problem.
          </p>
          <p
            className="measure mt-4 text-base leading-relaxed text-muted"
            style={{ "--i": 3 } as CSSProperties}
          >
            Senior fullstack developer at Kolors India — web, firmware, home
            automation. Before that: 3D + fullstack at Fynd, delivery lead at
            Snapwork, Blender and Unity at HERE.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase"
            style={{ "--i": 4 } as CSSProperties}
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
              Work index →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 sm:py-16" aria-label="Index">
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
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
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
                . Connected electrical products: the app, the API, and the
                firmware-adjacent bits that make a switch feel inevitable.
              </p>
              <p>
                Based in Mumbai. Open to interesting work. If you want the
                full timeline, the{" "}
                <Link
                  href="/work/"
                  className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
                >
                  work archive
                </Link>{" "}
                is the short version.
              </p>
            </div>
            <aside className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="meta text-copper">Bench notes</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>Static export. No Node in the request path.</li>
                <li>
                  Three.js only where it earns its keep — and only after first
                  paint.
                </li>
                <li>
                  Patterns on Gumroad are written the way I wish code reviews
                  were: short, specific, no theater.
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
