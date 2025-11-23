import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Clock as ClockIcon, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Clock = () => {
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [worldClocks, setWorldClocks] = useState([
    { city: "New York", timezone: "America/New_York" },
    { city: "London", timezone: "Europe/London" },
    { city: "Tokyo", timezone: "Asia/Tokyo" },
    { city: "Sydney", timezone: "Australia/Sydney" },
  ]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setTimerRunning(false);
          toast.success("Timer finished!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const getTimeInTimezone = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(currentTime);
    } catch {
      return "00:00:00";
    }
  };

  return (
    <div className={`h-full bg-background ${isMobile ? 'p-4' : 'p-6'}`}>
      <Tabs defaultValue="clock" className="h-full">
        <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <TabsTrigger value="clock">
            <ClockIcon className="h-4 w-4 mr-2" />
            Clock
          </TabsTrigger>
          <TabsTrigger value="stopwatch">
            <Timer className="h-4 w-4 mr-2" />
            Stopwatch
          </TabsTrigger>
          <TabsTrigger value="timer">
            <Timer className="h-4 w-4 mr-2" />
            Timer
          </TabsTrigger>
        </TabsList>

        {/* Clock Tab */}
        <TabsContent value="clock" className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
            <div className={`${isMobile ? 'text-5xl' : 'text-7xl'} font-light tracking-tight mb-2`}>
              {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            </div>
            <div className="text-2xl text-muted-foreground">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">World Clocks</h3>
            </div>
            {worldClocks.map((clock, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-lg border border-border burgundy-border flex items-center justify-between animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="font-medium">{clock.city}</div>
                  <div className="text-sm text-muted-foreground">{clock.timezone}</div>
                </div>
                <div className="text-3xl font-light">{getTimeInTimezone(clock.timezone)}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Stopwatch Tab */}
        <TabsContent value="stopwatch" className="flex flex-col items-center justify-start mt-6">
          <div className="text-8xl font-light tracking-tight mb-12">{formatStopwatch(stopwatchTime)}</div>
          <div className="flex gap-4">
            {!stopwatchRunning ? (
              <Button
                size="lg"
                onClick={() => setStopwatchRunning(true)}
                className="h-16 w-32 text-lg bg-primary hover:bg-primary/90 burgundy-glow"
              >
                <Play className="h-5 w-5 mr-2" />
                Start
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStopwatchRunning(false)}
                className="h-16 w-32 text-lg"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setStopwatchTime(0);
                setStopwatchRunning(false);
              }}
              className="h-16 w-32 text-lg"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>
        </TabsContent>

        {/* Timer Tab */}
        <TabsContent value="timer" className="flex flex-col items-center justify-start mt-6">
          <div className="text-8xl font-light tracking-tight mb-12">
            {timerMinutes.toString().padStart(2, "0")}:{timerSeconds.toString().padStart(2, "0")}
          </div>

          {!timerRunning && (
            <div className="flex gap-4 mb-8">
              <div className="flex flex-col items-center">
                <label className="text-sm text-muted-foreground mb-2">Minutes</label>
                <Input
                  type="number"
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 h-12 text-center text-xl"
                  min="0"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="text-sm text-muted-foreground mb-2">Seconds</label>
                <Input
                  type="number"
                  value={timerSeconds}
                  onChange={(e) => setTimerSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-24 h-12 text-center text-xl"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {!timerRunning ? (
              <Button
                size="lg"
                onClick={() => {
                  if (timerMinutes > 0 || timerSeconds > 0) {
                    setTimerRunning(true);
                  } else {
                    toast.error("Please set a timer duration");
                  }
                }}
                className="h-16 w-32 text-lg bg-primary hover:bg-primary/90 burgundy-glow"
              >
                <Play className="h-5 w-5 mr-2" />
                Start
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setTimerRunning(false)}
                className="h-16 w-32 text-lg"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setTimerMinutes(5);
                setTimerSeconds(0);
                setTimerRunning(false);
              }}
              className="h-16 w-32 text-lg"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clock;
