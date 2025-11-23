import React, { useState } from "react";
import { MapPin, Navigation, Search, Star, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const Maps = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    { id: 1, name: "Coffee Shop", distance: "0.5 km", type: "Cafe", rating: 4.5 },
    { id: 2, name: "Central Park", distance: "1.2 km", type: "Park", rating: 4.8 },
    { id: 3, name: "Tech Hub", distance: "2.3 km", type: "Office", rating: 4.3 },
  ];

  const quickActions = [
    { icon: Navigation, label: "Directions", color: "bg-primary" },
    { icon: Star, label: "Favorites", color: "bg-accent" },
    { icon: Clock, label: "Recent", color: "bg-secondary" },
    { icon: Layers, label: "Layers", color: "bg-muted" },
  ];

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'}`}>
      {/* Sidebar */}
      <div className={`${isMobile ? 'w-full max-h-80 border-b' : 'w-96 border-r'} border-border flex flex-col`}>
        {/* Search Bar */}
        <div className="p-4 border-b border-border space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places..."
              className="pl-9"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex flex-col h-auto p-3 gap-2"
              >
                <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Locations List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          <h3 className="font-semibold mb-3">Nearby Places</h3>
          {locations.map((location, index) => (
            <Card key={location.id} className="p-4 cursor-pointer hover:bg-muted/50 transition-os animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{location.name}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{location.type}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>⭐ {location.rating}</span>
                    <span>• {location.distance}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="p-4 border-t border-border">
          <Button className="w-full">
            <Navigation className="h-4 w-4 mr-2" />
            Start Navigation
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Map Placeholder */}
        <div className="h-full bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-24 w-24 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground">
              Map view would be displayed here
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
          <Button size="icon" className="rounded-full shadow-lg">
            <Navigation className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Layers className="h-5 w-5" />
          </Button>
        </div>

        {/* Current Location Indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <Card className="px-4 py-2 flex items-center gap-2 shadow-lg">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Moscow, Russia</span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Maps;