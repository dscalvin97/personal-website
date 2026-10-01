import type { Metadata } from "next";
import Link from "next/link";
import {
  IndexItem,
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";
import { ResumeDownload } from "@/components/resume-download";

const BLENDKIT = "https://www.blendkit.com/?query=author_id:908";

export const metadata: Metadata = {
  title: "3D",
  description:
    "Calvin Dsouza — 3D artist. Blender work on BlendKit, pipelines at Fynd, Unity at HERE.",
};

export default function StudioPage() {
  return (
    <main id="main">
      <PageHeader
        index="03"
        eyebrow="3D"
        title="Form, light, and materials."
        lede="Blender and Unity before the web work. Portfolio of Blender assets and scenes on BlendKit; pipelines at Fynd that produced 100,000+ captioned training images."
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={BLENDKIT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-copper bg-copper/10 px-4 py-2 font-mono text-[0.72rem] tracking-[0.14em] text-brass uppercase transition-colors hover:bg-copper hover:text-ink"
          >
            BlendKit portfolio
            <span aria-hidden="true">↗</span>
          </a>
          <ResumeDownload label="Resume" />
        </div>
      </PageHeader>

      <Section label="Portfolio">
        <div className="measure">
          <p>
            Live Blender work — models, scenes, and renders — is on{" "}
            <LinkLine href={BLENDKIT} external>
              BlendKit
            </LinkLine>
            .
          </p>
        </div>
        <div className="mt-6">
          <a
            href={BLENDKIT}
            target="_blank"
            rel="noopener noreferrer"
            className="index-row reveal"
          >
            <span className="meta text-copper">01</span>
            <div>
              <h3 className="index-title font-display text-2xl leading-tight text-paper transition-colors sm:text-[1.75rem]">
                BlendKit author page
              </h3>
              <div className="measure mt-2 text-sm leading-relaxed text-muted">
                Browse the full 3D catalog — assets and scenes published under
                this account.
              </div>
            </div>
            <span className="index-meta meta text-muted sm:text-right">
              blendkit.com ↗
            </span>
          </a>
        </div>
      </Section>

      <Section label="Practice">
        <SpecList
          items={[
            {
              k: "Portfolio",
              v: "BlendKit (Blender assets & scenes)",
            },
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
