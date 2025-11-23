import { lazy, Suspense } from "react";

const Calculator = lazy(() => import("@/components/Apps/Calculator"));
const Notes = lazy(() => import("@/components/Apps/Notes"));
const Gallery = lazy(() => import("@/components/Apps/Gallery"));
const SettingsApp = lazy(() => import("@/components/Apps/Settings"));
const Clock = lazy(() => import("@/components/Apps/Clock"));
const Weather = lazy(() => import("@/components/Apps/Weather"));
const MusicPlayer = lazy(() => import("@/components/Apps/MusicPlayer"));
const FileManager = lazy(() => import("@/components/Apps/FileManager"));
const CalendarApp = lazy(() => import("@/components/Apps/Calendar"));
const Browser = lazy(() => import("@/components/Apps/UnifiedBrowser"));
const Email = lazy(() => import("@/components/Apps/Email"));
const Maps = lazy(() => import("@/components/Apps/Maps"));
const Phone = lazy(() => import("@/components/Apps/Phone"));
const Messages = lazy(() => import("@/components/Apps/Messages"));
const Camera = lazy(() => import("@/components/Apps/Camera"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

export const getAppComponent = (appName: string) => {
  const components: Record<string, React.ReactNode> = {
    Calculator: <Suspense fallback={<LoadingFallback />}><Calculator /></Suspense>,
    Clock: <Suspense fallback={<LoadingFallback />}><Clock /></Suspense>,
    Notes: <Suspense fallback={<LoadingFallback />}><Notes /></Suspense>,
    Gallery: <Suspense fallback={<LoadingFallback />}><Gallery /></Suspense>,
    Settings: <Suspense fallback={<LoadingFallback />}><SettingsApp /></Suspense>,
    Weather: <Suspense fallback={<LoadingFallback />}><Weather /></Suspense>,
    Music: <Suspense fallback={<LoadingFallback />}><MusicPlayer /></Suspense>,
    Files: <Suspense fallback={<LoadingFallback />}><FileManager /></Suspense>,
    Calendar: <Suspense fallback={<LoadingFallback />}><CalendarApp /></Suspense>,
    Browser: <Suspense fallback={<LoadingFallback />}><Browser /></Suspense>,
    Email: <Suspense fallback={<LoadingFallback />}><Email /></Suspense>,
    Maps: <Suspense fallback={<LoadingFallback />}><Maps /></Suspense>,
    Phone: <Suspense fallback={<LoadingFallback />}><Phone /></Suspense>,
    Messages: <Suspense fallback={<LoadingFallback />}><Messages /></Suspense>,
    Camera: <Suspense fallback={<LoadingFallback />}><Camera /></Suspense>,
  };

  return components[appName] || null;
};
