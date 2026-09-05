/**
 * packages/templates/src/t2-dayzia/index.ts — the T2 Day Trip TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t2DayziaTemplate: TemplateEntry = {
  key: 't2-dayzia',
  displayName: 'T2 · Day Trip',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t2DayziaDefaultTokens } from './defaultTokens';
export { t2DayziaSchemaPlan } from './schemaPlan';
