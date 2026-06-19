"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const exactX = useMotionValue(-100);
  const exactY = useMotionValue(-100);

  // Spring configuration for the trailing glow effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Only initialize custom cursor on desktop to avoid issues on touch devices
    if (window.matchMedia("(max-width: 768px)").matches) return;
    
    setIsVisible(true);

    const handleActivate = () => {
      setIsActive(true);
    };
    
    window.addEventListener("activate-custom-cursor", handleActivate);

    const moveCursor = (e: MouseEvent) => {
      // Update exact dot (centered, 6px width -> subtract 3)
      exactX.set(e.clientX - 3);
      exactY.set(e.clientY - 3);
      
      // Update trailing glow (centered, 24px width -> subtract 12)
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor when hovering over clickable items
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("activate-custom-cursor", handleActivate);
    };
  }, [cursorX, cursorY, exactX, exactY]);

  if (!isVisible) return null;

  return (
    <>
      {isActive && <style>{`* { cursor: none !important; }`}</style>}
      
      {/* Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: "var(--cursor-color, #D4AF37)",
          boxShadow: "0 0 20px 5px var(--cursor-color, rgba(212,175,55,0.6))",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isActive ? (isHovering ? 0.3 : 0.8) : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Exact Laser Point */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] shadow-[0_0_10px_2px_#ffffff]"
        style={{
          x: exactX,
          y: exactY,
        }}
        animate={{
          scale: isActive && !isHovering ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
