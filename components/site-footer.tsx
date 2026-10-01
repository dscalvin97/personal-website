const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dscalvin" },
  { label: "GitHub", href: "https://github.com/dscalvin97" },
  { label: "Gumroad", href: "https://dscalvin.gumroad.com/" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-paper">Calvin Dsouza</p>
          <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
            Mumbai · software · 3D · fiber
          </p>
        </div>
        <ul className="flex flex-wrap gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-brass"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
