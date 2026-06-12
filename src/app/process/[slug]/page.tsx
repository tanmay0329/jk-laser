import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, PenTool, Laptop, Cpu, SprayCan, Wrench } from 'lucide-react';
import { processData } from '@/lib/processData';

// Helper function to render the correct Lucide icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'PenTool': return <PenTool className="w-6 h-6 text-primary" />;
    case 'Laptop': return <Laptop className="w-6 h-6 text-primary" />;
    case 'Cpu': return <Cpu className="w-6 h-6 text-primary" />;
    case 'SprayCan': return <SprayCan className="w-6 h-6 text-primary" />;
    case 'Wrench': return <Wrench className="w-6 h-6 text-primary" />;
    default: return <PenTool className="w-6 h-6 text-primary" />;
  }
};

export function generateStaticParams() {
  return processData.map((process) => ({
    slug: process.slug,
  }));
}

export default async function ProcessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const process = processData.find((p) => p.slug === slug);

  if (!process) {
    notFound();
  }

  const prevProcess = process.prevSlug ? processData.find(p => p.slug === process.prevSlug) : null;
  const nextProcess = process.nextSlug ? processData.find(p => p.slug === process.nextSlug) : null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-[72px] md:pt-[88px] flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-black z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: `url(${process.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent opacity-80" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover-gold mb-6 transition-colors text-sm font-semibold tracking-widest uppercase">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white/50 font-heading font-bold text-xl">{process.id}</span>
            <div className="h-px w-16 bg-primary"></div>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-wider uppercase">
            {process.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 flex-grow relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center gap-4 border border-white/10 p-4 rounded-sm bg-[#121212] w-max mb-4">
                {renderIcon(process.iconName)}
                <span className="text-white font-semibold tracking-wide">{process.shortDescription}</span>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {process.fullDescription}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-6 uppercase tracking-wide">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {process.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#121212] border border-white/5 rounded-sm hover:border-primary/30 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm text-white/70">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4">
              <div className="sticky top-[120px] glassmorphism-card p-8 rounded-sm flex flex-col gap-6">
                <h3 className="font-heading text-xl font-bold text-white uppercase">Ready to start?</h3>
                <p className="text-sm text-white/60">
                  Whether you have a finished CAD file or just a rough idea, we're ready to bring it to life with ultimate precision.
                </p>
                <Link 
                  href="/#contact" 
                  className="w-full bg-gradient-gold text-black text-center font-bold py-4 rounded-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  REQUEST A QUOTE
                </Link>
                <div className="h-px w-full bg-white/10 my-2" />
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Or call us directly</span>
                  <a href="tel:+919876543210" className="text-primary font-bold text-lg hover-gold transition-colors">+91 98765 43210</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="border-t border-white/10 bg-[#050505]">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {prevProcess ? (
              <Link 
                href={`/process/${prevProcess.slug}`}
                className="flex-1 p-8 md:p-12 flex flex-col gap-2 hover:bg-white/5 transition-colors group"
              >
                <span className="text-xs text-white/40 tracking-widest uppercase font-semibold flex items-center gap-2">
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous Step
                </span>
                <span className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors uppercase">
                  {prevProcess.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1 p-8 md:p-12 flex flex-col gap-2 opacity-50 cursor-not-allowed">
                <span className="text-xs text-white/40 tracking-widest uppercase font-semibold">Previous Step</span>
                <span className="text-xl md:text-2xl font-heading font-bold text-white/50 uppercase">None</span>
              </div>
            )}
            
            {nextProcess ? (
              <Link 
                href={`/process/${nextProcess.slug}`}
                className="flex-1 p-8 md:p-12 flex flex-col items-end text-right gap-2 hover:bg-white/5 transition-colors group"
              >
                <span className="text-xs text-white/40 tracking-widest uppercase font-semibold flex items-center gap-2">
                  Next Step <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors uppercase">
                  {nextProcess.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1 p-8 md:p-12 flex flex-col items-end text-right gap-2 opacity-50 cursor-not-allowed">
                <span className="text-xs text-white/40 tracking-widest uppercase font-semibold">Next Step</span>
                <span className="text-xl md:text-2xl font-heading font-bold text-white/50 uppercase">None</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
