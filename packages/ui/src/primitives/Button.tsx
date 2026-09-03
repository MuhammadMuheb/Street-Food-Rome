/**
 * packages/ui/src/primitives/Button.tsx — themed button primitive.
 *
 * Colors resolve through Tailwind's primary/accent tokens (tailwind.config.ts),
 * which in turn resolve through the per-site CSS vars the root layout injects
 * from `Site.themeTokens` — this component never knows which site renders it.
 */
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'accent' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-background hover:opacity-90',
  accent: 'bg-accent text-background hover:opacity-90',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-background',
};

const BASE_CLASSES = 'inline-flex items-center justify-center rounded-site px-5 py-2.5 font-medium transition-colors';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className = '', ...props },
  ref,
) {
  return <button ref={ref} className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
});

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', className = '', ...props },
  ref,
) {
  return <a ref={ref} className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
});
