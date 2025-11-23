import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBar from "./StatusBar";
import NavigationBar from "./NavigationBar";
import AppDrawer from "./AppDrawer";
import AppIcon from "./AppIcon";
import RecentApps from "./RecentApps";
import QuickSettings from "./QuickSettings";
import NotificationPanel from "./NotificationPanel";
import { 
  Phone, MessageSquare, Chrome, Camera, Mail, Music, Map, 
  Settings, Calculator, FileText, Image, Clock, Cloud, 
  Calendar, Folder, Globe, Bell, SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface OpenApp {
  id: string;
  name: string;
  icon: any;
  component: React.ReactNode;
}

const HomeScreen = memo(() => {
  const navigate = useNavigate();
  
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const { page } = useParams<{ page?: string }>();
  const initialPageNumber = parseInt(page || "1", 10);
  const initialPageIndex = isNaN(initialPageNumber) ? 0 : Math.max(0, initialPageNumber - 1);
  const [currentPage, setCurrentPage] = useState(initialPageIndex);
  
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const homeApps = useMemo(() => [
    { id: "1", name: "Phone", icon: Phone, color: "bg-accent" },
    { id: "2", name: "Messages", icon: MessageSquare, color: "bg-accent/90" },
    { id: "3", name: "Browser", icon: Globe, color: "bg-accent/80" },
    { id: "4", name: "Camera", icon: Camera, color: "bg-accent/70" },
    { id: "5", name: "Gallery", icon: Image, color: "bg-primary/90" },
    { id: "6", name: "Music", icon: Music, color: "bg-secondary/90" },
    { id: "7", name: "Maps", icon: Map, color: "bg-secondary/80" },
    { id: "8", name: "Email", icon: Mail, color: "bg-muted/90" },
    { id: "9", name: "Calendar", icon: Calendar, color: "bg-secondary/70" },
    { id: "10", name: "Files", icon: Folder, color: "bg-muted/80" },
    { id: "11", name: "Weather", icon: Cloud, color: "bg-accent/90" },
    { id: "12", name: "Clock", icon: Clock, color: "bg-primary/95" },
    { id: "13", name: "Calculator", icon: Calculator, color: "bg-primary" },
    { id: "14", name: "Notes", icon: FileText, color: "bg-primary/80" },
    { id: "15", name: "Settings", icon: Settings, color: "bg-primary/60" },
  ], []);

  const dockApps = useMemo(() => [
    { id: "d1", name: "Phone", icon: Phone, color: "bg-accent" },
    { id: "d2", name: "Messages", icon: MessageSquare, color: "bg-accent/80" },
    { id: "d3", name: "Browser", icon: Globe, color: "bg-accent/60" },
    { id: "d4", name: "Camera", icon: Camera, color: "bg-accent/40" },
  ], []);

  const handleOpenApp = useCallback((appName: string) => {
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
    
    const route = appRoutes[appName];
    if (route) {
      const pageNumber = currentPage + 1;
      navigate({ pathname: route, search: `?fromPage=${pageNumber}` });
    }
  }, [navigate, currentPage]);

  const appsPerPage = 6;
  const totalPages = useMemo(() => Math.ceil(homeApps.length / appsPerPage), [homeApps]);
  const paginatedApps = useMemo(
    () => homeApps.slice(currentPage * appsPerPage, (currentPage + 1) * appsPerPage),
    [homeApps, currentPage]
  );

  useEffect(() => {
    const pageNumber = currentPage + 1;
    navigate(`/pages/${pageNumber}`, { replace: true });
  }, [currentPage, navigate]);

  // Валидация номера страницы при загрузке
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [totalPages]);


  const applyTransform = useCallback((offset: number, immediate = false) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const translateX = -currentPage * 100;
        const offsetPercent = (offset / windowSize.width) * 100;
        
        if (immediate) {
          containerRef.current.style.transition = 'none';
        }
        
        containerRef.current.style.transform = `translate3d(calc(${translateX}% + ${offsetPercent}%), 0, 0)`;
      }
    });
  }, [currentPage, windowSize.width]);

  const handleSwipeStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    isDraggingRef.current = false;
    isHorizontalSwipeRef.current = null;
  }, []);

  const handleSwipeMove = useCallback((e: React.TouchEvent) => {
    const currentTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    
    // Определяем направление свайпа только один раз
    if (isHorizontalSwipeRef.current === null) {
      const deltaX = Math.abs(currentTouch.x - touchStartRef.current.x);
      const deltaY = Math.abs(currentTouch.y - touchStartRef.current.y);
      
      // Если движение больше по вертикали - это не наш свайп
      if (deltaY > deltaX && deltaY > 5) {
        isHorizontalSwipeRef.current = false;
        return;
      }
      
      // Если движение горизонтальное - начинаем обработку
      if (deltaX > 5) {
        isHorizontalSwipeRef.current = true;
        isDraggingRef.current = true;
        if (containerRef.current) {
          containerRef.current.style.transition = 'none';
        }
      } else {
        return;
      }
    }
    
    // Обрабатываем только горизонтальный свайп
    if (!isHorizontalSwipeRef.current || !isDraggingRef.current) return;
    
    let offset = currentTouch.x - touchStartRef.current.x;
    
    // Эффект "резинки" на границах с более плавным затуханием
    if ((currentPage === 0 && offset > 0) || 
        (currentPage === totalPages - 1 && offset < 0)) {
      offset = offset * 0.25;
    }
    
    applyTransform(offset, true);
  }, [currentPage, totalPages, applyTransform]);

  const handleSwipeEnd = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !isHorizontalSwipeRef.current) {
      isDraggingRef.current = false;
      isHorizontalSwipeRef.current = null;
      return;
    }
    
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStartRef.current.x - touchEnd;
    const velocity = Math.abs(distance);
    
    // Динамический порог: меньше для быстрых свайпов
    const baseThreshold = windowSize.width * 0.25;
    const threshold = velocity > 100 ? baseThreshold * 0.6 : baseThreshold;
    
    isDraggingRef.current = false;
    isHorizontalSwipeRef.current = null;
    
    if (containerRef.current) {
      // Используем более плавную кривую для анимации
      containerRef.current.style.transition = isLowPerformance 
        ? 'transform 0.2s ease-out' 
        : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    if (distance > threshold && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (distance < -threshold && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else {
      applyTransform(0);
    }
  }, [currentPage, totalPages, windowSize.width, isLowPerformance, applyTransform]);
  
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (containerRef.current && !isDraggingRef.current) {
      containerRef.current.style.transition = isLowPerformance 
        ? 'transform 0.2s ease-out' 
        : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      containerRef.current.style.transform = `translate3d(-${currentPage * 100}%, 0, 0)`;
    }
  }, [currentPage, isLowPerformance]);


  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden relative">
      {!isLowPerformance && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        </div>
      )}

      <StatusBar />


      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <div className="mb-8 text-center">
          <div className="text-7xl font-thin tracking-tighter text-foreground">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xl text-muted-foreground mt-2 font-light">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div 
          className={`mb-6 h-16 glass-effect rounded-full flex items-center px-8 cursor-pointer ${!isLowPerformance ? 'active:scale-95 transition-transform' : ''}`}
          onClick={() => setIsDrawerOpen(true)}
        >
          <span className="text-muted-foreground text-lg">
            Search apps, web, and more
          </span>
        </div>
        <div 
          className="flex-1 flex flex-col overflow-hidden relative"
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div 
            ref={containerRef}
            className="flex-1 flex"
            style={{
              transform: `translate3d(-${currentPage * 100}%, 0, 0)`,
              transition: isLowPerformance ? 'transform 0.2s ease-out' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              // Рендерим только текущую страницу и соседние для оптимизации
              const isVisible = Math.abs(pageIndex - currentPage) <= 1;
              if (!isVisible) {
                return <div key={pageIndex} className="flex-shrink-0 w-full" />;
              }
              
              const pageApps = homeApps.slice(pageIndex * appsPerPage, (pageIndex + 1) * appsPerPage);
              const isCurrentPage = pageIndex === currentPage;
              
              return (
                <div 
                  key={pageIndex} 
                  className="flex-shrink-0 w-full grid grid-cols-3 gap-6 content-start px-6"
                  style={{
                    opacity: isCurrentPage ? 1 : 0.5,
                    transition: isLowPerformance ? 'none' : 'opacity 0.35s ease',
                  }}
                >
                   {pageApps.map((app) => (
                    <div key={app.id} className={!isLowPerformance ? "hover-scale" : ""}>
                      <AppIcon
                        name={app.name} 
                        icon={app.icon} 
                        color={app.color}
                        onClick={() => handleOpenApp(app.name)}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mb-6 py-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full relative overflow-hidden transform ${
                    index === currentPage 
                      ? 'w-8 bg-primary shadow-lg scale-110' 
                      : 'w-2 bg-primary/20 hover:bg-primary/40 scale-100'
                  } transition-all ${isLowPerformance ? 'duration-200' : 'duration-300 ease-out'}`}
                  aria-label={`Page ${index + 1}`}
                >
                  {index === currentPage && !isLowPerformance && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" 
                         style={{ backgroundSize: '200% 100%' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="h-24 glass-effect rounded-[2rem] flex items-center justify-around px-8 relative overflow-hidden">
            {!isLowPerformance && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
            )}
            {dockApps.map((app) => (
              <div key={app.id} className={`relative z-10 ${!isLowPerformance ? 'active:scale-90 transition-transform' : ''}`}>
                <AppIcon 
                  name="" 
                  icon={app.icon} 
                  color={app.color} 
                  compact 
                  onClick={() => handleOpenApp(app.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavigationBar 
        onHomeClick={() => {
          setIsDrawerOpen(false);
        }}
        onAppsClick={() => setIsDrawerOpen(true)}
        onRecentClick={() => {}}
      />

      {isDrawerOpen && <AppDrawer onClose={() => setIsDrawerOpen(false)} onAppOpen={handleOpenApp} />}

      {showQuickSettings && (
        <QuickSettings onClose={() => setShowQuickSettings(false)} />
      )}

      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
});

HomeScreen.displayName = "HomeScreen";

export default HomeScreen;
