/**
 * packages/ui/src/blocks/BreadcrumbNav.tsx — visible breadcrumb trail. Pairs
 * with the BreadcrumbList JSON-LD builder in packages/seo/src/schema.
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground/60">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
