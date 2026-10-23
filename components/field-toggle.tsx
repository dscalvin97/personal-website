"use client";

import { useEffect, useState } from "react";

/**
 * EXTRA 1 bracket toggle — real control over the reactive background
 * field (bg=dots on/off). Native checkbox = keyboard + screen-reader
 * free (the reason this element was picked). Preference persists in
 * localStorage; the pre-paint inline script in app/layout.tsx applies
 * it before first paint, this just keeps the widget in sync.
 */
export function FieldToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(!document.documentElement.classList.contains("no-field"));
  }, []);

  return (
    <label className="x1">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => {
          const next = e.target.checked;
          setOn(next);
          document.documentElement.classList.toggle("no-field", !next);
          try {
            localStorage.setItem("cf-field", next ? "1" : "0");
          } catch {
            /* storage unavailable — toggle still works for this session */
          }
        }}
      />
      <span className="tr" aria-hidden="true">
        <i />
      </span>
      <span className="lb">bg=dots</span>
    </label>
  );
}
