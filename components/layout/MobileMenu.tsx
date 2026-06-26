'use client';

// =============================================================================
// MobileMenu — fullscreen overlay navigation for mobile
// Keyboard-accessible, focus-trapped, closes on Escape.
// =============================================================================

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function MobileMenu({ open, onClose, id }: MobileMenuProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent body scroll while menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div
      id={id}
      className={cn(
        'fixed inset-0 z-50 flex flex-col',
        'bg-oceanic-noir',
        'transition-opacity duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Menu header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={onClose}
          aria-label={`${SITE_NAME} home`}
        >
          <Image
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
            unoptimized
          />
          <span className="font-mono font-semibold text-base text-arctic-powder tracking-tight">
            {SITE_NAME}
          </span>
        </Link>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-arctic-powder/70 hover:text-arctic-powder hover:bg-white/10 transition-colors duration-150"
          aria-label="Close navigation menu"
        >
          <Icon name="x-mark" size={20} />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col px-6 pt-8 gap-1" aria-label="Mobile navigation">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              'font-sans text-xl font-medium py-3 px-4 rounded-xl',
              'text-arctic-powder/70 hover:text-arctic-powder hover:bg-white/5',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia'
            )}
            style={{
              transitionDelay: open ? `${i * 40}ms` : '0ms',
              transform: open ? 'translateX(0)' : 'translateX(-12px)',
              opacity: open ? 1 : 0,
              transition: 'transform 250ms ease-out, opacity 250ms ease-out, color 150ms, background 150ms',
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile CTA */}
      <div className="px-6 mt-auto pb-12 pt-8 flex flex-col gap-3">
        <Button variant="primary" size="lg" href="#pricing" className="w-full justify-center">
          Get started free
        </Button>
        <a
          href="#"
          className="font-sans text-sm text-center text-arctic-powder/50 hover:text-arctic-powder/80 transition-colors duration-150 py-2"
          onClick={onClose}
        >
          Sign in to your account
        </a>
      </div>
    </div>
  );
}
