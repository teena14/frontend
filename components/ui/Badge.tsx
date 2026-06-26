// =============================================================================
// Badge — small label component used in hero announcement and feature cards
// =============================================================================

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'dark' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-mystic-mint text-nocturnal border border-nocturnal/10',
    gold: 'bg-forsythia text-oceanic-noir border border-forsythia/20',
    dark: 'bg-nocturnal text-arctic-powder border border-arctic-powder/10',
    outline: 'bg-transparent text-nocturnal border border-nocturnal/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label leading-none',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
