import { Hero } from "@/components/Hero";
import { TabNav } from "@/components/TabNav";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Bienvenida } from "@/components/Bienvenida";
import { SECTIONS } from "@/lib/sections";

export default function Page() {
  return (
    <>
      <Hero />
      <TabNav />

      <main>
        {SECTIONS.map((s) => (
          <Section
            key={s.id}
            id={s.id}
            number={s.number}
            title={s.title}
            time={s.time}
            plan={s.plan}
          >
            {s.id === "bienvenida" ? <Bienvenida /> : undefined}
          </Section>
        ))}
      </main>

      <Footer />
    </>
  );
}
