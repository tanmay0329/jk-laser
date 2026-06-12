"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scissors, Layers, Sparkles, Hexagon, Shield } from "lucide-react";

const services = [
  {
    id: "gates",
    title: "GATES",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    items: ["Main Gates", "Safety Doors", "Compound Gates"],
    icon: "🚪",
  },
  {
    id: "railings",
    title: "RAILINGS",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    items: ["Stair Railings", "Balcony Railings", "Terrace Railings"],
    icon: "🪜",
  },
  {
    id: "panels",
    title: "PANELS & SCREENS",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop",
    items: ["Wall Panels", "Room Dividers", "CNC Screens"],
    icon: "◨",
  },
  {
    id: "nameplates",
    title: "NAME PLATES",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    items: ["House Name Plates", "Office Branding", "Logo Signages"],
    icon: "🏷️",
  },
  {
    id: "decorative",
    title: "DECORATIVE ITEMS",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
    items: ["Wall Art", "Garden Decor", "Custom Items"],
    icon: "✨",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0A0A0A] relative border-b border-white/5 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase">Explore Our Designs</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            OUR <span className="text-primary">SERVICES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From monumental entrance gates to delicate interior screens, our precision laser cutting services cover a wide spectrum of architectural and decorative needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const initialX = index % 2 === 0 ? -50 : 50;
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: initialX, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
              className="group relative flex flex-col bg-[#121212] border border-white/10 rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-500 will-change-transform transform-gpu"
            >
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    <span className="text-lg leading-none">{service.icon}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-wide">{service.title}</h3>
                </div>
                
                <ul className="flex flex-col gap-2 mb-6 grow">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a href="#gallery" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover-gold transition-colors group/btn mt-auto">
                  View Gallery <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a href="#gallery" className="inline-flex items-center justify-center border border-primary text-primary px-8 py-3 rounded-sm font-semibold hover:bg-primary hover:text-black hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all hover:scale-105">
            VIEW ALL DESIGNS
          </a>
        </div>
      </div>
    </section>
  );
}
