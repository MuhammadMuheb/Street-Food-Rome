/** packages/seo/src/schema/types.ts — shared JSON-LD input/output shapes. */
export type JsonLd = Record<string, unknown>;

export interface SchemaOrgBase {
  name: string;
  description: string;
  url: string;
  imageUrl?: string | null;
}
