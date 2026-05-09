# Taller-Claude

![Logo UPC](assets/upc-logo.png)

Material base para un **taller de Claude** dirigido a alumnos de **carreras de negocios** en la Universidad Peruana de Ciencias Aplicadas (UPC). El taller no asume conocimientos técnicos previos: el público son estudiantes cuya formación principal no es ingeniería ni desarrollo, pero que sí van a tener a Claude (y herramientas similares) como parte de su día a día profesional.

## Propósito del taller

El objetivo central es mostrar que **Claude no es solo un chat**. Detrás de la interfaz conversacional existen capas de capacidades que muchos usuarios nunca llegan a tocar: análisis de documentos largos, conexiones nativas con servicios externos (Gmail, Calendar, Drive, GitHub, etc. vía MCP), artefactos interactivos, búsqueda web, ejecución de código, automatizaciones recurrentes y un asistente de programación (Claude Code) capaz de leer y modificar archivos locales como un colaborador real.

Al final del taller, cada alumno debería poder responder:

1. **¿Qué puede hacer Claude más allá de "preguntar y responder"?**
2. **¿Qué problemas de negocio (no técnicos) resuelve mejor?** — investigación de mercado, análisis de informes, redacción y revisión de comunicaciones, creación de dashboards y mockups livianos, automatización de tareas repetitivas, etc.
3. **¿Qué nivel de plan necesito para cada caso de uso?** — para que la decisión de pagar o no pagar sea informada y no por moda.

## Posicionamiento frente a otros asistentes

Este es el ángulo que debe atravesar todo el material. Cuando aparezcan ChatGPT o Perplexity, contrastar con honestidad — sin descalificarlos, mostrando dónde Claude es realmente distinto.

**Cuatro diferenciadores reales:**

1. **Artifacts: salidas que se usan, no solo se leen.** Otros chatbots responden con texto. Claude responde con herramientas funcionales — calculadoras, dashboards, mini-apps, formularios — generadas en el momento dentro de la conversación.

2. **Skills: especialización a demanda.** En vez de un modelo genérico, Claude carga el "modo experto" que necesitas (landing pages, modelos financieros, pitch decks) cuando detecta que aplica. Es la diferencia entre "asistente que sabe de todo un poco" y "asistente que se vuelve el especialista que necesitas".

3. **Projects + memoria persistente.** Tu contexto vive entre conversaciones. No reexplicas tu negocio cada lunes.

4. **Salir del chat: Cowork, Claude Code, Claude en Chrome, Claude en Excel.** Otros chatbots viven en su ventana. Claude opera tu Excel, tu navegador, tus archivos, tu terminal. La conversación deja de ser "instrucciones para que tú lo hagas" y se convierte en "trabajo hecho".

**Sobre Perplexity:** no son rivales directos. Perplexity es búsqueda con IA. Claude hace búsqueda + escritura + análisis + creación de herramientas + automatización. Cuando aparezca el modo Research en el material, ese es el contraste natural.

**Sobre ChatGPT:** el contraste no es "mejor o peor". Es que Claude tiene un sistema de Skills, Artifacts maduros, Projects con memoria, y un agente de escritorio (Cowork) y CLI (Claude Code) más maduros. La calidad de redacción y razonamiento es comparable; lo que cambia es lo que cada plataforma deja construir alrededor.

## Estructura por tipo de usuario

El taller se organiza en torno a **tres perfiles de usuario**, cada uno con un set distinto de herramientas accesibles. Esto permite que cada alumno se ubique según su realidad económica/laboral y entienda qué puede hacer hoy y qué desbloquearía si subiera de plan.

