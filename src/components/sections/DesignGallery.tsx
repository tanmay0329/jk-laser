"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, ZoomIn, X } from "lucide-react";
import { section } from "framer-motion/client";

// Mock data for the gallery
const galleryItems = [
  { id: 1, category: "Gates", designNumber: "G001", image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=800&auto=format&fit=crop" },
  { id: 2, category: "Gates", designNumber: "G002", image: "https://images.unsplash.com/photo-1592398516082-95f7c327dc45?q=80&w=800&auto=format&fit=crop" },
  { id: 3, category: "Railings", designNumber: "R101", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
  { id: 4, category: "Panels", designNumber: "P201", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop" },
  { id: 5, category: "Panels", designNumber: "P202", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
  { id: 6, category: "Name Plates", designNumber: "N301", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" },
  { id: 7, category: "Decorative Art", designNumber: "D401", image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop" },
  { id: 8, category: "Gates", designNumber: "G003", image: "https://images.unsplash.com/photo-1565511394784-0cc0c4bb2101?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["All", "Gates", "Railings", "Panels", "Name Plates", "Decorative Art"];

export default function DesignGallery() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImage, setLightboxImage] = useState<{url: string, number: string} | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.designNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section ref={containerRef} id="gallery" className="py-24 bg-black relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565511394784-0cc0c4bb2101?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            DESIGN <span className="text-primary">GALLERY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mb-8">
            Browse our extensive collection of premium laser-cut designs. Found something you like? Note the design number when requesting a quote.
          </p>
        </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto mb-16">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat 
                      ? "bg-primary text-black" 
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search design (e.g. G001)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-white/20 rounded-full px-5 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            </div>
          </div>

        {/* Gallery Grid - Masonry style approximation using columns */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const initialX = index % 2 === 0 ? -50 : 50;
              return (
              <motion.div
                layout
                initial={{ opacity: 0, x: initialX, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
                key={item.id}
                className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#121212] aspect-[3/4] will-change-transform transform-gpu"
              >
                <img
                  src={item.image}
                  alt={`Design ${item.designNumber}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                  <button 
                    onClick={() => setLightboxImage({ url: item.image, number: item.designNumber })}
                    className="w-12 h-12 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{item.category}</p>
                    <p className="text-xl text-white font-heading font-bold">{item.designNumber}</p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No designs found matching your search.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X size={24} />
            </button>
            <div 
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.number} 
                className="max-w-full max-h-[80vh] object-contain rounded-sm border border-white/20"
              />
              <div className="bg-black/80 px-6 py-2 rounded-full border border-primary/30">
                <p className="text-primary font-heading font-bold text-lg">Design: {lightboxImage.number}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    
  );
}
