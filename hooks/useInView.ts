'use client';

// =============================================================================
// useInView — IntersectionObserver hook for scroll-triggered entrance animations
// Returns a ref and a boolean. Component applies .in-view class when true.
// Once triggered, stays true (entrances fire once only).
// =============================================================================

import { useRef, useState, useEffect, RefObject } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px'
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Unobserve after first trigger — entrance fires once
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
