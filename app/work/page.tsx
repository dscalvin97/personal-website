import type { Metadata } from "next";
import { IndexItem, PageHeader, Section } from "@/components/page-parts";
import { ResumeDownload } from "@/components/resume-download";
import {
  achievements,
  education,
  profile,
  roles,
  skills,
  updatedAt,
} from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Calvin Dsouza — work archive. Kolors, Snapwork, Fynd, HERE. Fullstack, 3D pipelines, firmware-adjacent product.",
};

export default function WorkPage() {
  return (
    <main id="main">
      <PageHeader
        index="01"
        eyebrow="Work"
        title={
          <>
            An archive, not a{" "}
            <span className="italic text-brass">highlight reel</span>.
          </>
        }
        lede="Five years of shipping across fintech, AI platforms, and connected products. Read it like a ledger — role, place, what actually happened."
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ResumeDownload />
          <p className="meta text-muted">Updated {updatedAt}</p>
        </div>
      </PageHeader>

      <Section label="Experience">
        <div>
          {roles.map((role, i) => (
            <div
              key={role.id}
              className="reveal border-t border-line py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <p className="meta text-copper">
                    {String(i + 1).padStart(2, "0")} · {role.period}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-paper sm:text-4xl">
                    {role.company}
                  </h3>
                  <p className="mt-1 text-base text-brass">{role.title}</p>
                </div>
                <p className="meta text-muted sm:text-right">
                  {role.location}
                  {role.href ? (
                    <>
                      <br />
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-brass"
                      >
                        site ↗
                      </a>
                    </>
                  ) : null}
                </p>
              </div>

              <p className="measure mt-5">{role.summary}</p>

              <ul className="mt-5 space-y-3">
                {role.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-paper/85"
                  >
                    <span
                      className="mt-2 h-px w-5 shrink-0 bg-copper"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {role.tech?.length ? (
                <p className="meta mt-4 text-muted">{role.tech.join("  ·  ")}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section label="Evidence">
        <ul className="space-y-4">
          {achievements.map((item) => (
            <li
              key={item}
              className="reveal flex gap-3 border-b border-line pb-4 text-base leading-relaxed text-paper/90 last:border-b-0"
            >
              <span className="meta mt-1 text-copper" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Education">
        <div className="divide-y divide-line border-y border-line">
          {education.map((item) => (
            <div
              key={item.credential}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="text-base text-paper">{item.credential}</p>
                <p className="mt-0.5 text-sm text-muted">{item.school}</p>
              </div>
              <span className="meta text-muted">{item.year}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Tools in rotation">
        <div className="measure">
          <p>
            {skills.languages}. {skills.web}. {skills.data}. {skills.cloud}.{" "}
            {skills.creative}.
          </p>
          <p className="meta mt-4 text-muted">
            Not a skill bar. Things I have actually shipped with. Full
            timeline in the PDF.
          </p>
          <div className="mt-6">
            <ResumeDownload label="Download resume PDF" />
          </div>
        </div>
      </Section>

      <Section label="Contact">
        <div className="measure">
          <p>
            {profile.name} · {profile.location}
          </p>
          <p className="meta mt-2 text-muted">{profile.email}</p>
        </div>
      </Section>
    </main>
  );
}
