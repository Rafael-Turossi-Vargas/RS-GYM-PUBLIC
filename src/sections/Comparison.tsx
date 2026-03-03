import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "../lib/brand";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

type Row = {
  label: string;
  hint?: string;
  rs: true | string;
  comum: false | string;
};

const ROWS: Row[] = [
  {
    label: "Climatização e conforto",
    hint: "Padrão que mantém a experiência acima da média.",
    rs: true,
    comum: false,
  },
  {
    label: "Higiene e padrão de limpeza",
    hint: "Rotina constante e ambiente sempre organizado.",
    rs: true,
    comum: false,
  },
  {
    label: "Orientação no treino",
    hint: "Acompanhamento e ajustes conforme seu objetivo.",
    rs: true,
    comum: "às vezes",
  },
  {
    label: "Controle de lotação",
    hint: "Mais conforto e foco no treino.",
    rs: true,
    comum: false,
  },
  {
    label: "Equipamentos selecionados",
    hint: "Estrutura pensada para performance e resultado.",
    rs: true,
    comum: "básico",
  },
  {
    label: "Ambiente motivador",
    hint: "Energia e comunidade que puxa você pra cima.",
    rs: true,
    comum: "varia",
  },
];

function Pill({ ok, text }: { ok: boolean; text?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        ok
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-white/70",
      ].join(" ")}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      {text ?? (ok ? "Incluso" : "—")}
    </span>
  );
}

function ValueCell({ value }: { value: true | false | string }) {
  if (value === true) return <Pill ok text="Incluso" />;
  if (value === false) return <Pill ok={false} text="—" />;
  return <Pill ok={false} text={value} />;
}

export default function Comparison() {
  const wa = buildWhatsAppLink();

  return (
    <section id="comparativo" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-sm text-white/60">Por que a percepção muda</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            RS GYM vs. academia comum
          </h2>
          <p className="mt-3 text-white/70">
            Comparativo direto. Sem promessas vazias — só experiência e estrutura.
          </p>
        </motion.div>

        {/* ✅ MOBILE: cards (somente no mobile) */}
        <motion.div {...fadeUp} className="mt-8 md:hidden">
          <div className="grid gap-3">
            {ROWS.map((r) => (
              <div
                key={r.label}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.55)]"
              >
                <div className="text-sm font-semibold text-white">{r.label}</div>
                {r.hint ? (
                  <div className="mt-1 text-xs text-white/60">{r.hint}</div>
                ) : null}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                    <div className="text-[11px] font-semibold text-white/80">
                      RS GYM
                    </div>
                    <div className="mt-2">
                      <ValueCell value={r.rs} />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                    <div className="text-[11px] font-semibold text-white/70">
                      Comum
                    </div>
                    <div className="mt-2">
                      <ValueCell value={r.comum} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA no mobile */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-black/35 p-4">
            <div className="flex items-start gap-2 text-sm text-white/75">
              <Sparkles className="mt-0.5 h-4 w-4 text-gold-500" />
              <span>Quer sentir a diferença na prática? Agende uma aula experimental.</span>
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
            >
              Agendar agora <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* ✅ DESKTOP: tabela (somente no md+) */}
        <motion.div
          {...fadeUp}
          className={[
            "mt-8 hidden md:block overflow-hidden rounded-3xl border border-white/10",
            "bg-white/[0.03] shadow-[0_18px_55px_rgba(0,0,0,0.55)]",
          ].join(" ")}
        >
          <div className="grid grid-cols-12 gap-3 border-b border-white/10 px-6 py-4">
            <div className="col-span-6">
              <div className="text-xs text-white/60">Recurso</div>
            </div>

            <div className="col-span-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                RS GYM
              </div>
            </div>

            <div className="col-span-3">
              <div className="text-sm font-semibold text-white/70">Comum</div>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {ROWS.map((r) => (
              <div key={r.label} className="grid grid-cols-12 gap-3 px-6 py-4">
                <div className="col-span-6">
                  <div className="text-sm font-semibold text-white/90">{r.label}</div>
                  {r.hint ? (
                    <div className="mt-1 text-xs text-white/60">{r.hint}</div>
                  ) : null}
                </div>

                <div className="col-span-3">
                  <ValueCell value={r.rs} />
                </div>

                <div className="col-span-3">
                  <ValueCell value={r.comum} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
            <div className="inline-flex items-center gap-2 text-sm text-white/70">
              <Sparkles className="h-4 w-4 text-gold-500" />
              Quer sentir a diferença na prática? Agende uma aula experimental.
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
            >
              Agendar agora <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}