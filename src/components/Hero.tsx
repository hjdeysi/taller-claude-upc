"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { Clock, Layers, BadgeCheck } from "lucide-react";
import upcLogo from "../../public/upc-logo.png";
import {
  staggerParent,
  staggerChildSlide,
  useMotionVariants,
  useReducedMotion,
  STAGGER,
  DURATION,
  EASE_OUT_PREMIUM,
  transitionEntrance,
} from "@/lib/motion";

const TITLE_WORDS = ["Taller", "de", "Claude"];
const SUBTITLE =
  "Para alumnos de carreras de negocios. Aprende qué hace Claude además de chatear, qué resuelve para tu trabajo, y qué plan necesitas según el caso.";

const META = [
  { Icon: Clock, label: "3 horas" },
  { Icon: Layers, label: "Básico — intermedio" },
  { Icon: BadgeCheck, label: "Funciona desde cuenta gratis" },
];

const RAIL = [
  {
    ordinal: "I",
    label: "Estructura",
    body:
      "Ocho bloques navegables. Cada uno autocontenido — pensado para consultarse después del taller, no solo durante.",
  },
  {
    ordinal: "II",
    label: "Tres perfiles",
    body:
      "Lo que hoy puedes hacer gratis, lo que abre Pro, y lo que solo desbloquea Max.",
  },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const parent = useMotionVariants(staggerParent(STAGGER.words));
  const child = useMotionVariants(staggerChildSlide);

  // Cursor glow: a soft coral radial gradient that follows the mouse
  // inside the hero only. Uses motion values (not React state) so the
  // pointer move never triggers a re-render — design-taste-frontend
  // rule on perpetual interactions.
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const cursorGlow = useTransform([mouseX, mouseY], (latest) => {
    const [lx, ly] = latest as [number, number];
    return `radial-gradient(420px circle at ${lx}px ${ly}px, rgba(204, 120, 92, 0.07), transparent 60%)`;
  });

  useEffect(() => {
    if (reduce) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, reduce]);

  return (
    <header ref={heroRef} className="relative isolate overflow-hidden">
      {/* Cursor glow — only when not in reduced-motion mode. */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: cursorGlow }}
        />
      )}

      {/* Ambient watermark — giant serif "C" off-grid bottom-right.
          Decorative, low contrast, deliberately partially clipped. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6%] -bottom-[14%] -z-10 select-none font-display leading-none text-[var(--color-ink)]"
        style={{
          fontSize: "clamp(20rem, 42vw, 40rem)",
          opacity: 0.04,
          letterSpacing: "-0.06em",
        }}
      >
        C
      </span>

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
              src={upcLogo}
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
              className="mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]"
            >
              <span aria-hidden className="block h-px w-6 bg-[var(--color-primary)]" />
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
              {META.map(({ Icon, label }) => (
                <li key={label}>
                  <span
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-4 py-1.5 text-[13px] text-[var(--color-body)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--color-primary-disabled)] hover:text-[var(--color-ink)]"
                  >
                    <Icon
                      aria-hidden
                      strokeWidth={1.5}
                      className="h-3.5 w-3.5 text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                    />
                    {label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right rail — vertical hairline + ordinals + body. */}
          <motion.aside
            variants={child}
            transition={{ ...transitionEntrance, duration: DURATION.xl, ease: EASE_OUT_PREMIUM }}
            className="md:col-span-4"
          >
            <div className="flex h-full flex-col justify-end gap-10 border-l border-[var(--color-hairline)] pl-6 md:pl-10">
              {RAIL.map(({ ordinal, label, body }) => (
                <div key={ordinal} className="space-y-2">
                  <span
                    aria-hidden
                    className="block font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-muted-soft)]"
                  >
                    {ordinal}
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {label}
                  </p>
                  <p className="text-base leading-relaxed text-[var(--color-body)]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </header>
  );
}
