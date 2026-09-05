/**
 * packages/governance/src/extractLexicalContent.ts — pulls plain text and
 * any link URLs out of a Lexical richText JSON tree in a single walk.
 *
 * Deliberately schema-agnostic: rather than hardcode
 * `@payloadcms/richtext-lexical`'s exact link-node shape (which varies by
 * version/feature config), this walks every object in the tree and collects
 * any `text` string it finds, and any `url`/`href` string it finds. Robust
 * to richText growing real formatting/links later — today's body content is
 * plain paragraphs only (see apps/web's lexicalToHtml.ts), so this currently
 * always returns an empty `links` array in practice, but the governance
 * rule needs to hold even once that changes.
 */
export interface ExtractedContent {
  text: string;
  links: string[];
}

function walk(node: unknown, texts: string[], links: string[]): void {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, texts, links);
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === 'text' && typeof value === 'string') {
        texts.push(value);
      } else if ((key === 'url' || key === 'href') && typeof value === 'string') {
        links.push(value);
      } else if (value && typeof value === 'object') {
        walk(value, texts, links);
      }
    }
  }
}

export function extractLexicalContent(root: unknown): ExtractedContent {
  const texts: string[] = [];
  const links: string[] = [];
  walk(root, texts, links);
  return { text: texts.join(' '), links };
}

/** A Pages.body doc is a `blocks` array; only the richText block carries prose. */
export function extractBodyContent(body: unknown): ExtractedContent {
  if (!Array.isArray(body)) return { text: '', links: [] };
  const richTextBlocks = body.filter(
    (block): block is { blockType: string; content?: unknown } =>
      typeof block === 'object' && block !== null && (block as { blockType?: unknown }).blockType === 'richText',
  );
  const texts: string[] = [];
  const links: string[] = [];
  for (const block of richTextBlocks) {
    const extracted = extractLexicalContent(block.content);
    texts.push(extracted.text);
    links.push(...extracted.links);
  }
  return { text: texts.join(' '), links };
}
