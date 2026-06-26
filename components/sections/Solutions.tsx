'use client';

// =============================================================================
// Solutions — light section, horizontal feature strip with inline metric callouts
// =============================================================================

import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/Icon';

const SOLUTIONS = [
  {
    id: 'unified',
    icon: 'link-solid' as const,
    title: 'One unified data layer',
    description:
      'DataPulse becomes the single source of truth for your entire data estate. Every source, every schema, every destination — connected and synchronized automatically.',
    stat: '200+',
    statLabel: 'sources',
  },
  {
    id: 'zero-code',
    icon: 'arrow-path' as const,
    title: 'Zero-maintenance pipelines',
    description:
      'Our AI continuously monitors, adapts, and heals your pipelines. Schema changes, API updates, and rate limits are handled automatically — no manual intervention.',
    stat: '0',
    statLabel: 'maintenance',
  },
  {
    id: 'realtime',
    icon: 'arrow-trending-up' as const,
    title: 'Real-time everywhere',
    description:
      'From raw event to actionable insight in under 100ms. Your dashboards, alerts, and ML models always run on fresh data — never stale, never delayed.',
    stat: '<100ms',
    statLabel: 'latency',
  },
];

function SolutionsInner() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="solutions"
      className={cn('section bg-arctic-powder reveal', inView && 'in-view')}
      aria-labelledby="solutions-heading"
    >
      <div className="container">
        {/* Header — Centered for better balance */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-nocturnal/40" aria-hidden="true" />
            <span className="text-label" style={{ color: 'rgba(17,76,90,0.6)' }}>
              The solution
            </span>
          </div>
          <h2 id="solutions-heading" className="text-h2 text-nocturnal mb-6 leading-tight">
            Infrastructure that works as fast as your team
          </h2>
          <p className="text-body-lg mx-auto" style={{ color: 'rgba(17,76,90,0.65)', maxWidth: '42rem' }}>
            DataPulse replaces your entire data integration layer with a single platform
            that connects, transforms, and delivers data automatically.
          </p>
        </div>

        {/* Solution cards */}
        <div
          className={cn('grid md:grid-cols-3 gap-5 reveal-stagger', inView && 'in-view')}
        >
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.id}
              className="group relative rounded-2xl p-9 bg-white border border-nocturnal/30 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg"
              style={{ willChange: 'transform' }}
            >
              {/* Metric in top-right */}
              <div className="absolute top-8 right-8 text-right">
                <div className="font-mono font-bold text-nocturnal/50 text-2xl leading-none">
                  {solution.stat}
                </div>
                <div className="font-mono text-[9px] font-medium tracking-widest uppercase text-nocturnal/40">
                  {solution.statLabel}
                </div>
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: '#D9E8E2', border: '1px solid rgba(17,76,90,0.1)' }}
              >
                <Icon name={solution.icon} size={20} className="text-nocturnal" />
              </div>

              <h3 className="font-mono font-semibold text-nocturnal text-lg mb-3 leading-snug">
                {solution.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(17,76,90,0.6)' }}>
                {solution.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const Solutions = memo(SolutionsInner);
Solutions.displayName = 'Solutions';

export default Solutions;
