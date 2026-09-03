/**
 * packages/ui/src/blocks/AuthorBox.tsx — the "named author box" every hero
 * page (blueprint §5.2) must carry, establishing first-hand credibility.
 */
export interface AuthorBoxProps {
  name: string;
  bio?: string;
  avatarUrl?: string;
}

export function AuthorBox({ name, bio, avatarUrl }: AuthorBoxProps) {
  return (
    <div className="flex items-center gap-4 rounded-site border border-foreground/10 p-4">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full object-cover" />
      ) : (
        <div className="h-12 w-12 rounded-full bg-primary/20" aria-hidden />
      )}
      <div>
        <p className="font-heading font-semibold text-foreground">{name}</p>
        {bio ? <p className="text-sm text-foreground/70">{bio}</p> : null}
      </div>
    </div>
  );
}
