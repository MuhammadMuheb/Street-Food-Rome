/**
 * packages/templates/src/t5-vehicle/index.ts — the T5 Vehicle TemplateEntry,
 * registered into packages/templates/src/registry.ts.
 */
import type { TemplateEntry } from '../types';
import { Home } from './layouts/Home';
import { MoneyPage } from './layouts/MoneyPage';
import { About } from './layouts/About';
import { Contact } from './layouts/Contact';

export const t5VehicleTemplate: TemplateEntry = {
  key: 't5-vehicle',
  displayName: 'T5 · Vehicle',
  Home,
  MoneyPage,
  About,
  Contact,
  blockLibrary: ['hero', 'richText', 'tourComparison'],
};

export { t5VehicleDefaultTokens } from './defaultTokens';
export { t5VehicleSchemaPlan } from './schemaPlan';
