"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scissors, Layers, Sparkles, Hexagon, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const defaultServices = [
  {
    id: "building-elevation",
    title: "JK BUILDING ELEVATION DESIGN",
    filterName: "JK Building Elevation Design",
    image: "/images/services/elevation-designs.jpg",
    items: ["Commercial Exteriors", "Residential Facades", "Modern Elevations"],
    icon: "🏢",
  },
  {
    id: "elevation-design",
    title: "JK ELEVATION DESIGN",
    filterName: "JK Elevation Design",
    image: "/images/services/elevation-designs.jpg",
    items: ["Wall Panels", "CNC Screens", "Room Dividers"],
    icon: "◨",
  },
  {
    id: "door",
    title: "JK DOOR",
    filterName: "JK Door",
    image: "/images/services/gates-doors.jpg",
    items: ["Safety Doors", "Main Doors", "Custom Laser Doors"],
    icon: "🚪",
  },
  {
    id: "gates",
    title: "JK GATES",
    filterName: "JK Gates",
    image: "/images/services/gates-doors.jpg",
    items: ["Main Gates", "Compound Gates", "Sliding Gates"],
    icon: "⛩️",
  },
  {
    id: "grill",
    title: "JK GRILL",
    filterName: "JK Grill",
    image: "/images/services/grills.jpg",
    items: ["Window Grills", "Balcony Grills", "Safety Grills"],
    icon: "🪟",
  },
  {
    id: "wall-art",
    title: "JK WALL ART",
    filterName: "JK Wall Art",
    image: "/images/services/wall-art.jpg",
    items: ["Interior Wall Art", "Metal Wall Decor", "Custom Art"],
    icon: "✨",
  },
];

interface CatalogItem {
  id: string;
  title: string;
  filterName?: string;
  filter_name?: string;
  image?: string;
  image_url?: string;
  items: string[];
  icon: string;
}

interface ServicesProps {
  categoryThumbnails?: Record<string, string>;
  catalogs?: CatalogItem[];
}

export default function Services({ categoryThumbnails = {}, catalogs = [] }: ServicesProps) {
  const router = useRouter();
  
  // Use dynamic catalogs if available, otherwise fallback to defaults
  const displayServices = catalogs.length > 0 ? catalogs : defaultServices;

  return (
    <section id="services" className="py-24 bg-transparent relative border-b border-white/5 overflow-hidden">
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
            JK <span className="text-primary">CATALOGS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From monumental entrance gates to delicate interior screens, our precision laser cutting services cover a wide spectrum of architectural and decorative needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {displayServices.map((service, index) => {
            const initialX = index % 2 === 0 ? -50 : 50;
            // Prioritize the image explicitly set in the Admin Panel (service.image_url) over the dynamic gallery sync
            const displayImage = service.image_url || categoryThumbnails[service.title] || service.image;
            const filterName = service.filter_name || service.filterName;
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: initialX, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.1, margin: "0px 0px -50px 0px" }}
              onClick={() => router.push(`/gallery?category=${encodeURIComponent(filterName)}`)}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
              className="group relative flex flex-col bg-[#1A1500]/60 backdrop-blur-xl border border-white/5 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-500 will-change-transform transform-gpu cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="relative h-32 md:h-64 w-full overflow-hidden flex items-center justify-center">
                {/* Blurred Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={displayImage}
                    alt=""
                    fill
                    unoptimized={displayImage.toLowerCase().endsWith('.jfif')}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover blur-xl opacity-40 scale-125"
                  />
                </div>
                
                {/* Dark overlay that fades on hover */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10 pointer-events-none" />
                
                {/* Foreground uncropped image */}
                <Image
                  src={displayImage}
                  alt={service.title}
                  fill
                  unoptimized={displayImage.toLowerCase().endsWith('.jfif')}
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="z-20 object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2"
                />
              </div>
              
              <div className="p-3 md:p-6 flex flex-col grow">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 border-b border-white/10 pb-2 md:pb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    <span className="text-sm md:text-lg leading-none">{service.icon}</span>
                  </div>
                  <h3 className="font-heading text-xs sm:text-sm md:text-lg font-bold text-white tracking-wide line-clamp-2 md:line-clamp-none">{service.title}</h3>
                </div>
                
                <ul className="flex flex-col gap-1.5 md:gap-2 mb-3 md:mb-6 grow">
                  {service.items.map((item, i) => (
                    <li key={i} className={`flex items-center gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground group-hover:text-white/80 transition-colors ${i >= 2 ? 'hidden md:flex' : ''}`}>
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <span className="inline-flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm text-primary font-semibold hover-gold transition-colors group/btn mt-auto">
                  <span className="hidden sm:inline">View Gallery</span>
                  <span className="inline sm:hidden">View</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform md:w-4 md:h-4" />
                </span>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/gallery" className="inline-flex items-center justify-center border border-primary text-primary px-8 py-3 rounded-sm font-semibold hover:bg-primary hover:text-black hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all hover:scale-105">
            VIEW ALL DESIGNS
          </Link>
        </div>
      </div>
    </section>
  );
}
