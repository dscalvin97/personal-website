import type { Metadata } from "next";
import Link from "next/link";
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
    "Calvin Dsouza — 3D practice. Blender, Unity, automated pipelines.",
};

export default function StudioPage() {
  return (
    <main id="main">
      <PageHeader
        index="03"
        eyebrow="3D"
        title="Form, light, and materials."
        lede="Blender and Unity before the web work. At Fynd I built automated image pipelines that produced 100,000+ captioned training images."
      />

      <Section label="Practice">
        <SpecList
          items={[
            {
              k: "Professional",
              v: "3D Game Artist at Fynd · Map Modeler at HERE · contract 3D at Powerweave",
            },
            {
              k: "Tools",
              v: "Blender, Unity, Substance Painter/Designer, ComfyUI, three.js",
            },
            {
              k: "Output",
              v: "Training imagery, product visualization prototypes, motion studies",
            },
          ]}
        />
      </Section>

      <Section label="Selected work">
        <div>
          <IndexItem
            n="01"
            title="Automated training imagery"
            meta="Fynd"
            href="https://www.linkedin.com/in/dscalvin"
          >
            Python, Blender, and JavaScript pipelines that produced 100,000+
            captioned images for ML models.
          </IndexItem>
          <IndexItem n="02" title="Indoor navigation POC" meta="HERE">
            Unity prototype for office wayfinding, plus Blender training for
            internal teams.
          </IndexItem>
          <IndexItem n="03" title="Browser model viewer" meta="Powerweave">
            Sketchfab Viewer API prototype for client product review.
          </IndexItem>
        </div>
      </Section>

      <Section label="Related">
        <div className="measure">
          <p>
            Timeline on the{" "}
            <LinkLine href="/work/">work page</LinkLine>
            . Fiber work on the{" "}
            <LinkLine href="/craft/">craft page</LinkLine>
            .{" "}
            <Link
              href="/"
              className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
            >
              Home
            </Link>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
