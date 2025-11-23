export type OSType = "windows" | "android" | "auto";
export type ThemeType = "light" | "dark";
export type PerformanceMode = "low" | "high";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowType {
  id: string;
  title: string;
  icon: any;
  isMinimized: boolean;
  component?: React.ReactNode;
}

export interface IconPosition {
  id: string;
  position: Position;
}

export interface AppInfo {
  id: string;
  name: string;
  icon: any;
  component?: React.ReactNode;
  color?: string;
}

export interface ContextMenuItem {
  label: string;
  icon: any;
  onClick: () => void;
}
