import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
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
      className={`dark ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden relative cursor-none md:cursor-none">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full pt-[72px] md:pt-[88px]">{children}</main>
        <Footer />
        <FloatingWhatsApp />

        {/* Global Glowing Border Overlay */}
        <div 
          className="fixed inset-0 z-[100] pointer-events-none glow-conic glow-border-overlay"
          style={{
            '--glow-animation-duration': '4s',
            '--glow-color-1': '#F3E5AB',
            '--glow-color-2': '#D4AF37',
            '--glow-color-3': '#050505',
            '--glow-color-4': '#000000',
            '--glow-color-5': '#050505',
            '--glow-color-6': '#D4AF37',
            '--glow-color-7': '#F3E5AB',
            '--glow-color-8': '#D4AF37',
            '--glow-color-9': '#050505',
            '--glow-color-10': '#050505',
          } as React.CSSProperties}
        />
        <div 
          className="fixed inset-0 z-[99] pointer-events-none glow-conic glow-border-overlay blur-[8px] opacity-70"
          style={{
            '--glow-animation-duration': '4s',
            '--glow-color-1': '#F3E5AB',
            '--glow-color-2': '#D4AF37',
            '--glow-color-3': '#050505',
            '--glow-color-4': '#000000',
            '--glow-color-5': '#050505',
            '--glow-color-6': '#D4AF37',
            '--glow-color-7': '#F3E5AB',
            '--glow-color-8': '#D4AF37',
            '--glow-color-9': '#050505',
            '--glow-color-10': '#050505',
          } as React.CSSProperties}
        />
      </body>
    </html>
  );
}
