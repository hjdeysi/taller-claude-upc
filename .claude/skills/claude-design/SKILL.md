---
name: claude-design
description: Sistema de diseño oficial de Claude.com (Anthropic) — canvas crema tintado, acentos coral cálidos, displays slab-serif (Copernicus / Tiempos Headline), body humanista (StyreneB / Inter) y superficies dark-navy para mockups de producto. Usa esta skill cuando construyas páginas de marketing, landings, dashboards, slides, o cualquier UI que deba sentir la identidad visual de Claude. La fuente original (con todos los tokens) está en `DESIGN-source.md` dentro de esta misma carpeta.
---

# claude-design

Sistema de diseño de **Claude.com (Anthropic)**. La identidad se define por una combinación deliberadamente cálida y editorial — opuesta a la mayoría de productos AI, que usan grises/azules fríos. Los tres pilares:

1. **Canvas crema tintado** (`#faf9f5`) en lugar de blanco puro.
2. **Acento coral cálido** (`#cc785c`) para CTAs primarios y bandas de llamada a la acción.
3. **Superficies navy oscuro** (`#181715`) para mockups de producto (code editors, terminales, comparativos de modelo).

Tipografía: slab-serif (**Copernicus** / Tiempos Headline) en displays a peso 400 con tracking negativo, humanist sans (**StyreneB** / Inter) en body. Mono **JetBrains Mono** en código. La voz tipográfica es editorial-literaria, no SaaS-genérica.

## Cuándo activar esta skill

- Construir landing/marketing del taller, slides, dashboards o cualquier UI que deba sentir Claude.
- Auditar UI existente para acercarla al tono Claude (cálido, editorial, no-genérico).
- Decidir tokens (color, tipo, spacing, radii) cuando el usuario pide "estilo Claude".
- En este proyecto se combina con identidad UPC — ver sección de **fusión** al final.

## Color tokens

### Marca y acento

| Token | Hex | Uso |
|---|---|---|
| `primary` (coral) | `#cc785c` | CTAs primarios, bandas coral full-bleed, wordmark accent |
| `primary-active` | `#a9583e` | Estado press/active del CTA |
| `primary-disabled` | `#e6dfd8` | CTA inhabilitado |
| `accent-teal` | `#5db8a6` | Indicadores secundarios (status, "active connection") |
| `accent-amber` | `#e8a55a` | Badges de categoría, highlights inline |

### Superficies

| Token | Hex | Uso |
|---|---|---|
| `canvas` | `#faf9f5` | Fondo por defecto. Crema tintado. NO blanco puro. |
| `surface-soft` | `#f5f0e8` | Divisores de sección, bandas suaves |
| `surface-card` | `#efe9de` | Feature cards, content cards (1 paso más oscuro que canvas) |
| `surface-cream-strong` | `#e8e0d2` | Tabs activos, bandas enfatizadas |
| `surface-dark` | `#181715` | Mockups de código, model showcase, footer |
| `surface-dark-elevated` | `#252320` | Cards elevados dentro de bandas oscuras |
| `surface-dark-soft` | `#1f1e1b` | Code blocks dentro de cards oscuros más grandes |
| `hairline` | `#e6dfd8` | Borde 1px sobre superficies crema |
| `hairline-soft` | `#ebe6df` | Divisor casi invisible dentro de la misma banda |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#141413` | Headlines y texto primario. Negro cálido off-pure. |
| `body-strong` | `#252523` | Párrafos enfatizados, lead text |
| `body` | `#3d3d3a` | Running-text por defecto |
| `muted` | `#6c6a64` | Sub-headings, breadcrumbs |
| `muted-soft` | `#8e8b82` | Captions, fine-print |
| `on-primary` | `#ffffff` | Texto sobre botones coral |
| `on-dark` | `#faf9f5` | Blanco crema sobre superficies oscuras (eco del canvas) |
| `on-dark-soft` | `#a09d96` | Body de footer, labels secundarios en dark |

### Semánticos

| Token | Hex | Uso |
|---|---|---|
| `success` | `#5db872` | Status verdes, "available" |
| `warning` | `#d4a017` | Callouts de advertencia (raros en marketing) |
| `error` | `#c64545` | Errores de validación |

## Tipografía

### Stacks

- **Display (slab-serif)**: `Copernicus, Tiempos Headline, serif`. Fallbacks open-source: **Cormorant Garamond** peso 500 con `-0.02em` letter-spacing, o **EB Garamond**.
- **Body (humanist sans)**: `StyreneB, Inter, sans-serif`. Fallback recomendado: **Inter** (humanista, no geométrico). Helvetica/Arial son demasiado neutros y rompen el tono.
- **Code (mono)**: `JetBrains Mono, ui-monospace, monospace`.

### Escala

