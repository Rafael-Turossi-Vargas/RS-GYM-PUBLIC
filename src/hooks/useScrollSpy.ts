import React from "react";

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const y = window.scrollY + offset;

      let current = elements[0]?.id ?? "";
      for (const el of elements) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}