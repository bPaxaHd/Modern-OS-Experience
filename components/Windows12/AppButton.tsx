import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRoutePreload } from "@/hooks/useRoutePreload";
import { LucideIcon } from "lucide-react";

interface AppButtonProps {
  name: string;
  icon: LucideIcon;
  route: string;
  index: number;
  isLowPerformance: boolean;
  onClick: () => void;
}

const AppButton = memo(({ name, icon: Icon, route, index, isLowPerformance, onClick }: AppButtonProps) => {
  const { preload, cancelPreload } = useRoutePreload(route, !isLowPerformance);

  return (
    <Button
      variant="ghost"
      className={`h-28 flex-col gap-2 hover:bg-muted/70 group relative overflow-hidden rounded-xl ${!isLowPerformance ? 'transition-all duration-500 hover-lift animate-fade-in-up' : ''}`}
      style={!isLowPerformance ? { animationDelay: `${index * 30}ms` } : {}}
      onClick={onClick}
      onMouseEnter={preload}
      onMouseLeave={cancelPreload}
    >
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className={`h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center 
                      group-hover:bg-primary/20 
                      relative overflow-hidden z-10
                      ${!isLowPerformance ? 'transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/30' : ''}`}>
        {!isLowPerformance && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </>
        )}
        <Icon className={`h-6 w-6 relative z-10 ${!isLowPerformance ? 'transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6' : ''}`} />
      </div>
      <span className={`text-xs relative z-10 ${!isLowPerformance ? 'transition-all duration-300 group-hover:text-primary group-hover:font-semibold' : ''}`}>{name}</span>
    </Button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;
