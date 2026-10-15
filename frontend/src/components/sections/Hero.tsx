"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const HeroThreeModel = dynamic(() => import("./HeroThreeModel"), { ssr: false });
const HeroDepthField = dynamic(() => import("./HeroDepthField"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/** Concentric contours, the visual language of dose planning, standing upright behind the model. */
function Isodose({ reduce }: { reduce: boolean }) {
  const rings = [90, 150, 215, 285, 360, 440];
  return (
    <svg
      viewBox="-600 -600 1200 1200"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {rings.map((r, i) => (
        <motion.ellipse
          key={r}
          cx={0}
          cy={0}
          rx={r * 1.08}
          ry={r * 0.94}
          transform={`rotate(${-14 + i * 3})`}
          fill="none"
          stroke={i === 1 ? "rgb(196 30 58 / 0.3)" : "rgb(14 17 22 / 0.09)"}
          strokeWidth={i === 1 ? 1.25 : 1}
          strokeDasharray={i % 3 === 2 ? "2 7" : undefined}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.2 + i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/** A tilted orbital plane under the model; perspective turns circles into a receding disc. */
function OrbitalPlane({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[56%] aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 [perspective:1400px]"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, rotateX: 50 }}
        animate={{ opacity: 1, rotateX: 72 }}
        transition={{ duration: 2, delay: 0.3, ease: EASE }}
        className="size-full"
      >
        <svg viewBox="-500 -500 1000 1000" className={`size-full ${reduce ? "" : "animate-[spin_120s_linear_infinite]"}`}>
          <defs>
            <radialGradient id="orbit-floor">
              <stop offset="0%" stopColor="rgb(196 30 58 / 0.16)" />
              <stop offset="45%" stopColor="rgb(14 17 22 / 0.06)" />
              <stop offset="100%" stopColor="rgb(14 17 22 / 0)" />
            </radialGradient>
          </defs>
          <circle r="490" fill="url(#orbit-floor)" />
          {[120, 190, 265, 345, 430].map((r, i) => (
            <circle
              key={r}
              r={r}
              fill="none"
              stroke={i === 2 ? "rgb(196 30 58 / 0.45)" : "rgb(14 17 22 / 0.16)"}
              strokeWidth={i === 2 ? 2 : 1.4}
              strokeDasharray={i % 2 ? "3 10" : undefined}
            />
          ))}
          {/* bodies travelling on the orbits */}
          <circle cx="265" cy="0" r="7" fill="#c41e3a" />
          <circle cx="-120" cy="-10" r="5" fill="#1b1f27" />
          <circle cx="0" cy="430" r="5" fill="#1b1f27" />
          <circle cx="-244" cy="244" r="4" fill="#c41e3a" fillOpacity="0.7" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-paper lg:min-h-[100dvh]">
      {/*
        Depth: a cool vignette that darkens toward the edges, a lit pocket where the model floats,
        three parallax particle layers and a soft fade into the next section.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(130%_95%_at_72%_42%,#fafbfc_0%,#e6e9ee_34%,#d0d5dd_64%,#b9c0ca_100%)]" />
        {/* receding floor plane: perspective grid that fades toward a hazy horizon */}
        <div className="absolute inset-x-[-40%] bottom-0 h-[110%] origin-bottom [transform:perspective(900px)_rotateX(60deg)] [mask-image:linear-gradient(to_top,#000_0%,rgb(0_0_0/0.55)_45%,transparent_92%)]">
          <div className="size-full bg-[linear-gradient(rgb(14_17_22/0.13)_1px,transparent_1px),linear-gradient(90deg,rgb(14_17_22/0.13)_1px,transparent_1px)] bg-[size:72px_72px] bg-[position:center_bottom]" />
        </div>
        <div className="absolute inset-x-0 top-[44%] h-40 -translate-y-1/2 bg-[radial-gradient(60%_50%_at_60%_50%,rgb(255_255_255/0.7),transparent_70%)] blur-xl" />
        <div className="absolute -left-[12%] top-[8%] h-[70%] w-[58%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)]" />
        <div className="absolute bottom-[-6%] right-[-20%] h-[62%] w-[140%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.9),rgb(196_30_58/0.10)_55%,transparent_80%)] lg:bottom-auto lg:right-[-4%] lg:top-[-4%] lg:h-full lg:w-[70%]" />
        <HeroDepthField className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#c4cad3]/60 to-transparent" />
        {/* corner vignette pushes the edges back */}
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_62%_45%,transparent_52%,rgb(14_17_22/0.13)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="container-x relative grid items-center pt-28 sm:pt-32 lg:min-h-[100dvh] lg:grid-cols-12 lg:pb-16 lg:pt-24">
        <div className="relative z-10 lg:col-span-6">
          <motion.h1
            id="hero-title"
            {...rise(0.05)}
            className="max-w-[18ch] font-display text-[clamp(2.25rem,1.45rem+2.9vw,3.875rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink"
          >
            Global <span className="text-crimson">Nuclear Medicine</span> Services &amp; Healthcare Solutions
          </motion.h1>

          <motion.p {...rise(0.18)} className="t-lead mt-6 max-w-[34rem] text-ink-2">
            Nuclear medicine, PET/CT hot lab, radiotherapy QA and dosimetry systems for Pakistan&apos;s healthcare
            facilities, backed by 25+ years of experience.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/products" className="btn btn-primary">
              Explore products
              <span className="btn-icon">
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Our services
            </Link>
          </motion.div>
        </div>

        {/* Model: in-flow on small screens, a raised right-side stage on desktop */}
        <div className="relative -mx-5 mt-2 h-[min(100vw,470px)] sm:-mx-8 sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-[-3%] lg:mx-0 lg:mt-0 lg:h-auto lg:w-[60%] xl:w-[58%]">
          <div className="absolute inset-0 lg:bottom-[5%] lg:top-[3%]">
            <OrbitalPlane reduce={reduce} />
            <Isodose reduce={reduce} />
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.25 }}
              className="absolute inset-0"
            >
              <HeroThreeModel className="absolute inset-0" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
