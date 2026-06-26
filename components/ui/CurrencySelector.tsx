'use client';

// =============================================================================
// CurrencySelector - USD/EUR/INR dropdown
// Custom-built dropdown without any UI library. Pricing store changes update
// selected labels through refs, avoiding pricing-section rerenders.
// =============================================================================

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CURRENCY_MATRIX } from '@/lib/pricing';
import { pricingStore } from '@/lib/pricingStore';
import type { Currency } from '@/types';
import Icon from './Icon';

const CURRENCIES: Currency[] = ['USD', 'EUR', 'INR'];

const OPTION_BASE = [
  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg',
  'font-sans text-sm font-medium',
  'transition-colors duration-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia',
].join(' ');

const OPTION_ACTIVE = 'bg-mystic-mint text-nocturnal';
const OPTION_INACTIVE = 'text-nocturnal/65 hover:bg-arctic-powder hover:text-nocturnal';

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const symbolRef = useRef<HTMLSpanElement>(null);
  const codeRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<Partial<Record<Currency, HTMLButtonElement | null>>>({});
  const indicatorRefs = useRef<Partial<Record<Currency, HTMLSpanElement | null>>>({});

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    const applyState = () => {
      const currency = pricingStore.getCurrency();
      const currentConfig = CURRENCY_MATRIX[currency];

      if (symbolRef.current) {
        symbolRef.current.textContent = currentConfig.symbol;
      }
      if (codeRef.current) {
        codeRef.current.textContent = currency;
      }
      if (triggerRef.current) {
        triggerRef.current.setAttribute('aria-label', `Select currency: ${currency}`);
      }

      CURRENCIES.forEach((c) => {
        const isSelected = c === currency;
        const option = optionRefs.current[c];
        const indicator = indicatorRefs.current[c];

        if (option) {
          option.setAttribute('aria-selected', String(isSelected));
          option.className = cn(OPTION_BASE, isSelected ? OPTION_ACTIVE : OPTION_INACTIVE);
        }
        if (indicator) {
          indicator.hidden = !isSelected;
        }
      });
    };

    applyState();
    return pricingStore.subscribe(applyState);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency: USD"
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl',
          'bg-white border border-border',
          'font-sans text-sm font-medium text-nocturnal',
          'hover:border-nocturnal/30 hover:shadow-sm',
          'transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia',
        )}
      >
        <span ref={symbolRef} className="font-mono text-xs text-nocturnal/50">
          {CURRENCY_MATRIX.USD.symbol}
        </span>
        <span ref={codeRef}>USD</span>
        <Icon
          name="chevron-down"
          size={14}
          className={cn(
            'text-nocturnal/40 transition-transform duration-150',
            open && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'absolute top-full left-0 mt-2 w-36 z-20',
          'bg-white border border-border rounded-xl shadow-md',
          'transition-all duration-150 origin-top',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        )}
        role="listbox"
        aria-label="Currency options"
      >
        <ul className="p-1" role="list">
          {CURRENCIES.map((c) => {
            const config = CURRENCY_MATRIX[c];
            const isDefault = c === 'USD';

            return (
              <li key={c} role="none">
                <button
                  ref={(el) => { optionRefs.current[c] = el; }}
                  role="option"
                  aria-selected={isDefault}
                  onClick={() => {
                    pricingStore.setCurrency(c);
                    setOpen(false);
                  }}
                  className={cn(OPTION_BASE, isDefault ? OPTION_ACTIVE : OPTION_INACTIVE)}
                >
                  <span className="font-mono text-xs text-nocturnal/50 w-4">{config.symbol}</span>
                  <span>{c}</span>
                  <span
                    ref={(el) => { indicatorRefs.current[c] = el; }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-nocturnal/40"
                    hidden={!isDefault}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
