import Hero from "@/components/sections/Hero";
import { getGalleryImages } from "@/lib/gallery";
import Services from "@/components/sections/Services";
import DesignGallery from "@/components/sections/DesignGallery";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Materials from "@/components/sections/Materials";
import Stats from "@/components/sections/Stats";
import MaterialVisualizer from "@/components/sections/MaterialVisualizer";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import GlowingDivider from "@/components/ui/GlowingDivider";

export default function Home() {
  const galleryImages = getGalleryImages();

  // Get the first image of each category to use as the thumbnail for the Services section
  const categoryThumbnails: Record<string, string> = {};
  for (const item of galleryImages) {
    const uppercaseCategory = item.category.toUpperCase();
    if (!categoryThumbnails[uppercaseCategory]) {
      categoryThumbnails[uppercaseCategory] = item.image;
    }
  }

  return (
    <div className="bg-black">
      <Hero />
      <GlowingDivider />
      <Services categoryThumbnails={categoryThumbnails} />
      <MaterialVisualizer />
      <GlowingDivider />
      <Projects />
      <Process />
      <Materials />
      <Stats />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
