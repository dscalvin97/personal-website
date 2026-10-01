import type { Metadata } from "next";
import Link from "next/link";
import { MaterialSceneClient } from "@/components/material-scene-client";
import {
  IndexItem,
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "3D",
  description:
    "Calvin Dsouza — 3D practice. Blender, Unity, automated pipelines, live WebGL under a frame budget.",
};

export default function StudioPage() {
  return (
    <main id="main">
      <PageHeader
        index="03"
        eyebrow="3D"
        title={
          <>
            Form, light, and{" "}
            <span className="italic text-brass">where it fails</span>.
          </>
        }
        lede="Years of Blender and Unity before the web work — including six-figure AI training image pipelines at Fynd. 3D here is measured, not ornamental."
      />

      <Section label="Material study">
        <div className="border border-line bg-ink-2">
          <MaterialSceneClient />
          <div className="border-t border-line px-4 py-3">
            <p className="meta text-muted">
              Copper loop · brass ring · moss gauge — local lights only, no HDRI
              download · demand-rendered
            </p>
          </div>
        </div>
        <p className="measure mt-6">
          This is not a demo reel. It’s a small object with honest materials.
          If a scene needs a CDN to look finished, it isn’t finished.
        </p>
      </Section>

      <Section label="Practice">
        <SpecList
          items={[
            {
              k: "Professional",
              v: "3D Game Artist at Fynd · Map Modeler at HERE · contract 3D at Powerweave",
            },
            { k: "Tools", v: "Blender, Unity, Substance Painter/Designer, ComfyUI, three.js" },
            {
              k: "Output",
              v: "Training imagery, product visualization POCs, live material studies",
            },
            {
              k: "Rule",
              v: "Cap DPR, pause off-screen, no surprise network assets",
            },
          ]}
        />
      </Section>

      <Section label="Selected threads">
        <div>
          <IndexItem
            n="01"
            title="Automated training imagery"
            meta="Fynd"
            href="https://www.linkedin.com/in/dscalvin"
          >
            Python + Blender + JavaScript pipelines that produced 100,000+
            captioned images for ML models.
          </IndexItem>
          <IndexItem n="02" title="Indoor navigation POC" meta="HERE">
            Unity prototype for office wayfinding, plus Blender training for
            internal cohorts.
          </IndexItem>
          <IndexItem n="03" title="Browser model viewer" meta="Powerweave">
            Sketchfab Viewer API prototype for client product review — 3D that
            lived in a tab, not a download.
          </IndexItem>
        </div>
      </Section>

      <Section label="Further">
        <div className="measure">
          <p>
            Full timeline on the{" "}
            <LinkLine href="/work/">work archive</LinkLine>
            . Fiber side on the{" "}
            <LinkLine href="/craft/">craft page</LinkLine>
            . Home is type-first on purpose — see{" "}
            <Link href="/" className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper">
              the index
            </Link>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
