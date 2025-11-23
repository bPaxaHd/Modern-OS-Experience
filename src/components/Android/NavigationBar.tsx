import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Circle, Square } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface NavigationBarProps {
  onHomeClick: () => void;
  onAppsClick: () => void;
  onRecentClick: () => void;
}

const NavigationBar = memo(({ onHomeClick, onAppsClick, onRecentClick }: NavigationBarProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  return (
    <div className={`h-16 glass-effect border-t flex items-center justify-around px-8 relative overflow-hidden ${!isLowPerformance ? 'animate-fade-in-up' : ''}`}>
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      )}
      <Button
        variant="ghost"
        size="icon"
        className={`h-12 w-12 rounded-full hover:bg-muted group relative z-10 ${!isLowPerformance ? 'transition-all duration-500 overflow-hidden hover-glow' : ''}`}
      >
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
        )}
        <ChevronLeft className={`h-6 w-6 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-0.5' : ''}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onHomeClick}
        className={`h-12 w-12 rounded-full hover:bg-muted group relative z-10 ${!isLowPerformance ? 'transition-all duration-500 overflow-hidden hover-glow' : ''}`}
      >
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
        )}
        <Circle className={`h-6 w-6 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:rotate-180' : ''}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRecentClick}
        className={`h-12 w-12 rounded-full hover:bg-muted group relative z-10 ${!isLowPerformance ? 'transition-all duration-500 overflow-hidden hover-glow' : ''}`}
      >
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
        )}
        <Square className={`h-6 w-6 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:rotate-90' : ''}`} />
      </Button>
    </div>
  );
});

NavigationBar.displayName = "NavigationBar";

export default NavigationBar;
