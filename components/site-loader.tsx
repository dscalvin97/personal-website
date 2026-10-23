/**
 * MOTION 3 site loader — static HTML in the export, pure CSS timeline
 * (see .site-loader / .boot in globals.css). Content underneath renders
 * at first paint; this is a thin layer on top, not a wait. No JS: it
 * hides itself via CSS, skips entirely under prefers-reduced-motion,
 * and can never trap input (pointer-events:none from the start).
 */
export function SiteLoader() {
  return (
    <div className="site-loader" aria-hidden="true">
      <div className="boot">
        <div className="ll l1">&gt; booting calvin.makes.fyi</div>
        <div className="ll l2">✓ fetching taste…</div>
        <div className="ll l3">✓ inflating the 3d…</div>
        <div className="ll l4">✓ untangling yarn…</div>
        <div className="rdy">ready ▊</div>
      </div>
    </div>
  );
}
