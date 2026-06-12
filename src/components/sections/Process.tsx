"use client";

import { motion } from "framer-motion";
import { PenTool, Laptop, Cpu, SprayCan, Wrench } from "lucide-react";

const processes = [
  {
    id: "01",
    title: "DESIGN SELECTION",
    description: "Choose from our wide range of designs or share your idea.",
    icon: PenTool,
  },
  {
    id: "02",
    title: "CAD DRAWING",
    description: "We create precise CAD drawings for perfect execution.",
    icon: Laptop,
  },
  {
    id: "03",
    title: "LASER CUTTING",
    description: "High precision laser cutting for perfect accuracy.",
    icon: Cpu,
  },
  {
    id: "04",
    title: "FINISHING",
    description: "Polishing, coating & quality check for perfect finish.",
    icon: SprayCan,
  },
  {
    id: "05",
    title: "INSTALLATION",
    description: "Professional installation at your location.",
    icon: Wrench,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-widest">
              OUR <span className="text-primary">PROCESS</span>
            </h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10" />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-[#F3E5AB] to-primary origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
            {processes.map((process, index) => {
              const Icon = process.icon;
              // Alternate animation direction: from left (-50) and from right (50)
              const initialX = index % 2 === 0 ? -50 : 50;
              
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, x: initialX, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Vertical Line for Mobile */}
                  {index !== processes.length - 1 && (
                    <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-primary/30" />
                  )}
                  
                  {/* Icon Circle */}
                  <div className="relative w-24 h-24 rounded-full border-2 border-white/20 bg-[#121212] flex items-center justify-center mb-6 z-10 group-hover:border-primary transition-colors duration-300">
                    <div className="absolute inset-0 rounded-full border-2 border-primary scale-0 group-hover:scale-100 transition-transform duration-500 ease-out opacity-50" />
                    <Icon className="w-8 h-8 text-white/50 group-hover:text-primary transition-colors duration-300 relative z-10" />
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                      {process.id}
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-[200px]">
                    {process.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
