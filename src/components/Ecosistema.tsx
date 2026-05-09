"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type ComponentType,
} from "react";
import { motion, useInView } from "motion/react";
import {
  Wrench,
  FolderOpen,
  Network,
  History,
  ArrowRight,
} from "lucide-react";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";
import { PlanBadge } from "./PlanBadge";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "eco-mapa", label: "El mapa de las cuatro" },
  { id: "eco-artifacts", label: "Artifacts" },
  { id: "eco-projects", label: "Projects" },
  { id: "eco-conexiones", label: "Conexiones" },
  { id: "eco-memoria", label: "Memoria" },
  { id: "eco-conjunto", label: "El conjunto" },
  { id: "eco-llevar", label: "Para llevarte algo" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block + SectionHeading (same pattern as previous blocks)
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

function ToolEyebrow({ index, name }: { index: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono tabular-nums text-[12px] tracking-[0.18em] text-[var(--color-muted-soft)]">
        {index}
      </span>
      <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
        {name}
      </span>
    </div>
  );
}

function ToolHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="space-y-3">
      <ToolEyebrow index={index} name={eyebrow} />
      <h3 className="font-display text-3xl leading-[1.1] text-[var(--color-ink)] md:text-4xl">
        {title}
      </h3>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 2×2 Map of the four tools — visual anchor of the block
// ──────────────────────────────────────────────────────────────────────

interface ToolMeta {
  id: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  index: string;
  name: string;
  blurb: string;
  plan: "free" | "pro" | "mixed";
  planNote?: string;
}

const TOOLS: ToolMeta[] = [
  {
    id: "eco-artifacts",
    Icon: Wrench,
    index: "01",
    name: "Artifacts",
    blurb: "Herramientas funcionales generadas en la conversación.",
    plan: "free",
  },
  {
    id: "eco-projects",
    Icon: FolderOpen,
    index: "02",
    name: "Projects",
    blurb: "Espacios con memoria persistente para trabajo recurrente.",
    plan: "pro",
  },
  {
    id: "eco-conexiones",
    Icon: Network,
    index: "03",
    name: "Conexiones",
    blurb: "Claude lee y actúa sobre tus apps reales.",
    plan: "mixed",
    planNote: "Free para Google Workspace · Pro para el resto",
  },
  {
    id: "eco-memoria",
    Icon: History,
    index: "04",
    name: "Memoria",
    blurb: "Claude te conoce entre conversaciones.",
    plan: "free",
  },
];

function ToolMapGrid() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const variants = useMotionVariants(fadeUp);

  function onCardClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: STAGGER.sections,
            delayChildren: 0.1,
          },
        },
      }}
      className="grid gap-4 md:grid-cols-2 md:gap-5"
    >
      {TOOLS.map((tool) => (
        <motion.li key={tool.id} variants={variants}>
          <a
            href={`#${tool.id}`}
            onClick={(e) => onCardClick(e, tool.id)}
            className="group block h-full rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-7 transition-all duration-300 hover:-translate-y-[2px] hover:border-[var(--color-primary-disabled)] md:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                <tool.Icon strokeWidth={1.5} className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-mono tabular-nums text-[12px] tracking-[0.18em] text-[var(--color-muted-soft)]">
                {tool.index}
              </span>
            </div>

            <h4 className="font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {tool.name}
            </h4>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">
              {tool.blurb}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--color-hairline)] pt-4">
              {tool.plan === "free" && <PlanBadge plan="free" size="sm" />}
              {tool.plan === "pro" && <PlanBadge plan="pro" size="sm" />}
              {tool.plan === "mixed" && (
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {tool.planNote}
                </span>
              )}
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="h-4 w-4 text-[var(--color-muted-soft)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
              />
            </div>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Artifact split-pane mockup — editorial abstraction, not a screenshot
// ──────────────────────────────────────────────────────────────────────

function ArtifactMockup() {
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
        show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
      }}
      className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-3 md:grid-cols-2 md:p-4"
    >
      {/* Chat panel */}
      <motion.div
        variants={variants}
        className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-5"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Conversación
        </p>
        <div className="mt-5 space-y-3">
          <div className="ml-auto h-7 w-3/5 rounded-md bg-[var(--color-surface-card)]" />
          <div className="space-y-1.5 pr-2">
            <div className="h-2 w-full rounded bg-[var(--color-hairline)]" />
            <div className="h-2 w-11/12 rounded bg-[var(--color-hairline)]" />
            <div className="h-2 w-3/4 rounded bg-[var(--color-hairline)]" />
            <div className="h-2 w-10/12 rounded bg-[var(--color-hairline)]" />
          </div>
          <div className="ml-auto h-7 w-2/5 rounded-md bg-[var(--color-surface-card)]" />
          <div className="space-y-1.5 pr-2">
            <div className="h-2 w-full rounded bg-[var(--color-hairline)]" />
            <div className="h-2 w-4/5 rounded bg-[var(--color-hairline)]" />
          </div>
        </div>
        <div className="mt-6 flex h-10 items-center justify-between rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] px-3">
          <span className="text-[11px] tracking-[0.08em] text-[var(--color-muted-soft)]">
            Pídeme algo
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
          />
        </div>
      </motion.div>

      {/* Artifact panel */}
      <motion.div
        variants={variants}
        className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-5"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
            Artifact
          </p>
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-[var(--color-hairline)]"
            />
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-[var(--color-hairline)]"
            />
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-[var(--color-hairline)]"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {[
            { lbl: 32, val: 70 },
            { lbl: 44, val: 60 },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-2.5"
            >
              <div
                className="h-1.5 rounded bg-[var(--color-muted-soft)]/40"
                style={{ width: `${s.lbl}%` }}
              />
              <div
                className="mt-2 h-3.5 rounded bg-[var(--color-ink)]/40"
                style={{ width: `${s.val}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-3">
          <div className="flex h-20 items-end gap-1.5">
            {[55, 30, 80, 45, 90, 40, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-[var(--color-primary)]/35"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-teal)]" />
          <div className="h-1.5 flex-1 rounded bg-[var(--color-hairline)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Connector chip grid — typographic chips with category dots
// ──────────────────────────────────────────────────────────────────────

type ConnectorCategory = "comunicacion" | "gestion" | "diseno" | "finanzas";

const CATEGORY_DOT: Record<ConnectorCategory, string> = {
  comunicacion: "var(--color-accent-teal)",
  gestion: "var(--color-muted-soft)",
  diseno: "var(--color-accent-amber)",
  finanzas: "var(--color-success)",
};

const CATEGORY_LABEL: Record<ConnectorCategory, string> = {
  comunicacion: "Comunicación",
  gestion: "Gestión",
  diseno: "Diseño",
  finanzas: "Finanzas",
};

const CONNECTORS: { name: string; category: ConnectorCategory }[] = [
  { name: "Gmail", category: "comunicacion" },
  { name: "Calendar", category: "gestion" },
  { name: "Drive", category: "gestion" },
  { name: "Notion", category: "gestion" },
  { name: "Slack", category: "comunicacion" },
  { name: "HubSpot", category: "finanzas" },
  { name: "Asana", category: "gestion" },
  { name: "Linear", category: "gestion" },
  { name: "Jira", category: "gestion" },
  { name: "Canva", category: "diseno" },
  { name: "Figma", category: "diseno" },
  { name: "Stripe", category: "finanzas" },
  { name: "Microsoft 365", category: "gestion" },
];

function ConnectorGrid() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const itemVariants = useMotionVariants(fadeUp);

  return (
    <div className="space-y-5">
      <motion.ul
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
        }}
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4"
      >
        {CONNECTORS.map((c) => (
          <motion.li key={c.name} variants={itemVariants}>
            <span className="flex items-center gap-3 rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-4 py-3 text-sm text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--color-primary-disabled)]">
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: CATEGORY_DOT[c.category] }}
              />
              <span className="font-medium">{c.name}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Legend */}
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {(Object.keys(CATEGORY_LABEL) as ConnectorCategory[]).map((cat) => (
          <li key={cat} className="flex items-center gap-2">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: CATEGORY_DOT[cat] }}
            />
            <span>{CATEGORY_LABEL[cat]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Conjunto flow — final example as editorial timeline
// ──────────────────────────────────────────────────────────────────────

const CONJUNTO_ACTIONS = [
  "Revisa tu calendario del próximo mes y propone fechas posibles.",
  "Genera un Artifact: cronograma del lanzamiento como dashboard interactivo.",
  "Redacta tres correos en Gmail (drafts, no enviados): uno a clientes frecuentes, uno a las cafeterías que distribuyen, uno a tu lista pública.",
  "Crea una página en Notion con el plan completo y enlaces a cada cosa.",
];

function ConjuntoFlow() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const variants = useMotionVariants(fadeUp);

  return (
    <div className="space-y-6">
      {/* Prompt card */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)] p-7 md:p-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
          Le escribes
        </p>
        <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
          "Prepara el lanzamiento de la nueva variedad."
        </p>
      </div>

      {/* Actions timeline */}
      <div className="relative pl-1">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Claude
        </p>
        <motion.ol
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: STAGGER.items,
                delayChildren: 0.1,
              },
            },
          }}
          className="relative space-y-6 border-l border-[var(--color-hairline)] pl-7"
        >
          {CONJUNTO_ACTIONS.map((action, i) => (
            <motion.li
              key={i}
              variants={variants}
              className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-5"
            >
              <span
                aria-hidden
                className="absolute -left-[35px] mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-canvas)]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
              </span>
              <span
                aria-hidden
                className="select-none font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-muted-soft)]"
              >
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
                {action}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Plan note footer (small)
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

// ──────────────────────────────────────────────────────────────────────
// Diferenciador callout — coral side rule
// ──────────────────────────────────────────────────────────────────────

function Diferenciador({ children }: { children: ReactNode }) {
  return (
    <div className="callout-aside space-y-2">
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
          Diferenciador
        </span>
      </div>
      <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
        {children}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Practice steps
// ──────────────────────────────────────────────────────────────────────

const PRACTICE_STEPS: { title: string; body: string }[] = [
  {
    title: "Crea un Project.",
    body:
      'Llámalo como tu negocio o tu carrera. Sube uno o dos archivos de referencia y escribe instrucciones simples ("eres un asistente que conoce mi marca de X"). Pruébale algo que normalmente le pedirías sin contexto.',
  },
  {
    title: "Conecta Gmail.",
    body:
      'Settings → Connections → Google Workspace. Toma cuatro minutos. Después prueba: "Resume los correos no leídos de hoy y dime cuáles son urgentes."',
  },
  {
    title: "Pide un Artifact.",
    body:
      '"Hazme una calculadora interactiva para [problema concreto de tu negocio]." Mira qué pasa en el panel de la derecha.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function Ecosistema() {
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
        <Block id="eco-hook">
          <blockquote className="pull-quote">
            <p>
              Hasta acá hablamos del cuadro de chat. Ahora veamos qué hay
              alrededor de él — porque ahí es donde la mayoría se queda afuera.
            </p>
          </blockquote>
        </Block>

        {/* Lead with drop cap */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            La mayoría usa Claude como un cuadro de chat con respuestas mejor
            escritas. Funciona, pero deja afuera cuatro cosas que convierten a
            Claude en algo distinto: un sistema que produce herramientas,
            recuerda tu contexto, actúa sobre tus apps y te conoce entre
            conversaciones. Cada una merece sus propios minutos.
          </p>
        </Block>

        {/* El mapa de las cuatro */}
        <Block id="eco-mapa" className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Sección
              </span>
            </div>
            <h3 className="font-display text-3xl leading-[1.1] text-[var(--color-ink)] md:text-4xl">
              El mapa de las cuatro
            </h3>
          </div>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuatro herramientas. Cada una resuelve algo que el chat solo no
            puede.
          </p>
          <ToolMapGrid />
        </Block>

        {/* Artifacts */}
        <Block id="eco-artifacts" className="space-y-8">
          <ToolHeading index="01" eyebrow="Herramienta" title="Artifacts" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Cuando le pides a Claude que te haga una calculadora, no te explica
            cómo construirla en Excel. Te entrega la calculadora.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Eso es un Artifact. Un panel separado al lado del chat donde Claude
            genera código, gráficos, documentos, dashboards, juegos o
            mini-aplicaciones que funcionan en vivo. Tú interactúas con ellos,
            les pides cambios en la conversación, los descargas, los publicas
            con un link, los compartes.
          </p>

          <ArtifactMockup />

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo que puedes construir hoy mismo:
            </p>
            <ul className="space-y-2.5 text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              {[
                "Calculadoras y simuladores (punto de equilibrio, ROI, pricing).",
                "Dashboards de datos a partir de un CSV o de un texto pegado.",
                "Mockups de landing page o componentes web.",
                "Diagramas (Mermaid), gráficos (Recharts), SVG.",
                "Documentos largos en Markdown listos para descargar.",
                "Mini-apps con almacenamiento persistente — un journal, un tracker de hábitos, un leaderboard.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] block h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-6 md:p-7">
            <div className="mb-2 flex items-center gap-3">
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Novedad reciente
              </span>
            </div>
            <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
              <strong className="font-semibold text-[var(--color-ink)]">
                Live Artifacts.
              </strong>{" "}
              Desde abril 2026, los Artifacts pueden conectarse a tus datos
              reales (Gmail, Notion, Calendar) y refrescarse automáticamente
              cada vez que los abres. Esto convierte un dashboard en una
              herramienta viva, no en una foto de un momento.
            </p>
          </div>

          <Diferenciador>
            <strong className="font-semibold text-[var(--color-ink)]">
              Claude vs ChatGPT Canvas.
            </strong>{" "}
            ChatGPT tiene Canvas, que es útil para escribir documentos largos.
            Pero Canvas no construye mini-apps interactivas con estado, ni se
            conecta a tus datos. Aquí Claude juega un deporte distinto.
          </Diferenciador>

          <PlanFooter>
            Cuenta{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              gratis
            </strong>{" "}
            te da Artifacts básicos (código, documentos, HTML simple, gráficos).{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Pro y Max
            </strong>{" "}
            desbloquean Live Artifacts, almacenamiento persistente y los
            outputs más complejos.
          </PlanFooter>
        </Block>

        {/* Projects */}
        <Block id="eco-projects" className="space-y-8">
          <ToolHeading index="02" eyebrow="Herramienta" title="Projects" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Imagínate que tu asistente de toda la vida olvida quién eres cada
            vez que lo saludas. Eso es un chat suelto. Un Project es lo
            opuesto.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Un Project es un espacio con instrucciones personalizadas, archivos
            de referencia y memoria propia. Una vez que lo configuras, cada
            conversación dentro de ese Project hereda el contexto sin que
            tengas que repetirlo.
          </p>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Para qué sirve realmente:
            </p>
            <ul className="space-y-2.5 text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              {[
                <>
                  Un Project por{" "}
                  <strong className="font-semibold text-[var(--color-ink)]">
                    cliente
                  </strong>
                  : brand book, contratos, historial de comunicación.
                </>,
                <>
                  Un Project por{" "}
                  <strong className="font-semibold text-[var(--color-ink)]">
                    curso o tesis
                  </strong>
                  : lecturas, apuntes, drafts.
                </>,
                <>
                  Un Project por{" "}
                  <strong className="font-semibold text-[var(--color-ink)]">
                    área
                  </strong>
                  : marketing, finanzas, operaciones.
                </>,
                <>
                  Un Project por{" "}
                  <strong className="font-semibold text-[var(--color-ink)]">
                    producto recurrente
                  </strong>
                  : el reporte mensual, el análisis trimestral, el pitch que
                  actualizas cada vez.
                </>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] block h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-6 md:p-7">
            <div className="mb-2 flex items-center gap-3">
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Novedad reciente
              </span>
            </div>
            <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
              <strong className="font-semibold text-[var(--color-ink)]">
                Memoria por proyecto.
              </strong>{" "}
              Desde 2026, cada Project tiene su propia memoria aislada. Lo que
              Claude aprende sobre tu cliente A no se mezcla con lo que sabe
              del cliente B. Y nada de eso contamina los chats sueltos. Tres
              burbujas separadas, como debe ser.
            </p>
          </div>

          {/* Secondary pull quote — same visual language, smaller */}
          <blockquote className="pull-quote">
            <p style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)" }}>
              Llegas el lunes, abres el Project del cliente y Claude ya sabe
              qué estás trabajando.
            </p>
          </blockquote>

          <PlanFooter>
            <strong className="font-semibold text-[var(--color-ink)]">
              Projects
            </strong>{" "}
            está disponible en planes pagados — Pro y Max. La memoria por
            proyecto viene incluida.
          </PlanFooter>
        </Block>

        {/* Conexiones */}
        <Block id="eco-conexiones" className="space-y-8">
          <ToolHeading index="03" eyebrow="Herramienta" title="Conexiones" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Las conexiones son donde Claude deja de ser un chat y empieza a ser
            un asistente. En vez de copiar y pegar contenido, lo conectas con
            tus apps y Claude trabaja directo sobre los datos.
          </p>

          <div className="space-y-5">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Conectores oficiales más útiles para alumnos de negocios:
            </p>
            <ConnectorGrid />
          </div>

          <ul className="space-y-3 text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Google Workspace
              </strong>{" "}
              <span className="text-[var(--color-muted)]">(Gmail, Calendar, Drive · 🟢 Free).</span>{" "}
              Claude busca tus correos, lee tus eventos, abre tus docs. Puede
              redactar borradores en Gmail, pero no envía sin tu aprobación.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Notion
              </strong>
              {" "}— lee tus páginas y bases de datos, crea contenido nuevo,
              actualiza propiedades.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Slack
              </strong>
              {" "}— busca en canales, lee mensajes, redacta respuestas. Pro+.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                HubSpot
              </strong>
              {" "}— CRM. Cruza correos con actividad de leads.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Asana, Linear, Jira
              </strong>
              {" "}— gestión de proyectos. Lee tickets, crea tareas, actualiza
              estados.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Canva, Figma
              </strong>
              {" "}— lee tus diseños y comenta sobre ellos.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Stripe
              </strong>
              {" "}— operaciones de pago.
            </li>
            <li>
              <strong className="font-semibold text-[var(--color-ink)]">
                Microsoft 365
              </strong>
              {" "}— Outlook, SharePoint, Teams (solo planes empresariales por
              ahora).
            </li>
          </ul>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Más de 50 conectores en total, con nuevos cada semana. Si tu
            herramienta no está en el directorio y eres usuario Pro o Max,
            puedes añadir cualquier servidor MCP propio.
          </p>

          <div className="space-y-5">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Cómo se ve usar esto:
            </p>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-7 md:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full bg-[var(--color-muted-soft)]"
                  />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Tú escribes
                  </span>
                </div>
                <p className="font-mono text-[13px] leading-[1.65] text-[var(--color-body-strong)] md:text-[14px]">
                  Revisa mis correos no leídos del último día, agrupa los tres
                  más urgentes con un resumen de cada uno, y revisa mi
                  calendario para sugerir cuándo responderlos.
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-primary-disabled)] bg-[var(--color-surface-card)] p-7 md:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full bg-[var(--color-primary)]"
                  />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    Claude
                  </span>
                </div>
                <ol className="space-y-2 text-base leading-relaxed text-[var(--color-body-strong)]">
                  {[
                    "Pide tu aprobación para acceder a Gmail y Calendar.",
                    "Lee los correos, los agrupa por urgencia.",
                    "Lee tu agenda del día siguiente.",
                    "Devuelve un mini-briefing con los tres correos prioritarios y bloques de tiempo recomendados para responder cada uno.",
                  ].map((step, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-x-3">
                      <span
                        aria-hidden
                        className="font-mono tabular-nums text-[12px] tracking-[0.08em] text-[var(--color-muted-soft)]"
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="text-base italic leading-relaxed text-[var(--color-muted)]">
              Sin copiar, sin pegar, sin cambiar de pestaña.
            </p>
          </div>

          <Diferenciador>
            <strong className="font-semibold text-[var(--color-ink)]">
              Claude y MCP.
            </strong>{" "}
            El protocolo que hace todo esto posible — Model Context Protocol —
            fue creado por Anthropic en 2024 como estándar abierto. Hoy lo usan
            ChatGPT, Cursor y otros. Pero Claude es donde el ecosistema empezó
            y donde está más maduro.
          </Diferenciador>

          <PlanFooter>
            <strong className="font-semibold text-[var(--color-ink)]">
              Google Workspace
            </strong>{" "}
            está disponible en cuenta gratis. El resto de conectores oficiales
            del directorio funcionan en todos los planes pero con mejores
            cuotas en Pro y Max. Conectores custom (tu servidor MCP propio)
            requieren plan pagado.
          </PlanFooter>
        </Block>

        {/* Memoria */}
        <Block id="eco-memoria" className="space-y-6">
          <ToolHeading index="04" eyebrow="Herramienta" title="Memoria" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Memoria es la pieza más silenciosa de las cuatro. Y probablemente
            la que más cambia tu relación con Claude después de un mes de uso.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Desde marzo 2026 está disponible para todos — incluida cuenta
            gratis. Cuando la activas, Claude empieza a construir un perfil
            tuyo con cada conversación: tus preferencias de formato, en qué
            estás trabajando, qué tono usas, qué temas frecuentas, qué
            proyectos tienes abiertos.
          </p>

          <div className="space-y-3">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo que sí guarda:
            </p>
            <ul className="space-y-2.5 text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              {[
                "Preferencias de respuesta (formal vs casual, breve vs largo, con bullets vs en prosa).",
                "Tu contexto de trabajo o estudio.",
                "Proyectos en curso, deadlines mencionadas, decisiones tomadas.",
                "Preferencias de estilo que hayas declarado.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] block h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo que no es:
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Memoria no es una grabación literal. Claude no recuerda cada
              conversación palabra por palabra. Construye un resumen útil, no
              un transcript. Si quieres precisión exacta, usa búsqueda en chats
              pasados (disponible en planes pagados).
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Tú mandas.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              En{" "}
              <strong className="font-semibold text-[var(--color-ink)]">
                Ajustes → Memoria
              </strong>{" "}
              puedes ver qué recuerda, editarlo a mano, borrar entradas o
              desactivar la función. Si quieres que recuerde algo específico
              ahora mismo, díselo: "recuerda que mi marca se llama X y que
              vendemos en Lima". Si quieres que olvide: "olvida lo que te conté
              sobre Y".
            </p>
          </div>

          <PlanFooter>
            <strong className="font-semibold text-[var(--color-ink)]">
              Memoria
            </strong>{" "}
            está disponible para todos los planes — incluida la cuenta gratis.
          </PlanFooter>
        </Block>

        {/* El conjunto */}
        <Block id="eco-conjunto" className="space-y-8">
          <ToolHeading
            index="05"
            eyebrow="Cierre"
            title="El conjunto"
          />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Las cuatro por separado son útiles. Combinadas, cambian cómo
            trabajas.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Imagina: tienes un Project llamado "Mi marca de café". Adentro hay
            tres archivos — tu brand book, tu lista de clientes frecuentes, tus
            precios. Conectaste Gmail, Calendar y Notion. La memoria del
            Project ya sabe que vendes en Lima, que tu diferenciador es café
            orgánico de productores locales, y que tu próximo lanzamiento es
            una variedad nueva en marzo.
          </p>

          <ConjuntoFlow />

          <p className="text-base italic leading-relaxed text-[var(--color-body)] md:text-lg">
            Hace un mes habría sido tres horas de trabajo en cinco apps. Hoy
            es un prompt y diez minutos de revisión.
          </p>
        </Block>

        {/* Para llevarte algo concreto */}
        <Block id="eco-llevar" className="space-y-6">
          <ToolHeading
            index="06"
            eyebrow="Sección"
            title="Para llevarte algo concreto"
          />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Antes de pasar al siguiente bloque, prueba una de estas tres cosas.
            Cualquiera te sirve.
          </p>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-7 md:p-9">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Ejercicio práctico
            </p>
            <ol className="space-y-6">
              {PRACTICE_STEPS.map((step, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1"
                >
                  <span
                    aria-hidden
                    className="row-span-2 select-none font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-primary)]"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                    {step.title}
                  </h4>
                  <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuál elijas no importa. Lo que importa es que pruebes una sola de
            estas cosas hoy. Después de hacerlo, vuelve al Bloque 03, que es
            donde Claude se vuelve un especialista.
          </p>
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
