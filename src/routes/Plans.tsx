import { motion } from "framer-motion";
import SiteShell from "../components/SiteShell";
import { buildWhatsAppLink } from "../lib/brand";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { PLANS } from "../lib/plans";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

export default function Plans() {
  const wa = buildWhatsAppLink();

  return (
    <SiteShell>
      <section className="py-14 sm:py-20">
        <Container>
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              <BadgeCheck className="h-4 w-4 text-gold-500" />
              Planos oficiais
            </div>

            <h1 className="mt-3 text-4xl font-semibold">
              Planos <span className="gold-text">RS GYM</span>
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Valores e durações conforme a academia. Para matrícula e condições, chame no WhatsApp.
            </p>
          </motion.div>

          {/* ✅ Mobile: carrossel | Desktop: grid */}
          <div className="mt-8 sm:mt-10">
            {/* Mobile */}
            <div className="md:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-4 snap-x snap-mandatory pb-1">
                {PLANS.map((p, idx) => (
                  <motion.article
                    key={p.name}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: idx * 0.04 }}
                    className="snap-start shrink-0 w-[86%] max-w-[420px]"
                  >
                    <div
                      className={[
                        "relative overflow-hidden rounded-3xl border",
                        "p-5",
                        "min-h-[270px]",
                        "flex flex-col",
                        p.highlight
                          ? "border-[rgba(212,175,55,.45)] bg-gradient-to-b from-[rgba(212,175,55,.14)] to-[rgba(255,255,255,.04)] shadow-glow"
                          : "border-white/10 bg-white/5",
                      ].join(" ")}
                    >
                      {/* ✅ Reserva fixa pro ribbon */}
                      <div className="h-9">
                        {p.ribbon ? (
                          <div className="absolute left-0 right-0 top-0 bg-[rgba(212,175,55,.18)] px-4 py-2 text-center text-[11px] font-semibold tracking-wider text-white/90">
                            {p.ribbon}
                          </div>
                        ) : (
                          <div className="opacity-0 select-none text-xs">.</div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="text-base font-semibold text-white">{p.name}</div>

                        <div className="mt-4">
                          <div className="text-3xl font-bold text-white">{p.price}</div>
                          <div className="mt-1 text-xs text-white/60">{p.cadence}</div>
                        </div>

                        <div className="mt-2 min-h-[18px] text-xs text-white/70">
                          {p.extra ?? ""}
                        </div>

                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="text-sm font-semibold text-white/90">{p.detail}</div>
                        </div>

                        <a
                          href={wa}
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "mt-auto",
                            "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                            p.highlight
                              ? "border border-white/10 bg-black/30 text-white hover:bg-black/40"
                              : "border border-gold-500/30 bg-white/5 text-white shadow-glow hover:bg-white/10",
                          ].join(" ")}
                        >
                          Eu quero <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PLANS.map((p, idx) => (
                <motion.article
                  key={p.name}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
                  className={[
                    "relative overflow-hidden rounded-3xl border p-6",
                    "flex h-full flex-col",
                    p.highlight
                      ? "border-[rgba(212,175,55,.45)] bg-gradient-to-b from-[rgba(212,175,55,.16)] to-[rgba(255,255,255,.04)] shadow-glow"
                      : "border-white/10 bg-white/5",
                  ].join(" ")}
                >
                  {/* ✅ Reserva fixa pro ribbon */}
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

                    <div className="mt-3 min-h-[20px] text-sm text-white/70">{p.extra ?? ""}</div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white/90">{p.detail}</div>
                    </div>

                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      className={[
                        "mt-auto",
                        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        p.highlight
                          ? "border border-white/10 bg-black/30 text-white hover:bg-black/40"
                          : "border border-gold-500/30 bg-white/5 text-white shadow-glow hover:bg-white/10",
                      ].join(" ")}
                    >
                      Eu quero <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}