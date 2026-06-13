import { getGalleryImages } from "@/lib/gallery";
import DesignGallery from "@/components/sections/DesignGallery";

export const metadata = {
  title: "Design Gallery | JK Laser",
  description: "Browse our premium laser cut designs.",
};

export default function GalleryPage() {
  const galleryImages = getGalleryImages();
  
  return (
    <div className="bg-black min-h-screen">
      {/* Spacer for navbar */}
      <div className="h-10"></div>
      <DesignGallery initialItems={galleryImages} />
    </div>
  );
}
