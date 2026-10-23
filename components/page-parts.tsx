import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export function PageHeader({
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b-2 pt-12 pb-12 sm:pt-16 sm:pb-16">
      <div className="mx-auto w-full max-w-4xl px-5 enter">
        <p className="kicker" style={{ "--i": 0 } as CSSProperties}>
          {index} — {eyebrow}
        </p>
        <h1
          className="mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.25rem)] leading-[0.98] font-black tracking-[-0.02em] text-lime uppercase"
          style={{ "--i": 1 } as CSSProperties}
        >
          {title}
        </h1>
        <p
          className="measure mt-6 text-base leading-relaxed text-paper/85 sm:text-lg"
          style={{ "--i": 2 } as CSSProperties}
        >
          {lede}
        </p>
        {children}
      </div>
    </header>
  );
}

export function Section({
  label,
  narrow,
  children,
}: {
  label: string;
  /** Reading-column rhythm (Leo's /studio assignment). */
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="border-b-2 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-black tracking-wide text-wht uppercase sm:text-xl">
            {label}
          </h2>
          <div className="tick-rule hidden flex-1 sm:block" aria-hidden="true" />
        </div>
        <div className={narrow ? "mt-6 max-w-2xl" : "mt-6"}>{children}</div>
      </div>
    </section>
  );
}

export function SpecList({
  items,
}: {
  items: { k: string; v: string }[];
}) {
  return (
    <dl className="divide-y border-y">
      {items.map((item) => (
        <div
          key={item.k}
          className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
        >
          <dt className="meta font-bold text-grn">{item.k}</dt>
          <dd className="text-sm leading-relaxed text-paper/90 sm:text-[0.95rem]">
            {item.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * CARD 2 directory row (locked index/card element) + HOVER 4 caret
 * invert on link rows. kind="dir" appends the lime `/` and defaults
 * to `drwxr-xr-x`; kind="file" defaults to `-rw-r--r--`.
 */
export function DirRow({
  kind = "file",
  perm,
  name,
  size,
  blurb,
  href,
}: {
  kind?: "dir" | "file";
  perm?: string;
  name: string;
  size?: string;
  blurb?: string;
  href?: string;
}) {
  const cls = `dirrow reveal${kind === "file" ? " file" : ""}`;
  const external = !!href && /^https?:\/\//.test(href);
  const body = (
    <>
      <span className="perm">
        {perm ?? (kind === "dir" ? "drwxr-xr-x" : "-rw-r--r--")}
      </span>
      <span className="nm">{name}</span>
      {size ? <span className="sz">{size}</span> : null}
      {blurb ? <span className="bl">{blurb}</span> : null}
    </>
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {body}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
}

export function LinkLine({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "text-brass underline decoration-copper/50 underline-offset-4 transition-colors hover:text-copper";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
