import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function StatCard({ title, end, suffix, description }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div
      ref={ref}
      className="glass-card rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 text-center hover:-translate-y-2 transition duration-300"
    >
      <h2 className="text-5xl font-bold text-emerald-400">
        {count}
        {suffix}
      </h2>

      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-gray-400 text-sm">{description}</p>
    </div>
  );
}
