'use client';

// =============================================================================
// FAQ — accessible accordion with keyboard navigation
// Keyboard: Enter/Space to toggle, Arrow keys to navigate between items.
// ARIA: role="region", aria-expanded, aria-controls, aria-labelledby.
// Animation: grid-template-rows trick — smooth without JS height calc.
// =============================================================================

import { memo, useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import SectionLabel from '@/components/ui/SectionLabel';
import Icon from '@/components/ui/Icon';

function FAQInner() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [ref, inView] = useInView<HTMLElement>();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      next = (index + 1) % FAQ_ITEMS.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      next = (index - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = FAQ_ITEMS.length - 1;
    } else {
      return;
    }
    itemRefs.current[next]?.focus();
  };

  return (
    <section
      ref={ref}
      id="faq"
      className={cn('section bg-arctic-powder reveal', inView && 'in-view')}
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 xl:gap-20">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-24 self-start">
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <h2 id="faq-heading" className="text-h2 text-nocturnal mb-5">
              Frequently asked questions
            </h2>
            <p className="text-body text-nocturnal/60 leading-relaxed mb-8">
              Everything you need to know about DataPulse.
              Can&apos;t find what you&apos;re looking for?
            </p>
            <a
              href="mailto:support@datapulse.ai"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-nocturnal hover:text-nocturnal/70 transition-colors duration-150"
            >
              <Icon name="link" size={14} className="text-nocturnal/40" />
              Talk to our team
            </a>
          </div>

          {/* Right: accordion */}
          <div
            role="list"
            aria-label="Frequently asked questions"
            className="flex flex-col"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  role="listitem"
                  className="border-b border-border"
                >
                  {/* Trigger */}
                  <button
                    ref={(el) => { itemRefs.current[index] = el; }}
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                      'w-full flex items-start gap-4 py-5 text-left',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forsythia focus-visible:ring-inset',
                      'group'
                    )}
                  >
                    <span
                      className={cn(
                        'flex-1 font-sans font-medium leading-snug transition-colors duration-150',
                        isOpen ? 'text-nocturnal' : 'text-nocturnal/70 group-hover:text-nocturnal'
                      )}
                    >
                      {item.question}
                    </span>

                    {/* Chevron — animates on open */}
                    <span
                      className={cn(
                        'flex-shrink-0 mt-0.5 transition-transform duration-200 ease-out',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden="true"
                    >
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={isOpen ? 'text-nocturnal' : 'text-nocturnal/30'}
                      />
                    </span>
                  </button>

                  {/* Panel — grid-template-rows animation */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="accordion-content"
                    data-open={isOpen.toString()}
                  >
                    <div className="accordion-inner">
                      <p className="font-sans text-sm text-nocturnal/60 leading-relaxed pb-5 pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ = memo(FAQInner);
FAQ.displayName = 'FAQ';

export default FAQ;
