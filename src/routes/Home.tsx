import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SiteShell from "../components/SiteShell";
import { BRAND, buildWhatsAppLink } from "../lib/brand";
import Gallery from "../sections/Gallery";
import FAQ from "../sections/FAQ";
import Reviews from "../sections/Reviews";
import Schedule from "../sections/Schedule";
import Contact from "../sections/Contact";
import { PLANS } from "../lib/plans";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition sm:w-auto"
    >
      {children}
    </a>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition sm:w-auto"
    >
      {children}
    </a>
  );
}

function CarouselArrows({
  scrollerRef,
  className = "",
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div
      className={[
        "absolute inset-y-0 left-0 right-0 z-30",
        "pointer-events-none",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 bg-[linear-gradient(to_right,rgba(0,0,0,.70),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 bg-[linear-gradient(to_left,rgba(0,0,0,.70),transparent)]" />

      <button
        type="button"
        onClick={() => scrollByCards("left")}
        className={[
          "pointer-events-auto",
          "absolute left-2 top-1/2 -translate-y-1/2 z-40",
          "grid h-10 w-10 place-items-center rounded-full",
          "border border-white/10 bg-black/55 backdrop-blur",
          "hover:bg-black/70 active:scale-95 transition",
        ].join(" ")}
        aria-label="Anterior"
        title="Anterior"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        type="button"
        onClick={() => scrollByCards("right")}
        className={[
          "pointer-events-auto",
          "absolute right-2 top-1/2 -translate-y-1/2 z-40",
          "grid h-10 w-10 place-items-center rounded-full",
          "border border-white/10 bg-black/55 backdrop-blur",
          "hover:bg-black/70 active:scale-95 transition",
        ].join(" ")}
        aria-label="Próximo"
        title="Próximo"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}

export default function Home() {
  const wa = buildWhatsAppLink();
  const plansScrollerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <SiteShell>
      {/* HERO */}
      <section id="inicio" className="relative py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <Star className="h-3.5 w-3.5 text-gold-500" />
                  4,8 no Google (37 avaliações)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <MapPin className="h-3.5 w-3.5 text-gold-500" />
                  {BRAND.addressShort}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Treine com <span className="gold-text">estrutura</span>,{" "}
                <span className="gold-text">energia</span> e{" "}
                <span className="gold-text">resultado</span>.
              </h1>

              <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
                A RS GYM é a academia pra quem
                quer evoluir de verdade: ambiente premium, treino inteligente e
                uma experiência que dá vontade de voltar.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={wa}>
                  Agendar aula experimental{" "}
                  <ArrowRight className="h-4 w-4 text-white" />
                </PrimaryButton>
                <GhostButton href="#planos-preview">
                  Ver planos <Clock className="h-4 w-4 text-white" />
                </GhostButton>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Gallery />
      <Reviews />
      <Schedule />

      {/* Preview Planos */}
      <section id="planos-preview" className="py-14 sm:py-20">
        <Container>
          <motion.div
            {...fadeUp}
            className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <h2 className="text-3xl font-semibold">
              <span className="gold-text">Planos</span>
              </h2>
              <p className="mt-3 max-w-2xl text-white/70">
                Valores e durações conforme a academia. Para matrícula e
                condições, chame no WhatsApp.
              </p>
            </div>

            <a
              href="/planos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Ver página de Planos <ArrowRight className="h-4 w-4 text-white" />
            </a>
          </motion.div>

          {/* ✅ MOBILE: carrossel com setas */}
          <motion.div {...fadeUp} className="relative md:hidden">
            <CarouselArrows scrollerRef={plansScrollerRef} />

            <div
              ref={plansScrollerRef}
              className={[
                "-mx-4 px-4",
                "relative z-10",
                "flex gap-4",
                "overflow-x-scroll pb-3",
                "snap-x snap-mandatory",
                "scroll-smooth",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                "cursor-grab active:cursor-grabbing",
              ].join(" ")}
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x",
              }}
            >
              {PLANS.map((p) => (
                <article
                  key={p.name}
                  className={[
                    "snap-start",
                    // ✅ menor no mobile (mais “SaaS”)
                    "min-w-[80%] max-w-[80%]",
                    "relative overflow-hidden rounded-3xl border",
                    p.highlight
                      ? "border-[rgba(212,175,55,.45)] bg-gradient-to-b from-[rgba(212,175,55,.16)] to-[rgba(255,255,255,.04)] shadow-glow"
                      : "border-white/10 bg-white/5",
                  ].join(" ")}
                >
                  <div className="p-5">
                    {/* reserva pro ribbon */}
                    <div className="h-9">
                      {p.ribbon ? (
                        <div className="absolute left-0 right-0 top-0 bg-[rgba(212,175,55,.20)] px-4 py-2 text-center text-xs font-semibold tracking-wider text-white/90">
                          {p.ribbon}
                        </div>
                      ) : (
                        <div className="opacity-0 select-none text-xs">.</div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="text-base font-semibold text-white">
                        {p.name}
                      </div>

                      <div className="mt-4">
                        <div className="text-3xl font-bold text-white">
                          {p.price}
                        </div>
                        <div className="mt-1 text-sm text-white/60">
                          {p.cadence}
                        </div>
                      </div>

                      <div className="mt-3 min-h-[18px] text-sm text-white/70">
                        {p.extra ?? ""}
                      </div>

                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="text-sm font-semibold text-white/90">
                          {p.detail}
                        </div>
                      </div>

                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className={[
                          "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                          p.highlight
                            ? "border border-white/10 bg-black/30 text-white hover:bg-black/40"
                            : "border border-gold-500/30 bg-white/5 text-white shadow-glow hover:bg-white/10",
                        ].join(" ")}
                      >
                        Eu quero <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          {/* ✅ DESKTOP/TABLET+: grid */}
          <motion.div {...fadeUp} className="hidden md:block">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PLANS.map((p) => (
                <article
                  key={p.name}
                  className={[
                    "relative overflow-hidden rounded-3xl border p-6",
                    "flex h-full flex-col",
                    p.highlight
                      ? "border-[rgba(212,175,55,.45)] bg-gradient-to-b from-[rgba(212,175,55,.16)] to-[rgba(255,255,255,.04)] shadow-glow"
                      : "border-white/10 bg-white/5",
                  ].join(" ")}
                >
                  <div className="h-9">
                    {p.ribbon ? (
                      <div className="absolute left-0 right-0 top-0 bg-[rgba(212,175,55,.20)] px-4 py-2 text-center text-xs font-semibold tracking-wider text-white/90">
                        {p.ribbon}
                      </div>
                    ) : (
                      <div className="opacity-0 select-none text-xs">.</div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="text-lg font-semibold text-white">{p.name}</div>

                    <div className="mt-5">
                      <div className="text-4xl font-bold text-white">{p.price}</div>
                      <div className="mt-1 text-sm text-white/60">{p.cadence}</div>
                    </div>

                    <div className="mt-3 min-h-[20px] text-sm text-white/70">
                      {p.extra ?? ""}
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white/90">
                        {p.detail}
                      </div>
                    </div>

                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      className={[
                        "mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        p.highlight
                          ? "border border-white/10 bg-black/30 text-white hover:bg-black/40"
                          : "border border-gold-500/30 bg-white/5 text-white shadow-glow hover:bg-white/10",
                      ].join(" ")}
                    >
                      Eu quero <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <FAQ />
      <Contact />
    </SiteShell>
  );
}