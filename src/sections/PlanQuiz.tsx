import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Crown,
  Wallet,
  CalendarClock,
} from "lucide-react";
import { BRAND, buildWhatsAppLink } from "../lib/brand";
import { PLANS } from "../lib/plans";
import { recommendPlan, type QuizAnswers, type Goal, type Level } from "../lib/planRecommender";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

function PillButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-gold-500/40 bg-[rgba(212,175,55,.16)] text-white shadow-glow"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StepHeader({
  step,
  total,
  title,
  subtitle,
}: {
  step: number;
  total: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm text-white/60">Teste rápido (40s)</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-white/70">{subtitle}</p>
      </div>

      <div className="hidden sm:flex flex-col items-end">
        <div className="text-xs text-white/50">
          Passo <span className="text-white/80">{step}</span> de{" "}
          <span className="text-white/80">{total}</span>
        </div>
        <div className="mt-2 h-2 w-40 overflow-hidden rounded-full border border-white/10 bg-black/30">
          <div
            className="h-full bg-[rgba(212,175,55,.45)]"
            style={{ width: `${Math.round((step / total) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PlanQuiz() {
  const wa = buildWhatsAppLink();

  const [step, setStep] = React.useState(1);

  const [answers, setAnswers] = React.useState<QuizAnswers>({
    daysPerWeek: 3,
    goal: "emagrecer",
    level: "iniciante",

    urgency: "essa_semana",
    commitment: "nao_sei",
    payment: "tanto_faz",

    budget: "equilibrado",
    prefersGuidance: true,
  });

  const allSteps = 5;

  const rec = React.useMemo(() => recommendPlan(PLANS, answers), [answers]);

  const focusLabel =
    answers.goal === "emagrecer"
      ? "emagrecimento"
      : answers.goal === "massa"
      ? "ganho de massa"
      : "saúde/bem-estar";

  const levelLabel =
    answers.level === "iniciante"
      ? "iniciante"
      : answers.level === "intermediario"
      ? "intermediário"
      : "avançado";

  const urgencyLabel =
    answers.urgency === "hoje" ? "quero começar hoje" : answers.urgency === "essa_semana" ? "essa semana" : "ainda este mês";

  const commitmentLabel =
    answers.commitment === "nao_sei"
      ? "não sei ainda"
      : answers.commitment === "1m"
      ? "1 mês"
      : answers.commitment === "3m"
      ? "3 meses"
      : answers.commitment === "6m"
      ? "6 meses"
      : "12 meses";

  const paymentLabel =
    answers.payment === "recorrente" ? "recorrente" : answers.payment === "parcelado" ? "parcelado" : "tanto faz";

  const msg = React.useMemo(() => {
    return `Olá! 👋 Vim pelo site da RS GYM e fiz o teste rápido.

• Dias/semana: ${answers.daysPerWeek}x
• Foco: ${focusLabel}
• Nível: ${levelLabel}
• Quando quero começar: ${urgencyLabel}
• Por quanto tempo quero fechar: ${commitmentLabel}
• Pagamento: ${paymentLabel}
• Preferência: ${answers.budget}
• Quero orientação: ${answers.prefersGuidance ? "sim" : "não"}

Plano recomendado: ${rec.plan.name} (${rec.plan.price} - ${rec.plan.cadence})

 Outras opções:
${rec.top.map((t) => `- ${t.plan.name} (${t.plan.price})`).join("\n")}

Pode me explicar as condições e já agendar minha aula experimental? ✅`;
  }, [answers, rec.plan, rec.top, focusLabel, levelLabel, urgencyLabel, commitmentLabel, paymentLabel]);

  const waQuiz = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(msg)}`;

  const setGoal = (g: Goal) => setAnswers((s) => ({ ...s, goal: g }));
  const setLevel = (l: Level) => setAnswers((s) => ({ ...s, level: l }));

  return (
    <section id="quiz" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.6)]">
          <div className="p-6 sm:p-8">
            <StepHeader
              step={Math.min(step, allSteps)}
              total={allSteps}
              title="Qual plano é ideal pra você?"
              subtitle="Agora o teste considera urgência, tempo e forma de pagamento — pra recomendar qualquer plano com precisão."
            />

            {/* progress mobile */}
            <div className="mt-5 sm:hidden">
              <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/30">
                <div
                  className="h-full bg-[rgba(212,175,55,.45)]"
                  style={{ width: `${Math.round((Math.min(step, allSteps) / allSteps) * 100)}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-white/50">
                Passo <span className="text-white/80">{Math.min(step, allSteps)}</span> de{" "}
                <span className="text-white/80">{allSteps}</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              {/* Perguntas */}
              <div className="lg:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5 sm:p-6">
                  <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 ? (
                      <motion.div key="s1" {...fadeUp}>
                        <div className="text-sm font-semibold text-white">1) Quantos dias por semana você treina?</div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {[2, 3, 4, 5].map((n) => (
                            <PillButton
                              key={n}
                              active={answers.daysPerWeek === n}
                              onClick={() => setAnswers((s) => ({ ...s, daysPerWeek: n as any }))}
                            >
                              {n === 5 ? "5x+" : `${n}x`}
                            </PillButton>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                          >
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* STEP 2 */}
                    {step === 2 ? (
                      <motion.div key="s2" {...fadeUp}>
                        <div className="text-sm font-semibold text-white">2) Qual é seu foco principal?</div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-3">
                          <PillButton active={answers.goal === "emagrecer"} onClick={() => setGoal("emagrecer")}>
                            Emagrecimento
                          </PillButton>
                          <PillButton active={answers.goal === "massa"} onClick={() => setGoal("massa")}>
                            Ganho de massa
                          </PillButton>
                          <PillButton active={answers.goal === "saude"} onClick={() => setGoal("saude")}>
                            Saúde / bem-estar
                          </PillButton>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm text-white/60 hover:text-white transition"
                          >
                            Voltar
                          </button>

                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                          >
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* STEP 3 */}
                    {step === 3 ? (
                      <motion.div key="s3" {...fadeUp}>
                        <div className="text-sm font-semibold text-white">3) Qual seu nível hoje?</div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <PillButton active={answers.level === "iniciante"} onClick={() => setLevel("iniciante")}>
                            Iniciante
                          </PillButton>
                          <PillButton
                            active={answers.level === "intermediario"}
                            onClick={() => setLevel("intermediario")}
                          >
                            Intermediário
                          </PillButton>
                          <PillButton active={answers.level === "avancado"} onClick={() => setLevel("avancado")}>
                            Avançado
                          </PillButton>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-sm font-semibold text-white">Você quer orientação?</div>
                            <div className="mt-2 text-sm text-white/60">Ajuda a deixar a recomendação mais certeira.</div>

                            <div className="mt-3 flex gap-2">
                              <PillButton
                                active={answers.prefersGuidance === true}
                                onClick={() => setAnswers((s) => ({ ...s, prefersGuidance: true }))}
                              >
                                Sim
                              </PillButton>
                              <PillButton
                                active={answers.prefersGuidance === false}
                                onClick={() => setAnswers((s) => ({ ...s, prefersGuidance: false }))}
                              >
                                Não
                              </PillButton>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-sm font-semibold text-white">O que você prioriza?</div>
                            <div className="mt-2 text-sm text-white/60">Ajusta o tipo de plano sugerido.</div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <PillButton
                                active={answers.budget === "custo"}
                                onClick={() => setAnswers((s) => ({ ...s, budget: "custo" }))}
                              >
                                <Wallet className="h-4 w-4 mr-2" />
                                Custo-benefício
                              </PillButton>
                              <PillButton
                                active={answers.budget === "equilibrado"}
                                onClick={() => setAnswers((s) => ({ ...s, budget: "equilibrado" }))}
                              >
                                Equilíbrio
                              </PillButton>
                              <PillButton
                                active={answers.budget === "premium"}
                                onClick={() => setAnswers((s) => ({ ...s, budget: "premium" }))}
                              >
                                <Crown className="h-4 w-4 mr-2" />
                                Premium
                              </PillButton>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-sm text-white/60 hover:text-white transition"
                          >
                            Voltar
                          </button>

                          <button
                            type="button"
                            onClick={() => setStep(4)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                          >
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* STEP 4 */}
                    {step === 4 ? (
                      <motion.div key="s4" {...fadeUp}>
                        <div className="text-sm font-semibold text-white">4) Quando você quer começar?</div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <PillButton
                            active={answers.urgency === "hoje"}
                            onClick={() => setAnswers((s) => ({ ...s, urgency: "hoje" }))}
                          >
                            Hoje
                          </PillButton>
                          <PillButton
                            active={answers.urgency === "essa_semana"}
                            onClick={() => setAnswers((s) => ({ ...s, urgency: "essa_semana" }))}
                          >
                            Essa semana
                          </PillButton>
                          <PillButton
                            active={answers.urgency === "este_mes"}
                            onClick={() => setAnswers((s) => ({ ...s, urgency: "este_mes" }))}
                          >
                            Este mês
                          </PillButton>
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <CalendarClock className="h-4 w-4 text-gold-500" />
                            Por quanto tempo você quer fechar?
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <PillButton
                              active={answers.commitment === "nao_sei"}
                              onClick={() => setAnswers((s) => ({ ...s, commitment: "nao_sei" }))}
                            >
                              Ainda não sei
                            </PillButton>
                            <PillButton
                              active={answers.commitment === "1m"}
                              onClick={() => setAnswers((s) => ({ ...s, commitment: "1m" }))}
                            >
                              1 mês
                            </PillButton>
                            <PillButton
                              active={answers.commitment === "3m"}
                              onClick={() => setAnswers((s) => ({ ...s, commitment: "3m" }))}
                            >
                              3 meses
                            </PillButton>
                            <PillButton
                              active={answers.commitment === "6m"}
                              onClick={() => setAnswers((s) => ({ ...s, commitment: "6m" }))}
                            >
                              6 meses
                            </PillButton>
                            <PillButton
                              active={answers.commitment === "12m"}
                              onClick={() => setAnswers((s) => ({ ...s, commitment: "12m" }))}
                            >
                              12 meses
                            </PillButton>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-sm text-white/60 hover:text-white transition"
                          >
                            Voltar
                          </button>

                          <button
                            type="button"
                            onClick={() => setStep(5)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
                          >
                            Ver recomendação <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* STEP 5 (Resultado) */}
                    {step >= 5 ? (
                      <motion.div key="s5" {...fadeUp}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm text-white/60">Resultado</div>
                            <div className="mt-2 text-2xl font-semibold text-white">
                              Plano recomendado: <span className="gold-text">{rec.plan.name}</span>
                            </div>
                            <div className="mt-2 text-sm text-white/70">
                              {rec.plan.price} • {rec.plan.cadence}
                              {rec.plan.extra ? ` • ${rec.plan.extra}` : ""}
                            </div>
                          </div>

                          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                            Confiança: {rec.confidence}
                          </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <Sparkles className="h-4 w-4 text-gold-500" />
                            Por que esse plano?
                          </div>
                          <ul className="mt-3 space-y-2 text-sm text-white/70">
                            {rec.reasons.map((r) => (
                              <li key={r} className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-500" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* TOP 3 opções (isso garante visibilidade e dá confiança) */}
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-sm font-semibold text-white">Top opções para você</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-3">
                            {rec.top.map((t) => (
                              <div
                                key={`${t.plan.name}-${t.score}`}
                                className="rounded-2xl border border-white/10 bg-black/35 p-3"
                              >
                                <div className="text-sm font-semibold text-white">{t.plan.name}</div>
                                <div className="mt-1 text-xs text-white/70">
                                  {t.plan.price} • {t.plan.cadence}
                                </div>
                                {t.plan.extra ? (
                                  <div className="mt-2 text-xs text-white/60">{t.plan.extra}</div>
                                ) : (
                                  <div className="mt-2 text-xs text-white/50"> </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 text-xs text-white/50">
                            * Mostramos as 3 melhores opções para você escolher com segurança.
                          </div>
                        </div>

                        {/* Pergunta final: pagamento (só aparece no final, simples e direta) */}
                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                          <div className="text-sm font-semibold text-white">Preferência de pagamento</div>
                          <div className="mt-2 text-sm text-white/60">
                            Isso ajuda a definir entre os dois planos anuais (recorrente vs parcelado).
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <PillButton
                              active={answers.payment === "recorrente"}
                              onClick={() => setAnswers((s) => ({ ...s, payment: "recorrente" }))}
                            >
                              Recorrente
                            </PillButton>
                            <PillButton
                              active={answers.payment === "parcelado"}
                              onClick={() => setAnswers((s) => ({ ...s, payment: "parcelado" }))}
                            >
                              Parcelado
                            </PillButton>
                            <PillButton
                              active={answers.payment === "tanto_faz"}
                              onClick={() => setAnswers((s) => ({ ...s, payment: "tanto_faz" }))}
                            >
                              Tanto faz
                            </PillButton>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Refazer teste
                          </button>

                          <div className="flex flex-col gap-2 sm:flex-row">
                            <a
                              href={wa}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white hover:bg-black/45 transition"
                            >
                              Falar com a equipe <ArrowRight className="h-4 w-4" />
                            </a>

                            <a
                              href={waQuiz}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-gold-500 px-4 py-3 text-sm font-semibold text-black hover:brightness-110 transition"
                            >
                              Quero esse plano <ArrowRight className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Preview */}
              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5 sm:p-6">
                  <div className="text-sm font-semibold text-white">Preview da recomendação</div>
                  <div className="mt-3 text-sm text-white/60">
                    Conforme você responde, o sistema ajusta as opções — agora com todos os planos competindo.
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Plano provável</div>
                    <div className="mt-2 text-lg font-semibold text-white">{rec.plan.name}</div>
                    <div className="mt-1 text-sm text-white/70">
                      {rec.plan.price} • {rec.plan.cadence}
                    </div>
                    <div className="mt-3 text-xs text-white/60">
                      Confiança: <span className="text-white/80">{rec.confidence}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-white/50">
                    * Agora o sistema usa urgência, tempo e pagamento — evitando recomendar sempre o mensal.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA footer */}
          <div className="flex flex-col gap-3 border-t border-white/10 bg-black/35 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              Dúvida? Agende uma aula experimental e a equipe ajusta o melhor plano com você.
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
            >
              Agendar aula experimental <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}