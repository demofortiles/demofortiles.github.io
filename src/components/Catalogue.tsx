import { useEffect, useMemo, useState } from "react";
import { COLLECTIONS, PRODUCTS, type CategoryId, type Product } from "../data/content";
import { SITE, waLink } from "../data/site";
import { ScrollTrigger } from "../lib/motion";
import { Img } from "./ui/Img";
import { Words } from "./ui/Words";

const PAGE = 9;

interface Props {
  category: CategoryId | "all";
  setCategory: (c: CategoryId | "all") => void;
  onEnquire: (p: Product) => void;
}

export function Catalogue({ category, setCategory, onEnquire }: Props) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const catName = (id: CategoryId) => COLLECTIONS.find((c) => c.id === id)?.name ?? id;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const hay = [p.name, p.material, p.finish, p.description, catName(p.category), p.dimensions.join(" ")]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [category, query]);

  useEffect(() => setLimit(PAGE), [category, query]);

  // Layout height changes when filtering — keep ScrollTrigger positions accurate.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(t);
  }, [results.length, limit]);

  const shown = results.slice(0, limit);

  return (
    <section id="catalogue" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6" data-reveal="fade">
              02 — Product Catalogue
            </p>
            <h2 className="h2" data-split>
              <Words text="The *surface* library." />
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-[1.9] text-charcoal/70" data-reveal>
            Browse a curated selection. Request pricing, samples or full technical sheets in a single message.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-14 border-y border-charcoal/10 py-6 md:mt-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
              role="tablist"
              aria-label="Filter by category"
            >
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                All · {PRODUCTS.length}
              </Chip>
              {COLLECTIONS.map((c) => (
                <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.short}
                </Chip>
              ))}
            </div>

            <label className="relative block w-full lg:w-80">
              <span className="sr-only">Search products</span>
              <svg
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gold"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, finish, material…"
                className="w-full border-0 border-b border-charcoal/25 bg-transparent py-3 pl-8 pr-2 text-[0.95rem] outline-none transition-colors placeholder:text-charcoal/40 focus:border-gold"
              />
            </label>
          </div>
        </div>

        <p className="mt-6 text-[0.7rem] uppercase tracking-[0.26em] text-charcoal/50" aria-live="polite">
          Showing {shown.length} of {results.length} surfaces
        </p>

        {/* Grid */}
        {results.length === 0 ? (
          <div className="py-28 text-center">
            <p className="display text-4xl">No surfaces match your search.</p>
            <p className="mt-4 text-charcoal/60">Try a different keyword, or tell us what you’re looking for.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="btn btn-dark"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Reset filters
              </button>
              <a
                className="btn btn-gold"
                href={waLink(`Hello ${SITE.brand}, I'm looking for: ${query || "a specific tile"}`)}
                target="_blank"
                rel="noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i % PAGE} catLabel={catName(p.category)} onEnquire={onEnquire} />
            ))}
          </div>
        )}

        {limit < results.length && (
          <div className="mt-20 text-center">
            <button className="btn btn-dark" onClick={() => setLimit((l) => l + PAGE)}>
              View more surfaces
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 border px-5 py-2.5 text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-all duration-500 ${
        active
          ? "border-charcoal bg-charcoal text-ivory"
          : "border-charcoal/20 text-charcoal/70 hover:border-gold hover:text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({
  p,
  i,
  catLabel,
  onEnquire,
}: {
  p: Product;
  i: number;
  catLabel: string;
  onEnquire: (p: Product) => void;
}) {
  const message = `Hello ${SITE.brand}, I'd like to request a price for:\n\n${p.name} (${catLabel})\nMaterial: ${p.material}\nFinish: ${p.finish}\nSize: ${p.dimensions[0]}\n\nPlease share pricing and availability.`;
  return (
    <article className="card-in group flex flex-col" style={{ animationDelay: `${i * 70}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Img
          src={p.img}
          alt={`${p.name} ${p.material} tile`}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          width={900}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[0.6rem] font-normal uppercase tracking-[0.24em] text-charcoal">
          {catLabel}
        </span>
        <button
          onClick={() => onEnquire(p)}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/90 py-4 text-center text-[0.65rem] font-normal uppercase tracking-[0.28em] text-ivory backdrop-blur transition-transform duration-700 ease-[var(--ease-lux)] group-hover:translate-y-0 max-md:hidden"
        >
          Add to enquiry form
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="display text-[1.9rem] md:text-[2.1rem]">{p.name}</h3>
        <p className="mt-3 text-[0.9rem] leading-[1.75] text-charcoal/65">{p.description}</p>

        <dl className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10 text-[0.8rem]">
          <Row k="Material" v={p.material} />
          <Row k="Finish" v={p.finish} />
          <Row k="Sizes" v={p.dimensions.join("  ·  ")} />
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={waLink(message)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark !px-6 !py-3.5 !text-[0.66rem]"
          >
            <WhatsAppIcon /> Request Price
          </a>
          <button
            onClick={() => onEnquire(p)}
            className="link-line text-[0.66rem] font-normal uppercase tracking-[0.24em] text-charcoal/70 md:hidden"
          >
            Use enquiry form
          </button>
        </div>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-4 py-3">
      <dt className="w-20 shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-gold">{k}</dt>
      <dd className="text-charcoal/80">{v}</dd>
    </div>
  );
}

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.6 2 2.18 6.42 2.18 11.85c0 1.74.45 3.43 1.31 4.93L2.1 22l5.37-1.41a9.83 9.83 0 0 0 4.56 1.16h.01c5.43 0 9.85-4.42 9.85-9.85 0-2.63-1.02-5.1-2.84-6.99zM12.04 20.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.19.84.85-3.11-.2-.32a8.2 8.2 0 0 1-1.26-4.33c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.4 5.82c0 4.54-3.69 8.24-8.15 8.24zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}
