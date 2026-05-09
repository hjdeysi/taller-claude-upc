"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink } from "lucide-react";
import {
  fadeUp,
  STAGGER,
  DURATION,
  EASE_OUT_PREMIUM,
  useMotionVariants,
} from "@/lib/motion";
import { PlanBadge } from "./PlanBadge";

// ──────────────────────────────────────────────────────────────────────
// Mini-TOC items
// ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "c-plan", label: "Qué plan elegir" },
  { id: "c-semana", label: "Esta semana" },
  { id: "c-profundizar", label: "Para profundizar" },
  { id: "c-setup", label: "Setup técnico" },
  { id: "c-cierre", label: "Una última cosa" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block + SectionHeading
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
// Plan profile cards — visual anchor of the block.
// Three cards in a row on desktop, stacked on mobile. Uniform structure
// across all three: badge top, identifier line in italic Cormorant,
// two body paragraphs, hairline divider, cost eyebrow at the bottom.
// The badge is the only thing that varies between the three.
// ──────────────────────────────────────────────────────────────────────

interface PlanProfile {
  plan: "free" | "pro" | "max";
  identifier: string;
  paragraphs: string[];
  cost: string;
}

const PLAN_PROFILES: PlanProfile[] = [
  {
    plan: "free",
    identifier: "Lo uso cuando lo necesito",
    paragraphs: [
      "Lo abres tres o cuatro veces por semana. Resuelves tareas puntuales: redactar un correo difícil, resumir un PDF largo, hacer un análisis ad-hoc, generar un Artifact ocasional.",
      "Cuenta gratis te alcanza. La cuota diaria es generosa para este uso. Te quedarás corto si empiezas a depender de Claude varias horas al día — pero ahí ya estás en otro perfil.",
    ],
    cost: "$0/mes",
  },
  {
    plan: "pro",
    identifier: "Es mi asistente diario",
    paragraphs: [
      "Trabajas con Claude todos los días. Tienes uno o dos Projects con tu contexto cargado. Has conectado Gmail o Calendar. Cuando llega un análisis financiero o una propuesta para un cliente, abres Claude antes que Excel.",
      "Pro es el plan que abre el ecosistema completo: Skills, Projects sin restricción, Claude para Excel, Claude para Chrome, Cowork dentro de Office, modelos premium tipo Opus 4.7, Research mode profundo. Para 9 de cada 10 alumnos de negocios que se vuelven usuarios serios, Pro es donde aterrizan.",
    ],
    cost: "$20/mes",
  },
  {
    plan: "max",
    identifier: "Es parte de cómo trabajo",
    paragraphs: [
      "Tienes agentes corriendo en horarios fijos. Usas Claude Code para procesar documentos en lote. Cowork tu día entero entre Excel, Outlook y Slack. Las cuotas de Pro te quedaron cortas.",
      "Max es para uso intensivo real, no para sentirte premium. Si no estás chocando contra los límites de Pro, Pro está bien.",
    ],
    cost: "$100 o $200/mes según volumen",
  },
];

function PlanProfilesGrid() {
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
            delayChildren: 0.1,
          },
        },
      }}
      className="grid gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {PLAN_PROFILES.map((p) => (
        <motion.li key={p.plan} variants={variants}>
          <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-7 md:p-8">
            <PlanBadge plan={p.plan} size="md" />

            <p className="mt-5 font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
              "{p.identifier}"
            </p>

            <div className="mt-5 flex-1 space-y-4 text-base leading-relaxed text-[var(--color-body)]">
              {p.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-hairline)] pt-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Costo
              </span>
              <span className="text-sm text-[var(--color-body-strong)]">
                {p.cost}
              </span>
            </div>
          </article>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// "Esta semana" — numbered list of 4 actions
// ──────────────────────────────────────────────────────────────────────

const WEEK_ACTIONS: { title: ReactNode; body: ReactNode }[] = [
  {
    title: "Activa la memoria de Claude.",
    body: (
      <>
        <strong className="font-semibold text-[var(--color-ink)]">
          Ajustes → Capacidades → Memoria
        </strong>
        . A partir de ahí cada conversación va a ser un poco más útil que la
        anterior.
      </>
    ),
  },
  {
    title: "Conecta Gmail o Google Calendar.",
    body: (
      <>
        <strong className="font-semibold text-[var(--color-ink)]">
          Ajustes → Conexiones
        </strong>
        . Cuatro minutos. La primera vez que le pidas "resume mis correos no
        leídos de hoy" entiendes por qué la conexión vale.
      </>
    ),
  },
  {
    title: "Sube tu primer Skill.",
    body: (
      <>
        Encuentra una en{" "}
        <span className="font-mono text-[var(--color-primary)]">
          skillsmp.com
        </span>{" "}
        o{" "}
        <span className="font-mono text-[var(--color-primary)]">
          claudemarketplaces.com
        </span>{" "}
        que se acerque a lo que haces. Bájala, súbela en Capacidades, prueba.
      </>
    ),
  },
  {
    title: "Vuelve al chat que armaste en el Bloque 06.",
    body: "Sigue conversando con tu asistente. Pídele otro entregable. Itera. La diferencia entre una herramienta que abandonas y una que adoptas es cuántas veces vuelves la primera semana.",
  },
];

