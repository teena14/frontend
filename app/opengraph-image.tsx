import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const alt = `${SITE_NAME} - ${SITE_TAGLINE}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F1F6F4',
          color: '#172B36',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: '#114C5A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 16 16">
              <path
                fill="#FFC801"
                d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: '#114C5A' }}>{SITE_NAME}</span>
            <span style={{ fontSize: 20, color: '#114C5A', opacity: 0.65 }}>{SITE_TAGLINE}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 920 }}>
          <h1 style={{ fontSize: 82, lineHeight: 1.02, margin: 0, letterSpacing: 0, color: '#114C5A' }}>
            Automate your data pipelines.
          </h1>
          <p style={{ fontSize: 30, lineHeight: 1.35, margin: 0, color: '#172B36', opacity: 0.72 }}>
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#172B36',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span style={{ width: 16, height: 16, borderRadius: 999, background: '#FFC801' }} />
          AI-driven data automation
        </div>
      </div>
    ),
    size
  );
}
