import type { CSSProperties, ReactNode } from "react";

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
      <div className="mx-auto w-full max-w-5xl px-5 enter">
        <p
          className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
          style={{ "--i": 0 } as CSSProperties}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl md:text-6xl"
          style={{ "--i": 1 } as CSSProperties}
        >
          {title}
        </h1>
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed text-bone/80"
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
  title,
  children,
  accent = "yarn",
}: {
  title: string;
  children: ReactNode;
  accent?: "yarn" | "coral" | "studio" | "sage";
}) {
  const bar =
    accent === "coral"
      ? "bg-coral/70"
      : accent === "studio"
        ? "bg-studio/70"
        : accent === "sage"
          ? "bg-sage/70"
          : "bg-yarn/70";

  return (
    <section className="border-b border-line/60 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-px ${bar}`} aria-hidden="true" />
          <h2 className="font-display text-2xl tracking-tight text-bone sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="stitch-rule mt-4" aria-hidden="true" />
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
      <span
        className="mt-4 block h-px w-10 origin-left scale-x-0 bg-yarn transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-line bg-ink/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yarn/40 hover:bg-bone/[0.03]"
      >
        {body}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-ink/40 p-5">{body}</div>
  );
}
