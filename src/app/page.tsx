import Hero from "@/components/sections/Hero";
import { getGalleryImages } from "@/lib/gallery";
import Services from "@/components/sections/Services";
import DesignGallery from "@/components/sections/DesignGallery";
import Projects from "@/components/sections/Projects";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Process from "@/components/sections/Process";
import Materials from "@/components/sections/Materials";
import Stats from "@/components/sections/Stats";
import MaterialVisualizer from "@/components/sections/MaterialVisualizer";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import GlowingDivider from "@/components/ui/GlowingDivider";
import { createClient } from "@/utils/supabase/server";
import Vision from "@/components/sections/Vision";

// Revalidate this page every hour (3600 seconds) or when data changes
export const revalidate = 3600;

export default async function Home() {
  const supabase = await createClient();

  // Fetch Featured Projects
  const { data: featuredProjects } = await supabase
    .from('featured_projects')
    .select('*')
    .order('order_index', { ascending: true });

  // Fetch Testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  // Get gallery images for the category thumbnails
  const galleryImages = getGalleryImages();
  const categoryThumbnails: Record<string, string> = {};
  for (const item of galleryImages) {
    const uppercaseCategory = item.category.toUpperCase();
    if (!categoryThumbnails[uppercaseCategory]) {
      categoryThumbnails[uppercaseCategory] = item.image;
    }
  }

  return (
    <div className="bg-transparent">
      <Hero />
      <GlowingDivider />
      <FeaturedProjects projects={featuredProjects || []} />
      <Services categoryThumbnails={categoryThumbnails} />
      <Vision />
      <MaterialVisualizer />
      <GlowingDivider />
      <Projects />
      {/* <Process /> */}
      <Materials />
      <Stats />
      <Testimonials testimonials={testimonials || []} />
      <ContactForm />
    </div>
  );
}
