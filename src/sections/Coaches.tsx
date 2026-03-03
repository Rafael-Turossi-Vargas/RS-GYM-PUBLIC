import { BadgeCheck } from "lucide-react";

const COACHES = [
  {
    name: "Prof. (Nome e sobrenome)",
    role: "Musculação • Hipertrofia",
    certs: ["CREF ativo", "Biomecânica", "Treino para iniciantes"],
    quote: "Treino bom é o que você consegue repetir com constância.",
    photo: "/coaches/joao.jpg",
  },
  {
    name: "Profa. (Nome e sobrenome)",
    role: "Emagrecimento • Funcional",
    certs: ["Avaliação física", "Condicionamento", "Mobilidade"],
    quote: "Seu corpo muda quando seu hábito muda.",
    photo: "/coaches/marina.jpg",
  },
  {
    name: "Prof. (Nome e sobrenome)",
    role: "Performance • Força",
    certs: ["Periodização", "Treino avançado", "Prevenção de lesões"],
    quote: "Evolução é método + presença.",
    photo: "/coaches/diego.jpg",
  },
];

export default function Coaches() {
  return (
    <section id="coaches" className="py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-sm text-white/60">Conheça quem vai te acompanhar</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Professores que pegam junto com você
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {COACHES.map((c) => (
            <div key={c.name} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <img
                  src={c.photo}
                  alt={c.name}
                  className="h-14 w-14 rounded-xl object-cover border border-white/10"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-white/65">{c.role}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {c.certs.map((x) => (
                  <div key={x} className="flex items-center gap-2 text-sm text-white/75">
                    <BadgeCheck className="h-4 w-4 text-yellow-300" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-white/65 italic">“{c.quote}”</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}