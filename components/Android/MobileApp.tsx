import React, { memo } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface MobileAppProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  onMinimize: () => void;
}

const MobileApp = memo(({ title, icon: Icon, children, onMinimize }: MobileAppProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-background ${!isLowPerformance ? 'animate-fade-in' : ''}`}>
      {/* App Header */}
      <div className={`h-14 glass-effect border-b border-border/50 flex items-center justify-between px-4 shrink-0 ${!isLowPerformance ? 'animate-slide-in-down' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onMinimize}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* App Content */}
      {showContent && (
        <div 
          className={`flex-1 overflow-auto bg-background ${!isLowPerformance ? 'animate-fade-in-up' : ''}`}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

MobileApp.displayName = "MobileApp";

export default MobileApp;
