import type { ComponentType } from "react";
import { Hero } from "@/components/Hero";
import { TabNav } from "@/components/TabNav";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Bienvenida } from "@/components/Bienvenida";
import { LaBase } from "@/components/LaBase";
import { SECTIONS } from "@/lib/sections";

// Map section id → content component. Sections without a mapping
// fall back to the structural empty state in <Section />.
const CONTENT_BLOCKS: Record<string, ComponentType> = {
  bienvenida: Bienvenida,
  "base-claude-ai": LaBase,
};

export default function Page() {
  return (
    <>
      <Hero />
      <TabNav />

      <main>
        {SECTIONS.map((s) => {
          const Block = CONTENT_BLOCKS[s.id];
          return (
            <Section
              key={s.id}
              id={s.id}
              number={s.number}
              title={s.title}
              time={s.time}
              plan={s.plan}
            >
              {Block ? <Block /> : undefined}
            </Section>
          );
        })}
      </main>

      <Footer />
    </>
  );
}
