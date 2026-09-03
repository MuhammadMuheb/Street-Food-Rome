/**
 * @italy-tours/config/themeTokens — serialize/parse helpers for carrying a Site's
 * ThemeTokens across the edge middleware -> request header -> root layout boundary.
 *
 * Tokens travel as a compact `key:value;key:value` string (header + cookie safe)
 * rather than JSON, to keep the header small and avoid escaping commas/quotes.
 */

import type { ThemeTokens } from './types';

const PAIR_DELIMITER = ';';
const KV_DELIMITER = ':';

/** Encode ThemeTokens into the compact string carried by `x-theme-tokens` / `site-theme`. */
export function serializeThemeTokens(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `${key}${KV_DELIMITER}${value}`)
    .join(PAIR_DELIMITER);
}

/** Decode the compact token string back into a plain key/value record. */
export function parseThemeTokens(raw: string | null | undefined): Record<string, string> {
  if (!raw) return {};
  return Object.fromEntries(
    raw
      .split(PAIR_DELIMITER)
      .filter(Boolean)
      .map((pair) => {
        const [key, ...rest] = pair.split(KV_DELIMITER);
        return [key, rest.join(KV_DELIMITER)];
      })
      .filter(([key]) => Boolean(key)),
  );
}

/** Convert a decoded token record into React-style inline CSS custom properties. */
export function tokensToCssVars(tokens: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(tokens).map(([key, value]) => [`--${key}`, value]));
}

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  colorPrimary: '#0f172a',
  colorAccent: '#f97316',
  colorBackground: '#ffffff',
  colorForeground: '#0f172a',
  fontHeading: 'system-ui, sans-serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.5rem',
  heroStyle: 'default',
};
