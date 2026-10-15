import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaSkype } from "react-icons/fa6";
import { COMPANY_INFO, NAV_LINKS, PRODUCT_LINES } from "@/lib/data";
import { BrandMark } from "./Navbar";

const telHref = `tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`;

const SOCIALS = [
  { label: "X (Twitter)", href: COMPANY_INFO.socials.twitter, Icon: FaXTwitter },
  { label: "Facebook", href: COMPANY_INFO.socials.facebook, Icon: FaFacebookF },
  { label: "LinkedIn", href: COMPANY_INFO.socials.linkedin, Icon: FaLinkedinIn },
  { label: "Skype", href: COMPANY_INFO.socials.skype, Icon: FaSkype },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_115%,rgb(196_30_58/0.42),rgb(196_30_58/0.08)_55%,transparent_75%),linear-gradient(180deg,#0b0d11_0%,#101318_100%)]"
      />

      <div className="container-x pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandMark inverted />
            <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-fog">{COMPANY_INFO.tagline}.</p>
            <ul className="mt-7 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-white/12 text-white/75 transition-colors duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="size-[15px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-[13px] font-medium text-white/50">Company</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-white/85 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[13px] font-medium text-white/50">Products</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {PRODUCT_LINES.map((p) => (
                  <li key={p.id}>
                    <Link href="/products" className="link-underline text-white/85 hover:text-white">
                      {p.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[13px] font-medium text-white/50">Lahore office</h2>
              <address className="mt-5 space-y-3 text-[15px] not-italic leading-relaxed text-white/85">
                <p>
                  {COMPANY_INFO.contact.address}
                  <br />
                  {COMPANY_INFO.contact.city}-{COMPANY_INFO.contact.postalCode}, {COMPANY_INFO.contact.country}
                </p>
                <p>
                  <a href={telHref} className="link-underline tabular hover:text-white">
                    {COMPANY_INFO.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${COMPANY_INFO.contact.email}`} className="link-underline break-all hover:text-white">
                    {COMPANY_INFO.contact.email}
                  </a>
                </p>
              </address>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-6 text-[13.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <a href="#main" className="link-underline self-start hover:text-white sm:self-auto">
            Back to top
          </a>
        </div>
      </div>

      {/*
        Oversized wordmark: SVG textLength makes it span the full width at every size.
        The wrapper shows roughly the top half of the letters; the rest runs below the page edge.
      */}
      <div aria-hidden="true" className="relative mt-2 aspect-[1000/58] w-full select-none overflow-hidden">
        <svg viewBox="0 0 1000 116" className="absolute inset-x-0 top-0 block w-full" preserveAspectRatio="xMidYMin meet">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="81"
            textAnchor="middle"
            textLength="952"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-wordmark)"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 104, letterSpacing: "-0.02em" }}
          >
            Danish International
          </text>
        </svg>
      </div>
    </footer>
  );
}
