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
import { CommandButton } from "@/components/command-button";
import { craft as baseCraft } from "@/lib/content";


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

export function CraftPageClient() {
  const preview = useCmsPreview();
  const c = preview.payload?.collection;
  const cr = applyPreviewPage(baseCraft, preview.payload, "craft", preview.nonce);

  return (
    <>
      {preview.mode && c === "craft" ? (
        <PreviewBanner
          label={draftLabel(preview.payload)}
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <PageHeader
          index={cr.index}
          eyebrow={cr.eyebrow}
          title={cr.title}
          lede={cr.lede}
        />

        <Section label={cr.makeLabel}>
          <div className="measure">
            {asTextList(cr.make).map((p) => (
              <p key={p.slice(0, 24)}>
                {p.includes("Gumroad") ? (
                  <>
                    {p.split("Gumroad")[0]}
                    <LinkLine href="https://dscalvin.gumroad.com/" external>
                      Gumroad
                    </LinkLine>
                    {p.split("Gumroad")[1]}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </Section>

        <Section label={cr.patternsLabel}>
          <SpecList items={asSpecList(cr.patterns)} />
        </Section>

        <Section label={cr.contactLabel}>
          <div className="measure">
            <p>{renderHtml(cr.contactHtml)}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CommandButton command="shop_patterns" />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
