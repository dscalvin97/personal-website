import type { Metadata } from "next";
import {
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Developer",
  description:
    "Calvin Dsouza — fullstack developer. Web apps, APIs, CMS, performance.",
};

const cases = [
  {
    n: "01",
    title: "100,000+ training images",
    meta: "Fynd · Python · Blender",
    body: "Automated pipelines that turned 3D scenes into captioned datasets for ML models.",
  },
  {
    n: "02",
    title: "Eight products, one engineer",
    meta: "Fynd · Next.js · Node",
    body: "Fullstack features across Pixelbin, Erase.bg, Upscale.media and others — frontend and backend.",
  },
  {
    n: "03",
    title: "Localization without a dev ticket",
    meta: "Fynd · Strapi",
    body: "CMS for 20+ languages with live shared UI updates. Content teams ship without waiting on engineering.",
  },
  {
    n: "04",
    title: "GCash delivery",
    meta: "Snapwork · Team lead",
    body: "Led two developers on client-facing fullstack work. Reusable components and API patterns.",
  },
] as const;

export default function DeveloperPage() {
  return (
    <main id="main">
      <PageHeader
        index="02"
        eyebrow="Developer"
        title="Software that works on a Tuesday."
        lede="Fullstack product work with readable defaults, honest performance, and deployments that don’t need a prayer."
      />

      <Section label="How I work">
        <div className="measure">
          <p>
            Own the feature from the data shape to the reverse proxy. Prefer
            boring reliability over clever demos. If it loads slow, that’s a
            bug.
          </p>
          <p>
            At Fynd I shipped across eight products and built pipelines that
            generated six figures of training data. At Snapwork I led delivery
            for GCash. At Kolors, software that has to coexist with firmware
            and home automation.
          </p>
        </div>
      </Section>

      <Section label="Case files">
        <div>
          {cases.map((c) => (
            <IndexItemLite key={c.n} {...c} />
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
              v: "REST APIs, multilingual CMS, AI image pipelines",
            },
          ]}
        />
      </Section>

      <Section label="Further">
        <div className="measure">
          <p>
            Roles and education on the{" "}
            <LinkLine href="/work/">work page</LinkLine>
            . 3D work on the{" "}
            <LinkLine href="/studio/">studio page</LinkLine>
            . LinkedIn:{" "}
            <LinkLine href="https://www.linkedin.com/in/dscalvin" external>
              dscalvin
            </LinkLine>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}

function IndexItemLite({
  n,
  title,
  meta,
  body,
}: {
  n: string;
  title: string;
  meta: string;
  body: string;
}) {
  return (
    <div className="index-row reveal">
      <span className="meta text-copper">{n}</span>
      <div>
        <h3 className="font-display text-2xl leading-tight text-paper sm:text-[1.75rem]">
          {title}
        </h3>
        <div className="measure mt-2 text-sm leading-relaxed text-muted">
          {body}
        </div>
      </div>
      <span className="index-meta meta text-muted sm:text-right">{meta}</span>
    </div>
  );
}
