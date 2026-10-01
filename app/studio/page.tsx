import type { Metadata } from "next";
import Link from "next/link";
import { MetaList, PageHeader, Section } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "3D",
  description:
    "Calvin Dsouza — 3D artist: form, light, materials, live WebGL geometry, and motion thinking.",
};

const practice = [
  { k: "Focus", v: "Form, light, material response" },
  { k: "Tools", v: "three.js, Blender, WebGL" },
  { k: "Output", v: "Stills, motion studies, live scenes" },
  { k: "Interest", v: "Tactile digital objects, not glossy emptiness" },
];

export default function StudioPage() {
  return (
    <main>
      <PageHeader
        eyebrow="02 — 3D"
        title="How a curve sits in space."
        lede="I treat 3D the way I treat crochet: topology, tension, and how light lands on a surface. Sometimes that's a render. Sometimes it's a scene that runs in your browser."
      />

      <Section title="Why 3D">
        <div className="prose-page">
          <p>
            Code is invisible until it fails. 3D is the opposite — every bad
            edge, every flat material, every light that doesn't quite sit is
            right there. That feedback loop is addictive.
          </p>
          <p>
            I'm most interested in objects that feel handled: soft yarn-like
            tubes, rings with weight, scenes that rotate slowly enough that you
            notice the topology instead of the spin.
          </p>
        </div>
      </Section>

      <Section title="Live on this site">
        <div className="prose-page">
          <p>
            The home page hero is not a video. It's three torus rings and a
            crochet-chain tube built with{" "}
            <code className="rounded bg-bone/10 px-1.5 py-0.5 font-mono text-sm text-bone">
              three.js
            </code>{" "}
            and React Three Fiber — mesh geometry, materials, and lights only.
            No remote HDRI downloads, no surprise network lag.
          </p>
          <p>
            That constraint is part of the work: if the scene needs a CDN to
            look good, it isn't finished.
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

      <Section title="Practice">
        <MetaList items={practice} />
      </Section>

      <Section title="What I'm building toward">
        <div className="prose-page">
          <p>
            Short motion pieces with real lighting setups. Product-adjacent
            3D that doesn't look like a default PBR template. Occasional
            experiments where crochet topology and mesh topology rhyme.
          </p>
          <p>
            If you need 3D that feels considered — not stock — talk to me on{" "}
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
