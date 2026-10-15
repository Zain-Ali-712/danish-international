"use client";

import { motion } from "framer-motion";
import { Award, Globe, Workflow, MapPin, UserCheck, CheckCircle2, TrendingUp, Shield } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Award,
  Globe,
  Workflow,
  MapPin,
  UserCheck,
  CheckCircle2,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C41E3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B1022]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mx-auto backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EF4444]" />
            <span className="text-xs font-semibold text-zinc-300">Why Danish International</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Preferred Partner for <span className="text-[#EF4444]">Medical Physics</span>
          </h2>

          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Decades of trust, authentic OEM partnerships, and end-to-end technical support across Pakistan.
          </p>
        </motion.div>

        {/* Unconventional Bento Layout with Scroll Effects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Award;

            // Unconventional layout pattern: alternating sizes
            const layoutClass =
              idx === 0 ? "md:col-span-7 md:row-span-2" : // Hero card
              idx === 1 ? "md:col-span-5" : // Top-right
              idx === 2 ? "md:col-span-5" : // Bottom-right
              idx === 3 ? "md:col-span-7" : // Bottom-left wide
              idx === 4 ? "md:col-span-6" : // Next row left
              "md:col-span-6"; // Next row right

            const isHero = idx === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`${layoutClass} relative p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between group overflow-hidden ${
                  isHero
                    ? "bg-gradient-to-br from-[#C41E3A]/20 via-white/[0.03] to-transparent border-[#C41E3A]/30"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                }`}
              >
                {/* Floating gradient orb on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C41E3A]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon + Stat Header */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 ${
                        isHero
                          ? "w-16 h-16 bg-[#C41E3A] shadow-lg shadow-[#C41E3A]/30"
                          : "w-14 h-14 bg-white/5 border border-white/10 group-hover:bg-[#C41E3A]/20 group-hover:border-[#C41E3A]/30"
                      }`}
                    >
                      <Icon className={`${isHero ? "w-8 h-8 text-white" : "w-7 h-7 text-[#EF4444]"}`} />
                    </motion.div>

                    <div className="text-right">
                      <div className={`font-bold font-mono tracking-tight ${isHero ? "text-4xl text-white" : "text-3xl text-zinc-200"}`}>
                        {item.stat}
                      </div>
                      <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-1">
                        {item.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title + Description */}
                  <h3 className={`font-bold text-white leading-tight mb-3 ${isHero ? "text-2xl" : "text-xl"}`}>
                    {item.title}
                  </h3>

                  <p className={`text-zinc-400 leading-relaxed ${isHero ? "text-base" : "text-sm"}`}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom Badge */}
                <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center gap-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-xs font-medium text-zinc-300">Verified Standard</span>
                  </div>
                  {isHero && (
                    <div className="ml-auto">
                      <div className="px-3 py-1 rounded-full bg-[#C41E3A]/20 border border-[#C41E3A]/40 text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                        Industry Leader
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#EF4444]" />
              <p className="text-sm text-zinc-300">
                <span className="font-bold text-white">98% client retention rate</span> — Trusted by Pakistan's leading healthcare institutions
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C41E3A]/10 border border-[#C41E3A]/30">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Proven Excellence</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
