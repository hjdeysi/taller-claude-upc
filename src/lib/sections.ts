/**
 * Single source of truth for the 8-block manual structure.
 * TabNav and page.tsx both import this — keep IDs stable.
 */

export type Plan = "free" | "pro" | "max" | "all";

export interface SectionMeta {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  /** One-line summary used in the welcome block's "what's coming" list. */
  blurb: string;
  time: string;
  plan: Plan;
}

export const SECTIONS: readonly SectionMeta[] = [
  {
    id: "bienvenida",
    number: 0,
    title: "Bienvenida",
    shortTitle: "Bienvenida",
    blurb: "Qué es Claude, qué no es, qué vas a poder hacer al final.",
    time: "10 min",
    plan: "all",
  },
  {
    id: "base-claude-ai",
    number: 1,
    title: "La base: claude.ai y la fórmula del prompt",
    shortTitle: "La base",
    blurb: "claude.ai, primer chat, fórmula del prompt.",
    time: "25 min",
    plan: "free",
  },
  {
    id: "ecosistema",
    number: 2,
    title: "Más allá del chat: el ecosistema",
    shortTitle: "Ecosistema",
    blurb: "Artifacts, Projects, Conexiones, Memoria.",
    time: "25 min",
    plan: "pro",
  },
  {
    id: "skills",
    number: 3,
    title: "Skills: el power-up",
    shortTitle: "Skills",
    blurb: "El power-up con demo before/after.",
    time: "20 min",
    plan: "pro",
  },
  {
    id: "demos",
    number: 4,
    title: "Demos de negocio",
    shortTitle: "Demos",
    blurb: "Cuatro casos de negocio.",
    time: "40 min",
    plan: "pro",
  },
  {
    id: "fuera-del-navegador",
    number: 5,
    title: "Llevarlo fuera del navegador",
    shortTitle: "Fuera del navegador",
    blurb: "Cowork, Claude Code, Chrome, Excel.",
    time: "25 min",
    plan: "max",
  },
  {
    id: "tu-turno",
    number: 6,
    title: "Tu turno",
    shortTitle: "Tu turno",
    blurb: "Aplica con tu propio caso.",
    time: "20 min",
    plan: "free",
  },
  {
    id: "cierre",
    number: 7,
    title: "Hoja de ruta y cierre",
    shortTitle: "Cierre",
    blurb: "Qué plan según qué uso, próximos pasos.",
    time: "5 min",
    plan: "all",
  },
] as const;
