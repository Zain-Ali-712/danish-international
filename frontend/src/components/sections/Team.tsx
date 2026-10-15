"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { COMPANY_INFO, LEADERSHIP } from "@/lib/data";
import TiltPanel from "@/components/ui/TiltPanel";
import SectionHeading from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** The team as listed on danish-international.com/about-us. */
export default function Team() {
  const reduce = useReducedMotion();

  return (
    <section id="team" aria-labelledby="team-title" className="relative bg-paper py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading
          id="team-title"
          title={
            <>
              The people you will <span className="text-crimson">work with</span>
            </>
          }
        >
          {COMPANY_INFO.expertsStory}
        </SectionHeading>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {LEADERSHIP.map((m, i) => (
            <motion.li
              key={m.name}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            >
              <TiltPanel
                className={`flex flex-col rounded-3xl p-7 sm:p-8 ${
                  i === 0 ? "bg-night-2 text-white" : "bg-white text-ink shadow-soft ring-1 ring-ink/[0.06]"
                }`}
                spotlight={i === 0 ? "rgb(226 50 79 / 0.18)" : "rgb(196 30 58 / 0.07)"}
              >
                {i === 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(100%_70%_at_100%_0%,rgb(196_30_58/0.35),transparent_60%)]"
                  />
                )}
                <div className="relative flex min-h-[260px] flex-col">
                  <span
                    aria-hidden="true"
                    className={`grid size-16 place-items-center rounded-2xl font-display text-[22px] font-semibold tracking-[-0.02em] ${
                      i === 0 ? "bg-crimson text-white" : "bg-crimson-soft text-crimson"
                    }`}
                  >
                    {initials(m.name)}
                  </span>
                  <h3 className="mt-auto pt-10 font-display text-[24px] font-semibold tracking-[-0.025em]">{m.name}</h3>
                  <p className={`mt-1 text-[15px] ${i === 0 ? "text-fog" : "text-ink-3"}`}>{m.role}</p>
                  <div
                    className={`mt-6 flex flex-wrap items-center gap-2 border-t pt-5 ${
                      i === 0 ? "border-white/10" : "border-ink/[0.08]"
                    }`}
                  >
                    <a
                      href={`mailto:${m.email}`}
                      className={`link-underline inline-flex min-w-0 items-center gap-2 text-[14px] ${
                        i === 0 ? "text-white/90" : "text-ink-2"
                      }`}
                    >
                      <Mail className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span className="truncate">{m.email}</span>
                    </a>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} on LinkedIn`}
                        className="ml-auto grid size-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <FaLinkedinIn className="size-[14px]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltPanel>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
