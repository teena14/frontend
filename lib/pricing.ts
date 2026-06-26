// =============================================================================
// PRICING ENGINE — AI SaaS Landing Page
// Pure functions. No side effects. Never hardcode displayed prices in JSX.
// =============================================================================

import type { Plan, Billing, Currency, CurrencyConfig, PricingPlan } from '@/types';

// ---------------------------------------------------------------------------
// Base prices (USD, monthly)
// ---------------------------------------------------------------------------

const BASE_PRICES = {
  starter: 29,
  growth: 79,
  enterprise: 199,
} as const satisfies Record<Plan, number>;

// ---------------------------------------------------------------------------
// Currency matrix
// ---------------------------------------------------------------------------

export const CURRENCY_MATRIX: Record<Currency, CurrencyConfig> = {
  USD: { symbol: '$', rate: 1,     locale: 'en-US' },
  EUR: { symbol: '€', rate: 0.92,  locale: 'de-DE' },
  INR: { symbol: '₹', rate: 83.5,  locale: 'en-IN' },
};

// ---------------------------------------------------------------------------
// Annual discount
// ---------------------------------------------------------------------------

const ANNUAL_DISCOUNT = 0.20; // 20% off

// ---------------------------------------------------------------------------
// calculatePrice — the single source of truth for all displayed prices
// ---------------------------------------------------------------------------

export function calculatePrice(
  plan: Plan,
  billing: Billing,
  currency: Currency
): string {
  const converted = calculateRawPrice(plan, billing, currency);
  return formatPrice(converted, currency);
}

export function calculateRawPrice(
  plan: Plan,
  billing: Billing,
  currency: Currency
): number {
  const base = BASE_PRICES[plan];
  const monthly = billing === 'yearly' ? base * (1 - ANNUAL_DISCOUNT) : base;
  return monthly * CURRENCY_MATRIX[currency].rate;
}

export function calculateAnnualTotal(
  plan: Plan,
  currency: Currency
): string {
  const base = BASE_PRICES[plan];
  const annual = base * (1 - ANNUAL_DISCOUNT) * 12;
  const converted = annual * CURRENCY_MATRIX[currency].rate;
  return formatPrice(converted, currency);
}

export function calculateSavings(
  plan: Plan,
  currency: Currency
): string {
  const base = BASE_PRICES[plan];
  const savings = base * ANNUAL_DISCOUNT * 12;
  const converted = savings * CURRENCY_MATRIX[currency].rate;
  return formatPrice(converted, currency);
}

// ---------------------------------------------------------------------------
// Internal formatter
// ---------------------------------------------------------------------------

function formatPrice(amount: number, currency: Currency): string {
  const { locale, symbol } = CURRENCY_MATRIX[currency];
  
  // Round to nearest whole number for cleaner display
  const rounded = Math.round(amount);
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(rounded);
  } catch {
    // Fallback if Intl fails
    return `${symbol}${rounded.toLocaleString()}`;
  }
}

// ---------------------------------------------------------------------------
// Plan definitions (non-price data)
// ---------------------------------------------------------------------------

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For teams just getting started with data automation.',
    highlighted: false,
    features: [
      '5 active pipelines',
      '1M events per month',
      '10 data connectors',
      'Standard processing speed',
      'Email support',
      '99.5% uptime SLA',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For scaling teams that need more power and flexibility.',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Unlimited pipelines',
      '10M events per month',
      '50+ data connectors',
      'Priority processing',
      'Priority support + Slack',
      '99.9% uptime SLA',
      'Advanced analytics',
      'Custom transformations',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organizations with mission-critical requirements.',
    highlighted: false,
    features: [
      'Unlimited everything',
      'Unlimited events',
      '200+ data connectors',
      'Dedicated infrastructure',
      'Dedicated success manager',
      '99.99% uptime SLA',
      'Custom SLA agreements',
      'SSO + SAML',
      'Audit logs',
    ],
  },
];
