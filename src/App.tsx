import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { RouteTransition } from "@/components/Layout/RouteTransition";

// Lazy load routes for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load app pages
const CalculatorPage = lazy(() => import("./pages/apps/CalculatorPage"));
const ClockPage = lazy(() => import("./pages/apps/ClockPage"));
const NotesPage = lazy(() => import("./pages/apps/NotesPage"));
const GalleryPage = lazy(() => import("./pages/apps/GalleryPage"));
const SettingsPage = lazy(() => import("./pages/apps/SettingsPage"));
const WeatherPage = lazy(() => import("./pages/apps/WeatherPage"));
const MusicPage = lazy(() => import("./pages/apps/MusicPage"));
const FilesPage = lazy(() => import("./pages/apps/FilesPage"));
const CalendarPage = lazy(() => import("./pages/apps/CalendarPage"));
const BrowserPage = lazy(() => import("./pages/apps/BrowserPage"));
const EmailPage = lazy(() => import("./pages/apps/EmailPage"));
const MapsPage = lazy(() => import("./pages/apps/MapsPage"));
const PhonePage = lazy(() => import("./pages/apps/PhonePage"));
const MessagesPage = lazy(() => import("./pages/apps/MessagesPage"));
const CameraPage = lazy(() => import("./pages/apps/CameraPage"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <RouteTransition>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/pages/:page" element={<Index />} />
        
        {/* App Routes */}
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/browser" element={<BrowserPage />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/camera" element={<CameraPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
