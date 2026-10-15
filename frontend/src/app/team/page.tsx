import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import Team from "@/components/sections/Team";
import CTABand from "@/components/layout/CTABand";
import Footer from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team | Danish International",
  description: "Meet the Danish International team in Lahore, Pakistan.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <PageHero eyebrow="Our team" title="Experts in their" highlight="respective fields" subtitle={COMPANY_INFO.expertsStory} />
        <Team />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
