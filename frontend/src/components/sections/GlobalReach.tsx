"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HEADQUARTERS, PARTNER_ORIGINS, COMPANY_INFO } from "@/lib/data";
import { WORLD_GRID } from "@/lib/worldGrid";
import SectionHeading from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

type Hub = {
  id: string;
  label: string;
  lon: number;
  lat: number;
  groups: { country: string; partners: string[] }[];
};

// Belgium, Germany and Poland sit too close at world scale, so they share one marker.
const EUROPE = ["belgium", "germany", "poland"];
const HUBS: Hub[] = [
  ...PARTNER_ORIGINS.filter((p) => !EUROPE.includes(p.id)).map((p) => ({
    id: p.id,
    label: p.label,
    lon: p.lon,
    lat: p.lat,
    groups: [{ country: p.label, partners: p.partners }],
  })),
  {
    id: "europe",
    label: "Europe",
    lon: 11,
    lat: 51,
    groups: PARTNER_ORIGINS.filter((p) => EUROPE.includes(p.id)).map((p) => ({ country: p.label, partners: p.partners })),
  },
].sort((a, b) => a.lon - b.lon);

const MAPPED_PARTNERS = HUBS.reduce((n, h) => n + h.groups.reduce((m, g) => m + g.partners.length, 0), 0);

// Rough outline of Pakistan at grid resolution, used to tint the home market.
const PAKISTAN: [number, number][] = [
  [61, 25], [66.5, 25.3], [68, 23.7], [71.2, 24.3], [70.6, 27.8], [73.5, 30], [74.6, 31.2], [75.5, 32.6],
  [74.4, 34.8], [77.6, 35.6], [75.2, 37.1], [71.4, 36.9], [71, 34.2], [69.6, 33.2], [69.3, 31.2],
  [66.4, 29.6], [61.8, 29.6], [60.9, 26.5],
];

