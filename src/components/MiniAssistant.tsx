import React from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { BRAND } from "../lib/brand";
import { waLink } from "../lib/whatsapp";

const OPTIONS = [
  {
    title: "Quero emagrecer",
    msg: "Olá! Vim pelo site da RS GYM. Meu foco é emagrecimento e quero agendar uma aula experimental. 👋",
  },
  {
    title: "Quero ganhar massa",
    msg: "Olá! Vim pelo site da RS GYM. Meu foco é ganho de massa e quero agendar uma aula experimental. 💪",
  },
  {
    title: "Quero ver os planos",
    msg: "Olá! Vim pelo site da RS GYM. Pode me enviar os planos e condições? Também quero agendar uma aula experimental. ✅",
  },
] as const;

export default function MiniAssistant() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  // ✅ Fechar ao clicar fora
  React.useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // ✅ DESKTOP ONLY
    <div ref={rootRef} className="fixed bottom-6 left-6 z-[70] hidden md:block">
      {/* Botão */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(0,0,0,0.45)] backdrop-blur hover:bg-black/65 transition"
        aria-expanded={open}
        aria-controls="mini-assistant-panel"
      >
        <MessageCircle className="h-4 w-4 text-gold-500" />
        Ajuda rápida
        <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
          3 opções
        </span>
      </button>

      {/* Painel */}
      {open ? (
        <div
          id="mini-assistant-panel"
          className="mt-3 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_22px_50px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-white">Quer ajuda pra escolher?</div>
              <div className="text-xs text-white/60">
                Responda com 1 clique e já abre no WhatsApp.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Fechar"
              title="Fechar"
            >
              <X className="h-4 w-4 text-white/80" />
            </button>
          </div>

          <div className="p-3">
            <div className="space-y-2">
              {OPTIONS.map((o) => (
                <a
                  key={o.title}
                  href={waLink(BRAND.phone, o.msg)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  <span>{o.title}</span>
                  <ArrowRight className="h-4 w-4 text-white/80" />
                </a>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/60">
              ⏱️ Resposta rápida no horário de atendimento.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}