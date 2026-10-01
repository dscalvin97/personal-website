import type { Metadata } from "next";
import { MetaList, PageHeader, ProjectCard, Section } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Developer",
  description:
    "Calvin Dsouza — software development: web apps, APIs, Python tooling, and C# experiments.",
};

const stack = [
  { k: "Languages", v: "TypeScript, Python, C#" },
  { k: "Web", v: "Next.js, React, Node, nginx" },
  { k: "Also", v: "Excel automation, report tooling, APIs" },
  { k: "Ops", v: "Linux, Docker, systemd, CI basics" },
];

const projects = [
  {
    name: "ReportGen",
    blurb:
      "Python app that takes a specially formatted Excel sheet and turns it into structured reports. Built for people who live in spreadsheets and need output that doesn't.",
    meta: "Python",
    href: "https://github.com/dscalvin97/ReportGen",
  },
  {
    name: "ProjectORB",
    blurb:
      "C# project — exploring structured application design outside the usual web stack. A reminder that the runtime matters less than the shape of the problem.",
    meta: "C#",
    href: "https://github.com/dscalvin97/ProjectORB",
  },
  {
    name: "user-activity-test",
    blurb:
      "Small Python utility for exercising user-activity flows. Useful when you need a repeatable signal instead of clicking through a UI by hand.",
    meta: "Python",
    href: "https://github.com/dscalvin97/user-activity-test",
  },
  {
    name: "This site",
    blurb:
      "Next.js 16, static export, custom three.js hero, shadcn UI. Served from nginx on a Hetzner box. The performance choices are part of the portfolio.",
    meta: "TypeScript",
    href: "https://github.com/dscalvin97",
  },
];

export default function DeveloperPage() {
  return (
    <main>
      <PageHeader
        eyebrow="01 — Developer"
        title="Software that has to work on a Tuesday morning."
        lede="I build web apps and the quiet infrastructure underneath them: APIs, reverse proxies, automation, and the boring glue that stops demos from becoming outages."
      />

      <Section title="How I work">
        <div className="prose-page">
          <p>
            I care about interfaces a stranger can read, defaults that are hard
            to get wrong, and deployments that don't need a prayer. Most of my
            learning happens in public repos and half-finished side projects
            that eventually ship something useful.
          </p>
          <p>
            Comfortable owning a feature end to end — from the data shape to the
            nginx config that puts it on the internet.
          </p>
        </div>
      </Section>

      <Section title="Selected work">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </Section>

      <Section title="Stack">
        <MetaList items={stack} />
      </Section>

      <Section title="Find the code">
        <div className="prose-page">
          <p>
            Most of what I can share lives on{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="https://github.com/dscalvin97"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . For roles, collabs, or “can you look at this?” —{" "}
            <a
              className="text-yarn underline-offset-4 hover:underline"
              href="https://www.linkedin.com/in/dscalvin"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            is the fastest way to reach me.
          </p>
        </div>
      </Section>
    </main>
  );
}
