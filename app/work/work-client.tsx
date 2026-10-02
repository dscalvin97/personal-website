"use client";

import type { CSSProperties } from "react";
import {
  applyPreviewToContent,
  applyPreviewToEducation,
  applyPreviewToRoles,
  useCmsPreview,
} from "@/components/cms-preview";
import { PageHeader, Section } from "@/components/page-parts";
import { ResumeDownload } from "@/components/resume-download";
import {
  achievements as baseAchievements,
  education as baseEducation,
  profile as baseProfile,
  roles as baseRoles,
  site as baseSite,
  skills as baseSkills,
} from "@/lib/work";

function PreviewBanner({
  label,
  detail,
}: {
  label: string;
  detail?: string;
}) {
  return (
    <div
      className="border-b border-copper/50 bg-copper/10 px-5 py-2 text-center font-mono text-[0.7rem] tracking-[0.16em] text-copper uppercase"
      role="status"
    >
      CMS preview · {label}
      {detail ? ` · ${detail}` : ""} · not published
    </div>
  );
}


function draftDetail(payload: {
  collection: string;
  entry: Record<string, unknown>;
} | null): string {
  if (!payload) return "";
  const e = payload.entry as Record<string, unknown>;
  const profile = (e.profile as Record<string, unknown>) || e;
  if (payload.collection === "content") {
    const name = profile.name || e.name;
    return name ? `name=${String(name)}` : "content draft";
  }
  if (payload.collection === "roles") {
    const company = e.company || e.slug;
    const title = e.title;
    return [company, title].filter(Boolean).join(" — ");
  }
  if (payload.collection === "education") {
    return String(e.credential || e.slug || "entry");
  }
  return "";
}

export function WorkPageClient() {
  const preview = useCmsPreview();

  const content = applyPreviewToContent(
    {
      profile: baseProfile,
      skills: baseSkills,
      achievements: { items: baseAchievements.map((text) => ({ text })) },
      site: baseSite,
    },
    preview.payload,
    preview.nonce
  );

  const roles = applyPreviewToRoles(
    baseRoles as unknown as Array<Record<string, unknown>>,
    preview.payload,
    preview.nonce
  ) as typeof baseRoles;

  const education = applyPreviewToEducation(
    baseEducation as unknown as Array<Record<string, unknown>>,
    preview.payload,
    preview.nonce
  ) as typeof baseEducation;

  const achievements = (content.achievements.items ?? []).map((i) => i.text);
  const profile = content.profile as typeof baseProfile;
  const skills = content.skills as typeof baseSkills;
  const updatedAt = String(
    (content.site as { updatedAt?: string }).updatedAt ?? baseSite.updatedAt
  );

  return (
    <>
      {preview.mode ? (
        <PreviewBanner
          label={
            preview.payload?.collection === "roles"
              ? "Role"
              : preview.payload?.collection === "education"
                ? "Education"
                : "Site content"
          }
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <PageHeader
          index="01"
          eyebrow="Work"
          title="Work history."
          lede="Roles, places, and what I actually shipped. Updated from the CMS content file."
        >
          <div
            className="mt-6 flex flex-wrap items-center gap-4"
            style={{ "--i": 3 } as CSSProperties}
          >
            <ResumeDownload />
            <p className="meta text-muted">Updated {updatedAt}</p>
          </div>
        </PageHeader>

        <Section label="Experience">
          <div>
            {roles.map((role, i) => (
              <div
                key={String(role.slug ?? role.id ?? role.company ?? i)}
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
                  {(role.highlights ?? []).map((item) => (
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
                  <p className="meta mt-4 text-muted">
                    {role.tech.join("  ·  ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        <Section label="Highlights">
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
                key={String(item.slug ?? item.credential)}
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

        <Section label="Tools">
          <div className="measure">
            <p>
              {skills.languages}. {skills.web}. {skills.data}. {skills.cloud}.{" "}
              {skills.creative}.
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
    </>
  );
}

