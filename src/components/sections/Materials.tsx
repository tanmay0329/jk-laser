"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const materials = [
  {
    id: "ms",
    name: "MILD STEEL",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=800&auto=format&fit=crop", // placeholder
    benefits: ["Highly durable", "Cost-effective", "Excellent for powder coating"],
    recommended: "Main Gates, Boundary Grills",
  },
  {
    id: "ss",
    name: "STAINLESS STEEL",
    image: "https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?q=80&w=800&auto=format&fit=crop", // placeholder
    benefits: ["Rust resistant", "Premium finish", "Low maintenance"],
    recommended: "Balcony Railings, Name Plates",
  },
  {
    id: "gold-plated",
    name: "GOLD PLATED METAL",
    image: "/images/gold_metal.png", // Custom generated high-res gold texture
    benefits: ["Luxurious look", "Tarnish resistant", "Extremely elegant"],
    recommended: "Interior Decor, Custom Artwork, Name Plates",
  },
];

export default function Materials() {
  return (
    <section id="materials" className="py-24 bg-[#050505] relative border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide">
            MATERIALS JK <span className="text-primary">WORK WITH</span>
          </h2>
          <div className="h-px w-24 bg-primary mb-6 mx-auto md:mx-0"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0 text-sm md:text-base">
            We use only premium grade materials sourced from trusted suppliers to ensure longevity and perfect finish for all our products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => {
            const initialX = index % 2 === 0 ? -50 : 50;
            return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: initialX, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
              className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#121212] flex flex-col will-change-transform transform-gpu"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 md:group-hover:bg-transparent transition-colors duration-500 z-10 hidden md:block" />
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transform md:group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-heading text-xl font-bold text-white tracking-widest uppercase">{material.name}</h3>
                </div>
              </div>
              
              <div className="p-5 flex flex-col grow">
                <div className="mb-4">
                  <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-2">Benefits</p>
                  <ul className="space-y-1.5">
                    {material.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Recommended For</p>
                  <p className="text-sm text-white/80">{material.recommended}</p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
