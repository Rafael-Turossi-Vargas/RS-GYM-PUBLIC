import React from "react";

export default function ScrollProgress() {
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const v = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setP(Math.max(0, Math.min(1, v)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-white/5">
      <div
        className="h-full bg-[linear-gradient(90deg,rgba(212,175,55,0.85),rgba(37,211,102,0.65))]"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}