import { motion } from "framer-motion";
import { CalendarCheck, ClipboardList, Dumbbell } from "lucide-react";
import { buildWhatsAppLink } from "../lib/brand";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function HowItWorks() {
  const wa = buildWhatsAppLink();

  const steps = [
    {
      icon: <CalendarCheck className="h-5 w-5 text-gold-500" />,
      title: "1) Agende no WhatsApp",
      desc: "Clique e envie uma mensagem pronta. Sem enrolação.",
    },
    {
      icon: <ClipboardList className="h-5 w-5 text-gold-500" />,
      title: "2) Avaliação + plano",
      desc: "A gente entende seu objetivo e monta uma rota clara.",
    },
    {
      icon: <Dumbbell className="h-5 w-5 text-gold-500" />,
      title: "3) Treino acompanhado",
      desc: "Rotina consistente e evolução visível com orientação.",
    },
  ];

  return (
    <section id="como-funciona" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-sm text-white/60">Processo simples, resultado real</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Como funciona na prática
          </h2>
          <p className="mt-3 text-white/70">
            Um fluxo claro, com experiência premium e sem fricção.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <motion.div key={s.title} {...fadeUp} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/30">
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-white">{s.title}</div>
              </div>
              <div className="mt-3 text-sm text-white/60">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-8">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
          >
            Agendar aula experimental
          </a>
        </motion.div>
      </div>
    </section>
  );
}