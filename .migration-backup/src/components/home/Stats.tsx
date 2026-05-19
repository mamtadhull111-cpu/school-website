import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: 1200, suffix: "+", label: "Happy Students" },
  { value: 75, suffix: "+", label: "Expert Teachers" },
  { value: 25, suffix: "", label: "Years of Excellence" },
  { value: 120, suffix: "+", label: "Awards & Honours" },
];

const Counter = ({ to, suffix, active }: { to: number; suffix: string; active: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, active]);
  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative -mt-20 z-20 px-6 lg:px-10">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-8 text-center">
            <div className="font-serif text-4xl md:text-5xl font-semibold text-primary">
              <Counter to={s.value} suffix={s.suffix} active={visible} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
