import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Power, User, Folder, Globe, Mail, Calendar, Image, FileText, Calculator, Clock, Phone, MessageSquare, Camera } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import AppButton from "./AppButton";

interface StartMenuProps {
  onClose: () => void;
  onAppOpen?: (appName: string) => void;
}

const StartMenu = memo(({ onClose, onAppOpen }: StartMenuProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [searchQuery, setSearchQuery] = React.useState("");

  const pinnedApps = [
    { name: "Calculator", icon: Calculator, route: "/calculator" },
    { name: "Clock", icon: Clock, route: "/clock" },
    { name: "Notes", icon: FileText, route: "/notes" },
    { name: "Gallery", icon: Image, route: "/gallery" },
    { name: "Settings", icon: Settings, route: "/settings" },
    { name: "Browser", icon: Globe, route: "/browser" },
    { name: "Phone", icon: Phone, route: "/phone" },
    { name: "Messages", icon: MessageSquare, route: "/messages" },
    { name: "Camera", icon: Camera, route: "/camera" },
    { name: "Email", icon: Mail, route: "/email" },
    { name: "Calendar", icon: Calendar, route: "/calendar" },
    { name: "Files", icon: Folder, route: "/files" },
  ];

  const handleAppOpen = useCallback((appName: string) => {
    onAppOpen?.(appName);
    onClose();
  }, [onAppOpen, onClose]);

  const filteredApps = React.useMemo(
    () => pinnedApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-background/20 backdrop-blur-sm ${!isLowPerformance ? 'animate-fade-in' : ''}`} onClick={onClose} />
      <div className={`fixed bottom-16 left-4 w-[600px] h-[680px] glass-effect rounded-2xl shadow-window z-50 flex flex-col overflow-hidden border-2 border-primary/10 relative ${!isLowPerformance ? 'animate-slide-in animate-scale-in' : ''}`}>
        {/* Animated background */}
        {!isLowPerformance && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </>
        )}
        
        {/* Search - Enhanced */}
        <div className="p-6 pb-4 relative z-10">
          <div className="relative group">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${!isLowPerformance ? 'transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110' : ''}`} />
            <Input
              placeholder="Search apps, settings, and documents"
              className={`pl-12 h-12 bg-background/50 border-border text-base ${!isLowPerformance ? 'transition-all duration-500 focus:shadow-lg focus:shadow-primary/20 focus:border-primary/50' : ''}`}
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {!isLowPerformance && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Pinned Apps - Enhanced */}
        <div className="flex-1 px-6 pb-6 overflow-auto relative z-10">
          <h3 className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
            <span>Pinned</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          {filteredApps.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">No apps found</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {filteredApps.map((app, index) => (
                <AppButton
                  key={index}
                  name={app.name}
                  icon={app.icon}
                  route={app.route}
                  index={index}
                  isLowPerformance={isLowPerformance}
                  onClick={() => handleAppOpen(app.name)}
                />
              ))}
            </div>
          )}

          <h3 className="text-sm font-semibold mt-8 mb-4 text-muted-foreground flex items-center gap-2">
            <span>Recommended</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`w-full justify-start h-16 hover:bg-muted/70 group relative overflow-hidden rounded-xl ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}
                onClick={onClose}
              >
                {!isLowPerformance && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 
                                group-hover:bg-primary/20 
                                relative overflow-hidden z-10
                                ${!isLowPerformance ? 'transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/20' : ''}`}>
                  {!isLowPerformance && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <Folder className={`h-5 w-5 relative z-10 ${!isLowPerformance ? 'transition-transform duration-500 group-hover:scale-125' : ''}`} />
                </div>
                <div className="flex-1 text-left relative z-10">
                  <div className={`text-sm font-medium ${!isLowPerformance ? 'transition-all duration-300 group-hover:text-primary' : ''}`}>Document {item}</div>
                  <div className={`text-xs text-muted-foreground ${!isLowPerformance ? 'transition-colors duration-200' : ''}`}>Modified recently</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced User Profile */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-background/50 backdrop-blur-xl relative z-10">
          {!isLowPerformance && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          )}
          <Button variant="ghost" className={`justify-start flex-1 hover:bg-muted/70 group relative overflow-hidden rounded-lg ${!isLowPerformance ? 'transition-all duration-500' : ''}`}>
            {!isLowPerformance && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <User className={`h-5 w-5 mr-3 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:text-primary' : ''}`} />
            <span className={`relative z-10 ${!isLowPerformance ? 'transition-colors duration-200 group-hover:text-primary' : ''}`}>User Profile</span>
          </Button>
          <Button variant="ghost" size="icon" className={`hover:bg-muted/70 group relative overflow-hidden rounded-lg ${!isLowPerformance ? 'transition-all duration-500 hover-glow' : ''}`}>
            {!isLowPerformance && (
              <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
            )}
            <Power className={`h-5 w-5 relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:scale-110 group-hover:rotate-90 group-hover:text-primary' : ''}`} />
          </Button>
        </div>
      </div>
    </>
  );
});

StartMenu.displayName = "StartMenu";

export default StartMenu;
