import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line/80 pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="mx-auto w-full max-w-5xl px-5">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/80">
          {lede}
        </p>
        {children}
      </div>
    </header>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line/60 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-5">
        <h2 className="font-display text-2xl tracking-tight text-bone sm:text-3xl">
          {title}
        </h2>
        <div className="mt-6 space-y-5">{children}</div>
      </div>
    </section>
  );
}

export function MetaList({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.k} className="flex flex-col gap-0.5">
          <dt className="font-mono text-[0.7rem] tracking-wide text-muted uppercase">
            {item.k}
          </dt>
          <dd className="text-sm text-bone/90">{item.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCard({
  name,
  blurb,
  meta,
  href,
}: {
  name: string;
  blurb: string;
  meta: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl text-bone">{name}</h3>
        <span className="font-mono text-[0.7rem] text-muted">{meta}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-line bg-ink/40 p-5 transition-colors hover:border-yarn/40 hover:bg-bone/[0.03]"
      >
        {body}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-ink/40 p-5">{body}</div>
  );
}
