import { getGalleryImages } from "@/lib/gallery";
import DesignGallery from "@/components/sections/DesignGallery";

export const metadata = {
  title: "Design Gallery | JK Laser",
  description: "Browse our premium laser cut designs.",
};

export default function GalleryPage() {
  const galleryImages = getGalleryImages();
  
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
      <DesignGallery initialItems={galleryImages} />
    </div>
  );
}
