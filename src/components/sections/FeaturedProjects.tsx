"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface FeaturedProject {
  id: string;
  title: string;
  image_url: string;
  description: string;
  order_index: number;
}

interface FeaturedProjectsProps {
  projects?: FeaturedProject[];
}

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  return (
    <section id="featured-projects" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase">Showcase</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            FEATURED PROJECTS <br className="hidden md:block" />
            <span className="text-primary">FOR THIS MONTH</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A curated selection of 4 of our finest laser-cut creations, blending precision engineering with artistic design.
          </p>
        </motion.div>

        {/* 2 in a row on mobile (2 rows), 4 in a row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
          {projects.slice(0, 4).map((item, index) => {
            // Define 4 distinct window shapes
            const windowShapes = [
              "rounded-[10rem_10rem_1rem_1rem]", // Arch
              "rounded-[4rem_1rem_4rem_1rem]",   // Leaf
              "rounded-[1rem_1rem_10rem_10rem]", // Inverted Arch
              "rounded-[1rem_4rem_1rem_4rem]",   // Leaf Reversed
            ];
            const shapeClass = windowShapes[index];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                onClick={() => setSelectedProject(item)}
                className={`group relative overflow-hidden border border-white/10 bg-[#121212] h-[250px] sm:h-[400px] md:h-[500px] cursor-pointer ${shapeClass}`}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end text-center">
                  <h3 className="text-sm sm:text-xl font-heading font-bold text-white mb-2 leading-tight">{item.title}</h3>
                  <div className="w-8 sm:w-12 h-[2px] sm:h-1 bg-primary rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 mx-auto"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col md:flex-row items-center bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-[70vh] flex items-center justify-center bg-black/50 p-4">
                <img 
                  src={selectedProject.image_url} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Content side */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  Featured Project
                </div>
                <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4 md:mb-6">
                  {selectedProject.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                  {selectedProject.description}
                </p>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors text-center"
                >
                  Back to Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
