import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Volume2, Bell, Wifi, Bluetooth, Battery, Globe, Shield, User, Palette, Image as ImageIcon, Smartphone, Laptop, Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSettings } from "@/contexts/SettingsContext";
import PersonalizationPanel from "@/components/PersonalizationPanel";
import NotificationCenter from "@/components/NotificationCenter";

const Settings = () => {
  const isMobile = useIsMobile();
  const { currentOS, setCurrentOS, theme, setTheme, wallpaper, setWallpaper, accentColor, setAccentColor, performanceMode, setPerformanceMode } = useSettings();
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    wifi: true,
    bluetooth: false,
    volume: [70],
    brightness: [80],
    language: "en",
  });

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

  const handleToggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} ${settings[key as keyof typeof settings] ? 'disabled' : 'enabled'}`);
  };

  const settingSections = [
    {
      title: "System",
      icon: Monitor,
      items: [
        {
          label: "Operating System",
          type: "custom",
          render: () => (
            <div className="flex gap-2">
              <Button
                variant={currentOS === "auto" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentOS("auto");
                  toast.success("OS set to Auto");
                }}
              >
                <Laptop className="h-4 w-4 mr-2" />
                Auto
              </Button>
              <Button
                variant={currentOS === "android" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentOS("android");
                  toast.success("OS set to Android");
                }}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Android
              </Button>
            </div>
          ),
        },
        {
          label: "Performance Mode",
          type: "custom",
          render: () => (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  variant={performanceMode === "low" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setPerformanceMode("low");
                    toast.success("Low performance mode enabled (reduced animations for better performance)");
                  }}
                  className="flex-1"
                >
                  Low Performance
                </Button>
                <Button
                  variant={performanceMode === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setPerformanceMode("high");
                    toast.success("High performance mode enabled (all animations and effects)");
                  }}
                  className="flex-1"
                >
                  High Performance
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {performanceMode === "low" 
                  ? "Reduced animations mode for slower devices (default)" 
                  : "Full animations and effects for powerful devices"}
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          label: "Theme",
          type: "custom",
          render: () => (
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTheme("light");
                  toast.success("Light theme enabled");
                }}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTheme("dark");
                  toast.success("Dark theme enabled");
                }}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          ),
        },
        {
          label: "Wallpaper",
          type: "custom",
          render: () => (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setWallpaper(wp.id);
                    toast.success(`Wallpaper changed to ${wp.name}`);
                  }}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all relative bg-gradient-to-br ${wp.gradient} ${
                    wallpaper === wp.id ? 'border-primary scale-95' : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="absolute bottom-1 left-0 right-0 text-xs text-center text-foreground font-medium drop-shadow-lg">{wp.name}</div>
                </button>
              ))}
            </div>
          ),
        },
        {
          label: "Accent Color",
          type: "custom",
          render: () => (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => {
                    setAccentColor(color.hsl);
                    toast.success(`Accent color changed to ${color.name}`);
                  }}
                  className={`h-12 rounded-lg border-2 transition-all ${
                    accentColor === color.hsl ? 'border-foreground scale-95' : 'border-border/50 hover:border-foreground/50'
                  }`}
                  style={{ backgroundColor: `hsl(${color.hsl})` }}
                >
                  <div className="text-xs mt-8 text-white font-medium">{color.name}</div>
                </button>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      title: "Display",
      icon: Monitor,
      items: [
        {
          label: "Brightness",
          type: "slider",
          value: settings.brightness,
          onChange: (value: number[]) => setSettings({ ...settings, brightness: value }),
        },
      ],
    },
    {
      title: "Sound",
      icon: Volume2,
      items: [
        {
          label: "System Sounds",
          type: "switch",
          value: settings.sounds,
          onChange: () => handleToggle("sounds"),
        },
        {
          label: "Volume",
          type: "slider",
          value: settings.volume,
          onChange: (value: number[]) => setSettings({ ...settings, volume: value }),
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Enable Notifications",
          type: "switch",
          value: settings.notifications,
          onChange: () => handleToggle("notifications"),
        },
        {
          label: "Notification Center",
          type: "custom",
          render: () => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="w-full justify-start"
            >
              <Bell className="h-4 w-4 mr-2" />
              Open Notification Center
            </Button>
          ),
        },
      ],
    },
    {
      title: "Personalization",
      icon: Palette,
      items: [
        {
          label: "Advanced Personalization",
          type: "custom",
          render: () => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPersonalizationOpen(true)}
              className="w-full justify-start"
            >
              <Palette className="h-4 w-4 mr-2" />
              Open Personalization Panel
            </Button>
          ),
        },
      ],
    },
    {
      title: "Network",
      icon: Wifi,
      items: [
        {
          label: "WiFi",
          type: "switch",
          value: settings.wifi,
          onChange: () => handleToggle("wifi"),
        },
        {
          label: "Bluetooth",
          type: "switch",
          value: settings.bluetooth,
          onChange: () => handleToggle("bluetooth"),
        },
      ],
    },
    {
      title: "System",
      icon: Globe,
      items: [
        {
          label: "Language",
          type: "select",
          value: settings.language,
          options: [
            { value: "en", label: "English" },
            { value: "ru", label: "Русский" },
            { value: "es", label: "Español" },
          ],
          onChange: (value: string) => {
            setSettings({ ...settings, language: value });
            toast.success("Language updated");
          },
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-background overflow-auto">
      <div className={isMobile ? 'p-4' : 'p-6'}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-light ${isMobile ? 'mb-6' : 'mb-8'}`}>Settings</h1>

        {/* Quick Status Cards */}
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4 ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className="p-4 bg-card rounded-xl border border-border burgundy-border animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <Battery className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-light">95%</div>
            <div className="text-xs text-muted-foreground">Battery</div>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border burgundy-border animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <Wifi className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-light">Fast</div>
            <div className="text-xs text-muted-foreground">WiFi</div>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border burgundy-border animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Shield className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-light">On</div>
            <div className="text-xs text-muted-foreground">Security</div>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border burgundy-border animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <User className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-light">User</div>
            <div className="text-xs text-muted-foreground">Account</div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, index) => (
            <div key={section.title} className="bg-card rounded-xl border border-border burgundy-border p-6 animate-fade-in-up" style={{ animationDelay: `${400 + index * 100}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-medium">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div key={index} className={item.type === "custom" ? "py-2" : "flex items-center justify-between py-2"}>
                    {item.type !== "custom" && <Label className="text-base">{item.label}</Label>}
                    {item.type === "custom" && (
                      <div>
                        <Label className="text-base block mb-2">{item.label}</Label>
                        {item.render?.()}
                      </div>
                    )}
                    {item.type === "switch" && (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={item.onChange}
                      />
                    )}
                    {item.type === "slider" && (
                      <div className="w-48">
                        <Slider
                          value={item.value as number[]}
                          onValueChange={item.onChange}
                          max={100}
                          step={1}
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                    {item.type === "select" && (
                      <Select value={item.value as string} onValueChange={item.onChange}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options?.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="outline" className="flex-1">
            Reset to Defaults
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 burgundy-glow">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Personalization Panel */}
      {isPersonalizationOpen && (
        <PersonalizationPanel onClose={() => setIsPersonalizationOpen(false)} />
      )}

      {/* Notification Center */}
      {isNotificationCenterOpen && (
        <NotificationCenter onClose={() => setIsNotificationCenterOpen(false)} />
      )}
    </div>
  );
};

export default Settings;
