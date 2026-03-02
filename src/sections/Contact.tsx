import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { BRAND, buildWhatsAppLink } from "../lib/brand";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

export default function Contact() {
  const wa = buildWhatsAppLink();

  return (
    <section id="contato" className="py-14 sm:py-20">
      <Container>
        <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              Contato <span className="gold-text">RS GYM</span>
            </h2>
            <p className="mt-3 text-white/70">
              Clique no WhatsApp e envie uma mensagem pronta. Resposta rápida.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-black/40 transition"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-gold-500" />
                  <div>
                    <div className="text-sm font-semibold">WhatsApp</div>
                    <div className="text-xs text-white/60">{BRAND.whatsappDisplay}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/70" />
              </a>

              <a
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-black/40 transition"
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-gold-500" />
                  <div>
                    <div className="text-sm font-semibold">Instagram</div>
                    <div className="text-xs text-white/60">@rsgym_esteio</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/70" />
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold-500" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Endereço</div>
                    <div className="text-xs text-white/60">{BRAND.addressShort}</div>
                  </div>

                  <a
                    href={BRAND.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
                  >
                    Como chegar <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="p-6 sm:p-8">
              <div className="text-sm font-semibold text-white/90">Como chegar</div>
              {BRAND.googleMapsEmbedUrl ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <iframe
                    src={BRAND.googleMapsEmbedUrl}
                    className="w-full"
                    style={{ border: 0, minHeight: 340 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa RS GYM"
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
                  <div className="font-semibold text-white">Falta o embed do mapa</div>
                  <div className="mt-2">
                    Cole o embed do Google Maps em <b>src/lib/brand.ts</b> no campo <b>googleMapsEmbedUrl</b>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}