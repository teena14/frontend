'use client';

// =============================================================================
// AccordionList — mobile accordion for features (mirrors BentoGrid)
// Uses grid-template-rows trick for smooth animation — no JS height measurement.
// Keyboard accessible: Enter/Space to toggle, Arrow keys to navigate.
// Shares activeIndex with BentoGrid for context persistence on resize.
// =============================================================================

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Feature } from '@/types';
import Icon from '@/components/ui/Icon';

interface AccordionListProps {
  features: Feature[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function AccordionList({
  features,
  activeIndex,
  setActiveIndex,
}: AccordionListProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      next = (index + 1) % features.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      next = (index - 1 + features.length) % features.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = features.length - 1;
    } else {
      return;
    }
    itemRefs.current[next]?.focus();
    setActiveIndex(next);
  };

  return (
    <div
      role="list"
      aria-label="Feature list"
      className="flex flex-col gap-2"
    >
      {features.map((feature, index) => {
        const isOpen = activeIndex === index;
        const triggerId = `accordion-trigger-${feature.id}`;
        const panelId = `accordion-panel-${feature.id}`;

        return (
          <div
            key={feature.id}
            role="listitem"
            className={cn(
              'rounded-2xl overflow-hidden transition-all duration-200',
              isOpen
                ? 'bg-nocturnal shadow-md'
                : 'bg-white/70 hover:bg-white',
              'border',
              isOpen ? 'border-white/10' : 'border-border'
            )}
          >
            {/* Trigger */}
            <button
              ref={(el) => { itemRefs.current[index] = el; }}
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                'w-full flex items-center gap-4 p-5 text-left',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia focus-visible:ring-inset'
              )}
              onClick={() => setActiveIndex(isOpen ? -1 : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                  isOpen ? 'bg-forsythia/15' : 'bg-mystic-mint'
                )}
              >
                <Icon
                  name={feature.icon}
                  size={16}
                  className={isOpen ? 'text-forsythia' : 'text-nocturnal/70'}
                />
              </div>

              <span
                className={cn(
                  'flex-1 font-mono font-semibold text-base transition-colors duration-200',
                  isOpen ? 'text-arctic-powder' : 'text-nocturnal'
                )}
              >
                {feature.title}
              </span>

              {/* Chevron — rotates on open */}
              <Icon
                name="chevron-down"
                size={16}
                className={cn(
                  'flex-shrink-0 transition-all duration-200',
                  isOpen ? 'text-forsythia rotate-180' : 'text-nocturnal/40'
                )}
              />
            </button>

            {/* Panel — grid-template-rows trick */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="accordion-content"
              data-open={isOpen.toString()}
            >
              <div className="accordion-inner">
                <p
                  className={cn(
                    'font-sans text-sm leading-relaxed px-5 pb-5 transition-colors duration-200',
                    isOpen ? 'text-text-on-dark-muted' : 'text-nocturnal/55'
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
