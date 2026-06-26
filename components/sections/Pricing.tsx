'use client';

// =============================================================================
// Pricing — completely static layout wrapper
// CRITICAL: Global React state removed. Zero rerenders on toggle.
// =============================================================================

import { useInView } from '@/hooks/useInView';
import { PRICING_PLANS } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import PricingCard from '@/components/ui/PricingCard';
import PricingToggle from '@/components/ui/PricingToggle';
import CurrencySelector from '@/components/ui/CurrencySelector';

export default function Pricing() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="pricing"
      className={cn(
        'section bg-mystic-mint reveal',
        inView && 'in-view'
      )}
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        {/* Header + controls row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-nocturnal/40" aria-hidden="true" />
              <span className="text-label" style={{ color: 'rgba(17,76,90,0.4)' }}>
                Pricing
              </span>
            </div>
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-mono font-bold text-nocturnal leading-tight whitespace-nowrap tracking-tight">
              Simple, transparent pricing
            </h2>
          </div>

          {/* Controls - These manage their own pub/sub state now */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5">
            <PricingToggle />
            <CurrencySelector />
          </div>
        </div>

        {/* Pricing cards */}
        <div
          className={cn(
            'grid md:grid-cols-3 gap-5 items-stretch reveal-stagger',
            inView && 'in-view'
          )}
          role="list"
          aria-label="Pricing plans"
        >
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm font-sans mt-10" style={{ color: 'rgba(17,76,90,0.4)' }}>
          All plans include a 14-day free trial. No credit card required. &nbsp;
          <a
            href="#faq"
            className="underline underline-offset-2 hover:text-nocturnal transition-colors duration-150"
            style={{ color: 'rgba(17,76,90,0.6)' }}
          >
            Questions? See the FAQ.
          </a>
        </p>

      </div>
    </section>
  );
}
