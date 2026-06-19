import Hero from "@/components/sections/Hero";
import { getGalleryImages } from "@/lib/gallery";
import GlowingDivider from "@/components/ui/GlowingDivider";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";

const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Vision = dynamic(() => import("@/components/sections/Vision"));
const MaterialVisualizer = dynamic(() => import("@/components/sections/MaterialVisualizer"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Materials = dynamic(() => import("@/components/sections/Materials"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const ContactForm = dynamic(() => import("@/components/sections/ContactForm"));

// Revalidate this page every hour (3600 seconds) or when data changes
export const revalidate = 3600;

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
