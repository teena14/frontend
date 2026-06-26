'use client';

// =============================================================================
// useParallax — mouse-driven parallax for Hero floating elements
// Returns normalized {x, y} offset values from -1 to 1, centered on viewport.
// Components multiply by their desired max displacement.
// =============================================================================

import { useState, useEffect, useCallback, RefObject } from 'react';
import type { ParallaxOffset } from '@/types';
import { useReducedMotion } from './useReducedMotion';

export function useParallax(
  containerRef: RefObject<HTMLElement | null>
): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1 to 1 range
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setOffset({ x, y });
    },
    [containerRef, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center on mouse leave
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, handleMouseMove, handleMouseLeave, prefersReducedMotion]);

  return offset;
}
