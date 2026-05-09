import type { Plan } from "@/lib/sections";

interface PlanBadgeProps {
  plan: Plan;
  size?: "sm" | "md";
}

const PLAN_LABEL: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  max: "Max",
  all: "Todos",
};

const PLAN_EMOJI: Record<Plan, string> = {
  free: "🟢",
  pro: "🔵",
  max: "🟣",
  all: "·",
};

const PLAN_COLOR: Record<Plan, { bg: string; text: string; border: string }> = {
  free: {
    bg: "rgb(93 184 114 / 0.12)",
    text: "rgb(45 110 64)",
    border: "rgb(93 184 114 / 0.35)",
  },
  pro: {
    bg: "rgb(74 126 184 / 0.12)",
    text: "rgb(40 80 130)",
    border: "rgb(74 126 184 / 0.35)",
  },
  max: {
    bg: "rgb(139 92 246 / 0.10)",
    text: "rgb(88 51 175)",
    border: "rgb(139 92 246 / 0.30)",
  },
  all: {
    bg: "rgb(108 106 100 / 0.08)",
    text: "rgb(108 106 100)",
    border: "rgb(230 223 216)",
  },
};

export function PlanBadge({ plan, size = "md" }: PlanBadgeProps) {
  const colors = PLAN_COLOR[plan];
  const sizing =
    size === "sm"
      ? "text-[11px] tracking-[0.08em] px-2 py-[3px] gap-1"
      : "text-[12px] tracking-[0.1em] px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium uppercase ${sizing}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      <span aria-hidden className="text-[0.85em] leading-none">
        {PLAN_EMOJI[plan]}
      </span>
      <span>{PLAN_LABEL[plan]}</span>
    </span>
  );
}
