"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { CommandButton } from "@/components/command-button";
import { DirRow } from "@/components/page-parts";
import {
  PreviewBanner,
  applyPreviewPage,
  draftCollection,
  draftDetail,
  draftLabel,
  useCmsPreview,
} from "@/components/cms-preview";
import { home as baseHome, shared as baseShared, profile as baseProfile } from "@/lib/content";


function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const o = value as { item?: unknown; text?: unknown; k?: unknown; v?: unknown };
    return String(o.item ?? o.text ?? o.k ?? "");
  }
  return String(value);
}

function renderHtml(html: string) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function HomePageClient() {
  const preview = useCmsPreview();
  const c = draftCollection(preview.payload);

  const shared = applyPreviewPage(baseShared, preview.payload, "shared", preview.nonce);
  const home = applyPreviewPage(baseHome, preview.payload, "home", preview.nonce);
  const profile = applyPreviewPage(baseProfile, preview.payload, "profile", preview.nonce);

  type HomeLink = {
    label: string;
    href: string;
    external?: boolean;
    download?: string;
  };
  const links: HomeLink[] = home.links?.length
    ? home.links
    : [
        { label: "LinkedIn", href: profile.links.linkedin, external: true },
        { label: "GitHub", href: profile.links.github, external: true },
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
        <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
          <div className="mx-auto w-full max-w-4xl px-5 enter">
            <p className="kicker" style={{ "--i": 0 } as CSSProperties}>
              {asText(home.meta)}
            </p>
            <h1
              className="mt-6 text-[clamp(3rem,11vw,6.5rem)] leading-[0.9] font-black tracking-[-0.03em] text-lime uppercase"
              style={{ "--i": 1 } as CSSProperties}
            >
              {asText(home.nameFirst)}
              <span className="block">{asText(home.nameLast)}</span>
            </h1>
            {/* TYPE 2 diff headline — locked copy, discussions/2026-10-23-copy-round.md */}
            <div
              className="diff mt-9"
              style={{ "--i": 2 } as CSSProperties}
            >
              <div className="add">+ software that works on a Tuesday</div>
              <div className="add">+ 100k+ training images, rendered and captioned</div>
              <div className="add">+ crochet patterns with no filler</div>
              <div className="del">- a hero shot of someone else's MacBook</div>
            </div>
            <p
              className="measure mt-9 text-lg leading-relaxed text-paper/85 sm:text-xl"
              style={{ "--i": 3 } as CSSProperties}
            >
              {asText(home.lede)}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-4"
              style={{ "--i": 4 } as CSSProperties}
            >
              <CommandButton command="get_cv" />
              <CommandButton command="shop_patterns" />
              <CommandButton command="mail_calvin" />
              <CommandButton command="copy_email" />
            </div>
            <div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase"
              style={{ "--i": 5 } as CSSProperties}
            >
              {links.map((link) => {
                const cls = "transition-colors hover:text-brass";
                if (link.external) {
                  return (
                    <a
                      key={asText(link.label)}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {asText(link.label)}
                    </a>
                  );
                }
                if (link.download) {
                  return (
                    <a
                      key={asText(link.label)}
                      href={link.href}
                      download={link.download}
                      className={cls}
                    >
                      {asText(link.label)}
                    </a>
                  );
                }
                return (
                  <Link key={asText(link.label)} href={link.href} className={cls}>
                    {asText(link.label)}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t-2 py-12 sm:py-16" aria-label="Index">
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-black tracking-wide text-wht uppercase sm:text-xl">
                {asText(home.indexTitle)}
              </h2>
              <div className="tick-rule flex-1" aria-hidden="true" />
            </div>
            <div className="mt-6 space-y-3">
              {(home.index || []).map((item) => (
                <DirRow
                  key={item.href}
                  kind="dir"
                  name={asText(item.title)}
                  size={asText(item.meta)}
                  blurb={asText(item.blurb)}
                  href={item.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-2 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="measure">
              <h2 className="text-3xl leading-tight font-black text-paper uppercase sm:text-4xl">
                {asText(home.currentlyTitle)}
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
