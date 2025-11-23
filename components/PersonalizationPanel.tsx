import React from "react";
import { X, Palette, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import ThemeToggle from "./ThemeToggle";

interface PersonalizationPanelProps {
  onClose: () => void;
}

const PersonalizationPanel: React.FC<PersonalizationPanelProps> = ({ onClose }) => {
  const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSettings();

  const wallpapers = [
    { id: "gradient-1", name: "Burgundy Gradient", gradient: "from-background via-primary/5 to-background" },
    { id: "gradient-2", name: "Blue Gradient", gradient: "from-blue-900/20 via-background to-blue-900/20" },
    { id: "gradient-3", name: "Purple Gradient", gradient: "from-purple-900/20 via-background to-purple-900/20" },
    { id: "gradient-4", name: "Green Gradient", gradient: "from-green-900/20 via-background to-green-900/20" },
  ];

  const accentColors = [
    { id: "burgundy", name: "Burgundy", hsl: "345 85% 35%" },
    { id: "blue", name: "Blue", hsl: "217 91% 60%" },
    { id: "purple", name: "Purple", hsl: "271 81% 56%" },
    { id: "green", name: "Green", hsl: "142 71% 45%" },
    { id: "orange", name: "Orange", hsl: "25 95% 53%" },
    { id: "pink", name: "Pink", hsl: "330 81% 60%" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-96 glass-effect-strong border-l border-border/50 z-50 flex flex-col animate-slide-in-right shadow-2xl">
        <div className="p-6 border-b border-border/50 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <h2 className="text-xl font-bold relative z-10 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Персонализация
          </h2>
          <div className="flex gap-2 relative z-10">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/10">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6 scrollbar-hide">
          {/* Wallpapers */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <ImageIcon className="h-5 w-5 text-primary relative z-10" />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg" />
              </div>
              <h3 className="font-semibold text-foreground">Обои</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {wallpapers.map((wp, index) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`h-24 rounded-xl bg-gradient-to-br ${wp.gradient} border-2 transition-all duration-300 relative overflow-hidden group animate-zoom-in ${
                    wallpaper === wp.id ? 'border-primary scale-95 shadow-lg shadow-primary/30' : 'border-border/50 hover:border-primary/50 hover:scale-95'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {wallpaper === wp.id && (
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  )}
                  <div className="absolute bottom-2 left-0 right-0 text-xs text-center font-medium text-foreground drop-shadow-lg">
                    {wp.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Palette className="h-5 w-5 text-primary relative z-10" />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg" />
              </div>
              <h3 className="font-semibold text-foreground">Цветовая схема</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {accentColors.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setAccentColor(color.hsl)}
                  className={`h-16 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group animate-zoom-in ${
                    accentColor === color.hsl 
                      ? 'border-foreground scale-95 shadow-xl' 
                      : 'border-border/50 hover:border-foreground/50 hover:scale-95'
                  }`}
                  style={{ 
                    backgroundColor: `hsl(${color.hsl})`,
                    animationDelay: `${index * 50 + 100}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {accentColor === color.hsl && (
                    <div className="absolute inset-0 animate-pulse bg-white/5" />
                  )}
                  <div className="absolute bottom-1 left-0 right-0 text-xs text-center text-white font-semibold drop-shadow-lg">
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizationPanel;
