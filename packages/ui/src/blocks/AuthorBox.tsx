/**
 * packages/ui/src/blocks/AuthorBox.tsx — the "named author box" every hero
 * page (blueprint §5.2) must carry, establishing first-hand credibility.
 *
 * The monogram fallback is deliberate, not a placeholder-photo stand-in: a
 * generic stock photo presented next to a specific named author would claim
 * to be a real person it isn't. A photo only renders here once a real
 * `avatarUrl` exists for that person.
 */
import Image from 'next/image';

export interface AuthorBoxProps {
  name: string;
  bio?: string;
  avatarUrl?: string;
}

export function AuthorBox({ name, bio, avatarUrl }: AuthorBoxProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 rounded-site border border-foreground/10 bg-background p-5 shadow-sm">
      {avatarUrl ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <Image src={avatarUrl} alt={name} fill sizes="56px" className="object-cover" />
        </div>
      ) : (
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-inverse"
        >
          {initial}
        </div>
      )}
      <div>
        <p className="font-heading font-semibold text-foreground">{name}</p>
        {bio ? <p className="mt-0.5 text-sm text-foreground/65">{bio}</p> : null}
      </div>
    </div>
  );
}
