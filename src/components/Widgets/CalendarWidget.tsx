import React, { useState, memo, useCallback } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

const CalendarWidget = memo(() => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  const changeMonth = useCallback((offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  }, [currentDate]);

  return (
    <div className={`glass-effect rounded-xl p-6 shadow-window min-w-[280px] relative overflow-hidden group ${!isLowPerformance ? 'hover-lift' : ''}`}>
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <CalendarIcon className={`h-5 w-5 text-primary ${!isLowPerformance ? 'transition-all duration-500 group-hover:scale-110 group-hover:rotate-12' : ''}`} />
          <h3 className={`font-semibold ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-primary' : ''}`}>Calendar</h3>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${!isLowPerformance ? 'hover-scale transition-all duration-300 hover-glow' : ''}`}
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft className={`h-4 w-4 ${!isLowPerformance ? 'transition-transform duration-300 group-hover:-translate-x-0.5' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${!isLowPerformance ? 'hover-scale transition-all duration-300 hover-glow' : ''}`}
            onClick={() => changeMonth(1)}
          >
            <ChevronRight className={`h-4 w-4 ${!isLowPerformance ? 'transition-transform duration-300 group-hover:translate-x-0.5' : ''}`} />
          </Button>
        </div>
      </div>
      <div className={`text-sm text-muted-foreground mb-3 relative z-10 ${!isLowPerformance ? 'transition-colors duration-300 group-hover:text-foreground' : ''}`}>
        {currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 relative z-10">
        {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
          <div key={day} className="text-muted-foreground font-medium p-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm relative z-10">
        {Array.from({ length: startingDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`p-1 rounded cursor-pointer ${
              isCurrentMonth && day === today
                ? `bg-primary text-primary-foreground font-bold ${!isLowPerformance ? 'shadow-lg shadow-primary/30' : ''}`
                : `hover:bg-muted ${!isLowPerformance ? 'hover:shadow-md' : ''}`
            } ${!isLowPerformance ? 'transition-all duration-300 hover:scale-110' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
});

CalendarWidget.displayName = "CalendarWidget";

export default CalendarWidget;
