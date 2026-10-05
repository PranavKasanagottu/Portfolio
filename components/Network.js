"use client";
import { useEffect, useRef } from "react";

export default function Network() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const mouse = { x: -999, y: -999 };
    let w, h, nodes = [], raf;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const init = () => {
      const r = c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.min(90, Math.floor(w * h / 12000)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      }));
    };
    const draw = () => {
      const cs = getComputedStyle(document.documentElement);
      const accent = cs.getPropertyValue("--accent").trim(), warm = cs.getPropertyValue("--warm").trim();
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!still) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < 160 && d > 1) { n.x += dx / d * 0.6; n.y += dy / d * 0.6; }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) { ctx.strokeStyle = accent; ctx.globalAlpha = (1 - d / 120) * 0.35; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (m < 160) { ctx.strokeStyle = warm; ctx.globalAlpha = (1 - m / 160) * 0.9; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        ctx.globalAlpha = 1; ctx.fillStyle = m < 160 ? warm : accent;
        ctx.beginPath(); ctx.arc(a.x, a.y, 2.2, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    let lastW = innerWidth, lastH = innerHeight;
    const onResize = () => {
      if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 150) {
        lastW = innerWidth; lastH = innerHeight; init();
      }
    };

    init(); draw();
    addEventListener("resize", onResize); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="network" aria-hidden="true" />;
}