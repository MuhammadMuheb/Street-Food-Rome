/**
 * cms/src/seed/seed-templates.ts — seeds the `Templates` registry records
 * (blueprint's build sequence step 3). Only `t3-food` is implemented this
 * pass (see packages/templates/src/registry.ts); the rest are seeded as
 * inert records so Sites.templateId's admin dropdown reflects the full T1–T6
 * plan even before their packages/templates/src/tN-* packs exist.
 *
 * Run: `pnpm --filter @italy-tours/cms seed:templates`
 */
import { getPayload } from 'payload';
import config from '../payload.config';

type TemplateKey = 't1-monument' | 't2-dayzia' | 't3-food' | 't4-cooking' | 't5-vehicle' | 't6-photo';

const TEMPLATES: Array<{ name: string; templateKey: TemplateKey }> = [
  { name: 'T1 · Monument', templateKey: 't1-monument' },
  { name: 'T2 · Day Trip', templateKey: 't2-dayzia' },
  { name: 'T3 · Food', templateKey: 't3-food' },
  { name: 'T4 · Cooking', templateKey: 't4-cooking' },
  { name: 'T5 · Vehicle', templateKey: 't5-vehicle' },
  { name: 'T6 · Photo', templateKey: 't6-photo' },
];

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  for (const template of TEMPLATES) {
    const existing = await payload.find({
      collection: 'templates',
      where: { templateKey: { equals: template.templateKey } },
      limit: 1,
    });

    if (existing.docs[0]) {
      console.log(`Skipping existing template "${template.templateKey}".`);
      continue;
    }

    const created = await payload.create({ collection: 'templates', data: template });
    console.log(`Created template "${template.templateKey}" (id: ${created.id}).`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error('[seed-templates] failed:', err);
  process.exit(1);
});
