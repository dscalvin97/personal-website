import { FieldToggle } from "@/components/field-toggle";
import { profile } from "@/lib/content";

/**
 * FOOTER 5 + 7 (locked): man page over colophon strip.
 * All copy verbatim from discussions/2026-10-23-copy-round.md;
 * every target verified in content/profile.json.
 */
export function SiteFooter() {
  const ext = {
    target: "_blank",
    rel: "noopener noreferrer",
  } as const;

  return (
    <footer className="border-t-2 border-edge">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="man">
          <div className="hd">
            CALVIN(1)&nbsp;&nbsp;&nbsp;&nbsp;General Commands
            Manual&nbsp;&nbsp;&nbsp;&nbsp;CALVIN(1)
          </div>
          <b>NAME</b>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;calvin — makes software, 3D renders, and
          crochet patterns
          <br />
          <b>SYNOPSIS</b>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;calvin{" "}
          <span className="args">[software|3d|craft] [--based mumbai]</span>
          <br />
          <b>SEE ALSO</b>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="also">
            <a href={`mailto:${profile.email}`}>mail</a>(1){" "}
            <a href={profile.resumePdf} download="Calvin-Dsouza-Resume.pdf">
              cv
            </a>
            (1){" "}
            <a href={profile.links.github} {...ext}>
              github
            </a>
            (1){" "}
            <a href={profile.links.gumroad} {...ext}>
              gumroad
            </a>
            (1){" "}
            <a href={profile.links.linkedin} {...ext}>
              linkedin
            </a>
            (1)
          </span>
        </div>
        <div className="colophon mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p>
            No cookies. No trackers. No newsletter pop-up. Set in Geist Mono and
            Schibsted Grotesk,{" "}
            <a href="https://nextjs.org" {...ext}>
              built with Next.js
            </a>
            .{" "}
            <a href="https://github.com/dscalvin97/personal-website" {...ext}>
              source
            </a>{" "}
            · <a href="/sitemap.xml">sitemap</a>
          </p>
          <FieldToggle />
        </div>
      </div>
    </footer>
  );
}
