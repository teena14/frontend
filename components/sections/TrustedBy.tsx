'use client';

// =============================================================================
// TrustedBy — infinite marquee, tighter & more refined
// =============================================================================

import { memo } from 'react';
import { TRUSTED_COMPANIES } from '@/lib/constants';

function TrustedByInner() {
  const companies = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section
      className="bg-arctic-powder overflow-hidden"
      style={{
        borderTop: '1px solid rgba(17,76,90,0.08)',
        borderBottom: '1px solid rgba(17,76,90,0.08)',
        padding: '2rem 0',
      }}
      aria-label="Trusted by leading companies"
    >
      <div className="container mb-5">
        <p
          className="text-label text-center"
          style={{ color: 'rgba(17,76,90,0.6)' }}
        >
          Trusted by engineering teams at world-class companies
        </p>
      </div>

      <div className="relative overflow-hidden" aria-hidden="true">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--color-arctic-powder), transparent)',
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--color-arctic-powder), transparent)',
          }}
        />

        <div className="marquee-track" role="list">
          {companies.map((company, i) => (
            <div
              key={`${company.id}-${i}`}
              role="listitem"
              className="flex items-center justify-center px-12 py-1 flex-shrink-0"
            >
              <span
                className="font-mono font-semibold tracking-tight select-none whitespace-nowrap text-base"
                style={{ color: 'rgba(17,76,90,0.45)', letterSpacing: '-0.01em' }}
              >
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TrustedBy = memo(TrustedByInner);
TrustedBy.displayName = 'TrustedBy';

export default TrustedBy;
