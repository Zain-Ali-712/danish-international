"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
  type MotionValue,
} from "motion/react";
import { COMPANY_INFO } from "@/lib/data";
import TiltPanel from "@/components/ui/TiltPanel";
import SectionHeading from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const FACTS = [
  { value: 14, suffix: "", title: ["International", "principals"], label: "International principals represented in Pakistan" },
  { value: 7, suffix: "", title: ["Product", "domains"], label: "Product domains, from PET tracers to deep brain stimulation" },
  { value: 6, suffix: "", title: ["Core", "services"], label: "Services, from consultancy and planning to repair" },
];

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "inline text-crimson" : "inline"}>
      {children}{" "}
    </motion.span>
  );
}

/** Statement that brightens word by word on scroll; the first `accentWords` words are set in crimson. */
function ScrollStatement({ text, accentWords = 0 }: { text: string; accentWords?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  if (reduce) {
    return (
      <p ref={ref} className="font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.375rem)] font-medium leading-[1.22] tracking-[-0.025em] text-ink">
        <span className="text-crimson">{text.split(" ").slice(0, accentWords).join(" ")}</span>{" "}
        {text.split(" ").slice(accentWords).join(" ")}
      </p>
    );
  }
  return (
    <p ref={ref} className="font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.375rem)] font-medium leading-[1.22] tracking-[-0.025em] text-ink">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={i < accentWords}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Count({ to, suffix, replay = 0 }: { to: number; suffix: string; replay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView || reduce) {
      el.textContent = `${reduce ? to : 0}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, replay]);
  return (
    <span ref={ref} className="tabular">
      {to}
      {suffix}
    </span>
  );
}

/** Rings radiating from one origin: Pakistan first, then the world. */
function ReachRings() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -right-24 -top-24 size-[440px] text-white sm:-right-16">
      {[40, 80, 120, 160, 200].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.07 + (4 - i) * 0.02} />
      ))}
      <circle cx="200" cy="200" r="5" fill="#e2324f" />
      <circle cx="200" cy="200" r="16" fill="none" stroke="#e2324f" strokeOpacity="0.6" className="animate-pulse-ring [transform-box:fill-box] [transform-origin:center]" />
      {[
        [252, 128],
        [306, 236],
        [148, 302],
        [96, 150],
        [330, 120],
        [70, 260],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="200" y1="200" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 4" />
          <circle cx={x} cy={y} r="2.5" fill="currentColor" fillOpacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

/** Stat card: a crimson hairline sweeps in, the number warms and recounts on hover. */
function FactCard({ fact }: { fact: (typeof FACTS)[number] }) {
  const [replay, setReplay] = useState(0);
  return (
    <div
      onMouseEnter={() => setReplay((n) => n + 1)}
      className="group relative border-t border-ink/10 pt-5 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-crimson transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
      />
      <dt className="sr-only">{fact.label}</dt>
      <dd className="flex items-center gap-4">
        <span className="font-display text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-crimson">
          <Count to={fact.value} suffix={fact.suffix} replay={replay} />
        </span>
        <span aria-hidden="true" className="border-l-2 border-crimson pl-3 text-[15px] font-semibold leading-[1.2] text-ink">
          {fact.title[0]}
          <br />
          {fact.title[1]}
        </span>
      </dd>
      <dd className="mt-3 max-w-[15rem] text-[14px] leading-relaxed text-ink-3 transition-colors duration-500 group-hover:text-ink-2">
        {fact.label}
      </dd>
    </div>
  );
}

/** Full-width banner for the headline number. */
function ExperienceBanner() {
  const reduce = useReducedMotion();
  return (
    <TiltPanel
      className="rounded-3xl text-white shadow-[0_40px_80px_-40px_rgb(142_19_40/0.75)]"
      spotlight="rgb(255 255 255 / 0.14)"
      max={1.5}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_140%_at_100%_50%,#d0233f_0%,#a5172f_40%,#6f0e20_80%,#4a0915_100%)]"
      />
      <svg aria-hidden="true" viewBox="0 0 600 600" className="absolute -right-80 top-1/2 size-[640px] -translate-y-1/2 text-white">
        {[70, 130, 190, 250, 300].map((r, i) => (
          <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeOpacity={0.22 - i * 0.035} />
        ))}
        <g className={reduce ? "" : "origin-center animate-[spin_40s_linear_infinite] [transform-box:fill-box]"}>
          <circle cx="300" cy="300" r="220" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 12" />
        </g>
        <circle cx="300" cy="300" r="6" fill="currentColor" />
      </svg>
      <div className="relative grid items-center gap-4 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-7">
        <p className="font-display text-[clamp(4rem,3.2rem+3.4vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.06em] lg:col-span-3">
          <Count to={25} suffix="+" />
        </p>
        <p className="max-w-[20ch] font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] font-semibold leading-[1.15] tracking-[-0.025em] lg:col-span-4">
          Years in the healthcare &amp; nuclear medicine industry
        </p>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-white/80 lg:col-span-5">
          {COMPANY_INFO.experienceStory} {COMPANY_INFO.expertsStory}
        </p>
      </div>
    </TiltPanel>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-paper py-24 sm:py-28 lg:py-36">
      <div className="container-x">
        <h2 id="about-title" className="sr-only">
          About Danish International
        </h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div {...reveal()} className="lg:col-span-4">
            <div
              ref={imgWrap}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist sm:aspect-[16/10] lg:aspect-[4/5]"
            >
              <motion.div style={reduce ? undefined : { y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="https://images.unsplash.com/photo-1666214276372-24e331683e78?auto=format&fit=crop"
                  alt="Clinician and patient beside a robotic radiotherapy system in a bright treatment room"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  quality={85}
                  className="object-cover object-[50%_45%]"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between gap-14 lg:col-span-8">
            <ScrollStatement text={COMPANY_INFO.aboutStory} accentWords={2} />

            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {FACTS.map((f, i) => (
                <motion.div key={f.label} {...reveal(0.08 * i)} className="last:col-span-2 sm:last:col-span-1">
                  <FactCard fact={f} />
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        <motion.div {...reveal(0.1)} className="mt-14 lg:mt-16">
          <ExperienceBanner />
        </motion.div>

        {/* Vision & Mission */}
        <div className="mt-28 lg:mt-36">
          <motion.div {...reveal()}>
            <SectionHeading
              title={
                <>
                  From Pakistan&apos;s most remote areas <span className="text-crimson">to the world</span>
                </>
              }
            >
              Where Danish International is headed, and what it works towards for the people of Pakistan.
            </SectionHeading>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <motion.article {...reveal(0.05)} className="lg:col-span-7" aria-labelledby="vision-title">
              <TiltPanel className="rounded-3xl bg-night-2 text-white shadow-[0_40px_80px_-40px_rgb(11_13_17/0.7)]" spotlight="rgb(226 50 79 / 0.16)">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(196_30_58/0.22),transparent_55%)]" />
                <ReachRings />
                <div className="relative flex h-full min-h-[440px] flex-col justify-end p-7 sm:p-10 lg:p-12">
                  <h3 id="vision-title" className="text-[15px] font-medium text-crimson-bright">
                    Our vision
                  </h3>
                  <p className="mt-4 max-w-[30ch] font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                    {COMPANY_INFO.vision}
                  </p>
                  <p className="mt-6 max-w-[56ch] text-[15.5px] leading-relaxed text-fog">{COMPANY_INFO.visionMore}</p>
                </div>
              </TiltPanel>
            </motion.article>

            <motion.article {...reveal(0.15)} className="lg:col-span-5" aria-labelledby="mission-title">
              <TiltPanel className="flex flex-col rounded-3xl bg-white shadow-lift" spotlight="rgb(196 30 58 / 0.06)">
                <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1666214276389-393fb7dbc75c?auto=format&fit=crop"
                    alt="Technologist preparing a patient for a scan"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    quality={75}
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-white/0" />
                </div>
                <div className="relative flex flex-1 flex-col p-7 pt-2 sm:p-10 sm:pt-2">
                  <h3 id="mission-title" className="text-[15px] font-medium text-crimson">
                    Our mission
                  </h3>
                  <p className="mt-4 text-[17px] leading-[1.6] text-ink">{COMPANY_INFO.mission}</p>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-3">{COMPANY_INFO.missionMore}</p>
                </div>
              </TiltPanel>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
