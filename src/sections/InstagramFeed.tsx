import React from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { BRAND } from "../lib/brand";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function InstagramFeed() {
  const embedUrl = (BRAND as any).instagramEmbedUrl as string | undefined;
  const [loaded, setLoaded] = React.useState(false);

  return (
    <section id="instagram" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Últimas novidades no Instagram
            </h2>
            <p className="mt-3 text-white/70">
              Acompanhe treinos, ambiente e novidades — atualizado constantemente.
            </p>
          </div>

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Instagram className="h-4 w-4" />
            Abrir Instagram <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div {...fadeUp} className="mt-8">
          <div className="glass rounded-2xl p-4">
            {!embedUrl ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
                <div className="font-semibold text-white">Modo “Live feed”</div>
                <div className="mt-2 text-white/60">
                  Para mostrar as últimas postagens automaticamente, normalmente usamos um widget de embed (ex.: Elfsight/SnapWidget).
                  Quando você tiver o link do embed, adicione <span className="text-white/80">BRAND.instagramEmbedUrl</span>.
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative">
                {!loaded ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : null}

                <iframe
                  src={embedUrl}
                  className={["w-full rounded-2xl border border-white/10 bg-black/30", loaded ? "h-[520px]" : "h-0 opacity-0"].join(" ")}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  title="Instagram feed"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}