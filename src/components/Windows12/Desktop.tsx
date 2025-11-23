import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, Settings } from "lucide-react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import DesktopIcon from "./DesktopIcon";
import PersonalizationPanel from "@/components/PersonalizationPanel";
import NotificationCenter from "@/components/NotificationCenter";
import ContextMenu from "@/components/ContextMenu";
import ClockWidget from "@/components/Widgets/ClockWidget";
import WeatherWidget from "@/components/Widgets/WeatherWidget";
import CalendarWidget from "@/components/Widgets/CalendarWidget";
import { useNotifications } from "@/contexts/NotificationContext";
import { useIconPositions } from "@/hooks/useIconPositions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSettings } from "@/contexts/SettingsContext";
import { DESKTOP_APPS } from "@/constants/apps";
import { ContextMenuItem } from "@/types";


const Desktop = memo(() => {
  const navigate = useNavigate();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; iconId?: string } | null>(null);
  const [showWidgets, setShowWidgets] = useLocalStorage("show-widgets", false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const { addNotification } = useNotifications();
  const { getIconPosition } = useIconPositions(windowSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIconDoubleClick = useCallback((icon: typeof DESKTOP_APPS[0]) => {
    const appRoutes: Record<string, string> = {
      Calculator: "/calculator",
      Clock: "/clock",
      Notes: "/notes",
      Gallery: "/gallery",
      Settings: "/settings",
      Weather: "/weather",
      Music: "/music",
      Files: "/files",
      Calendar: "/calendar",
      Browser: "/browser",
      Email: "/email",
      Maps: "/maps",
      Phone: "/phone",
      Messages: "/messages",
      Camera: "/camera",
    };
    
    const route = appRoutes[icon.name];
    if (route) {
      navigate(route);
    }

    addNotification({
      title: "App Opened",
      message: `${icon.name} has been launched`,
      type: "info",
    });
  }, [navigate, addNotification]);

  const handleContextMenu = useCallback((e: React.MouseEvent, iconId?: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, iconId });
  }, []);

  const toggleWidgets = useCallback(() => {
    setShowWidgets(!showWidgets);
  }, [showWidgets, setShowWidgets]);

  const getContextMenuItems = useCallback((iconId?: string): ContextMenuItem[] => {
    if (iconId) {
      return [
        { 
          label: "Open", 
          icon: Settings, 
          onClick: () => {
            const icon = DESKTOP_APPS.find(i => i.id === iconId);
            if (icon) handleIconDoubleClick(icon);
          }
        },
      ];
    }
    return [
      { label: "Personalization", icon: Palette, onClick: () => setIsPersonalizationOpen(true) },
      { label: showWidgets ? "Hide widgets" : "Show widgets", icon: Settings, onClick: toggleWidgets },
    ];
  }, [handleIconDoubleClick, showWidgets, toggleWidgets]);


  return (
    <div 
      className="h-screen w-screen flex flex-col overflow-hidden relative"
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      {showWidgets && (
        <div className="fixed top-20 right-8 z-30 flex flex-col gap-6 pointer-events-auto">
          <div className={!isLowPerformance ? "transform hover:scale-105 transition-transform duration-300 animate-fade-in-down" : ""}>
            <ClockWidget />
          </div>
          <div className={!isLowPerformance ? "transform hover:scale-105 transition-transform duration-300 animate-fade-in-down" : ""} style={!isLowPerformance ? { animationDelay: "50ms" } : {}}>
            <WeatherWidget />
          </div>
          <div className={!isLowPerformance ? "transform hover:scale-105 transition-transform duration-300 animate-fade-in-down" : ""} style={!isLowPerformance ? { animationDelay: "100ms" } : {}}>
            <CalendarWidget />
          </div>
        </div>
      )}

      <div className="flex-1 p-8 overflow-auto relative z-10">
        {DESKTOP_APPS.map((icon, index) => {
          const position = getIconPosition(icon.id, index);
          return (
            <div
              key={icon.id}
              onContextMenu={(e) => handleContextMenu(e, icon.id)}
              className={`absolute cursor-default ${!isLowPerformance ? 'transition-all duration-300 hover:scale-105 animate-fade-in-up' : ''}`}
              style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px`,
                ...((!isLowPerformance && { animationDelay: `${index * 30}ms` }) || {})
              }}
            >
              <DesktopIcon
                name={icon.name}
                icon={icon.icon}
                onDoubleClick={() => handleIconDoubleClick(icon)}
              />
            </div>
          );
        })}
      </div>

      {isStartMenuOpen && (
        <StartMenu
          onClose={() => setIsStartMenuOpen(false)} 
          onAppOpen={(appName) => {
            const icon = DESKTOP_APPS.find(i => i.name === appName);
            if (icon) handleIconDoubleClick(icon);
          }}
        />
      )}

      <Taskbar
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onSearchClick={() => setIsStartMenuOpen(true)}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={getContextMenuItems(contextMenu.iconId)}
        />
      )}

      {isPersonalizationOpen && (
        <PersonalizationPanel onClose={() => setIsPersonalizationOpen(false)} />
      )}

      {isNotificationCenterOpen && (
        <NotificationCenter onClose={() => setIsNotificationCenterOpen(false)} />
      )}
    </div>
  );
});

Desktop.displayName = "Desktop";

export default Desktop;
