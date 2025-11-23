import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSettings } from "@/contexts/SettingsContext";
import Desktop from "@/components/Windows12/Desktop";
import HomeScreen from "@/components/Android/HomeScreen";
import BootScreen from "@/components/Effects/BootScreen";
import EnhancedParticles from "@/components/Effects/EnhancedParticles";
import BackgroundEffects from "@/components/Effects/BackgroundEffects";

const Index = () => {
  const isMobile = useIsMobile();
  const { currentOS, wallpaper } = useSettings();
  const [mounted, setMounted] = useState(false);
  const [showBoot, setShowBoot] = useState(() => {
    const hasBooted = sessionStorage.getItem("has-booted");
    return !hasBooted;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousOS, setPreviousOS] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const effectiveOS = currentOS === "auto" ? (isMobile ? "android" : "windows") : currentOS;
    if (previousOS !== null && previousOS !== effectiveOS) {
      setIsTransitioning(true);
      // Ждем 250ms для fade-out, затем меняем OS
      setTimeout(() => {
        setPreviousOS(effectiveOS);
        // Ждем еще 250ms для fade-in нового OS, затем завершаем анимацию
        setTimeout(() => setIsTransitioning(false), 250);
      }, 250);
    } else {
      setPreviousOS(effectiveOS);
    }
  }, [currentOS, isMobile]);

  const handleBootComplete = () => {
    setShowBoot(false);
    sessionStorage.setItem("has-booted", "true");
  };

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const shouldShowMobile = currentOS === "android" || (currentOS === "auto" && isMobile);

  if (showBoot) {
    return <BootScreen os={shouldShowMobile ? "android" : "windows"} onComplete={handleBootComplete} />;
  }

  const getWallpaperClass = () => {
    switch (wallpaper) {
      case "gradient-1":
        return "bg-gradient-to-br from-background via-primary/5 to-background";
      case "gradient-2":
        return "bg-gradient-to-br from-blue-900/20 via-background to-blue-900/20";
      case "gradient-3":
        return "bg-gradient-to-br from-purple-900/20 via-background to-purple-900/20";
      case "gradient-4":
        return "bg-gradient-to-br from-green-900/20 via-background to-green-900/20";
      default:
        return "bg-gradient-to-br from-background via-primary/5 to-background";
    }
  };

  const displayOS = previousOS || (shouldShowMobile ? "android" : "windows");
  const showMobile = displayOS === "android";

  return (
    <div className={`h-screen w-screen ${getWallpaperClass()} relative select-none overflow-hidden`}>
      <BackgroundEffects />
      <EnhancedParticles />
      <div className={isTransitioning ? "animate-os-transition" : ""}>
        {showMobile ? <HomeScreen /> : <Desktop />}
      </div>
    </div>
  );
};

export default Index;
