"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { SECTIONS } from "@/lib/sections";
import { transitionLayout } from "@/lib/motion";

export function TabNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Negative rootMargin biases activation to the top third of the viewport,
    // so the active tab follows what the reader is reading, not what's barely
    // peeking at the bottom edge.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = visible[0].target.id;
          if (id) setActiveId(id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      aria-label="Bloques del manual"
      className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ul className="-mx-2 flex items-stretch gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-3 md:gap-1 [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  className="group relative flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium leading-tight transition-colors duration-200 hover:text-[var(--color-ink)]"
                  style={{
                    color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="tabular-nums text-[11px] tracking-[0.1em] text-[var(--color-muted-soft)]">
                    {s.number.toString().padStart(2, "0")}
                  </span>
                  <span>{s.shortTitle}</span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      transition={transitionLayout}
                      aria-hidden
                      className="absolute inset-x-2 -bottom-[12px] h-[2px] rounded-full bg-[var(--color-primary)]"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
