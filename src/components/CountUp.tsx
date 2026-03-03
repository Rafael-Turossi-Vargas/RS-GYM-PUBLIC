import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function useInViewOnce<T extends HTMLElement>(rootMargin = "0px") {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export default function CountUp({
  value,
  durationMs = 900,
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  suffix?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>("-10% 0px");
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = value;

    const tick = (t: number) => {
      const p = clamp((t - start) / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}