import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/page-parts";
import { achievements, education, roles } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Calvin Dsouza — senior fullstack developer. Kolors, Snapwork, Fynd, HERE. Web, 3D, firmware, home automation.",
};

export default function WorkPage() {
  return (
    <main>
      <PageHeader
        eyebrow="01 — Work"
        title="Web, 3D, firmware — same stack, different surfaces."
        lede="5+ years shipping products across fintech and AI-driven platforms. Currently senior fullstack developer at Kolors India — fullstack, firmware, and home automation."
      >
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
          <span className="h-1 w-1 rounded-full bg-sage" aria-hidden="true" />
          INTP-T · Logician · Analyst
        </p>
      </PageHeader>

      <Section title="Experience">
        <ol className="space-y-0">
          {roles.map((role) => (
            <li
              key={role.company + role.period}
              className="border-t border-line/80 py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase">
                    {role.period} · {role.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-bone sm:text-3xl">
                    {role.company}
                  </h3>
                  <p className="mt-1 text-base text-yarn">{role.title}</p>
                </div>
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-yarn/50 hover:text-bone sm:mt-0"
                  >
                    kolorsworld.com
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>

              <p className="prose-page mt-5">{role.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {role.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-bone/80"
                  >
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-yarn/70"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {role.tech ? (
                <p className="mt-4 font-mono text-[0.7rem] text-muted">
                  {role.tech.join(" · ")}
                </p>
              ) : null}

              <ul className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Key achievements">
        <ul className="space-y-3">
          {achievements.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-bone/85"
            >
              <span
                className="mt-2 h-px w-4 shrink-0 bg-coral/80"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="divide-y divide-line/70 border-y border-line/70">
          {education.map((item) => (
            <li
              key={item.credential}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="text-base text-bone">{item.credential}</p>
                <p className="mt-0.5 text-sm text-muted">{item.school}</p>
              </div>
              <span className="font-mono text-xs text-muted">{item.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills snapshot">
        <div className="prose-page space-y-4">
          <p>
            <strong className="text-bone">Languages:</strong> TypeScript,
            JavaScript, Python, C#, PHP, SQL
          </p>
          <p>
            <strong className="text-bone">Web:</strong> React, Next.js,
            Node.js, Express, FastAPI, Django, Angular, Svelte, TailwindCSS
          </p>
          <p>
            <strong className="text-bone">Data &amp; cloud:</strong>{" "}
            PostgreSQL, Redis, Strapi, Contentful, Drupal, GCP, AWS, Docker
          </p>
          <p>
            <strong className="text-bone">3D &amp; creative:</strong> Blender,
            Unity, Substance Painter/Designer, ComfyUI, Photoshop, Illustrator
          </p>
        </div>
      </Section>
    </main>
  );
}
