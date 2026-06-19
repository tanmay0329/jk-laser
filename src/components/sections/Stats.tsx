"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, motion } from "framer-motion";

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{from}{suffix}</span>;
}

const stats = [
  { value: 847, suffix: "+", label: "DESIGNS", duration: 2.5 },
  { value: 1352, suffix: "+", label: "HAPPY CLIENTS", duration: 3 },
  { value: 14, suffix: "+", label: "YEARS EXPERIENCE", duration: 2 },
  { value: 99, suffix: "%", label: "SATISFACTION", duration: 2.5 },
];

export default function Stats() {
  return (
    <section className="py-16 bg-[#0A0A0A] border-y border-white/10 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center"
            >
              <Counter from={0} to={stat.value} duration={stat.duration} suffix={stat.suffix} />
              <div className="h-px w-12 bg-primary/30 my-3" />
              <p className="text-white/80 font-semibold tracking-widest text-xs md:text-sm uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
