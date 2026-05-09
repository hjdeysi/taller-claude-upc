"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "skills-funcionan", label: "Cómo funcionan" },
  { id: "skills-demo", label: "El demo" },
  { id: "skills-carrera", label: "Para tu carrera" },
  { id: "skills-empezar", label: "Cómo empezar" },
  { id: "skills-llevar", label: "Para llevarte algo" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block + SectionHeading (shared idiom)
// ──────────────────────────────────────────────────────────────────────

function Block({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
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

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
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

// ──────────────────────────────────────────────────────────────────────
// "Cómo funcionan" — sober editorial flow diagram.
// Boxes with hairline borders + ArrowRight connectors. On mobile the
// whole thing rotates to a vertical stack via flex-col.
// ──────────────────────────────────────────────────────────────────────

function FlowDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-3">
      <FlowNode>Tu mensaje</FlowNode>
      <FlowArrow />
      <FlowNode>Claude lee headers</FlowNode>
      <FlowArrow />
      <div className="flex flex-col gap-2">
        <FlowNode small accent>
          <span className="text-[var(--color-primary)]">match</span> · carga skill completa
        </FlowNode>
        <FlowNode small>
          <span className="text-[var(--color-muted)]">no match</span> · nada cambia
        </FlowNode>
      </div>
    </div>
  );
}

function FlowNode({
  children,
  small = false,
  accent = false,
}: {
  children: ReactNode;
  small?: boolean;
  accent?: boolean;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-md border bg-[var(--color-canvas)] px-4 py-2.5 text-center font-mono text-[12px] leading-tight tracking-[0.04em] md:px-5 md:py-3 md:text-[13px]"
      style={{
        borderColor: accent
          ? "var(--color-primary-disabled)"
          : "var(--color-hairline)",
        color: small ? "var(--color-body)" : "var(--color-body-strong)",
        minWidth: small ? "auto" : undefined,
      }}
    >
      {children}
    </span>
  );
}

function FlowArrow() {
  return (
    <ArrowRight
      aria-hidden
      strokeWidth={1.25}
      className="h-4 w-4 shrink-0 self-center text-[var(--color-muted-soft)] rotate-90 md:rotate-0"
    />
  );
}

// ──────────────────────────────────────────────────────────────────────
// Demo comparison — visual anchor of the block
// "Sin Skill" subdued (surface-soft, body-strong leads, muted body,
// compact spacing). "Con Skill" brighter (surface-card, ink leads,
// body-strong body, generous spacing, coral eyebrow + dot).
// 200ms stagger between the two columns.
// ──────────────────────────────────────────────────────────────────────

const SIN_SKILL_ITEMS = [
  {
    lead: "Estructura típica",
    body: "hero, lista de features, sección de testimonios, footer con CTA.",
  },
  {
    lead: "Copy correcto pero plano",
    body:
      "titulares predecibles, párrafos que podrían ser de cualquier marca, sin jerarquía de objeciones.",
  },
  {
    lead: "Diseño previsible",
    body:
      "estructura horizontal estándar, paleta neutra, layout que has visto cien veces.",
  },
];

const CON_SKILL_ITEMS = [
  {
    lead: "Antes de empezar",
    body:
      "Claude pide los datos que la skill sabe que necesita: posicionamiento exacto, audiencia primaria, objeción principal del comprador, prueba social disponible.",
  },
  {
    lead: "Estructura jerárquica",
    body:
      "objeción → promesa → evidencia, construida con un framework de copy probado.",
  },
  {
    lead: "Copy específico a tu negocio",
    body:
      "titulares con tu posicionamiento, secciones que responden las preguntas que tu cliente real se hace, cierre con prueba social trabajada.",
  },
  {
    lead: "Diseño con criterio",
    body:
      'las secciones existen porque resuelven algo, no porque "una landing tiene esas secciones".',
  },
];

function DemoComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const variants = useMotionVariants(fadeUp);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
      }}
      className="grid gap-4 md:grid-cols-2 md:gap-5"
    >
      <motion.div variants={variants}>
        <DemoCard
          eyebrow="Sin Skill"
          subtitle="Resultado genérico"
          variant="without"
          items={SIN_SKILL_ITEMS}
        />
      </motion.div>
      <motion.div variants={variants}>
        <DemoCard
          eyebrow="Con Skill — Landing Page Pro"
          subtitle="Resultado especializado"
          variant="with"
          items={CON_SKILL_ITEMS}
        />
      </motion.div>
    </motion.div>
  );
}

