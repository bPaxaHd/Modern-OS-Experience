import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useSettings();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 group relative overflow-hidden hover-glow transition-all duration-500"
    >
      <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
      {theme === "dark" ? (
        <Sun className="h-4 w-4 relative z-10 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 group-hover:text-primary" />
      ) : (
        <Moon className="h-4 w-4 relative z-10 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 group-hover:text-primary" />
      )}
    </Button>
  );
};

export default ThemeToggle;
