import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import ProductExplorer from "@/components/products/ProductExplorer";
import CTABand from "@/components/layout/CTABand";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Products | Danish International",
  description:
    "Nuclear medicine, radiotherapy, PET tracers, health physics, radiology QA, radioactive sources and deep brain stimulation from 14 international manufacturers.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <PageHero
          eyebrow="Products"
          title="14 international manufacturers,"
          highlight="seven product domains"
          subtitle="Explore the ranges we supply, install and maintain in Pakistan, from dose calibrators to deep brain stimulation. Availability and specifications on request."
        />
        <ProductExplorer />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
