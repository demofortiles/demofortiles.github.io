import { useEffect, useMemo, useRef, useState } from "react";
import { MATERIALS, TILE_FORMATS, imgUrl } from "../data/content";
import { SITE, waLink } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { Img } from "./ui/Img";
import { Tilt } from "./ui/Tilt";
import { Words } from "./ui/Words";

const STEPS = [
  {
    n: "01",
    title: "Selected at the source",
    text: "We walk the quarries ourselves, choosing blocks for tone, vein and structure — and reject far more than we accept.",
    img: 3575827,
  },
  {
    n: "02",
    title: "Finished with care",
    text: "Slabs are cut, calibrated and finished in polished, honed or textured surfaces, then inspected under studio lighting.",
    img: 7078360,
  },
  {
    n: "03",
    title: "Installed to perfection",
    text: "Our consultants guide layout, grout and sealing so the finished surface looks exactly as it did in your imagination.",
    img: 6987720,
  },
];

export function Signature() {
  const [matIdx, setMatIdx] = useState(0);
  const [fmtId, setFmtId] = useState(TILE_FORMATS[0].id);
  const [polished, setPolished] = useState(true);
  const root = useRef<HTMLElement>(null);

  const mat = MATERIALS[matIdx];
  const fmt = TILE_FORMATS.find((f) => f.id === fmtId)!;
  const url = imgUrl(mat.img, 1000);

  // Floor tile grid (in plane coordinates the plane is 2W wide × 0.7W deep)
  const tiles = useMemo(() => {
    const tileW = 2 / fmt.cols;
    const tileH = tileW * (fmt.h / fmt.w);
    const rows = Math.max(1, Math.ceil(0.7 / tileH));
    const n = rows * fmt.cols;
    const bigSize = fmt.cols >= 8 ? 340 : fmt.cols >= 6 ? 240 : 0;
    return Array.from({ length: n }, (_, i) => ({
      x: (i * 37 + 11) % 100,
      y: (i * 61 + 7) % 100,
      flip: (i * 7) % 3 === 0,
      size: bigSize,
    }));
  }, [fmt]);

  /* Scroll-linked storytelling */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".story", start: "top 70%", end: "bottom 65%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".story-step").forEach((s) => {
        gsap.fromTo(
          s,
          { opacity: 0.25 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: s, start: "top 85%", end: "top 55%", scrub: true } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const waMsg = `Hello ${SITE.brand}, I explored the ${mat.name} in ${fmt.label} (${polished ? "polished" : "honed"}) on your website and would like to know more.`;

  return (
    <section id="experience" ref={root} className="overflow-hidden bg-beige px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6 !text-charcoal/60" data-reveal="fade">
              04 — Signature Experience
            </p>
            <h2 className="h2" data-split>
              <Words text="Design your *surface,* in perspective." />
            </h2>
          </div>
          <p className="max-w-md text-[0.98rem] leading-[1.9] text-charcoal/70 md:col-span-4 md:justify-self-end" data-reveal>
            Choose a material, a tile format and a finish — and watch the room respond. Move your cursor across the scene
            to feel the depth.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* STAGE */}
          <div className="lg:col-span-8" data-reveal>
            <Tilt max={3} className="w-full">
              <div
                className="relative w-full overflow-hidden bg-charcoal shadow-[0_40px_80px_-30px_rgba(32,32,30,0.55)]"
                style={{ containerType: "inline-size", aspectRatio: "16 / 11" }}
              >
                <div key={`${mat.id}-${fmt.id}`} className="fade-swap absolute inset-0">
                  {/* WALL — three book-matched large-format slabs */}
                  <div className="absolute inset-x-0 top-0 flex gap-[2px] bg-charcoal" style={{ height: "52%" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="relative flex-1 overflow-hidden"
                        style={{
                          backgroundImage: `url(${url})`,
                          backgroundSize: "cover",
                          backgroundPosition: i === 0 ? "20% 40%" : i === 1 ? "80% 60%" : "50% 20%",
                          transform: i === 1 ? "scaleX(-1)" : undefined,
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
                  </div>

                  {/* FLOOR — perspective plane */}
                  <div
                    className="absolute inset-x-0 bottom-0 overflow-hidden"
                    style={{ top: "52%", perspective: "90cqw", perspectiveOrigin: "50% 0%" }}
                  >
                    <div
                      className="absolute top-0 grid"
                      style={{
                        left: "-50%",
                        width: "200%",
                        height: "70cqw",
                        transformOrigin: "50% 0%",
                        transform: "rotateX(70deg)",
                        gridTemplateColumns: `repeat(${fmt.cols}, 1fr)`,
                        gridAutoRows: `${(2 / fmt.cols) * (fmt.h / fmt.w) * 100}cqw`,
                        gap: "0.28cqw",
                        background: "#1a1a19",
                        willChange: "transform",
                      }}
                    >
                      {tiles.map((t, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: t.size ? `${t.size}% auto` : "cover",
                            backgroundPosition: `${t.x}% ${t.y}%`,
                            transform: t.flip ? "scaleX(-1)" : undefined,
                          }}
                        />
                      ))}
                    </div>
                    {/* depth + sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-transparent" />
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                      style={{
                        opacity: polished ? 1 : 0,
                        background:
                          "linear-gradient(112deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.28) 46%, rgba(255,255,255,0) 62%)",
                      }}
                    />
                    {!polished && <div className="pointer-events-none absolute inset-0 bg-charcoal/10" />}
                  </div>
                  {/* skirting shadow */}
                  <div className="absolute inset-x-0 h-[2px] bg-black/60" style={{ top: "52%" }} />
                </div>

                {/* HUD */}
                <div className="pointer-events-none absolute left-4 top-4 bg-ivory/90 px-3 py-2 text-[0.6rem] uppercase tracking-[0.26em] text-charcoal md:left-6 md:top-6">
                  {mat.name}
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 bg-charcoal/80 px-3 py-2 text-[0.6rem] uppercase tracking-[0.26em] text-ivory backdrop-blur md:bottom-6 md:right-6">
                  {fmt.label} · {polished ? "Polished" : "Honed"}
                </div>
              </div>
            </Tilt>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col gap-10 lg:col-span-4" data-reveal data-delay="0.15">
            <div>
              <p className="eyebrow mb-4 !text-charcoal/60">Material</p>
              <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
                {MATERIALS.map((m, i) => (
                  <li key={m.id}>
                    <button
                      onClick={() => setMatIdx(i)}
                      aria-pressed={i === matIdx}
                      className="group flex w-full items-center gap-4 py-3 text-left"
                    >
                      <span
                        className={`relative h-12 w-12 shrink-0 overflow-hidden transition-all duration-500 ${
                          i === matIdx ? "ring-1 ring-gold ring-offset-2 ring-offset-beige" : "opacity-80"
                        }`}
                        style={{ background: m.tone }}
                      >
                        <Img src={m.img} alt="" width={200} sizes="48px" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <span className="flex-1">
                        <span className={`display block text-2xl transition-colors ${i === matIdx ? "text-charcoal" : "text-charcoal/60"}`}>
                          {m.name}
                        </span>
                        <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-charcoal/50">{m.origin}</span>
                      </span>
                      <span
                        className={`h-px bg-charcoal transition-all duration-700 ease-[var(--ease-lux)] ${
                          i === matIdx ? "w-8" : "w-0"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-charcoal/70" key={mat.id}>
                <span className="fade-swap inline-block">{mat.note}</span>
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4 !text-charcoal/60">Format</p>
              <div className="flex flex-wrap gap-2">
                {TILE_FORMATS.map((f) => (
                  <Pill key={f.id} active={f.id === fmtId} onClick={() => setFmtId(f.id)}>
                    {f.label}
                  </Pill>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4 !text-charcoal/60">Finish</p>
              <div className="flex gap-2">
                <Pill active={polished} onClick={() => setPolished(true)}>
                  Polished
                </Pill>
                <Pill active={!polished} onClick={() => setPolished(false)}>
                  Honed
                </Pill>
              </div>
            </div>

            <a href={waLink(waMsg)} target="_blank" rel="noreferrer" className="btn btn-dark self-start">
              Request this surface
            </a>
          </div>
        </div>

        {/* STORYTELLING */}
        <div className="story mt-28 md:mt-48">
          <div className="relative mb-12 h-px w-full bg-charcoal/15 max-md:hidden">
            <div className="story-progress absolute inset-0 origin-left bg-charcoal" />
          </div>
          <div className="grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-16">
            {STEPS.map((s) => (
              <div key={s.n} className="story-step">
                <div data-mask="up" className="relative aspect-[4/3] overflow-hidden bg-charcoal/10">
                  <div data-mask-img className="h-full w-full">
                    <Img src={s.img} alt={s.title} sizes="(min-width: 768px) 30vw, 92vw" width={900} className="h-full w-full object-cover" />
                  </div>
                </div>
                <p className="display mt-8 text-6xl text-gold">{s.n}</p>
                <h3 className="display mt-2 text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-sm text-[0.92rem] leading-[1.85] text-charcoal/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2.5 text-[0.66rem] font-normal uppercase tracking-[0.2em] transition-all duration-500 ${
        active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/30 text-charcoal/70 hover:border-charcoal"
      }`}
    >
      {children}
    </button>
  );
}
