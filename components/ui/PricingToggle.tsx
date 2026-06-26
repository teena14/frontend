'use client';

// =============================================================================
// PricingToggle - monthly/yearly billing toggle
// Pricing store changes update this small control through refs, avoiding React
// rerenders around the pricing section.
// =============================================================================

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { pricingStore } from '@/lib/pricingStore';
import { calculateSavings } from '@/lib/pricing';

const BUTTON_BASE = [
  'relative z-10 px-4 py-1.5 rounded-lg font-sans text-sm font-medium',
  'transition-colors duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia',
].join(' ');

const BUTTON_ACTIVE = 'text-arctic-powder';
const BUTTON_INACTIVE = 'text-nocturnal/55 hover:text-nocturnal';

export default function PricingToggle() {
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const yearlyRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const savingsWrapRef = useRef<HTMLDivElement>(null);
  const savingsTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const applyState = () => {
      const billing = pricingStore.getBilling();
      const currency = pricingStore.getCurrency();
      const isMonthly = billing === 'monthly';
      const savingsLabel = `Save ${calculateSavings('growth', currency)}/yr`;

      if (monthlyRef.current) {
        monthlyRef.current.setAttribute('aria-checked', String(isMonthly));
        monthlyRef.current.className = cn(BUTTON_BASE, isMonthly ? BUTTON_ACTIVE : BUTTON_INACTIVE);
      }

      if (yearlyRef.current) {
        yearlyRef.current.setAttribute('aria-checked', String(!isMonthly));
        yearlyRef.current.className = cn(BUTTON_BASE, !isMonthly ? BUTTON_ACTIVE : BUTTON_INACTIVE);
      }

      if (pillRef.current) {
        pillRef.current.style.left = isMonthly ? '4px' : 'calc(50%)';
      }

      if (savingsWrapRef.current) {
        savingsWrapRef.current.className = cn(
          'overflow-hidden transition-all duration-200',
          !isMonthly ? 'max-w-[120px] ml-3 opacity-100' : 'max-w-0 ml-0 opacity-0'
        );
      }

      if (savingsTextRef.current) {
        savingsTextRef.current.textContent = savingsLabel;
        savingsTextRef.current.setAttribute('aria-label', !isMonthly ? savingsLabel : '');
      }
    };

    applyState();
    return pricingStore.subscribe(applyState);
  }, []);

  return (
    <div
      className="flex items-center gap-4"
      role="radiogroup"
      aria-label="Billing period"
    >
      <div
        className="relative flex items-center p-1 rounded-xl bg-white border border-border"
        style={{ boxShadow: 'inset 0 1px 3px rgba(23,43,54,0.06)' }}
      >
        <div
          ref={pillRef}
          className="absolute top-1 bottom-1 rounded-lg bg-nocturnal"
          style={{
            width: 'calc(50% - 4px)',
            left: '4px',
            transition: 'left 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-hidden="true"
        />

        <button
          ref={monthlyRef}
          type="button"
          role="radio"
          aria-checked="true"
          onClick={() => pricingStore.setBilling('monthly')}
          className={cn(BUTTON_BASE, BUTTON_ACTIVE)}
        >
          Monthly
        </button>

        <button
          ref={yearlyRef}
          type="button"
          role="radio"
          aria-checked="false"
          onClick={() => pricingStore.setBilling('yearly')}
          className={cn(BUTTON_BASE, BUTTON_INACTIVE)}
        >
          Yearly
        </button>
      </div>

      <div ref={savingsWrapRef} className="overflow-hidden transition-all duration-200 max-w-0 ml-0 opacity-0">
        <span
          ref={savingsTextRef}
          className="font-mono text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap block bg-forsythia text-oceanic-noir"
          aria-live="polite"
          aria-label=""
        />
      </div>
    </div>
  );
}
