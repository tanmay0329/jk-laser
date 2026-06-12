"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Calendar, MapPin, Layers } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Villa Main Gate",
    client: "R.K. Architects",
    description: "A dual-layer mild steel gate with custom geometric cuts and gold powder coating.",
    beforeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop&blur=10",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    tags: ["Gates", "Mild Steel", "Powder Coated"],
    material: "Mild Steel (12mm) + Powder Coating",
    location: "Jalna Road, Beed",
    date: "March 2024"
  },
  {
    id: 2,
    title: "Corporate Office Facade",
    client: "TechPark Solutions",
    description: "Intricate stainless steel facade panels covering 1200 sq ft, installed with zero-tolerance precision.",
    beforeImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop&blur=10",
    afterImage: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop",
    tags: ["Panels", "Stainless Steel", "Commercial"],
    material: "Stainless Steel (304 grade)",
    location: "Shivaji Nagar, Pune",
    date: "January 2024"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase">Transformations</span>
              <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent"></div>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              See how our laser cut designs transform ordinary spaces into extraordinary ones. Hover over the projects to see the details and before/after transition.
            </p>
          </motion.div>
          <a href="#contact" className="mx-auto md:mx-0 shrink-0 inline-flex items-center justify-center gap-2 text-primary hover-gold transition-colors uppercase tracking-widest text-sm font-bold group">
            Start Your Project
            <ArrowLeftRight size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const initialX = index % 2 === 0 ? -50 : 50;
            return (
            <motion.div
              key={project.id}
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
              className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#121212] will-change-transform transform-gpu"
            >
              <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                {/* Before Image */}
                <img
                  src={project.beforeImage}
                  alt={`${project.title} Before`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                />
                
                {/* After Image */}
                <img
                  src={project.afterImage}
                  alt={`${project.title} After`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 transform group-hover:scale-105"
                />
                
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm transition-opacity duration-700 group-hover:opacity-0">
                  Before
                </div>
                <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm border border-primary text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  After
                </div>
              </div>
              
              <div className="p-6 relative z-20 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent">
                <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{project.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] text-white/50 uppercase tracking-wider">Material</span>
                      <span className="text-xs text-white/90">{project.material}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] text-white/50 uppercase tracking-wider">Location</span>
                      <span className="text-xs text-white/90">{project.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] text-white/50 uppercase tracking-wider">Completed</span>
                      <span className="text-xs text-white/90">{project.date}</span>
                    </div>
                  </div>
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
