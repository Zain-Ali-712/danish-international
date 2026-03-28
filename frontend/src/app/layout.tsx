import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danish International | Medical Equipment Solutions",
  description: "Danish International provides high-quality medical equipment and professional healthcare solutions worldwide. Committed to excellence and reliability.",
  keywords: ["medical equipment", "healthcare solutions", "Danish International", "professional medical tools"],
  openGraph: {
    title: "Danish International | Medical Equipment Solutions",
    description: "Professional medical equipment solutions for healthcare providers globally.",
    type: "website",
    locale: "en_US",
    siteName: "Danish International",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
