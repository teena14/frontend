// =============================================================================
// SectionLabel — eyebrow label above section headings
// Used consistently in every section for visual hierarchy.
// =============================================================================

import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  withDot?: boolean;
}

export default function SectionLabel({
  children,
  className,
  dark = false,
  withDot = true,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-label',
        dark ? 'text-text-on-dark-muted' : 'text-nocturnal/60',
        className
      )}
    >
      {withDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            dark ? 'bg-forsythia' : 'bg-nocturnal/40'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
