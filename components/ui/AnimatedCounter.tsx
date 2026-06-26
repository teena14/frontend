'use client';

// =============================================================================
// AnimatedCounter — counts up from 0 to target value on viewport entry
// Uses requestAnimationFrame for smooth animation. Pure CSS + JS, no library.
// =============================================================================

import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  decimalPlaces?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1800,
  className,
  decimalPlaces = 0,
}: AnimatedCounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const textRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const isDone = useRef(false);

  useEffect(() => {
    if (!inView || !textRef.current || isDone.current) return;

    if (prefersReducedMotion) {
      const formatted = decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.floor(value).toString();
      textRef.current.textContent = `${formatted}${suffix}`;
      isDone.current = true;
      if (ref.current) ref.current.classList.add('counter-done');
      return;
    }

    const startTime = performance.now();
    const element = textRef.current;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;

      const formatted = decimalPlaces > 0 ? current.toFixed(decimalPlaces) : Math.floor(current).toString();
      element.textContent = `${formatted}${suffix}`;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const finalFormatted = decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.floor(value).toString();
        element.textContent = `${finalFormatted}${suffix}`;
        isDone.current = true;
        if (ref.current) ref.current.classList.add('counter-done');
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, value, duration, prefersReducedMotion, suffix, decimalPlaces, ref]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${value}${suffix}`}
    >
      <span ref={textRef}>0{suffix}</span>
    </span>
  );
}
