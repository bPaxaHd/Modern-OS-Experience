import { useEffect, useRef, useState } from "react";

interface ParallaxOptions {
  speed?: number;
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, disabled = false } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (disabled || prefersReducedMotion || !elementRef.current) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    let ticking = false;

    const updatePosition = () => {
      // Smooth interpolation for performance
      setOffset(prev => ({
        x: prev.x + (targetOffset.current.x - prev.x) * 0.1,
        y: prev.y + (targetOffset.current.y - prev.y) * 0.1,
      }));

      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        const x = (e.clientX / window.innerWidth - 0.5) * speed * 100;
        const y = (e.clientY / window.innerHeight - 0.5) * speed * 100;
        
        targetOffset.current = { x, y };

        rafRef.current = requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    // Throttled event listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, disabled]);

  return { ref: elementRef, offset };
};
