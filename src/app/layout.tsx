import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollManager from "@/components/layout/ScrollManager";
import ThreeBackground from "@/components/ui/ThreeBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "JK Laser Beed | Precision Laser Cutting & Custom Design",
  description: "Premium laser-cut gates, railings, decorative panels, and custom metal artwork. High precision manufacturing with luxurious finish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden relative selection:bg-primary/30 selection:text-white">
        <ThreeBackground />
        <ScrollManager />
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full pt-[72px] md:pt-[88px] relative z-10">{children}</main>
        <Footer />
        <FloatingWhatsApp />

      </body>
    </html>
  );
}
