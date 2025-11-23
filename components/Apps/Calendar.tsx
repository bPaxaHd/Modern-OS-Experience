import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const CalendarApp = () => {
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const events = [
    { id: 1, title: "Team Meeting", time: "10:00 AM", color: "bg-primary" },
    { id: 2, title: "Lunch Break", time: "12:30 PM", color: "bg-accent" },
    { id: 3, title: "Project Review", time: "3:00 PM", color: "bg-secondary" },
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'}`}>
      {/* Calendar Grid */}
      <div className={`flex-1 ${isMobile ? 'p-4' : 'p-6'} overflow-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();
            
            return (
              <Card
                key={day}
                className={`aspect-square p-2 cursor-pointer hover:bg-muted/50 transition-os animate-fade-in ${
                  isToday ? 'bg-primary text-primary-foreground' : ''
                }`}
                style={{ animationDelay: `${(i + firstDayOfMonth) * 20}ms` }}
              >
                <div className="text-sm font-medium">{day}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Events Sidebar */}
      <div className={`${isMobile ? 'w-full border-t' : 'w-80 border-l'} border-border ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Today's Events</h3>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {events.map((event, index) => (
            <Card key={event.id} className="p-4 animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`w-1 h-12 rounded-full ${event.color}`} />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;