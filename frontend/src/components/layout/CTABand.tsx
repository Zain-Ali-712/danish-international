"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const telHref = `tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`;

export default function CTABand({
  title = "Planning a PET/CT hot lab or a radiotherapy QA upgrade?",
  subtitle = "Tell us what you are building. Our team will help you choose the equipment, plan the project and keep it running.",
  ctaLabel = "Contact us",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}) {
  const reduce = !!useReducedMotion();

  // Soft light that follows the cursor across the panel.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section aria-labelledby="cta-title" className="relative bg-paper py-16 sm:py-24">
      <div className="container-x">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          onPointerMove={onMove}
          className="group/cta relative isolate overflow-hidden rounded-3xl bg-[#240b12] px-6 py-12 text-white shadow-[0_40px_80px_-40px_rgb(60_8_20/0.65)] sm:px-12 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* Deep wine falling to near-black on the copy side, with a crimson glow where the rings centre */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(75%_140%_at_90%_50%,#d42a46_0%,#a3172f_20%,#5c0d1b_48%,#240b12_78%,#160a0e_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100"
            style={{ background: "radial-gradient(420px circle at var(--mx, 70%) var(--my, 50%), rgb(255 255 255 / 0.08), transparent 65%)" }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="absolute right-[-10%] top-1/2 -z-10 size-[720px] -translate-y-1/2 sm:right-[-6%]"
          >
            {[50, 95, 145, 200, 260, 325].map((r, i) => (
              <circle
                key={r}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke={i === 1 ? "#ff8597" : "#ffffff"}
                strokeOpacity={i === 1 ? 0.55 : 0.2 - i * 0.025}
              />
            ))}
            <g className={reduce ? "" : "origin-center animate-[spin_60s_linear_infinite] [transform-box:fill-box]"}>
              <circle cx="300" cy="300" r="172" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeDasharray="2 10" />
              <circle cx="472" cy="300" r="4" fill="#ffffff" />
            </g>
            <circle cx="300" cy="300" r="6" fill="#ffffff" />
            <circle
              cx="300"
              cy="300"
              r="18"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.6"
              className={reduce ? "" : "animate-pulse-ring [transform-box:fill-box] [transform-origin:center]"}
            />
          </svg>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="cta-title" className="t-h2 max-w-[18ch]">
                {title}
              </h2>
              <p className="mt-5 max-w-[48ch] text-[16.5px] leading-relaxed text-white/80">{subtitle}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-light">
                  {ctaLabel}
                  <span className="btn-icon">
                    <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
                <a href={telHref} className="btn btn-outline-light">
                  <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  <span className="tabular">{COMPANY_INFO.contact.phone}</span>
                </a>
              </div>
            </div>

            <dl className="grid gap-5 border-t border-white/20 pt-8 text-[15px] lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="flex gap-3">
                <dt className="sr-only">Email</dt>
                <Mail className="mt-1 size-4 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden="true" />
                <dd>
                  <a href={`mailto:${COMPANY_INFO.contact.email}`} className="link-underline break-all">
                    {COMPANY_INFO.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Office</dt>
                <MapPin className="mt-1 size-4 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden="true" />
                <dd className="leading-relaxed text-white/85">
                  {COMPANY_INFO.contact.address}, {COMPANY_INFO.contact.city}-{COMPANY_INFO.contact.postalCode},{" "}
                  {COMPANY_INFO.contact.country}
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
