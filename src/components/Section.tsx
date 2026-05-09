"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, useMotionVariants, STAGGER, transitionReveal } from "@/lib/motion";
import { PlanBadge } from "./PlanBadge";
import type { Plan } from "@/lib/sections";

interface SectionProps {
  id: string;
  number?: number;
  title: string;
  subtitle?: string;
  plan?: Plan;
  time?: string;
  children: ReactNode;
}

export function Section({ id, number, title, subtitle, plan, time, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  const variants = useMotionVariants(fadeUp);

  return (
    <section
      ref={ref}
      id={id}
      // scroll-margin-top accounts for the sticky TabNav height
      className="scroll-mt-24 border-t border-[var(--color-hairline)] py-24 first:border-t-0 md:py-32"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER.items, delayChildren: 0.05 } },
        }}
        className="mx-auto max-w-[1200px] px-6 md:px-10"
      >
        <motion.header variants={variants} className="mb-10 flex flex-col gap-3 md:mb-14">
          <div className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {typeof number === "number" && (
              <span className="font-medium tabular-nums">
                Bloque {number.toString().padStart(2, "0")}
              </span>
            )}
            {time && (
              <>
                <span aria-hidden className="text-[var(--color-hairline)]">
                  /
                </span>
                <span>{time}</span>
              </>
            )}
            {plan && (
              <>
                <span aria-hidden className="text-[var(--color-hairline)]">
                  /
                </span>
                <PlanBadge plan={plan} size="sm" />
              </>
            )}
          </div>

          <h2 className="font-display text-4xl leading-[1.05] text-[var(--color-ink)] md:text-6xl">
            {title}
          </h2>

          {subtitle && (
            <p className="max-w-[60ch] text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.header>

        <motion.div variants={variants} transition={transitionReveal}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
