// =============================================================================
// SITE CONSTANTS — AI SaaS Landing Page
// Single source of truth for all static content data.
// =============================================================================

import type {
  NavLink,
  Feature,
  Metric,
  Testimonial,
  FAQItem,
  TrustedCompany,
} from '@/types';

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export const SITE_NAME = 'DataPulse';
export const SITE_TAGLINE = 'AI-Driven Data Automation';
export const SITE_DESCRIPTION =
  'DataPulse connects, cleans, and delivers your data in real-time so your team can focus on what matters. Automate your pipelines. Accelerate your decisions.';
export const SITE_URL = 'https://datapulse.ai';

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Performance', href: '#performance' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

// ---------------------------------------------------------------------------
// Trusted By
// ---------------------------------------------------------------------------

export const TRUSTED_COMPANIES: TrustedCompany[] = [
  { id: 'stripe', name: 'Stripe' },
  { id: 'notion', name: 'Notion' },
  { id: 'linear', name: 'Linear' },
  { id: 'vercel', name: 'Vercel' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'twilio', name: 'Twilio' },
  { id: 'intercom', name: 'Intercom' },
  { id: 'airtable', name: 'Airtable' },
  { id: 'figma', name: 'Figma' },
  { id: 'retool', name: 'Retool' },
];

// ---------------------------------------------------------------------------
// Features (Bento)
// ---------------------------------------------------------------------------

export const FEATURES: Feature[] = [
  {
    id: 'realtime-sync',
    title: 'Real-Time Data Sync',
    description:
      'Bidirectional synchronization across all your data sources. Changes propagate in under 100ms with zero data loss and automatic conflict resolution.',
    icon: 'arrow-path',
    size: 'large',
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description:
      'AI-powered forecasting that surfaces trends before they happen. Get actionable insights from your data automatically.',
    icon: 'chart-pie',
    size: 'medium',
  },
  {
    id: 'smart-integrations',
    title: 'Smart Integrations',
    description:
      'Connect to 200+ data sources with one click. Our intelligent connectors handle schema mapping, auth, and rate limiting automatically.',
    icon: 'link-solid',
    size: 'medium',
  },
  {
    id: 'auto-configuration',
    title: 'Auto-Configuration',
    description:
      'DataPulse learns your data patterns and self-configures optimal pipeline settings.',
    icon: 'cog-8-tooth',
    size: 'small',
  },
  {
    id: 'data-discovery',
    title: 'Data Discovery',
    description:
      'Instantly search and explore any field across your entire data estate.',
    icon: 'search',
    size: 'small',
  },
  {
    id: 'trend-analysis',
    title: 'Trend Analysis',
    description:
      'Surface emerging patterns in your data with automated anomaly detection.',
    icon: 'arrow-trending-up',
    size: 'small',
  },
];

// ---------------------------------------------------------------------------
// Performance Metrics
// ---------------------------------------------------------------------------

