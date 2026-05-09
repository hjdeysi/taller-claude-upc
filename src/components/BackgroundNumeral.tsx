"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  DURATION,
  EASE_OUT_PREMIUM,
  useReducedMotion,
} from "@/lib/motion";

interface BackgroundNumeralProps {
  number: number;
  position?: "right" | "left";
}

/**
 * Giant serif folio numeral living off-grid behind a Section.
 * Enters with its own delayed timing — independent of the section
 * header — so it reads as ambient atmosphere rather than as part of
 * the title group.
 */
export function BackgroundNumeral({ number, position = "right" }: BackgroundNumeralProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const reduce = useReducedMotion();

  const label = number.toString().padStart(2, "0");

  const positionClass =
    position === "right"
      ? "right-[-4%] md:right-[-3%]"
      : "left-[-4%] md:left-[-3%]";

  return (
    <span
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute top-12 select-none font-display leading-none text-[var(--color-ink)] md:top-20 ${positionClass}`}
      style={{
        fontSize: "clamp(14rem, 32vw, 28rem)",
        fontWeight: 400,
        letterSpacing: "-0.05em",
      }}
    >
      <motion.span
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={inView ? (reduce ? { opacity: 0.04 } : { opacity: 0.04, y: 0 }) : {}}
        transition={{
          duration: DURATION.xl,
          ease: EASE_OUT_PREMIUM,
          delay: reduce ? 0 : 0.35,
        }}
        className="inline-block"
      >
        {label}
      </motion.span>
    </span>
  );
}
