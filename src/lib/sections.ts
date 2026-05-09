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
  time: string;
  plan: Plan;
}

export const SECTIONS: readonly SectionMeta[] = [
  {
    id: "bienvenida",
    number: 0,
    title: "Bienvenida",
    shortTitle: "Bienvenida",
    time: "10 min",
    plan: "all",
  },
  {
    id: "base-claude-ai",
    number: 1,
    title: "La base: claude.ai y la fórmula del prompt",
    shortTitle: "La base",
    time: "25 min",
    plan: "free",
  },
  {
    id: "ecosistema",
    number: 2,
    title: "Más allá del chat: el ecosistema",
    shortTitle: "Ecosistema",
    time: "25 min",
    plan: "pro",
  },
  {
    id: "skills",
    number: 3,
    title: "Skills: el power-up",
    shortTitle: "Skills",
    time: "20 min",
    plan: "pro",
  },
  {
    id: "demos",
    number: 4,
    title: "Demos de negocio",
    shortTitle: "Demos",
    time: "40 min",
    plan: "pro",
  },
  {
    id: "fuera-del-navegador",
    number: 5,
    title: "Llevarlo fuera del navegador",
    shortTitle: "Fuera del navegador",
    time: "25 min",
    plan: "max",
  },
  {
    id: "tu-turno",
    number: 6,
    title: "Tu turno",
    shortTitle: "Tu turno",
    time: "20 min",
    plan: "free",
  },
  {
    id: "cierre",
    number: 7,
    title: "Hoja de ruta y cierre",
    shortTitle: "Cierre",
    time: "5 min",
    plan: "all",
  },
] as const;
