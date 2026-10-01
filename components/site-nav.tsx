import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/developer/", label: "Developer" },
  { href: "/studio/", label: "3D" },
  { href: "/craft/", label: "Craft" },
] as const;

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-line/80 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-bone hover:text-yarn"
        >
          Calvin Dsouza
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-2 py-1.5 text-[0.8rem] text-muted transition-colors hover:bg-bone/5 hover:text-bone sm:px-2.5 sm:text-sm"
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
