const ITEMS = [
  "Italian Marble",
  "Porcelain",
  "Onyx",
  "Natural Stone",
  "Large Format Slabs",
  "Wood Finish",
  "Ceramic",
  "Outdoor Elevation",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-b border-charcoal/10 bg-ivory py-6 md:py-8" aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="display whitespace-nowrap px-8 text-3xl italic text-charcoal/80 md:px-12 md:text-5xl">
                  {t}
                </span>
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
