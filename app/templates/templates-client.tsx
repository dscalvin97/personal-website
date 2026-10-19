"use client";

import Image from "next/image";
import {
  PreviewBanner,
  applyPreviewPage,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { PageHeader, Section } from "@/components/page-parts";
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
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <article
                key={item.name}
                className="enter flex flex-col border border-line bg-ink-2/60"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.name}
                  width={1200}
                  height={630}
                  className="w-full border-b border-line"
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.01em] text-paper">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/80">
                      {item.tagline}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <div className="meta flex flex-wrap gap-x-3 gap-y-1 text-brass">
                    {item.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                    {item.meta ? (
                      <span className="text-muted">{item.meta}</span>
                    ) : null}
                  </div>
                  <div className="mt-auto flex items-center gap-4 pt-2">
                    <a
                      href={item.useUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta border border-copper/60 px-4 py-2 text-copper transition-colors hover:bg-copper hover:text-ink"
                    >
                      Use this template ↗
                    </a>
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta text-muted transition-colors hover:text-brass"
                    >
                      View repo ↗
                    </a>
                  </div>
                </div>
              </article>
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
