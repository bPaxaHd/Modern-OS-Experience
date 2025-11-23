import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const location = useLocation();
  const { performanceMode, currentOS } = useSettings();
  const isMobile = useIsMobile();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<"fade-in" | "fade-out">("fade-in");

  const shouldShowMobile = currentOS === "android" || (currentOS === "auto" && isMobile);
  const disableAnimation = performanceMode === "low" || shouldShowMobile;

  useEffect(() => {
    if (location !== displayLocation) {
      if (disableAnimation) {
        // На Android и в low performance mode меняем сразу без анимации
        setDisplayLocation(location);
      } else {
        // Начинаем fade-out
        setTransitionStage("fade-out");
      }
    }
  }, [location, displayLocation, disableAnimation]);

  useEffect(() => {
    if (transitionStage === "fade-out" && !disableAnimation) {
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fade-in");
      }, 150); // Длительность fade-out
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location, disableAnimation]);

  return (
    <div
      className={`w-full h-full ${
        disableAnimation
          ? "" 
          : transitionStage === "fade-out" 
            ? "animate-route-fade-out" 
            : "animate-route-fade-in"
      }`}
    >
      {children}
    </div>
  );
};
