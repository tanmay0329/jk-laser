"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#0a0800]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a0800]">
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-[url('/images/background_sparks.png')] bg-cover bg-center mix-blend-screen" 
      />
      
      {/* Laser Beams Background */}
      
      {/* Horizontal Sweeping Laser */}
      <motion.div
        animate={{
          top: ["-10%", "110%", "-10%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-50%] w-[200%] h-[2px] bg-primary/40 shadow-[0_0_50px_10px_rgba(212,175,55,0.6)] mix-blend-screen"
      />

      {/* Vertical Sweeping Laser */}
      <motion.div
        animate={{
          left: ["-10%", "110%", "-10%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[-50%] w-[2px] h-[200%] bg-primary/30 shadow-[0_0_40px_8px_rgba(212,175,55,0.4)] mix-blend-screen"
      />

      {/* Diagonal Laser 1 */}
      <motion.div
        animate={{
          left: ["-50%", "150%"],
          top: ["-50%", "150%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute w-[2px] h-[150vh] bg-[#ffaa00]/50 shadow-[0_0_40px_10px_rgba(255,170,0,0.5)] transform -rotate-45 origin-top-left mix-blend-screen"
      />

      {/* Diagonal Laser 2 */}
      <motion.div
        animate={{
          right: ["-50%", "150%"],
          top: ["-50%", "150%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 6 }}
        className="absolute w-[2px] h-[150vh] bg-primary/40 shadow-[0_0_40px_10px_rgba(212,175,55,0.5)] transform rotate-45 origin-top-right mix-blend-screen"
      />

      {/* Premium Grain / Noise Overlay (Vercel/Stripe style) */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
