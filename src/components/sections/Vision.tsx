"use client";

import { motion } from "framer-motion";
import { TrendingUp, Cpu } from "lucide-react";

export default function Vision() {
  return (
    <section id="vision" className="py-24 bg-transparent relative border-b border-white/5 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase">Our Vision</span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              ELEVATING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-[#AA7700]">TOMORROW'S</span> <br />
              ARCHITECTURE
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
              We envision a future where metal fabrication is not just structural, but a seamless blend of innovation and art. By pushing the boundaries of CNC laser technology, we transform ideas into futuristic elevations and groundbreaking designs.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group hover:bg-primary hover:text-black transition-colors duration-300">
                  <TrendingUp size={24} className="group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-heading font-bold text-white tracking-wide">Continuous Growth</h4>
                <p className="text-sm text-white/50 leading-relaxed">Pioneering new methods in architectural elevation.</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group hover:bg-primary hover:text-black transition-colors duration-300">
                  <Cpu size={24} className="group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-heading font-bold text-white tracking-wide">Tech-Driven Innovation</h4>
                <p className="text-sm text-white/50 leading-relaxed">Utilizing cutting-edge laser technology for absolute precision.</p>
              </div>
            </div>
          </motion.div>

          {/* Futuristic Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center perspective-[1200px]"
          >
            {/* 3D Container */}
            <motion.div
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, -5, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-full h-full max-w-[450px] max-h-[450px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-sm border border-primary/30 transform rotate-6 scale-95 opacity-50" />
              <div className="absolute inset-0 bg-[#1A1500]/60 backdrop-blur-xl rounded-sm border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex items-center justify-center">
                
                <img 
                  src="/images/vision_building.png" 
                  alt="Futuristic Building Vision" 
                  className="w-full h-full object-cover mix-blend-screen opacity-80 filter contrast-125"
                />

                {/* Animated Overlay Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* Glowing Scanner Line */}
                <motion.div 
                  animate={{ y: ["-100%", "500%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(212,175,55,1)]"
                />
              </div>
              
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
