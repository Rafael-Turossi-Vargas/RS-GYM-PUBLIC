import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

/* ✅ 6 CARDS */
const items = [
  { title: "Área de treino", note: "Musculação", src: "/gallery/foto-01.jpg" },
  { title: "Equipamentos", note: "Aparelhos e pesos", src: "/gallery/foto-02.jpg" },
  { title: "Ambiente premium", note: "Conforto e estilo", src: "/gallery/foto-03.jpg" },
  { title: "Estrutura", note: "Espaço completo", src: "/gallery/foto-04.jpg" },
  { title: "Cardio", note: "Esteiras e bikes", src: "/gallery/foto-05.jpg" },
  { title: "Armários", note: "Atendimento", src: "/gallery/foto-06.jpg" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-16 sm:py-24">
      <Container>
        <motion.div {...fadeUp} className="mb-10">
          <h2 className="text-3xl font-semibold">
            Galeria <span className="gold-text">RS GYM</span>
          </h2>

          <p className="mt-3 max-w-2xl text-white/70">
            Fotos reais da academia. Estrutura, equipamentos e ambiente premium.
          </p>
        </motion.div>

        {/* GRID PREMIUM (proporcional ao layout do site) */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
          {items.map((it) => (
            <motion.article
              key={it.title}
              {...fadeUp}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1"
            >
              {/* NEON HOVER */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-[30px] ring-2 ring-gold-400/80" />
                <div className="absolute -inset-3 rounded-[36px] blur-2xl bg-[radial-gradient(closest-side,rgba(212,175,55,.45),transparent_70%)]" />
                <div className="absolute -inset-2 rounded-[34px] blur-xl bg-[radial-gradient(closest-side,rgba(255,255,255,.25),transparent_70%)]" />
              </div>

              {/* IMAGEM */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-black/30" />

                {/* LEGENDA PEQUENA */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {it.title}
                  </span>
                </div>

                {/* TAG */}
                <div className="absolute bottom-3 right-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
                    RS GYM
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}