"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  staggerParent,
  staggerChildSlide,
  useMotionVariants,
  STAGGER,
  DURATION,
  EASE_OUT_PREMIUM,
  transitionEntrance,
} from "@/lib/motion";

const TITLE_WORDS = ["Taller", "de", "Claude"];
const SUBTITLE =
  "Para alumnos de carreras de negocios. Aprende qué hace Claude además de chatear, qué resuelve para tu trabajo, y qué plan necesitas según el caso.";

const META = [
  { label: "3 horas" },
  { label: "Básico — intermedio" },
  { label: "Funciona desde cuenta gratis" },
];

export function Hero() {
  const parent = useMotionVariants(staggerParent(STAGGER.words));
  const child = useMotionVariants(staggerChildSlide);

  return (
    <header className="relative overflow-hidden">
      {/* Top institutional bar */}
      <div className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3 text-[13px] tracking-[0.06em] text-[var(--color-muted)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="font-medium uppercase tracking-[0.18em]">
              Anthropic · Claude
            </span>
          </div>
          <div className="flex items-center gap-3 text-[13px] text-[var(--color-muted)]">
            <span className="hidden uppercase tracking-[0.18em] md:inline">
              Universidad Peruana de Ciencias Aplicadas
            </span>
            <Image
              src="/upc-logo.png"
              alt="UPC"
              width={28}
              height={28}
              priority
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Hero band */}
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={parent}
          className="grid gap-14 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-8">
            <motion.p
              variants={child}
              className="mb-6 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]"
            >
              Manual del taller
            </motion.p>

            <h1 className="font-display text-[44px] leading-[1.02] tracking-[-0.022em] text-[var(--color-ink)] md:text-[88px] md:leading-[0.98] md:tracking-[-0.028em]">
              {TITLE_WORDS.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  variants={child}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={child}
              className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[var(--color-body)] md:text-xl"
            >
              {SUBTITLE}
            </motion.p>

            <motion.ul
              variants={child}
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3"
            >
              {META.map((m) => (
                <li
                  key={m.label}
                  className="rounded-full border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-4 py-1.5 text-[13px] text-[var(--color-body)]"
                >
                  {m.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Decorative side rail — kept restrained per claude-design */}
          <motion.aside
            variants={child}
            transition={{ ...transitionEntrance, duration: DURATION.xl, ease: EASE_OUT_PREMIUM }}
            className="md:col-span-4"
          >
            <div className="flex h-full flex-col justify-end gap-6 border-l border-[var(--color-hairline)] pl-6 md:pl-10">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Estructura
              </p>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                Ocho bloques navegables. Cada uno es autocontenido — pensado para
                consultarse después del taller, no solo durante.
              </p>
              <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Tres perfiles
              </p>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                Lo que hoy puedes hacer gratis, lo que abre Pro, y lo que solo
                desbloquea Max.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </header>
  );
}
