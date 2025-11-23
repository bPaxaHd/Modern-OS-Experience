import React, { useState, memo } from "react";
import { useSettings } from "@/contexts/SettingsContext";

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const RippleEffect = memo(({ children, className = "", onClick }: RippleEffectProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLowPerformance) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples([...ripples, { x, y, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-primary/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
    </div>
  );
});

RippleEffect.displayName = "RippleEffect";

export default RippleEffect;
