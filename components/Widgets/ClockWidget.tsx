import React, { useState, useEffect, memo } from "react";
import { Clock } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const ClockWidget = memo(() => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`glass-effect rounded-xl p-6 shadow-window min-w-[200px] relative overflow-hidden group ${!isLowPerformance ? 'hover-lift' : ''}`}>
      {!isLowPerformance && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </>
      )}
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Clock className={`h-5 w-5 text-primary ${!isLowPerformance ? 'transition-all duration-500 group-hover:rotate-180 group-hover:scale-110' : ''}`} />
        <h3 className={`font-semibold ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-primary' : ''}`}>Clock</h3>
      </div>
      <div className="text-center relative z-10">
        <div className={`text-4xl font-bold mb-2 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-105 animate-glow-pulse' : ''}`}>
          {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className={`text-sm text-muted-foreground ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-foreground' : ''}`}>
          {time.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>
    </div>
  );
});

ClockWidget.displayName = "ClockWidget";

export default ClockWidget;
