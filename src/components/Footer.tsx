import Image from "next/image";
import upcLogo from "../../public/upc-logo.png";

export function Footer() {
  return (
    <footer className="mt-24">
      {/* UPC institutional band — the only place the institutional red appears */}
      <div className="paper-grain bg-[var(--color-surface-cream-strong)]">
        <div className="mx-auto flex max-w-[1200px] items-center gap-5 px-6 py-14 md:px-10 md:py-16">
          <span
            aria-hidden
            className="block h-12 w-1 rounded-full"
            style={{ backgroundColor: "var(--color-upc)" }}
          />
          <Image
            src={upcLogo}
            alt="Universidad Peruana de Ciencias Aplicadas"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Material académico
            </span>
            <span className="font-display text-2xl leading-tight text-[var(--color-ink)]">
              Universidad Peruana de Ciencias Aplicadas
            </span>
          </div>
        </div>
      </div>

      {/* Dark closing band — Claude footer pattern */}
      <div className="bg-[var(--color-surface-dark)] text-[var(--color-on-dark-soft)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="slow-spin font-display text-xl text-[var(--color-on-dark)]"
            >
              ✳
            </span>
            <span className="text-sm text-[var(--color-on-dark)]">
              Manual del Taller de Claude
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span>Anthropic Claude · referencia</span>
            <span aria-hidden className="text-[var(--color-muted)]">·</span>
            <span>UPC · uso académico</span>
            <span aria-hidden className="text-[var(--color-muted)]">·</span>
            <span className="tabular-nums">2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
