import { ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "../lib/brand";

export default function StickyTrialBar() {
  const wa = buildWhatsAppLink();

  const lastUpdate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  return ;
}