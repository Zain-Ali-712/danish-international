"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Words set in crimson after the title. */
  highlight?: string;
  subtitle: string;
}

/** Interior page header in the homepage language: porcelain depth, contour rings, crimson accent. */
export default function PageHero({ eyebrow, title, highlight, subtitle }: PageHeroProps) {
  const reduce = !!useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="relative isolate overflow-hidden bg-paper pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#fafbfc_0%,#e9ecf0_45%,#d6dae2_100%)]" />
        <div className="absolute right-[-10%] top-[-30%] h-[130%] w-[60%] bg-[radial-gradient(closest-side,rgb(196_30_58/0.10),transparent)]" />
        <svg viewBox="-500 -500 1000 1000" className="absolute -right-40 top-1/2 size-[760px] -translate-y-1/2 sm:-right-24">
          {[110, 170, 235, 305, 380, 460].map((r, i) => (
            <motion.ellipse
              key={r}
              rx={r * 1.06}
              ry={r * 0.94}
              transform={`rotate(${-12 + i * 3})`}
              fill="none"
              stroke={i === 1 ? "rgb(196 30 58 / 0.32)" : "rgb(14 17 22 / 0.08)"}
              strokeDasharray={i % 3 === 2 ? "2 7" : undefined}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.1 + i * 0.1, ease: EASE }}
            />
          ))}
          <circle r="5" fill="#c41e3a" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="container-x">
        <motion.div {...rise(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Home
          </Link>
        </motion.div>
        <motion.p {...rise(0.05)} className="mt-8 text-[14px] font-medium text-crimson">
          {eyebrow}
        </motion.p>
        <motion.h1
          {...rise(0.1)}
          className="mt-3 max-w-[20ch] font-display text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink"
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-crimson">{highlight}</span>
            </>
          )}
        </motion.h1>
        <motion.p {...rise(0.18)} className="t-lead mt-6 max-w-[40rem] text-ink-2">
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
