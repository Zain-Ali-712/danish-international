"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail, Move3d, Search, X } from "lucide-react";
import { CATALOG, type CatalogDomain, type CatalogProduct } from "@/lib/catalog";
import { BRANDS, COMPANY_INFO, PARTNER_LOGOS, PRODUCT_LINES } from "@/lib/data";
import ProductArt from "./ProductArt";

const CategoryModel = dynamic(() => import("./CategoryModel"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const subId = (d: string, sub: string) => `${d}--${slug(sub)}`;
const num = (i: number) => String(i + 1).padStart(2, "0");

function logoFor(brand: string) {
  return PARTNER_LOGOS.find((l) => l.name === brand);
}
function brandUrl(brand: string) {
  return BRANDS.find((b) => b.name === brand || b.name.startsWith(brand))?.url;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -104, duration: 1.1 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 104, behavior: "smooth" });
}

function setLenis(running: boolean) {
  const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
  if (running) lenis?.start();
  else lenis?.stop();
}

/** Brand credit: the partner's published logo, or its name when the original site shows none. */
function BrandMark({ brand, height = 20, muted = true }: { brand: string; height?: number; muted?: boolean }) {
  const l = logoFor(brand);
  if (!l?.src) return <span className="whitespace-nowrap text-[13px] font-semibold text-ink-2">{brand}</span>;
  const h = Math.round(Math.min(height * 1.5, Math.max(height * 0.75, Math.sqrt((height * height * 6) / (l.width / l.height)))));
  return (
    <Image
      src={l.src}
      alt={brand}
      width={l.width}
      height={l.height}
      style={{ height: h, width: "auto" }}
      className={`max-w-[120px] object-contain transition-[filter,opacity] duration-500 ${
        muted ? "opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0" : ""
      }`}
    />
  );
}

/** Faint contour rings behind product art, echoing the homepage. */
function Rings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-200 -200 400 400" aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      {[60, 100, 140, 185].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke={i === 1 ? "rgb(196 30 58 / 0.22)" : "rgb(14 17 22 / 0.07)"} strokeDasharray={i === 2 ? "2 6" : undefined} />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- product card */

