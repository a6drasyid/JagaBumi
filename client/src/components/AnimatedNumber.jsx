import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({ value, duration = 900 }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const startValue = previous.current;
    const endValue = value;

    if (startValue === endValue) return;

    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      const current = Math.round(
        startValue + (endValue - startValue) * progress
      );

      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previous.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{display.toLocaleString("id-ID")}</>;
}