"use client";

import {
  PreviewBanner,
  applyPreviewPage,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { CommandButton } from "@/components/command-button";
import { DirRow, PageHeader, Section, SpecList } from "@/components/page-parts";
import { studio as baseStudio } from "@/lib/content";


function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const o = value as { item?: unknown; text?: unknown; k?: unknown; v?: unknown };
    return String(o.item ?? o.text ?? o.k ?? "");
  }
  return String(value);
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
 * /studio — Leo's reading-column rhythm: narrow prose sections
 * (narrow prop), one block CTA (HOVER 4 caret reveal), directory
 * rows for the index. Zero canvases in this build (see PR notes).
 */
export function StudioPageClient() {
  const preview = useCmsPreview();
  const c = preview.payload?.collection;
  const s = applyPreviewPage(baseStudio, preview.payload, "studio", preview.nonce);
  const blendkit = s.blendkitUrl;

  return (
    <>
      {preview.mode && c === "studio" ? (
        <PreviewBanner
          label={draftLabel(preview.payload)}
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <PageHeader index={s.index} eyebrow={s.eyebrow} title={s.title} lede={s.lede}>
          <div
            className="mt-7 flex flex-wrap items-center gap-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <CommandButton command="get_cv" />
          </div>
        </PageHeader>

        <Section label={asText(s.portfolioLabel)} narrow>
          <div className="measure">
            <p>{renderHtml(s.portfolioHtml)}</p>
          </div>
          <div className="mt-6">
            <a href={blendkit} target="_blank" rel="noopener noreferrer" className="h4">
              <span className="p">&gt;</span>
              {asText(s.blendkitLabel)}
            </a>
          </div>
          <div className="mt-6">
            <DirRow
              kind="dir"
              name={asText(s.portfolioCard.title)}
              size={asText(s.portfolioCard.meta)}
              blurb={asText(s.portfolioCard.body)}
              href={blendkit}
            />
          </div>
        </Section>

        <Section label={asText(s.practiceLabel)} narrow>
          <SpecList items={asSpecList(s.practice)} />
        </Section>

        <Section label={asText(s.selectedLabel)} narrow>
          <div className="space-y-3">
            {(s.selected || []).map((item) => (
              <DirRow
                key={asText(item.n)}
                kind="dir"
                name={asText(item.title)}
                size={asText(item.meta)}
                blurb={asText(item.body)}
                href={item.href ? asText(item.href) : undefined}
              />
            ))}
          </div>
        </Section>

        <Section label={asText(s.relatedLabel)} narrow>
          <div className="measure">
            <p>{renderHtml(s.relatedHtml)}</p>
          </div>
        </Section>
      </main>
    </>
  );
}
