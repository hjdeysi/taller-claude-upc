"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline coral progress bar pinned to the very top of the viewport.
 * Tied to global scroll position via useScroll → useSpring for a
 * slightly weighted feel rather than 1:1 jitter. Sits above TabNav
 * (z-50) so it never gets covered.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[var(--color-primary)]"
      style={{ scaleX }}
    />
  );
}
