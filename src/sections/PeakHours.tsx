import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND, buildWhatsAppLink } from "../lib/brand";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

type Level = "low" | "mid" | "high";
type PeakItem = { label: string; level: Level };

const BADGE: Record<Level, { label: string; cls: string }> = {
  low: { label: "🟢 Baixo", cls: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200" },
  mid: { label: "🟡 Médio", cls: "border-yellow-500/20 bg-yellow-500/10 text-yellow-200" },
  high: { label: "🔴 Alto", cls: "border-rose-500/20 bg-rose-500/10 text-rose-200" },
};

const DEFAULT: PeakItem[] = [
  { label: "9h – 11h", level: "low" },
  { label: "17h – 18h", level: "mid" },
  { label: "18h – 20h", level: "high" },
];

export default function PeakHours() {
  const wa = buildWhatsAppLink();

  // ✅ opcional: se você adicionar BRAND.peakHours depois, ele usa.
  const peakHours = (BRAND as unknown as { peakHours?: PeakItem[] }).peakHours ?? DEFAULT;

  const msg =
    "Olá! Vim pelo site da RS GYM. Quero treinar em um horário mais tranquilo. Qual é o melhor horário hoje?";

  const waQuiet = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(msg)}`;

  return (
    <section id="pico" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-sm text-white/60">Poucas academias fazem isso</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Agenda inteligente de lotação</h2>
          <p className="mt-3 text-white/70">
            Veja os horários típicos de movimento e escolha o melhor pra você.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {peakHours.map((p) => {
            const b = BADGE[p.level];
            return (
              <motion.div key={p.label} {...fadeUp} className="glass rounded-2xl p-5">
                <div className="text-sm text-white/60">Faixa</div>
                <div className="mt-2 text-3xl font-semibold">{p.label}</div>

                <div className="mt-3">
                  <span className={["inline-flex rounded-full border px-3 py-1 text-xs font-semibold", b.cls].join(" ")}>
                    {b.label}
                  </span>
                </div>

                <div className="mt-3 text-sm text-white/60">
                  Quer confirmar o melhor horário de hoje? Fale com a equipe.
                </div>

                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45 transition"
                >
                  Confirmar horário <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp} className="mt-8">
          <a
            href={waQuiet}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
          >
            Quero ir no horário mais vazio <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}