'use client';

// =============================================================================
// PricingCard — premium card design, clearly differentiates plans
// =============================================================================

import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/types';
import Icon from './Icon';
import Button from './Button';
import { usePricingStoreText } from '@/hooks/useAnimatedPrice';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isHighlighted = plan.highlighted;
  
  // Attach refs to DOM elements that update dynamically
  const { priceRef, billingRef } = usePricingStoreText(plan.id, 500);

  return (
    <article
      role="listitem"
      className={cn(
        'relative rounded-2xl flex flex-col transition-all duration-200 h-full',
        isHighlighted
          ? 'bg-nocturnal shadow-xl hover:-translate-y-1.5 scale-[1.02] md:scale-[1.04]'
          : 'bg-white border border-border hover:-translate-y-0.5 hover:shadow-md',
      )}
      style={{
        padding: '2.75rem 2.25rem',
        willChange: 'transform',
        // Animated gradient border via box-shadow for Growth plan
        ...(isHighlighted
          ? {
            boxShadow: '0 20px 60px rgba(23,43,54,0.25), 0 0 0 1px rgba(255,200,1,0.5)',
            position: 'relative'
          }
          : {}),
      }}
    >
      {/* Animated Glow Border for highlighted card */}
      {isHighlighted && (
        <div
          className="absolute inset-[-1px] rounded-2xl z-[-1] opacity-50"
          style={{
            background: 'linear-gradient(90deg, #FFC801, #114C5A, #FFC801)',
            backgroundSize: '200% 100%',
            animation: 'borderGradient 3s linear infinite',
          }}
        />
      )}
      {/* Popular badge — floated above card */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span
            className="font-mono font-semibold text-[10px] px-4 py-1.5 rounded-full tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
              color: '#172B36',
              boxShadow: '0 4px 12px rgba(255,200,1,0.35)',
            }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3
          className="font-sans font-semibold text-xl tracking-tight mb-1.5"
          style={{ color: isHighlighted ? '#F1F6F4' : '#114C5A' }}
        >
          {plan.name}
        </h3>
        <p
          className="font-sans text-sm"
          style={{ color: isHighlighted ? 'rgba(241,246,244,0.5)' : 'rgba(17,76,90,0.5)' }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-1.5 flex items-end gap-1.5">
        <span
          ref={priceRef}
          className="font-mono font-bold leading-none tracking-tight"
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            color: isHighlighted ? '#F1F6F4' : '#114C5A',
          }}
        >
          {/* Managed by usePricingStoreText */}
        </span>
        <span
          className="font-sans text-sm pb-1"
          style={{ color: isHighlighted ? 'rgba(241,246,244,0.4)' : 'rgba(17,76,90,0.35)' }}
        >
          /mo
        </span>
      </div>

      {/* Billing context */}
      <p
        ref={billingRef}
        className="font-sans text-xs mb-7"
        style={{ color: isHighlighted ? 'rgba(241,246,244,0.35)' : 'rgba(17,76,90,0.35)' }}
      >
        {/* Managed by usePricingStoreText */}
      </p>

      {/* CTA */}
      <Button
        variant={isHighlighted ? 'primary' : 'secondary'}
        size="md"
        href="#"
        className="w-full justify-center mb-7"
      >
        {plan.id === 'enterprise' ? 'Contact sales' : 'Get started free'}
      </Button>

      {/* Divider */}
      <div
        className="mb-6"
        style={{
          height: '1px',
          background: isHighlighted ? 'rgba(255,255,255,0.08)' : 'rgba(17,76,90,0.08)',
        }}
        aria-hidden="true"
      />

      {/* Feature list */}
      <ul className="space-y-3 flex-1" role="list" aria-label={`${plan.name} plan features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            {/* Check dot */}
            <span
              className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
              style={{
                background: isHighlighted ? 'rgba(255,200,1,0.18)' : '#D9E8E2',
              }}
              aria-hidden="true"
            >
              <Icon
                name="chevron-up-solid"
                size={8}
                className="rotate-90"
                style={{ color: isHighlighted ? '#FFC801' : '#114C5A' } as React.CSSProperties}
              />
            </span>
            <span
              className="font-sans text-sm leading-snug"
              style={{ color: isHighlighted ? 'rgba(241,246,244,0.6)' : 'rgba(17,76,90,0.65)' }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
