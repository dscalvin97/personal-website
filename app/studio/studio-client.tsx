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
              {s.blendkitLabel}
              <span aria-hidden="true">↗</span>
            </a>
            <ResumeDownload label="Resume" />
          </div>
        </PageHeader>

        <Section label={s.portfolioLabel}>
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
              <span className="meta text-copper">{s.portfolioCard.n}</span>
              <div>
                <h3 className="index-title font-display text-2xl leading-tight text-paper transition-colors sm:text-[1.75rem]">
                  {s.portfolioCard.title}
                </h3>
                <div className="measure mt-2 text-sm leading-relaxed text-muted">
                  {s.portfolioCard.body}
                </div>
              </div>
              <span className="index-meta meta text-muted sm:text-right">
                {s.portfolioCard.meta}
              </span>
            </a>
          </div>
        </Section>

        <Section label={s.practiceLabel}>
          <SpecList items={s.practice || []} />
        </Section>

        <Section label={s.selectedLabel}>
          <div>
            {(s.selected || []).map((item) => (
              <IndexItem
                key={item.n}
                n={item.n}
                title={item.title}
                meta={item.meta}
                href={item.href}
              >
                {item.body}
              </IndexItem>
            ))}
          </div>
        </Section>

        <Section label={s.relatedLabel}>
          <div className="measure">
            <p>{renderHtml(s.relatedHtml)}</p>
          </div>
        </Section>
      </main>
    </>
  );
}
