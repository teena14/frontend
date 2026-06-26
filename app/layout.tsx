import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import InitialLoader from '@/components/ui/InitialLoader';

// =============================================================================
// Font Configuration — loaded via next/font/google (NO @import, NO link tags)
// Fonts are optimized, preloaded, and subsetted automatically by Next.js.
// =============================================================================

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

// =============================================================================
// Metadata — Full SEO, Open Graph, Twitter Cards
// =============================================================================

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — AI-Driven Data Automation`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'data automation',
    'AI data pipeline',
    'real-time sync',
    'data integration',
    'ETL platform',
    'data engineering',
    'predictive analytics',
    'DataPulse',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI-Driven Data Automation`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI-Driven Data Automation Platform`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI-Driven Data Automation`,
    description: SITE_DESCRIPTION,
    creator: '@datapulseai',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// =============================================================================
// Root Layout
// =============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-arctic-powder text-nocturnal antialiased">
        <InitialLoader />
        {children}
      </body>
    </html>
  );
}
