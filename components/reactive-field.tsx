"use client";

import { useEffect, useRef } from "react";

/**
 * BG1 reactive dots — site-wide background field.
 *
 * One rAF per pointer batch, nothing scheduled when idle (Yuki's
 * idle-zero rule). Listeners are never attached under
 * prefers-reduced-motion, and are torn down if the setting flips
 * mid-session. Mouse pointers only: touch drags hand off to
 * scrolling and would repaint the fixed layer during scroll for
 * no benefit (parallax from a drag is meaningless without hover).
 * No WebGL, no library — CSS custom properties + @property smoothing.
 */
export function ReactiveField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf: number | null = null;
    let mx = 0.5;
    let my = 0.5;

    // Fixed layer: the rect is the viewport. Cache it, refresh on resize.
    let w = window.innerWidth;
    let h = window.innerHeight;

    function schedule() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        layer!.style.setProperty("--mx", mx.toFixed(3));
        layer!.style.setProperty("--my", my.toFixed(3));
      });
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      if (document.documentElement.classList.contains("no-field")) return;
      mx = e.clientX / w;
      my = e.clientY / h;
      schedule();
    }

    function onPointerLeave() {
      mx = 0.5;
      my = 0.5;
      schedule();
    }

    function onResize() {
      w = window.innerWidth;
      h = window.innerHeight;
    }

    function attach() {
      window.addEventListener("pointermove", onPointerMove);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("resize", onResize);
    }

    function detach() {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    if (!reduce.matches) attach();
    reduce.addEventListener("change", () => {
      if (reduce.matches) detach();
      else attach();
    });

    return detach;
  }, []);

  return (
    <div ref={ref} className="field" aria-hidden="true">
      <div className="layer far" />
      <div className="layer near" />
      <div className="scan" />
      <div className="blob a" />
      <div className="blob b" />
    </div>
  );
}
