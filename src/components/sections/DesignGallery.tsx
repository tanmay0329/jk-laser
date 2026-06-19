"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, ZoomIn, X, ChevronDown } from "lucide-react";

export interface GalleryItem {
  id: string;
  category: string;
  designNumber: string;
  image: string;
}

interface DesignGalleryProps {
  initialItems?: GalleryItem[];
}

const categories = [
  "All", 
  "JK Building Elevation Design", 
  "JK Elevation Design", 
  "JK Door", 
  "JK Gates", 
  "JK Grill", 
  "JK Wall Art"
];
const ITEMS_PER_PAGE = 20;

export default function DesignGallery({ initialItems = [] }: DesignGalleryProps) {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImage, setLightboxImage] = useState<{url: string, number: string, ratio?: string} | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [imageRatios, setImageRatios] = useState<Record<string, string>>({});

  const handleImageLoad = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    
    const ratio = naturalWidth / naturalHeight;
    const commonRatios = [
      { name: "1:1", value: 1 / 1 },
      { name: "4:3", value: 4 / 3 },
      { name: "3:4", value: 3 / 4 },
      { name: "16:9", value: 16 / 9 },
      { name: "9:16", value: 9 / 16 },
      { name: "3:2", value: 3 / 2 },
      { name: "2:3", value: 2 / 3 },
      { name: "4:5", value: 4 / 5 },
      { name: "5:4", value: 5 / 4 },
    ];
    
    let closest = commonRatios[0];
    let minDiff = Math.abs(ratio - closest.value);
    
    for (const cr of commonRatios) {
      const diff = Math.abs(ratio - cr.value);
      if (diff < minDiff) {
        closest = cr;
        minDiff = diff;
      }
    }
    
    let displayRatio = "";
    if (minDiff < 0.1) {
      displayRatio = closest.name;
    } else {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const d = Math.round(gcd(naturalWidth, naturalHeight));
      if (d > 0 && naturalWidth/d < 100 && naturalHeight/d < 100) {
        displayRatio = `${Math.round(naturalWidth/d)}:${Math.round(naturalHeight/d)}`;
      } else {
        displayRatio = `${naturalWidth}x${naturalHeight}`;
      }
    }
    
    setImageRatios(prev => ({ ...prev, [id]: displayRatio }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam && categories.includes(categoryParam)) {
        setFilter(categoryParam);
      }
    }
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filteredItems = useMemo(() => {
    let itemsToFilter = [...initialItems];
    
    return itemsToFilter.filter(item => {
      const matchesCategory = filter === "All" || item.category === filter;
      const matchesSearch = item.designNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialItems, filter, searchQuery]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const [cols, setCols] = useState(4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(4);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // Split visible items into columns
  const columnItems = Array.from({ length: cols }, () => [] as typeof visibleItems);
  visibleItems.forEach((item, i) => {
    columnItems[i % cols].push(item);
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
                  onClick={() => handleFilterChange(cat)}
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
                onChange={handleSearchChange}
                className="w-full bg-[#121212] border border-white/20 rounded-full px-5 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            </div>
          </div>

        {/* Gallery Grid - JS Masonry using Flex Columns */}
        <div className={`flex gap-3 md:gap-6 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          {columnItems.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-3 md:gap-6">
              <AnimatePresence>
                {column.map((item, itemIndex) => {
                  const initialX = colIndex % 2 === 0 ? -50 : 50;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: initialX, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.5, 
                        type: "spring",
                        stiffness: 120,
                        damping: 20
                      }}
                      key={item.id}
                      className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#121212] will-change-transform transform-gpu cursor-pointer block"
                      onClick={() => setLightboxImage({ url: item.image, number: item.designNumber })}
                    >
                      <img
                        src={item.image}
                        alt={`Design ${item.designNumber}`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 select-none block"
                        loading="lazy"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onLoad={(e) => handleImageLoad(item.id, e)}
                      />
                      
                      {/* Image Watermark */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10 opacity-30 mix-blend-overlay">
                        <img 
                          src="/verticle_logo.png" 
                          alt="Watermark" 
                          className="w-1/2 h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setLightboxImage({ url: item.image, number: item.designNumber, ratio: imageRatios[item.id] }) }}
                          className="w-12 h-12 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                        >
                          <ZoomIn size={20} />
                        </button>
                        <div className="text-center">
                          <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{item.category}</p>
                          <p className="text-xl text-white font-heading font-bold">{item.designNumber}</p>
                          {imageRatios[item.id] && (
                            <p className="text-xs text-white/70 mt-1 uppercase tracking-wider">Frame Size: {imageRatios[item.id]}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No designs found matching your criteria.
          </div>
        )}

        {hasMore && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 border border-primary/50 hover:border-primary text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-primary/10"
            >
              Load More <ChevronDown size={18} className="text-primary" />
            </button>
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
              <div className="relative max-w-full flex justify-center">
                <img 
                  src={lightboxImage.url} 
                  alt={lightboxImage.number} 
                  className="max-w-full max-h-[80vh] object-contain rounded-sm border border-white/20 relative z-10 select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Lightbox Watermark */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20 opacity-30 mix-blend-overlay">
                  <img 
                    src="/verticle_logo.png" 
                    alt="Watermark" 
                    className="w-[40%] md:w-[30%] h-auto object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="bg-black/80 px-8 py-3 rounded-full border border-primary/30 flex items-center gap-4">
                <p className="text-primary font-heading font-bold text-lg">Design: {lightboxImage.number}</p>
                {lightboxImage.ratio && (
                  <>
                    <div className="w-px h-4 bg-white/20"></div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Frame Size: {lightboxImage.ratio}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
