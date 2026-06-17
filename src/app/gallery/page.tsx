import DesignGallery from "@/components/sections/DesignGallery";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Design Gallery | JK Laser",
  description: "Browse our premium laser cut designs.",
};

// Revalidate this page every hour (3600 seconds) or when data changes
export const revalidate = 3600;

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: galleryImages } = await supabase
    .from('gallery_designs')
    .select('*')
    .order('created_at', { ascending: false });

  // Map to the format DesignGallery expects
  const formattedImages = (galleryImages || []).map(img => ({
    id: img.id,
    category: img.category,
    designNumber: img.design_number,
    image: img.image_url
  }));

  return (
    <div className="bg-black min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/10 transition-all text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>
      </div>
      {/* Spacer for navbar */}
      <div className="h-10"></div>
      <DesignGallery initialItems={formattedImages} />
    </div>
  );
}
