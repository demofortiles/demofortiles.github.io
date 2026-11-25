import { useEffect, useRef } from "react";
import { ABOUT_IMAGE, SHOWROOM_IMAGE, STATS } from "../data/content";
import { SITE } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { Img } from "./ui/Img";
import { Words } from "./ui/Words";

const PILLARS = [
  {
    n: "I",
    title: "Product philosophy",
    text: "We believe a surface should age beautifully. We choose materials with honest character — natural variation, real depth — and never chase trends at the expense of timelessness.",
  },
  {
    n: "II",
    title: "Experience & expertise",
    text: "Over two decades of sourcing, specifying and supplying for architects, builders and private clients means we anticipate the details that others discover too late.",
  },
  {
    n: "III",
    title: "Commitment to quality",
    text: "Every consignment is inspected for shade, calibration and finish. If it is not good enough for our own showroom, it never reaches yours.",
  },
];

export function About() {
  const stats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stats.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-count]");
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const target = parseInt(n.dataset.count || "0", 10);
        const o = { v: 0 };
        n.textContent = "0";
        gsap.to(o, {
          v: target,
          duration: 2.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            n.textContent = Math.round(o.v).toLocaleString();
          },
        });
      });
    }, el);
    return () => {
      ctx.revert();
      nums.forEach((n) => (n.textContent = parseInt(n.dataset.count || "0", 10).toLocaleString()));
    };
  }, []);

  return (
    <section id="about" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Images */}
          <div className="relative lg:col-span-6">
            <div data-mask="right" className="relative aspect-[4/5] w-[86%] overflow-hidden bg-beige">
              <div data-mask-img className="absolute inset-0">
                <div data-parallax="6" className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <Img src={ABOUT_IMAGE} alt="Interior with warm natural stone detailing" sizes="(min-width: 1024px) 45vw, 80vw" width={1400} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 right-0 w-[52%] md:-bottom-16">
              <div data-mask="left" className="relative aspect-[4/3] overflow-hidden border-[10px] border-white bg-beige md:border-[14px]">
                <div data-mask-img className="absolute inset-0">
                  <Img src={SHOWROOM_IMAGE} alt="Showroom photography placeholder" sizes="(min-width: 1024px) 24vw, 45vw" width={900} className="h-full w-full object-cover" />
                </div>
              </div>
              <p className="mt-3 text-right text-[0.6rem] uppercase tracking-[0.26em] text-charcoal/50">
                The showroom · photography placeholder
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <p className="eyebrow mb-6" data-reveal="fade">
              07 — The Brand
            </p>
            <h2 className="h2" data-split>
              <Words text="A house of stone, *since* 1998." />
            </h2>
            <div className="mt-10 space-y-6 text-[0.98rem] leading-[1.95] text-charcoal/70" data-reveal>
              <p>
                {SITE.brand} began as a small family atelier with one conviction: that the surface beneath your feet
                and around your life deserves the same care as the furniture upon it.
              </p>
              <p>
                Today we curate more than four hundred marbles, porcelains, onyx and stones — working closely with
                architects, designers and homeowners to turn good spaces into unforgettable ones.
              </p>
            </div>
            <p className="display mt-10 border-l border-gold pl-6 text-2xl italic leading-snug text-charcoal md:text-3xl" data-reveal>
              “We do not sell tiles. We help you choose the backdrop of your life.”
            </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={stats} className="mt-36 grid grid-cols-2 gap-y-10 border-t border-charcoal/10 pt-12 md:mt-48 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="md:border-l md:border-charcoal/10 md:pl-8 md:first:border-0 md:first:pl-0">
              <p className="display text-5xl md:text-7xl">
                <span data-count={s.value}>{s.value.toLocaleString()}</span>
                <span className="text-gold">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.26em] text-charcoal/55">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-3 md:gap-10 lg:gap-20">
          {PILLARS.map((p, i) => (
            <div key={p.n} data-reveal data-delay={i * 0.12}>
              <div className="mb-8 h-px w-full bg-charcoal/15" data-line />
              <p className="display text-3xl italic text-gold">{p.n}</p>
              <h3 className="display mt-4 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-5 text-[0.92rem] leading-[1.9] text-charcoal/65">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
