import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { pricingStore } from '@/lib/pricingStore';
import { calculateRawPrice, CURRENCY_MATRIX } from '@/lib/pricing';
import type { Plan } from '@/types';

/**
 * Directly mutates the DOM textContent for the price and billing string,
 * avoiding React re-renders when the global pricingStore updates.
 */
export function usePricingStoreText(planId: Plan, duration: number = 1000) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const billingRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // The core update function that mutates the DOM
    const updateDOM = (startPrice: number | null) => {
      const billing = pricingStore.getBilling();
      const currency = pricingStore.getCurrency();
      const targetPrice = calculateRawPrice(planId, billing, currency);
      
      const { locale, symbol } = CURRENCY_MATRIX[currency];
      const format = (val: number) => {
        const rounded = Math.round(val);
        try {
          return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(rounded);
        } catch {
          return `${symbol}${rounded.toLocaleString()}`;
        }
      };

      // 1. Update billing subtext
      if (billingRef.current) {
        if (planId === 'enterprise') {
          billingRef.current.textContent = 'Custom billing structure';
        } else {
          billingRef.current.textContent = billing === 'yearly' 
            ? 'Billed annually · 20% off' 
            : 'Billed monthly · switch to save 20%';
        }
      }

      // 2. Animate price
      if (!priceRef.current) return targetPrice;
      if (startPrice === null || startPrice === targetPrice || prefersReducedMotion) {
         priceRef.current.textContent = format(targetPrice);
         return targetPrice;
      }

      // 3. Setup Animation
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startTime = performance.now();
      
      const tick = (now: number) => {
         const elapsed = now - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
         const currentVal = startPrice + (targetPrice - startPrice) * easeOut;
         
         if (priceRef.current) {
           priceRef.current.textContent = format(currentVal);
         }
         
         if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
         } else {
            if (priceRef.current) {
              priceRef.current.textContent = format(targetPrice);
            }
         }
      };
      
      rafRef.current = requestAnimationFrame(tick);
      return targetPrice;
    };

    let currentPrice = updateDOM(null); // Set initial without animating
    
    // Subscribe to global store changes
    const unsubscribe = pricingStore.subscribe(() => {
       currentPrice = updateDOM(currentPrice);
    });

    return () => {
       unsubscribe();
       if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [planId, duration, prefersReducedMotion]);

  return { priceRef, billingRef };
}
