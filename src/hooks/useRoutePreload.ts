import { useEffect, useRef } from 'react';

const preloadedRoutes = new Set<string>();

export const useRoutePreload = (route: string, enabled: boolean = true) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const preload = () => {
    if (!enabled || preloadedRoutes.has(route)) return;

    timeoutRef.current = setTimeout(() => {
      // Preload the route module
      const routeMap: Record<string, () => Promise<any>> = {
        '/calculator': () => import('@/pages/apps/CalculatorPage'),
        '/clock': () => import('@/pages/apps/ClockPage'),
        '/notes': () => import('@/pages/apps/NotesPage'),
        '/gallery': () => import('@/pages/apps/GalleryPage'),
        '/settings': () => import('@/pages/apps/SettingsPage'),
        '/weather': () => import('@/pages/apps/WeatherPage'),
        '/music': () => import('@/pages/apps/MusicPage'),
        '/files': () => import('@/pages/apps/FilesPage'),
        '/calendar': () => import('@/pages/apps/CalendarPage'),
        '/browser': () => import('@/pages/apps/BrowserPage'),
        '/email': () => import('@/pages/apps/EmailPage'),
        '/maps': () => import('@/pages/apps/MapsPage'),
        '/phone': () => import('@/pages/apps/PhonePage'),
        '/messages': () => import('@/pages/apps/MessagesPage'),
        '/camera': () => import('@/pages/apps/CameraPage'),
      };

      const preloadFn = routeMap[route];
      if (preloadFn) {
        preloadFn().then(() => {
          preloadedRoutes.add(route);
        });
      }
    }, 100); // Small delay to avoid eager preloading
  };

  const cancelPreload = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => cancelPreload();
  }, []);

  return { preload, cancelPreload };
};
