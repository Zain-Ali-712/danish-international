"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICE_LINES, CONSULTING_TRAITS, COMPANY_INFO } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Desktop: the list and image stage pin together while each service gets its own stretch of scroll.
  // The stage holds still; the list drifts up only if it is taller than the screen.
  useEffect(() => {
    const grid = gridRef.current;
    const list = listRef.current;
    if (!grid || !list) return;
    const steps = SERVICE_LINES.length;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)", () => {
      const top = () => Math.max(96, (window.innerHeight - grid.offsetHeight) / 2);
      const overflow = () => Math.max(0, list.offsetHeight - (window.innerHeight - top() - 32));
      const st = ScrollTrigger.create({
        trigger: grid,
        start: () => `top ${top()}px`,
        end: () => `+=${steps * window.innerHeight * 0.4}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(steps - 1, Math.floor(self.progress * steps));
          setActive((prev) => (prev === i ? prev : i));
          gsap.set(list, { y: -self.progress * overflow() });
        },
      });
      triggerRef.current = st;
      return () => {
        triggerRef.current = null;
        gsap.set(list, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  // When pinned, choosing a service scrolls to its stretch; otherwise it simply opens.
  const choose = (i: number) => {
    const st = triggerRef.current;
    if (!st) return setActive(i);
    const y = st.start + ((i + 0.5) / SERVICE_LINES.length) * (st.end - st.start);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = SERVICE_LINES[active];

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate overflow-clip bg-night text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(60%_60%_at_15%_0%,rgb(196_30_58/0.18),transparent_70%)]" />

      <div className="container-x py-24 sm:py-28 lg:py-36">
        <SectionHeading
          id="services-title"
          tone="dark"
          title={
            <>
              Support for the whole life of <span className="text-crimson-bright">every system</span>
            </>
          }
        >
          {COMPANY_INFO.expertsStory} From consultancy and project planning to installation, maintenance and repair.
        </SectionHeading>

        <div ref={gridRef} className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Image stage (desktop); held in place by the pin above */}
          <div className="hidden lg:col-span-6 lg:block">
            <div>
              <div className="relative aspect-[4/5] max-h-[min(68dvh,620px,calc(100dvh-8rem))] w-full overflow-hidden rounded-3xl bg-night-3">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={current.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={current.imageAlt}
                      fill
                      sizes="45vw"
                      quality={75}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 top-0 flex items-center gap-4 p-6">
                  <span className="rounded-full bg-night/50 px-3 py-1 text-[12.5px] font-medium tabular text-white ring-1 ring-white/15 backdrop-blur-md">
                    {String(active + 1).padStart(2, "0")} / {String(SERVICE_LINES.length).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="flex flex-1 gap-1.5">
                    {SERVICE_LINES.map((s, i) => (
                      <span
                        key={s.id}
                        className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-crimson-bright" : "bg-white/25"}`}
                      />
                    ))}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={current.id}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="font-display text-[28px] font-semibold tracking-[-0.025em]"
                    >
                      {current.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Service list */}
          <ol ref={listRef} className="lg:col-span-6">
            {SERVICE_LINES.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.id}
                  className="border-t border-white/10 last:border-b lg:py-3"
                >
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    aria-expanded={isActive}
                    aria-controls={`service-${s.id}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left lg:py-4"
                  >
                    <span
                      className={`font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/35 hover:text-white/70"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        isActive ? "rotate-45 border-crimson bg-crimson text-white" : "border-white/15 text-white/50"
                      }`}
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2} />
                    </span>
                  </button>

                  <div
                    id={`service-${s.id}`}
                    className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[46ch] pb-7 text-[16px] leading-relaxed text-fog lg:pb-2">{s.summary}</p>
                      <div className="relative mb-7 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                        <Image src={s.image} alt={s.imageAlt} fill sizes="90vw" quality={70} className="object-cover" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 grid gap-8 border-t border-white/10 pt-10 lg:mt-28 lg:grid-cols-12">
          <p className="text-[15px] leading-relaxed text-fog lg:col-span-4">
            What every engagement with our consultants is built on.
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 lg:col-span-6 lg:grid-cols-4">
            {CONSULTING_TRAITS.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] font-medium text-white">
                <Check className="mt-1 size-4 shrink-0 text-crimson-bright" strokeWidth={2.25} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-2 lg:text-right">
            <Link href="/services" className="link-underline inline-flex items-center gap-1.5 text-[15px] font-medium text-white">
              All services
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
