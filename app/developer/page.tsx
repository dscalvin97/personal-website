import type { Metadata } from "next";
import { MetaList, PageHeader, ProjectCard, Section } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Developer",
  description:
    "Calvin Dsouza — software development: fullstack web, AI image pipelines, CMS, APIs. Kolors, Snapwork, Fynd.",
};

const stack = [
  { k: "Languages", v: "TypeScript, JavaScript, Python, C#, PHP, SQL" },
  {
    k: "Frameworks",
    v: "React, Next.js, Node.js, Express, FastAPI, Django, Angular, Svelte",
  },
  {
    k: "Data & CMS",
    v: "PostgreSQL, Redis, Strapi, Contentful, Drizzle, Objection",
  },
  { k: "Cloud", v: "GCP, AWS (S3, CloudFront, EC2, Lambda), Docker" },
  { k: "Also", v: "REST APIs, multilingual CMS, AI image pipelines" },
];

const projects = [
  {
    name: "AI training image pipelines",
    blurb:
      "At Fynd: Python + Blender + JS automation that generated 100,000+ captioned training images for ML models.",
    meta: "Python · Blender",
  },
  {
    name: "Pixelbin · Erase.bg · Upscale.media",
    blurb:
      "Full-stack feature work across 8 Fynd products — frontend UI and backend services owned end to end.",
    meta: "Next.js · Node",
  },
  {
    name: "Multilingual Strapi CMS",
    blurb:
      "Custom CMS backend for 20+ languages with real-time shared UI updates — content teams ship without developers.",
    meta: "Strapi",
  },
  {
    name: "GCash delivery at Snapwork",
    blurb:
      "Led a 2-developer team on client-facing full-stack work — APIs, PostgreSQL schemas, reusable component libraries.",
    meta: "React · Node",
  },
  {
    name: "MediCard POC",
    blurb:
      "Internal proof-of-concept owned end to end: implementation, technical docs, and handover to delivery.",
    meta: "Fullstack",
  },
  {
    name: "This site",
    blurb:
      "Next.js 16 static export, custom three.js hero, nginx on Hetzner. Performance choices are part of the portfolio.",
    meta: "TypeScript",
    href: "https://github.com/dscalvin97/personal-website",
  },
];

export default function DeveloperPage() {
  return (
    <main>
      <PageHeader
        eyebrow="02 — Developer"
        title="Software that has to work on a Tuesday morning."
        lede="5+ years of fullstack product work — fintech, AI platforms, CMS, and the unglamorous infrastructure underneath. Currently at Kolors India; previously Fynd and Snapwork."
      />

      <Section title="How I work" accent="studio">
        <div className="prose-page">
          <p>
            I care about interfaces a stranger can read, defaults that are hard
            to get wrong, and deployments that don't need a prayer. Comfortable
            owning a feature end to end — from the data shape to the nginx
            config that puts it on the internet.
          </p>
          <p>
            At Fynd that meant shipping across eight products and building
            pipelines that generated six figures of training data. At Snapwork
            it meant leading delivery for GCash. At Kolors it means software
            that has to coexist with firmware and home automation.
          </p>
        </div>
      </Section>

      <Section title="Selected work" accent="studio">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </Section>

      <Section title="Stack" accent="studio">
        <MetaList items={stack} />
      </Section>

      <Section title="Full history" accent="studio">
        <div className="prose-page">
          <p>
            Roles, education, and achievements live on the{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="/work/"
            >
              work page
            </a>
            . Reach me on{" "}
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
