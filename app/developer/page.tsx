import type { Metadata } from "next";
import {
  IndexItem,
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Developer",
  description:
    "How Calvin Dsouza builds software — fullstack, performance-first, no theater.",
};

const cases = [
  {
    n: "01",
    title: "100,000+ training images",
    meta: "Fynd · Python · Blender",
    body: "Automated image pipelines that turned 3D scenes into captioned datasets for ML models. Blender in the loop, JavaScript on the edges, Python holding it together.",
  },
  {
    n: "02",
    title: "Eight products, one engineer",
    meta: "Fynd · Next.js · Node",
    body: "Fullstack features across Pixelbin, Erase.bg, Upscale.media and friends — frontend and backend owned end to end, without a committee.",
  },
  {
    n: "03",
    title: "Localization without a dev ticket",
    meta: "Fynd · Strapi",
    body: "Custom CMS for 20+ languages with live shared UI updates. Content teams ship copy; engineers stop being the bottleneck.",
  },
  {
    n: "04",
    title: "GCash delivery",
    meta: "Snapwork · Team lead",
    body: "Led two developers on client-facing fullstack work. Reusable components and API patterns that cut delivery cycles roughly tenfold.",
  },
] as const;

export default function DeveloperPage() {
  return (
    <main id="main">
      <PageHeader
        index="02"
        eyebrow="Developer"
        title={
          <>
            Software that behaves on a{" "}
            <span className="italic text-brass">Tuesday</span>.
          </>
        }
        lede="I build fullstack product work with a bias toward clarity: readable defaults, honest performance, and deployments that don’t need a prayer."
      />

      <Section label="How I work">
        <div className="measure">
          <p>
            Own the feature from the data shape to the reverse proxy. Prefer
            boring reliability over clever demos. If it loads slow, that’s a
            bug — not a personality quirk.
          </p>
          <p>
            At Fynd that meant shipping across eight products and pipelines
            that generated six figures of training data. At Snapwork, leading
            delivery for GCash. At Kolors, software that has to coexist with
            firmware and home automation instead of pretending hardware doesn’t
            exist.
          </p>
          <p className="meta mt-6 text-copper">
            Warm hands, cold checks. Yarn tension and LCP are the same skill.
          </p>
        </div>
      </Section>

      <Section label="Case files">
        <div>
          {cases.map((c) => (
            <IndexItem key={c.n} n={c.n} title={c.title} meta={c.meta}>
              {c.body}
            </IndexItem>
          ))}
        </div>
      </Section>

      <Section label="Stack">
        <SpecList
          items={[
            {
              k: "Languages",
              v: "TypeScript, JavaScript, Python, C#, PHP, SQL",
            },
            {
              k: "Web",
              v: "React, Next.js, Node.js, Express, FastAPI, Django, Angular, Svelte",
            },
            {
              k: "Data & CMS",
              v: "PostgreSQL, Redis, Strapi, Contentful, Drizzle, Objection",
            },
            {
              k: "Cloud",
              v: "GCP, AWS (S3, CloudFront, EC2, Lambda), Docker",
            },
            {
              k: "Also",
              v: "REST APIs, multilingual CMS, AI image pipelines, performance budgets",
            },
          ]}
        />
      </Section>

      <Section label="Further">
        <div className="measure">
          <p>
            Roles and education live in the{" "}
            <LinkLine href="/work/">work archive</LinkLine>
            . 3D pipeline thinking is on the{" "}
            <LinkLine href="/studio/">studio page</LinkLine>
            . Reach me on{" "}
            <LinkLine href="https://www.linkedin.com/in/dscalvin" external>
              LinkedIn
            </LinkLine>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
