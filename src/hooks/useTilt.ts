import { useEffect, useRef, useState } from "react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  disabled?: boolean;
}

export const useTilt = (options: TiltOptions = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 0.4,
    disabled = false,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const rafRef = useRef<number>();
  const targetTransform = useRef({ rotateX: 0, rotateY: 0, scale: 1 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (disabled || prefersReducedMotion || !elementRef.current) {
      setTransform("");
      return;
    }

    const element = elementRef.current;
    let ticking = false;

    const updateTransform = () => {
      const transformString = `perspective(${perspective}px) rotateX(${targetTransform.current.rotateX}deg) rotateY(${targetTransform.current.rotateY}deg) scale(${targetTransform.current.scale})`;
      setTransform(transformString);
      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!element || ticking) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = ((centerY - y) / centerY) * maxTilt;

      targetTransform.current = {
        rotateX,
        rotateY,
        scale,
      };

      rafRef.current = requestAnimationFrame(updateTransform);
      ticking = true;
    };

    const handleMouseLeave = () => {
      targetTransform.current = { rotateX: 0, rotateY: 0, scale: 1 };
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [maxTilt, perspective, scale, speed, disabled]);

  return { ref: elementRef, transform };
};
