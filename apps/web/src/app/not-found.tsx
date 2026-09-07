import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-muted">This page doesn&rsquo;t exist on Street Food Rome.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
