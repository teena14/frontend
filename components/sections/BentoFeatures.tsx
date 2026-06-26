'use client';

// =============================================================================
// BentoFeatures — desktop: asymmetric bento grid, mobile: accordion
// Context persistence: active bento card N ↔ accordion panel N on resize.
// Both BentoGrid and AccordionList share the same activeIndex state.
// =============================================================================

import { useState, memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery, BREAKPOINTS } from '@/hooks/useMediaQuery';
import { FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import SectionLabel from '@/components/ui/SectionLabel';
import BentoGrid from './BentoGrid';
import AccordionList from './AccordionList';

function BentoFeaturesInner() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="features"
      className={cn('section bg-mystic-mint reveal', inView && 'in-view')}
      aria-labelledby="features-heading"
    >
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel className="mb-4">Features</SectionLabel>
          <h2 id="features-heading" className="text-h2 text-nocturnal mb-5">
            Everything your data stack needs
          </h2>
          <p className="text-body-lg text-nocturnal/60">
            Purpose-built for engineering teams that need reliability,
            speed, and intelligence in their data infrastructure.
          </p>
        </div>

        {/* Conditional render: bento (desktop) or accordion (mobile) */}
        {isMobile ? (
          <AccordionList
            features={FEATURES}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ) : (
          <BentoGrid
            features={FEATURES}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            inView={inView}
          />
        )}
      </div>
    </section>
  );
}

const BentoFeatures = memo(BentoFeaturesInner);
BentoFeatures.displayName = 'BentoFeatures';

export default BentoFeatures;
