"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ArrowRight, Sparkles, X, ChevronLeft, ChevronRight, Package, ShieldCheck } from "lucide-react";
import { PRODUCTS, Product } from "@/lib/data";

// Curated deep-dive set: index into PRODUCTS
const FEATURED = [
  { idx: 3, tagline: "Gold-standard beam verification, verified in under five minutes." },
  { idx: 0, tagline: "The hot lab workhorse trusted by nuclear pharmacies worldwide." },
  { idx: 4, tagline: "Rechargeable neurostimulation reaching the future of movement care." },
  { idx: 6, tagline: "0.1 mm mechanical reproducibility for commissioning that lasts." },
];

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Mock product gallery images for the modal
  const galleryImages = [
    { title: "System Frontal Overview", desc: "Precision clinical housing & touchscreen UI" },
    { title: "Internal Sensor / Detector Array", desc: "High-density ionization diodes & collimators" },
    { title: "Installation & Couch Integration", desc: "Calibrated on medical accelerator couch" },
    { title: "Real-time Diagnostic QA Dashboard", desc: "Automated gamma analysis & DICOM telemetry" },
  ];

  return (
    <section id="featured" className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span className="text-xs font-semibold text-zinc-700">Featured Deep-Dives</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight">
            Engineering Behind the <span className="brand-text-gradient">Instruments</span>
          </h2>

          <p className="text-base text-zinc-600 max-w-2xl mx-auto">
            A closer look at the systems that anchor our partnerships — what they measure, how they guarantee precision, and why facilities specify them.
          </p>
        </motion.div>

        {/* Alternating Deep-Dive Cards */}
        <div className="space-y-12">
          {FEATURED.map(({ idx, tagline }, order) => {
            const product = PRODUCTS[idx];
            const reversed = order % 2 === 1;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
              >
                {/* Visual Panel */}
                <div
                  className={`relative rounded-3xl overflow-hidden border border-zinc-200 bg-gradient-to-br from-zinc-50 via-zinc-100 to-rose-50/40 min-h-[340px] flex flex-col justify-between p-8 group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveImageIdx(0);
                  }}
                >
                  {/* Grid texture */}
                  <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Red accent glow on hover */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#C41E3A]/10 rounded-full blur-3xl group-hover:bg-[#C41E3A]/20 transition-all duration-500 pointer-events-none" />

                  <div className="relative flex items-start justify-between z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 bg-white/80 border border-zinc-200 rounded-full px-3.5 py-1">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C41E3A] text-white text-xs font-bold shadow-xs">
                        <Star className="w-3 h-3 fill-white text-white" />
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative my-8 z-10">
                    <div className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 leading-none">
                      {product.brand}
                    </div>
                    <div className="mt-2 text-lg font-bold text-[#C41E3A]">{product.name}</div>
                  </div>

                  <div className="relative flex items-center justify-between z-10 pt-4 border-t border-zinc-200/60">
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <span className="w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
                      <span className="font-medium">{tagline}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C41E3A] group-hover:translate-x-1 transition-transform">
                      <span>View Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Content Panel */}
                <div
                  className={`flex flex-col justify-center p-4 ${reversed ? "lg:order-1" : ""}`}
                >
                  <div className="text-sm font-bold text-[#C41E3A] mb-2 tracking-wide uppercase">
                    {product.brand} · OEM Partnership
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-zinc-950 mb-3 leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {product.specifications.slice(0, 4).map((spec, i) => {
                      const [label, ...rest] = spec.split(":");
                      return (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200"
                        >
                          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
                            {label}
                          </div>
                          <div className="text-xs text-zinc-800 leading-relaxed font-semibold">
                            {rest.join(":") || spec}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C41E3A] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Applications + Modal Trigger CTA */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {product.applications.slice(0, 3).map((app) => (
                      <span
                        key={app}
                        className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-700 font-medium"
                      >
                        {app}
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveImageIdx(0);
                      }}
                      className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 text-white hover:bg-[#C41E3A] transition-all text-xs font-bold"
                    >
                      Inspect Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Dialogue with Scrollable Image Gallery */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Left / Top: Interactive Gallery View */}
                <div className="md:col-span-7 bg-zinc-900 p-6 flex flex-col justify-between text-white relative min-h-[380px]">
                  {/* Active Gallery Viewer */}
                  <div className="relative flex-1 flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-zinc-950/60 border border-white/10 my-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C41E3A] to-[#8B1022] flex items-center justify-center shadow-lg shadow-[#C41E3A]/30 mb-4">
                      <Package className="w-10 h-10 text-white" />
                    </div>

                    <div className="text-xs font-mono text-[#EF4444] uppercase tracking-wider mb-1">
                      Angle 0{activeImageIdx + 1} of 0{galleryImages.length}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1">
                      {galleryImages[activeImageIdx].title}
                    </h4>

                    <p className="text-xs text-zinc-400 max-w-xs">
                      {galleryImages[activeImageIdx].desc}
                    </p>
                  </div>

                  {/* Gallery Thumbnails Strip */}
                  <div className="flex gap-2 justify-center pt-2">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeImageIdx === i
                            ? "bg-[#C41E3A] text-white shadow-sm"
                            : "bg-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        View {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right / Bottom: Deep Dive Product Specifications */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C41E3A]/10 text-[#C41E3A] text-[11px] font-bold uppercase tracking-wider mb-3">
                      {selectedProduct.category}
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-950 mb-1">
                      {selectedProduct.name}
                    </h3>
                    <div className="text-xs text-zinc-500 font-bold mb-4">
                      Manufacturer: {selectedProduct.brand}
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                        Full Technical Specifications
                      </div>
                      {selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C41E3A] flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
                    <a
                      href="/contact"
                      className="w-full py-3 rounded-xl bg-[#C41E3A] hover:bg-[#9E1B32] text-white text-xs font-bold text-center transition-colors shadow-md shadow-[#C41E3A]/20"
                    >
                      Request Formal Quote & Delivery Timeline
                    </a>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-900"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
