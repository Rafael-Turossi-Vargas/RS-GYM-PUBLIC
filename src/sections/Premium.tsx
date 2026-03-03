import React from "react";
import { motion } from "framer-motion";
import { Snowflake, Shield, Sparkles, SprayCan, Users, Dumbbell } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const items = [
  { icon: <Dumbbell className="h-5 w-5 text-gold-500" />, title: "Equipamentos", desc: "Estrutura completa e bem cuidada para constância." },
  { icon: <Snowflake className="h-5 w-5 text-gold-500" />, title: "Climatização", desc: "Conforto para treinar bem em qualquer dia." },
  { icon: <Shield className="h-5 w-5 text-gold-500" />, title: "Segurança", desc: "Ambiente organizado e rotina previsível." },
  { icon: <SprayCan className="h-5 w-5 text-gold-500" />, title: "Higiene", desc: "Padrão de limpeza e cuidado visível." },
  { icon: <Users className="h-5 w-5 text-gold-500" />, title: "Lotação", desc: "Mais controle — melhor experiência no pico." },
  { icon: <Sparkles className="h-5 w-5 text-gold-500" />, title: "Experiência", desc: "Um lugar que dá vontade de voltar (de verdade)." },
] as const;

export default function Premium() {
  return (
    <section id="beneficios" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-sm text-white/60">Não é só “premium” — é explicado</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Ambiente premium, na prática
          </h2>
          <p className="mt-3 text-white/70">
            Cada detalhe existe pra aumentar constância e resultado.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <motion.div key={i.title} {...fadeUp} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/30">
                  {i.icon}
                </div>
                <div className="text-sm font-semibold text-white">{i.title}</div>
              </div>
              <div className="mt-3 text-sm text-white/60">{i.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}