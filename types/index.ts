// =============================================================================
// GLOBAL TYPES — AI SaaS Landing Page
// All types defined here. Strict TypeScript. No `any`.
// =============================================================================

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export type Plan = 'starter' | 'growth' | 'enterprise';
export type Billing = 'monthly' | 'yearly';
export type Currency = 'USD' | 'EUR' | 'INR';

export interface CurrencyConfig {
  symbol: string;
  rate: number;
  locale: string;
}

export interface PricingPlan {
  id: Plan;
  name: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface PricingState {
  billing: Billing;
  currency: Currency;
}

export type PricingAction =
  | { type: 'SET_BILLING'; payload: Billing }
  | { type: 'SET_CURRENCY'; payload: Currency };

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Features / Bento
// ---------------------------------------------------------------------------

export type IconName =
  | 'arrow-path'
  | 'arrow-trending-up'
  | 'chart-pie'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up-solid'
  | 'cog-8-tooth'
  | 'cube-16-solid'
  | 'link-solid'
  | 'link'
  | 'search'
  | 'x-mark';

export type BentoSize = 'large' | 'medium' | 'small';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  size: BentoSize;
  accentClass?: string;
}

// ---------------------------------------------------------------------------
// Performance Metrics
// ---------------------------------------------------------------------------

export interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: IconName;
  description: string;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Trusted By
// ---------------------------------------------------------------------------

export interface TrustedCompany {
  id: string;
  name: string;
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// ---------------------------------------------------------------------------
// Parallax
// ---------------------------------------------------------------------------

export interface ParallaxOffset {
  x: number;
  y: number;
}
