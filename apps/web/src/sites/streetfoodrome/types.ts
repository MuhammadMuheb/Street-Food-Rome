/**
 * apps/web/src/sites/streetfoodrome/types.ts — local prop contract, matching
 * (but not importing, to avoid a cycle through renderDispatch.tsx's dynamic
 * import of this very folder) the shape apps/web/src/site-resolver hands to
 * every hero site's default export.
 */
import type { TemplateComponentProps } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';

export interface StreetFoodRomePageProps extends TemplateComponentProps {
  pageType: PageType;
  slug: string;
}
