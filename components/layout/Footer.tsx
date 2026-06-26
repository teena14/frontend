'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SITE_NAME } from '@/lib/constants';

// =============================================================================
// Footer — dark, minimal, well-spaced
// Memoized — never rerenders due to pricing state changes.
// =============================================================================

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Performance', href: '#performance' },
    { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Security', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'DPA', href: '#' },
  ],
};

function FooterInner() {
  return (
    <footer
      className="bg-oceanic-noir text-arctic-powder"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
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

            <p className="font-sans text-sm text-arctic-powder/50 leading-relaxed max-w-xs mb-6">
              AI-driven data automation for teams that move fast. Connect, clean, and deliver your data in real-time.
            </p>

            {/* Status indicator */}
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-forsythia/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forsythia"></span>
              </span>
              <span className="relative font-mono text-xs text-arctic-powder/60 group-hover:text-arctic-powder transition-colors duration-300">All systems operational</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="font-mono text-xs font-500 text-arctic-powder/30 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-arctic-powder/55 hover:text-arctic-powder transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-arctic-powder/30">
            © {new Date().getFullYear()} {SITE_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-arctic-powder/20">
              Built with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Footer = memo(FooterInner);
Footer.displayName = 'Footer';

export default Footer;
