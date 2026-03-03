import React from "react";
import { BRAND, buildWhatsAppLink } from "../lib/brand";
import { getOpenNow } from "../lib/openNow";
import {
  MapPin,
  Star,
  Instagram,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Dumbbell,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  const wa = buildWhatsAppLink();

  const [openState, setOpenState] = React.useState(() => getOpenNow());

  React.useEffect(() => {
    const t = setInterval(() => setOpenState(getOpenNow()), 60_000);
    return () => clearInterval(t);
  }, []);

  const rating = typeof BRAND.googleRating === "number" ? BRAND.googleRating : 4.8;

  // ✅ CORRIGIDO: mesmo nome do brand.ts
  const reviewCount =
    typeof BRAND.googleReviewsCount === "number" ? BRAND.googleReviewsCount : 37;

  return (
    <footer className="relative mt-16 border-t border-white/10 bg-black/55 backdrop-blur supports-[backdrop-filter]:bg-black/45">
      {/* Glow premium no topo */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(60%_60%_at_50%_60%,rgba(212,175,55,.18),transparent_70%)]" />
      {/* Textura discreta */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Trust row / “SaaS vibe” */}
        <div className="grid gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Dumbbell className="h-4 w-4 text-gold-500" />,
              title: "Estrutura premium",
              desc: "Equipamentos e ambiente acima da média.",
            },
            {
              icon: <ShieldCheck className="h-4 w-4 text-gold-500" />,
              title: "Treino seguro",
              desc: "Orientação e rotina consistente.",
            },
            {
              icon: <Sparkles className="h-4 w-4 text-gold-500" />,
              title: "Experiência",
              desc: "Lugar que dá vontade de voltar.",
            },
            {
              icon: <MessageCircle className="h-4 w-4 text-gold-500" />,
              title: "Suporte rápido",
              desc: "WhatsApp direto com a equipe.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-black/30">
                  {b.icon}
                </div>
                <div className="text-sm font-semibold text-white">{b.title}</div>
              </div>
              <div className="mt-2 text-sm text-white/60">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="grid gap-10 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={BRAND.name}
                draggable={false}
                className="h-11 w-auto select-none object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">{BRAND.name}</div>
                <div className="text-xs text-white/60">{BRAND.city}</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/60">
              Treino, performance e resultado. Fale com a equipe e agende sua aula experimental.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={BRAND.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10 transition"
                title="Ver avaliações no Google"
              >
                <Star className="h-3.5 w-3.5 text-gold-500" />
                {rating.toFixed(1).replace(".", ",")} • {reviewCount} avaliações
              </a>

              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                  openState.open
                    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
                    : "border-white/10 bg-white/5 text-white/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    openState.open ? "bg-emerald-400 animate-pulse" : "bg-white/30",
                  ].join(" ")}
                />
                {openState.label}
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-semibold text-white">Navegação</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a className="hover:text-white transition" href="/#inicio">
                  Início
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#beneficios">
                  Diferenciais
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#galeria">
                  Galeria
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#depoimentos">
                  Avaliações
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/planos">
                  Planos
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#contato">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Localização */}
          <div>
            <div className="text-sm font-semibold text-white">Localização</div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold-500" />
                <div className="text-sm text-white/70">{BRAND.addressShort}</div>
              </div>

              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45 transition"
              >
                Como chegar <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <div className="text-sm font-semibold text-white">Comece hoje</div>
            <p className="mt-4 text-sm text-white/60">
              Clique e mande uma mensagem pronta. Resposta rápida.
            </p>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>

            <a
              href={BRAND.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-black/45 transition"
            >
              <Star className="h-4 w-4 text-gold-500" />
              Ver avaliações no Google
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 pb-10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </span>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/45">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              CNPJ 55.894.607/0001-54
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              Esteio • RS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}