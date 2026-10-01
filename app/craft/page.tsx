import type { Metadata } from "next";
import { MetaList, PageHeader, Section } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "Calvin Dsouza — crochet and other handmade work. Hooks, yarn, and slow making.",
};

const practice = [
  { k: "Primary", v: "Crochet" },
  { k: "Also", v: "Whatever keeps my hands busy" },
  { k: "Rhythm", v: "Slow on purpose" },
  { k: "Shop", v: "dscalvin.gumroad.com" },
];

export default function CraftPage() {
  return (
    <main>
      <PageHeader
        eyebrow="03 — Craft"
        title="Hooks, yarn, and slow hands."
        lede="Crochet is where I remember that not everything needs to ship. Same curiosity as the 3D work — how a curve pulls, where tension lives — but the render is wool and time."
      />

      <Section title="Why craft">
        <div className="prose-page">
          <p>
            Screen work rewards speed. Craft punishes it. Sitting with a hook
            and a skein is how I reset the part of my brain that wants every
            problem to be a deploy.
          </p>
          <p>
            There's also a technical overlap I can't ignore: stitch patterns are
            algorithms, increases are topology, and a bad join looks exactly
            like a bad mesh edge. The 3D work got sharper after I started
            crocheting.
          </p>
        </div>
      </Section>

      <Section title="What shows up here">
        <div className="prose-page">
          <p>
            Pieces that are finished enough to share, experiments that taught me
            something, and the occasional object that started as a 3D idea and
            ended up as yarn.
          </p>
          <p>
            Digital goods and process notes live on{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="https://dscalvin.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gumroad
            </a>
            . If you want to talk patterns, materials, or a commission — find me
            on{" "}
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

      <Section title="Practice">
        <MetaList items={practice} />
      </Section>

      <Section title="Related">
        <div className="prose-page">
          <p>
            The crochet-chain tube on the home page is this practice rendered as
            mesh — a love letter in{" "}
            <code className="rounded bg-bone/10 px-1.5 py-0.5 font-mono text-sm text-bone">
              TubeGeometry
            </code>
            . See the{" "}
            <a
              className="text-coral underline-offset-4 hover:underline"
              href="/studio"
            >
              3D page
            </a>{" "}
            for how that thinking shows up in the browser.
          </p>
        </div>
      </Section>
    </main>
  );
}
