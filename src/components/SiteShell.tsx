import React from "react";

import { NavLink, useLocation } from "react-router-dom";
import { Instagram, ArrowRight } from "lucide-react";
import { BRAND, buildWhatsAppLink } from "../lib/brand";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import MiniAssistant from "./MiniAssistant";
import { useScrollSpy } from "../hooks/useScrollSpy";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const wa = buildWhatsAppLink();
  const location = useLocation();

  // ✅ ScrollSpy: só faz sentido na Home (quando tem as sections)
  const isHome = location.pathname === "/";
  const active = useScrollSpy(
    isHome
      ? ["inicio", "beneficios", "como-funciona", "comparativo", "galeria", "depoimentos", "pico", "planos-preview", "contato"]
      : [],
    140
  );

  // ✅ Mostrar/ocultar ao scroll (some descendo, volta subindo)
  const [showFloat, setShowFloat] = React.useState(true);
  const lastY = React.useRef<number>(0);
  const ticking = React.useRef(false);

  // ✅ Magnet hover (somente desktop)
  const btnRef = React.useRef<HTMLAnchorElement | null>(null);
  const [magnet, setMagnet] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const delta = y - lastY.current;
        const threshold = 8;

        if (y < 80) setShowFloat(true);
        else if (delta > threshold) setShowFloat(false);
        else if (delta < -threshold) setShowFloat(true);

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isFinePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches;

  const onMove = (e: React.MouseEvent) => {
    if (!isFinePointer()) return;
    const el = btnRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const strength = 0.18;
    setMagnet({
      x: Math.max(-10, Math.min(10, dx * strength)),
      y: Math.max(-10, Math.min(10, dy * strength)),
    });
  };

  const resetMagnet = () => setMagnet({ x: 0, y: 0 });

  const navCls = (id: string) =>
    [
      "text-sm transition",
      isHome && active === id ? "text-white" : "text-white/70 hover:text-white",
    ].join(" ");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backgrounds globais */}
      <div className="pointer-events-none fixed inset-0 bg-noise" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        {/* ✅ Progress bar SaaS */}
        <div className="relative">
          <ScrollProgress />
        </div>

        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/#inicio" className="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="RS GYM"
              draggable={false}
              className={[
                "h-14 w-auto object-contain select-none",
                "transition-transform duration-300",
                "group-hover:scale-[1.03]",
                "drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]",
              ].join(" ")}
            />

            <div className="leading-tight">
              <div className="text-sm font-semibold">
                <span className="gold-text">{BRAND.name}</span>
              </div>
              <div className="text-xs text-white/60">{BRAND.city}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a className={navCls("beneficios")} href="/#beneficios">
              Diferenciais
            </a>
            <a className={navCls("galeria")} href="/#galeria">
              Galeria
            </a>
            <a className={navCls("depoimentos")} href="/#depoimentos">
              Avaliações
            </a>
            <NavLink className="text-sm text-white/70 hover:text-white transition" to="/planos">
              Planos
            </NavLink>
            <a className={navCls("contato")} href="/#contato">
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="h-4 w-4 text-white" />
              Instagram
            </a>

            <a
              href={wa}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-white/10 transition"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <ArrowRight className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </header>

      {/* ✅ Conteúdo da página (apenas 1x!) */}
      <main>{children}</main>

      {/* Footer + CTA fixo */}
      <Footer />
      

      {/* ✅ Mini assistente (SaaS) */}
      <MiniAssistant />

      {/* WhatsApp flutuante */}
      <a
        ref={btnRef}
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
        onMouseMove={onMove}
        onMouseLeave={resetMagnet}
        className={[
          "fixed bottom-6 right-6 z-50",
          "transition-all duration-300",
          showFloat ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
        ].join(" ")}
        style={{ willChange: "transform, opacity" }}
      >
        <div
          className={[
            "relative",
            "transition-transform duration-200 ease-out",
            "hover:scale-110 active:scale-95",
            "motion-safe:animate-[rsgymPulse_2.6s_ease-in-out_infinite]",
          ].join(" ")}
          style={{ transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0)` }}
        >
          <div className="pointer-events-none absolute -inset-3 rounded-full opacity-70 blur-2xl bg-[radial-gradient(circle,rgba(37,211,102,0.35),transparent_60%)]" />
          <div className="pointer-events-none absolute -inset-2 rounded-full opacity-40 blur-xl bg-[radial-gradient(circle,rgba(212,175,55,0.25),transparent_60%)]" />

          <img
            src="/whatsapp.png"
            alt="WhatsApp"
            draggable={false}
            className={[
              "h-14 w-14",
              "select-none",
              "drop-shadow-[0_10px_26px_rgba(0,0,0,0.55)]",
              "transition-all duration-300",
              "hover:drop-shadow-[0_14px_34px_rgba(37,211,102,0.45)]",
            ].join(" ")}
          />
        </div>
      </a>

      <style>{`
        @keyframes rsgymPulse {
          0%, 100% { filter: brightness(1); transform: translate3d(0,0,0) scale(1); }
          50% { filter: brightness(1.05); transform: translate3d(0,0,0) scale(1.03); }
        }
      `}</style>
    </div>
  );
}