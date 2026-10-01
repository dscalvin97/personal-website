import type { Metadata } from "next";
import Link from "next/link";
import { MetaList, PageHeader, Section } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "3D",
  description:
    "Calvin Dsouza — 3D artist: Blender, Unity, live WebGL, AI image pipelines. Form, light, materials.",
};

const practice = [
  { k: "Tools", v: "Blender, Unity, Substance, three.js, ComfyUI" },
  {
    k: "Professional",
    v: "3D Game Artist at Fynd; Map Modeler at HERE; contract 3D at Powerweave",
  },
  { k: "Output", v: "Stills, motion studies, live scenes, training imagery" },
  {
    k: "Interest",
    v: "Tactile digital objects — topology you can feel, not glossy emptiness",
  },
];

export default function StudioPage() {
  return (
    <main>
      <PageHeader
        eyebrow="03 — 3D"
        title="How a curve sits in space."
        lede="Years of Blender and Unity before the web work — including 100K+ AI training images built from 3D pipelines at Fynd. I treat 3D like crochet: topology, tension, and where light actually lands."
      />

      <Section title="Why 3D" accent="coral">
        <div className="prose-page">
          <p>
            Code is invisible until it fails. 3D is the opposite — every bad
            edge, every flat material, every light that doesn't quite sit is
            right there. That feedback loop is addictive, and it made me a
            better fullstack engineer.
          </p>
          <p>
            At HERE I trained teams in Blender. At Fynd I ran automated image
            pipelines. On this site, the hero is live geometry — not a video.
          </p>
        </div>
      </Section>

      <Section title="Live on this site" accent="coral">
        <div className="prose-page">
          <p>
            The home hero is three.js + React Three Fiber — mesh geometry,
            materials, and lights only. No remote HDRI downloads, no surprise
            network lag. If a scene needs a CDN to look good, it isn't finished.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-coral/50 hover:bg-bone/5"
          >
            Back to the hero scene
            <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </Section>

      <Section title="Practice" accent="coral">
        <MetaList items={practice} />
      </Section>

      <Section title="What I'm building toward" accent="coral">
        <div className="prose-page">
          <p>
            Short motion pieces with real lighting setups. Product-adjacent 3D
            that doesn't look like a default PBR template. Occasional
            experiments where crochet topology and mesh topology rhyme.
          </p>
          <p>
            Timeline and roles:{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="/work/"
            >
              work page
            </a>
            . Contact:{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="https://www.linkedin.com/in/dscalvin"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
