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
  LayoutDashboard,
  Eye,
  BarChart3,
  ScanLine,
  Copy,
  Check,
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
  { id: "demos-mapa", label: "Las cuatro demos" },
  { id: "demo-01", label: "01 · Dashboard" },
  { id: "demo-02", label: "02 · Competencia" },
  { id: "demo-03", label: "03 · Simulador" },
  { id: "demo-04", label: "04 · Boletas" },
  { id: "demos-llevar", label: "Para llevarte algo" },
];

// ──────────────────────────────────────────────────────────────────────
// Reusable Block + helpers
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
// 2×2 Demos overview grid
// ──────────────────────────────────────────────────────────────────────

interface DemoMeta {
  id: string;
  index: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  title: string;
  blurb: string;
  capability: string;
  plan: "free" | "pro" | "max";
}

const DEMOS_OVERVIEW: DemoMeta[] = [
  {
    id: "demo-01",
    index: "01",
    Icon: LayoutDashboard,
    title: "Dashboard de datos interactivo",
    blurb:
      "Subes un CSV. Sale un dashboard navegable con filtros conectados.",
    capability: "Artifacts avanzado",
    plan: "pro",
  },
  {
    id: "demo-02",
    index: "02",
    Icon: Eye,
    title: "Análisis de competencia con scraping",
    blurb:
      "Pegas el contenido de la web de tu competidor. Obtienes un brief estratégico que tomaría días de trabajo.",
    capability: "Análisis estratégico",
    plan: "free",
  },
  {
    id: "demo-03",
    index: "03",
    Icon: BarChart3,
    title: "Simulador de escenarios financieros",
    blurb:
      "Sliders con tus supuestos. Mil simulaciones. Distribución de resultados posibles.",
    capability: "Artifacts computacional",
    plan: "pro",
  },
  {
    id: "demo-04",
    index: "04",
    Icon: ScanLine,
    title: "Reporte de gastos desde fotos de boletas",
    blurb:
      "Cowork lee tus boletas físicas y genera un reporte mensual con visualizaciones.",
    capability: "Cowork",
    plan: "max",
  },
];

