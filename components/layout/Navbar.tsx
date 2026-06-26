'use client';

// =============================================================================
// Navbar — refined transparent-to-dark with stronger scroll states
// =============================================================================

import { useState, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

function NavbarInner() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-oceanic-noir/98 backdrop-blur-md border-b border-arctic-powder/6'
            : 'bg-transparent'
        )}
        style={scrolled ? { boxShadow: '0 1px 32px rgba(23,43,54,0.2)' } : {}}
      >
        <nav
          className="container flex items-center justify-between"
          style={{ height: '64px' }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
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
            <span
              className="font-mono font-semibold text-[15px] tracking-tight leading-none transition-colors duration-200"
              style={{ color: scrolled ? '#F1F6F4' : '#114C5A' }}
            >
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-2 rounded-lg font-sans text-sm font-medium',
                    'transition-all duration-150',
                    'group overflow-hidden',
                    scrolled
                      ? 'text-arctic-powder/60 hover:text-arctic-powder hover:bg-white/6 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                      : 'text-nocturnal/60 hover:text-nocturnal hover:bg-nocturnal/5 hover:shadow-[0_0_15px_rgba(17,76,90,0.05)]'
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated underline / glow */}
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-1/2 opacity-0 group-hover:opacity-100 rounded-t-full"
                    style={{ background: scrolled ? 'var(--color-forsythia)' : 'var(--color-nocturnal)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#"
              className={cn(
                'font-sans text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-150',
                scrolled
                  ? 'text-arctic-powder/55 hover:text-arctic-powder hover:bg-white/6'
                  : 'text-nocturnal/55 hover:text-nocturnal hover:bg-nocturnal/5'
              )}
            >
              Sign in
            </a>
            <Button variant="primary" size="sm" href="#pricing">
              Get started
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            className={cn(
              'md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg gap-1.5',
              'transition-colors duration-150',
              scrolled
                ? 'text-arctic-powder hover:bg-white/8'
                : 'text-nocturnal hover:bg-nocturnal/5'
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="w-5 h-[1.5px] bg-current rounded" />
            <span className="w-5 h-[1.5px] bg-current rounded" />
            <span className="w-3.5 h-[1.5px] bg-current rounded self-end" />
          </button>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        id="mobile-menu"
      />
    </>
  );
}

const Navbar = memo(NavbarInner);
Navbar.displayName = 'Navbar';

export default Navbar;
