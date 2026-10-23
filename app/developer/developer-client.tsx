"use client";

import type { CSSProperties } from "react";
import {
  PreviewBanner,
  applyPreviewEducation,
  applyPreviewPage,
  applyPreviewRoles,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { CommandButton } from "@/components/command-button";
import {
  DirRow,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";
import { normalizeRoleEntry } from "@/lib/preview";
import {
  achievements as baseAchievements,
  developer as baseDeveloper,
  education as baseEducation,
  profile as baseProfile,
  roles as baseRoles,
  skills as baseSkills,
  siteMeta as baseSiteMeta,
  workPage as baseWorkPage,
} from "@/lib/content";


function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const o = value as { item?: unknown; text?: unknown; k?: unknown; v?: unknown };
    return String(o.item ?? o.text ?? o.k ?? "");
  }
  return String(value);
}

function asTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(asText).filter(Boolean);
}

function asSpecList(value: unknown): { k: string; v: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((row) => {
      if (row && typeof row === "object") {
        const o = row as { k?: unknown; v?: unknown; item?: unknown; text?: unknown };
        return {
          k: asText(o.k ?? o.item ?? o.text),
          v: asText(o.v ?? o.text ?? ""),
        };
      }
      return null;
    })
    .filter((r): r is { k: string; v: string } => !!r && (!!r.k || !!r.v));
}

function renderHtml(html: string) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * /developer is the whole software story: the old /work content
 * (experience, highlights, education, tools, contact) is folded in
 * here — confirmed structural decision, four nav slots.
 */
