'use client';

// =============================================================================
// BentoGrid — overhauled desktop grid
// =============================================================================

import { cn } from '@/lib/utils';
import type { Feature } from '@/types';
import Icon from '@/components/ui/Icon';
import { useMouseTracking } from '@/hooks/useMouseTracking';

interface BentoGridProps {
  features: Feature[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  inView: boolean;
}

// Layout map: large card spans 2 cols + 2 rows
const BENTO_LAYOUT = [
  'md:col-span-2 md:row-span-2', // large
  'md:col-span-1 md:row-span-1', // medium
  'md:col-span-1 md:row-span-1', // medium
  'md:col-span-1 md:row-span-1', // small
  'md:col-span-1 md:row-span-1', // small
  'md:col-span-1 md:row-span-1', // small
];

interface CardProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  isLarge: boolean;
  colSpan: string;
  onActivate: () => void;
  inView: boolean;
}

function BentoCard({ feature, index, isActive, isLarge, colSpan, onActivate, inView }: CardProps) {
  const { mousePosition, tilt, isHovered, handlers } = useMouseTracking();

  return (
    <article
      {...handlers}
      className={cn(
        'group relative rounded-2xl cursor-pointer select-none flex flex-col',
        'transition-all duration-300 overflow-hidden',
        colSpan,
        isActive ? 'bg-nocturnal' : 'bg-white hover:shadow-[0_12px_40px_rgba(17,76,90,0.08)] hover:z-10',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      )}
      style={{
        transitionDelay: inView && !isHovered ? `${index * 55}ms` : '0ms',
        border: isActive
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(17,76,90,0.09)',
        willChange: 'transform',
        padding: isLarge ? '2rem' : '1.5rem',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.01)` 
          : (inView ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)'),
      }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={`Feature: ${feature.title}`}
    >
      {/* Mouse Follow Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, ${isActive ? 'rgba(255,255,255,0.06)' : 'rgba(17,76,90,0.03)'}, transparent 80%)`,
        }}
      />

      {/* Header Row (Icon + Title) */}
      <div className={cn("flex relative z-10", isLarge ? "flex-col items-start" : "flex-row items-center gap-3 mb-3")}>
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200"
          style={{
            background: isActive ? 'rgba(255,200,1,0.15)' : '#D9E8E2',
            border: isActive ? '1px solid rgba(255,200,1,0.3)' : '1px solid rgba(17,76,90,0.08)',
          }}
        >
          <Icon
            name={feature.icon}
            size={18}
            className={cn(
              isActive ? 'text-forsythia' : 'text-nocturnal',
              "transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3"
            )}
          />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-mono font-semibold leading-snug transition-colors duration-200",
            isLarge && "mb-2.5"
          )}
          style={{
            fontSize: isLarge ? '1.2rem' : '1rem',
            color: isActive ? '#F1F6F4' : '#114C5A',
          }}
        >
          {feature.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className="font-sans leading-relaxed transition-colors duration-200"
        style={{
          fontSize: isLarge ? '0.875rem' : '0.8125rem',
          color: isActive ? 'rgba(241,246,244,0.55)' : 'rgba(17,76,90,0.55)',
        }}
      >
        {feature.description}
      </p>

      {/* Large card: pipeline visualization */}
      {isLarge && (
        <div className="mt-auto pt-6" style={{ borderTop: isActive ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(17,76,90,0.08)' }}>
          <div className="flex items-center gap-1.5">
            {['Source', 'Transform', 'Deliver'].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono"
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    background: isActive ? 'rgba(255,255,255,0.08)' : '#D9E8E2',
                    color: isActive ? 'rgba(241,246,244,0.6)' : 'rgba(17,76,90,0.6)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i === 1
                        ? (isActive ? '#FFC801' : 'rgba(17,76,90,0.3)')
                        : (isActive ? 'rgba(255,255,255,0.25)' : 'rgba(17,76,90,0.2)'),
                      animation: i === 1 && isActive ? 'pulse 2s infinite' : 'none',
                    }}
                    aria-hidden="true"
                  />
                  {step}
                </div>
                {i < 2 && (
                  <Icon
                    name="chevron-right"
                    size={10}
                    style={{ color: isActive ? 'rgba(241,246,244,0.2)' : 'rgba(17,76,90,0.2)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function BentoGrid({ features, activeIndex, setActiveIndex, inView }: BentoGridProps) {
  return (
    <div
      className="grid md:grid-cols-3 md:grid-rows-3 gap-3.5"
      role="list"
      aria-label="Feature list"
    >
      {features.map((feature, index) => (
        <BentoCard
          key={feature.id}
          feature={feature}
          index={index}
          isActive={activeIndex === index}
          isLarge={index === 0}
          colSpan={BENTO_LAYOUT[index] ?? BENTO_LAYOUT[5]}
          onActivate={() => setActiveIndex(index)}
          inView={inView}
        />
      ))}
    </div>
  );
}
