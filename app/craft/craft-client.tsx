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
import { craft as baseCraft } from "@/lib/content";

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
            {(cr.make || []).map((p) => (
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
          <SpecList items={cr.patterns || []} />
        </Section>

        <Section label={cr.contactLabel}>
          <div className="measure">
            <p>{renderHtml(cr.contactHtml)}</p>
          </div>
        </Section>
      </main>
    </>
  );
}
