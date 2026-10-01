import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/developer/", label: "Dev" },
  { href: "/studio/", label: "3D" },
  { href: "/craft/", label: "Craft" },
] as const;

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full max-w-4xl items-center justify-between px-5 sm:h-14">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-tight text-paper hover:text-brass"
        >
          Calvin Dsouza
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm px-2 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase transition-colors hover:bg-copper/10 hover:text-brass sm:px-2.5 sm:text-[0.72rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
