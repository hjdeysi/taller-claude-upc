"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useInView } from "motion/react";
import { Wallet, Clock, BookOpenCheck } from "lucide-react";
import { SECTIONS, type Plan } from "@/lib/sections";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC (in-section scroll-spy). Targets the six anchored
// sub-sections rendered below. Sticky inside the right column so it
// stays in view as the reader scrolls down the article.
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "bienvenida-hook", label: "Apertura" },
  { id: "bienvenida-para-que", label: "Para qué es" },
  { id: "bienvenida-al-final", label: "Al terminar" },
  { id: "bienvenida-otros", label: "Otros asistentes" },
  { id: "bienvenida-antes", label: "Antes de empezar" },
  { id: "bienvenida-estructura", label: "Cómo está estructurado" },
];

const PLAN_DOT: Record<Plan, string> = {
  free: "var(--color-plan-free)",
  pro: "var(--color-plan-pro)",
  max: "var(--color-plan-max)",
  all: "var(--color-hairline)",
};

// ──────────────────────────────────────────────────────────────────────
// Reusable reveal wrapper. Each block fades up once when it enters the
// viewport, independent of the parent Section's outer reveal — keeps
// long articles feeling alive on slow scroll.
// ──────────────────────────────────────────────────────────────────────

function Block({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const variants = useMotionVariants(fadeUp);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Static content blocks — pure data; rendered by the main component.
// ──────────────────────────────────────────────────────────────────────

const AT_END_ITEMS: { question: string; body: string }[] = [
  {
    question: "¿Qué hace Claude más allá de chatear?",
    body: 'Porque la respuesta no es "buscar información" ni "redactar mejores correos". Es algo más interesante, y lo verás en los bloques 2 y 3.',
  },
  {
    question: "¿Qué problemas de mi carrera resuelve mejor que otros asistentes?",
    body: "Investigación de mercado, análisis financiero, automatización de tareas repetitivas, prototipado de herramientas internas, comunicación con clientes y proveedores. El bloque 4 son cuatro demos cortas con casos así.",
  },
  {
    question: "¿Qué plan necesito para mi caso?",
    body: "Porque la decisión de pagar veinte dólares al mes — o cien, o doscientos — debería ser informada y no por moda. Cada bloque te dice qué se puede hacer en cada plan.",
  },
];

const BEFORE_ITEMS = [
  {
    Icon: Wallet,
    title: "Cuenta gratis es suficiente para el 80% del taller.",
    body: "Las partes que requieren Pro o Max te las mostramos en pantalla; no necesitas pagar nada para seguirnos.",
  },
  {
    Icon: Clock,
    title: "Tres horas con una pausa.",
    body: "Quince minutos a la mitad para estirar las piernas y procesar.",
  },
  {
    Icon: BookOpenCheck,
    title: "El manual queda como referencia.",
    body: "Cuando dos semanas más tarde quieras hacer algo que recuerdas que vimos pero no recuerdas cómo, esto sigue acá.",
  },
];

// Skip the welcome block itself in the structure list — readers are
// already inside it.
const STRUCTURE_BLOCKS = SECTIONS.filter((s) => s.number > 0);

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function Bienvenida() {
  const [activeTOC, setActiveTOC] = useState<string>(TOC_ITEMS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveTOC(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.3, 0.6, 1] },
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function onTOCClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveTOC(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  function onStructureClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-12">
      {/* Article */}
      <article className="space-y-16 md:col-span-8 md:space-y-20">
        {/* Hook */}
        <Block id="bienvenida-hook">
          <blockquote className="pull-quote">
            <p>
              Pides una calculadora de margen para tu negocio. ¿Te gustaría que
              tu IA te explique cómo construirla en Excel, o prefieres que te
              entregue la calculadora ya hecha y funcionando?
            </p>
          </blockquote>
        </Block>

        {/* Lead with drop cap */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            La diferencia entre esas dos respuestas es la diferencia entre tener
            IA y saber usarla. Casi todos los chatbots actuales se quedan en la
            primera. Claude se está moviendo hacia la segunda — y este taller
            existe para que tú no te enteres cinco años tarde.
          </p>
        </Block>

        {/* Para qué es este taller */}
        <Block id="bienvenida-para-que" className="space-y-5">
          <SectionHeading eyebrow="Sección" title="Para qué es este taller" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tres horas. Diseñado para alumnos de carreras de negocios —
            marketing, finanzas, administración, negocios internacionales,
            hospitalidad. Cero requisitos técnicos. La meta no es convertirte en
            programador. La meta es que entiendas qué problemas reales de tu
            carrera puede resolver una herramienta como Claude, y hasta dónde
            puedes llegar con la cuenta gratis antes de que pagar valga la pena.
          </p>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Llegas con un caso — real o inventado: tu empresa, tu idea, tu
            marca, tu trabajo. Te vas con cuatro o cinco formas concretas de
            usar Claude que probablemente no conocías.
          </p>
        </Block>

        {/* Lo que vas a poder responder al final */}
        <Block id="bienvenida-al-final" className="space-y-8">
          <SectionHeading
            eyebrow="Sección"
            title="Lo que vas a poder responder al final"
          />
          <ol className="space-y-7">
            {AT_END_ITEMS.map((item, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <span
                  aria-hidden
                  className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                  {item.question}
                </h4>
                <p className="text-base leading-relaxed text-[var(--color-body)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Block>

        {/* Una nota sobre los otros asistentes */}
        <Block id="bienvenida-otros" className="space-y-5">
          <SectionHeading
            eyebrow="Sección"
            title="Una nota sobre los otros asistentes"
          />
          <div className="callout-aside space-y-4">
            <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
              ChatGPT y Perplexity también existen, los conoces, los has usado.
              No los vamos a descalificar. Lo honesto es esto:
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)]">
              <strong className="font-semibold text-[var(--color-ink)]">
                Perplexity
              </strong>{" "}
              es básicamente búsqueda con IA encima. Cuando lo que necesitas es
              buscar y citar, funciona muy bien. Cuando necesitas que la IA
              además escriba, analice, construya o automatice, Perplexity se
              queda corto por diseño — no es lo que intenta ser.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)]">
              <strong className="font-semibold text-[var(--color-ink)]">
                ChatGPT
              </strong>{" "}
              está al mismo nivel de Claude en calidad de conversación. La
              diferencia está en lo que rodea la conversación: cómo se
              especializa con Skills, cómo construye herramientas funcionales
              con Artifacts, cómo recuerda tu contexto entre sesiones, cómo
              opera tu computador. En esa pelea, Claude está apostando más
              fuerte.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)]">
              A lo largo del manual vamos a mostrar dónde Claude pisa más firme.
              Sin pretender que es el único en el mundo.
            </p>
          </div>
        </Block>

        {/* Antes de empezar */}
        <Block id="bienvenida-antes" className="space-y-5">
          <SectionHeading eyebrow="Sección" title="Antes de empezar" />
          <ul className="space-y-6">
            {BEFORE_ITEMS.map(({ Icon, title, body }) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
                <span
                  aria-hidden
                  className="mt-1 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-primary)]"
                >
                  <Icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
                </span>
                <h4 className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
                  {title}
                </h4>
                <span aria-hidden />
                <p className="text-base leading-relaxed text-[var(--color-body)]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        {/* Cómo está estructurado */}
        <Block id="bienvenida-estructura" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Cómo está estructurado" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Ocho bloques. Cada uno se sostiene solo y puedes saltar entre ellos
            cuando uses el manual como referencia.
          </p>
          <StructureList onClick={onStructureClick} />
        </Block>
      </article>

      {/* Mini-TOC sidebar */}
      <aside className="md:col-span-4">
        <div className="sticky top-[5.5rem]">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            En esta sección
          </p>
          <nav>
            <ul className="space-y-1">
              {TOC_ITEMS.map((item, i) => {
                const isActive = item.id === activeTOC;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => onTOCClick(e, item.id)}
                      className="group flex items-baseline gap-3 rounded-md py-2 pl-3 pr-2 transition-all duration-300 hover:-translate-y-[1px] hover:bg-[var(--color-surface-soft)]"
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        aria-hidden
                        className="font-mono tabular-nums text-[10px] tracking-[0.08em] transition-colors duration-300"
                        style={{
                          color: isActive
                            ? "var(--color-primary)"
                            : "var(--color-muted-soft)",
                        }}
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm transition-colors duration-300"
                        style={{
                          color: isActive
                            ? "var(--color-ink)"
                            : "var(--color-muted)",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Local helpers
// ──────────────────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
          {eyebrow}
        </span>
      </div>
      <h3 className="font-display text-3xl leading-[1.1] text-[var(--color-ink)] md:text-4xl">
        {title}
      </h3>
    </div>
  );
}

function StructureList({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: STAGGER.items, delayChildren: 0.05 } },
      }}
      className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]"
    >
      {STRUCTURE_BLOCKS.map((s) => (
        <StructureRow key={s.id} section={s} onClick={onClick} />
      ))}
    </motion.ul>
  );
}

function StructureRow({
  section,
  onClick,
}: {
  section: typeof STRUCTURE_BLOCKS[number];
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const variants = useMotionVariants(fadeUp);
  return (
    <motion.li variants={variants}>
      <a
        href={`#${section.id}`}
        onClick={(e) => onClick(e, section.id)}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-5 transition-colors duration-300 hover:bg-[var(--color-surface-soft)]/60"
      >
        <span
          aria-hidden
          className="select-none font-display text-4xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] transition-colors duration-300 group-hover:text-[var(--color-primary)] md:text-5xl"
        >
          {section.number.toString().padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
            {section.shortTitle}
          </h4>
          <p className="text-sm text-[var(--color-muted)] md:text-base">
            {section.blurb}
          </p>
        </div>
        <span className="hidden items-center gap-2 sm:flex">
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: PLAN_DOT[section.plan] }}
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {section.plan === "all" ? "—" : section.plan}
          </span>
        </span>
      </a>
    </motion.li>
  );
}
