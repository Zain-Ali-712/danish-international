import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />
      
      {/* Placeholder for future sections */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 font-medium uppercase tracking-[0.2em] animate-pulse">
            Upcoming sections: About, Products, Services...
          </p>
        </div>
      </div>
    </main>
  );
}
