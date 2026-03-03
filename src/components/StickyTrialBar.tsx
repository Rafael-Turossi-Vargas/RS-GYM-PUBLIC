import { ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "../lib/brand";

export default function StickyTrialBar() {
  const wa = buildWhatsAppLink();

  const lastUpdate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/55">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-gold-500" />
            Aula experimental gratuita
          </div>
          <div className="mt-0.5 text-xs text-white/60">
            Última atualização de valores: {lastUpdate}
          </div>
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
        >
          Agendar agora <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}