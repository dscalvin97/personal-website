import type { CSSProperties, ReactNode } from "react";

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
    <header className="border-b border-line pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="mx-auto w-full max-w-4xl px-5 enter">
        <p
          className="meta text-copper"
          style={{ "--i": 0 } as CSSProperties}
        >
          {index} — {eyebrow}
        </p>
        <h1
          className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-paper"
          style={{ "--i": 1 } as CSSProperties}
        >
          {title}
        </h1>
        <p
          className="measure mt-6 text-base leading-relaxed text-paper/80 sm:text-lg"
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
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="meta text-brass">{label}</h2>
          <div className="tick-rule hidden flex-1 sm:block" aria-hidden="true" />
        </div>
        <div className="mt-6">{children}</div>
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
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <div
          key={item.k}
          className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
        >
          <dt className="meta text-muted">{item.k}</dt>
          <dd className="text-sm leading-relaxed text-paper/90 sm:text-[0.95rem]">
            {item.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function IndexItem({
  n,
  title,
  meta,
  href,
  children,
}: {
  n: string;
  title: string;
  meta: string;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="meta text-copper">{n}</span>
      <div>
        <h3 className="index-title font-display text-2xl leading-tight text-paper transition-colors sm:text-[1.75rem]">
          {title}
        </h3>
        <div className="measure mt-2 text-sm leading-relaxed text-muted">
          {children}
        </div>
      </div>
      <span className="index-meta meta text-muted sm:text-right">{meta}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="index-row reveal"
      >
        {body}
      </a>
    );
  }

  return <div className="index-row reveal">{body}</div>;
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