function DemoCard({
  eyebrow,
  subtitle,
  variant,
  items,
}: {
  eyebrow: string;
  subtitle: string;
  variant: "without" | "with";
  items: { lead: string; body: string }[];
}) {
  const isWith = variant === "with";

  return (
    <div
      className="flex h-full flex-col rounded-[var(--radius-lg)] border p-7 md:p-8"
      style={{
        borderColor: isWith
          ? "var(--color-primary-disabled)"
          : "var(--color-hairline)",
        backgroundColor: isWith
          ? "var(--color-surface-card)"
          : "var(--color-surface-soft)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden
          className="block h-1 w-1 rounded-full"
          style={{
            backgroundColor: isWith
              ? "var(--color-primary)"
              : "var(--color-muted-soft)",
          }}
        />
        <span
          className="text-[11px] font-medium uppercase tracking-[0.22em]"
          style={{
            color: isWith ? "var(--color-primary)" : "var(--color-muted)",
          }}
        >
          {eyebrow}
        </span>
      </div>
      <p
        className="mb-5 font-display text-xl leading-tight tracking-[-0.01em] md:text-2xl"
        style={{
          color: isWith ? "var(--color-ink)" : "var(--color-body-strong)",
        }}
      >
        {subtitle}
      </p>

      <ul className={isWith ? "space-y-5" : "space-y-3.5"}>
        {items.map((item, i) => (
          <li key={i}>
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{
                color: isWith
                  ? "var(--color-body-strong)"
                  : "var(--color-body)",
              }}
            >
              <strong
                className="font-semibold"
                style={{
                  color: isWith
                    ? "var(--color-ink)"
                    : "var(--color-body-strong)",
                }}
              >
                {item.lead}
              </strong>{" "}
              <span
                style={{
                  color: isWith
                    ? "var(--color-body-strong)"
                    : "var(--color-muted)",
                }}
              >
                — {item.body}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Skills useful in your career — 2-col grid of cards.
// Hairline borders, hover lift, no logos.
// ──────────────────────────────────────────────────────────────────────

const SKILLS_LIST: { name: string; desc: string }[] = [
  {
    name: "Brand voice",
    desc: "extrae tu tono de muestras de tu contenido y lo aplica en cada redacción.",
  },
  {
    name: "CRO / Conversion",
    desc: "analiza tu landing o producto buscando bloqueos en la decisión del cliente.",
  },
  {
    name: "Customer profile research",
    desc: "perfila tu cliente ideal a partir de feedback y testimonios reales.",
  },
  {
    name: "Content repurposing",
    desc: "convierte un artículo largo en posts para LinkedIn, X, Instagram.",
  },
  {
    name: "Weekly report",
    desc: "sigue tu formato exacto de reporte semanal con tu estructura.",
  },
  {
    name: "Pitch deck reviewer",
    desc: "audita un deck contra principios de pitch establecidos.",
  },
  {
    name: "Marketing analytics",
    desc: "analiza métricas de campañas con un framework consistente.",
  },
  {
    name: "Skill-creator",
    desc: "la skill oficial de Anthropic que te ayuda a crear tus propias skills.",
  },
];

function SkillsGrid() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const variants = useMotionVariants(fadeUp);

  return (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
      }}
      className="grid gap-3 sm:grid-cols-2 md:gap-4"
    >
      {SKILLS_LIST.map((s) => (
        <motion.li key={s.name} variants={variants}>
          <div className="h-full rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-5 py-4 transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--color-primary-disabled)]">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              {s.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
              {s.desc}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Cómo empezar — 3 numbered steps, same pattern as previous blocks.
// ──────────────────────────────────────────────────────────────────────

const HOW_TO_START: { title: string; body: ReactNode }[] = [
  {
    title: "Descarga una skill existente.",
    body: (
      <>
        GitHub tiene miles. Hay marketplaces comunitarios como{" "}
        <span className="font-mono text-[var(--color-primary)]">skillsmp.com</span>{" "}
        o{" "}
        <span className="font-mono text-[var(--color-primary)]">
          claudemarketplaces.com
        </span>{" "}
        donde navegas por categoría. Bajas el archivo .md, lo subes en{" "}
        <strong className="font-semibold text-[var(--color-ink)]">
          Ajustes → Capacidades → Skills → Upload
        </strong>
        . Listo.
      </>
    ),
  },
  {
    title: "Crea una desde cero con skill-creator.",
    body: (
      <>
        Es la skill oficial de Anthropic. La activas, le cuentas a Claude cómo
        haces tu tarea — paso a paso, con ejemplos —, y al final te entrega el
        archivo{" "}
        <span className="font-mono text-[var(--color-primary)]">SKILL.md</span>{" "}
        listo para subir.
      </>
    ),
  },
  {
    title: "Convierte un chat existente.",
    body: (
      <>
        Si ya tuviste una conversación donde Claude resolvió bien una tarea
        recurrente, pídele "convierte este chat en una skill". Lo empaqueta
        automáticamente con tu contexto.
      </>
    ),
  },
];

// ──────────────────────────────────────────────────────────────────────
// Plan footer + Diferenciador callout (shared idioms)
// ──────────────────────────────────────────────────────────────────────

function PlanFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 flex items-start gap-3 border-t border-[var(--color-hairline)] pt-5">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Plan
      </span>
      <p className="flex-1 text-sm leading-relaxed text-[var(--color-body)]">
        {children}
      </p>
    </div>
  );
}

function DataCallout({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="callout-aside space-y-2">
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
          {eyebrow}
        </span>
      </div>
      <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
        {children}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function Skills() {
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

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-12">
      <article className="space-y-16 md:col-span-8 md:space-y-20">
        {/* Hook */}
        <Block id="skills-hook">
          <blockquote className="pull-quote">
            <p>
              Hasta acá, Claude responde como cualquier Claude. Ahora viene el
              cambio: hacer que responda como tu Claude.
            </p>
          </blockquote>
        </Block>

        {/* Lead with drop cap */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            Una Skill es expertise empaquetado. Tomas tu forma de hacer algo
            bien — redactar un correo de cliente, analizar un balance, auditar
            una propuesta — la escribes una vez en un archivo, y a partir de
            ahí Claude la aplica sola cada vez que detecta que la tarea encaja.
            No la invocas. Ella se invoca a sí misma.
          </p>
        </Block>

        {/* Cómo funcionan */}
        <Block id="skills-funcionan" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Cómo funcionan" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Una Skill es un archivo de texto. Markdown. Sin código.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Adentro tiene tres cosas: una descripción corta de qué hace, una
            indicación de cuándo aplica, y las instrucciones detalladas — tu
            forma de hacer la tarea, paso por paso. El archivo se llama{" "}
            <span className="font-mono text-[var(--color-primary)]">
              SKILL.md
            </span>
            .
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Lo subes una vez en{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Ajustes → Capacidades → Skills
            </strong>
            . Después, cada vez que le escribes algo a Claude, él lee solo el
            encabezado de tus skills instaladas — tres líneas por cada una. Si
            alguna matchea con tu pregunta, carga el contenido completo y la
            aplica. Si ninguna matchea, no pasa nada — no consume contexto.
          </p>

          <FlowDiagram />

          {/* Secondary pull quote — same visual language, smaller */}
          <blockquote className="pull-quote">
            <p style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)" }}>
              No invocas la skill. Ella se invoca a sí misma.
            </p>
          </blockquote>
        </Block>

        {/* El demo */}
        <Block id="skills-demo" className="space-y-8">
          <SectionHeading
            eyebrow="Sección"
            title="El demo — mismo prompt, dos resultados"
          />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Acá está el momento. Vas a ver el cambio en una sola comparación.
          </p>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-6 md:p-7">
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden
                className="block h-px w-8 bg-[var(--color-primary)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Mismo prompt
              </span>
            </div>
            <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
              "Hazme una landing page para mi marca de café tostado en Lima."
            </p>
          </div>

          <DemoComparison />

          <p className="text-base italic leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            La diferencia no es que el modelo sea mejor. El modelo es el mismo.
            La diferencia es que tiene un manual.
          </p>
        </Block>

        {/* Para qué sirven en tu carrera */}
        <Block id="skills-carrera" className="space-y-8">
          <SectionHeading
            eyebrow="Sección"
            title="Para qué sirven en tu carrera"
          />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Algunas skills útiles para alumnos de negocios que ya existen en
            repositorios públicos:
          </p>

          <SkillsGrid />

          <DataCallout eyebrow="Dato concreto">
            <strong className="font-semibold text-[var(--color-ink)]">
              Tareas más cortas, no más largas.
            </strong>{" "}
            Anthropic reporta que una tarea que sin skill tomaba 15 mensajes y
            12,000 tokens, con skill se resuelve en 2 mensajes y 6,000 tokens.
            Más skills no significa más costo de uso — significa menos.
          </DataCallout>
        </Block>

        {/* Cómo empezar */}
        <Block id="skills-empezar" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Cómo empezar" />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tres caminos. Cualquiera funciona.
          </p>

          <ol className="space-y-7">
            {HOW_TO_START.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
              >
                <span
                  aria-hidden
                  className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                  {item.title}
                </h4>
                <p className="text-base leading-relaxed text-[var(--color-body)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <PlanFooter>
            Skills funciona en cuenta{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              gratis
            </strong>{" "}
            (puedes subir hasta cierto límite de skills) pero brilla en{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Pro y Max
            </strong>
            , donde el contexto y la cuota permiten usar varias skills
            complejas en paralelo.
          </PlanFooter>
        </Block>

        {/* Para llevarte algo concreto */}
        <Block id="skills-llevar" className="space-y-6">
          <SectionHeading
            eyebrow="Sección"
            title="Para llevarte algo concreto"
          />

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-7 md:p-9">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Ejercicio práctico
            </p>
            <div className="space-y-4 text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
              <p>
                Identifica una tarea que repites y que siempre arrancas desde
                cero. Un correo recurrente. Un tipo de análisis. Un brief que
                mandas. Algo donde te encuentras pegando las mismas
                instrucciones una y otra vez.
              </p>
              <p>
                Activa{" "}
                <span className="font-mono text-[var(--color-primary)]">
                  skill-creator
                </span>
                . Cuéntale cómo haces esa tarea, sé específico con tus pasos y
                tus criterios. Al final, baja el{" "}
                <span className="font-mono text-[var(--color-primary)]">
                  SKILL.md
                </span>
                , súbelo en Capacidades, y prueba con una tarea real.
              </p>
              <p>
                Toma menos de quince minutos. Y a partir de ahí, esa tarea ya
                no es manual.
              </p>
            </div>
          </div>
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
