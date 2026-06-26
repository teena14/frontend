'use client';

// =============================================================================
// Problem — dark section, refined visual weight and card hierarchy
// =============================================================================

import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/Icon';

const PAIN_POINTS = [
  {
    id: 'fragmented',
    icon: 'link' as const,
    number: '01',
    title: 'Fragmented data everywhere',
    description:
      'Your data lives in dozens of silos — Postgres, Salesforce, Shopify, Kafka. Every integration breaks differently. Every schema change is a crisis.',
  },
  {
    id: 'engineering',
    icon: 'cog-8-tooth' as const,
    number: '02',
    title: 'Engineering time wasted on pipelines',
    description:
      'Your best engineers spend weeks building and maintaining ETL pipelines instead of building product. Technical debt accumulates. Velocity suffers.',
  },
  {
    id: 'decisions',
    icon: 'chart-pie' as const,
    number: '03',
    title: 'Decisions made on stale data',
    description:
      'Reports run overnight. Dashboards lag by hours. By the time data reaches decision-makers, the moment has already passed.',
  },
];

function ProblemInner() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="problem"
      className={cn('section bg-nocturnal reveal', inView && 'in-view')}
      aria-labelledby="problem-heading"
    >
      <div className="container">
        {/* Section header — left aligned for authority */}
        <div className="max-w-xl mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forsythia" aria-hidden="true" />
            <span className="text-label" style={{ color: 'rgba(241,246,244,0.35)' }}>
              The problem
            </span>
          </div>
          <h2 id="problem-heading" className="text-h2 text-arctic-powder mb-5 leading-tight">
            Data infrastructure is broken for most teams
          </h2>
          <p className="text-body-lg" style={{ color: 'rgba(241,246,244,0.55)' }}>
            The status quo forces engineers to become plumbers. It slows decisions,
            breaks products, and wastes the most expensive resource you have.
          </p>
        </div>

        {/* Cards */}
        <div
          className={cn(
            'grid md:grid-cols-3 gap-px reveal-stagger',
            inView && 'in-view'
          )}
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {PAIN_POINTS.map((point) => (
            <article
              key={point.id}
              className="group relative p-10 transition-colors duration-200"
              style={{ background: '#172B36' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#114C5A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#172B36';
              }}
            >
              {/* Number */}
              <div
                className="font-mono text-[10px] font-semibold tracking-widest uppercase mb-8"
                style={{ color: 'rgba(255,200,1,0.4)' }}
                aria-hidden="true"
              >
                {point.number}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.15)' }}
              >
                <Icon name={point.icon} size={20} className="text-forsythia" />
              </div>

              {/* Text */}
              <h3 className="font-mono font-semibold text-arctic-powder text-lg mb-3 leading-snug">
                {point.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(241,246,244,0.5)' }}>
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const Problem = memo(ProblemInner);
Problem.displayName = 'Problem';

export default Problem;