> **Nota importante**: las cuotas exactas, modelos disponibles y herramientas incluidas en cada plan cambian con frecuencia. Lo que sigue es la **forma general** de la oferta — verificar siempre el detalle vigente en [claude.com/pricing](https://claude.com/pricing) antes de tomar decisiones de compra.

### 1. Usuario Free (no paga)

Punto de entrada. Útil para entender qué se puede hacer sin invertir un centavo.

- **Acceso**: claude.ai en navegador y app móvil. Cuota diaria/semanal limitada de mensajes; modelo base (típicamente la familia Sonnet en su versión vigente).
- **Herramientas incluidas**:
  - Conversación con análisis de documentos (PDFs, imágenes) hasta el límite de contexto.
  - Búsqueda web básica integrada.
  - **Artifacts**: previsualización de código, HTML, markdown, diagramas — limitada por cuota.
- **No incluye (típicamente)**: Projects con base de conocimiento persistente, conectores MCP completos, sesiones extensas en Claude Code, modelos premium tipo Opus.
- **Casos de uso típicos del taller**:
  - Redactar y revisar correos, propuestas, ensayos.
  - Resumir PDFs cortos (informes, papers, contratos sencillos).
  - Brainstorming y generación de ideas.
  - Análisis ad-hoc de datos pegados en el chat.
  - Generar diagramas o mockups simples vía Artifacts.

### 2. Usuario Pro

El plan estándar de pago individual. Es el primer salto que abre la mayoría de capacidades "potentes".

- **Acceso**: cuota mucho más alta que Free, prioridad sobre usuarios gratuitos, acceso a modelos de gama alta (Opus cuando aplica), **Projects**, conectores MCP oficiales y uso moderado de **Claude Code**.
- **Herramientas adicionales sobre Free**:
  - **Projects**: espacios con instrucciones y archivos de referencia que Claude usa como contexto persistente entre conversaciones. Funcionan como "asistentes especializados" — un Project por cliente, por curso, por tesis, por área de trabajo.
  - **MCP connectors**: integraciones nativas con servicios externos — leer correo en Gmail, listar reuniones en Calendar, buscar archivos en Drive, crear issues en GitHub, consultar Notion, etc. Es la diferencia entre "Claude que sabe cosas" y "Claude que actúa sobre tus cosas".
  - **Claude Code (con límite de uso)**: Claude funcionando como agente sobre archivos locales o un repositorio. Aunque está pensado para programación, es muy útil para usuarios de negocio que manipulan Excels, generan plantillas, automatizan trámites de oficina o procesan documentos en lote.
- **Casos de uso típicos del taller**:
  - Asistente para análisis financieros recurrentes con archivos de soporte.
  - Automatización ligera de redacción de correos a partir del calendario.
  - Investigación profunda combinando búsqueda web + documentos propios.
  - Generación de presentaciones, dashboards y reportes con datos reales.

### 3. Usuario Max

El plan superior para uso individual intensivo. Está pensado para usuarios que ya dependen de Claude varias horas al día.

- **Acceso**: cuotas muy amplias (especialmente relevantes para Claude Code, que consume contexto y mensajes con rapidez), prioridad máxima y acceso anticipado a nuevas features.
- **Herramientas adicionales sobre Pro**:
  - **Claude Code intensivo**: sesiones largas sin chocar contra el límite, agentes corriendo en paralelo, automatizaciones programadas (scheduled agents tipo cron), sub-agentes especializados, hooks personalizados. En la práctica, es el plan que permite usar Claude como un colaborador full-time, no solo como herramienta puntual.
  - **Cowork**: agente de escritorio que opera tu computador (archivos, apps, tareas). Diseñado para usuarios no-developers que quieren automatizar trabajo de oficina sin tocar terminal.
  - Mayor cuota para todos los conectores MCP, Projects y modelos premium.
- **Casos de uso típicos del taller**:
  - Agentes que **mantienen un proyecto vivo**: revisan PRs, hacen seguimiento del calendario y correos, auditan informes recurrentes.
  - Automatización extensiva de procesos de oficina (procesar facturas, conciliar reportes, generar minutas tras reuniones).
  - Prototipado rápido de herramientas internas para el negocio sin pasar por un equipo de desarrollo.

## Eje transversal: capacidades menos conocidas

Además de la división por planes, el taller cubre capacidades específicas que la mayoría de usuarios no descubre por su cuenta. Cada una se demuestra con un caso real:

- **Artifacts** — Claude genera HTML/JS, diagramas, markdown formateado y los previsualiza al instante. Ideal para mockups, dashboards livianos, plantillas de documentos.
- **Projects** — la forma de darle "memoria de proyecto" sin tener que repegar contexto cada vez. Cada Project tiene sus instrucciones de sistema y sus archivos.
- **Memoria** — Claude recuerda preferencias y contexto entre chats sueltos, sin necesidad de un Project formal.
- **Search y Research** — búsqueda web integrada (rápida) y modo Research (reportes largos con citas trazables). Aquí está el contraste natural con Perplexity.
- **MCP (Model Context Protocol)** — el "puerto USB" de Claude: un estándar abierto para que servicios externos expongan herramientas. Existen conectores oficiales (Anthropic) y de comunidad. La curva de aprendizaje es baja para el usuario final; basta autenticar el servicio.
- **Claude Code** — IDE/CLI donde Claude lee y edita archivos locales. Aunque está pensado para programadores, es perfectamente útil para usuarios de negocio: manipular Excels, normalizar bases de datos, generar reportes a partir de carpetas de PDFs.
- **Cowork** — agente de escritorio que opera tu computador. La versión de Claude Code para no-developers.
- **Claude en Chrome / Claude en Excel** — extensiones que llevan a Claude dentro del navegador y dentro de la hoja de cálculo. Útiles para alumnos de negocios que viven en esos dos entornos.
- **API y SDK** — para quien quiera ir más lejos: incrustar Claude dentro de herramientas propias o construir sus propios agentes.
- **Skills** — carpetas con instrucciones especializadas que Claude carga bajo demanda; este mismo proyecto incluye varias como ejemplo (ver más abajo).
- **Scheduled agents** — agentes que se ejecutan en horario fijo (cron). Útiles para tareas recurrentes: resumen diario de correos, monitoreo de cambios en una página, alertas semanales. Capacidad real de **Max**.

## Estructura del manual

El manual web está organizado en 8 bloques que cubren 3 horas de taller. Cada bloque debe ser autocontenido y navegable por separado — los alumnos lo van a usar como referencia después del taller, no solo durante.

| # | Bloque | Tiempo | Plan dominante | Propósito |
|---|--------|--------|----------------|-----------|
| 0 | Bienvenida | 10 min | Todos | Qué es Claude, qué NO es, qué vas a poder hacer al final |
| 1 | La base: claude.ai y la fórmula del prompt | 25 min | 🟢 Free | Cuenta, primer chat, anatomía del prompt, modos básicos |
| 2 | Más allá del chat: el ecosistema | 25 min | 🔵 Pro | Artifacts, Projects, Conexiones, Memoria |
| 3 | Skills: el power-up | 20 min | 🔵 Pro | Qué son y demo before/after en vivo |
| — | Pausa | 15 min | — | — |
| 4 | Demos de negocio | 40 min | mixto | Las 4 demos centrales (ver plantilla más abajo) |
| 5 | Llevarlo fuera del navegador | 25 min | 🟣 Max | Cowork, Claude Code, Chrome, Excel |
| 6 | Tu turno | 20 min | 🟢 Free | Ejercicio integrador con caso propio |
| 7 | Hoja de ruta y cierre | 5 min | — | Qué plan según qué uso, próximos pasos |

## Voz

- **Segunda persona** ("tú aprenderás", "pruébalo", "tu negocio").
- **Tono regular y sencillo.** Sin jerga técnica innecesaria. Cuando aparezca un término nuevo (MCP, Skills, Artifacts), explicar en una línea antes de usarlo.
- **Socrático cuando convenga.** En momentos clave — antes de mostrar Artifacts, antes del before/after de Skills, antes de Cowork — abrir con una pregunta que deje al alumno pensando ("¿y si tu chatbot te entregara la calculadora directamente, en vez de explicarte cómo hacerla?"). Una o dos preguntas socráticas por bloque, no más.
- **Ejemplos siempre aterrizados** a negocios reconocibles: cafetería, consultora, e-commerce, marca de moda, agencia de marketing, restaurante. Evitar ejemplos de software o infraestructura.
- **Cero instrucciones de profesor** en el material publicado. Nada de "el profesor explicará...", "los alumnos deberán...". Todo redactado como si el lector estuviera leyendo solo, en su casa, dos semanas después del taller.
- **Sin emojis decorativos** en el cuerpo. Los badges de plan (🟢🔵🟣) sí cuentan como elementos funcionales.

## Plantilla de demos

Las 4 demos del bloque 4 deben seguir la misma estructura para que se sientan consistentes:

1. **Pregunta gancho** (1 línea, socrática). Ej: "¿Qué tal si tu chatbot te entregara la calculadora, en vez de explicarte cómo hacerla?"
2. **Contexto** (2-3 líneas). El caso real que resuelve esta demo.
3. **Prompt copiable** (bloque de código con botón copiar).
4. **Qué esperar** (1-2 líneas). Lo que el alumno verá pasar.
5. **Variante para tu negocio** (prompt copiable adaptable). El alumno cambia 2-3 variables.
6. **Plan necesario** (badge). 🟢 Free / 🔵 Pro / 🟣 Max.
7. **Por qué solo Claude lo hace bien** (1 línea opcional). El diferenciador.

### Las 4 demos

**Demo 1 · Mini-app en 30 segundos** (Artifacts) — 🔵 Pro
Calculadora interactiva de punto de equilibrio para un negocio elegido por el alumno. Sliders para precio, costo variable, costo fijo. Output funcional dentro del chat.

**Demo 2 · Research profundo con fuentes** (Research) — 🔵 Pro
Reporte sobre un sector de Lima (ej: delivery de comida): top jugadores, modelo de negocio, debilidades, oportunidad. Con citas trazables. Reemplaza horas de Google + lectura.

**Demo 3 · Tu asistente personalizado** (Projects + Memoria) — 🔵 Pro
Crear un Project con plan de negocio + brand book + perfil de cliente. Pedir el email de lanzamiento. Ver cómo escribe en TU voz, con TU producto, sin repegar contexto.

**Demo 4 · Skills before/after** (Skills) — 🔵 Pro
Mismo prompt para una landing page. Sin Skill: resultado mediocre. Con Skill activada: resultado profesional. Comparación lado a lado.

## Patrones de diseño (estructurales)

Patrones de información y arquitectura. La estética visual la define la skill `claude-design` y la sección "Identidad visual" más abajo; estos patrones son sobre **cómo se organiza la información**, no sobre cómo se ve.

- **Navegación por tabs por bloque.** Cada uno de los 8 bloques es una tab navegable. Funciona como índice visible y como referencia post-taller.
- **Scroll-spy en la nav.** La tab activa cambia según la sección visible mientras el lector scrollea.
- **Badge de plan por sección, no módulo aparte.** 🟢 Free · 🔵 Pro · 🟣 Max. Más honesto que un cuadro comparativo aislado.
- **Bloques de prompt copiables.** Botón "copiar" visible. Los alumnos no van a tipear prompts largos en vivo.
- **Comparación lado a lado para Skills.** Dos columnas: "sin Skill" / "con Skill", con outputs reales de cada lado.
- **Callouts diferenciadores en línea.** Pequeños bloques tipo "Claude vs otros: aquí Perplexity solo te daría links" colocados donde aparezca el contraste natural. Mejor que un módulo comparativo separado.
- **Try-it-yourself al final de cada demo.** Variante del prompt que el alumno adapta.
- **Progressive disclosure para profundidades.** Lo esencial se ve; lo técnico (configurar MCP, instalar Claude Code) va plegado tras "ver más" o "para profundizar". El manual no debe abrumar.
- **Pregunta socrática como apertura de bloque clave.** Bloques 2, 3, 4 y 5. Una sola pregunta breve antes del primer párrafo.

## Identidad visual del taller (Claude × UPC)

La página del taller debe sentir **80% Claude / 20% UPC**: Claude lleva la estética (canvas crema tintado, coral, displays serif, dark navy para mockups); UPC firma la institucionalidad (logo, rojo institucional, footer académico). El detalle completo de tokens, componentes y reglas de fusión está en la skill `claude-design` (ver abajo).

Pilares rápidos:

- **Canvas crema** `#faf9f5`, no blanco puro.
- **Coral** `#cc785c` para CTAs primarios (voz Claude).
- **Rojo UPC** `#E2231A` reservado para logo, footer institucional y banda "Acerca del taller". No mezclar con coral en superficies adyacentes.
- **Display serif** (Copernicus / Tiempos Headline / Cormorant Garamond fallback) peso 400 con tracking negativo.
- **Body humanist sans** (StyreneB / Inter), nunca geométrico.
- **Dark navy** `#181715` para code mockups y footer.

## Skills instaladas en este proyecto

Las siguientes skills están cargadas en `.claude/skills/` y registradas en `skills-lock.json`. Sirven como ejemplos vivos del concepto "skill" durante el taller:

- **claude-design** — Sistema de diseño oficial de Claude.com (tokens, tipografía, componentes, reglas de fusión Claude×UPC). Activar al construir cualquier UI del taller. Fuente original archivada en `.claude/skills/claude-design/DESIGN-source.md`.
- **design-taste-frontend** — Reglas de UI/UX senior, anti-AI-tells, métricas y arquitectura de componentes. Filosofía complementaria a `frontend-design`.
- **frontend-design** — Estética principal "mager": concept-led, tactile, editorial + neon. Guía estética alternativa.
- **frontend-patterns** — Patrones React/Next.js, state management y performance. Activar cuando el ejercicio use React/Next.
- **redesign-existing-projects** — Auditoría y upgrade de proyectos existentes; detecta patrones AI-genéricos y aplica estándares premium. Framework-agnóstica.

> Para la página del taller, **la skill líder es `claude-design`**. Las otras complementan (rules de UI/UX, patrones React, auditoría) pero no compiten en estética.

> Las skills aparecen disponibles al iniciar una **nueva sesión** de Claude Code en este proyecto. En la sesión actual donde se instalaron, puede que aún no estén activas.

## Activos del proyecto

- `assets/upc-logo.png` — logo institucional UPC usado en el material del taller.
- `.claude/skills/claude-design/DESIGN-source.md` — markdown original del sistema de diseño Claude (fuente: VoltAgent/awesome-design-md).