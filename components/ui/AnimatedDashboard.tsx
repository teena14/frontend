'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function AnimatedDashboard() {
  const [counter, setCounter] = useState(128);

  // Fake live counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl bg-white border border-border shadow-2xl overflow-hidden flex flex-col">
      {/* Top Header */}
      <div className="h-12 border-b border-border flex items-center px-4 justify-between bg-arctic-powder/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-nocturnal/20" />
          <div className="w-3 h-3 rounded-full bg-nocturnal/20" />
          <div className="w-3 h-3 rounded-full bg-nocturnal/20" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-forsythia animate-pulse" />
          <span className="text-xs font-mono font-medium text-nocturnal/60">LIVE</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 relative">
        
        {/* Animated Notification Slide-in */}
        <div 
          className="absolute top-4 right-4 bg-oceanic-noir text-arctic-powder text-xs font-sans px-3 py-2 rounded-lg shadow-lg flex items-center gap-2"
          style={{
            animation: 'slideInLeft 300ms ease-out 120ms forwards, fadeOut 300ms ease-in 480ms forwards',
            opacity: 0,
            transform: 'translateX(20px)'
          }}
        >
          <Icon name="chevron-up-solid" size={12} className="text-forsythia rotate-90" />
          Pipeline sync complete
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-arctic-powder/20">
            <div className="text-xs font-sans text-nocturnal/60 mb-1">Total Events Processed</div>
            <div className="text-2xl font-mono font-bold text-nocturnal">
              {counter.toLocaleString()}M
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-arctic-powder/20">
            <div className="text-xs font-sans text-nocturnal/60 mb-1">Current Latency</div>
            <div className="text-2xl font-mono font-bold text-nocturnal flex items-baseline gap-1">
              42 <span className="text-sm font-sans font-normal text-nocturnal/50">ms</span>
            </div>
          </div>
        </div>

        {/* Fake Graph */}
        <div className="flex-1 rounded-xl border border-border bg-arctic-powder/10 p-4 flex flex-col">
          <div className="text-xs font-sans font-medium text-nocturnal/70 mb-4">Throughput (last 24h)</div>
          <div className="flex-1 relative w-full h-full">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#114C5A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#114C5A" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="#114C5A" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#114C5A" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#114C5A" strokeOpacity="0.05" strokeWidth="1" />
              
              {/* Fill */}
              <path 
                d="M0 100 L0 60 C50 60, 80 80, 150 50 C220 20, 280 90, 350 40 L400 30 L400 100 Z"
                fill="url(#gradient)"
              />
              
              {/* Animated Stroke */}
              <path 
                d="M0 60 C50 60, 80 80, 150 50 C220 20, 280 90, 350 40 L400 30"
                fill="none"
                stroke="#114C5A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="500"
                strokeDashoffset="500"
                style={{ animation: 'drawLine 360ms ease-out forwards 80ms' }}
              />

              {/* Pulsing Dot at the end */}
              <circle 
                cx="400" 
                cy="30" 
                r="4" 
                fill="#FFC801" 
                style={{ animation: 'breathe 400ms ease-in-out', opacity: 0, animationDelay: '160ms' }} 
              />
            </svg>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes slideInLeft {
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
