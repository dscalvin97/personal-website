"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { IndexItem } from "@/components/page-parts";
import {
  PreviewBanner,
  applyPreviewPage,
  draftCollection,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { home as baseHome, shared as baseShared, profile as baseProfile } from "@/lib/content";

function renderHtml(html: string) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function HomePageClient() {
  const preview = useCmsPreview();
  const c = draftCollection(preview.payload);

  const shared = applyPreviewPage(baseShared, preview.payload, "shared", preview.nonce);
  const home = applyPreviewPage(baseHome, preview.payload, "home", preview.nonce);
  const profile = applyPreviewPage(baseProfile, preview.payload, "profile", preview.nonce);

  const links = home.links?.length
    ? home.links
    : [
        { label: "LinkedIn", href: profile.links.linkedin, external: true },
        { label: "GitHub", href: profile.links.github, external: true },
        { label: "Gumroad", href: profile.links.gumroad, external: true },
        { label: "Work →", href: "/work/", external: false },
        {
          label: "Resume ↓",
          href: profile.resumePdf,
          external: false,
          download: "Calvin-Dsouza-Resume.pdf",
        },
      ];

  return (
    <>
      {preview.mode && (c === "home" || c === "shared" || c === "profile") ? (
        <PreviewBanner
          label={draftLabel(preview.payload)}
          detail={draftDetail(preview.payload)}
        />
      ) : null}
      <main id="main">
        <section className="pt-24 pb-14 sm:pt-32 sm:pb-20">
          <div className="mx-auto w-full max-w-4xl px-5 enter">
            <p
              className="meta text-copper"
              style={{ "--i": 0 } as CSSProperties}
            >
              {home.meta}
            </p>
            <h1
              className="mt-5 font-display text-[clamp(3rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-paper"
              style={{ "--i": 1 } as CSSProperties}
            >
              {home.nameFirst}
              <span className="block italic text-brass">{home.nameLast}</span>
            </h1>
            <p
              className="measure mt-8 text-lg leading-relaxed text-paper/85 sm:text-xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              {home.lede}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase"
              style={{ "--i": 3 } as CSSProperties}
            >
              {links.map((link) => {
                const cls = "transition-colors hover:text-brass";
                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {link.label}
                    </a>
                  );
                }
                if (link.download) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      download={link.download}
                      className={cls}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link key={link.label} href={link.href} className={cls}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="border-t border-line py-12 sm:py-16"
          aria-label="Index"
        >
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="meta text-brass">{home.indexTitle}</h2>
              <div className="tick-rule flex-1" aria-hidden="true" />
            </div>
            <div className="mt-6">
              {(home.index || []).map((item) => (
                <IndexItem
                  key={item.href}
                  n={item.n}
                  title={item.title}
                  meta={item.meta}
                  href={item.href}
                >
                  {item.blurb}
                </IndexItem>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-12 sm:py-16">
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="measure">
              <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
                {home.currentlyTitle}
              </h2>
              <p className="mt-5">{renderHtml(home.currentlyHtml)}</p>
              <p>{renderHtml(home.currentlyHtml2)}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

