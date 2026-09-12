import Link from 'next/link';
import { NEIGHBORHOODS } from '@/lib/tours';

export function AllDestinationsSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-3xl">
            All Our Destinations
          </h2>
          <p className="mt-2 text-base text-[#9aa0a5]">A world of possibilities!</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[720px] grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="text-sm text-[#5c6166] transition-colors hover:text-[#ff0022]"
            >
              {n.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
