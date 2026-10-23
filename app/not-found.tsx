/**
 * 404 — the default Next page had no <main id="main">, so the root
 * layout's skip link pointed at nothing here (Otto's QA finding).
 */
export default function NotFound() {
  return (
    <main id="main">
      <div className="mx-auto w-full max-w-4xl px-5 pt-12 pb-20 sm:pt-16">
        <p className="kicker">404</p>
        <h1 className="mt-6 text-[clamp(2.2rem,6vw,4.25rem)] leading-[0.98] font-black tracking-[-0.02em] text-lime uppercase">
          No such page
        </h1>
        <p className="measure mt-6 text-paper/85">
          That path is not here. Back to the{" "}
          <a
            href="/"
            className="text-brass underline decoration-copper/50 underline-offset-4 hover:text-copper"
          >
            homepage
          </a>
          .
        </p>
      </div>
    </main>
  );
}
