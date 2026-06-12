import Hero from "@/components/sections/Hero";
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
  return (
    <>
      <Hero />
      <GlowingDivider />
      <Services />
      <MaterialVisualizer />
      <GlowingDivider />
      <DesignGallery />
      <GlowingDivider />
      <Projects />
      <Process />
      <Materials />
      <Stats />
      <Testimonials />
      <ContactForm />
    </>
  );
}
