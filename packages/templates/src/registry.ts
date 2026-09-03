/**
 * packages/templates/src/registry.ts — M5 template registry: templateKey ->
 * TemplateEntry. apps/web's renderDispatch looks up a redirect site's
 * template here by `Sites.templateId`'s `templateKey` (Templates collection).
 *
 * Only 't1-monument' through 't6-vehicle/photo' are named per the blueprint;
 * only 't3-food' is implemented this pass. The others are intentionally
 * absent (not stubbed with placeholder components) so a lookup miss is a
 * clear, debuggable "template not implemented" rather than a silent
 * fallback to empty content.
 */
import type { TemplateEntry } from './types';
import { t3FoodTemplate } from './t3-food';

export const templateRegistry: Partial<Record<string, TemplateEntry>> = {
  't3-food': t3FoodTemplate,
};

export function getTemplate(templateKey: string): TemplateEntry | undefined {
  return templateRegistry[templateKey];
}