function WeekList() {
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
      {WEEK_ACTIONS.map((a, i) => (
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
            {a.title}
          </h4>
          <p className="text-base leading-relaxed text-[var(--color-body)]">
            {a.body}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

// ──────────────────────────────────────────────────────────────────────
// "Para profundizar" — three curated resources
// ──────────────────────────────────────────────────────────────────────

interface LinkItem {
  title: string;
  body: ReactNode;
  link?: { url: string; label: string };
}

const RESOURCES: LinkItem[] = [
  {
    title: "Documentación oficial de Claude",
    link: { url: "https://claude.com/docs", label: "claude.com/docs" },
    body: "La fuente. Cuando algo cambie (que va a cambiar), acá estará primero.",
  },
  {
    title: "Cookbooks de Anthropic",
    link: {
      url: "https://github.com/anthropics/claude-cookbooks",
      label: "github.com/anthropics/claude-cookbooks",
    },
    body: "Notebooks con ejemplos reales para casos de negocio: análisis financiero con Excel, creación de skills, integración con APIs externas. Más técnico que claude.ai pero traducible.",
  },
  {
    title: "Comunidades activas",
    link: {
      url: "https://www.reddit.com/r/ClaudeAI/",
      label: "r/ClaudeAI · Discord oficial",
    },
    body: "Ahí es donde se filtran trucos reales antes de aparecer en artículos. Pasa una vez a la semana.",
  },
];

const SETUP_LINKS: LinkItem[] = [
  {
    title: "Claude Desktop",
    link: { url: "https://claude.com/download", label: "claude.com/download" },
    body: "La app de escritorio oficial de Claude. Necesaria para Cowork y para acceso completo a integraciones locales.",
  },
  {
    title: "Visual Studio Code",
    link: {
      url: "https://code.visualstudio.com/",
      label: "code.visualstudio.com",
    },
    body: "Editor de texto gratuito de Microsoft. Es el entorno donde la mayoría de gente usa Claude Code. Si no tienes editor instalado, este es el camino más estándar.",
  },
  {
    title: "Git",
    link: { url: "https://git-scm.com/install/", label: "git-scm.com/install" },
    body: "El sistema de control de versiones que Claude Code asume instalado para gestionar cambios en archivos. Si vas a usar Claude Code, instálalo antes.",
  },
  {
    title: "GitHub",
    link: { url: "https://github.com/", label: "github.com" },
    body: "La plataforma donde viven los repositorios de Skills y plantillas que vas a poder bajar e instalar. Crea una cuenta gratis para clonar y subir tus propios proyectos.",
  },
  {
    title: "Google Antigravity",
    link: { url: "https://antigravity.google/", label: "antigravity.google" },
    body: "Alternativa a VS Code, un IDE con IA nativa lanzado por Google. Útil si quieres comparar entornos de desarrollo asistido por IA. Funciona bien junto a Claude Code.",
  },
];

function ResourcesList({ items }: { items: LinkItem[] }) {
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
          transition: { staggerChildren: STAGGER.items, delayChildren: 0.05 },
        },
      }}
      className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]"
    >
      {items.map((r) => (
        <motion.li key={r.title} variants={variants} className="py-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base font-semibold text-[var(--color-ink)] md:text-lg">
              {r.title}
            </span>
            {r.link && (
              <>
                <span aria-hidden className="text-[var(--color-muted-soft)]">
                  —
                </span>
                <a
                  href={r.link.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] underline-offset-4 hover:underline md:text-base"
                >
                  {r.link.label}
                  <ExternalLink
                    aria-hidden
                    strokeWidth={1.5}
                    className="h-3.5 w-3.5"
                  />
                </a>
              </>
            )}
          </div>
          <p className="mt-2 text-base leading-relaxed text-[var(--color-body)]">
            {r.body}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Closing — "Una última cosa"
// More breathing space than the rest of the block. Body type bumped one
// step up. The closing line is in italic Cormorant, and a single
// centered spike-mark glyph sits below as the typographic period —
// same character the global Footer carries, so the manual closes with
// the same mark that wraps the page.
// ──────────────────────────────────────────────────────────────────────

function Closing() {
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
          transition: { staggerChildren: 0.18, delayChildren: 0.05 },
        },
      }}
      className="space-y-10"
    >
      <motion.div variants={variants}>
        <SectionHeading eyebrow="Cierre" title="Una última cosa" />
      </motion.div>

      <motion.div variants={variants} className="space-y-6">
        <p className="text-lg leading-[1.7] text-[var(--color-body-strong)] md:text-xl">
          Tres horas, ocho bloques, cuatro herramientas, un puñado de prompts
          copiables y un asistente que ahora sabe quién eres. Lo que sigue no
          lo decide este manual. Lo decide cuántas veces abras Claude el
          lunes en vez de abrir Google.
        </p>
        <p className="text-lg leading-[1.7] text-[var(--color-body-strong)] md:text-xl">
          Si dentro de tres meses te das cuenta de que estás resolviendo en
          quince minutos cosas que antes te tomaban dos horas, este taller
          cumplió. Si no, vuelve al Bloque 06 y ejecuta el ejercicio otra vez
          con un caso distinto. Casi siempre el problema no es la herramienta
          — es que no la usaste lo suficiente.
        </p>
      </motion.div>

      {/* Closing line — italic Cormorant, with extra breathing space above */}
      <motion.p
        variants={variants}
        transition={{
          duration: DURATION.xl,
          ease: EASE_OUT_PREMIUM,
          delay: 0.1,
        }}
        className="pt-12 font-display text-2xl italic leading-snug text-[var(--color-ink)] md:pt-16 md:text-3xl"
      >
        Hasta acá. Buena suerte.
      </motion.p>

      {/* Typographic period — single spike-mark glyph centered, same
          character the global Footer carries. */}
      <motion.div
        variants={variants}
        transition={{
          duration: DURATION.xl,
          ease: EASE_OUT_PREMIUM,
          delay: 0.25,
        }}
        className="pt-10 text-center md:pt-14"
      >
        <span
          aria-hidden
          className="font-display text-3xl text-[var(--color-muted-soft)] md:text-4xl"
        >
          ✳
        </span>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function Cierre() {
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
        <Block id="c-hook">
          <blockquote className="pull-quote">
            <p>
              Tres horas. Lo que hagas con esto a partir del lunes es lo que
              decide si valieron la pena.
            </p>
          </blockquote>
        </Block>

        {/* Lead */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            Si llegaste hasta acá, ya entendiste que Claude no es un chatbot
            — es una capa que se mete dentro de tus apps, tu navegador, tu
            computador, tu forma de trabajar. Lo que queda es la parte más
            prosaica: qué plan elegir, qué hacer esta semana, dónde seguir
            aprendiendo. Cinco minutos y cerramos.
          </p>
        </Block>

        {/* Qué plan elegir */}
        <Block id="c-plan" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Qué plan elegir" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tres perfiles típicos. Lee los tres y ubícate honestamente.
          </p>
          <PlanProfilesGrid />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Una recomendación honesta: empieza en{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Free
            </strong>
            , sube a{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Pro
            </strong>{" "}
            cuando te encuentres pensando "ojalá pudiera hacer esto sin chocar
            con los límites" más de tres veces por semana. Sube a{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Max
            </strong>{" "}
            cuando Pro te quede corto. La mayoría de la gente no llega a
            necesitar Max, y está bien.
          </p>
        </Block>

        {/* Esta semana */}
        <Block id="c-semana" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Esta semana" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cuatro acciones concretas para los próximos siete días. Ninguna
            toma más de quince minutos. Si haces dos, ya capitalizaste el
            taller.
          </p>
          <WeekList />
        </Block>

        {/* Para profundizar */}
        <Block id="c-profundizar" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Para profundizar" />
          <ResourcesList items={RESOURCES} />
        </Block>

        {/* Enlaces para el setup */}
        <Block id="c-setup" className="space-y-6">
          <SectionHeading eyebrow="Sección" title="Enlaces para el setup" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cinco herramientas que vas a necesitar si decides ir a la capa
            más avanzada del ecosistema — especialmente Claude Code y la
            integración con tu sistema de archivos. Ninguna es obligatoria
            para el resto del manual. Léelas como un setup técnico a tu ritmo.
          </p>
          <ResourcesList items={SETUP_LINKS} />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Si nunca has usado terminal ni Git y te sientes intimidado, es
            normal. La mayoría de personas que terminan usando Claude Code
            empiezan así. Hay tutoriales de quince minutos para cada uno de
            estos enlaces. Lo más rentable que puedes hacer si te interesa
            este camino es invertir una tarde en instalar los cinco y tener
            todo listo, aunque no lo uses esa misma tarde.
          </p>
        </Block>

        {/* Una última cosa — closing */}
        <div id="c-cierre" className="scroll-mt-24 pt-8 md:pt-12">
          <Closing />
        </div>
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