| Token | Tamaño | Peso | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| `display-xl` | 64px | 400 | 1.05 | -1.5px | h1 hero |
| `display-lg` | 48px | 400 | 1.10 | -1px | Section heads |
| `display-md` | 36px | 400 | 1.15 | -0.5px | Sub-section, model names |
| `display-sm` | 28px | 400 | 1.20 | -0.3px | Tier names, callout headlines |
| `title-lg` | 22px | 500 | 1.30 | 0 | Pricing labels (StyreneB) |
| `title-md` | 18px | 500 | 1.40 | 0 | Feature card titles |
| `title-sm` | 16px | 500 | 1.40 | 0 | Connector tile titles |
| `body-md` | 16px | 400 | 1.55 | 0 | Running-text por defecto |
| `body-sm` | 14px | 400 | 1.55 | 0 | Footer body, fine-print |
| `caption` | 13px | 500 | 1.40 | 0 | Badges, captions |
| `caption-uppercase` | 12px | 500 | 1.40 | 1.5px | "NEW", category tags |
| `code` | 14px | 400 | 1.60 | 0 | Code blocks |
| `button` | 14px | 500 | 1.00 | 0 | Botones |
| `nav-link` | 14px | 500 | 1.40 | 0 | Top-nav |

### Principios tipográficos (no negociables)

- **Display siempre peso 400, nunca bold.** Copernicus en 700 lee bombástico y rompe el tono editorial.
- **Tracking negativo en displays.** Sin él, Copernicus pierde su carácter literario.
- **Body humanista (StyreneB/Inter), nunca geométrico.** Helvetica/Arial son demasiado neutros.
- **Display serif, body sans.** El split es la voz de la marca; cambiarlo convierte a Claude en "otra herramienta AI más".

## Spacing

Base 4px. Tokens: `xxs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 32 · `xxl` 48 · `section` 96.

- **Padding entre bandas (vertical):** `section` (96px). Ritmo SaaS moderno.
- **Padding interno de cards:** `xl` (32px) para feature/pricing/model-comparison; `lg` (24px) para code-window y connector tiles.
- **Callout/CTA bands:** `xxl` (48px) en coral callout; 64px en dark CTA band.

## Border radius

| Token | Valor | Uso |
|---|---|---|
| `xs` | 4px | Badges accent, mini dropdowns |
| `sm` | 6px | Botones inline pequeños |
| `md` | 8px | **Botones CTA, inputs, tabs** |
| `lg` | 12px | **Content cards** (feature, pricing, code-window) |
| `xl` | 16px | Hero illustration container |
| `pill` / `full` | 9999px | Badge pills, avatars, icon buttons |

## Layout y grid

- Max content width: **~1200px**, centrado.
- Hero: grid 6/6 — h1+sub+buttons a la izquierda, illustration/mockup a la derecha.
- Feature grid: **3-up desktop**, 2-up tablet, 1-up mobile.
- Connector grid: 4-up o 6-up desktop, 2-up tablet, 1-up mobile.
- Pricing: 3-up desktop, 1-up mobile.

### Filosofía de whitespace

Canvas crema + display serif + padding interno generoso = ritmo de columna de revista, no de plantilla SaaS. Whitespace entre bandas uniforme a 96px; whitespace dentro de cards generoso a 32px.

## Elevación

| Nivel | Tratamiento | Uso |
|---|---|---|
| Flat | Sin shadow ni borde | Body, top-nav, hero |
| Hairline suave | Borde 1px `hairline` | Inputs, sub-nav, ocasional en cards |
| Cream card | Fondo `surface-card`, sin shadow | Feature cards |
| Dark card | Fondo `surface-dark`, sin shadow | Code mockups, model showcase |
| Soft drop shadow | `0 1px 3px rgba(20,20,19,0.08)` | Hover-elevated, raro |

**Color-block first, shadow rare.** La profundidad viene del contraste crema-vs-dark, no de sombras.

## Componentes clave

- **`top-nav`** (cream, 64px): wordmark `*Anthropic` + Claude izquierda, menú horizontal, "Sign in" + CTA coral derecha.
- **`button-primary`** (coral CTA): bg `#cc785c`, white text, 14px/500, padding 12×20, height 40, radius 8.
- **`button-secondary`** (cream + hairline): mismo padding, sobre canvas con borde.
- **`text-link`**: inline en color coral primario — uno de los detalles más distintivos.
- **`hero-band`**: cream, 96px vertical, grid 6/6.
- **`feature-card`** (cream-card): bg `#efe9de`, radius 12, padding 32, icon top + title 18/500 + body.
- **`product-mockup-card-dark`**: bg `#181715`, radius 12, padding 32 — muestra chrome real de producto.
- **`code-window-card`**: bg dark + inner `surface-dark-soft`, JetBrains Mono, line numbers.
- **`pricing-tier-card`** (estándar): bg cream + hairline, plan name en title-lg sans, **precio en display-sm SERIF** (detalle clave), checklist en body-md, CTA primary abajo.
- **`pricing-tier-card-featured`**: invierte a dark surface — el dark **es** la señal de tier destacado.
- **`callout-card-coral`**: bg coral full-bleed, padding 48, CTA invertido (botón crema sobre coral).
- **`badge-pill`** (cream-card bg) y **`badge-coral`** (coral, uppercase 1.5px tracking).
- **`cta-band-coral`** y **`cta-band-dark`**: pre-footer 64px padding.
- **`footer`** (dark navy): bg `#181715`, text `on-dark-soft`, 4 columnas, padding 64.

