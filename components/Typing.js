"use client";
import { useEffect, useRef, useState } from "react";

export default function Typing({ text, speed = 45, delay = 0 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!go) return;
    let i = 0, t;
    const tick = () => { setN(++i); if (i < text.length) t = setTimeout(tick, speed); };
    t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [go, text, speed, delay]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, n)}
        {go && n < text.length && <span className="caret" />}
        <span style={{ visibility: "hidden" }}>{text.slice(n)}</span>
      </span>
    </span>
  );
}