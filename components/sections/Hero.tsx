'use client';

// =============================================================================
// Hero — premium first impression
// Tighter vertical rhythm, stronger type scale, refined layout
// =============================================================================

import { memo, useRef } from 'react';
import { useParallax } from '@/hooks/useParallax';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import DashboardPreview from '@/components/ui/DashboardPreview';

function HeroInner() {
  const heroRef = useRef<HTMLElement>(null);
  const parallax = useParallax(heroRef as React.RefObject<HTMLElement | null>);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden bg-arctic-powder bg-noise bg-grid-pattern"
      style={{ paddingTop: '64px' }}
      aria-labelledby="hero-headline"
    >
      {/* Grid lines */}
      <div className="grid-background" aria-hidden="true" />

      {/* Soft radial top glow */}
      <div
        className="radial-blur"
        aria-hidden="true"
        style={{
          top: '-10%', left: '20%', width: '60%', height: '50%',
          background: 'rgba(217,232,226,0.5)',
        }}
      />

      <div className="container relative z-10 pt-8 pb-24 lg:pt-10 lg:pb-32">
        <div className="grid lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_580px] gap-16 xl:gap-24 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start gap-7 max-w-2xl mt-5">

            {/* H1 */}
            <h1 id="hero-headline" className="text-h1 text-nocturnal animate-letter-space" style={{ gap: 0 }}>
              <span
                className="hero-reveal block"
                style={{ animationDelay: '100ms', lineHeight: 1.1 }}
              >
                Automate your
              </span>
              <span
                className="hero-reveal block text-gradient-gold"
                style={{ animationDelay: '160ms', lineHeight: 1.1 }}
              >
                data pipelines.
              </span>
              <span
                className="hero-reveal block"
                style={{ animationDelay: '220ms', lineHeight: 1.15 }}
              >
                Accelerate decisions.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="hero-reveal text-body-lg leading-relaxed max-w-[480px]"
              style={{ animationDelay: '300ms', color: 'rgba(17,76,90,0.6)' }}
            >
              Connect every data source. Clean every schema. Deliver every insight
              in real-time — so your engineers can build product, not pipelines.
            </p>

            {/* CTAs */}
            <div
              className="hero-reveal flex flex-wrap items-center gap-3"
              style={{ animationDelay: '380ms' }}
            >
              <Button variant="primary" size="lg" href="#pricing" className="group">
                Start for free
                <Icon name="chevron-right" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" href="#features">
                See how it works
              </Button>
            </div>

            {/* Trust signals */}
            <div
              className="hero-reveal flex flex-wrap md:flex-nowrap items-center gap-x-5 gap-y-2"
              style={{ animationDelay: '440ms' }}
            >
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 font-sans text-xs whitespace-nowrap"
                    style={{ color: 'rgba(17,76,90,0.45)' }}
                  >
                    <Icon name="chevron-up-solid" size={10} className="text-forsythia rotate-90" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* ── Right column: Dashboard with parallax ── */}
          <div
            className="hero-reveal relative hidden lg:block mt-9"
            style={{
              animationDelay: '200ms',
              transform: `translate(${parallax.x * -10}px, ${parallax.y * -6}px)`,
              transition: 'transform 0.12s linear',
              willChange: 'transform',
            }}
          >
            <div className="relative">
              <DashboardPreview />

              {/* Floating Cards */}
              <div className="absolute -left-12 top-20 bg-white p-3 rounded-xl shadow-xl border border-border flex items-center gap-3 float-anim" style={{ animationDelay: '0s' }}>
                <div className="w-8 h-8 rounded-full bg-forsythia/20 flex items-center justify-center">
                  <Icon name="cube-16-solid" size={16} className="text-deep-saffron animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-sans text-nocturnal/60 leading-none mb-1">Status</div>
                  <div className="text-sm font-mono font-bold text-nocturnal leading-none">AI Processing...</div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-32 bg-white p-3 rounded-xl shadow-xl border border-border flex items-center gap-3 float-anim" style={{ animationDelay: '-2s' }}>
                <div className="w-8 h-8 rounded-full bg-mystic-mint flex items-center justify-center">
                  <Icon name="chevron-up-solid" size={14} className="text-oceanic-noir rotate-90" />
                </div>
                <div>
                  <div className="text-xs font-sans text-nocturnal/60 leading-none mb-1">Last minute</div>
                  <div className="text-sm font-mono font-bold text-nocturnal leading-none">+423 Requests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-arctic-powder))',
        }}
      />
    </section>
  );
}

const Hero = memo(HeroInner);
Hero.displayName = 'Hero';

export default Hero;
