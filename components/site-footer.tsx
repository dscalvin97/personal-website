const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dscalvin" },
  { label: "GitHub", href: "https://github.com/dscalvin97" },
  { label: "Gumroad", href: "https://dscalvin.gumroad.com/" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Calvin Dsouza · Mumbai · open to interesting work
        </p>
        <ul className="flex flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone/80 underline-offset-4 hover:text-yarn hover:underline"
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
