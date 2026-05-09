"use client";

import { motion } from "motion/react";
import {
  fadeUp,
  STAGGER,
  transitionReveal,
  useMotionVariants,
} from "@/lib/motion";

interface SectionEmptyStateProps {
  number: number;
  title: string;
}

/**
 * Default body for a Section that has no content yet. Communicates
 * "this is being built", not "this was abandoned".
 *
 * Two columns:
 *  - Main: skeleton bars hinting at future paragraph rhythm + the
 *    explicit placeholder text the user wants preserved.
 *  - Side rail: vertical hairline + 5 dots representing future
 *    sub-topics. Purely structural — no fake topic names.
 */
export function SectionEmptyState({ number, title }: SectionEmptyStateProps) {
  const variants = useMotionVariants(fadeUp);
  const label = number.toString().padStart(2, "0");

  // Varying widths so the skeleton reads as paragraph-shaped rather
  // than as a uniform progress bar.
  const skeletonWidths = ["92%", "76%", "84%", "58%"];

  return (
    <motion.div
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: STAGGER.items, delayChildren: 0.15 } },
      }}
      className="grid gap-12 md:grid-cols-12 md:gap-10"
    >
      {/* Main column */}
      <motion.div variants={variants} className="md:col-span-8">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden
            className="block h-px w-8 bg-[var(--color-primary)]"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
            En preparación
          </span>
        </div>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="space-y-3"
        >
          {skeletonWidths.map((w, i) => (
            <motion.div
              key={i}
              variants={variants}
              className="skeleton-bar"
              style={{ width: w, height: i === 0 ? "1rem" : "0.75rem" }}
            />
          ))}
        </motion.div>

        <motion.p
          variants={variants}
          transition={transitionReveal}
          className="mt-8 text-sm leading-relaxed text-[var(--color-muted)]"
        >
          Bloque {label} · {title} — contenido pendiente.
        </motion.p>
      </motion.div>

      {/* Side rail */}
      <motion.aside
        variants={variants}
        className="md:col-span-4"
      >
        <div className="border-l border-[var(--color-hairline)] pl-6 md:pl-8">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Lo que viene
          </p>
          <ul className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      i === 0 ? "var(--color-primary)" : "var(--color-hairline)",
                  }}
                />
                <span
                  aria-hidden
                  className="block h-px flex-1 bg-[var(--color-hairline)]"
                  style={{ maxWidth: `${75 - i * 8}%` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </motion.div>
  );
}
