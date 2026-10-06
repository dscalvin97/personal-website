"use client";

import {
  PreviewBanner,
  applyPreviewPage,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import {
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";
import { developer as baseDeveloper } from "@/lib/content";


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

export function DeveloperPageClient() {
  const preview = useCmsPreview();
  const c = preview.payload?.collection;
  const d = applyPreviewPage(
    baseDeveloper,
    preview.payload,
    "developer",
    preview.nonce
  );

  return (
    <>
      {preview.mode && c === "developer" ? (
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
        />

        <Section label={d.howLabel}>
          <div className="measure">
            {asTextList(d.how).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section label={d.casesLabel}>
          <div>
            {(d.cases || []).map((cse) => (
              <div key={asText(cse.n)} className="index-row reveal">
                <span className="meta text-copper">{asText(cse.n)}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-paper sm:text-[1.75rem]">
                    {asText(cse.title)}
                  </h3>
                  <div className="measure mt-2 text-sm leading-relaxed text-muted">
                    {asText(cse.body)}
                  </div>
                </div>
                <span className="index-meta meta text-muted sm:text-right">
                  {asText(cse.meta)}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section label={d.stackLabel}>
          <SpecList items={asSpecList(d.stack)} />
        </Section>

        <Section label={d.furtherLabel}>
          <div className="measure">
            <p>{renderHtml(d.furtherHtml)}</p>
            <p className="mt-4 text-sm text-muted">
              <LinkLine href="/work/">Roles & education</LinkLine>
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
