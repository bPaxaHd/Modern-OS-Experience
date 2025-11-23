import { useState, useCallback } from "react";
import { WindowType } from "@/types";

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowType[]>([]);

  const openWindow = useCallback((window: WindowType) => {
    const existingWindow = windows.find(w => w.title === window.title);
    if (existingWindow) {
      setWindows(windows.map(w => 
        w.id === existingWindow.id ? { ...w, isMinimized: false } : w
      ));
      return existingWindow.id;
    }
    setWindows([...windows, window]);
    return window.id;
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  }, [windows]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, [windows]);

  const restoreWindow = useCallback((id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: false } : w
    ));
  }, [windows]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
  };
};
