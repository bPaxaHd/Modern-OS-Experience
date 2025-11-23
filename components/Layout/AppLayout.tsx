import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSettings } from "@/contexts/SettingsContext";

interface AppLayoutProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

const AppLayout = ({ title, icon: Icon, children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentOS } = useSettings();

  const handleBack = () => {
    const shouldShowMobile = currentOS === "android" || (currentOS === "auto" && isMobile);
    
    if (shouldShowMobile) {
      const searchParams = new URLSearchParams(location.search);
      const fromPage = searchParams.get("fromPage");

      if (fromPage) {
        navigate(`/pages/${fromPage}` , { replace: true });
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 glass-effect border-b border-border/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-background">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
