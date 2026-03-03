import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BRAND } from "../lib/brand";

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

/** ✅ 6 PRINTS (3 em cima, 3 embaixo) */
const reviewPrints = Array.from({ length: 6 }).map((_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { label: `review-${n}.jpg`, src: `/reviews/review-${n}.jpg` };
});

function StarsRow() {
  return (
    <div className="flex items-center gap-0.5 text-gold-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
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
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={[
        "absolute inset-y-0 left-0 right-0 z-30",
        "pointer-events-none",
        className,
      ].join(" ")}
    >
      {/* Gradientes laterais (não bloqueiam clique) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 bg-[linear-gradient(to_right,rgba(0,0,0,.28),transparent)]" />
<div className="pointer-events-none absolute inset-y-0 right-0  bg-[linear-gradient(to_left,rgba(0,0,0,.28),transparent)]" />

      {/* Botões */}
      <button
        type="button"
        onClick={() => scrollByCards("left")}
        className={[
          "pointer-events-auto",
          "absolute left-0 top-1/2 -translate-y-1/2 z-40",
          "grid h-8 w-8 place-items-center rounded-full",
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
          "absolute right-0 top-1/2 -translate-y-1/2 z-40",
          "grid h-8 w-8 place-items-center rounded-full",
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

function ReviewCard({ src, label }: { src: string; label: string }) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.04]",
        "shadow-[0_12px_34px_rgba(0,0,0,0.45)]",
      ].join(" ")}
    >
      <div className="p-2 sm:p-2.5">
        <div className="relative w-full overflow-hidden rounded-[18px] bg-black/10">
          <div className="relative w-full aspect-[520/140]">
            <img
              src={src}
              alt={label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* leve vignette pra integrar no site */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.10),transparent_45%,rgba(0,0,0,.18))]" />
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:22px_22px]" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section id="depoimentos" className="py-16 sm:py-24">
      <Container>
        {/* Header */}
        <motion.div
          {...fadeUp}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              <BadgeCheck className="h-4 w-4 text-gold-500" />
              Google Reviews
            </div>

            <h2 className="text-3xl font-semibold">
              Avaliações <span className="gold-text">no Google</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1">
                <b className="text-white">4,8</b>
                <StarsRow />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1">
                <span className="text-white/80">37 avaliações</span>
              </span>
            </div>
          </div>

          {BRAND.googleReviewsUrl && (
            <a
              href={BRAND.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition sm:w-auto"
            >
              Ver no Google <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </motion.div>

        {/* ✅ MOBILE/TABLET: carrossel com setas */}
        <motion.div {...fadeUp} className="relative lg:hidden">
          <CarouselArrows scrollerRef={scrollerRef} />

          <div
            ref={scrollerRef}
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
            {reviewPrints.map((p) => (
              <div
                key={p.label}
                className={[
                  "snap-start",
                  // ✅ menor no mobile (não gigante)
                  "min-w-[78%] max-w-[78%]",
                  "sm:min-w-[56%] sm:max-w-[56%]",
                ].join(" ")}
              >
                <ReviewCard src={p.src} label={p.label} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ✅ DESKTOP: grid */}
        <motion.div {...fadeUp} className="hidden lg:block">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewPrints.map((p) => (
              <ReviewCard key={p.label} src={p.src} label={p.label} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}