export function DeveloperPageClient() {
  const preview = useCmsPreview();
  const c = preview.payload?.collection;

  const d = applyPreviewPage(
    baseDeveloper,
    preview.payload,
    "developer",
    preview.nonce
  );
  const workPage = applyPreviewPage(
    baseWorkPage,
    preview.payload,
    "work-page",
    preview.nonce
  );
  const profile = applyPreviewPage(
    baseProfile,
    preview.payload,
    "profile",
    preview.nonce
  );
  const skills = applyPreviewPage(
    baseSkills,
    preview.payload,
    "skills",
    preview.nonce
  );
  const siteMeta = applyPreviewPage(
    baseSiteMeta,
    preview.payload,
    "site-meta",
    preview.nonce
  );
  const achBase = {
    items: baseAchievements.map((text) => ({ text })),
  };
  const achMerged = applyPreviewPage(
    achBase,
    preview.payload,
    "achievements",
    preview.nonce
  );
  const achievements = (achMerged.items ?? []).map((i) => i.text);

  const roles = applyPreviewRoles(
    baseRoles as unknown as Array<Record<string, unknown>>,
    preview.payload,
    preview.nonce
  ) as typeof baseRoles;

  const education = applyPreviewEducation(
    baseEducation as unknown as Array<Record<string, unknown>>,
    preview.payload,
    preview.nonce
  ) as typeof baseEducation;

  const showBanner =
    preview.mode &&
    [
      "developer",
      "work-page",
      "profile",
      "skills",
      "achievements",
      "site-meta",
      "roles",
      "education",
    ].includes(String(c));

  return (
    <>
      {showBanner ? (
        <PreviewBanner
          label={draftLabel(preview.payload)}
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <PageHeader
          index={d.index}
          eyebrow={d.eyebrow}
          title={d.title}
          lede={d.lede}
        >
          <div
            className="mt-7 flex flex-wrap items-center gap-4"
            style={{ "--i": 3 } as CSSProperties}
          >
            <CommandButton command="get_cv" />
            <p className="meta text-note">Updated {siteMeta.updatedAt}</p>
          </div>
        </PageHeader>

        <Section label={d.howLabel}>
          <div className="measure">
            {asTextList(d.how).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section label={d.casesLabel}>
          <div className="space-y-3">
            {(d.cases || []).map((cse) => (
              <DirRow
                key={asText(cse.n)}
                kind="file"
                name={asText(cse.title)}
                size={asText(cse.meta)}
                blurb={asText(cse.body)}
              />
            ))}
          </div>
        </Section>

        <Section label={workPage.sections.experience}>
          <div>
            {preview.mode && c === "roles" ? (
              <div className="mb-6 border-2 border-copper bg-copper/10 p-5">
                <p className="meta text-copper">Draft role (live preview)</p>
                {(() => {
                  const draft = normalizeRoleEntry(
                    preview.payload!.entry
                  ) as {
                    company: string;
                    title: string;
                    period: string;
                    location: string;
                    summary: string;
                    highlights: string[];
                  };
                  return (
                    <>
                      <h3 className="mt-2 text-2xl font-black text-paper uppercase">
                        {draft.company || (
                          <span className="text-note">
                            (no company — keys:{" "}
                            {Object.keys(preview.payload!.entry || {}).join(
                              ", "
                            ) || "none"}
                            )
                          </span>
                        )}
                      </h3>
                      <p className="text-brass">{draft.title}</p>
                      <p className="meta mt-1 text-note">
                        {[draft.period, draft.location]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <p className="measure mt-3 text-sm text-paper/85">
                        {draft.summary}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {draft.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2 text-sm text-note"
                          >
                            <span className="mt-2 h-px w-4 shrink-0 bg-copper" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                })()}
              </div>
            ) : null}
            {roles.map((role, i) => (
              <div
                key={String(role.slug ?? role.id ?? role.company ?? i)}
                className="reveal border-t py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div>
                    <p className="meta text-copper">
                      {String(i + 1).padStart(2, "0")} · {role.period}
                    </p>
                    <h3 className="mt-2 text-3xl leading-tight font-black text-paper uppercase sm:text-4xl">
                      {role.company}
                      {role.__draft ? (
                        <span className="ml-2 align-middle font-mono text-[0.65rem] tracking-[0.16em] text-copper uppercase">
                          draft
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1 text-base text-brass">{role.title}</p>
                  </div>
                  <p className="meta text-note sm:text-right">
                    {role.location}
                    {role.href ? (
                      <>
                        <br />
                        <a
                          href={role.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-note transition-colors hover:text-brass"
                        >
                          site ↗
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>

                <p className="measure mt-5">{role.summary}</p>

                <ul className="mt-5 space-y-3">
                  {(Array.isArray(role.highlights) ? role.highlights : []).map(
                    (raw) => {
                      const item =
                        typeof raw === "string"
                          ? raw
                          : String(
                              (raw as { item?: unknown; text?: unknown })
                                .item ??
                                (raw as { text?: unknown }).text ??
                                ""
                            );
                      if (!item) return null;
                      return (
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
                      );
                    }
                  )}
                </ul>

                {(() => {
                  const tech = Array.isArray(role.tech)
                    ? role.tech
                        .map((raw) =>
                          typeof raw === "string"
                            ? raw
                            : String(
                                (raw as { item?: unknown; text?: unknown })
                                  .item ??
                                  (raw as { text?: unknown }).text ??
                                  ""
                              )
                        )
                        .filter(Boolean)
                    : [];
                  return tech.length ? (
                    <p className="meta mt-4 text-note">{tech.join("  ·  ")}</p>
                  ) : null;
                })()}
              </div>
            ))}
          </div>
        </Section>

        <Section label={workPage.sections.highlights}>
          <ul className="space-y-4">
            {achievements.map((item) => (
              <li
                key={item}
                className="reveal flex gap-3 border-b pb-4 text-base leading-relaxed text-paper/90 last:border-b-0"
              >
                <span className="meta mt-1 text-copper" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label={workPage.sections.education}>
          <div className="divide-y border-y">
            {education.map((item) => (
              <div
                key={String(item.slug ?? item.credential)}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-base text-paper">{item.credential}</p>
                  <p className="mt-0.5 text-sm text-note">{item.school}</p>
                </div>
                <span className="meta text-note">{item.year}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section label={d.stackLabel}>
          <SpecList items={asSpecList(d.stack)} />
        </Section>

        <Section label={workPage.sections.tools}>
          <div className="measure">
            <p>
              {skills.languages}. {skills.web}. {skills.data}. {skills.cloud}.{" "}
              {skills.creative}.
            </p>
            <p className="meta mt-4 text-note">{workPage.toolsNote}</p>
            <div className="mt-6">
              <CommandButton command="get_cv" />
            </div>
          </div>
        </Section>

        <Section label={workPage.sections.contact}>
          <div className="measure">
            <p>
              {profile.name} · {profile.location}
            </p>
            <p className="meta mt-2 text-note">{profile.email}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CommandButton command="mail_calvin" />
              <CommandButton command="copy_email" />
            </div>
          </div>
        </Section>

        <Section label={d.furtherLabel}>
          <div className="measure">
            <p>{renderHtml(d.furtherHtml)}</p>
          </div>
        </Section>
      </main>
    </>
  );
}
