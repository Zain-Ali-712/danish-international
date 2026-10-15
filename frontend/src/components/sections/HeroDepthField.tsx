"use client";

import { useEffect, useRef } from "react";

/**
 * Three layers of particles at different depths. Far layers are smaller,
 * fainter and move less, so pointer parallax and slow drift read as volume.
 * Draws once and stays still for reduced motion.
 */
export default function HeroDepthField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    type P = { x: number; y: number; z: number; r: number; tw: number; red: boolean };
    let pts: P[] = [];
    // Out-of-focus foreground motes: large, soft and fast in parallax, they sell the depth of field.
    let bokeh: P[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;

    const seed = () => {
      // Density scales with area so phones are not crowded.
      const count = Math.round(Math.min(260, Math.max(90, (W * H) / 6500)));
      pts = Array.from({ length: count }, () => {
        const z = Math.random(); // 0 = far, 1 = near
        return {
          x: Math.random(),
          y: Math.random(),
          z,
          r: 0.45 + z * z * 1.6,
          tw: Math.random() * Math.PI * 2,
          red: Math.random() < 0.14,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      seed();
      bokeh = Array.from({ length: W < 640 ? 5 : 9 }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: 1,
        r: 7 + Math.random() * 16,
        tw: Math.random() * Math.PI * 2,
        red: Math.random() < 0.4,
      }));
    };

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        const depth = 0.15 + p.z * 0.85;
        // Slow upward drift, faster for near particles, wrapping around.
        const y = (((p.y - t * 0.006 * depth) % 1) + 1) % 1;
        const x = p.x * W - px * 26 * depth;
        const yy = y * H - py * 18 * depth;
        const twinkle = reduce ? 1 : 0.75 + Math.sin(t * 1.3 + p.tw) * 0.25;
        const a = (0.1 + p.z * 0.42) * twinkle;
        ctx.fillStyle = p.red ? `rgba(196,30,58,${a * 1.25})` : `rgba(22,27,36,${a})`;
        ctx.beginPath();
        ctx.arc(x, yy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const b of bokeh) {
        const y = (((b.y - t * 0.01) % 1) + 1) % 1;
        const x = b.x * W - px * 60;
        const yy = y * H - py * 40;
        const g = ctx.createRadialGradient(x, yy, 0, x, yy, b.r);
        const a = 0.08 + (reduce ? 0 : Math.sin(t * 0.8 + b.tw) * 0.03);
        g.addColorStop(0, b.red ? `rgba(196,30,58,${a * 1.4})` : `rgba(22,27,36,${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, yy, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    if (reduce) {
      draw(performance.now());
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (visible && !document.hidden) draw(now);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
