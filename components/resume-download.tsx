export function ResumeDownload({
  className = "",
  label = "Download resume",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href="/calvin-dsouza-resume.pdf"
      download="Calvin-Dsouza-Resume.pdf"
      className={
        className ||
        "inline-flex items-center gap-2 rounded-sm border border-copper bg-copper/10 px-4 py-2 font-mono text-[0.72rem] tracking-[0.14em] text-brass uppercase transition-colors hover:bg-copper hover:text-ink"
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 2v8m0 0L5 7m3 3 3-3M3 12.5h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}
