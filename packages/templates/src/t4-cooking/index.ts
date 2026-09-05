/**
 * packages/templates/src/t4-cooking/index.ts — the T4 Cooking TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t4CookingTemplate: TemplateEntry = {
  key: 't4-cooking',
  displayName: 'T4 · Cooking',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t4CookingDefaultTokens } from './defaultTokens';
export { t4CookingSchemaPlan } from './schemaPlan';
