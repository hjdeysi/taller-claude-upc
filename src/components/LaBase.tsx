"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useInView } from "motion/react";
import {
  Globe,
  Microscope,
  Type as TypeIcon,
  Brain,
  Paperclip,
  ExternalLink,
} from "lucide-react";
import {
  fadeUp,
  STAGGER,
  useMotionVariants,
} from "@/lib/motion";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "base-cuenta", label: "Crea tu cuenta" },
  { id: "base-chat", label: "Tu primer chat" },
  { id: "base-formula", label: "La fórmula del prompt" },
  { id: "base-modelos", label: "Qué modelo te toca" },
  { id: "base-modos", label: "Los modos" },
  { id: "base-errores", label: "Errores comunes" },
  { id: "base-llevar", label: "Para llevarte algo" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block wrapper — same pattern as Bienvenida.
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
// Static content
// ──────────────────────────────────────────────────────────────────────

const CHAT_TIPS = [
  {
    title: "Es una conversación, no una búsqueda.",
    body: "Si la primera respuesta no te convence, no abras un chat nuevo. Pídele que cambie el tono, que sea más corto, que use otro ejemplo, que se enfoque en otro ángulo. Claude recuerda todo lo que ya hablaron en ese chat.",
  },
  {
    title: "Puedes adjuntar cosas.",
    body: "PDFs, imágenes, capturas de pantalla, Excel, Word. Hasta cierto tamaño. Si tienes un brief o un informe, súbelo en vez de pegar el texto.",
  },
  {
    title: "Los chats se guardan.",
    body: "A la izquierda ves tu historial. Para volver a un chat viejo, lo abres y sigues donde quedaste.",
  },
];

const FORMULA_ELEMENTS = [
  {
    name: "Rol",
    desc: "quién quieres que sea Claude para esta tarea.",
    example:
      "Eres un analista financiero senior con experiencia en startups latinoamericanas.",
  },
  {
    name: "Contexto",
    desc: "qué necesita saber para no inventar.",
    example:
      "Mi empresa es una marca de café tostado en Lima, vendemos online y a tres cafeterías. Facturamos S/30,000 al mes.",
  },
  {
    name: "Tarea",
    desc: "qué quieres que haga, en una frase clara.",
    example:
      "Necesito un análisis de cuál de estos tres canales me conviene priorizar.",
  },
  {
    name: "Formato",
    desc: "cómo quieres la respuesta.",
    example:
      "Respóndeme en una tabla comparativa con tres columnas: canal, ventaja principal, riesgo. Después agrega un párrafo de recomendación.",
  },
  {
    name: "Ejemplos",
    desc: "opcional, pero útil cuando la tarea es subjetiva.",
    example:
      "Para que te ubiques: ejemplos de tono que me gustan son las marcas Tunki y Café del Valle.",
  },
];

const WEAK_PROMPT = "¿qué canal me conviene para vender mi café?";

const STRONG_PROMPT = `Eres un analista de marketing con experiencia en marcas pequeñas de consumo en Lima. Mi empresa es una marca de café tostado que vende online por Shopify, en tres cafeterías (consignación), y por Instagram con DMs. Facturamos S/30,000 al mes. Necesito decidir cuál de estos tres canales priorizar el próximo trimestre.

Dame una tabla comparativa con: canal, ventaja principal, riesgo más serio, próximo paso concreto. Cierra con un párrafo de recomendación. Si te falta información para decidir, dime qué necesitas antes.`;

const MODELS = [
  {
    name: "Haiku",
    body: "el más rápido y económico. Ideal para tareas cortas y repetitivas.",
  },
  {
    name: "Sonnet",
    body: "el modelo de uso general. Es el que vas a tener disponible la mayor parte del tiempo en cuenta gratis.",
  },
  {
    name: "Opus",
    body: "el más capaz, especialmente para razonamiento complejo, análisis financiero, código y tareas largas. Disponible en Pro y Max.",
  },
];

const MODES = [
  {
    Icon: Globe,
    title: "Búsqueda web.",
    body: "Activa cuando necesitas información reciente: precios actuales, noticias, datos de mercado, lanzamientos. Sin ella, Claude responde solo con lo que sabía hasta su fecha de entrenamiento.",
  },
  {
    Icon: Microscope,
    title: "Research.",
    body: "Es búsqueda, pero más profunda y con citas. Claude se toma varios minutos investigando y entrega un reporte estructurado. Útil para análisis de mercado, due diligence, investigación competitiva. La vamos a usar en el bloque 4.",
  },
  {
    Icon: TypeIcon,
    title: "Estilos.",
    body: "Cambia el tono y formato sin tener que pedirlo en cada prompt. Hay estilos preconfigurados (formal, conciso, didáctico) y puedes crear los tuyos. Si trabajas en una marca con voz definida, este es un atajo enorme.",
  },
  {
    Icon: Brain,
    title: "Memoria.",
    body: "Claude recuerda preferencias y contexto que le dijiste antes — entre chats sueltos, no solo dentro de uno. Tienes que activarla en ajustes y puedes ver y editar lo que recuerda.",
  },
  {
    Icon: Paperclip,
    title: "Subir archivos.",
    body: "PDFs, Word, Excel, imágenes, capturas. Súbelos en vez de copiar y pegar contenido largo.",
  },
];

const COMMON_ERRORS = [
  {
    title: "Tratar a Claude como un buscador.",
    body: 'Preguntas cortas tipo Google ("mejores estrategias de marketing 2026") devuelven respuestas genéricas. Ya sabes la fórmula; aplícala.',
  },
  {
    title: "No iterar.",
    body: 'La primera respuesta es un borrador, no la entrega final. Si algo no te cuadra, dilo: "este punto es muy genérico, dame algo específico para una marca de café local". Claude ajusta.',
  },
  {
    title: "No dar contexto.",
    body: "Si Claude no sabe nada de tu negocio, te va a responder como respondería para cualquier negocio. Eso es ruido. Dale contexto siempre.",
  },
];

const PRACTICE_STEPS = [
  "Piensa en un caso de tu carrera o tu trabajo donde gastas tiempo (un análisis recurrente, un correo formal frecuente, un brief de marketing).",
  "Escribe un prompt usando los cinco elementos de la fórmula. Sé específico con tu contexto.",
  "Manda el prompt y mira qué te devuelve Claude.",
  "Pídele un cambio: tono, formato, profundidad.",
  "Guarda el chat.",
];

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function LaBase() {
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
        <Block id="base-hook">
          <blockquote className="pull-quote">
            <p>
              La diferencia entre la persona que saca poco de Claude y la que
              saca mucho no está en pagar más. Está en cómo le habla.
            </p>
          </blockquote>
        </Block>

        {/* Lead with drop cap */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            La mayoría usa Claude como si fuera Google: tira preguntas cortas,
            lee la respuesta y se queda con eso. Funciona, pero apenas roza lo
            que la herramienta puede hacer. Este bloque es la base para el resto
            del taller — la cuenta, el primer chat, la fórmula del prompt, y los
            modos que probablemente nunca tocaste.
          </p>
        </Block>

        {/* Crea tu cuenta */}
        <Block id="base-cuenta" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Crea tu cuenta" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Es gratis y toma menos de un minuto.
          </p>
          <ol className="space-y-5">
            {[
              <>
                Abre tu navegador y entra a{" "}
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  claude.ai
                </a>
                .
              </>,
              <>
                Haz clic en{" "}
                <strong className="font-semibold text-[var(--color-ink)]">
                  Crear cuenta
                </strong>
                . Recomendamos usar tu cuenta de Google — un par de clics y
                listo.
              </>,
              <>Verifica tu correo si te lo piden.</>,
              <>Ya estás dentro.</>,
            ].map((step, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5">
                <span
                  aria-hidden
                  className="select-none font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-muted-soft)] md:text-4xl"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <p className="self-center text-base leading-relaxed text-[var(--color-body)] md:text-lg">
                  {step}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Una aclaración para que no te confundas en el resto del manual:{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              claude.ai
            </strong>{" "}
            es el chat del navegador. Es donde vas a vivir el 90% del taller.
            Existen otras cosas con la palabra "Claude" en el nombre — Claude
            Code, Claude para Chrome, Claude para Excel, Cowork — y cada una
            vive en su propio lugar. Las vamos a ver al final del manual. Por
            ahora, claude.ai.
          </p>
        </Block>

        {/* Tu primer chat */}
        <Block id="base-chat" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Tu primer chat" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            La interfaz es simple. Hay una caja para escribir abajo, un
            historial de chats a la izquierda, y opciones del modelo y
            herramientas arriba. Escribes, mandas, recibes respuesta, vuelves a
            escribir. Como WhatsApp.
          </p>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tres cosas que conviene saber desde el principio:
          </p>
          <ul className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
            {CHAT_TIPS.map((tip) => (
              <li key={tip.title} className="py-5">
                <h4 className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
                  {tip.title}
                </h4>
                <p className="mt-1 text-base leading-relaxed text-[var(--color-body)]">
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        {/* La fórmula del prompt */}
        <Block id="base-formula" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="La fórmula del prompt" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Acá está el cambio más grande que vas a hacer en cómo le hablas a la
            IA. La diferencia entre un prompt malo y uno bueno no está en
            escribir más palabras: está en darle a Claude lo que necesita para
            responder bien.
          </p>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cinco elementos. No todos son obligatorios, pero cuanto mejor los
            uses, mejor resultado vas a obtener.
          </p>
          <FormulaList />
          <PromptComparison />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            La segunda no es más larga por gusto. Cada frase le da a Claude una
            pieza que necesita para no responder con genéricos.
          </p>
        </Block>

        {/* Qué modelo te toca */}
        <Block id="base-modelos" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Qué modelo te toca" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuando abres un chat nuevo, Claude usa un modelo por defecto. Hay
            tres familias activas en este momento:
          </p>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {MODELS.map((m) => (
              <div
                key={m.name}
                className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-6 md:p-7"
              >
                <h4 className="font-display text-3xl leading-none tracking-[-0.02em] text-[var(--color-ink)]">
                  {m.name}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-body)] md:text-base">
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          <div className="callout-aside space-y-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="block h-px w-8 bg-[var(--color-primary)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Para profundizar
              </span>
            </div>
            <p className="text-base leading-relaxed text-[var(--color-body-strong)]">
              <strong className="font-semibold text-[var(--color-ink)]">
                Sobre Opus 4.7
              </strong>{" "}
              — la versión más reciente del modelo más avanzado. Anthropic
              reporta que es notablemente mejor que sus antecesores como
              analista financiero: produce análisis más rigurosos, presentaciones
              más profesionales y mantiene mejor la coherencia en tareas largas.
              Si trabajas en finanzas, consultoría o análisis complejos, este es
              el modelo que justifica un plan Pro.
            </p>
            <a
              href="https://www.anthropic.com/news/claude-opus-4-7"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              Ver el anuncio completo
              <ExternalLink
                aria-hidden
                strokeWidth={1.5}
                className="h-3.5 w-3.5"
              />
            </a>
          </div>

          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            En cuenta gratis no eliges modelo manualmente — Claude decide según
            la tarea. Para acceder a Opus de forma consistente necesitas Pro o
            Max.
          </p>
        </Block>

        {/* Los modos */}
        <Block id="base-modos" className="space-y-6">
          <SectionHeading
            eyebrow="Sección"
            title="Los modos que cambian el resultado"
          />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Arriba de la caja de texto hay opciones que mucha gente nunca toca.
            Cada una cambia cómo Claude responde.
          </p>
          <ul className="space-y-6">
            {MODES.map(({ Icon, title, body }) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-x-5">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-muted)]"
                >
                  <Icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h4 className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
                    {title}
                  </h4>
                  <p className="mt-1 text-base leading-relaxed text-[var(--color-body)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        {/* Errores comunes */}
        <Block id="base-errores" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Errores comunes al empezar" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tres patrones que vas a evitar de aquí en adelante.
          </p>
          <ol className="space-y-7">
            {COMMON_ERRORS.map((item, i) => (
              <li
                key={item.title}
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
        </Block>

        {/* Para llevarte algo concreto */}
        <Block id="base-llevar" className="space-y-6">
          <SectionHeading
            eyebrow="Sección"
            title="Para llevarte algo concreto"
          />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Antes de pasar al siguiente bloque, prueba esto en tu cuenta. Toma
            cinco minutos.
          </p>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]/55 p-7 md:p-9">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Ejercicio práctico
            </p>
            <ol className="space-y-4">
              {PRACTICE_STEPS.map((step, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-x-5"
                >
                  <span
                    aria-hidden
                    className="select-none font-display text-2xl leading-none tracking-[-0.02em] text-[var(--color-primary)]"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="self-center text-base leading-relaxed text-[var(--color-body-strong)]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Ese chat es tu primer punto de comparación. Lo vamos a usar en
            bloques posteriores cuando agreguemos Skills, Projects y
            herramientas.
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

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

function FormulaList() {
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
      {FORMULA_ELEMENTS.map((el, i) => (
        <motion.li
          key={el.name}
          variants={variants}
          className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2"
        >
          <span
            aria-hidden
            className="row-span-2 select-none font-display text-5xl leading-none tracking-[-0.03em] text-[var(--color-muted-soft)] md:text-6xl"
          >
            {(i + 1).toString().padStart(2, "0")}
          </span>
          <h4 className="self-end text-base text-[var(--color-ink)] md:text-lg">
            <strong className="font-semibold">{el.name}</strong>{" "}
            <span className="text-[var(--color-muted)]">— {el.desc}</span>
          </h4>
          <p className="font-display text-base italic leading-relaxed text-[var(--color-body)] md:text-lg">
            "{el.example}"
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

function PromptComparison() {
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
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
      className="grid gap-4 md:grid-cols-2 md:gap-5"
    >
      <motion.div variants={variants}>
        <PromptCard label="Prompt débil" tone="weak">
          {WEAK_PROMPT}
        </PromptCard>
      </motion.div>
      <motion.div variants={variants}>
        <PromptCard label="Prompt potente" tone="strong">
          {STRONG_PROMPT}
        </PromptCard>
      </motion.div>
    </motion.div>
  );
}

function PromptCard({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "weak" | "strong";
  children: string;
}) {
  const isWeak = tone === "weak";

  return (
    <div
      className="flex h-full flex-col rounded-[var(--radius-lg)] border p-7 md:p-8"
      style={{
        borderColor: isWeak
          ? "var(--color-hairline)"
          : "var(--color-primary-disabled)",
        backgroundColor: isWeak
          ? "var(--color-surface-soft)"
          : "var(--color-surface-card)",
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          aria-hidden
          className="block h-1 w-1 rounded-full"
          style={{
            backgroundColor: isWeak
              ? "var(--color-muted-soft)"
              : "var(--color-primary)",
          }}
        />
        <span
          className="text-[11px] font-medium uppercase tracking-[0.22em]"
          style={{
            color: isWeak ? "var(--color-muted)" : "var(--color-primary)",
          }}
        >
          {label}
        </span>
      </div>
      <p
        className="whitespace-pre-line font-mono text-[13px] leading-[1.65] md:text-[14px]"
        style={{
          color: isWeak ? "var(--color-muted)" : "var(--color-body-strong)",
        }}
      >
        {children}
      </p>
    </div>
  );
}
