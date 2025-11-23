import React, { useState } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Weather = () => {
  const isMobile = useIsMobile();
  const [currentTemp] = useState(24);
  
  const forecast = [
    { day: "Mon", temp: 25, icon: Sun, condition: "Sunny" },
    { day: "Tue", temp: 22, icon: Cloud, condition: "Cloudy" },
    { day: "Wed", temp: 19, icon: CloudRain, condition: "Rainy" },
    { day: "Thu", temp: 23, icon: Sun, condition: "Sunny" },
    { day: "Fri", temp: 21, icon: Cloud, condition: "Cloudy" },
  ];

  const details = [
    { label: "Humidity", value: "65%", icon: Droplets },
    { label: "Wind Speed", value: "12 km/h", icon: Wind },
    { label: "Visibility", value: "10 km", icon: Eye },
    { label: "Pressure", value: "1013 mb", icon: Gauge },
  ];

  return (
    <div className={`h-full ${isMobile ? 'p-4' : 'p-6'} overflow-auto relative`}>
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-background to-orange-500/3 pointer-events-none" />
      
      <Tabs defaultValue="today" className="w-full relative z-10">
        <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'mb-4' : 'mb-6'} glass-effect`}>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6 animate-fade-in-up">
          {/* Current Weather */}
          <Card className="p-8 text-center glass-effect border-0 relative overflow-hidden hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
            <div className="relative">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4 text-foreground">Moscow</h3>
                <Sun className="h-24 w-24 mx-auto text-yellow-500 drop-shadow-lg" />
              </div>
              <div className="text-7xl font-thin mb-2 text-foreground">
                {currentTemp}°
              </div>
              <p className="text-muted-foreground text-xl font-light">Sunny</p>
            </div>
          </Card>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <Card 
                key={detail.label} 
                className="p-4 glass-effect border-0 hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <detail.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{detail.label}</p>
                    <p className="text-xl font-semibold text-foreground">{detail.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          {forecast.map((day, index) => (
            <Card 
              key={day.day} 
              className="p-4 glass-effect border-0 hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold w-16 text-foreground">{day.day}</span>
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <day.icon className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground font-medium">{day.condition}</span>
                </div>
                <span className="text-2xl font-semibold w-16 text-right text-foreground">
                  {day.temp}°
                </span>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Weather;