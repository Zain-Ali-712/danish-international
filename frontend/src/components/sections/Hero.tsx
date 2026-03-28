"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroContent {
  id: string;
  heading: string;
  description: string;
  image: string;
  boxImage: string;
}

const contents: Record<string, HeroContent> = {
  product: {
    id: "product",
    heading: "Global Nuclear Medicine Services and Healthcare Solutions",
    description:
      "Danish International is a privately held company, engaged in developing and selling Nuclear medicine, PET/CT Hot Lab, QA Accessories, Immobilizations devices for radiotherapy and complete dosimeters for Linac and branch therapy for health care in Pakistan.",
    image: "/product-hero.png",
    boxImage: "/doctor-hero.png",
  },
  doctor: {
    id: "doctor",
    heading: "25 Years Experience in Healthcare Industry",
    description:
      "Danish International has been in the healthcare and nuclear medicine industry for the last 25 years and is now a pioneer in this industry.",
    image: "/doctor-hero.png",
    boxImage: "/product-hero.png",
  },
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState<"product" | "doctor">("product");

  const currentContent = contents[activeTab];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      {/* Background Layer: Gradient + Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute inset-0 glow-light pointer-events-none" />
        
        {/* Big Stroke Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <h1 className="text-[12vw] font-black tracking-tighter text-stroke leading-none uppercase">
            DANISH
          </h1>
          <h1 className="text-[12vw] font-black tracking-tighter text-stroke leading-none uppercase">
            INTERNATIONAL
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight max-w-xl">
                {currentContent.heading}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                {currentContent.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            disabled
            className="group flex items-center gap-3 h-14 px-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold cursor-not-allowed opacity-60 hover:bg-white/20 transition-all duration-300"
          >
            <PhoneCall className="w-5 h-5" />
            Call on Skype
          </button>
        </div>

        {/* Center: Main Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="relative w-full aspect-square"
            >
              <Image
                src={currentContent.image}
                alt="Medical Hero Visual"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Switcher Box */}
        <div className="absolute right-6 bottom-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-10 z-20">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-white/60 uppercase tracking-[0.2em] ml-2">Next Category &gt;</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(prev => prev === "product" ? "doctor" : "product")}
              className="group relative w-48 h-64 lg:w-56 lg:h-72 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-500 hover:border-white/50"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <Image
                src={currentContent.boxImage}
                alt="Switch hero category"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <span className="text-lg font-black text-white tracking-tight drop-shadow-md">
                  {activeTab === "product" ? "Experience" : "Products"}
                </span>
                <div className="w-8 h-1 bg-color-1 mt-2 transition-all duration-300 group-hover:w-16" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
