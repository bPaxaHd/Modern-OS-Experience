import React, { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface OpenApp {
  id: string;
  name: string;
  icon: any;
}

interface RecentAppsProps {
  apps: OpenApp[];
  onClose: () => void;
  onAppClick: (appId: string) => void;
  onAppClose: (appId: string) => void;
  onCloseAll: () => void;
}

const RecentApps = memo(({ apps, onClose, onAppClick, onAppClose, onCloseAll }: RecentAppsProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";

  return (
    <>
      <div className={`fixed inset-0 bg-background/98 z-50 flex flex-col ${!isLowPerformance ? 'backdrop-blur-lg animate-fade-in' : ''}`}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          <h2 className="text-xl font-medium">Recent Apps</h2>
          <div className="flex items-center gap-2">
            {apps.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseAll}
                className="text-muted-foreground hover:text-foreground"
              >
                Close All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="flex-1 overflow-auto p-4">
          {apps.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-muted-foreground">No recent apps</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className={`relative h-48 rounded-2xl bg-card border border-border overflow-hidden group cursor-pointer ${!isLowPerformance ? 'hover:scale-[1.02] transition-os' : ''}`}
                  onClick={() => {
                    onAppClick(app.id);
                    onClose();
                  }}
                >
                  {/* App Preview Header */}
                  <div className={`absolute top-0 left-0 right-0 h-12 border-b border-border/50 flex items-center justify-between px-4 z-10 ${!isLowPerformance ? 'glass-effect' : 'bg-card'}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center">
                        <app.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{app.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${!isLowPerformance ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppClose(app.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* App Preview Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background flex items-center justify-center">
                    <app.icon className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

RecentApps.displayName = "RecentApps";

export default RecentApps;