function ProductCard({ product, onOpen }: { product: CatalogProduct; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full flex-col rounded-[28px] bg-white p-2.5 text-left shadow-soft ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-36px_rgb(14_17_22/0.38)]"
    >
      <span className="relative isolate block aspect-[4/3] overflow-hidden rounded-[20px] bg-[radial-gradient(120%_100%_at_50%_30%,#ffffff_0%,#eef0f3_55%,#dfe3e8_100%)]">
        <Rings className="left-1/2 top-1/2 -z-10 size-[130%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
        <ProductArt
          kind={product.art}
          tag={product.tag}
          className="absolute inset-0 m-auto w-[88%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.05]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/80 px-2.5 py-1 text-[12px] font-medium text-ink-2 ring-1 ring-ink/[0.06] backdrop-blur-md">
          {product.sub}
        </span>
        <span className="absolute right-3.5 top-3.5 grid size-9 place-items-center rounded-full bg-white/80 text-ink ring-1 ring-ink/[0.06] backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-crimson group-hover:text-white group-hover:ring-crimson">
          <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </span>
      </span>
      <span className="flex flex-1 flex-col px-3.5 pb-3 pt-5">
        <span className="font-display text-[19px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-crimson">
          {product.name}
        </span>
        <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-3">{product.summary}</span>
        <span className="mt-3 grid gap-1">
          {product.points.slice(0, 2).map((p) => (
            <span key={p} className="flex items-center gap-2 text-[13px] text-ink-2">
              <span aria-hidden="true" className="h-px w-3 shrink-0 bg-crimson" />
              {p}
            </span>
          ))}
        </span>
        <span className="mt-auto block pt-5">
          <span className="flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-4">
            <span className="text-[12px] text-ink-3">Partner</span>
            <BrandMark brand={product.brand} />
          </span>
        </span>
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------- detail dialog */

function ProductDialog({
  product,
  domain,
  onClose,
  onStep,
}: {
  product: CatalogProduct | null;
  domain: CatalogDomain | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (product && !d.open) {
      d.showModal();
      setLenis(false);
    }
    if (!product) {
      if (d.open) d.close();
      setLenis(true);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onStep]);

  const index = product && domain ? domain.products.findIndex((p) => p.id === product.id) : -1;
  const url = product ? brandUrl(product.brand) : undefined;
  const enquiry = product
    ? `mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(`Enquiry: ${product.name} (${product.brand})`)}`
    : "#";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="product-dialog-title"
      className="m-auto max-h-[min(92dvh,760px)] w-[min(1080px,calc(100vw-2rem))] overflow-hidden rounded-[28px] bg-white p-0 text-ink shadow-[0_60px_120px_-40px_rgb(11_13_17/0.6)] backdrop:bg-night/55 backdrop:backdrop-blur-sm"
    >
      {product && domain && (
        <motion.div
          key={product.id}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          data-lenis-prevent
          className="grid max-h-[min(92dvh,760px)] overflow-y-auto md:grid-cols-2"
        >
          <div className="relative isolate min-h-[260px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_30%,#ffffff_0%,#eceef1_55%,#d6dae2_100%)] md:min-h-[520px]">
            <Rings className="left-1/2 top-1/2 -z-10 size-[120%] -translate-x-1/2 -translate-y-1/2" />
            <ProductArt kind={product.art} tag={product.tag} className="absolute inset-0 m-auto w-[86%]" />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[12.5px] font-medium tabular text-ink-2 ring-1 ring-ink/[0.06] backdrop-blur-md">
              {num(index)} / {num(domain.products.length - 1)} in {domain.name}
            </span>
          </div>

          <div className="flex flex-col p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[13.5px] font-medium text-crimson">
                {domain.name} <span className="text-ink-3">/</span> {product.sub}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 -mt-2 grid size-10 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper hover:text-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <h2 id="product-dialog-title" className="mt-3 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.375rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              {product.name}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{product.summary}</p>

            <ul className="mt-6 grid gap-2.5">
              {product.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-crimson-soft text-crimson">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-4 rounded-2xl bg-paper px-5 py-4">
              <BrandMark brand={product.brand} height={24} muted={false} />
              <p className="text-[13.5px] leading-snug text-ink-3">
                By <span className="font-medium text-ink">{product.brand}</span>, supplied in Pakistan by Danish International.
              </p>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-ink-3">
              Shown from the manufacturer&apos;s range. Availability, configurations and specifications on request.
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <a href={enquiry} className="btn btn-primary">
                Enquire
                <span className="btn-icon">
                  <Mail className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
              </a>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Manufacturer page
                  <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
                </a>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous product"
                  className="grid size-11 place-items-center rounded-full ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next product"
                  className="grid size-11 place-items-center rounded-full ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </dialog>
  );
}

/* ---------------------------------------------------------------- domain section */

function DomainSection({
  domain,
  index,
  products,
  onOpen,
}: {
  domain: CatalogDomain;
  index: number;
  products: CatalogProduct[];
  onOpen: (p: CatalogProduct) => void;
}) {
  const reduce = useReducedMotion();
  const line = PRODUCT_LINES.find((l) => l.id === domain.id);
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.9, ease: EASE },
      };

  return (
    <section id={domain.id} aria-labelledby={`${domain.id}-title`} data-domain className="scroll-mt-28 border-t border-ink/[0.08] py-16 first:border-t-0 first:pt-2 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="font-display text-[56px] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-crimson)]"
            >
              {num(index)}
            </span>
            <span className="text-[13.5px] font-medium text-ink-3">{domain.brands.join(" · ")}</span>
          </p>
          <h2 id={`${domain.id}-title`} className="t-h2 mt-4 text-ink">
            {domain.name}
            <span className="text-crimson">.</span>
          </h2>
        </div>
        <p className="max-w-[44ch] text-[16px] leading-relaxed text-ink-3 lg:col-span-5 lg:justify-self-end lg:text-right">{domain.summary}</p>
      </div>

      {/* visual band */}
      <motion.div {...reveal} className="mt-10 grid gap-4 md:grid-cols-12">
        <div className="relative isolate h-[340px] overflow-hidden rounded-3xl bg-[radial-gradient(110%_100%_at_50%_35%,#ffffff_0%,#e9ecf0_50%,#d3d8df_100%)] sm:h-[400px] md:col-span-7 lg:h-[460px]">
          <div aria-hidden="true" className="absolute inset-x-[-20%] bottom-0 -z-10 h-[70%] origin-bottom [mask-image:linear-gradient(to_top,#000,transparent_85%)] [transform:perspective(600px)_rotateX(62deg)]">
            <div className="size-full bg-[linear-gradient(rgb(14_17_22/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(14_17_22/0.09)_1px,transparent_1px)] bg-[size:56px_56px]" />
          </div>
          <Rings className="left-1/2 top-[46%] -z-10 size-[105%] -translate-x-1/2 -translate-y-1/2" />
          <CategoryModel kind={domain.model} className="absolute inset-0" />
          <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[12.5px] font-medium text-ink-2 ring-1 ring-ink/[0.06] backdrop-blur-md">
            <Move3d className="size-3.5 text-crimson" aria-hidden="true" />
            <span className="hidden [@media(pointer:fine)]:inline">Drag to rotate</span>
            <span className="[@media(pointer:fine)]:hidden">Interactive 3D</span>
          </span>
          <p className="pointer-events-none absolute bottom-4 left-4 text-[13px] font-medium text-ink-2">{domain.modelLabel}</p>
        </div>

        <div className="grid gap-4 md:col-span-5 md:grid-rows-[1fr_auto]">
          {line && (
            <div className="relative isolate min-h-[220px] overflow-hidden rounded-3xl bg-night text-white">
              <Image src={line.image} alt={line.imageAlt} fill sizes="(min-width: 768px) 36vw, 100vw" quality={75} className="-z-20 object-cover" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/45 to-night/0" />
              <p className="absolute inset-x-0 bottom-0 p-6 font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                {domain.lead}
              </p>
            </div>
          )}
          <div className="relative isolate overflow-hidden rounded-3xl bg-night-2 p-5 text-white sm:p-6">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(100%_80%_at_100%_0%,rgb(196_30_58/0.3),transparent_60%)]" />
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-medium text-crimson-bright">Principals</p>
              <p className="text-[13px] tabular text-fog">
                {domain.products.length} products · {domain.subs.length} groups
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {domain.brands.map((b) => (
                <li key={b} className="grid h-11 place-items-center rounded-xl bg-white px-4">
                  <BrandMark brand={b} height={18} muted={false} />
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-4">
              {domain.subs.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => scrollToId(subId(domain.id, s))}
                    className="inline-flex items-center gap-1.5 text-[13.5px] text-white/85 transition-colors hover:text-white"
                  >
                    <span aria-hidden="true" className="h-px w-3 bg-crimson-bright" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* products by group */}
      {domain.subs.map((s) => {
        const items = products.filter((p) => p.sub === s);
        if (!items.length) return null;
        return (
          <div key={s} id={subId(domain.id, s)} className="mt-14 scroll-mt-28">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{s}</h3>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-crimson-soft px-2 text-[12px] font-semibold tabular text-crimson">
                {items.length}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-ink/[0.08]" />
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p, k) => (
                <motion.li
                  key={p.id}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: (k % 3) * 0.08, ease: EASE }}
                >
                  <ProductCard product={p} onOpen={() => onOpen(p)} />
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

/* ---------------------------------------------------------------- explorer */

export default function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(CATALOG[0].id);
  const [open, setOpen] = useState<{ product: CatalogProduct; domain: CatalogDomain } | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      CATALOG.map((d) => ({
        domain: d,
        products: q
          ? d.products.filter((p) =>
              [p.name, p.brand, p.sub, p.summary, d.name, ...p.points].some((t) => t.toLowerCase().includes(q))
            )
          : d.products,
      })),
    [q]
  );
  const total = filtered.reduce((n, f) => n + f.products.length, 0);
  const all = CATALOG.reduce((n, d) => n + d.products.length, 0);

  // Scroll-spy: the last domain whose top has passed 40% of the viewport is active.
  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      document.querySelectorAll<HTMLElement>("[data-domain]").forEach((s) => {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      });
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    pick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [q]);

  // Keep the active chip visible in the mobile domain bar.
  const chipBar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = chipBar.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!bar || !chip || bar.offsetParent === null) return;
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const onStep = useCallback(
    (dir: 1 | -1) => {
      setOpen((cur) => {
        if (!cur) return cur;
        const list = cur.domain.products;
        const i = list.findIndex((p) => p.id === cur.product.id);
        return { ...cur, product: list[(i + dir + list.length) % list.length] };
      });
    },
    []
  );

  const activeDomain = CATALOG.find((d) => d.id === active);

  return (
    <div className="relative bg-paper">
      {/* domain index */}
      <section aria-label="Product domains" className="container-x pb-10">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CATALOG.map((d, i) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => scrollToId(d.id)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-4 text-left ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex items-center justify-between">
                  <span className="font-display text-[13px] font-semibold tabular text-crimson">{num(i)}</span>
                  <span className="text-[12px] tabular text-ink-3">{d.products.length}</span>
                </span>
                <span className="relative my-2 block aspect-[4/3]">
                  <ProductArt
                    kind={d.products[0].art}
                    tag={d.products[0].tag}
                    className="absolute inset-0 size-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                </span>
                <span className="mt-auto text-[14px] font-semibold leading-tight text-ink transition-colors group-hover:text-crimson">{d.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* mobile domain bar */}
      <div className="sticky top-[72px] z-30 border-y border-ink/[0.06] bg-paper/90 backdrop-blur-xl lg:hidden">
        <div ref={chipBar} className="container-x relative flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATALOG.map((d, i) => (
            <button
              key={d.id}
              data-chip={d.id}
              type="button"
              onClick={() => scrollToId(d.id)}
              aria-current={active === d.id ? "true" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                active === d.id ? "bg-crimson text-white" : "bg-white text-ink-2 ring-1 ring-ink/[0.08]"
              }`}
            >
              <span className="tabular opacity-70">{num(i)}</span>
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-6">
        {/* navigator */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or brands"
                className="w-full rounded-full border border-ink/10 bg-white py-3 pl-11 pr-10 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-3/70 focus:border-crimson focus:ring-4 focus:ring-crimson/10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-paper hover:text-ink"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </label>
            <p className="mt-3 px-1 text-[13px] text-ink-3" aria-live="polite">
              {q ? (
                <>
                  <span className="font-medium text-ink">{total}</span> of {all} products match
                </>
              ) : (
                <>
                  {all} products across {CATALOG.length} domains
                </>
              )}
            </p>

            <nav aria-label="Product domains" className="mt-6 hidden lg:block">
              <ol className="relative border-l border-ink/[0.08]">
                {filtered.map(({ domain: d, products }, i) => {
                  const isActive = active === d.id;
                  const empty = products.length === 0;
                  return (
                    <li key={d.id} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-px top-0 h-full w-0.5 origin-top bg-crimson transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <button
                        type="button"
                        disabled={empty}
                        onClick={() => scrollToId(d.id)}
                        aria-current={isActive ? "true" : undefined}
                        className="flex w-full items-baseline gap-3 py-2.5 pl-5 text-left disabled:opacity-35"
                      >
                        <span className={`font-display text-[13px] font-semibold tabular ${isActive ? "text-crimson" : "text-ink-3"}`}>
                          {num(i)}
                        </span>
                        <span className={`flex-1 text-[15px] font-medium transition-colors ${isActive ? "text-ink" : "text-ink-2 hover:text-ink"}`}>
                          {d.name}
                        </span>
                        <span className="text-[12px] tabular text-ink-3">{products.length}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive && !empty && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden pb-2 pl-[3.25rem]"
                          >
                            {d.subs
                              .filter((s) => products.some((p) => p.sub === s))
                              .map((s) => (
                                <li key={s}>
                                  <button
                                    type="button"
                                    onClick={() => scrollToId(subId(d.id, s))}
                                    className="block py-1 text-left text-[13.5px] text-ink-3 transition-colors hover:text-crimson"
                                  >
                                    {s}
                                  </button>
                                </li>
                              ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {activeDomain && (
              <div className="mt-8 hidden rounded-2xl bg-white p-5 ring-1 ring-ink/[0.06] lg:block">
                <p className="text-[13px] text-ink-3">Need a specification or quotation?</p>
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(`Enquiry: ${activeDomain.name}`)}`}
                  className="link-underline mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium text-crimson"
                >
                  Ask about {activeDomain.name}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </aside>

        {/* domains */}
        <div className="min-w-0 lg:col-span-9">
          {total === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-ink/[0.06]">
              <p className="font-display text-[22px] font-semibold text-ink">Nothing matches &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-[15px] text-ink-3">
                Try another term, or email{" "}
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="link-underline text-crimson">
                  {COMPANY_INFO.contact.email}
                </a>
                .
              </p>
              <button type="button" onClick={() => setQuery("")} className="btn btn-ghost mt-6">
                Show all products
              </button>
            </div>
          ) : (
            filtered.map(({ domain, products }, i) =>
              products.length ? (
                <DomainSection key={domain.id} domain={domain} index={i} products={products} onOpen={(p) => setOpen({ product: p, domain })} />
              ) : null
            )
          )}
        </div>
      </div>

      <ProductDialog product={open?.product ?? null} domain={open?.domain ?? null} onClose={() => setOpen(null)} onStep={onStep} />
    </div>
  );
}
