import React, { memo } from "react";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const WeatherWidget = memo(() => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const weather = {
    temp: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
  };

  return (
    <div className={`glass-effect rounded-xl p-6 shadow-window min-w-[200px] relative overflow-hidden group ${!isLowPerformance ? 'hover-lift' : ''}`}>
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Cloud className={`h-5 w-5 text-primary ${!isLowPerformance ? 'transition-all duration-500 group-hover:scale-110 animate-float' : ''}`} />
        <h3 className={`font-semibold ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-primary' : ''}`}>Weather</h3>
      </div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <div className={`text-4xl font-bold ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-105' : ''}`}>{weather.temp}°</div>
          <div className={`text-sm text-muted-foreground ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-foreground' : ''}`}>{weather.condition}</div>
        </div>
        <Sun className={`h-12 w-12 text-primary ${!isLowPerformance ? 'transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 animate-glow-pulse' : ''}`} />
      </div>
      <div className="space-y-2 text-sm relative z-10">
        <div className={`flex items-center justify-between ${!isLowPerformance ? 'transition-all duration-300 hover:translate-x-1' : ''}`}>
          <span className="text-muted-foreground">Humidity</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        <div className={`flex items-center justify-between ${!isLowPerformance ? 'transition-all duration-300 hover:translate-x-1' : ''}`}>
          <span className="text-muted-foreground">Wind</span>
          <span className="font-medium">{weather.wind} km/h</span>
        </div>
      </div>
    </div>
  );
});

WeatherWidget.displayName = "WeatherWidget";

export default WeatherWidget;
