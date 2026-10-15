"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaSkype, FaXTwitter } from "react-icons/fa6";
import { COMPANY_INFO } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const C = COMPANY_INFO.contact;
const telHref = `tel:${C.phone.replace(/[^0-9+]/g, "")}`;
const fullAddress = `${C.address}, ${C.city}-${C.postalCode}, ${C.country}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

const SOCIALS = [
  { label: "X (Twitter)", href: COMPANY_INFO.socials.twitter, Icon: FaXTwitter },
  { label: "Facebook", href: COMPANY_INFO.socials.facebook, Icon: FaFacebookF },
  { label: "LinkedIn", href: COMPANY_INFO.socials.linkedin, Icon: FaLinkedinIn },
  { label: "Skype", href: COMPANY_INFO.socials.skype, Icon: FaSkype },
];

/**
 * Contact details as published on danish-international.com, and the same three
 * form fields the original used. There is no mail backend yet, so sending opens
 * the visitor's email app with the message filled in.
 */
export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Enquiry from ${form.name}`;
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-3/70 focus:border-crimson focus:ring-4 focus:ring-crimson/10";

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-paper pb-24 sm:pb-28 lg:pb-32">
      <div className="container-x">
        <h2 id="contact-title" className="sr-only">
          Contact details and enquiry form
        </h2>
        <div className="grid gap-5 lg:grid-cols-12">
          <motion.div
            {...reveal()}
            className="relative isolate overflow-hidden rounded-3xl bg-night-2 p-7 text-white sm:p-10 lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(110%_70%_at_0%_100%,rgb(196_30_58/0.4),transparent_60%)]"
            />
            <p className="text-[14px] font-medium text-crimson-bright">Lahore office</p>
            <dl className="mt-8 grid gap-7">
              <div className="flex gap-4">
                <dt className="sr-only">Address</dt>
                <MapPin className="mt-1 size-5 shrink-0 text-crimson-bright" strokeWidth={1.75} aria-hidden="true" />
                <dd>
                  <address className="not-italic leading-relaxed text-white/90">
                    {C.address}
                    <br />
                    {C.city}-{C.postalCode}, {C.country}
                  </address>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-2 inline-flex items-center gap-1 text-[14px] text-fog hover:text-white"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Phone</dt>
                <Phone className="mt-1 size-5 shrink-0 text-crimson-bright" strokeWidth={1.75} aria-hidden="true" />
                <dd>
                  <a href={telHref} className="link-underline tabular text-[17px] font-medium">
                    {C.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Email</dt>
                <Mail className="mt-1 size-5 shrink-0 text-crimson-bright" strokeWidth={1.75} aria-hidden="true" />
                <dd className="min-w-0">
                  <a href={`mailto:${C.email}`} className="link-underline break-all text-[17px] font-medium">
                    {C.email}
                  </a>
                </dd>
              </div>
            </dl>
            <ul className="mt-10 flex gap-2.5 border-t border-white/10 pt-7">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="size-[15px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            {...reveal(0.1)}
            onSubmit={onSubmit}
            className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/[0.06] sm:p-10 lg:col-span-7"
          >
            <p className="font-display text-[26px] font-semibold tracking-[-0.025em] text-ink">Send us a message</p>
            <p className="mt-2 text-[15px] text-ink-3">
              Sending opens your email app with the message ready to go to {C.email}.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-[14px] font-medium text-ink-2">
                Your name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-[14px] font-medium text-ink-2">
                Your email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-[14px] font-medium text-ink-2 sm:col-span-2">
                Your message
                <textarea
                  required
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${field} resize-y`}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-7">
              Send message
              <span className="btn-icon">
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
