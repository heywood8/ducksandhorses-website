export type Locale = typeof locales[number];
// Import emitted JS filename for NodeNext resolution; suppress unresolved during TS phase.
// eslint-disable-next-line import/no-unresolved
import { siteConfig } from './siteConfig.js';

export const locales = siteConfig.locales.supported;
export const defaultLocale = siteConfig.locales.default;

const messages: Record<string, Record<string,string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.conditions': 'Conditions',
    // Removed legacy entries: blog, faq, contact
  }
  // Additional locales can be added here.
};

export function t(key: string, locale: string = defaultLocale): string {
  return messages[locale]?.[key] || messages[defaultLocale]?.[key] || key;
}
