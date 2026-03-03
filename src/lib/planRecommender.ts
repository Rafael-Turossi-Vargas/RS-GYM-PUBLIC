// src/lib/planRecommender.ts
import type { Plan } from "./plans";

export type Goal = "emagrecer" | "massa" | "saude";
export type Level = "iniciante" | "intermediario" | "avancado";

export type QuizAnswers = {
  daysPerWeek: 2 | 3 | 4 | 5;
  goal: Goal;
  level: Level;

  urgency: "hoje" | "essa_semana" | "este_mes";
  commitment: "nao_sei" | "1m" | "3m" | "6m" | "12m";

  payment: "recorrente" | "parcelado" | "tanto_faz";
  budget: "custo" | "equilibrado" | "premium";

  prefersGuidance: boolean;
};

export type Recommendation = {
  plan: Plan;
  score: number;
  reasons: string[];
  confidence: "alta" | "media" | "baixa";
  top: Array<{ plan: Plan; score: number }>; // sempre 3 opções distintas
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseMonthlyPrice(plan: Plan): number | null {
  // extrai número de "R$ 209,90" -> 209.9
  const m = plan.price.replace(/\./g, "").match(/(\d+)([,\.]\d+)?/);
  if (!m) return null;
  const n = Number((m[1] + (m[2] ?? "")).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

type PlanMeta = {
  key: "diaria" | "mensal" | "trimestral" | "semestral" | "anual_rec" | "anual";
  months: 0 | 1 | 3 | 6 | 12;
  isRecurring: boolean;
  monthlyPrice: number | null;
};

function inferPlanMeta(p: Plan): PlanMeta {
  const n = norm(p.name);
  const d = norm(p.detail ?? "");
  const text = `${n} ${d}`;

  const isRecurring = text.includes("recorrente");

  // meses por “palavra-chave” (bem robusto pro seu caso)
  let months: PlanMeta["months"] = 1;

  if (text.includes("diaria") || text.includes("diaria") || text.includes("por dia") || text.includes("acesso diario")) {
    months = 0;
  } else if (text.includes("trimestral") || text.includes("3 mes")) {
    months = 3;
  } else if (text.includes("semestral") || text.includes("6 mes")) {
    months = 6;
  } else if (text.includes("anual") || text.includes("12 mes")) {
    months = 12;
  } else {
    months = 1; // mensal/fallback
  }

  const key: PlanMeta["key"] =
    months === 0
      ? "diaria"
      : months === 3
      ? "trimestral"
      : months === 6
      ? "semestral"
      : months === 12
      ? (isRecurring ? "anual_rec" : "anual")
      : "mensal";

  return {
    key,
    months,
    isRecurring,
    monthlyPrice: parseMonthlyPrice(p),
  };
}

function uniqByName(plans: Plan[]): Plan[] {
  const seen = new Set<string>();
  const out: Plan[] = [];
  for (const p of plans) {
    const k = norm(p.name);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

export function recommendPlan(plansInput: Plan[], a: QuizAnswers): Recommendation {
  const plans = uniqByName(plansInput);
  const metas = new Map<string, PlanMeta>();
  for (const p of plans) metas.set(p.name, inferPlanMeta(p));

  const score = new Map<string, number>();
  const reasonByPlan = new Map<string, string[]>();

  const add = (p: Plan, pts: number, reason?: string) => {
    score.set(p.name, (score.get(p.name) ?? 0) + pts);
    if (reason) {
      const arr = reasonByPlan.get(p.name) ?? [];
      arr.push(reason);
      reasonByPlan.set(p.name, arr);
    }
  };

  // Base: todo mundo começa competindo
  for (const p of plans) add(p, 10);

  // ========= 1) TEMPO (commitment) — agora manda no resultado =========
  const desiredMonths =
    a.commitment === "1m" ? 1 : a.commitment === "3m" ? 3 : a.commitment === "6m" ? 6 : a.commitment === "12m" ? 12 : null;

  if (desiredMonths) {
    for (const p of plans) {
      const m = metas.get(p.name)!;

      // match exato recebe MUITO
      if (m.months === desiredMonths) add(p, 70, `Você quer fechar por ${desiredMonths} meses — esse plano encaixa perfeito.`);

      // próximos (ex.: escolheu 6m, 3m ainda faz sentido) recebem médio
      if (desiredMonths === 6 && m.months === 3) add(p, 18, "Se preferir testar antes, 3 meses também funciona bem.");
      if (desiredMonths === 12 && m.months === 6) add(p, 18, "6 meses também é uma ótima opção de consistência.");
      if (desiredMonths === 3 && m.months === 1) add(p, 10);

      // penaliza o que foge MUITO da intenção
      const dist = Math.abs((m.months || 1) - desiredMonths);
      if (dist >= 9) add(p, -28);
      else if (dist >= 5) add(p, -14);
    }
  } else {
    // não sei: dá chances reais sem forçar mensal
    for (const p of plans) {
      const m = metas.get(p.name)!;
      if (m.months === 1) add(p, 16, "Como você ainda não definiu tempo, o Mensal é bem flexível.");
      if (m.months === 3) add(p, 14, "O Trimestral é um meio-termo ótimo pra resultado.");
      if (m.months === 0) add(p, 10, "Se quiser testar antes de fechar, a DIÁRIA resolve rápido.");
      if (m.months === 6) add(p, 10);
      if (m.months === 12) add(p, 10);
    }
  }

  // ========= 2) URGÊNCIA =========
  for (const p of plans) {
    const m = metas.get(p.name)!;

    if (a.urgency === "hoje") {
      if (m.months === 0) add(p, 45, "Você quer começar hoje — a DIÁRIA é a forma mais rápida.");
      if (m.months === 1) add(p, 18, "Se preferir já fechar, o Mensal é direto e simples.");
    } else if (a.urgency === "essa_semana") {
      if (m.months === 1) add(p, 22);
      if (m.months === 3) add(p, 14);
    } else {
      // este mês: abre espaço para planos mais longos
      if (m.months === 3) add(p, 12);
      if (m.months === 6) add(p, 12);
      if (m.months === 12) add(p, 10);
    }
  }

  // ========= 3) FREQUÊNCIA =========
  for (const p of plans) {
    const m = metas.get(p.name)!;

    if (a.daysPerWeek >= 5) {
      if (m.months === 12) add(p, 22, "Treinando 5x+ por semana, planos longos dão o melhor custo por uso.");
      if (m.months === 6) add(p, 16);
      if (m.months === 3) add(p, 8);
    } else if (a.daysPerWeek === 4) {
      if (m.months === 6) add(p, 18, "4x/semana pede consistência — 6 meses costuma ser excelente.");
      if (m.months === 3) add(p, 14);
    } else if (a.daysPerWeek === 3) {
      if (m.months === 3) add(p, 16, "3x/semana por 3 meses é um combo muito forte pra resultado.");
      if (m.months === 1) add(p, 10);
    } else {
      // 2x
      if (m.months === 1) add(p, 12);
      if (m.months === 0) add(p, 10);
    }
  }

  // ========= 4) ORÇAMENTO (usa preço mensal quando existir) =========
  const priced = plans
    .map((p) => ({ p, v: metas.get(p.name)!.monthlyPrice }))
    .filter((x): x is { p: Plan; v: number } => typeof x.v === "number" && Number.isFinite(x.v));

  if (priced.length) {
    priced.sort((a1, a2) => a1.v - a2.v);
    const cheapest = priced[0]!.p;
    const priciest = priced[priced.length - 1]!.p;

    if (a.budget === "custo") {
      add(cheapest, 18, "Você prioriza custo-benefício — esse tem um ótimo valor mensal.");
      // também favorece 6/12 meses levemente
      for (const p of plans) {
        const m = metas.get(p.name)!;
        if (m.months === 12) add(p, 10);
        if (m.months === 6) add(p, 8);
      }
    } else if (a.budget === "premium") {
      add(priciest, 14, "Você prioriza a melhor experiência — planos mais completos fazem sentido.");
      for (const p of plans) {
        const m = metas.get(p.name)!;
        if (m.months === 12) add(p, 10);
      }
    } else {
      // equilibrado
      for (const p of plans) {
        const m = metas.get(p.name)!;
        if (m.months === 3) add(p, 12, "Equilíbrio normalmente aponta para Trimestral.");
        if (m.months === 6) add(p, 8);
        if (m.months === 1) add(p, 6);
      }
    }
  } else {
    // sem preço parseável, usa heurística por meses
    for (const p of plans) {
      const m = metas.get(p.name)!;
      if (a.budget === "custo" && (m.months === 12 || m.months === 6)) add(p, 10);
      if (a.budget === "premium" && m.months === 12) add(p, 10);
      if (a.budget === "equilibrado" && m.months === 3) add(p, 10);
    }
  }

  // ========= 5) PAGAMENTO (só influencia anuais) =========
  for (const p of plans) {
    const m = metas.get(p.name)!;
    if (m.months !== 12) continue;

    if (a.payment === "recorrente") {
      if (m.key === "anual_rec") add(p, 30, "Você prefere recorrência — esse anual encaixa perfeito.");
      if (m.key === "anual") add(p, 8);
    } else if (a.payment === "parcelado") {
      if (m.key === "anual") add(p, 30, "Você prefere parcelar — esse anual costuma ser o melhor nesse formato.");
      if (m.key === "anual_rec") add(p, 8);
    } else {
      add(p, 8);
    }
  }

  // ========= 6) AJUSTE FINO (goal/level/guidance) =========
  if (a.prefersGuidance) {
    for (const p of plans) {
      const m = metas.get(p.name)!;
      if (m.months >= 3) add(p, 6, "Com orientação, planos mais longos costumam gerar mais resultado.");
    }
  }

  for (const p of plans) {
    const m = metas.get(p.name)!;

    if (a.level === "iniciante") {
      if (m.months === 1) add(p, 6);
      if (m.months === 0) add(p, 4);
      if (m.months === 3) add(p, 4);
    } else if (a.level === "avancado") {
      if (m.months === 6) add(p, 6);
      if (m.months === 12) add(p, 8);
    }

    if (a.goal === "massa") {
      if (m.months >= 3) add(p, 6);
    } else if (a.goal === "emagrecer") {
      if (m.months === 3) add(p, 6);
      if (m.months === 1) add(p, 4);
    } else {
      // saúde
      if (m.months === 6) add(p, 5);
      if (m.months === 12 && m.isRecurring) add(p, 5);
    }
  }

  // ========= RESULTADO / TOP 3 =========
  const scoredAll = plans
    .map((p) => ({ plan: p, score: score.get(p.name) ?? 0 }))
    .sort((a1, a2) => a2.score - a1.score);

  const best = scoredAll[0]?.plan ?? plans[0]!;
  const bestScore = scoredAll[0]?.score ?? 0;

  // TOP 3 sempre distintos (por nome normalizado)
  const seen = new Set<string>();
  const top: Array<{ plan: Plan; score: number }> = [];
  for (const s of scoredAll) {
    const k = norm(s.plan.name);
    if (seen.has(k)) continue;
    seen.add(k);
    top.push(s);
    if (top.length >= 3) break;
  }

  // confiança: gap entre 1º e 2º
  const secondScore = top[1]?.score ?? bestScore;
  const gap = bestScore - secondScore;
  const confidence: Recommendation["confidence"] = gap >= 18 ? "alta" : gap >= 9 ? "media" : "baixa";

  const reasonsRaw = reasonByPlan.get(best.name) ?? [];
  const reasons = reasonsRaw.filter(Boolean).slice(0, 4);

  while (reasons.length < 3) {
    const generic = "Baseado nas suas respostas, este plano equilibra custo, consistência e resultado.";
    if (!reasons.includes(generic)) reasons.push(generic);
    else break;
  }

  return {
    plan: best,
    score: bestScore,
    reasons,
    confidence,
    top,
  };
}