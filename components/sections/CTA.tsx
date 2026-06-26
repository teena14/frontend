'use client';

// =============================================================================
// CTA — final conversion section, high contrast
// =============================================================================

import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

function CTAInner() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="cta"
      className={cn('section bg-nocturnal relative overflow-hidden reveal', inView && 'in-view')}
      aria-labelledby="cta-heading"
    >
      {/* Radial accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,200,1,0.05) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 50% 50% at 80% 20%, rgba(255,153,50,0.04) 0%, transparent 55%)',
        }}
      />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-forsythia animate-pulse" aria-hidden="true" />
              <span className="text-label" style={{ color: 'rgba(241,246,244,0.35)' }}>
                Start for free today
              </span>
            </div>

            <h2 id="cta-heading" className="text-h1 text-arctic-powder mb-6 leading-tight">
              Your data infrastructure,
              <br />
              <span className="text-gradient-gold">finally automated.</span>
            </h2>

            <p className="text-body-lg mb-10 max-w-lg" style={{ color: 'rgba(241,246,244,0.5)' }}>
              Join thousands of engineering teams that trust {SITE_NAME} to keep
              their data flowing, clean, and on time.
            </p>

            {/* Trust micro-copy */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                'No credit card required',
                '14-day free trial',
                'SOC 2 Type II certified',
                'Cancel anytime',
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-sans text-xs"
                  style={{ color: 'rgba(241,246,244,0.4)' }}
                >
                  <Icon
                    name="chevron-up-solid"
                    size={10}
                    className="text-forsythia/50 rotate-90"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA block */}
          <div
            className="flex flex-col gap-3 min-w-[220px]"
            style={{
              padding: '3rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
            }}
          >
            <Button variant="primary" size="lg" href="#pricing" className="w-full justify-center">
              Get started free
            </Button>
            <Button variant="secondary" size="md" dark href="#" className="w-full justify-center">
              Schedule a demo
            </Button>
            <p className="font-sans text-xs text-center mt-1" style={{ color: 'rgba(241,246,244,0.3)' }}>
              Used by 2,000+ teams worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const CTA = memo(CTAInner);
CTA.displayName = 'CTA';

export default CTA;
