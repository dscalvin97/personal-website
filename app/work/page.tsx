import type { Metadata } from "next";

// /work merged into /developer (confirmed structural decision).
// Static export can't send a real 301 (redirects() is unsupported
// under output:"export" — Next 16 static-exports doc), so this stub
// emits the same 0-delay meta refresh Next itself emits for
// permanentRedirect(), with a visible fallback link for no-JS.
export const metadata: Metadata = {
  title: "Work",
  alternates: { canonical: "/developer/" },
  robots: { index: false },
};

export default function WorkPage() {
  return (
    <main id="main">
      <meta httpEquiv="refresh" content="0;url=/developer/" />
      <div className="mx-auto w-full max-w-4xl px-5 pt-12 pb-20 sm:pt-16">
        <p className="kicker">moved</p>
        <h1 className="mt-6 text-[clamp(2.2rem,6vw,4.25rem)] leading-[0.98] font-black tracking-[-0.02em] text-lime uppercase">
          Work lives under Software now
        </h1>
        <p className="measure mt-6 text-paper/85">
          Roles, education, highlights, and the full timeline are on the{" "}
          <a
            href="/developer/"
            className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
          >
            software page
          </a>
          .
        </p>
      </div>
    </main>
  );
}
