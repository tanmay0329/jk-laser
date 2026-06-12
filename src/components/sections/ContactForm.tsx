"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, PenLine } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    productType: "Gates",
    dimensions: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Form submitted! We will get back to you soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#121212] border border-white/10 rounded-sm p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
              
              <h3 className="font-heading text-2xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                <PenLine className="text-primary" size={24} />
                CUSTOM DESIGN <span className="text-primary">REQUEST</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Name <span className="text-primary">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mobile" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Mobile Number <span className="text-primary">*</span></label>
                    <input 
                      type="tel" 
                      id="mobile" 
                      name="mobile" 
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="productType" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Product Type <span className="text-primary">*</span></label>
                    <select 
                      id="productType" 
                      name="productType" 
                      required
                      value={formData.productType}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="Gates">Laser Gates</option>
                      <option value="Railings">Railings</option>
                      <option value="Panels">Decorative Panels</option>
                      <option value="Name Plates">Name Plates</option>
                      <option value="Custom">Custom Artwork</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dimensions" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Dimensions (Approximate)</label>
                  <input 
                    type="text" 
                    id="dimensions" 
                    name="dimensions" 
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. 10ft x 6ft"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider text-white/70 font-semibold">Message / Details <span className="text-primary">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/70 font-semibold">Upload Reference Image</label>
                  <div className="w-full border-2 border-dashed border-white/20 rounded-sm p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer group">
                    <UploadCloud className="w-8 h-8 text-white/40 mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-white/60 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-white/40">SVG, PNG, JPG or PDF (max. 5MB)</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-gold text-black font-bold py-4 rounded-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  REQUEST CUSTOM DESIGN
                </button>
              </form>
            </motion.div>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                LET'S BUILD <br />
                <span className="text-primary">SOMETHING</span> <br />
                EXTRAORDINARY
              </h2>
              
              <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent mb-8"></div>
              
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                Have a unique design in mind? Share your requirements with us. Our expert team will review your details and provide a comprehensive quote within 24 hours.
              </p>

              {/* Minimal Map Placeholder */}
              <a 
                href="https://maps.app.goo.gl/oh3QKbmURBPMjjmB7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-48 bg-[#121212] border border-white/10 rounded-sm relative overflow-hidden group cursor-none md:cursor-none"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                    <span className="w-3 h-3 bg-primary rounded-full relative" />
                  </div>
                  <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm group-hover:text-primary transition-colors">JK Laser Beed</h4>
                  <p className="text-xs text-white/70 mt-1">Click to open in Google Maps</p>
                </div>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
