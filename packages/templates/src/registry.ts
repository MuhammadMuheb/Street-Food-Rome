/**
 * packages/templates/src/registry.ts — M5 template registry: templateKey ->
 * TemplateEntry. apps/web's renderDispatch looks up a redirect site's
 * template here by `Sites.templateId`'s `templateKey` (Templates collection).
 *
 * All six category packs (T1-monument through T6-photo) are registered.
 * A lookup miss (an unregistered templateKey) is a clear, debuggable
 * "template not implemented" rather than a silent fallback to empty content.
 */
import type { TemplateEntry } from './types';
import { t1MonumentTemplate } from './t1-monument';
import { t2DayziaTemplate } from './t2-dayzia';
import { t3FoodTemplate } from './t3-food';
import { t4CookingTemplate } from './t4-cooking';
import { t5VehicleTemplate } from './t5-vehicle';
import { t6PhotoTemplate } from './t6-photo';

export const templateRegistry: Partial<Record<string, TemplateEntry>> = {
  't1-monument': t1MonumentTemplate,
  't2-dayzia': t2DayziaTemplate,
  't3-food': t3FoodTemplate,
  't4-cooking': t4CookingTemplate,
  't5-vehicle': t5VehicleTemplate,
  't6-photo': t6PhotoTemplate,
};

export function getTemplate(templateKey: string): TemplateEntry | undefined {
  return templateRegistry[templateKey];
}
