"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useInView } from "motion/react";
import { Copy, Check } from "lucide-react";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "tt-fase-01", label: "Fase 01 · Define" },
  { id: "tt-fase-02", label: "Fase 02 · Construye" },
  { id: "tt-fase-03", label: "Fase 03 · Entrega" },
  { id: "tt-atorado", label: "Si te quedaste atorado" },
  { id: "tt-llevas", label: "Lo que te llevas" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block
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
// PhaseHeader — visual anchor of each phase. Giant Cormorant numeral
// next to the title, big enough to dominate the phase opener without
// drowning the watermark "06" still living behind everything.
// On mobile the numeral sits above the title (stacked).
// ──────────────────────────────────────────────────────────────────────

function PhaseHeader({
  index,
  title,
  duration,
}: {
  index: string;
  title: string;
  duration: string;
}) {
  return (
    <header className="space-y-5">
      <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-[var(--color-primary)]">
        Fase {index}
      </p>
      <div className="grid items-baseline gap-x-8 gap-y-2 md:grid-cols-[auto_1fr] md:gap-x-10">
        <span
          aria-hidden
          className="select-none font-display leading-[0.85] tracking-[-0.04em] text-[var(--color-ink)]"
          style={{
            fontSize: "clamp(6rem, 12vw, 11rem)",
            fontWeight: 400,
          }}
        >
          {index}
        </span>
        <div>
          <h3 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl lg:text-6xl">
            {title}
          </h3>
          <p className="mt-3 text-base text-[var(--color-muted)] md:mt-4 md:text-lg">
            {duration}
          </p>
        </div>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// PromptBlock — copyable prompt with bracketed placeholder pills
// (same pattern as Demos.tsx; duplicated here to keep block isolated)
// ──────────────────────────────────────────────────────────────────────

function PromptBlock({
  children: text,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function onCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  // Tokenize on [bracketed] placeholders so they render distinctly.
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <span key={i++} className="placeholder-pill">
        [{m[1]}]
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  const padding = compact ? "p-5 pt-11" : "p-6 pt-12 md:p-7 md:pt-12";
  const fontSize = compact ? "text-[12px]" : "text-[13px] md:text-[14px]";
  const eyebrowLeft = compact ? "left-5" : "left-6 md:left-7";

  return (
    <div
      className={`relative rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] ${padding}`}
    >
      <div className={`absolute ${eyebrowLeft} top-3 flex items-center gap-3`}>
        <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-muted-soft)]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Prompt copiable
        </span>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copiado" : "Copiar prompt"}
        className="absolute right-3 top-2.5 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-primary-disabled)] hover:text-[var(--color-primary)]"
      >
        {copied ? (
          <>
            <Check strokeWidth={1.75} className="h-3.5 w-3.5" aria-hidden />
            Copiado
          </>
        ) : (
          <>
            <Copy strokeWidth={1.5} className="h-3.5 w-3.5" aria-hidden />
            Copiar
          </>
        )}
      </button>
      <div
        className={`whitespace-pre-wrap font-mono leading-[1.7] text-[var(--color-body-strong)] ${fontSize}`}
      >
        {parts}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Static content
// ──────────────────────────────────────────────────────────────────────

const FASE_01_QUESTIONS: { question: string; example: string }[] = [
  {
    question: "¿Cuál es tu caso?",
    example:
      "Una marca propia de café tostado en Lima. Mi tesis sobre el sector retail peruano. Mi rol de practicante en el área de marketing de [empresa].",
  },
  {
    question: "Descríbelo en tres líneas.",
    example: "Qué es, qué hace, en qué etapa está.",
  },
  {
    question: "¿Quién es tu cliente, lector o audiencia?",
    example:
      'Sé específico. "Mujeres de 25-35 que viven en Lima moderna y compran en San Antonio" es útil. "Gente joven" no.',
  },
  {
    question: "¿Qué problema resuelves o qué pregunta respondes?",
    example:
      "Una sola frase. Si te toma más de quince palabras, todavía no la tienes clara.",
  },
  {
    question: "¿Qué tono usas?",
    example:
      "Cercano y directo. Formal y técnico. Editorial y reposado. Tres adjetivos máximo.",
  },
];

const PROMPT_BUILDER = `Vas a ser mi asistente para un caso específico. Quiero que recuerdes este contexto en toda la conversación.

MI CASO
[pega aquí tu respuesta de la pregunta 1]

DESCRIPCIÓN
[pega aquí tu respuesta de la pregunta 2]

A QUIÉN LE HABLO
[pega aquí tu respuesta de la pregunta 3]

QUÉ PROBLEMA RESUELVO
[pega aquí tu respuesta de la pregunta 4]

TONO QUE USO
[pega aquí tu respuesta de la pregunta 5]

CÓMO QUIERO QUE TRABAJES CONMIGO

- Sé directo. Si algo no está claro, pregúntamelo antes de inventar.
- Cuando te pida algo, responde con la solución, no con un catálogo de opciones.
- Si crees que estoy yendo por el camino equivocado, dímelo.
- Tu primera respuesta es un borrador, no la entrega final; espera que iteremos.

Para confirmar que entendiste, dime en una frase qué entendiste de mi caso y qué me preguntarías para empezar a trabajar.`;

const PROMPT_A = `Hazme una mini-landing page para mi caso, en HTML como Artifact. Estructura:

- Hero con titular fuerte y subtítulo
- Tres beneficios concretos para mi audiencia
- Una sección de "para quién es esto"
- Una sección de "para quién NO es esto" — sé honesto
- CTA al final

Usa un estilo editorial sobrio, no SaaS genérico. Tipografía serif para títulos, sans para body. Paleta neutral con un acento. Que se vea como una marca con criterio, no como una plantilla de Webflow.`;

const PROMPT_B = `Construye un calendario de contenido de 30 días para mi caso, como Artifact en HTML con tabla navegable.

Para cada día incluye:

- Plataforma sugerida (LinkedIn, Instagram, TikTok, según donde vive mi audiencia)
- Tipo de contenido (post de valor, historia personal, dato, pregunta a la audiencia)
- Titular o gancho concreto
- Una línea de qué desarrollaría en el cuerpo

Distribuye los formatos para que no sea repetitivo. Que el calendario tenga arco — empieza con valor educativo, sube a historias personales en la segunda quincena, cierra con CTAs suaves.`;

const PROMPT_C = `Hazme un análisis SWOT honesto de mi caso, en formato Artifact visual (HTML con grid 2x2).

Para cada cuadrante incluye:

- Tres puntos máximo, concretos, no genéricos
- Una sola frase por punto
- Lo que me digas en "Debilidades" y "Amenazas" tiene que picar — si te quedas en cumplidos, no me sirve

Cierra con una sección "Lo que haría primero si fuera tú", con tres movimientos en orden de prioridad.`;

const PROMPT_D = `Hazme un mini-dashboard interactivo de mi caso, como Artifact.

Pregúntame primero cuáles son las cuatro o cinco variables clave que necesito monitorear (según mi caso). Después construye el dashboard con:

- Tarjetas de KPI arriba con valores ficticios pero realistas para mi sector
- Un gráfico de evolución
- Un gráfico de distribución por categoría
- Espacio para que yo pegue mis datos reales después

Estilo editorial, no corporativo. Que se vea como algo que publicaría en un reporte, no como un Power BI.`;

const OPTIONS: {
  letter: string;
  title: string;
  blurb: string;
  prompt: string;
}[] = [
  {
    letter: "A",
    title: "Mini-landing de tu caso",
    blurb:
      "Una página visual con tu propuesta de valor, tres beneficios, prueba social y un CTA.",
    prompt: PROMPT_A,
  },
  {
    letter: "B",
    title: "Calendario de contenido para un mes",
    blurb: "30 días de posts pensados para tu audiencia y tu tono.",
    prompt: PROMPT_B,
  },
  {
    letter: "C",
    title: "Análisis SWOT visual",
    blurb:
      "Tu fortaleza, debilidad, oportunidad y amenaza, con honestidad.",
    prompt: PROMPT_C,
  },
  {
    letter: "D",
    title: "Mini-dashboard de tu modelo",
    blurb: "Visualización de las variables que más importan en tu caso.",
    prompt: PROMPT_D,
  },
];

const ATORADO_ITEMS: { problem: string; body: ReactNode }[] = [
  {
    problem: "Claude no entendió bien mi caso.",
    body: "Tu Fase 01 tenía respuestas vagas. Vuelve, sé más específico, y pégale el prompt completo otra vez.",
  },
  {
    problem: "La primera versión del entregable se ve genérica.",
    body: 'No iteraste. Pídele cambios concretos: "este titular es muy genérico, dame tres alternativas con más actitud", "este beneficio es una promesa vacía, conéctalo con un dolor real de mi audiencia".',
  },
  {
    problem: "Claude inventó datos.",
    body: (
      <>
        Pídele que marque cualquier cifra inventada con corchetes y una nota:{" "}
        <span className="font-mono text-[var(--color-primary)]">
          [dato ficticio — reemplazar]
        </span>
        . También dile "no inventes números; donde no tengas información,
        déjalo en blanco".
      </>
    ),
  },
  {
    problem: "No tengo Pro y no me deja crear un Project.",
    body: "Funciona igual con un chat normal. El prompt de la Fase 02 hace todo el trabajo de un Project rudimentario.",
  },
  {
    problem: "El Artifact se rompe o no carga.",
    body: 'Pídele a Claude "el Artifact se rompió, ¿puedes simplificar el código y reintentarlo?". Suele resolver al primer intento.',
  },
];

// ──────────────────────────────────────────────────────────────────────
// Phase 01: numbered list of questions
// ──────────────────────────────────────────────────────────────────────

function QuestionsList() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const variants = useMotionVariants(fadeUp);

  return (
    <motion.ol
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: STAGGER.items, delayChildren: 0.05 },
        },
      }}
      className="space-y-7"
    >
      {FASE_01_QUESTIONS.map((q, i) => (
        <motion.li
          key={i}
          variants={variants}
          className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
        >
          <span
            aria-hidden
            className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
          >
            {(i + 1).toString().padStart(2, "0")}
          </span>
          <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
            {q.question}
          </h4>
          <p className="font-display text-base italic leading-relaxed text-[var(--color-body)] md:text-lg">
            {q.example}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Phase 03: 2×2 grid of option cards with full prompt visible
// ──────────────────────────────────────────────────────────────────────

function OptionsGrid() {
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
        show: {
          transition: {
            staggerChildren: STAGGER.sections,
            delayChildren: 0.05,
          },
        },
      }}
      className="grid gap-5 lg:grid-cols-2 lg:gap-6"
    >
      {OPTIONS.map((opt) => (
        <motion.li
          key={opt.letter}
          variants={variants}
          className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-6 transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--color-primary-disabled)] md:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-primary)] md:text-4xl">
              {opt.letter}
            </span>
            <span aria-hidden className="block h-px w-6 bg-[var(--color-hairline)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Opción
            </span>
          </div>
          <h4 className="mt-3 font-display text-2xl leading-tight tracking-[-0.01em] text-[var(--color-ink)] md:text-[28px]">
            {opt.title}
          </h4>
          <p className="mt-2 text-base leading-relaxed text-[var(--color-body)]">
            {opt.blurb}
          </p>
          <div className="mt-5 flex-1">
            <PromptBlock compact>{opt.prompt}</PromptBlock>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// "Si te quedaste atorado" — compact troubleshooting panel
// ──────────────────────────────────────────────────────────────────────

function AtoradoPanel() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-7 md:p-9">
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Troubleshooting
      </p>
      <ul className="divide-y divide-[var(--color-hairline)]">
        {ATORADO_ITEMS.map((item, i) => (
          <li key={i} className="py-4 first:pt-0 last:pb-0">
            <p className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              {item.problem}
            </p>
            <p className="mt-1 text-base leading-relaxed text-[var(--color-body)]">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function TuTurno() {
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
        <Block id="tt-hook">
          <blockquote className="pull-quote">
            <p>
              Hasta acá leíste lo que Claude puede hacer. Ahora vamos a ver
              qué puede hacer por ti.
            </p>
          </blockquote>
        </Block>

        {/* Lead */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            Veinte minutos. Tu caso real — tu negocio, tu idea, tu tesis, tu
            carrera, lo que sea que estés trabajando hoy. El objetivo no es
            perfeccionar nada. Es que salgas de este bloque con un asistente
            personalizado funcionando y un primer entregable concreto. Si lo
            haces bien, estos veinte minutos van a ser los más rentables de
            las tres horas.
          </p>
        </Block>

        {/* "Lo que vas a hacer" — small framing note */}
        <Block>
          <div className="border-l-2 border-[var(--color-primary)] pl-5">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Lo que vas a hacer
            </p>
            <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
              Tres fases. La primera es definir tu caso. La segunda, construir
              tu primer asistente. La tercera, pedirle que produzca algo útil.
              Sigue el orden.
            </p>
          </div>
        </Block>

        {/* ───── FASE 01 ───── */}
        <Block id="tt-fase-01" className="space-y-10 pt-8 md:pt-12">
          <PhaseHeader
            index="01"
            title="Define tu caso"
            duration="Tres minutos. No te alargues acá."
          />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Toma una hoja, abre un Notion, o usa el cuadro de chat de Claude
            como scratch. Responde estas cinco preguntas en frases cortas, no
            párrafos:
          </p>

          <QuestionsList />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuando termines este bloque de cinco respuestas, ya tienes lo que
            necesitas para la Fase 02. Si te tomó más de cinco minutos,
            recortaste mal — vuelve y simplifica. Cinco respuestas en frases
            cortas.
          </p>
        </Block>

        {/* ───── FASE 02 ───── */}
        <Block id="tt-fase-02" className="space-y-10 border-t border-[var(--color-hairline)] pt-16 md:pt-20">
          <PhaseHeader
            index="02"
            title="Construye tu asistente"
            duration="Diez minutos. Acá pasas de lector a usuario."
          />

          <ol className="space-y-7">
            <motion.li
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
            >
              <span
                aria-hidden
                className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
              >
                01
              </span>
              <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Abre un chat nuevo en{" "}
                <span className="font-mono text-[var(--color-primary)]">
                  claude.ai
                </span>
                .
              </h4>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                Si tienes Pro y ya estás cómodo con la idea de Projects, crea
                un Project y llámalo como tu caso. Si tienes cuenta gratis o
                prefieres lo simple, abre un chat normal — funciona igual para
                este ejercicio.
              </p>
            </motion.li>

            <li className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <span
                aria-hidden
                className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
              >
                02
              </span>
              <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Sube uno o dos archivos de contexto si los tienes a mano.
              </h4>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                El brief de tu marca, una página del informe que estás
                leyendo, capturas del producto del competidor que más admiras.
                No es obligatorio. Si no tienes nada, pasa al siguiente paso.
              </p>
            </li>

            <li className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <span
                aria-hidden
                className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
              >
                03
              </span>
              <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Pégale el prompt de abajo.
              </h4>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                Reemplaza los corchetes con tus respuestas de la Fase 01.
              </p>
            </li>
          </ol>

          <PromptBlock>{PROMPT_BUILDER}</PromptBlock>

          <ol className="space-y-7" start={4}>
            <li
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
              value={4}
            >
              <span
                aria-hidden
                className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
              >
                04
              </span>
              <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Lee la respuesta de Claude con cuidado.
              </h4>
              <p className="text-base leading-relaxed text-[var(--color-body)]">
                Lo que te devuelve es el "espejo" de tu caso. Si lo resumió
                mal, hay algo en tu Fase 01 que no estaba claro — vuelve,
                ajústalo, y reenvía el prompt. Si lo resumió bien, ya tienes
                asistente.
              </p>
            </li>

            <li
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
              value={5}
            >
              <span
                aria-hidden
                className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
              >
                05
              </span>
              <h4 className="self-end text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Hazle dos preguntas reales.
              </h4>
              <div className="space-y-3 text-base leading-relaxed text-[var(--color-body)]">
                <p>
                  Cosas que normalmente le pedirías a un colega o a un profesor
                  sobre tu caso. Por ejemplo:
                </p>
                <ul className="space-y-2 border-l border-[var(--color-hairline)] pl-5">
                  <li className="font-display italic text-[var(--color-body-strong)]">
                    "¿Cuál es la objeción más común que tendría un cliente
                    peruano al comprar mi producto, y cómo la respondo?"
                  </li>
                  <li className="font-display italic text-[var(--color-body-strong)]">
                    "Si tuviera que escoger una sola estrategia para los
                    próximos tres meses, ¿cuál priorizarías y por qué?"
                  </li>
                  <li className="font-display italic text-[var(--color-body-strong)]">
                    "Hazme un análisis SWOT honesto de mi caso, sin cumplidos."
                  </li>
                </ul>
                <p>
                  Itera con Claude un par de turnos. Pídele que profundice, que
                  cambie de ángulo, que sea más concreto. Esto es la parte
                  importante — te estás acostumbrando a que la primera
                  respuesta no es la final.
                </p>
              </div>
            </li>
          </ol>
        </Block>

        {/* ───── FASE 03 ───── */}
        <Block id="tt-fase-03" className="space-y-10 border-t border-[var(--color-hairline)] pt-16 md:pt-20">
          <PhaseHeader
            index="03"
            title="Pide tu primer entregable"
            duration="Siete minutos. Hora de producir algo que te lleves."
          />

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Escoge una de las cuatro opciones de abajo. Solo una. Copia el
            prompt y dáselo a Claude en el mismo chat donde acabas de
            construir tu asistente — el contexto que cargaste se mantiene.
          </p>

          <OptionsGrid />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Cuando Claude termine, descarga el Artifact o copia el link para
            compartirlo. Si te gusta cómo quedó pero algo no calza, pídele
            cambios — no abras un chat nuevo. Itera. Esa iteración es donde
            realmente aprendes a usar Claude.
          </p>
        </Block>

        {/* ───── Si te quedaste atorado ───── */}
        <Block id="tt-atorado" className="space-y-6 pt-8">
          <SectionHeading
            eyebrow="Sección"
            title="Si te quedaste atorado"
          />
          <AtoradoPanel />
        </Block>

        {/* ───── Lo que te llevas ───── */}
        <Block id="tt-llevas" className="space-y-6">
          <SectionHeading eyebrow="Cierre" title="Lo que te llevas" />

          <p className="text-base leading-relaxed text-[var(--color-body-strong)] md:text-lg">
            Si llegaste hasta acá, tienes tres cosas: tu caso definido en
            cinco respuestas claras, un asistente con tu contexto que puedes
            seguir usando mañana, y un primer entregable real. Eso es más que
            la mayoría de personas que pagan por cursos de IA.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Lo que viene en el siguiente bloque es la hoja de ruta — qué plan
            elegir según cómo termines usando esto, y qué pasos siguen si
            quieres ir más lejos.
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
