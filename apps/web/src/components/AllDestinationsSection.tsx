import Link from 'next/link';

const DESTINATIONS = [
  'Amalfi Coast',
  'Amsterdam',
  'Athens',
  'Bangkok',
  'Barcelona',
  'Berlin',
  'Bologna',
  'Budapest',
  'Cinque Terre',
  'Copenhagen',
  'Dubai',
  'Dublin',
  'Edinburgh',
  'Florence',
  'Geneva',
  'Istanbul',
  'Lisbon',
  'London',
  'Madrid',
  'Milan',
  'Munich',
  'Naples',
  'New York',
  'Nice',
  'Paris',
  'Positano',
  'Prague',
  'Reykjavik',
  'Rome',
  'Santorini',
  'Seville',
  'Sicily',
  'Singapore',
  'Sorrento',
  'Stockholm',
  'Tokyo',
  'Tuscany',
  'Venice',
  'Vienna',
  'Zurich',
];

export function AllDestinationsSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="text-center">
          <h2 className="font-display text-2xl italic tracking-tight text-[#1a1a1a] sm:text-3xl">
            All Our Destinations
          </h2>
          <p className="mt-2 text-base text-[#9aa0a5]">A world of possibilities!</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DESTINATIONS.map((name) => (
            <Link
              key={name}
              href="#"
              className="text-sm text-[#5c6166] transition-colors hover:text-[#ff0022]"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
