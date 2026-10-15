import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import GlobalReach from "@/components/sections/GlobalReach";
import CTABand from "@/components/layout/CTABand";
import Footer from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Danish International",
  description: COMPANY_INFO.experienceStory,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <PageHero
          eyebrow="About us"
          title="More than 25 years in healthcare &"
          highlight="nuclear medicine"
          subtitle={COMPANY_INFO.experienceStory}
        />
        <About />
        <Team />
        <GlobalReach />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
