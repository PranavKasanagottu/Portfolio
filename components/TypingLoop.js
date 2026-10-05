"use client";
import { useEffect, useRef, useState } from "react";

export default function TypingLoop({ texts, speed = 45, pause = 1200, delay = 0 }) {
  const ref = useRef(null);
  const [reducedMotion] = useState(() => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(() => reducedMotion ? texts[0].length : 0);
  const [deleting, setDeleting] = useState(false);
  const current = texts[index];

  useEffect(() => {
    if (reducedMotion) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [current.length, reducedMotion]);

  useEffect(() => {
    if (!active || reducedMotion) return;
    let timeout;
    if (!deleting && count < current.length) {
      timeout = setTimeout(() => setCount((value) => value + 1), count === 0 ? delay : speed);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (count > 0) {
      timeout = setTimeout(() => setCount((value) => value - 1), speed / 2);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((value) => (value + 1) % texts.length);
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [active, count, current, deleting, delay, pause, reducedMotion, speed, texts.length]);

  return (
    <span ref={ref} aria-live="polite" aria-label={current}>
      <span aria-hidden="true">
        {current.slice(0, count)}
        {active && <span className="caret" />}
        <span style={{ visibility: "hidden" }}>{current.slice(count)}</span>
      </span>
    </span>
  );
}