"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

/** Locked command set — discussions/2026-10-23-copy-round.md §6. */
export type Command = "get_cv" | "shop_patterns" | "mail_calvin" | "copy_email";

/**
 * BLEND B command bar (locked): a 7px under-edge that collapses into
 * the page on press. copy_email uses MOTION 2's stamp as its
 * confirmation — no toast; the label swaps to "copied" too, which is
 * the confirmation users get when animations are off (reduce-motion).
 */
export function CommandButton({ command }: { command: Command }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    []
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      return; // clipboard unavailable — no stamp, no lie
    }
    setCopied(true);
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  const prompt = <span className="p">&gt;</span>;

  if (command === "copy_email") {
    return (
      <>
        <button
          type="button"
          onClick={copyEmail}
          className={`cmd${copied ? " stamped" : ""}`}
        >
          {prompt} {copied ? "copied ✓" : "copy_email"}
        </button>
        {/* 4.1.3 status message: the stamp alone is visual-only feedback */}
        <span role="status" className="sr-only">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </>
    );
  }

  if (command === "get_cv") {
    return (
      <a
        className="cmd"
        href={profile.resumePdf}
        download="Calvin-Dsouza-Resume.pdf"
      >
        {prompt} get_cv
      </a>
    );
  }

  if (command === "shop_patterns") {
    return (
      <a
        className="cmd"
        href={profile.links.gumroad}
        target="_blank"
        rel="noopener noreferrer"
      >
        {prompt} shop_patterns
      </a>
    );
  }

  return (
    <a className="cmd" href={`mailto:${profile.email}`}>
      {prompt} mail_calvin
    </a>
  );
}
