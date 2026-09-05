/**
 * packages/templates/src/t6-photo/index.ts — the T6 Photo TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t6PhotoTemplate: TemplateEntry = {
  key: 't6-photo',
  displayName: 'T6 · Photo',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t6PhotoDefaultTokens } from './defaultTokens';
export { t6PhotoSchemaPlan } from './schemaPlan';
