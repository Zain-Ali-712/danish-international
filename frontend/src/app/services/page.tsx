import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import Services from "@/components/sections/Services";
import CTABand from "@/components/layout/CTABand";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services | Danish International",
  description:
    "Professional consultancy, project planning, installation, maintenance, repair and solution design for healthcare facilities in Pakistan.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <PageHero
          eyebrow="Services"
          title="A complete support system,"
          highlight="not just an equipment vendor"
          subtitle="Professional consultancy, project planning, installation, maintenance, repair and solution design, delivered by our team in Lahore."
        />
        <Services />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
