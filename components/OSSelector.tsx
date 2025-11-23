import React from "react";
import { Monitor, Smartphone, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

const OSSelector = () => {
  const { currentOS, setCurrentOS } = useSettings();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 glass-effect rounded-lg p-2 animate-fade-in-down shadow-window">
      <Button
        variant={currentOS === "auto" ? "default" : "ghost"}
        size="icon"
        onClick={() => setCurrentOS("auto")}
        className="group h-9 w-9 hover-lift hover-glow transition-all duration-300"
      >
        <Laptop className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      </Button>
      <Button
        variant={currentOS === "windows" ? "default" : "ghost"}
        size="icon"
        onClick={() => setCurrentOS("windows")}
        className="group h-9 w-9 hover-lift hover-glow transition-all duration-300"
      >
        <Monitor className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      </Button>
      <Button
        variant={currentOS === "android" ? "default" : "ghost"}
        size="icon"
        onClick={() => setCurrentOS("android")}
        className="group h-9 w-9 hover-lift hover-glow transition-all duration-300"
      >
        <Smartphone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      </Button>
    </div>
  );
};

export default OSSelector;
