'use client';

// =============================================================================
// PerformanceMetrics — dark section with animated counters
// Horizontal stat strip layout — more premium than a 4-col grid
// =============================================================================

import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Icon from '@/components/ui/Icon';

function PerformanceMetricsInner() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="performance"
      className={cn('section bg-nocturnal reveal', inView && 'in-view')}
      aria-labelledby="performance-heading"
    >
      <div className="container">
        {/* Top row: label + heading side by side */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forsythia" aria-hidden="true" />
              <span className="text-label" style={{ color: 'rgba(241,246,244,0.35)' }}>
                Performance
              </span>
            </div>
            <h2 id="performance-heading" className="text-h2 text-arctic-powder leading-tight">
              Numbers that speak<br />for themselves
            </h2>
          </div>
          <p
            className="text-body max-w-xs md:text-right"
            style={{ color: 'rgba(241,246,244,0.45)' }}
          >
            Built for teams where data infrastructure is mission-critical.
            These are production numbers, not projections.
          </p>
        </div>

        {/* Stat strip */}
        <div
          className={cn(
            'grid sm:grid-cols-2 lg:grid-cols-4 reveal-stagger',
            inView && 'in-view'
          )}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {METRICS.map((metric, index) => (
            <article
              key={metric.id}
              className="relative flex flex-col gap-4 p-10 transition-colors duration-200"
              style={{
                borderRight: index < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center self-start"
                style={{ background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.15)' }}
              >
                <Icon name={metric.icon} size={18} className="text-forsythia" />
              </div>

              {/* Value */}
              <div>
                <div
                  className="font-mono font-bold text-arctic-powder leading-none mb-2"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
                  aria-label={`${metric.value}${metric.suffix}`}
                >
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    duration={400}
                    decimalPlaces={metric.value % 1 !== 0 ? 2 : 0}
                  />
                </div>
                <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-forsythia/60">
                  {metric.label}
                </p>
              </div>

              <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(241,246,244,0.38)' }}>
                {metric.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PerformanceMetrics = memo(PerformanceMetricsInner);
PerformanceMetrics.displayName = 'PerformanceMetrics';

export default PerformanceMetrics;
