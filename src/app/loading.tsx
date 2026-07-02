"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Laser Scanning Line */}
      <motion.div 
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_8px_var(--primary)] pointer-events-none"
        animate={{
          y: ["0vh", "100vh", "0vh"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* Logo and Spinner Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Laser-cut Rotating Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background thin track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(212, 175, 55, 0.1)"
              strokeWidth="2"
            />
            {/* Animated Laser stroke */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="60 200"
              animate={{
                strokeDashoffset: [0, -260],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: "drop-shadow(0 0 4px #D4AF37) drop-shadow(0 0 8px #D4AF37)",
              }}
            />
          </svg>

          {/* Logo inside */}
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 relative z-10 flex items-center justify-center"
          >
            <Image
              src="/new_logo.webp"
              alt="JK Laser Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Text Loader */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="font-heading text-xl md:text-2xl font-bold tracking-widest text-gradient-gold">
            JK LASER
          </h2>
          <div className="flex items-center justify-center gap-1 text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
            <span>Loading premium designs</span>
            <span className="inline-flex gap-0.5">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
