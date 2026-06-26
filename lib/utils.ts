// =============================================================================
// UTILITIES — AI SaaS Landing Page
// Pure utility functions. No side effects.
// =============================================================================

// ---------------------------------------------------------------------------
// cn — className merger (no clsx/tailwind-merge dependency needed)
// ---------------------------------------------------------------------------

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// clamp — restrict a number between min and max
// ---------------------------------------------------------------------------

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ---------------------------------------------------------------------------
// lerp — linear interpolation for smooth animations
// ---------------------------------------------------------------------------

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// ---------------------------------------------------------------------------
// formatCurrency — format a number as currency (used in pricing engine)
// Note: primary formatting happens in lib/pricing.ts via Intl.NumberFormat
// ---------------------------------------------------------------------------

export function formatCurrency(
  amount: number,
  symbol: string
): string {
  return `${symbol}${Math.round(amount).toLocaleString()}`;
}

// ---------------------------------------------------------------------------
// countUp — generates values for animated counter
// ---------------------------------------------------------------------------

export function getCounterValues(
  target: number,
  duration: number,
  fps = 60
): number[] {
  const frames = Math.round((duration / 1000) * fps);
  return Array.from({ length: frames + 1 }, (_, i) => {
    const progress = i / frames;
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    return target * eased;
  });
}

// ---------------------------------------------------------------------------
// debounce — rate-limit function calls (used in scroll/resize handlers)
// ---------------------------------------------------------------------------

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// ---------------------------------------------------------------------------
// getInitials — extract initials from a full name
// ---------------------------------------------------------------------------

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
