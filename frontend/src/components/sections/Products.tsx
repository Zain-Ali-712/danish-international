"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PARTNER_LOGOS, PRODUCT_LINES, type ProductLine } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Keep in sync with the `pin` custom variant in globals.css.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)";

const CARD_SIZE =
  "w-[84vw] max-w-[400px] shrink-0 snap-start h-[480px] sm:w-[380px] sm:h-[520px] lg:w-[clamp(300px,27vw,400px)] pin:h-full pin:max-h-[600px] pin:snap-none";

/**
 * Framed product card: image in an inset frame, content and brand logos below.
 * On devices with hover, the product list rises over the image in a crimson wash.
 */
function ProductCard({ line, index }: { line: ProductLine; index: number }) {
  const logos = line.brands.map(
    (b) => PARTNER_LOGOS.find((p) => p.name === b) ?? { name: b, src: null, width: 0, height: 0 }
  );
  return (
    <Link
      href="/products"
      aria-label={`${line.category}: ${line.brands.join(", ")}. View in catalog`}
      className={`group relative flex flex-col rounded-[28px] bg-white p-2.5 shadow-soft ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-36px_rgb(14_17_22/0.38)] ${CARD_SIZE}`}
    >
      {/* image frame */}
      <div className="relative isolate min-h-0 flex-1 overflow-hidden rounded-[20px] bg-night text-white">
        <div data-parallax className="absolute -inset-x-[8%] inset-y-0 -z-20">
          <Image
            src={line.image}
            alt={line.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 380px, 84vw"
            quality={75}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/45 via-night/0 to-night/25" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-crimson-deep via-crimson/70 to-crimson/10 opacity-0 transition-opacity duration-700 can-hover:group-hover:opacity-95 can-hover:group-focus-visible:opacity-95"
        />

        <div className="flex items-start justify-between p-4 sm:p-5">
          <span
            aria-hidden="true"
            className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.25px_rgb(255_255_255/0.9)] pin-short:text-[36px]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-white group-hover:text-crimson">
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </span>
        </div>

        <ul className="absolute inset-x-0 bottom-0 hidden gap-2 p-5 can-hover:grid">
          {line.items.map((item, k) => (
            <li
              key={item}
              style={{ transitionDelay: `${80 + k * 50}ms` }}
              className="flex translate-y-3 items-center gap-2.5 text-[14px] font-medium opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              <span aria-hidden="true" className="h-px w-4 shrink-0 bg-white/80" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* content */}
      <div className="px-3.5 pb-3 pt-5 sm:px-4 pin-short:pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-crimson pin-short:text-[21px]">
            {line.category}
          </h3>
          <span className="shrink-0 text-[12.5px] tabular text-ink-3">
            {line.brands.length} {line.brands.length === 1 ? "brand" : "brands"}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-ink-3 pin-short:line-clamp-1">{line.summary}</p>
        <div className="mt-4 flex h-11 items-center gap-5 border-t border-ink/[0.07] pt-4">
          {logos.map((l) =>
            l.src ? (
              <Image
                key={l.name}
                src={l.src}
                alt={l.name}
                width={l.width}
                height={l.height}
                style={{ height: Math.round(Math.min(30, Math.max(19, Math.sqrt(2400 / (l.width / l.height))))), width: "auto" }}
                className="max-w-[118px] object-contain opacity-75 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              <span key={l.name} className="whitespace-nowrap text-[13px] font-semibold text-ink-3">
                {l.name}
              </span>
            )
          )}
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      // Travel = everything past the viewport, measured live so it survives resizes and font loads.
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Images drift slightly inside their frames while the track moves.
      gsap.utils.toArray<HTMLElement>("[data-parallax]", track).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Keep the track native-scroll-free while pinned.
      track.style.overflowX = "visible";
      return () => {
        track.style.overflowX = "";
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      aria-labelledby="products-title"
      className="relative isolate overflow-hidden bg-porcelain pin:flex pin:h-[100dvh] pin:flex-col"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_100%_0%,rgb(196_30_58/0.08),transparent_70%)]"
      />
      <div className="container-x shrink-0 pb-10 pt-24 sm:pt-28 pin:pb-6 pin:pt-[max(6rem,12dvh)] pin-short:pb-5 pin-short:pt-[5.25rem]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="products-title"
            className="t-h2 max-w-[18ch] text-ink lg:col-span-7 lg:max-w-[22ch] pin-short:text-[clamp(1.75rem,1.2rem+1.5vw,2.375rem)]"
          >
            Seven product domains, <span className="text-crimson">one support system</span>
          </h2>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
            <p className="max-w-[44ch] text-[16px] leading-relaxed text-ink-3 pin-short:text-[15px]">
              Lines from leading international manufacturers, supplied, installed and maintained by our team in
              Lahore.
            </p>
            <Link href="/products" className="btn btn-ghost self-start lg:self-auto pin-short:hidden">
              Full catalog
              <span className="btn-icon bg-ink text-white">
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 pb-16 pin:pb-6">
        <div
          ref={trackRef}
          role="region"
          aria-label="Product domains"
          tabIndex={0}
          className="flex h-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] sm:gap-5 sm:px-8 lg:gap-6 lg:px-[max(48px,calc((100vw-1320px)/2+48px))] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCT_LINES.map((line, i) => (
            <ProductCard key={line.id} line={line} index={i} />
          ))}

          <Link
            href="/products"
            className={`group relative isolate flex flex-col justify-between overflow-hidden rounded-[28px] bg-crimson p-7 text-white ${CARD_SIZE} lg:w-[clamp(280px,22vw,340px)]`}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(150deg,#d0233f_0%,#a5172f_55%,#6f0e20_100%)]" />
            <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute -bottom-32 -right-32 -z-10 size-[420px] text-white transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110">
              {[60, 110, 160, 200].map((r, i) => (
                <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.22 - i * 0.04} />
              ))}
            </svg>
            <p className="text-[15px] leading-relaxed text-white/85">14 international manufacturers across seven product domains.</p>
            <div>
              <span className="block font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.03em]">
                Browse the full catalog
              </span>
              <span className="mt-6 grid size-12 place-items-center rounded-full bg-white text-crimson transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                <ArrowUpRight className="size-5" strokeWidth={2} aria-hidden="true" />
              </span>
            </div>
          </Link>
          {/* trailing space so the last card settles inside the page margin */}
          <div aria-hidden="true" className="w-px shrink-0 lg:w-[calc(max(48px,calc((100vw-1320px)/2+48px))-24px)]" />
        </div>

        <div aria-hidden="true" className="container-x mt-5 hidden pin:block">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-crimson" />
          </div>
        </div>
      </div>
    </section>
  );
}
