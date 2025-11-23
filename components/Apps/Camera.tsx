import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, FlipHorizontal, Zap, Grid3x3, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { ProgressiveImage } from "@/components/Optimized/ProgressiveImage";

const Camera = () => {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [flash, setFlash] = useState(false);
  const [grid, setGrid] = useState(false);
  const [photos] = useState([
    { id: 1, time: "Just now", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4" },
    { id: 2, time: "5 min ago", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e" },
    { id: 3, time: "Today", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  ]);

  const handleCapture = () => {
    if (mode === "photo") {
      toast.success("Photo captured!");
    } else {
      toast.success("Recording started!");
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Camera Viewfinder */}
      <div className="flex-1 relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        {/* Grid Overlay */}
        {grid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        )}

        {/* Camera Icon */}
        <div className="text-center">
          <CameraIcon className={`${isMobile ? 'h-32 w-32' : 'h-48 w-48'} mx-auto mb-4 text-primary/30`} />
          <p className="text-muted-foreground">Camera Preview</p>
        </div>

        {/* Top Controls */}
        <div className={`absolute ${isMobile ? 'top-4' : 'top-6'} left-0 right-0 flex justify-center gap-4 animate-fade-in-down`}>
          <Button
            variant={flash ? "default" : "secondary"}
            size="icon"
            className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-full glass-effect`}
            onClick={() => setFlash(!flash)}
          >
            <Zap className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} ${flash ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant={grid ? "default" : "secondary"}
            size="icon"
            className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-full glass-effect`}
            onClick={() => setGrid(!grid)}
          >
            <Grid3x3 className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-full glass-effect`}
          >
            <FlipHorizontal className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`border-t border-border ${isMobile ? 'p-4' : 'p-6'} bg-card`}>
        {/* Mode Selector */}
        <div className={`flex justify-center gap-6 ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <Button
            variant="ghost"
            className={mode === "photo" ? "text-primary font-semibold" : "text-muted-foreground"}
            onClick={() => setMode("photo")}
          >
            PHOTO
          </Button>
          <Button
            variant="ghost"
            className={mode === "video" ? "text-primary font-semibold" : "text-muted-foreground"}
            onClick={() => setMode("video")}
          >
            VIDEO
          </Button>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Recent Photos */}
          <div className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} rounded-lg overflow-hidden cursor-pointer relative`}>
            {photos[0] && (
              <ProgressiveImage
                src={photos[0].url}
                alt="Recent photo"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-sm font-medium text-white">{photos.length}</span>
            </div>
          </div>

          {/* Capture Button */}
          <Button
            size="icon"
            className={`${isMobile ? 'h-20 w-20' : 'h-24 w-24'} rounded-full bg-primary hover:bg-primary/90 burgundy-glow`}
            onClick={handleCapture}
          >
            <Circle className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'}`} />
          </Button>

          {/* Spacer */}
          <div className={isMobile ? 'h-12 w-12' : 'h-14 w-14'} />
        </div>
      </div>
    </div>
  );
};

export default Camera;
