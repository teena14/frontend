// =============================================================================
// Button — primary interactive element, implemented without any UI library
// Hover and press states are pure CSS transitions.
// =============================================================================

import { cn } from '@/lib/utils';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    'bg-forsythia text-oceanic-noir',
    'hover:bg-deep-saffron',
    'active:scale-[0.98]',
    'shadow-sm hover:shadow-md btn-premium',
  ].join(' '),

  secondary: [
    'bg-transparent text-nocturnal',
    'border border-nocturnal/20',
    'hover:bg-nocturnal/6 hover:border-nocturnal/40',
    'active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'bg-transparent text-text-muted',
    'hover:text-nocturnal hover:bg-nocturnal/5',
    'active:scale-[0.98]',
  ].join(' '),
};

const VARIANT_DARK_STYLES: Record<ButtonVariant, string> = {
  primary: VARIANT_STYLES.primary,
  secondary: [
    'bg-transparent text-arctic-powder',
    'border border-arctic-powder/20',
    'hover:bg-arctic-powder/10 hover:border-arctic-powder/40',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-arctic-powder/70',
    'hover:text-arctic-powder hover:bg-arctic-powder/10',
    'active:scale-[0.98]',
  ].join(' '),
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm font-medium gap-1.5',
  md: 'px-6 py-2.5 text-sm font-medium gap-2',
  lg: 'px-7 py-3 text-base font-semibold gap-2.5',
};

interface ButtonPropsExtended extends ButtonProps {
  dark?: boolean;
  href?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  dark = false,
  href,
  children,
  className,
  ...props
}: ButtonPropsExtended) {
  const styles = dark ? VARIANT_DARK_STYLES[variant] : VARIANT_STYLES[variant];

  const baseClass = cn(
    'inline-flex items-center justify-center',
    'rounded-xl font-sans',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    styles,
    SIZE_STYLES[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
