import Image from "next/image";
import { PARTNER_LOGOS } from "@/lib/data";

// Only partners with a published logo appear in the rail.
const LOGOS = PARTNER_LOGOS.filter((l): l is typeof l & { src: string } => l.src !== null);

/** Same visual weight for wide wordmarks and square marks: height follows aspect ratio. */
function logoHeight(w: number, h: number) {
  return Math.round(Math.min(46, Math.max(26, Math.sqrt(4400 / (w / h)))));
}

export default function Marquee() {
  return (
    <section aria-label="International principals" className="relative bg-paper">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-y border-ink/[0.08] py-8 md:flex-row md:items-center md:gap-10">
          <p className="max-w-[15rem] shrink-0 text-[14px] leading-snug text-ink-3">
            Working with <span className="font-medium text-crimson">14 international manufacturers</span> across seven
            product domains.
          </p>
          <div className="marquee-pause relative min-w-0 flex-1 overflow-hidden mask-fade-x">
            {/* the paper fill gives mix-blend-multiply a backdrop inside the animated layer, so white logo boxes disappear */}
            <ul className="animate-marquee flex w-max items-center bg-paper">
              {[...LOGOS, ...LOGOS].map((logo, i) => {
                const hidden = i >= LOGOS.length;
                return (
                  <li key={`${logo.name}-${i}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center px-8 sm:px-10">
                    <Image
                      src={logo.src}
                      alt={hidden ? "" : logo.name}
                      width={logo.width}
                      height={logo.height}
                      loading="eager"
                      style={{ height: logoHeight(logo.width, logo.height), width: "auto" }}
                      className="max-w-[170px] object-contain opacity-80 mix-blend-multiply grayscale transition-[filter,opacity,transform] duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
