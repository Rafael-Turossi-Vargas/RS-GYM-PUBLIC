export type DayKey = "monFri" | "saturday" | "sunday";
export type DayHours = { open: string; close: string };
export type OpeningHours = Record<DayKey, DayHours | null>;

export const BRAND = {
  name: "",
  city: "Esteio - RS",
  phone: "5551991887719",
  whatsappDisplay: "(51) 99188-7719",

  addressShort: "Av. Pres. Vargas, 760 — Centro, Esteio/RS",

  googleRating: 4.8,
  // ✅ padronizado com o Home.tsx
  googleReviewsCount: 37,

  googleReviewsUrl: "https://www.google.com/search?q=RS+GYM+Esteio+reviews",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=RS%20GYM%20Esteio%20RS",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=RS%20GYM%20Esteio%20RS&output=embed",

  instagram: "https://www.instagram.com/rsgym_esteio/",

  // ✅ Horários (usado no “Aberto agora”)
  hours: {
    monFri: { open: "06:00", close: "22:00" },
    saturday: { open: "09:00", close: "13:00" },
    sunday: null,
  } satisfies OpeningHours,
} as const;

export function buildWhatsAppLink() {
  const msg =
    "Olá! 👋 Vim pelo site da RS GYM e gostaria de conhecer os planos e agendar uma aula experimental.";
  return `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(msg)}`;
}