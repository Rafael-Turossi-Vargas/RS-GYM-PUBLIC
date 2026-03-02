import { motion } from "framer-motion";
import React from "react";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const faqs = [
  { q: "Posso fazer aula experimental?", a: "Sim! Chame no WhatsApp e consulte disponibilidade/condições." },
  { q: "Quais são os planos?", a: "Temos opções sob medida. O valor final depende do seu objetivo e frequência." },
  { q: "Tem estacionamento/como chegar?", a: "No contato você encontra o mapa e o botão “Como chegar”." },
  { q: "Qual o horário de funcionamento?", a: "Veja a seção de horários. Em feriados pode variar." },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold">{q}</div>
        <ChevronDown className={`h-5 w-5 text-gold-500 transition ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <div className="mt-3 text-sm text-white/70">{a}</div>}
    </button>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-14 sm:py-20">
      <Container>
        <motion.div {...fadeUp} className="mb-10">
          <h2 className="text-3xl font-semibold">
            Perguntas <span className="gold-text">frequentes</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Accordion rápido e confortável no mobile.
          </p>
        </motion.div>

        <div className="grid gap-3">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Container>
    </section>
  );
}