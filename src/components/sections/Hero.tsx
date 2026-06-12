"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#0A0A0A]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
      </motion.div>

      {/* Gold glowing accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 rounded-full px-4 py-1.5 w-max backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Premium Metal Fabrication</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              PRECISION <br />
              <span className="text-gradient-gold">LASER CUTTING</span> <br />
              & CUSTOM DESIGN
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
              We create elegant laser-cut gates, railings, decorative panels, name plates and custom metal artwork with unmatched precision and perfect finish.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link href="#gallery" className="group relative inline-flex items-center justify-center gap-2 bg-gradient-gold text-black px-8 py-4 rounded-sm font-bold text-sm tracking-wide overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  VIEW DESIGNS <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link href="#contact" className="group inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-all hover:scale-105">
                <FileText size={18} /> REQUEST QUOTE
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex justify-center perspective-[1000px] mt-8 lg:mt-0"
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
              
              <div className="w-full h-[60%] border border-white/20 bg-black/60 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565511394784-0cc0c4bb2101?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
                {/* Decorative Laser Cut Pattern Overlay - pure CSS representation */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,#D4AF37_49%,#D4AF37_51%,transparent_55%)] bg-[size:20px_20px] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_45%,#D4AF37_49%,#D4AF37_51%,transparent_55%)] bg-[size:20px_20px] opacity-20"></div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-2xl text-primary font-semibold">Bespoke Designs</h3>
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
