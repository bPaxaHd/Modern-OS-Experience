import { useState, useEffect } from "react";

interface WindowState {
  id: string;
  title: string;
  icon: any;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  component?: React.ReactNode;
}

const STORAGE_KEY = "windows-state";

export const useWindowState = () => {
  const [windows, setWindows] = useState<WindowState[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Don't restore components, only metadata
        return parsed.map((w: any) => ({ ...w, component: undefined }));
      }
    } catch (error) {
      console.error("Failed to load window state:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      // Save only metadata, not components
      const toSave = windows.map(({ component, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error("Failed to save window state:", error);
    }
  }, [windows]);

  return [windows, setWindows] as const;
};
