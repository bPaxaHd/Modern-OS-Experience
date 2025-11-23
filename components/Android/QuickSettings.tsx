import React, { useState, memo } from "react";
import { X, Wifi, Bluetooth, Volume2, Sun, Moon, Plane, Vibrate, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";

interface QuickSettingsProps {
  onClose: () => void;
}

const QuickSettings = memo(({ onClose }: QuickSettingsProps) => {
  const { theme, setTheme, performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    vibrate: false,
  });
  const [brightness, setBrightness] = useState([70]);
  const [volume, setVolume] = useState([60]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast.success(`${key} ${settings[key] ? 'disabled' : 'enabled'}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} theme enabled`);
  };

  const quickToggles = [
    { id: 'wifi', icon: Wifi, label: 'WiFi', active: settings.wifi, onClick: () => toggleSetting('wifi') },
    { id: 'bluetooth', icon: Bluetooth, label: 'Bluetooth', active: settings.bluetooth, onClick: () => toggleSetting('bluetooth') },
    { id: 'airplane', icon: Plane, label: 'Airplane', active: settings.airplane, onClick: () => toggleSetting('airplane') },
    { id: 'vibrate', icon: Vibrate, label: 'Vibrate', active: settings.vibrate, onClick: () => toggleSetting('vibrate') },
    { id: 'darkMode', icon: theme === 'dark' ? Moon : Sun, label: 'Theme', active: theme === 'dark', onClick: toggleTheme },
  ];

  return (
    <div className={`fixed inset-0 bg-background/95 z-50 flex flex-col ${!isLowPerformance ? 'backdrop-blur-lg animate-slide-in-right' : ''}`}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
        <h2 className="text-xl font-medium">Quick Settings</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Status Bar */}
        <div className={`rounded-2xl p-4 border border-border/50 ${!isLowPerformance ? 'glass-effect' : 'bg-card'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Battery</span>
            </div>
            <span className="text-2xl font-light">85%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-primary rounded-full" />
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-3 gap-3">
          {quickToggles.map((toggle) => (
            <button
              key={toggle.id}
              onClick={toggle.onClick}
              className={`p-4 rounded-2xl border ${!isLowPerformance ? 'transition-os' : ''} ${
                toggle.active
                  ? 'bg-primary/20 border-primary/50 text-primary'
                  : `${!isLowPerformance ? 'glass-effect' : 'bg-card'} border-border/50 text-muted-foreground`
              }`}
            >
              <toggle.icon className="h-6 w-6 mb-2" />
              <div className="text-xs font-medium">{toggle.label}</div>
            </button>
          ))}
        </div>

        {/* Brightness Control */}
        <div className={`rounded-2xl p-4 border border-border/50 space-y-3 ${!isLowPerformance ? 'glass-effect' : 'bg-card'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Brightness</span>
            </div>
            <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
          </div>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Volume Control */}
        <div className={`rounded-2xl p-4 border border-border/50 space-y-3 ${!isLowPerformance ? 'glass-effect' : 'bg-card'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Volume</span>
            </div>
            <span className="text-sm text-muted-foreground">{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
});

QuickSettings.displayName = "QuickSettings";

export default QuickSettings;
