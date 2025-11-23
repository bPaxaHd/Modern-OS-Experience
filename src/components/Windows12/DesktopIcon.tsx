import React, { useState, memo } from "react";
import RippleEffect from "@/components/Effects/RippleEffect";
import { useTilt } from "@/hooks/useTilt";
import { useSettings } from "@/contexts/SettingsContext";

interface DesktopIconProps {
  name: string;
  icon: any;
  onDoubleClick: () => void;
}

const DesktopIcon = memo(({ name, icon: Icon, onDoubleClick }: DesktopIconProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const { ref: tiltRef, transform } = useTilt({ maxTilt: 10, scale: 1.08, disabled: isLowPerformance });

  const handleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      if (clickCount + 1 >= 2) {
        onDoubleClick();
      }
      setClickCount(0);
    }, 300);

    setClickTimer(timer);
  };

  return (
    <RippleEffect
      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer group ${!isLowPerformance ? 'transition-all duration-300 animate-fade-in-up' : ''}`}
      onClick={handleClick}
    >
      <div 
        ref={!isLowPerformance ? tiltRef : null}
        style={!isLowPerformance ? { transform, transformStyle: "preserve-3d" } : {}}
        className={`w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 
                      group-hover:from-primary/40 group-hover:to-primary/15 
                      relative overflow-hidden
                      group-active:scale-95
                      ${!isLowPerformance ? 'transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20' : ''}`}
      >
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <Icon className={`w-7 h-7 text-primary relative z-10 ${!isLowPerformance ? 'transition-transform duration-300 group-hover:scale-110' : ''}`} />
      </div>
      <span className={`text-xs text-center max-w-[90px] truncate text-foreground/90 group-hover:text-foreground ${!isLowPerformance ? 'transition-all duration-200 group-hover:font-medium' : ''}`}>
        {name}
      </span>
    </RippleEffect>
  );
});

DesktopIcon.displayName = "DesktopIcon";

export default DesktopIcon;
