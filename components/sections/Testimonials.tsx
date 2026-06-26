'use client';

// =============================================================================
// Testimonials — masonry-inspired layout with alternating card heights
// =============================================================================

import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { TESTIMONIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function TestimonialsInner() {
  const [ref, inView] = useInView<HTMLElement>();

  const Card = ({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) => (
    <article
      className="rounded-2xl p-7 bg-white border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-md h-full flex flex-col"
      style={{ willChange: 'transform' }}
    >
      {/* Large opening quote */}
      <div
        className="font-mono leading-none mb-4 select-none"
        style={{ fontSize: '3rem', color: 'rgba(17,76,90,0.08)', lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <blockquote className="flex-1">
        <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'rgba(17,76,90,0.7)' }}>
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, #D9E8E2 0%, #F1F6F4 100%)',
            color: '#114C5A',
            border: '1px solid rgba(17,76,90,0.08)',
          }}
          aria-hidden="true"
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-nocturnal leading-none mb-1">
            {testimonial.author}
          </p>
          <p className="font-sans text-xs leading-none" style={{ color: 'rgba(17,76,90,0.4)' }}>
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </footer>
    </article>
  );

  return (
    <section
      ref={ref}
      id="testimonials"
      className={cn('section bg-mystic-mint reveal', inView && 'in-view')}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-nocturnal/40" aria-hidden="true" />
              <span className="text-label" style={{ color: 'rgba(17,76,90,0.4)' }}>
                Testimonials
              </span>
            </div>
            <h2 id="testimonials-heading" className="text-h2 text-nocturnal leading-tight">
              Trusted by<br />engineering leaders
            </h2>
          </div>
          <p
            className="text-body max-w-xs md:text-right"
            style={{ color: 'rgba(17,76,90,0.55)' }}
          >
            From startup to enterprise — teams rely on DataPulse for their most critical data workflows.
          </p>
        </div>

        {/* Auto-scrolling Marquee */}
        <div 
          className={cn('relative w-full overflow-hidden mt-8 reveal-stagger', inView && 'in-view')}
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex gap-5 w-max animate-marquee hover:pause-animation">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={`${t.id}-${i}`} className="w-[350px] md:w-[450px] shrink-0">
                <Card testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}

const Testimonials = memo(TestimonialsInner);
Testimonials.displayName = 'Testimonials';

export default Testimonials;
