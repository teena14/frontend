'use client';

// =============================================================================
// useScrolled - returns true when page has scrolled past threshold
// Used by Navbar to switch from transparent to filled state.
// =============================================================================

import { useSyncExternalStore } from 'react';

export function useScrolled(threshold = 20): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('scroll', onStoreChange, { passive: true });
      return () => window.removeEventListener('scroll', onStoreChange);
    },
    () => window.scrollY > threshold,
    () => false
  );
}