function inPoly(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const G = WORLD_GRID;
// Crop of the grid framed around the regions we connect to (Americas to Japan, northern hemisphere),
// so the arcs sit in the middle of the frame instead of a strip along the top.
const VIEW = { lon0: -104, lon1: 152, lat0: 70, lat1: -10 };
const VIEW_COLS = (VIEW.lon1 - VIEW.lon0) / G.step;
const MAP_ASPECT = (VIEW.lon1 - VIEW.lon0) / (VIEW.lat0 - VIEW.lat1);
const toX = (lon: number) => (lon - VIEW.lon0) / (VIEW.lon1 - VIEW.lon0);
const toY = (lat: number) => (VIEW.lat0 - lat) / (VIEW.lat0 - VIEW.lat1);

export default function GlobalReach() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Decode run-length land cells into normalized dot positions.
  const dots = useMemo(() => {
    const out: { x: number; y: number; home: boolean }[] = [];
    G.runs.split(";").forEach((row, r) => {
      if (!row) return;
      const nums = row.split(",").map(Number);
      for (let k = 0; k < nums.length; k += 2) {
        for (let c = nums[k]; c < nums[k] + nums[k + 1]; c++) {
          const lon = G.lon0 + (c + 0.5) * G.step;
          const lat = G.lat0 - (r + 0.5) * G.step;
          const x = toX(lon);
          const y = toY(lat);
          if (x < -0.01 || x > 1.01 || y < -0.01 || y > 1.01) continue;
          out.push({ x, y, home: inPoly(lon, lat, PAKISTAN) });
        }
      }
    });
    return out;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const hq = { x: toX(HEADQUARTERS.lon), y: toY(HEADQUARTERS.lat) };
    const hubs = HUBS.map((h) => ({ id: h.id, x: toX(h.lon), y: toY(h.lat) }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      cache = null;
    };

    let cache: HTMLCanvasElement | null = null;
    let start = 0;
    let started = false;
    let raf = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const WAVE = 1.7; // seconds for the reveal to cross the map
    const maxD = Math.hypot(1, 0.5);

    const dotR = () => Math.max(1.15, (W / VIEW_COLS) * 0.31);

    const drawDots = (t: number, target: CanvasRenderingContext2D, settled: boolean) => {
      const r = dotR();
      const front = settled ? Infinity : (t / WAVE) * maxD;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dist = Math.hypot(d.x - hq.x, (d.y - hq.y) * 0.5);
        if (dist > front) continue;
        const local = settled ? 1 : Math.min(1, (front - dist) / 0.08);
        const edge = settled ? 0 : Math.max(0, 1 - (front - dist) / 0.05);
        const px = d.x * W;
        const py = d.y * H;
        if (d.home) target.fillStyle = `rgba(196,30,58,${0.75 * local})`;
        else if (edge > 0) target.fillStyle = `rgba(196,30,58,${0.6 * edge})`;
        else target.fillStyle = `rgba(14,17,22,${0.2 * local})`;
        target.beginPath();
        target.arc(px, py, r * (1 + edge * 0.6), 0, Math.PI * 2);
        target.fill();
      }
    };

    const buildCache = () => {
      const c = document.createElement("canvas");
      c.width = canvas.width;
      c.height = canvas.height;
      const cx = c.getContext("2d")!;
      cx.scale(dpr, dpr);
      drawDots(0, cx, true);
      cache = c;
    };

    const arcPoint = (a: { x: number; y: number }, b: { x: number; y: number }, u: number) => {
      const ax = a.x * W, ay = a.y * H, bx = b.x * W, by = b.y * H;
      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * 0.28;
      const iu = 1 - u;
      return { x: iu * iu * ax + 2 * iu * u * mx + u * u * bx, y: iu * iu * ay + 2 * iu * u * my + u * u * by };
    };

    const frame = (now: number) => {
      const t = started ? (now - start) / 1000 : 0;
      const settled = reduce || t > WAVE + 0.2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (settled) {
        if (!cache) buildCache();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(cache!, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else {
        drawDots(t, ctx, false);
      }

      // Cursor lens: nearby dots swell and darken.
      pointer.x += (pointer.tx - pointer.x) * 0.2;
      pointer.y += (pointer.ty - pointer.y) * 0.2;
      if (settled && pointer.x > -1000) {
        const R = Math.min(90, W * 0.08);
        const r = dotR();
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const px = d.x * W;
          const py = d.y * H;
          const dd = Math.hypot(px - pointer.x, py - pointer.y);
          if (dd > R) continue;
          const k = 1 - dd / R;
          const s = k * k * (3 - 2 * k);
          ctx.fillStyle = d.home ? `rgba(196,30,58,${0.75 + 0.25 * s})` : `rgba(14,17,22,${0.2 + 0.5 * s})`;
          ctx.beginPath();
          ctx.arc(px, py, r * (1 + s * 0.9), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Arcs from Lahore to each partner hub.
      const arcT = reduce ? 10 : t - WAVE * 0.55;
      hubs.forEach((h, idx) => {
        const grow = Math.max(0, Math.min(1, (arcT - idx * 0.12) / 1.1));
        if (grow <= 0) return;
        const e = 1 - Math.pow(1 - grow, 3);
        const isActive = activeRef.current === h.id;
        const dim = activeRef.current && !isActive;
        ctx.strokeStyle = `rgba(196,30,58,${dim ? 0.2 : isActive ? 1 : 0.6})`;
        ctx.lineWidth = isActive ? 2 : 1.25;
        ctx.beginPath();
        const steps = 48;
        for (let s = 0; s <= steps * e; s++) {
          const p = arcPoint(hq, h, s / steps);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        if (!reduce && grow >= 1) {
          const u = ((t * 0.32 + idx * 0.23) % 1 + 1) % 1;
          const p = arcPoint(hq, h, u);
          const fade = Math.sin(u * Math.PI);
          ctx.fillStyle = `rgba(196,30,58,${fade * (dim ? 0.3 : 1)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, isActive ? 3.2 : 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (visible) frame(now);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      frame(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started && entry.intersectionRatio > 0.25) {
          started = true;
          start = performance.now();
          setInView(true);
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = pointer.x = pointer.y = -9999;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    if (reduce) {
      started = true;
      setInView(true);
      frame(performance.now());
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [dots, reduce]);

  const hqX = toX(HEADQUARTERS.lon) * 100;
  const hqY = toY(HEADQUARTERS.lat) * 100;

  return (
    <section id="coverage" aria-labelledby="coverage-title" className="relative overflow-hidden bg-paper py-24 sm:py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="coverage-title"
          title={
            <>
              Based in Lahore, connected to <span className="text-crimson">the manufacturers that matter</span>
            </>
          }
        >
          {COMPANY_INFO.partnersStory} We have worked with multinational companies throughout Pakistan as well as
          outside the country.
        </SectionHeading>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="flex flex-col lg:col-span-8">
            <div className="-mx-5 sm:mx-0 lg:flex lg:flex-1 lg:items-center">
              <div
                ref={wrapRef}
                style={{ aspectRatio: MAP_ASPECT }}
                className="relative w-full touch-pan-y"
                role="img"
                aria-label="World map showing Danish International's Lahore headquarters connected to partner manufacturers in the United States, Europe, China and Japan"
              >
                {/* soft cut-out edges on the crop */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_98%,transparent),linear-gradient(to_bottom,transparent,#000_4%,#000_82%,transparent)]"
                />

                {/* Headquarters */}
                <div className="pointer-events-none absolute" style={{ left: `${hqX}%`, top: `${hqY}%` }}>
                  <span className="absolute left-0 top-0 block size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson ring-4 ring-white" />
                  <span className="animate-pulse-ring absolute left-0 top-0 -ml-3 -mt-3 block size-6 rounded-full border border-crimson" />
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                    className="absolute left-3 top-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white shadow-soft sm:block"
                  >
                    Lahore HQ
                  </motion.span>
                </div>

                {/* Partner hubs */}
                {HUBS.map((h, i) => {
                  const isActive = active === h.id;
                  return (
                    <motion.button
                      key={h.id}
                      type="button"
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      animate={inView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ duration: 0.5, delay: 1.1 + i * 0.12, ease: EASE }}
                      onMouseEnter={() => setActive(h.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(h.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : h.id)}
                      aria-pressed={isActive}
                      aria-label={`${h.label}: ${h.groups.flatMap((g) => g.partners).join(", ")}`}
                      className="absolute -ml-4 -mt-4 grid size-8 place-items-center rounded-full"
                      style={{ left: `${toX(h.lon) * 100}%`, top: `${toY(h.lat) * 100}%` }}
                    >
                      <span
                        className={`block size-2.5 rounded-full border-2 border-crimson transition-all duration-300 ${
                          isActive ? "scale-150 bg-crimson" : "bg-white"
                        }`}
                      />
                      <span
                        className={`absolute left-7 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[12.5px] font-medium transition-colors md:block ${
                          isActive ? "text-crimson" : "text-ink-2"
                        }`}
                      >
                        {h.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-3">
              Markers show the home countries of our principals. Our office is in Lahore; the shaded area marks
              Pakistan, our home market. Sanders Medical (radioactive sources) is not mapped.
            </p>
          </div>

          <div className="relative isolate overflow-hidden rounded-3xl bg-night-2 p-6 text-white shadow-[0_40px_80px_-40px_rgb(11_13_17/0.6)] sm:p-7 lg:col-span-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(110%_60%_at_100%_0%,rgb(196_30_58/0.32),transparent_65%)]"
            />
            <p className="text-[13px] font-medium text-crimson-bright">Principals by home country</p>
            <p className="mt-1.5 font-display text-[20px] font-semibold leading-tight tracking-[-0.02em]">
              <span className="tabular">{MAPPED_PARTNERS}</span> manufacturers, {PARTNER_ORIGINS.length} countries
            </p>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
              {HUBS.map((h) => {
                const isActive = active === h.id;
                const count = h.groups.reduce((n, g) => n + g.partners.length, 0);
                return (
                  <li key={h.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(h.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(h.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : h.id)}
                      aria-pressed={isActive}
                      className={`relative w-full border-t py-3 pl-4 text-left transition-colors duration-300 ${
                        isActive ? "border-crimson-bright/60" : "border-white/10"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-4 h-[calc(100%-2rem)] w-0.5 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-crimson-bright" : "bg-white/15"
                        }`}
                      />
                      <span className="flex items-center justify-between gap-3">
                        <span className={`text-[15px] font-semibold ${isActive ? "text-white" : "text-white/90"}`}>
                          {h.label}
                        </span>
                        <span
                          className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[12px] font-semibold tabular transition-colors duration-300 ${
                            isActive ? "bg-crimson text-white" : "bg-white/10 text-white/70"
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                      {h.groups.map((g) => (
                        <span key={g.country} className="mt-0.5 block text-[13px] leading-relaxed text-fog">
                          {h.groups.length > 1 && <span className="text-white/75">{g.country}: </span>}
                          {g.partners.join(", ")}
                        </span>
                      ))}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
