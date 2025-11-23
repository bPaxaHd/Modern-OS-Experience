import React, { useState, useEffect, memo } from "react";
import { Wifi, Battery, Signal } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const StatusBar = memo(() => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`h-8 glass-effect flex items-center justify-between px-4 text-xs relative overflow-hidden ${!isLowPerformance ? 'animate-fade-in-down' : ''}`}>
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-shimmer opacity-20" />
      )}
      <div className="flex items-center gap-2 relative z-10">
        <span className={`font-medium ${!isLowPerformance ? 'transition-all duration-300 hover:text-primary hover:scale-105' : ''}`}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <Signal className={`h-3.5 w-3.5 ${!isLowPerformance ? 'transition-all duration-300 hover:text-primary hover:scale-110 animate-pulse' : ''}`} style={!isLowPerformance ? { animationDuration: '3s' } : {}} />
        <Wifi className={`h-3.5 w-3.5 ${!isLowPerformance ? 'transition-all duration-300 hover:text-primary hover:scale-110' : ''}`} />
        <Battery className={`h-3.5 w-3.5 ${!isLowPerformance ? 'transition-all duration-300 hover:text-primary hover:scale-110' : ''}`} />
      </div>
    </div>
  );
});

StatusBar.displayName = "StatusBar";

export default StatusBar;
