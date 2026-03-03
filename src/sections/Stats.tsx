import { Star, Users, Trophy } from "lucide-react";
import CountUp from "../components/CountUp";
import { BRAND } from "../lib/brand";

export default function Stats() {
  const rating = typeof BRAND.googleRating === "number" ? BRAND.googleRating : 4.8;

  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-yellow-300" />
              <div className="text-sm text-white/70">Alunos ativos</div>
            </div>
            <div className="mt-2 text-3xl font-semibold">
              +<CountUp value={480} />
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-yellow-300" />
              <div className="text-sm text-white/70">Transformando vidas</div>
            </div>
            <div className="mt-2 text-3xl font-semibold">
              +<CountUp value={5} suffix=" anos" />
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-300" />
              <div className="text-sm text-white/70">Nota no Google</div>
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {rating.toFixed(1).replace(".", ",")}⭐
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}