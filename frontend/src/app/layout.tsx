import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danish International | Global Nuclear Medicine & Healthcare Solutions",
  description:
    "Nuclear medicine, PET/CT hot lab, radiotherapy immobilization, QA and dosimetry solutions for healthcare facilities in Pakistan. 25+ years in the healthcare industry.",
  keywords: [
    "nuclear medicine",
    "PET/CT hot lab",
    "radiotherapy",
    "dosimetry",
    "healthcare solutions Pakistan",
    "medical equipment Lahore",
    "radiation therapy",
    "deep brain stimulation",
    "health physics",
  ],
  authors: [{ name: "Danish International" }],
  openGraph: {
    title: "Danish International | Nuclear Medicine & Healthcare Solutions",
    description: "25+ years supplying nuclear medicine and radiotherapy technology to healthcare facilities in Pakistan.",
    url: "https://danish-international.com",
    siteName: "Danish International",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danish International | Healthcare Solutions",
    description: "Global nuclear medicine services & healthcare solutions",
    creator: "@DanishInternat1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F6F8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-paper text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
