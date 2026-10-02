import { shared } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-paper">{shared.brandName}</p>
          <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
            {shared.tagline}
          </p>
        </div>
        <ul className="flex flex-wrap gap-5">
          {(shared.footerLinks as Array<{
            label: string;
            href: string;
            download?: string;
          }>).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                download={link.download}
                className="font-mono text-[0.72rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-brass"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
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
