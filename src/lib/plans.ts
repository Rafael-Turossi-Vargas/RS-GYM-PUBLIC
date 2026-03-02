// src/lib/plans.ts
export type Plan = {
  name: string;
  price: string;
  cadence: string; // "por mês" | "por dia"
  detail: string;
  extra?: string;
  highlight?: boolean;
  ribbon?: string;
};

export const PLANS: Plan[] = [
  {
    name: "DIÁRIA",
    price: "R$ 30,00",
    cadence: "por dia",
    detail: "Acesso diário",
  },
  {
    name: "Mensal",
    price: "R$ 209,90",
    cadence: "por mês",
    detail: "Duração de 1 mês",
  },
  {
    name: "Trimestral",
    price: "R$ 189,90",
    cadence: "por mês",
    detail: "Duração de 3 meses",
    extra: "R$ 569,70 em até 3x",
  },
  {
    name: "Semestral",
    price: "R$ 169,90",
    cadence: "por mês",
    detail: "Duração de 6 meses",
    extra: "R$ 1.019,40 em até 6x",
  },
  {
    name: "Plano anual (Recorrente com vigência)",
    price: "R$ 159,90",
    cadence: "por mês",
    detail: "Duração de 12 meses",
    extra: "R$ 1.918,80 em até 12x",
  },
  {
    name: "Plano Anual",
    price: "R$ 139,90",
    cadence: "por mês",
    detail: "Duração de 12 meses",
    extra: "R$ 1.678,80 em até 12x",
    highlight: true,
    ribbon: "MAIS VANTAJOSO",
  },
];