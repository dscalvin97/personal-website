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
            {(d.how || []).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section label={d.casesLabel}>
          <div>
            {(d.cases || []).map((cse) => (
              <div key={cse.n} className="index-row reveal">
                <span className="meta text-copper">{cse.n}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-paper sm:text-[1.75rem]">
                    {cse.title}
                  </h3>
                  <div className="measure mt-2 text-sm leading-relaxed text-muted">
                    {cse.body}
                  </div>
                </div>
                <span className="index-meta meta text-muted sm:text-right">
                  {cse.meta}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section label={d.stackLabel}>
          <SpecList items={d.stack || []} />
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