export const METRICS: Metric[] = [
  {
    id: 'uptime',
    value: 99.99,
    suffix: '%',
    label: 'Uptime SLA',
    icon: 'arrow-trending-up',
    description: 'Enterprise-grade reliability with automatic failover',
  },
  {
    id: 'events',
    value: 50,
    suffix: 'M+',
    label: 'Events Processed Daily',
    icon: 'arrow-path',
    description: 'Billions of data points processed every month',
  },
  {
    id: 'integrations',
    value: 200,
    suffix: '+',
    label: 'Native Integrations',
    icon: 'link-solid',
    description: 'Connect to every tool your team already uses',
  },
  {
    id: 'speed',
    value: 3,
    suffix: 'x',
    label: 'Faster Decisions',
    icon: 'chart-pie',
    description: 'Teams move 3x faster with automated data pipelines',
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'DataPulse cut our data pipeline setup time from weeks to hours. The auto-configuration feature alone saved our engineering team months of work.',
    author: 'Sarah Chen',
    role: 'Head of Data Engineering',
    company: 'Shopify',
    initials: 'SC',
  },
  {
    id: 't2',
    quote:
      'The real-time sync is genuinely impressive. We process over 2 million events per day and the latency is consistently under 100ms.',
    author: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'Retool',
    initials: 'MR',
  },
  {
    id: 't3',
    quote:
      "We evaluated five platforms before choosing DataPulse. The predictive analytics out-of-the-box is what sealed it—it's like having an extra data scientist.",
    author: 'Priya Kapoor',
    role: 'VP of Analytics',
    company: 'Notion',
    initials: 'PK',
  },
  {
    id: 't4',
    quote:
      'The 99.99% uptime SLA is not marketing. We have been on DataPulse for 14 months and have had zero incidents affecting production data.',
    author: 'James Liu',
    role: 'Infrastructure Lead',
    company: 'Intercom',
    initials: 'JL',
  },
  {
    id: 't5',
    quote:
      'Migration from our legacy ETL was seamless. Their team handled the entire schema mapping process. We were live in 48 hours.',
    author: 'Amelia Foster',
    role: 'Data Architect',
    company: 'Airtable',
    initials: 'AF',
  },
  {
    id: 't6',
    quote:
      'DataPulse has become the backbone of our entire data stack. Every dashboard, every report, every alert runs through it.',
    author: 'Daniel Park',
    role: 'Director of Engineering',
    company: 'Linear',
    initials: 'DP',
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does it take to set up DataPulse?',
    answer:
      'Most teams are fully operational within 48 hours. Our guided onboarding connects your first data source in under 10 minutes, and the auto-configuration engine handles the rest. For enterprise deployments with custom infrastructure requirements, our dedicated team typically completes setup within one week.',
  },
  {
    id: 'faq-2',
    question: 'Which data sources does DataPulse support?',
    answer:
      'DataPulse supports 200+ native integrations including databases (PostgreSQL, MySQL, MongoDB, Snowflake, BigQuery), SaaS applications (Salesforce, HubSpot, Stripe, Shopify), messaging queues (Kafka, RabbitMQ, SQS), and any REST or GraphQL API. The connector library expands monthly based on customer requests.',
  },
  {
    id: 'faq-3',
    question: 'How does the pricing work if my usage changes?',
    answer:
      'Pricing scales with your needs. Upgrades take effect immediately. Downgrades take effect at the next billing cycle. For the Growth plan, event overages are billed at $0.002 per 1,000 events. Enterprise plans include a negotiated overage rate. You can monitor usage in real-time from your dashboard.',
  },
  {
    id: 'faq-4',
    question: 'What does the 20% annual discount apply to?',
    answer:
      'The 20% discount applies to all base subscription fees when you choose annual billing. This means you pay for 9.6 months instead of 12. The discount is applied immediately and reflected in your first invoice.',
  },
  {
    id: 'faq-5',
    question: 'How is data security handled?',
    answer:
      'DataPulse is SOC 2 Type II certified and GDPR compliant. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). We operate on isolated, single-tenant infrastructure for Enterprise plans. Your data is never used to train models or shared with third parties. We support IP allowlisting, SSO/SAML, and granular role-based access control.',
  },
  {
    id: 'faq-6',
    question: 'What happens if I exceed my event limit?',
    answer:
      'We never drop data. If you approach your monthly limit, you receive automated alerts at 80% and 95% usage. Overages are processed seamlessly and billed at the end of the cycle. You can also set a hard cap that queues events rather than overages, giving you full control over costs.',
  },
  {
    id: 'faq-7',
    question: 'Can I migrate from another data platform?',
    answer:
      'Yes. DataPulse provides a free migration service for Growth and Enterprise customers. Our migration team audits your existing pipelines, maps the schema, and runs parallel validation for 30 days before cutover. Most migrations complete with zero downtime.',
  },
  {
    id: 'faq-8',
    question: 'Is there a free trial?',
    answer:
      'All plans include a 14-day free trial with no credit card required. You get full access to all features at your chosen plan tier. After the trial, you are only charged if you choose to continue. Enterprise trials can be extended to 30 days upon request.',
  },
];
