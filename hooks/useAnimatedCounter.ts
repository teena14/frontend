'use client';

import { useEffect, useRef } from 'react';

export function useAnimatedTextCounter(
  ref: React.RefObject<HTMLElement | null>,
  value: number,
  formatFn: (val: number) => string,
  duration: number = 400
) {
  const displayValueRef = useRef(value);

  useEffect(() => {
    if (!ref.current || value === displayValueRef.current) return;

    const startValue = displayValueRef.current;
    const endValue = value;
    const startTime = performance.now();
    const element = ref.current;

    // Fade out slightly
    element.style.transition = 'opacity 0.15s ease-out';
    element.style.opacity = '0.5';

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      
      const currentVal = startValue + (endValue - startValue) * easeProgress;
      element.textContent = formatFn(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        displayValueRef.current = endValue;
        element.textContent = formatFn(endValue);
        // Fade back in
        element.style.opacity = '1';
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, formatFn, ref]);
}
