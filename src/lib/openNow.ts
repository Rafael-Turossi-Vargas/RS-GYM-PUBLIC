import { BRAND, type DayKey } from "./brand";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function getDayKey(d: Date): DayKey {
  const day = d.getDay(); // 0 dom, 6 sáb
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "monFri";
}

export function getOpenNow(now = new Date()) {
  const key = getDayKey(now);
  const hours = BRAND.hours[key];

  if (!hours) {
    return { open: false, label: "Fechado agora" };
  }

  const minutes = now.getHours() * 60 + now.getMinutes();
  const openM = toMinutes(hours.open);
  const closeM = toMinutes(hours.close);

  const isOpen = minutes >= openM && minutes < closeM;

  return {
    open: isOpen,
    label: isOpen ? `Aberto agora • até ${hours.close}` : `Fechado agora • abre ${hours.open}`,
  };
}