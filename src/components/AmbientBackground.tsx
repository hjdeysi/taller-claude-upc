/**
 * Page-wide ambient breathing gradient. Two faintly tinted radial
 * gradients drift in opposite phases over 14-18s. Visible enough to
 * give the cream canvas a sense of depth, invisible enough that no
 * single frame draws attention away from the editorial content.
 *
 * Pure CSS — no JS subscription, no per-frame paint cost. Pauses
 * automatically under prefers-reduced-motion via the global rule.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="ambient-breath absolute -inset-[10%]"
        style={{
          background:
            "radial-gradient(60vw 50vh at 25% 30%, rgba(204, 120, 92, 0.07), transparent 65%)",
        }}
      />
      <div
        className="ambient-breath-counter absolute -inset-[10%]"
        style={{
          background:
            "radial-gradient(55vw 45vh at 80% 70%, rgba(232, 165, 90, 0.05), transparent 65%)",
        }}
      />
    </div>
  );
}
