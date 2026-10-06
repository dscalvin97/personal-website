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
              {asText(home.meta)}
            </p>
            <h1
              className="mt-5 font-display text-[clamp(3rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-paper"
              style={{ "--i": 1 } as CSSProperties}
            >
              {asText(home.nameFirst)}
              <span className="block italic text-brass">{asText(home.nameLast)}</span>
            </h1>
            <p
              className="measure mt-8 text-lg leading-relaxed text-paper/85 sm:text-xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              {asText(home.lede)}
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

        <section
          className="border-t border-line py-12 sm:py-16"
          aria-label="Index"
        >
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="meta text-brass">{asText(home.indexTitle)}</h2>
              <div className="tick-rule flex-1" aria-hidden="true" />
            </div>
            <div className="mt-6">
              {(home.index || []).map((item) => (
                <IndexItem
                  key={item.href}
                  n={asText(item.n)}
                  title={asText(item.title)}
                  meta={asText(item.meta)}
                  href={item.href}
                >
                  {asText(item.blurb)}
                </IndexItem>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-12 sm:py-16">
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="measure">
              <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
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

