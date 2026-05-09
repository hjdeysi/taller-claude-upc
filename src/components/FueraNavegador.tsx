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
import Image from "next/image";
import {
  Layers,
  Globe,
  Table2,
  Terminal,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import capasClaudeImg from "../../public/Capas-Claude.jpeg";
import guiaClaudeImg from "../../public/Guia-Claude.jpeg";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";
import { PlanBadge } from "./PlanBadge";

import type { StaticImageData } from "next/image";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "fdn-mapa", label: "El mapa de las cuatro" },
  { id: "fdn-cowork", label: "Cowork" },
  { id: "fdn-chrome", label: "Chrome" },
  { id: "fdn-excel", label: "Excel" },
  { id: "fdn-code", label: "Claude Code" },
  { id: "fdn-cuando", label: "Cuándo elegir cuál" },
  { id: "fdn-llevar", label: "Para llevarte algo" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block + headings
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
      <div className="flex items-center gap-3">
        <span className="font-mono tabular-nums text-[12px] tracking-[0.18em] text-[var(--color-muted-soft)]">
          {index}
        </span>
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
// ReferenceFigure — sober editorial frame around an external image.
// Used to embed infografías that aren't part of the manual's own visual
// system. Eyebrow + title + thin border + caption signal "this is a
// referenced exhibit, not a designed component". Clicking opens the
// raw image in a new tab — fulfills "puedes inspeccionarla más de
// cerca" without a lightbox or modal.
// ──────────────────────────────────────────────────────────────────────

function ReferenceFigure({
  src,
  alt,
  eyebrow,
  title,
  caption,
}: {
  src: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  caption: string;
}) {
  return (
    <figure className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-px w-8 bg-[var(--color-muted-soft)]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </span>
        </div>
        <p className="font-display text-2xl leading-tight text-[var(--color-ink)] md:text-[28px]">
          {title}
        </p>
      </div>

      <a
        href={src.src}
        target="_blank"
        rel="noopener"
        aria-label={`${title} — abrir en tamaño completo`}
        className="block cursor-zoom-in overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-muted)]/40 bg-[var(--color-canvas)] p-3 transition-transform duration-300 hover:scale-[1.01] md:p-4"
      >
        <Image
          src={src}
          alt={alt}
          className="h-auto w-full object-contain"
          sizes="(min-width: 1024px) 720px, 100vw"
        />
      </a>

      <figcaption className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Dual plan tag — used only by Claude Code (the only tool that scales
// from Pro to Max). Shows two compact labels with their dot colors,
// reading as "available in Pro, recommended in Max".
// ──────────────────────────────────────────────────────────────────────

function DualPlanChip({ size = "sm" }: { size?: "sm" | "md" }) {
  const labelSize =
    size === "md"
      ? "text-[12px] tracking-[0.1em] py-1 px-2.5"
      : "text-[11px] tracking-[0.08em] py-[3px] px-2";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--color-hairline)] bg-[var(--color-canvas)] font-medium uppercase ${labelSize}`}
    >
      <span aria-hidden className="flex items-center gap-1">
        <span
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-plan-pro)" }}
        />
        <span style={{ color: "rgb(40 80 130)" }}>Pro</span>
      </span>
      <span aria-hidden className="text-[var(--color-muted-soft)]">/</span>
      <span aria-hidden className="flex items-center gap-1">
        <span
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-plan-max)" }}
        />
        <span style={{ color: "rgb(88 51 175)" }}>Max</span>
      </span>
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 2×2 Tools overview grid
// ──────────────────────────────────────────────────────────────────────

interface ToolMeta {
  id: string;
  index: string;
  Icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>;
  title: string;
  blurb: string;
  plan: "pro" | "dual"; // dual = Pro / Max
}

const TOOLS: ToolMeta[] = [
  {
    id: "fdn-cowork",
    index: "01",
    Icon: Layers,
    title: "Cowork",
    blurb:
      "Claude trabaja dentro de Office, Google Workspace, Slack y Gmail con contexto compartido entre apps.",
    plan: "pro",
  },
  {
    id: "fdn-chrome",
    index: "02",
    Icon: Globe,
    title: "Claude para Chrome",
    blurb:
      "Agente que navega, hace clicks y llena formularios mientras tú miras.",
    plan: "pro",
  },
  {
    id: "fdn-excel",
    index: "03",
    Icon: Table2,
    title: "Claude para Excel",
    blurb:
      "Vive en una barra lateral de tu hoja de cálculo y modifica fórmulas sin romperlas.",
    plan: "pro",
  },
  {
    id: "fdn-code",
    index: "04",
    Icon: Terminal,
    title: "Claude Code",
    blurb:
      "Lo más potente del ecosistema, pensado para programadores pero usado cada vez más por gente de negocio.",
    plan: "dual",
  },
];

function ToolsGrid() {
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
      {TOOLS.map((t) => (
        <motion.li key={t.id} variants={variants}>
          <a
            href={`#${t.id}`}
            onClick={(e) => onCardClick(e, t.id)}
            className="group block h-full rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-7 transition-all duration-300 hover:-translate-y-[2px] hover:border-[var(--color-primary-disabled)] md:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                <t.Icon strokeWidth={1.5} className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-mono tabular-nums text-[12px] tracking-[0.18em] text-[var(--color-muted-soft)]">
                {t.index}
              </span>
            </div>

            <h4 className="font-display text-2xl leading-tight tracking-[-0.01em] text-[var(--color-ink)] md:text-[28px]">
              {t.title}
            </h4>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">
              {t.blurb}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--color-hairline)] pt-4">
              {t.plan === "dual" ? (
                <DualPlanChip size="sm" />
              ) : (
                <PlanBadge plan={t.plan} size="sm" />
              )}
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="h-4 w-4 shrink-0 text-[var(--color-muted-soft)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
              />
            </div>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Callouts — coral side rule + tonal cream bg.
// CautionCallout is the same shape but with an amber-tinted eyebrow
// and an AlertCircle icon, so it reads as a heads-up rather than a
// promo. Side rule stays coral for system consistency.
// ──────────────────────────────────────────────────────────────────────

function Callout({
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
      <div className="text-base leading-relaxed text-[var(--color-body-strong)]">
        {children}
      </div>
    </div>
  );
}

function CautionCallout({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="callout-aside space-y-2">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="block h-px w-8 bg-[var(--color-accent-amber)]"
        />
        <AlertCircle
          aria-hidden
          strokeWidth={1.5}
          className="h-3.5 w-3.5 text-[var(--color-accent-amber)]"
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-amber)]">
          {eyebrow}
        </span>
      </div>
      <div className="text-base leading-relaxed text-[var(--color-body-strong)]">
        {children}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Plan footer per tool — same idea as DemoPlanFooter from Demos.tsx,
// adapted with a dual variant for Claude Code.
// ──────────────────────────────────────────────────────────────────────

function ToolPlanFooter({
  plan,
  children,
}: {
  plan: "pro" | "dual";
  children: ReactNode;
}) {
  const isDual = plan === "dual";
  return (
    <div
      className="flex items-start gap-4 rounded-[var(--radius-md)] border bg-[var(--color-canvas)] px-5 py-4"
      style={{
        borderColor: isDual
          ? "rgb(139 92 246 / 0.30)"
          : "var(--color-hairline)",
      }}
    >
      {isDual ? <DualPlanChip size="md" /> : <PlanBadge plan="pro" size="md" />}
      <p className="flex-1 self-center text-sm leading-relaxed text-[var(--color-body)]">
        {children}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// "Cuándo elegir cuál" — editorial table.
// No alternating row colors, no banded header. Hairline separators
// between rows. Left column body / right column ink medium.
// ──────────────────────────────────────────────────────────────────────

const TABLE_ROWS: { task: string; tool: string }[] = [
  {
    task: "Vive en un correo, presentación o documento de Office",
    tool: "Cowork",
  },
  {
    task: "Pasa por varias páginas web abiertas a la vez",
    tool: "Chrome",
  },
  {
    task: "Está dentro de una hoja de cálculo compleja",
    tool: "Excel",
  },
  {
    task: "Toca muchos archivos en tu computador",
    tool: "Claude Code",
  },
  {
    task: "Es una conversación o investigación",
    tool: "claude.ai (lo que ya sabes)",
  },
];

function ChoiceTable() {
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
        show: {
          transition: { staggerChildren: 0.07, delayChildren: 0.05 },
        },
      }}
      className="overflow-hidden border-y border-[var(--color-hairline)]"
    >
      {/* Header eyebrows — kept light, not a banded header. */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 border-b border-[var(--color-hairline)] py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Si tu tarea…
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Usa
        </span>
      </div>

      {TABLE_ROWS.map((row, i) => (
        <motion.div
          key={i}
          variants={variants}
          className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-[var(--color-hairline)] py-5 last:border-b-0 md:py-6"
        >
          <span className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            {row.task}
          </span>
          <span className="text-right text-base font-medium text-[var(--color-ink)] md:text-lg">
            {row.tool}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Reusable bullet list for tool sections
// ──────────────────────────────────────────────────────────────────────

function CoralBullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 text-base leading-relaxed text-[var(--color-body)] md:text-lg">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-[0.6em] block h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function FueraNavegador() {
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
        <Block id="fdn-hook">
          <blockquote className="pull-quote">
            <p>
              Hasta acá Claude vivía dentro de un cuadro de chat. Ahora vamos
              a sacarlo de ahí — y es donde más cambia tu día a día.
            </p>
          </blockquote>
        </Block>

        {/* Lead */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            Cuatro lugares más donde Claude trabaja: tu computador, tu
            navegador, tu Excel y tu terminal. La sorpresa no es que existan.
            Es que comparten contexto entre sí. Resumes un correo en Outlook,
            abres Excel y Claude ya sabe del correo. Pides un análisis en
            Excel, abres PowerPoint y el deck arranca con los datos que acabas
            de analizar. Esa continuidad es lo que vale la pena entender hoy.
          </p>
        </Block>

        {/* Referencia visual — Las capas de Claude */}
        <Block>
          <ReferenceFigure
            src={capasClaudeImg}
            alt="Las capas de Claude — niveles de uso desde Chat hasta Código y Computadora"
            eyebrow="Referencia visual"
            title="Las capas de Claude"
            caption="Infografía — referencia para el resto del bloque"
          />
        </Block>

        {/* El mapa de las cuatro */}
        <Block id="fdn-mapa" className="space-y-8">
          <SectionHeading
            eyebrow="Sección"
            title="El mapa de las cuatro herramientas"
          />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuatro lugares distintos. Una misma capa por debajo, compartiendo
            contexto. Cada card te lleva a su sección.
          </p>
          <ToolsGrid />
        </Block>

        {/* ───── 01 · Cowork ───── */}
        <Block id="fdn-cowork" className="space-y-8">
          <ToolHeading index="01" eyebrow="Herramienta" title="Cowork" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Cowork es la pieza más reciente del ecosistema y probablemente la
            que más cambia las cosas para alumnos de negocios. No es una app
            nueva — es una capa que se mete adentro de las apps que ya usas:
            Excel, PowerPoint, Word, Outlook, Google Sheets, Slack, Gmail,
            Google Drive, DocuSign.
          </p>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo distintivo: shared context.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Cuando Claude trabaja en Cowork, ve todas tus apps abiertas al
              mismo tiempo. Resumes un correo en Outlook. Cambias a Excel.
              Claude ya sabe lo que decía el correo y construye el modelo
              financiero usando esos datos. Abres PowerPoint, le pides un deck
              — y arranca con la información que ya viste, sin que copies y
              pegues nada.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Esa continuidad entre apps es lo que ningún otro asistente está
              haciendo todavía.
            </p>
          </div>

          {/* Secondary pull quote */}
          <blockquote className="pull-quote">
            <p style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)" }}>
              Resumes un correo en Outlook, abres Excel, y Claude ya sabe del
              correo.
            </p>
          </blockquote>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Cómo se ve en la práctica.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Lo viste en la Demo 04 del bloque anterior — el procesamiento de
              boletas físicas para generar un reporte de gastos mensual. Ese es
              Cowork como agente de escritorio, leyendo imágenes y creando
              archivos. Pero Cowork también es:
            </p>
            <CoralBullets
              items={[
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Cowork dentro de Excel.
                  </strong>{" "}
                  Una conversación lateral que modifica tu modelo financiero
                  sin romper fórmulas.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Cowork dentro de Outlook.
                  </strong>{" "}
                  Triage de tu bandeja de entrada con un solo prompt: "ordena
                  los correos del día por urgencia y prepara borradores para
                  los tres más importantes".
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Cowork dentro de Slack.
                  </strong>{" "}
                  Búsqueda en canales, redacción de respuestas, resumen de
                  hilos largos.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Cowork como agente.
                  </strong>{" "}
                  Una tarea grande que cruza varias apps: "lee la propuesta del
                  cliente en Drive, prepara el modelo en Excel, arma el deck en
                  PowerPoint, y escríbeme el correo de respuesta en Outlook".
                </>,
              ]}
            />
          </div>

          <ToolPlanFooter plan="pro">
            Cualquier plan pagado. Para usos intensivos diarios, Max evita que
            choques con cuotas.
          </ToolPlanFooter>
        </Block>

        {/* ───── 02 · Claude para Chrome ───── */}
        <Block id="fdn-chrome" className="space-y-8">
          <ToolHeading
            index="02"
            eyebrow="Herramienta"
            title="Claude para Chrome"
          />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Es una extensión que pone a Claude en una barra lateral de tu
            navegador, mirando lo que tú miras. Pero también puede hacer
            clicks, llenar formularios, navegar entre pestañas y cumplir tareas
            mientras tú miras.
          </p>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo que hace bien.
            </p>
            <CoralBullets
              items={[
                "Resumir páginas largas, papers, artículos sin que abras cinco pestañas para procesarlos.",
                "Llenar formularios repetitivos a partir de datos que le pegas o que están en tu calendario.",
                "Triage de bandeja de entrada de Gmail: archiva newsletters, marca lo urgente, redacta borradores.",
                "Comparar precios o features entre tres tiendas online abriendo una pestaña por cada una.",
              ]}
            />
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Dos features que cambian el juego.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Primero:{" "}
              <strong className="font-semibold text-[var(--color-ink)]">
                shortcuts grabables
              </strong>
              . Una vez que enseñas a Claude a hacer una tarea grabándotela tú
              mismo, él la repite cuando quieras. Una sola vez de
              configuración, uso infinito.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Segundo:{" "}
              <strong className="font-semibold text-[var(--color-ink)]">
                scheduled tasks
              </strong>
              . Puedes programar un shortcut para correr automáticamente —
              todos los lunes a las 9am, cada primero de mes, lo que
              necesites. Claude trabaja mientras duermes.
            </p>
          </div>

          <CautionCallout eyebrow="Para tener cuidado">
            <strong className="font-semibold text-[var(--color-ink)]">
              Es beta y tiene riesgo.
            </strong>{" "}
            Las extensiones de navegador con IA son vulnerables a ataques de
            "prompt injection": páginas maliciosas pueden esconder
            instrucciones que intenten engañar a Claude. Anthropic ha reducido
            considerablemente el riesgo, pero todavía está en research preview.
            Empieza con sitios que conoces. Activa "preguntar antes de actuar"
            hasta que entiendas cómo se comporta. No le des acceso a sitios
            financieros ni a operaciones de dinero por ahora.
          </CautionCallout>

          <ToolPlanFooter plan="pro">
            Cualquier plan pagado. La extensión está en beta abierta.
          </ToolPlanFooter>
        </Block>

        {/* ───── 03 · Claude para Excel ───── */}
        <Block id="fdn-excel" className="space-y-8">
          <ToolHeading
            index="03"
            eyebrow="Herramienta"
            title="Claude para Excel"
          />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Si pasas más de cinco horas a la semana en una hoja de cálculo,
            esta sección es la más rentable de todo el manual para ti.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Claude para Excel es un add-in que pone a Claude en una barra
            lateral dentro de Excel. Lee tu workbook completo — varias
            pestañas, fórmulas, dependencias — y trabaja sobre él sin romper
            nada.
          </p>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Lo que resuelve.
            </p>
            <CoralBullets
              items={[
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Entiende fórmulas complejas que no escribiste.
                  </strong>{" "}
                  "Explícame qué hace esta celda" y Claude rastrea las
                  dependencias y te explica con citas a las celdas exactas.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Cambia supuestos sin romper nada.
                  </strong>{" "}
                  "Modifica el costo variable de S/12 a S/15 y mantén todas las
                  fórmulas conectadas." Claude actualiza, marca las celdas
                  tocadas, y te explica qué cambió.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Construye modelos desde cero.
                  </strong>{" "}
                  "Hazme un modelo de proyección de tres años con escenario
                  base, optimista y pesimista." Claude genera la estructura
                  completa.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Encuentra errores.
                  </strong>{" "}
                  "Hay un{" "}
                  <span className="font-mono text-[var(--color-primary)]">
                    #REF!
                  </span>{" "}
                  en alguna celda; encuéntralo y arréglalo sin cambiar la
                  lógica."
                </>,
              ]}
            />
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Una nota importante para alumnos de negocios.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Si piensas trabajar en banca, consultoría, finanzas corporativas,
              M&amp;A o investment management, esto deja de ser una herramienta
              de productividad y pasa a ser una ventaja competitiva. Anthropic
              reporta que Opus 4.7 es notablemente mejor que sus antecesores
              como analista financiero, y el add-in de Excel es donde esa
              capacidad se materializa. Equipos de banca que probaron el modelo
              construyen versiones iniciales de modelos complejos en una
              fracción del tiempo, lo que les permite enfocarse en
              pressure-testing y discusiones estratégicas con el cliente.
            </p>
          </div>

          <Callout eyebrow="Para profundizar">
            <strong className="font-semibold text-[var(--color-ink)]">
              Compatibilidad.
            </strong>{" "}
            Funciona en Excel desktop (Windows, Mac) y en Excel para web.
            Necesitas una suscripción de Microsoft 365 — las versiones
            perpetuas viejas (Office 2019 y anteriores) tienen limitaciones. Lo
            bajas desde el Microsoft Marketplace buscando "Claude by Anthropic
            for Excel".
          </Callout>

          <ReferenceFigure
            src={guiaClaudeImg}
            alt="Guía maestra de Claude para Excel — instalación en 5 pasos y casos de uso por industria"
            eyebrow="Referencia visual"
            title="Guía maestra: Claude en Excel"
            caption="Infografía — instalación y casos de uso por industria"
          />

          <ToolPlanFooter plan="pro">
            Cualquier plan pagado. Para uso diario en finanzas o consultoría,
            Max es lo razonable.
          </ToolPlanFooter>
        </Block>

        {/* ───── 04 · Claude Code ───── */}
        <Block id="fdn-code" className="space-y-8">
          <ToolHeading index="04" eyebrow="Herramienta" title="Claude Code" />

          {/* Socratic opener */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-8 bg-[var(--color-primary)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Pregunta abierta
              </span>
            </div>
            <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
              Si te dijera que la herramienta más potente de todo el ecosistema
              vive en una pantalla negra de texto que te asusta, ¿la dejarías
              de lado o la aprenderías?
            </p>
          </div>

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Claude Code es Claude funcionando desde la terminal de tu
            computador — la "consola" o "command line" donde los programadores
            escriben código. La interfaz se ve intimidante pero el uso es
            simple: le hablas en español plano, él lee y edita los archivos de
            tu computador, ejecuta tareas, te muestra el resultado.
          </p>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              El malentendido más común.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Que Claude Code es solo para programadores. No lo es. Anthropic
              reporta que los casos de uso no-técnicos están entre los
              segmentos de adopción que más rápido crecen. Microsoft lo adoptó
              internamente y hasta sus equipos no-developers lo usan. Lo que
              Claude Code hace bien trasciende programar: lee, organiza y
              manipula archivos a escala — y eso aplica a Excels, PDFs,
              transcripciones, carpetas enteras de documentos.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Casos de uso reales para alumnos de negocios.
            </p>
            <CoralBullets
              items={[
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Análisis de competencia en lote.
                  </strong>{" "}
                  Le das una lista de diez competidores. Claude Code visita
                  cada web, extrae la información, genera el brief, y te
                  entrega un Excel comparativo. Es la versión escalada de la
                  Demo 02.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Análisis cualitativo de transcripciones.
                  </strong>{" "}
                  Tienes 30 entrevistas grabadas y transcritas. Claude Code las
                  lee todas, identifica patrones, extrae quotes, genera un
                  reporte estructurado.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Procesar facturas o contratos en lote.
                  </strong>{" "}
                  Una carpeta con 100 PDFs. Claude Code los abre, extrae los
                  datos clave, los consolida en una hoja de cálculo.
                </>,
                <>
                  <strong className="font-semibold text-[var(--color-ink)]">
                    Construir un mini-sitio web o dashboard.
                  </strong>{" "}
                  Sin saber programar. Le describes lo que quieres, él lo
                  escribe, lo pruebas, iteras hablándole.
                </>,
              ]}
            />
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Por qué es la herramienta más potente del ecosistema.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              En claude.ai estás dentro del cuadro de chat. En Cowork, adentro
              de tus apps. En Chrome, adentro del navegador. Claude Code está
              adentro de tu sistema de archivos. Eso le da el alcance más
              amplio — puede tocar cualquier cosa de tu computador. Por eso
              requiere más cuidado y por eso justifica Max.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              Cómo arrancar si no eres developer.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
              Tres comandos. Tres. Sí, la terminal se ve asusta, pero el uso
              real es: instalar, abrir, escribir lo que quieres en español. Si
              abres carpetas en tu computador y creas archivos de texto, ya
              tienes lo necesario.
            </p>
          </div>

          <ToolPlanFooter plan="dual">
            Funciona desde Pro pero la cuota se queda corta rápido si lo usas a
            diario. Max es el plan real para uso intensivo.
          </ToolPlanFooter>
        </Block>

        {/* Cuándo elegir cuál */}
        <Block id="fdn-cuando" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Cuándo elegir cuál" />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            No tienes que aprender las cuatro a la vez. Empieza por la que
            aplique a lo que más haces durante el día. El resto las exploras
            cuando aparezca el caso.
          </p>

          <ChoiceTable />
        </Block>

        {/* Para llevarte algo concreto */}
        <Block id="fdn-llevar" className="space-y-6">
          <SectionHeading
            eyebrow="Sección"
            title="Para llevarte algo concreto"
          />

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-7 md:p-9">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Una sola acción esta semana
            </p>
            <ul className="space-y-5 text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
              <li>
                <strong className="font-semibold text-[var(--color-ink)]">
                  Si pasas tu día en correo:
                </strong>{" "}
                instala Claude para Chrome y pídele que ordene tu bandeja de
                entrada un lunes en la mañana.
              </li>
              <li>
                <strong className="font-semibold text-[var(--color-ink)]">
                  Si pasas tu día en Excel:
                </strong>{" "}
                instala Claude para Excel desde el Microsoft Marketplace y
                dale tu modelo más complejo. Pídele que te lo explique.
              </li>
              <li>
                <strong className="font-semibold text-[var(--color-ink)]">
                  Si trabajas con muchos documentos físicos:
                </strong>{" "}
                prueba la demo de boletas que viste en el bloque anterior, con
                tus propios recibos del mes.
              </li>
              <li>
                <strong className="font-semibold text-[var(--color-ink)]">
                  Si te pica la curiosidad de Claude Code:
                </strong>{" "}
                instala (es un comando), abre tu carpeta de descargas, y pídele
                que la organice por tipo de archivo.
              </li>
            </ul>
            <p className="mt-6 text-base italic leading-relaxed text-[var(--color-body)] md:text-lg">
              Cualquiera de las cuatro toma menos de quince minutos. Una de
              ellas se va a quedar contigo.
            </p>
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
