import React, { useEffect, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

interface BootScreenProps {
  os: "windows" | "android";
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ os, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          {os === "windows" ? (
            <Monitor className="h-24 w-24 text-primary animate-pulse" />
          ) : (
            <Smartphone className="h-24 w-24 text-primary animate-pulse" />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">
            {os === "windows" ? "Windows 12" : "Android OS"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Starting up{dots}
          </p>
        </div>

        <div className="w-64 mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
