import React, { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { X, Minus, Maximize2 } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface WindowProps {
  title: string;
  icon: any;
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  children?: React.ReactNode;
}

const Window = memo(({ title, icon: Icon, onClose, onMinimize, zIndex, children }: WindowProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 700, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string>("");
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger open animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      onMinimize();
      setIsMinimizing(false);
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) return;
    setIsResizing(true);
    setResizeDir(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        
        setSize(prev => {
          let newWidth = prev.width;
          let newHeight = prev.height;
          let newX = position.x;
          let newY = position.y;

          if (resizeDir.includes('e')) newWidth = Math.max(500, prev.width + deltaX);
          if (resizeDir.includes('w')) {
            newWidth = Math.max(500, prev.width - deltaX);
            newX = position.x + deltaX;
          }
          if (resizeDir.includes('s')) newHeight = Math.max(400, prev.height + deltaY);
          if (resizeDir.includes('n')) {
            newHeight = Math.max(400, prev.height - deltaY);
            newY = position.y + deltaY;
          }

          if (newX !== position.x || newY !== position.y) {
            setPosition({ x: newX, y: newY });
          }
          
          return { width: newWidth, height: newHeight };
        });
        
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeDir, position]);

  return (
    <div
      className={`fixed glass-effect rounded-lg shadow-window overflow-hidden ${!isLowPerformance ? 'transition-all' : ''} ${
        isClosing ? 'animate-window-close' : 
        isMinimizing ? 'animate-window-minimize' : 
        isVisible ? (isLowPerformance ? '' : 'animate-window-open') : 'opacity-0 scale-95'
      }`}
      style={{
        left: isMaximized ? '0' : `${position.x}px`,
        top: isMaximized ? '0' : `${position.y}px`,
        width: isMaximized ? '100vw' : `${size.width}px`,
        height: isMaximized ? '100vh' : `${size.height}px`,
        zIndex,
        borderRadius: isMaximized ? '0' : undefined,
      }}
    >
      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="absolute top-0 left-0 w-1 h-full cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className="absolute top-0 right-0 w-1 h-full cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, 'se')} />
        </>
      )}
      {/* Title Bar */}
      <div
        className={`h-10 bg-window-bg border-b border-border/50 flex items-center justify-between px-3 cursor-move select-none group relative overflow-hidden ${!isLowPerformance ? 'transition-opacity duration-300' : ''}`}
        onMouseDown={handleMouseDown}
      >
        {!isLowPerformance && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <div className="flex items-center gap-2 relative z-10">
          <Icon className={`h-4 w-4 ${!isLowPerformance ? 'transition-transform duration-300 group-hover:scale-110' : ''}`} />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="window-controls flex items-center gap-1 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 hover:bg-muted ${!isLowPerformance ? 'hover-scale transition-all duration-200' : ''}`}
            onClick={handleMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 hover:bg-muted ${!isLowPerformance ? 'hover-scale transition-all duration-200' : ''}`}
            onClick={toggleMaximize}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 hover:bg-destructive/20 hover:text-destructive ${!isLowPerformance ? 'hover-scale transition-all duration-200' : ''}`}
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-2.5rem)] bg-window-bg overflow-hidden">
        {children || (
          <div className="h-full p-6 overflow-auto">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-muted-foreground">
                This is a window for {title}. You can drag it around by clicking and holding the title bar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Window.displayName = "Window";

export default Window;
