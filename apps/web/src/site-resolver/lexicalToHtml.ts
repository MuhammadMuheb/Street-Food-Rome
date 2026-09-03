/**
 * apps/web/src/site-resolver/lexicalToHtml.ts — minimal Lexical richText ->
 * HTML for the T3 Food `NeighbourhoodGuide` block and hero support pages.
 *
 * Deliberately minimal: walks paragraph nodes and their plain text only, no
 * bold/links/lists formatting. Good enough for the placeholder body copy
 * this pass seeds; swap for `@payloadcms/richtext-lexical`'s full HTML
 * converter if/when rich formatting in body copy is actually needed.
 */
interface LexicalTextNode {
  type: string;
  text?: string;
  children?: LexicalTextNode[];
}

export function lexicalToPlainHtml(richText: unknown): string {
  if (!richText || typeof richText !== 'object') return '';
  const root = (richText as { root?: { children?: LexicalTextNode[] } }).root;
  if (!root?.children) return '';

  const paragraphs: string[] = [];
  for (const node of root.children) {
    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      const text = node.children.map((child) => child.text ?? '').join('');
      if (text) paragraphs.push(`<p>${text}</p>`);
    }
  }
  return paragraphs.join('');
}
