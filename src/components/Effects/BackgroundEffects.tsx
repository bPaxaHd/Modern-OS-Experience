import React, { memo } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useSettings } from "@/contexts/SettingsContext";

const BackgroundEffects: React.FC = memo(() => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  
  const parallax1 = useParallax({ speed: 0.3, disabled: isLowPerformance });
  const parallax2 = useParallax({ speed: 0.5, disabled: isLowPerformance });
  const parallax3 = useParallax({ speed: 0.4, disabled: isLowPerformance });

  if (isLowPerformance) {
    return null;
  }

  return (
    <>
      {/* Enhanced gradient orbs with parallax effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={parallax1.ref}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float opacity-20 animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, hsl(345 85% 35% / 0.4), hsl(345 85% 45% / 0.2) 50%, transparent 70%)",
            animationDuration: "12s",
            transform: `translate3d(${parallax1.offset.x}px, ${parallax1.offset.y}px, 0)`,
            willChange: "transform"
          }}
        />
        <div 
          ref={parallax2.ref}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float opacity-20 animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, hsl(345 75% 45% / 0.35), hsl(345 75% 55% / 0.15) 50%, transparent 70%)",
            animationDuration: "15s",
            animationDelay: "3s",
            transform: `translate3d(${parallax2.offset.x}px, ${parallax2.offset.y}px, 0)`,
            willChange: "transform"
          }}
        />
        <div 
          ref={parallax3.ref}
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-float opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(345 85% 50% / 0.3), transparent 70%)",
            animationDuration: "18s",
            animationDelay: "6s",
            transform: `translate3d(${parallax3.offset.x}px, ${parallax3.offset.y}px, 0)`,
            willChange: "transform"
          }}
        />
      </div>

      {/* Enhanced gradient overlay with shimmer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 animate-gradient"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background) / 0.3) 100%)"
        }}
      />

      {/* Subtle moving gradient line */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute top-0 left-0 w-full h-px animate-shimmer"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(345 85% 45% / 0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%"
          }}
        />
      </div>
    </>
  );
});

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;