Para detalle completo de cada componente con tokens referenciados, ver `DESIGN-source.md` en esta misma carpeta.

## Do's

- **Anclar cada página al canvas crema.** Blanco puro = "otra herramienta AI más"; el tinte cálido es el diferenciador.
- **Display siempre Copernicus 400 con tracking negativo.** Body siempre StyreneB/Inter. El split es inquebrantable.
- **Reservar coral para CTAs primarios y bandas full-bleed coral.** No pintar accents random en coral.
- **Mostrar chrome real de producto** en `product-mockup-card-dark` y `code-window-card`. No ilustrar código de marketing — mostrar código real.
- **Alternar bandas crema ↔ dark.** Es el mecanismo de pacing del sitio.
- **Glifo radial-spike de Anthropic** como prefix del wordmark. Nunca invertirlo blanco-sobre-dark dentro del wordmark.
- **96px entre bandas mayores.**

## Don'ts

- No usar grises fríos ni blanco puro en canvas. Crema es la marca.
- No bold en display serif. Copernicus 700 es bombástico.
- No usar azul frío ni cyan saturado como acento. Coral es el voltaje.
- No coral por todas partes. Coral es escaso en elementos individuales, generoso solo en bandas full-bleed.
- No Inter para displays. El carácter serif es la voz.
- No repetir el mismo modo de superficie en dos bandas consecutivas. El pacing alterna: cream → cream-card → dark → cream → coral → dark-footer.
- No agregar hover styling más allá de lo encodeado — primary se oscurece en press; nada más.

## Responsive

| Breakpoint | Ancho | Cambios clave |
|---|---|---|
| Mobile | < 768px | Hamburger; hero h1 64→32; mockup stack debajo; features 1-up; pricing 1-up |
| Tablet | 768–1024 | Top-nav horizontal pero apretado; features 2-up; pricing 2-up |
| Desktop | 1024–1440 | Full top-nav; features 3-up; pricing 3-up |
| Wide | > 1440 | Igual que desktop, max content 1200px centrado |

## Iteración

1. Trabajar **un componente a la vez**. Referenciar su clave (`{component.feature-card}`).
2. Variantes (`-active`, `-disabled`, `-focused`) son entradas separadas.
3. Usar tokens, **nunca hex inline**.
4. Documentar solo Default y Active/Pressed. No hover.
5. Display siempre Copernicus serif 400 + tracking negativo. Body siempre StyreneB/Inter 400. **Split inquebrantable.**
6. Crema + coral + dark navy es la trinidad. **No introducir un cuarto tono de superficie.**
7. En duda sobre énfasis: **subir tamaño de Copernicus serif antes que subir peso.**

---

## Fusión Claude × UPC (específico de este proyecto)

Este proyecto es un taller de Claude para **carreras de negocios en UPC**. Cuando generes UI debes mezclar la estética Claude con un guiño institucional UPC sin romper la trinidad cream-coral-dark.

**Color UPC (rojo institucional)** — aproximación derivada del logo: `#E2231A` (rojo flama UPC). NO sustituye al coral; **co-existe** como acento institucional secundario.

### Reglas de fusión

- **Canvas, tipografía y dark surfaces siguen siendo Claude puro.** No alterar.
- **Coral (`#cc785c`) sigue siendo el CTA primario por defecto.** Es la voz Claude.
- **Rojo UPC (`#E2231A`) se reserva para:**
  - Logo/wordmark UPC en header (junto al spike-mark de Anthropic, separados por divisor sutil).
  - Footer institucional con créditos UPC.
  - Una banda o callout específico de "Acerca del taller" / "Universidad Peruana de Ciencias Aplicadas".
  - Highlight tipográfico en el nombre "UPC" cuando aparezca inline (al estilo del coral en text-links).
- **Nunca mezclar coral y rojo UPC en el mismo botón ni en superficies adyacentes** — chocan en saturación. Si una banda es coral, la siguiente que use rojo UPC debe ir separada por una banda neutra (cream o cream-card).
- **Logo UPC** vive en `assets/upc-logo.png`. Usarlo a tamaño contenido (24-40px) en header, y eventualmente en grande en banda institucional.

### Patrón sugerido

```
[ Top-nav cream con spike-mark · Claude · Taller (separador) · logo UPC ]
[ Hero band cream con h1 Copernicus + sub StyreneB + CTA coral ]
[ Feature cards 3-up sobre cream-card ]
[ Dark mockup band mostrando código/terminal ]
[ Banda institucional UPC: cream-strong con headline serif + acento rojo UPC ]
[ CTA pre-footer coral o dark ]
[ Footer dark con créditos Anthropic + UPC en columnas separadas ]
```

El resultado debe sentirse 80% Claude / 20% UPC: Claude lleva la estética, UPC firma la institucionalidad.
