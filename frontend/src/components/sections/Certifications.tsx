"use client";

import { motion } from "framer-motion";
import { Shield, Award, BadgeCheck, Ruler, Lock, CheckCircle2 } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/data";

const certIcons = [Shield, Award, BadgeCheck, Ruler];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-zinc-50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 mx-auto shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span className="text-xs font-semibold text-zinc-700">Standards &amp; Assurance</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight">
            Certified to <span className="brand-text-gradient">International Standards</span>
          </h2>

          <p className="text-base text-zinc-600 max-w-2xl mx-auto">
            Every instrument we distribute carries the highest international quality certifications — verified, traceable, and clinically compliant.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => {
            const Icon = certIcons[idx] || Shield;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-[#C41E3A]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#C41E3A] group-hover:text-white transition-all duration-300 text-[#C41E3A]">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Category Tag */}
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C41E3A] bg-[#C41E3A]/10 px-2.5 py-0.5 rounded-full">
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-zinc-950 mb-2 leading-tight">{cert.title}</h3>

                {/* Issuer */}
                <div className="flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C41E3A] flex-shrink-0" />
                  <span className="text-xs text-zinc-500 font-medium">{cert.issuer}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed flex-1">{cert.description}</p>

                {/* Verified indicator */}
                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 font-semibold">Actively Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-[#C41E3A]" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950">Full Regulatory Compliance</div>
              <div className="text-xs text-zinc-500">All instruments and documentation meet PNRA &amp; international radiological standards</div>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C41E3A] font-mono">100%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Compliance Rate</div>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-950 font-mono">4</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Certification Tiers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
