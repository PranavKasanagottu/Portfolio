"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value, duration = 1600 }) {
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const target = parseFloat(m[1]);
  const suffix = m[2];
  const decimals = (m[1].split(".")[1] || "").length;
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(target * (1 - Math.pow(1 - p, 3))); // ease-out
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);

  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}