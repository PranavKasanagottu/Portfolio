"use client";
import { useEffect } from "react";

const REVEAL = ".section .about > *, .skills > div, .carousel, .proj-bar, .timeline li, .wins li, .contact-details, .form";
const SPOT = ".card, .skills > div, .wins li";

export default function Effects() {
  useEffect(() => {
    const move = (e) => {
      const el = e.target.closest?.(SPOT);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    addEventListener("pointermove", move);

    let io;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        setTimeout(() => el.classList.add("in"), Number(el.dataset.d) || 0);
        io.unobserve(el);
      }), { threshold: 0.12 });
      document.querySelectorAll(REVEAL).forEach((el, i) => {
        el.classList.add("rv");
        el.dataset.d = (i % 4) * 90;
        io.observe(el);
      });
    }
    return () => { removeEventListener("pointermove", move); io?.disconnect(); };
  }, []);
  return null;
}