/**
 * packages/templates/src/t3-food/index.ts — the T3 Food TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t3FoodTemplate: TemplateEntry = {
  key: 't3-food',
  displayName: 'T3 · Food',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t3FoodDefaultTokens } from './defaultTokens';
export { t3FoodSchemaPlan } from './schemaPlan';
