import React from "react";
import { ArrowRight } from "lucide-react";
import { PLANS } from "../lib/plans";
import { buildWhatsAppLink } from "../lib/brand";

type Goal = "emagrecimento" | "massa" | "saude";
type Level = "iniciante" | "intermediario" | "avancado";
type Frequency = "2" | "3" | "4" | "5";

function recommendPlan(goal: Goal, level: Level, freq: Frequency) {
  // ✅ regra simples (você pode refinar depois)
  if (goal === "massa" && (freq === "4" || freq === "5")) return "Premium";
  if (goal === "emagrecimento" && (freq === "3" || freq === "4")) return "Trimestral";
  if (level === "iniciante") return "Mensal";
  return "Mensal";
}

export default function PlanQuiz() {
  const wa = buildWhatsAppLink();
  const [freq, setFreq] = React.useState<Frequency | null>(null);
  const [goal, setGoal] = React.useState<Goal | null>(null);
  const [level, setLevel] = React.useState<Level | null>(null);

  const done = !!(freq && goal && level);
  const planName = done ? recommendPlan(goal!, level!, freq!) : null;
  const plan = planName ? PLANS.find((p) => p.name.includes(planName)) : null;

  const waLink = React.useMemo(() => {
    if (!done) return wa;
    const msg = `Olá! Fiz o quiz do site. Meu foco é ${goal}, vou treinar ${freq}x/semana e sou ${level}. O plano recomendado foi: ${plan?.name ?? planName}. Quero agendar uma aula experimental.`;
    return `https://wa.me/${(wa.match(/wa\.me\/(\d+)/)?.[1] ?? "")}?text=${encodeURIComponent(msg)}`;
  }, [done, wa, goal, freq, level, plan, planName]);

  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="max-w-2xl">
            <div className="text-sm text-white/60">Teste rápido (30s)</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Qual plano é ideal pra você?
            </h2>
            <p className="mt-3 text-white/70">
              Responda 3 perguntas e já sai com um plano recomendado.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Question
              title="Quantos dias por semana?"
              options={[
                ["2", "2x"],
                ["3", "3x"],
                ["4", "4x"],
                ["5", "5x+"],
              ]}
              value={freq}
              onChange={(v) => setFreq(v as Frequency)}
            />
            <Question
              title="Seu foco hoje?"
              options={[
                ["emagrecimento", "Emagrecimento"],
                ["massa", "Ganho de massa"],
                ["saude", "Saúde / bem-estar"],
              ]}
              value={goal}
              onChange={(v) => setGoal(v as Goal)}
            />
            <Question
              title="Seu nível?"
              options={[
                ["iniciante", "Iniciante"],
                ["intermediario", "Intermediário"],
                ["avancado", "Avançado"],
              ]}
              value={level}
              onChange={(v) => setLevel(v as Level)}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-white/70">
              {done ? (
                <>
                  Plano recomendado:{" "}
                  <span className="font-semibold text-white">{plan?.name ?? planName}</span>
                  {plan?.price ? <span className="text-white/60"> • {plan.price}</span> : null}
                </>
              ) : (
                "Responda as 3 perguntas para ver a recomendação."
              )}
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black hover:brightness-95 active:scale-[0.99] transition"
            >
              Quero esse plano <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Question({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: [string, string][];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(([k, label]) => {
          const active = value === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => onChange(k)}
              className={[
                "rounded-xl px-3 py-2 text-sm transition",
                active
                  ? "bg-yellow-400 text-black font-semibold"
                  : "bg-white/5 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}