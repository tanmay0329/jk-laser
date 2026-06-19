"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sparkle component for background animation
const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0, 1, 0.5],
      y: [-20, -100]
    }}
    transition={{ 
      duration: 2 + Math.random() * 2, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeOut"
    }}
    className="absolute w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_10px_2px_#D4AF37]"
    style={{
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 30}%`
    }}
  />
);

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/images/slider/laser_cutting_1.webp",
    "/images/slider/mesh_pattern.webp",
    "/images/slider/laser_cutting_2.webp",
    "/images/slider/facade_1.webp",
    "/images/slider/laser_cutting_3.webp",
    "/images/slider/macro_1.webp"
  ];
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-transparent pt-20 pb-20">
      {/* Background Video with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 bg-transparent"
        style={{ y: backgroundY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-lighten"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-welder-working-with-sparks-flying-around-34463-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      {/* Gold glowing accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Desktop Banner Logo */}
        <img 
          src="/jk-laser-banner.webp" 
          alt="Watermark Desktop" 
          className="hidden md:block w-full h-full object-cover filter grayscale opacity-10 mix-blend-overlay"
        />
        {/* Mobile Background Logo */}
        <div className="block md:hidden absolute inset-x-0 top-0 w-full opacity-20 pointer-events-none">
          <img 
            src="/verticle_logo.webp" 
            alt="Watermark Mobile" 
            className="w-full h-auto object-cover object-top scale-[1.2] origin-top mix-blend-normal"
          />
        </div>
      </div>

      {/* Sparks */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkle key={i} delay={Math.random() * 5} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center md:text-left items-center md:items-start"
          >
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 rounded-full px-4 py-1.5 w-max backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Premium Metal Fabrication</span>
            </div>
            
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-white">
              PRECISION <br />
              <span className="text-gradient-gold">JK LASER CUTTING</span> <br />
              & CUSTOM DESIGN
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
              We create elegant laser-cut gates, railings, decorative panels, name plates and custom metal artwork with unmatched precision and perfect finish.
              <span className="block mt-4 text-xl md:text-2xl font-semibold text-primary italic font-heading">
                "JK Laser – We Make What You Think."
              </span>
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4 w-full md:w-auto">
              <Link href="/gallery" className="group relative inline-flex items-center justify-center gap-2 bg-gradient-gold text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  VIEW DESIGNS <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link href="#contact" className="group inline-flex items-center justify-center gap-2 bg-[#1A1500]/60 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-lg">
                <FileText size={18} /> REQUEST QUOTE
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex justify-center perspective-[1000px] mt-24 lg:mt-0"
          >
            {/* 3D Floating Element */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotateX: [5, -5, 5],
                rotateY: [-5, 5, -5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-sm lg:max-w-[450px] h-[400px] lg:h-[550px] border border-primary/40 glassmorphism-card p-6 flex flex-col justify-between mx-auto"
            >
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary -translate-y-2 translate-x-2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-primary translate-y-2 -translate-x-2" />
              
              <div className="w-full h-[60%] border border-white/20 bg-black overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  <motion.div 
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
                  />
                </AnimatePresence>
                {/* Decorative Laser Cut Pattern Overlay - pure CSS representation */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,#D4AF37_49%,#D4AF37_51%,transparent_55%)] bg-[size:20px_20px] opacity-[0.15] pointer-events-none z-10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_45%,#D4AF37_49%,#D4AF37_51%,transparent_55%)] bg-[size:20px_20px] opacity-[0.15] pointer-events-none z-10"></div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-2xl text-primary font-semibold">Custom Designs</h3>
                <p className="text-sm text-white/70 line-clamp-3">
                  Our advanced CNC laser technology allows us to create intricate, complex patterns that transform ordinary metal into extraordinary architectural features.
                </p>
                <div className="h-0.5 w-12 bg-primary mt-4"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