function DemosOverviewGrid() {
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
      {DEMOS_OVERVIEW.map((d) => (
        <motion.li key={d.id} variants={variants}>
          <a
            href={`#${d.id}`}
            onClick={(e) => onCardClick(e, d.id)}
            className="group block h-full rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-7 transition-all duration-300 hover:-translate-y-[2px] hover:border-[var(--color-primary-disabled)] md:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                <d.Icon strokeWidth={1.5} className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-mono tabular-nums text-[12px] tracking-[0.18em] text-[var(--color-muted-soft)]">
                {d.index}
              </span>
            </div>

            <h4 className="font-display text-2xl leading-tight tracking-[-0.01em] text-[var(--color-ink)] md:text-[28px]">
              {d.title}
            </h4>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">
              {d.blurb}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--color-hairline)] pt-4">
              <span className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {d.capability}
              </span>
              <div className="flex shrink-0 items-center gap-3">
                <PlanBadge plan={d.plan} size="sm" />
                <ArrowRight
                  strokeWidth={1.5}
                  aria-hidden
                  className="h-4 w-4 text-[var(--color-muted-soft)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
                />
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ──────────────────────────────────────────────────────────────────────
// PromptBlock — copyable prompt with bracketed placeholder pills
// ──────────────────────────────────────────────────────────────────────

function PromptBlock({ children: text }: { children: string }) {
  const [copied, setCopied] = useState(false);

  function onCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  // Tokenize on [bracketed] placeholders so they can render distinctly.
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

  return (
    <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-6 pt-12 md:p-7 md:pt-12">
      <div className="absolute left-6 top-3 flex items-center gap-3 md:left-7">
        <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-muted-soft)]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Prompt copiable
        </span>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copiado" : "Copiar prompt"}
        className="absolute right-3 top-2.5 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-primary-disabled)] hover:text-[var(--color-primary)] md:right-4"
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
      <div className="whitespace-pre-wrap font-mono text-[13px] leading-[1.7] text-[var(--color-body-strong)] md:text-[14px]">
        {parts}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// DemoCallout — eyebrow-tagged callout with coral side rule
// ──────────────────────────────────────────────────────────────────────

function DemoCallout({
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

// ──────────────────────────────────────────────────────────────────────
// DemoSubHeading — small uppercase tag used between phases of a demo
// (Pregunta gancho / Contexto / Qué esperar / etc.)
// ──────────────────────────────────────────────────────────────────────

function DemoSubHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
      {children}
    </p>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Plan footer per demo — slightly emphasized for Max so it doesn't get
// drowned next to the Free / Pro siblings, but kept restrained.
// ──────────────────────────────────────────────────────────────────────

function DemoPlanFooter({
  plan,
  children,
}: {
  plan: "free" | "pro" | "max";
  children: ReactNode;
}) {
  const isMax = plan === "max";
  return (
    <div
      className="flex items-start gap-4 rounded-[var(--radius-md)] border bg-[var(--color-canvas)] px-5 py-4"
      style={{
        borderColor: isMax
          ? "rgb(139 92 246 / 0.35)"
          : "var(--color-hairline)",
      }}
    >
      <PlanBadge plan={plan} size="md" />
      <p className="flex-1 self-center text-sm leading-relaxed text-[var(--color-body)]">
        {children}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Demo prompts (literal text)
// ──────────────────────────────────────────────────────────────────────

const PROMPT_01 = `Eres un analista de datos senior. Te paso un CSV con [tipo de datos: ventas mensuales / leads de campañas / gastos por categoría / etc.]. Las columnas son: [lista breve de columnas con descripción de cada una].

Genérame un Artifact con un dashboard interactivo que tenga:

1. Filtros conectados por [columna 1] y [columna 2].
2. Tres gráficos clave con Recharts:
   - [primer gráfico, ej. tendencia mensual]
   - [segundo, ej. distribución por categoría]
   - [tercero, ej. top 10 por valor]
3. Tres KPIs en tarjetas grandes arriba que se recalculen al filtrar.
4. Una sección de "insights" con dos o tres observaciones automáticas sobre los datos.

Diseño limpio, mobile-friendly. Si detectas valores sospechosos (huecos, outliers, inconsistencias), márcalos.

[ADJUNTA EL CSV]`;

const PROMPT_02 = `Actúa como analista de inteligencia competitiva.

Voy a pegarte el contenido completo de la web de mi competidor principal. Analízalo como si estuvieras preparando un brief estratégico para el directorio de mi empresa.

[PEGA AQUÍ: ve a la web del competidor, selecciona todo con Ctrl+A, copia con Ctrl+C, y pega aquí]

Mi empresa es: [describe en una línea: rubro, modelo, mercado].

Dame:

1. Su propuesta de valor real — no lo que dicen, lo que comunican de verdad.
2. A quién le está hablando y qué problema resuelve.
3. Sus tres fortalezas más claras en la comunicación.
4. Sus tres debilidades más evidentes.
5. Pricing visible si lo hay y modelo de monetización.
6. Oportunidades concretas para diferenciarnos sin competir en precio.
7. Mensaje de diferenciación para mi propia web en dos líneas.

Sé honesto: si algo no es verificable solo con esta web, dilo en vez de inventar.`;

const PROMPT_03 = `Eres un analista financiero senior. Te paso el modelo de mi negocio y necesito un simulador de escenarios.

Variables del negocio:
- Precio promedio por unidad: [valor base] (rango realista: [min] a [max])
- Costo variable por unidad: [valor base] (rango: [min] a [max])
- Costos fijos mensuales: [valor base] (rango: [min] a [max])
- Unidades vendidas por mes: [valor base] (rango: [min] a [max])

Métrica de salida: [margen mensual / runway en meses / utilidad anual / etc.].

Genérame un Artifact que tenga:

1. Un slider por cada variable, con su rango realista.
2. Una simulación Monte Carlo de 1,000 iteraciones que se ejecute al cambiar cualquier slider.
3. Un histograma con la distribución de la métrica de salida.
4. Tres KPIs: percentil 10, mediana, percentil 90.
5. Una etiqueta de "probabilidad de [umbral]" — por ejemplo, probabilidad de margen positivo, o probabilidad de runway mayor a doce meses.

Diseño limpio. Ejecuta todo en el navegador del Artifact, sin paquetes externos.`;

const PROMPT_04 = `Tengo una carpeta llamada "Boletas-[mes]" en mi escritorio con fotos de las boletas y recibos del mes pasado ([cantidad aproximada] imágenes).

Necesito que:

1. Proceses cada imagen y extraigas:
   - Fecha
   - Proveedor (negocio)
   - Monto total
   - Categoría sugerida (alimentos, transporte, oficina, marketing, servicios, otros)

2. Generes un Excel con todas las boletas en filas, una por una.

3. Agregues una pestaña "Resumen" con:
   - Total gastado del mes
   - Distribución por categoría (gráfico de torta)
   - Top cinco proveedores por monto
   - Promedio de gasto por categoría

4. Marques con una bandera roja cualquier boleta cuya información no se pueda leer con confianza — imágenes borrosas, recibos cortados, montos ambiguos. No inventes datos.

Guarda el archivo final como "reporte-[mes].xlsx" en mi carpeta de Documentos.

Cuando termines, dame un resumen breve de qué procesaste y qué quedó marcado para revisar.`;

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────

export function Demos() {
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
        <Block id="demos-hook">
          <blockquote className="pull-quote">
            <p>
              Hasta acá vimos las piezas. Ahora veamos cuánto trabajo real
              puede sacar cada una en menos de cinco minutos.
            </p>
          </blockquote>
        </Block>

        {/* Lead */}
        <Block>
          <p className="drop-cap text-lg leading-relaxed text-[var(--color-body-strong)] md:text-xl">
            Cuatro demos cortas. Cada una usa una capa distinta del ecosistema
            — de claude.ai puro al agente de escritorio que opera tu
            computador. Si terminas el taller solo con estas cuatro demos en
            la cabeza, ya sabes lo suficiente para empezar a usar Claude en tu
            trabajo el lunes.
          </p>
        </Block>

        {/* Las cuatro demos — overview grid */}
        <Block id="demos-mapa" className="space-y-8">
          <SectionHeading eyebrow="Sección" title="Las cuatro demos" />
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Una herramienta distinta cada vez. Ordenadas por plan: empezamos
            con lo que ya tienes hoy, terminamos con lo que desbloquea Max.
          </p>
          <DemosOverviewGrid />
        </Block>

        {/* ───── DEMO 01 · Dashboard de datos interactivo ───── */}
        <Block id="demo-01" className="space-y-7">
          <ToolHeading
            index="01"
            eyebrow="Demo"
            title="Dashboard de datos interactivo"
          />

          <DemoSubHeading>Pregunta gancho</DemoSubHeading>
          <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
            ¿Y si tu CSV se abriera como un dashboard navegable, en vez de
            quedarse como una tabla muerta?
          </p>

          <DemoSubHeading>Contexto</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tomas un archivo CSV — ventas mensuales, leads del CRM, gastos de
            campaña, asistentes a un evento. Lo subes al chat, le explicas a
            Claude qué representa cada columna y qué te interesa entender. En
            menos de un minuto, el panel derecho de Artifacts se llena con un
            dashboard interactivo: filtros conectados que se afectan entre sí,
            gráficos por categoría, totales que se recalculan al filtrar. Sin
            Excel, sin Looker, sin tableros.
          </p>

          <DemoSubHeading>Prompt</DemoSubHeading>
          <PromptBlock>{PROMPT_01}</PromptBlock>

          <DemoSubHeading>Qué esperar</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            A los 30-90 segundos, el panel derecho se llena. Filtras por
            sucursal y todo se actualiza en vivo: gráficos, KPIs, insights. Si
            algo no te gusta cómo quedó, lo pides en el chat ("agrega un
            gráfico de tendencia por mes", "cambia el primer KPI por margen") y
            el dashboard se actualiza sin perder los datos.
          </p>

          <DemoSubHeading>Variante para tu negocio</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cualquier tabla con más de 50 filas se beneficia. Ventas mensuales,
            leads del CRM, métricas de campañas, NPS por sucursal, gastos por
            categoría, asistencia a eventos, inventario. Si lo tienes en Excel,
            lo puedes tener como dashboard navegable en un minuto.
          </p>

          <DemoCallout eyebrow="Por qué solo Claude">
            ChatGPT te puede dar el código del dashboard. Claude te entrega el
            dashboard funcionando dentro del chat, listo para interactuar y
            para iterar conversacionalmente. Esa diferencia entre "código" y
            "herramienta" es exactamente lo que separa la categoría.
          </DemoCallout>

          <DemoPlanFooter plan="pro">
            Los Artifacts complejos con interactividad real (Recharts + estado
            + filtros conectados) consumen contexto y la cuota de Pro es la
            mínima razonable para iterar varias veces.
          </DemoPlanFooter>
        </Block>

        {/* ───── DEMO 02 · Análisis de competencia con scraping ───── */}
        <Block id="demo-02" className="space-y-7">
          <ToolHeading
            index="02"
            eyebrow="Demo"
            title="Análisis de competencia con scraping"
          />

          <DemoSubHeading>Pregunta gancho</DemoSubHeading>
          <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
            ¿Y si pudieras leer la estrategia completa de tu competencia tan
            bien como la conoce su propio gerente?
          </p>

          <DemoSubHeading>Contexto</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Tomas la URL de tu competidor principal, copias todo el texto
            visible de su web, y se lo pasas a Claude para que lo analice como
            un consultor estratégico. En menos de un minuto obtienes un brief
            completo: propuesta de valor real, fortalezas, debilidades,
            oportunidades concretas para diferenciarte. La demo más simple del
            bloque y, probablemente, la que más ahorra tiempo.
          </p>

          <DemoSubHeading>Prompt</DemoSubHeading>
          <PromptBlock>{PROMPT_02}</PromptBlock>

          <DemoSubHeading>Qué esperar</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            A los 30-60 segundos, un brief estratégico estructurado. Lee con
            atención el punto 1 — la diferencia entre "lo que dicen" y "lo que
            comunican de verdad" suele ser donde aparece la oportunidad más
            interesante.
          </p>

          <DemoSubHeading>Variante para tu negocio</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cualquier sector, cualquier mercado. Si trabajas en B2B, analiza
            una empresa que le venda a tu mismo cliente ideal. Si tienes tres
            competidores claros, ejecuta la demo tres veces y compara los
            resultados.
          </p>

          {/* Two callouts — separated visually so they read as distinct ideas */}
          <DemoCallout eyebrow="Para profundizar">
            <strong className="font-semibold text-[var(--color-ink)]">
              Versión avanzada en el bloque 5.
            </strong>{" "}
            Cuando llegues a Claude Code (lo verás más adelante), podrás
            automatizar este mismo análisis para cinco o diez competidores en
            lote: Claude Code hace el scraping directo, parsea el HTML, y
            genera el brief sin que tengas que copiar y pegar nada.
          </DemoCallout>

          <div className="h-2 md:h-4" aria-hidden />

          <DemoCallout eyebrow="Por qué solo Claude">
            El análisis estratégico de Claude es notoriamente más matizado que
            el de otros asistentes — especialmente cuando le pides "lo que
            comunican de verdad" vs "lo que dicen". Es uno de los casos donde
            la calidad del razonamiento del modelo se nota más que la
            herramienta usada.
          </DemoCallout>

          <DemoPlanFooter plan="free">
            Una URL a la vez funciona perfecto en cuenta gratis. No necesitas
            pagar para ejecutar esta demo.
          </DemoPlanFooter>
        </Block>

        {/* ───── DEMO 03 · Simulador de escenarios financieros ───── */}
        <Block id="demo-03" className="space-y-7">
          <ToolHeading
            index="03"
            eyebrow="Demo"
            title="Simulador de escenarios financieros"
          />

          <DemoSubHeading>Pregunta gancho</DemoSubHeading>
          <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
            ¿Y si pudieras correr mil veces tu modelo financiero — variando
            todos los supuestos a la vez — y ver la distribución completa de
            resultados posibles?
          </p>

          <DemoSubHeading>Contexto</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Esta demo es la prueba más fuerte de lo que es un Artifact
            computacional. Le explicas a Claude tu modelo: variables clave
            (precio, costo, ventas, costos fijos), rangos realistas para cada
            una, y la métrica que quieres optimizar (margen, runway, utilidad
            anual). Claude genera un Artifact con sliders por variable y, al
            moverlos, dispara una simulación Monte Carlo de mil iteraciones
            que se ejecuta en tu navegador. Lo que sale al otro lado es un
            histograma de distribución, con percentiles y probabilidades.
          </p>

          <DemoSubHeading>Prompt</DemoSubHeading>
          <PromptBlock>{PROMPT_03}</PromptBlock>

          <DemoSubHeading>Qué esperar</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            A los 45-90 segundos, sliders funcionales en el panel derecho.
            Mueves el precio para arriba y el histograma se redibuja en menos
            de un segundo. Te muestra cuán robusto es tu modelo a las
            variables que más te preocupan — no como una sola predicción, sino
            como una distribución completa de posibilidades.
          </p>

          <DemoSubHeading>Variante para tu negocio</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Pricing de un servicio nuevo, presupuesto de marketing con ROI
            variable, decisión de contratar (¿cuándo llego a punto de
            equilibrio?), planeación de runway, scenario planning de un
            proyecto, análisis de sensibilidad de una inversión.
          </p>

          <DemoCallout eyebrow="Por qué solo Claude">
            Construir esto en Excel toma medio día y rompe a la mitad.
            Construir esto programando toma una tarde y necesitas conocer la
            stack. Claude te lo entrega en un minuto, en un panel separado de
            la conversación, y lo iteras en lenguaje natural — "ahora agrega
            también probabilidad de utilidad mayor a S/50,000 por mes". Es la
            diferencia entre tener un modelo y tener una conversación con tu
            modelo.
          </DemoCallout>

          <DemoPlanFooter plan="pro">
            Mil simulaciones por iteración consumen cómputo real; Pro tiene la
            cuota necesaria para iterar varias veces sin quedarte sin contexto.
          </DemoPlanFooter>
        </Block>

        {/* ───── DEMO 04 · Reporte de gastos desde fotos de boletas ───── */}
        <Block id="demo-04" className="space-y-7">
          <ToolHeading
            index="04"
            eyebrow="Demo"
            title="Reporte de gastos desde fotos de boletas"
          />

          <DemoSubHeading>Pregunta gancho</DemoSubHeading>
          <p className="font-display text-xl italic leading-snug text-[var(--color-body-strong)] md:text-2xl">
            ¿Cuánto tiempo te toma cada mes ordenar las boletas físicas y
            armar el reporte de gastos?
          </p>

          <DemoSubHeading>Contexto</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Esta demo es distinta a las anteriores: no se hace en{" "}
            <span className="font-mono text-[var(--color-primary)]">
              claude.ai
            </span>
            , se hace con{" "}
            <strong className="font-semibold text-[var(--color-ink)]">
              Cowork
            </strong>{" "}
            — el agente de escritorio de Claude que opera tu computador como un
            asistente real.
          </p>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Le entregas una carpeta con fotos de tus boletas y recibos del
            mes. Cowork las lee una por una, extrae fecha, monto, proveedor y
            categoría, las organiza en un Excel, y genera un reporte mensual
            con visualizaciones. Tú no abres ni una boleta — solo revisas el
            resultado.
          </p>

          <DemoSubHeading>Prompt</DemoSubHeading>
          <PromptBlock>{PROMPT_04}</PromptBlock>

          <DemoSubHeading>Qué esperar</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Cowork abre tu carpeta, procesa las imágenes una por una y te
            muestra el progreso en vivo. Cinco a diez minutos para veinte
            boletas. Al final, abres el Excel y tienes todo organizado, con
            visualizaciones, listo para enviar a contabilidad, subir al
            sistema, o pasar a tu jefe.
          </p>

          <DemoSubHeading>Variante para tu negocio</DemoSubHeading>
          <p className="text-base leading-relaxed text-[var(--color-body)] md:text-lg">
            Facturas de proveedores en lote, recibos médicos para reembolso del
            seguro, comprobantes de viáticos de un viaje de trabajo, cualquier
            conjunto de documentos físicos que necesites digitalizar y
            consolidar.
          </p>

          <DemoCallout eyebrow="Por qué solo Claude">
            Cowork combina cuatro cosas en una sola herramienta: visión por
            computadora (leer las boletas), procesamiento estructurado (extraer
            datos), creación de archivos en tu disco (generar el Excel), y
            razonamiento contextual (categorizar correctamente, marcar lo
            dudoso). Hacer esto sin Cowork normalmente requiere un OCR, un
            script de Python, una hoja de cálculo y dos horas. Aquí es una sola
            conversación.
          </DemoCallout>

          <DemoPlanFooter plan="max">
            Cowork es el agente de escritorio incluido en Max. Si ahora tienes
            cuenta gratis o Pro, mira esta demo como referencia para entender
            qué desbloquea Max — y como aviso de que en el bloque 5 vamos a
            profundizar más.
          </DemoPlanFooter>
        </Block>

        {/* Para llevarte algo concreto */}
        <Block id="demos-llevar" className="space-y-6">
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
                Antes de pasar al siguiente bloque, elige UNA de las cuatro
                demos y ejecútala con tu propio caso. Solo una. La que más te
                llame la atención, o la que más se acerque a un problema real
                que tengas estos días.
              </p>
              <p>
                Si tienes datos, ejecuta la 01 o la 03. Si tienes un competidor
                que te molesta, ejecuta la 02. Si tienes Max y boletas físicas,
                ejecuta la 04.
              </p>
              <p>
                Cuando termines, guarda el chat. Lo vamos a referenciar en el
                bloque 06, cuando trabajemos con tu propio caso integrador, y
                va a ser más fácil tener una demo ejecutada que arrancar de
                cero ahí.
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
