"use client";

import {
  PreviewBanner,
  applyPreviewPage,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { DirRow, PageHeader, Section } from "@/components/page-parts";
import { templates as baseTemplates } from "@/lib/content";

type TemplateItem = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  repo: string;
  useUrl: string;
  stack: string[];
  meta?: string;
};

function asItems(value: unknown): TemplateItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (t): t is TemplateItem =>
        !!t && typeof t === "object" && typeof (t as TemplateItem).name === "string"
    )
    .map((t) => ({
      ...t,
      stack: Array.isArray(t.stack)
        ? t.stack
            .map((s) => (typeof s === "string" ? s : String((s as { item?: string })?.item ?? "")))
            .filter(Boolean)
        : [],
    }));
}

/**
 * /templates — Leo's bare Rauno index rhythm: no thumbnails, just
 * CARD 2 directory rows (name, meta, one-line what-it-is) and the
 * two real links per entry. Command names follow the team's
 * verb_object rule (copy round §6).
 */
export function TemplatesPageClient() {
  const preview = useCmsPreview();
  const c = preview.payload?.collection;
  const t = applyPreviewPage(baseTemplates, preview.payload, "templates", preview.nonce);
  const items = asItems(t.items);

  return (
    <>
      {preview.mode && c === "templates" ? (
        <PreviewBanner
          label={draftLabel(preview.payload)}
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <PageHeader
          index={t.index}
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.lede}
        />

        <Section label={t.catalogLabel}>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.name}>
                <DirRow
                  kind="dir"
                  name={item.name}
                  size={[...item.stack, item.meta].filter(Boolean).join(" · ")}
                  blurb={[item.tagline, item.description]
                    .filter(Boolean)
                    .join(" ")}
                />
                <div className="mt-1 flex flex-wrap gap-5 px-3 font-mono text-xs">
                  <a
                    href={item.useUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grn hover:bg-lime hover:text-blk focus-visible:bg-lime focus-visible:text-blk"
                  >
                    use_template ↗
                  </a>
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grn hover:bg-lime hover:text-blk focus-visible:bg-lime focus-visible:text-blk"
                  >
                    view_repo ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label={t.ctaLabel}>
          <div className="measure">
            <p>
              <span dangerouslySetInnerHTML={{ __html: t.ctaHtml }} />
            </p>
          </div>
        </Section>

        <Section label={t.moreLabel}>
          <div className="measure">
            <p>
              <span dangerouslySetInnerHTML={{ __html: t.moreHtml }} />
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
