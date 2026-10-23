"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  applyPreviewPage,
  useCmsPreview,
} from "@/components/cms-preview";
import { shared as baseShared } from "@/lib/content";

type Shared = typeof baseShared;

export function useSharedDraft(): Shared {
  const preview = useCmsPreview();
  return applyPreviewPage(
    baseShared,
    preview.payload,
    "shared",
    preview.nonce
  );
}

/**
 * NAV 3 — shell status line with descriptor subtitles (locked).
 * Floors (Elena): label >=14px, descriptor >=12px inside the same
 * anchor, descriptor only >=640px (her ruling — mobile is
 * labels-only >=14px, descriptors live in each page's own lede),
 * solid background so contrast never depends on scrolled content,
 * header h-auto (wraps, never clips), aria-current on the active
 * slot, no tooltips. The `● online` dot is static (WCAG 2.2.2).
 */
export function SiteNav() {
  const shared = useSharedDraft();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.replace(/\/$/, "");
    return pathname === base || pathname === `${base}/`;
  };

  return (
    <header className="sticky top-0 z-20 bg-term">
      <div className="mx-auto w-full max-w-4xl px-5 py-3">
        <div className="flex w-full flex-wrap items-center gap-x-1 gap-y-1 border-2 border-edge bg-blk px-3 py-2 font-mono text-sm">
          <Link
            href="/"
            className="mr-1 px-2 py-1 font-bold text-lime hover:bg-lime hover:text-blk focus-visible:bg-lime focus-visible:text-blk"
          >
            calvin.makes.fyi&nbsp;$
          </Link>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
              {(shared.nav || []).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group block border-2 border-transparent px-2 py-1 text-sm text-wht hover:border-lime hover:bg-lime hover:text-blk focus-visible:border-lime focus-visible:bg-lime focus-visible:text-blk"
                  >
                    {item.label}
                    {"descriptor" in item && item.descriptor ? (
                      <span className="hidden pt-0.5 text-xs font-normal text-note group-hover:text-blk group-focus-visible:text-blk sm:block">
                        {item.descriptor}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span className="ml-auto hidden px-2 text-xs text-dim sm:block">
            ● online
          </span>
        </div>
      </div>
    </header>
  );
}
