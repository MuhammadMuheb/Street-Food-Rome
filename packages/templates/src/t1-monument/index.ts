/**
 * packages/templates/src/t1-monument/index.ts — the T1 Monument TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t1MonumentTemplate: TemplateEntry = {
  key: 't1-monument',
  displayName: 'T1 · Monument',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t1MonumentDefaultTokens } from './defaultTokens';
export { t1MonumentSchemaPlan } from './schemaPlan';
