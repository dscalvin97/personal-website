"use client";

import {
  PreviewBanner,
  applyPreviewPage,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import {
  IndexItem,
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";
import { ResumeDownload } from "@/components/resume-download";
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
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={blendkit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-copper bg-copper/10 px-4 py-2 font-mono text-[0.72rem] tracking-[0.14em] text-brass uppercase transition-colors hover:bg-copper hover:text-ink"
            >
              {asText(s.blendkitLabel)}
              <span aria-hidden="true">↗</span>
            </a>
            <ResumeDownload label="Resume" />
          </div>
        </PageHeader>

        <Section label={asText(s.portfolioLabel)}>
          <div className="measure">
            <p>{renderHtml(s.portfolioHtml)}</p>
          </div>
          <div className="mt-6">
            <a
              href={blendkit}
              target="_blank"
              rel="noopener noreferrer"
              className="index-row reveal"
            >
              <span className="meta text-copper">{asText(s.portfolioCard.n)}</span>
              <div>
                <h3 className="index-title font-display text-2xl leading-tight text-paper transition-colors sm:text-[1.75rem]">
                  {asText(s.portfolioCard.title)}
                </h3>
                <div className="measure mt-2 text-sm leading-relaxed text-muted">
                  {asText(s.portfolioCard.body)}
                </div>
              </div>
              <span className="index-meta meta text-muted sm:text-right">
                {asText(s.portfolioCard.meta)}
              </span>
            </a>
          </div>
        </Section>

        <Section label={asText(s.practiceLabel)}>
          <SpecList items={asSpecList(s.practice)} />
        </Section>

        <Section label={asText(s.selectedLabel)}>
          <div>
            {(s.selected || []).map((item) => (
              <IndexItem
                key={asText(item.n)}
                n={asText(item.n)}
                title={asText(item.title)}
                meta={asText(item.meta)}
                href={item.href}
              >
                {asText(item.body)}
              </IndexItem>
            ))}
          </div>
        </Section>

        <Section label={asText(s.relatedLabel)}>
          <div className="measure">
            <p>{renderHtml(s.relatedHtml)}</p>
          </div>
        </Section>
      </main>
    </>
  );
}
