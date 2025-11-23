import React, { memo } from "react";
import { useTilt } from "@/hooks/useTilt";
import { useSettings } from "@/contexts/SettingsContext";

interface AppIconProps {
  name: string;
  icon: any;
  color: string;
  compact?: boolean;
  onClick?: () => void;
}

const AppIcon = memo(({ name, icon: Icon, color, compact = false, onClick }: AppIconProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const { ref: tiltRef, transform } = useTilt({ maxTilt: isLowPerformance ? 0 : 12, scale: isLowPerformance ? 1 : 1.1 });

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-2 ${compact ? 'p-0' : 'p-2'} rounded-2xl hover:bg-background/30 group relative ${!isLowPerformance ? 'transition-all duration-500' : ''}`}
    >
      <div 
        ref={!isLowPerformance ? tiltRef : null}
        style={!isLowPerformance ? { transform, transformStyle: "preserve-3d" } : {}}
        className={`
        ${compact ? 'h-14 w-14' : 'h-14 w-14'}
        rounded-[1.25rem] ${color} 
        flex items-center justify-center 
        shadow-xl 
        group-active:scale-95
        relative overflow-hidden
        ${!isLowPerformance ? 'transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-primary/50' : ''}
      `}>
        {!isLowPerformance && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 blur-xl transition-all duration-500 group-hover:scale-150" />
          </>
        )}
        {isLowPerformance && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        )}
        
        <Icon className={`${compact ? 'h-7 w-7' : 'h-7 w-7'} text-white relative z-10 drop-shadow-lg ${!isLowPerformance ? 'group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-500' : ''}`} />
      </div>
      {name && (
        <span className={`text-xs font-semibold text-center line-clamp-1 w-full px-1 text-foreground/90 group-hover:text-foreground ${!isLowPerformance ? 'transition-all duration-300 group-hover:text-primary group-hover:scale-105 group-hover:drop-shadow-md' : ''}`}>
          {name}
        </span>
      )}
    </button>
  );
});

AppIcon.displayName = "AppIcon";

export default AppIcon;
