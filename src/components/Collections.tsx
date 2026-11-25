import { COLLECTIONS, type CategoryId, type Collection } from "../data/content";
import { Img } from "./ui/Img";
import { Words } from "./ui/Words";

const ASPECTS = ["aspect-[4/5]", "aspect-[1/1]", "aspect-[5/6]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[5/6]", "aspect-[1/1]"];

export function Collections({ onExplore }: { onExplore: (id: CategoryId) => void }) {
  const left = COLLECTIONS.filter((_, i) => i % 2 === 0);
  const right = COLLECTIONS.filter((_, i) => i % 2 === 1);

  return (
    <section id="collections" className="relative bg-ivory px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6" data-reveal="fade">
              01 — The Collections
            </p>
            <h2 className="h2" data-split>
              <Words text="Eight worlds of *surface,* one standard of excellence." />
            </h2>
          </div>
          <p className="max-w-md text-[0.98rem] leading-[1.9] text-charcoal/70 md:col-span-4 md:justify-self-end" data-reveal>
            From the veined drama of Italian marble to the engineered calm of large-format porcelain, each collection is
            chosen for beauty, character and longevity.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:mt-28 md:grid-cols-2 lg:gap-x-20">
          <div className="flex flex-col gap-16 md:gap-28">
            {left.map((c) => (
              <Card key={c.id} c={c} index={COLLECTIONS.indexOf(c)} aspect={ASPECTS[COLLECTIONS.indexOf(c)]} onExplore={onExplore} />
            ))}
          </div>
          <div className="flex flex-col gap-16 md:mt-44 md:gap-28">
            {right.map((c) => (
              <Card key={c.id} c={c} index={COLLECTIONS.indexOf(c)} aspect={ASPECTS[COLLECTIONS.indexOf(c)]} onExplore={onExplore} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  c,
  index,
  aspect,
  onExplore,
}: {
  c: Collection;
  index: number;
  aspect: string;
  onExplore: (id: CategoryId) => void;
}) {
  return (
    <article className="group">
      <button
        onClick={() => onExplore(c.id)}
        className="block w-full text-left"
        aria-label={`Explore ${c.name} collection`}
      >
        <div data-mask="up" className={`relative w-full overflow-hidden bg-beige ${aspect}`}>
          <div data-mask-img className="h-full w-full">
            <Img
              src={c.img}
              alt={`${c.name} — sample surface`}
              sizes="(min-width: 768px) 46vw, 92vw"
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-[1.07]"
            />
          </div>
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/30" />
          <span className="absolute left-5 top-5 text-[0.65rem] font-normal tracking-[0.35em] text-white/90 md:left-7 md:top-7">
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Hover reveal */}
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-6 items-center justify-between p-7 opacity-0 transition-all duration-700 ease-[var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <span className="text-[0.7rem] font-normal uppercase tracking-[0.3em] text-white">Explore Collection</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white">
              <svg width="18" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M0 5h21M17 1l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6" data-reveal>
          <div>
            <h3 className="display text-[2rem] md:text-[2.6rem]">{c.name}</h3>
            <p className="mt-2 max-w-sm text-[0.92rem] leading-[1.8] text-charcoal/65">{c.blurb}</p>
          </div>
          <div className="shrink-0 pt-2 text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">{c.designs} designs</p>
            <p className="link-line mt-3 text-[0.65rem] font-normal uppercase tracking-[0.26em] md:hidden">Explore</p>
          </div>
        </div>
      </button>
    </article>
  );
}
