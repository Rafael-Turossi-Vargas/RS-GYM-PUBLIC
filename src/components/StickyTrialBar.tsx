import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "../lib/brand";

function formatPtBRDate(d: Date) {
  // 02 de março (sem ano, bem “marketing”)
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}

export default function StickyTrialBar() {
  const wa = buildWhatsAppLink();

  // ✅ Urgência “real” e discreta
  const updatedLabel = React.useMemo(() => {
    const now = new Date();
    return `Consulte disponibilidade pelo WhatsApp`;
  }, []);

  return (
    <>
      {/* ✅ Mobile bottom sticky */}
      <div className="fixed inset-x-0 bottom-0 z-[60] block md:hidden">
        <div className="mx-auto max-w-6xl px-3 pb-3">
          <div className="glass shadow-glow rounded-2xl p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="font-semibold">Aula Experimental Gratuita</span>
                </div>
                <div className="mt-1 text-[12px] text-white/65">{updatedLabel}</div>
              </div>

              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:brightness-95 active:scale-[0.99] transition"
              >
                Agendar agora <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ reserva de espaço no fim (pra não “tapar” conteúdo no mobile) */}
      <div className="h-[88px] md:hidden" />
    </>
  );
}