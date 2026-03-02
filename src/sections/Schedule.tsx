import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const schedule = [
  { day: "Segunda a Sexta", hours: "06:00 – 22:00" },
  { day: "Sábado", hours: "09:00 – 13:00" },
  { day: "Domingo", hours: "Fechado" },
];

export default function Schedule() {
  return (
    <section id="horarios" className="py-14 sm:py-20">
      <Container>
        <motion.div {...fadeUp} className="mb-10">
          <h2 className="text-3xl font-semibold">
            Horários <span className="gold-text">de funcionamento</span>
          </h2>
        </motion.div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:block">
          <table className="w-full text-left">
            <thead className="bg-black/30">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Dia</th>
                <th className="px-6 py-4 text-sm font-semibold">Horário</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.day} className="border-t border-white/10">
                  <td className="px-6 py-4 text-sm text-white/80">{s.day}</td>
                  <td className="px-6 py-4 text-sm text-white/80">{s.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-3 md:hidden">
          {schedule.map((s) => (
            <div key={s.day} className="glass rounded-3xl p-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{s.day}</div>
                <div className="mt-1 text-sm text-white/70">{s.hours}</div>
              </div>
              <Clock className="h-5 w-5 text-gold-500" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}