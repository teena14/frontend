import type { Billing, Currency } from '@/types';

type Listener = () => void;

class PricingStore {
  private billing: Billing = 'monthly';
  private currency: Currency = 'USD';
  private listeners: Set<Listener> = new Set();

  getBilling = (): Billing => {
    return this.billing;
  }

  getCurrency = (): Currency => {
    return this.currency;
  }

  setBilling = (billing: Billing) => {
    if (this.billing === billing) return;
    this.billing = billing;
    this.notify();
  }

  setCurrency = (currency: Currency) => {
    if (this.currency === currency) return;
    this.currency = currency;
    this.notify();
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify = () => {
    this.listeners.forEach((listener) => listener());
  }
}

export const pricingStore = new PricingStore();
