"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/data";

const telHref = `tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`;

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="relative grid size-9 place-items-center rounded-[10px] bg-crimson text-[13px] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_6px_16px_-8px_rgb(196_30_58/0.8)]"
      >
        DI
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-semibold tracking-[-0.02em] ${inverted ? "text-white" : "text-ink"}`}
        >
          Danish International
        </span>
        <span className={`mt-1 text-[11px] tracking-[0.02em] ${inverted ? "text-fog" : "text-ink-3"}`}>
          Nuclear Medicine &amp; Healthcare
        </span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  // Lock page scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 transition-[opacity,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled ? "opacity-100" : "opacity-0"
        } border-b border-ink/[0.06] bg-porcelain/80 shadow-[0_8px_30px_-18px_rgb(14_17_22/0.25)] backdrop-blur-xl backdrop-saturate-150`}
        aria-hidden="true"
      />
      <div
        className={`container-x relative z-[60] flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled ? "h-16" : "h-[76px] lg:h-20"
        }`}
      >
        <Link href="/" aria-label="Danish International home" className="shrink-0 rounded-lg">
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              const lit = hovered ? hovered === link.href : active;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors duration-200 ${
                      active ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-crimson" />
                    )}
                  </Link>
                  {lit && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-ink/[0.05]"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref}
            className="group hidden items-center gap-2 rounded-full px-3 py-2 text-[14px] font-medium text-ink-2 transition-colors hover:text-ink xl:inline-flex"
          >
            <Phone className="size-4 text-crimson" strokeWidth={1.75} aria-hidden="true" />
            <span className="tabular">{COMPANY_INFO.contact.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-dark h-11 text-[14px]">
            Contact us
            <span className="btn-icon">
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-[60] grid size-11 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink backdrop-blur lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-[18px]">
            <span
              className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-porcelain lg:hidden"
          >
            <div className="h-[76px] shrink-0" />
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
              <ul className="flex flex-col">
                {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ink/[0.07]"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="flex items-center justify-between py-4 font-display text-[32px] font-semibold leading-none tracking-[-0.03em] text-ink"
                    >
                      <span className={pathname === link.href ? "text-crimson" : undefined}>{link.label}</span>
                      <ArrowUpRight className="size-6 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10 grid gap-3 text-[15px]"
              >
                <a href={telHref} className="flex items-center gap-3 text-ink-2">
                  <Phone className="size-4 text-crimson" strokeWidth={1.75} aria-hidden="true" />
                  <span className="tabular">{COMPANY_INFO.contact.phone}</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="flex items-center gap-3 text-ink-2">
                  <Mail className="size-4 text-crimson" strokeWidth={1.75} aria-hidden="true" />
                  {COMPANY_INFO.contact.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
