import React, { useState, memo, useMemo } from "react";
import { Search, Wifi, Volume2, Battery, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";
import { useRoutePreload } from "@/hooks/useRoutePreload";

interface TaskbarProps {
  onStartClick: () => void;
  onSearchClick?: () => void;
}

const Taskbar = memo(({ onStartClick, onSearchClick }: TaskbarProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  
  // Preload common routes
  const { preload: preloadSettings, cancelPreload: cancelPreloadSettings } = useRoutePreload("/settings", !isLowPerformance);
  
  const currentTime = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);
  
  return (
    <div className="h-14 glass-effect border-t flex items-center px-2 gap-2 shadow-os relative overflow-hidden">
      {/* Animated gradient background */}
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer opacity-30" />
      )}
      
      {/* Start Button - Enhanced */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onStartClick}
        className={`h-10 w-10 hover:bg-taskbar-hover relative z-10 group flex items-center justify-center ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}
      >
        <Menu className={`h-5 w-5 ${!isLowPerformance ? 'transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12' : ''}`} />
      </Button>

      {/* Enhanced Search */}
      <div 
        className="relative max-w-md cursor-pointer group z-10 flex items-center"
        onClick={onSearchClick}
      >
        <Search className={`absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none ${!isLowPerformance ? 'transition-all duration-300 group-hover:text-primary group-hover:scale-110' : ''}`} />
        <Input
          placeholder="Search"
          className={`pl-10 h-9 bg-muted/50 border-border/50 focus-visible:ring-1 cursor-pointer ${!isLowPerformance ? 'transition-all duration-500 hover:bg-muted/70 hover:shadow-lg hover:shadow-primary/10' : ''}`}
          readOnly
        />
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Enhanced System Tray */}
      <div className="flex items-center gap-2 px-2 border-l border-border/50 z-10">
        <Button variant="ghost" size="icon" className={`h-8 w-8 hover:bg-taskbar-hover group relative overflow-hidden ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}>
          {!isLowPerformance && (
            <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
          )}
          <Wifi className={`h-4 w-4 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:text-primary' : ''}`} />
        </Button>
        <Button variant="ghost" size="icon" className={`h-8 w-8 hover:bg-taskbar-hover group relative overflow-hidden ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}>
          {!isLowPerformance && (
            <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
          )}
          <Volume2 className={`h-4 w-4 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:text-primary' : ''}`} />
        </Button>
        <Button variant="ghost" size="icon" className={`h-8 w-8 hover:bg-taskbar-hover group relative overflow-hidden ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}>
          {!isLowPerformance && (
            <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
          )}
          <Battery className={`h-4 w-4 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:text-primary' : ''}`} />
        </Button>
        <div className={`text-sm font-medium px-2 cursor-pointer ${!isLowPerformance ? 'transition-all duration-300 hover:text-primary hover:scale-105' : ''}`}>
          {currentTime}
        </div>
      </div>
    </div>
  );
});

Taskbar.displayName = "Taskbar";

export default Taskbar;
