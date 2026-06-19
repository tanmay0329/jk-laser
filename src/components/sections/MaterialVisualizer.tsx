"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const materials = [
  { id: "mild-steel", name: "Mild Steel", color: "from-zinc-800 via-zinc-600 to-zinc-900", cursorColor: "rgba(82, 82, 91, 0.8)" },
  { id: "stainless-steel", name: "Stainless Steel", color: "from-slate-300 via-slate-100 to-slate-400", cursorColor: "rgba(203, 213, 225, 0.8)" },
  { id: "gold-plated", name: "Gold Plated Metal", color: "from-yellow-500 via-yellow-200 to-yellow-600", cursorColor: "rgba(234, 179, 8, 0.8)" },
];

export default function MaterialVisualizer() {
  const [activeMaterial, setActiveMaterial] = useState(materials[1]);

  return (
    <section id="visualizer" className="py-24 bg-transparent relative border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            MATERIAL J<span className="text-primary">K VISUALIZER</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mb-8">
            Experience our precision patterns in different premium metals. Select a material below to see how it transforms the design.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 max-w-6xl mx-auto">
          
          {/* Material Selectors */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {materials.map((material, index) => {
              const initialX = index % 2 === 0 ? -50 : 50;
              return (
                <motion.button
                  key={material.id}
                  initial={{ opacity: 0, x: initialX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  onClick={() => {
                    setActiveMaterial(material);
                    document.documentElement.style.setProperty('--cursor-color', material.cursorColor);
                    window.dispatchEvent(new CustomEvent('activate-custom-cursor'));
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${
                    activeMaterial.id === material.id 
                      ? "border-primary bg-primary/10 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
                      : "border-white/5 bg-[#1A1500]/60 backdrop-blur-xl hover:border-white/30"
                  }`}
                >
                  <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-br ${material.color} shadow-inner border border-black/50`} />
                  <span className={`font-semibold text-lg ${activeMaterial.id === material.id ? "text-white" : "text-white/70"}`}>
                    {material.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Visualizer Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3 aspect-square max-w-[500px] relative rounded-2xl overflow-hidden border border-white/5 bg-[#1A1500]/60 backdrop-blur-xl shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center p-4 md:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`w-full h-full relative bg-gradient-to-br ${activeMaterial.color} shadow-2xl rounded-sm`}
                style={{ 
                  WebkitMaskImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='white'/><path d='M30 0L60 30L30 60L0 30Z' fill='black'/><circle cx='30' cy='30' r='12' fill='white'/><path d='M0 0h10v10H0zM50 0h10v10H50zM0 50h10v10H0zM50 50h10v10H50z' fill='black'/></svg>\")",
                  maskImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='white'/><path d='M30 0L60 30L30 60L0 30Z' fill='black'/><circle cx='30' cy='30' r='12' fill='white'/><path d='M0 0h10v10H0zM50 0h10v10H50zM0 50h10v10H0zM50 50h10v10H50z' fill='black'/></svg>\")",
                }}
              >
                {/* Simulated Metal Reflection / Lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/40 mix-blend-overlay"></div>
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 mix-blend-overlay"
                />
              </motion.div>
            </AnimatePresence>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
