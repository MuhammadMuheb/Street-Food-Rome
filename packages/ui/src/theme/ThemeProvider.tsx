'use client';

/**
 * packages/ui/src/theme/ThemeProvider.tsx — client-side access to the current
 * site's ThemeTokens.
 *
 * Styling itself never needs this — the root layout already injects tokens
 * as CSS custom properties, and Tailwind classes read those directly. This
 * provider exists for the minority of components that need the *value* in
 * JS, not just CSS (e.g. branching on `heroStyle` to pick a layout variant).
 */
import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_THEME_TOKENS, type ThemeTokens } from '@italy-tours/config';

const ThemeContext = createContext<ThemeTokens>(DEFAULT_THEME_TOKENS);

export interface ThemeProviderProps {
  tokens: ThemeTokens;
  children: ReactNode;
}

export function ThemeProvider({ tokens, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeTokens {
  return useContext(ThemeContext);
}
