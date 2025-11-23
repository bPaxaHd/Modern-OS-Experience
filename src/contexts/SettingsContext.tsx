import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { OSType, ThemeType, PerformanceMode } from "@/types";

export type { PerformanceMode };

interface SettingsContextType {
  currentOS: OSType;
  setCurrentOS: (os: OSType) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOS, setCurrentOS] = useLocalStorage<OSType>("os-preference", "auto");
  const [theme, setTheme] = useLocalStorage<ThemeType>("theme-preference", "dark");
  const [wallpaper, setWallpaper] = useLocalStorage<string>("wallpaper", "gradient-1");
  const [accentColor, setAccentColor] = useLocalStorage<string>("accent-color", "345 85% 35%");
  const [performanceMode, setPerformanceMode] = useLocalStorage<PerformanceMode>("performance-mode", "low");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", accentColor);
  }, [accentColor]);

  useEffect(() => {
    document.body.classList.toggle("low-performance", performanceMode === "low");
  }, [performanceMode]);

  return (
    <SettingsContext.Provider
      value={{
        currentOS,
        setCurrentOS,
        theme,
        setTheme,
        wallpaper,
        setWallpaper,
        accentColor,
        setAccentColor,
        performanceMode,
        setPerformanceMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
