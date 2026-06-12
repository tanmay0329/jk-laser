"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { id: 1, name: "Rajesh Kumar", company: "R.K. Architects", text: "The precision of their laser cutting is unmatched. The custom gate they designed for our luxury villa project became the centerpiece of the entire property." },
  { id: 2, name: "Sneha Patil", company: "Interior Designer", text: "I've worked with many fabricators, but JK Laser Beed delivers flawless decorative panels every time. Their finish is absolutely premium." },
  { id: 3, name: "Amit Sharma", company: "Sharma Estates", text: "Outstanding quality and timely delivery. The metallic gradients and intricate patterns they incorporated in our office signage are stunning." },
  { id: 4, name: "Priya Desai", company: "Desai Builders", text: "From CAD drawing to final installation, their process is seamless. Highly recommend for any bespoke metalwork needs." },
  { id: 5, name: "Vikram Singh", company: "Singh Constructions", text: "Their state-of-the-art CNC machines create edges so smooth, no extra polishing was needed. Truly the best in Maharashtra." }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            CLIENT <span className="text-primary">TESTIMONIALS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Trusted by top architects, interior designers, and builders. Here is what our premium clients have to say about our work.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden w-full group py-8">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          {/* Scrolling Content - we duplicate the array to create seamless loop */}
          <div className="flex animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="w-[300px] md:w-[450px] shrink-0 glassmorphism-card border border-white/10 p-6 md:p-8 rounded-sm flex flex-col gap-4 whitespace-normal transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              >
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <Quote className="text-white/10 w-12 h-12 absolute right-6 top-6" />
                <p className="text-white/80 leading-relaxed relative z-10 text-sm md:text-base italic">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <h4 className="font-bold text-white text-base md:text-lg">{testimonial.name}</h4>
                  <p className="text-primary text-xs md:text-sm uppercase tracking-wide mt-1">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
