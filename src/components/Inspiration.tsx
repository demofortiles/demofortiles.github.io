import { useState } from "react";
import { INTERLUDE_IMAGE, ROOMS } from "../data/content";
import { scrollToId } from "../lib/motion";
import { Img } from "./ui/Img";
import { Words } from "./ui/Words";

export function Inspiration() {
  const [active, setActive] = useState(0);
  const room = ROOMS[active];

  return (
    <>
      <section id="inspiration" className="bg-charcoal px-6 py-24 text-ivory md:px-12 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="eyebrow mb-6" data-reveal="fade">
                03 — Room Inspiration
              </p>
              <h2 className="h2" data-split>
                <Words text="See how surfaces *transform* a space." />
              </h2>
            </div>
            <p className="max-w-md text-[0.98rem] leading-[1.9] text-ivory/60 md:col-span-4 md:justify-self-end" data-reveal>
              Step inside six rooms. Every material, scale and finish is chosen to make a space feel more considered,
              more calm — and unmistakably yours.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:mt-24 lg:grid-cols-12 lg:gap-14">
            {/* Room list */}
            <div className="min-w-0 lg:col-span-4">
              <ul className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:block lg:overflow-visible lg:px-0" role="tablist">
                {ROOMS.map((r, i) => (
                  <li key={r.id} className="shrink-0 lg:border-b lg:border-ivory/10">
                    <button
                      role="tab"
                      aria-selected={i === active}
                      onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-baseline gap-5 border border-ivory/15 px-5 py-3 text-left transition-all duration-500 lg:border-0 lg:px-0 lg:py-6 ${
                        i === active ? "border-gold bg-ivory/5 lg:bg-transparent" : ""
                      }`}
                    >
                      <span
                        className={`hidden w-8 text-[0.65rem] tracking-[0.3em] transition-colors lg:block ${
                          i === active ? "text-gold" : "text-ivory/35"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`display whitespace-nowrap text-xl transition-all duration-700 ease-[var(--ease-lux)] lg:text-[2.6rem] lg:group-hover:translate-x-2 ${
                          i === active ? "text-ivory lg:translate-x-3" : "text-ivory/45 lg:text-ivory/35"
                        }`}
                      >
                        {r.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stage */}
            <div className="min-w-0 lg:col-span-8">
              <div data-mask="up" className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[4/3] lg:aspect-[16/11]">
                <div data-mask-img className="absolute inset-0">
                  {ROOMS.map((r, i) => (
                    <Img
                      key={r.id}
                      src={r.img}
                      alt={`${r.name} featuring premium tiles`}
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[var(--ease-lux)]"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "scale(1)" : "scale(1.08)",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/20" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
                  <div key={room.id} className="fade-swap max-w-md">
                    <p className="eyebrow mb-3">{room.name}</p>
                    <p className="display text-3xl leading-tight md:text-4xl">{room.caption}</p>
                  </div>
                  <div className="shrink-0 border-t border-ivory/30 pt-4 md:text-right">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-ivory/60">Surface featured</p>
                    <p className="mt-2 text-sm text-ivory">{room.tiles}</p>
                    <button
                      onClick={() => scrollToId("catalogue")}
                      className="link-line mt-4 text-[0.65rem] font-normal uppercase tracking-[0.26em] text-gold"
                    >
                      Shop the look
                    </button>
                  </div>
                </div>
                <div className="absolute right-6 top-6 text-[0.65rem] tracking-[0.3em] text-ivory/80 md:right-10 md:top-8">
                  {String(active + 1).padStart(2, "0")} / {String(ROOMS.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interlude */}
      <section className="relative flex h-[85svh] min-h-[520px] items-center justify-center overflow-hidden bg-charcoal text-ivory">
        <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-parallax="8">
          <Img
            src={INTERLUDE_IMAGE}
            alt="Marble bathroom with glowing glass shower"
            className="h-full w-full object-cover"
            sizes="100vw"
            width={1600}
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="eyebrow mb-8" data-reveal="fade">
            Our philosophy
          </p>
          <p className="display text-[clamp(2.2rem,6vw,5.6rem)]" data-split>
            <Words text="Great spaces begin *beneath* your feet, and on the walls that surround you." />
          </p>
        </div>
      </section>
    </>
  );
}
