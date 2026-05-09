/**
 * Motion system for Taller-Claude.
 *
 * The page should feel alive but never showy. Claude's design system is
 * editorial-restrained — entrance choreography elevates it; perpetual loops
 * or magnetic effects would break the tone. Stick to fade + small y-translate
 * with premium easing curves.
 *
 * All future components should reuse these constants. Don't reinvent curves.
 */

import { useReducedMotion, type Transition, type Variants } from "motion/react";

// ──────────────────────────────────────────────────────────────────────────
// Curves
// ──────────────────────────────────────────────────────────────────────────

/** Premium ease-out. Sharp departure, soft landing. Default for entrances. */
export const EASE_OUT_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gentler ease-out for section reveals — less aggressive overshoot feel. */
export const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** For layout transitions (TabNav indicator). Spring is overkill here. */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

// ──────────────────────────────────────────────────────────────────────────
// Durations (seconds)
// ──────────────────────────────────────────────────────────────────────────

export const DURATION = {
  xs: 0.2,
  sm: 0.4,
  md: 0.6,
  lg: 0.8,
  xl: 1.1,
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Stagger times (seconds between siblings)
// ──────────────────────────────────────────────────────────────────────────

export const STAGGER = {
  letters: 0.025,
  words: 0.07,
  items: 0.08,
  sections: 0.12,
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Reusable transitions
// ──────────────────────────────────────────────────────────────────────────

export const transitionEntrance: Transition = {
  duration: DURATION.lg,
  ease: EASE_OUT_PREMIUM,
};

export const transitionReveal: Transition = {
  duration: DURATION.md,
  ease: EASE_OUT_SOFT,
};

export const transitionLayout: Transition = {
  duration: DURATION.sm,
  ease: EASE_IN_OUT,
};

// ──────────────────────────────────────────────────────────────────────────
// Reusable variants
// ──────────────────────────────────────────────────────────────────────────

/** Fade + small y-translate. The default reveal pattern. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transitionReveal },
};

/** For Hero word/letter staggers. Children inherit transitionEntrance. */
export const staggerParent = (stagger: number = STAGGER.words): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

export const staggerChildSlide: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionEntrance,
  },
};

// ──────────────────────────────────────────────────────────────────────────
// Reduced-motion bridge
// ──────────────────────────────────────────────────────────────────────────

/**
 * Returns variants stripped down to fade-only when the user prefers reduced
 * motion. Keep components readable: they consume the same `hidden`/`show`
 * keys, but the y-translate and blur are zeroed out.
 */
export function useMotionVariants(base: Variants): Variants {
  const reduce = useReducedMotion();
  if (!reduce) return base;

  const reduced: Variants = {};
  for (const key of Object.keys(base)) {
    const v = base[key];
    if (typeof v === "object" && v !== null) {
      const { y: _y, x: _x, scale: _s, filter: _f, ...rest } = v as Record<string, unknown>;
      reduced[key] = { ...rest, transition: transitionReveal };
    } else {
      reduced[key] = v;
    }
  }
  return reduced;
}

export { useReducedMotion };
