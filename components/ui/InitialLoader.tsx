'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { cn } from '@/lib/utils';

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Fast 400ms loader
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 200);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 450); // slight buffer for CSS fade out to finish

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-arctic-powder transition-opacity duration-200 ease-out',
        fade ? 'opacity-0' : 'opacity-100'
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-nocturnal shadow-lg"
        >
          <Icon name="cube-16-solid" size={20} className="text-forsythia" />
        </span>
      </div>
    </div>
  );
}
