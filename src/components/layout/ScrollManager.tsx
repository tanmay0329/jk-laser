"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Only handle top-level routes that map to sections on the homepage
    const sections = ["about", "gallery", "materials", "process", "projects", "contact"];
    const currentSection = pathname.replace("/", "");

    if (sections.includes(currentSection)) {
      // Small delay to ensure the DOM is ready and any page transition animations have started
      setTimeout(() => {
        const element = document.getElementById(currentSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
