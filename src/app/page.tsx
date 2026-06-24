import Hero from "@/components/sections/Hero";

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

  // Fetch Gallery Images for Thumbnails
  const { data: galleryDesigns } = await supabase
    .from('gallery_designs')
    .select('category, image_url')
    .order('created_at', { ascending: false });

  // Fetch Company Stats
  const { data: companyStats } = await supabase
    .from('company_stats')
    .select('*')
    .eq('id', 1)
    .single();

  let finalFeaturedProjects = featuredProjects || [];
  if (finalFeaturedProjects.length === 0 && galleryDesigns && galleryDesigns.length > 0) {
    const shuffled = [...galleryDesigns].sort(() => 0.5 - Math.random());
    finalFeaturedProjects = shuffled.slice(0, 4).map((item, idx) => ({
      id: `random-fallback-${idx}`,
      title: item.category || 'Custom Design',
      description: 'A beautiful laser-cut custom design from our gallery portfolio.',
      image_url: item.image_url,
      order_index: idx
    }));
  }

  const categoryThumbnails: Record<string, string> = {};
  if (galleryDesigns) {
    for (const item of galleryDesigns) {
      if (!item.category) continue;
      const uppercaseCategory = item.category.toUpperCase();
      if (!categoryThumbnails[uppercaseCategory]) {
        const isJfif = item.image_url.toLowerCase().endsWith('.jfif');
        categoryThumbnails[uppercaseCategory] = isJfif ? item.image_url : decodeURIComponent(item.image_url);
      }
    }
  }

  let heroSliderImages = galleryDesigns
    ?.filter(item => item.category === 'Hero Slider')
    .map(item => item.image_url)
    .slice(0, 4) || [];

  // Fallback to latest 4 gallery images if no dedicated hero images exist
  if (heroSliderImages.length === 0) {
    heroSliderImages = galleryDesigns
      ?.map(item => item.image_url)
      .slice(0, 4) || [];
  }

  return (
    <div className="bg-transparent">
      <Hero customImages={heroSliderImages} />
      <GlowingDivider />
      <FeaturedProjects projects={finalFeaturedProjects} />
      <Services categoryThumbnails={categoryThumbnails} />
      <Vision />
      {/* <MaterialVisualizer /> */}
      <GlowingDivider />
      <Projects />
      {/* <Process /> */}
      {/* <Materials /> */}
      <Stats customStats={companyStats} />
      <Testimonials testimonials={testimonials || []} />
      <ContactForm />
    </div>
  );
}
