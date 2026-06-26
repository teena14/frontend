'use client';

// =============================================================================
// DashboardPreview — refined synthetic UI, no placeholders
// =============================================================================

import { useEffect, useRef } from 'react';
import Icon from './Icon';

const CHART_DATA = [38, 60, 42, 78, 52, 88, 68, 82, 58, 94, 72, 100];
const RECENT_EVENTS = [
  { id: 1, source: 'Postgres', records: '12,450', status: 'synced', time: '2s ago' },
  { id: 2, source: 'Stripe API', records: '3,891', status: 'synced', time: '18s ago' },
  { id: 3, source: 'Salesforce', records: '7,203', status: 'processing', time: '1m ago' },
];

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 220;
      const y = 56 - (v / max) * 50;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,56 ${points} 220,56`;

  return (
    <>
      <svg
        viewBox="0 0 220 60"
        className="w-full"
        style={{ height: '42px' }}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC801" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon 
          points={areaPoints} 
          fill="url(#chartGrad)" 
          style={{ opacity: 0, animation: 'fadeIn 300ms ease-out forwards 120ms' }}
        />
        <polyline
          points={points}
          fill="none"
          stroke="#FFC801"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="400"
          strokeDashoffset="400"
          style={{ animation: 'drawLine 360ms ease-out forwards 80ms' }}
        />
        {/* Last point indicator */}
        <circle
          cx="220"
          cy={56 - (data[data.length - 1] / max) * 50}
          r="3"
          fill="#FFC801"
          stroke="rgba(255,200,1,0.3)"
          strokeWidth="4"
          style={{ animation: 'breathe 400ms ease-in-out, fadeIn 200ms ease-out forwards', opacity: 0, animationDelay: '160ms, 160ms' }}
        />
      </svg>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}} />
    </>
  );
}

export default function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.animationPlayState = 'running';
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] mx-auto"
      aria-label="DataPulse dashboard preview"
      role="img"
    >
      {/* Shadow glow beneath card */}
      <div
        className="absolute -bottom-6 left-8 right-8 h-12 blur-2xl opacity-40"
        style={{ background: '#114C5A' }}
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #114C5A 0%, #172B36 100%)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow:
            '0 24px 64px rgba(23,43,54,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Browser chrome bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div
            className="flex-1 mx-4 h-5 rounded flex items-center px-2.5"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <span
              className="font-mono"
              style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em' }}
            >
              app.datapulse.ai / dashboard
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <p
                className="font-mono tracking-wider uppercase mb-0.5"
                style={{ fontSize: '9px', color: 'rgba(241,246,244,0.3)' }}
              >
                Pipeline Overview
              </p>
              <p
                className="font-mono font-semibold"
                style={{ fontSize: '13px', color: 'rgba(241,246,244,0.85)' }}
              >
                Live Dashboard
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
              style={{
                background: 'rgba(255,200,1,0.08)',
                borderColor: 'rgba(255,200,1,0.2)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-forsythia animate-pulse"
                aria-hidden="true"
              />
              <span className="font-mono" style={{ fontSize: '9px', color: '#FFC801', fontWeight: 600 }}>
                LIVE
              </span>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Events/sec', value: '2,847', icon: 'arrow-trending-up' as const, delta: '+12%', up: true },
              { label: 'Pipelines', value: '24', icon: 'arrow-path' as const, delta: 'Active', up: true },
              { label: 'P95 Latency', value: '48ms', icon: 'cog-8-tooth' as const, delta: '↓8%', up: false },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl p-3"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon name={metric.icon} size={11} className="text-white/25 mt-0.5" />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: metric.up ? '#FFC801' : '#FF9932',
                    }}
                  >
                    {metric.delta}
                  </span>
                </div>
                <p
                  className="font-mono font-bold leading-none mb-1"
                  style={{ fontSize: '15px', color: 'rgba(241,246,244,0.9)' }}
                >
                  {metric.value}
                </p>
                <p className="font-sans" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.3)', lineHeight: 1 }}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="rounded-xl p-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono uppercase tracking-wider" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.3)' }}>
                Throughput
              </span>
              <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.25)' }}>
                Last 12h
              </span>
            </div>
            <MiniChart data={CHART_DATA} />
          </div>

          {/* Recent syncs */}
          <div className="space-y-1.5">
            <p className="font-mono uppercase tracking-wider" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.25)' }}>
              Recent Syncs
            </p>
            {RECENT_EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: event.status === 'synced' ? '#FF9932' : '#FFC801',
                    boxShadow: event.status === 'processing' ? '0 0 6px #FFC801' : 'none',
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono flex-1 truncate"
                  style={{ fontSize: '10px', color: 'rgba(241,246,244,0.55)' }}
                >
                  {event.source}
                </span>
                <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.3)' }}>
                  {event.records}
                </span>
                <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(241,246,244,0.2)' }}>
                  {event.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge — uptime */}
      <div
        className="absolute -top-5 -right-5 float-anim"
        style={{ animationDelay: '120ms', zIndex: 10 }}
        aria-hidden="true"
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono font-semibold text-sm"
          style={{
            background: 'rgba(255,200,1,0.95)',
            color: '#172B36',
            boxShadow: '0 8px 24px rgba(255,200,1,0.4), 0 2px 4px rgba(255,200,1,0.2)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          ↑ 99.99% uptime
        </div>
      </div>

      {/* Floating badge — integrations */}
      <div
        className="absolute -bottom-5 -left-5 float-anim"
        style={{ animationDelay: '160ms', zIndex: 10 }}
        aria-hidden="true"
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs font-medium"
          style={{
            background: '#F1F6F4',
            color: '#114C5A',
            boxShadow: '0 8px 24px rgba(23,43,54,0.18)',
            border: '1px solid rgba(17,76,90,0.1)',
          }}
        >
          <Icon name="link-solid" size={11} className="text-nocturnal" />
          200+ integrations live
        </div>
      </div>
    </div>
  );
}
