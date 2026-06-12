import GlowBorderCard from "@/components/ui/GlowBorderCard";

export default function GlowingDivider() {
  return (
    <div className="w-full h-1 bg-black overflow-hidden flex items-center justify-center">
      <GlowBorderCard 
        width="100%" 
        height="4px" 
        borderRadius="0"
        borderWidth="4px"
        blurAmount="8px"
        animationDuration={3}
        colorPreset="darkCenterLightEdges"
      />
    </div>
  );
}
