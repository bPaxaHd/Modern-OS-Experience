import React, { useState, useRef, useEffect, memo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import VirtualAppGrid from "./VirtualAppGrid";
import { useSettings } from "@/contexts/SettingsContext";
import {
  Phone, MessageSquare, Chrome, Camera, Mail, Music, Map, Settings,
  Calendar, Calculator, Clock, FileText, Image, Folder, Globe, Video
} from "lucide-react";

interface AppDrawerProps {
  onClose: () => void;
  onAppOpen: (appName: string) => void;
}

const AppDrawer = memo(({ onClose, onAppOpen }: AppDrawerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const allApps = [
    { id: "1", name: "Calculator", icon: Calculator, color: "bg-primary" },
    { id: "2", name: "Clock", icon: Clock, color: "bg-primary/95" },
    { id: "3", name: "Notes", icon: FileText, color: "bg-primary/90" },
    { id: "4", name: "Gallery", icon: Image, color: "bg-primary/85" },
    { id: "5", name: "Settings", icon: Settings, color: "bg-primary/80" },
    { id: "6", name: "Phone", icon: Phone, color: "bg-accent" },
    { id: "7", name: "Messages", icon: MessageSquare, color: "bg-accent/90" },
    { id: "8", name: "Browser", icon: Globe, color: "bg-accent/80" },
    { id: "9", name: "Camera", icon: Camera, color: "bg-accent/70" },
    { id: "10", name: "Email", icon: Mail, color: "bg-secondary" },
    { id: "11", name: "Music", icon: Music, color: "bg-secondary/90" },
    { id: "12", name: "Maps", icon: Map, color: "bg-secondary/80" },
    { id: "13", name: "Calendar", icon: Calendar, color: "bg-secondary/70" },
    { id: "14", name: "Files", icon: Folder, color: "bg-muted" },
    { id: "15", name: "Weather", icon: Chrome, color: "bg-muted/90" },
  ];

  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-background/95 z-50 ${!isLowPerformance ? 'backdrop-blur-sm animate-fade-in-up' : ''}`}
        onClick={onClose} 
      />
      <div className={`fixed inset-0 z-50 flex flex-col pt-8 ${!isLowPerformance ? 'animate-slide-in' : ''}`}>
        {/* Search Bar */}
        <div className="px-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search apps"
              className={`pl-12 h-12 border-border/50 text-base rounded-full ${!isLowPerformance ? 'glass-effect' : 'bg-card'}`}
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Apps Grid */}
        <div 
          ref={containerRef} 
          className="flex-1 px-4 overflow-hidden"
          style={{ 
            touchAction: 'pan-y',
            overscrollBehavior: 'contain'
          }}
        >
          {filteredApps.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No apps found</p>
            </div>
          ) : dimensions.width > 0 ? (
            <VirtualAppGrid
              apps={filteredApps}
              onAppOpen={onAppOpen}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
            />
          ) : null}
        </div>
      </div>
    </>
  );
});

AppDrawer.displayName = "AppDrawer";

export default AppDrawer;
