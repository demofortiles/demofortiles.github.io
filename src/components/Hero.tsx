import { useEffect, useRef } from "react";
import { gsap, isSmallScreen, prefersReducedMotion, scrollToId } from "../lib/motion";
import { HERO_IMAGE } from "../data/content";
import { SITE } from "../data/site";
import { Img } from "./ui/Img";
import { Magnetic } from "./ui/Magnetic";
import { Words } from "./ui/Words";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  /* Parallax + fade on scroll */
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      if (!isSmallScreen()) {
        gsap.to(".hero-parallax", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "20% top", end: "75% top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  /* Initial hidden state (before reveal) */
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-title .word", { yPercent: 115 });
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      gsap.set(".hero-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(zoom.current, { scale: 1.35 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  /* Cinematic reveal once the preloader curtain lifts */
  useEffect(() => {
    if (!ready || reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(zoom.current, { scale: 1, duration: 4.2, ease: "expo.out" });
      const tl = gsap.timeline({ delay: 0.35 });
      tl.to(".hero-title .word", { yPercent: 0, duration: 1.5, ease: "expo.out", stagger: 0.09 })
        .to(".hero-line", { scaleX: 1, duration: 1.8, ease: "expo.out" }, 0.4)
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.12 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal text-ivory">
      {/* Background */}
      <div className="hero-parallax absolute inset-x-0 -top-[7%] h-[114%]">
        <div ref={zoom} className="h-full w-full will-change-transform">
          <Img
            src={HERO_IMAGE}
            alt="Grand hall with polished Italian marble floors and sculptural staircase"
            className="h-full w-full object-cover"
            eager
            width={1800}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/55" />

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto flex h-full max-w-[1800px] flex-col justify-end px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32">
        <p className="hero-fade eyebrow mb-6 md:mb-8">Luxury Tiles &amp; Surfaces — Collection {new Date().getFullYear()}</p>

        <h1 className="hero-title display text-[clamp(2.9rem,min(9.4vw,17vh),10rem)] uppercase">
          <span className="block">
            <Words text="Surfaces" />
          </span>
          <span className="block">
            <Words text="that define" />
          </span>
          <span className="block">
            <Words text="*luxury.*" />
          </span>
        </h1>

        <div className="hero-line mt-8 h-px w-full bg-ivory/25 md:mt-12" />

        <div className="mt-7 flex flex-col gap-8 md:mt-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="hero-fade text-[0.95rem] leading-[1.8] text-ivory/80 md:text-[1.05rem]">
              Timeless design, uncompromising craftsmanship and the finest premium materials — curated from Italy’s
              great quarries and the world’s leading ateliers, for homes and spaces that are meant to last.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <button className="btn btn-light" onClick={() => scrollToId("collections")}>
                  Explore Collection
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0 5h21M17 1l4 4-4 4" />
                  </svg>
                </button>
              </Magnetic>
              <button
                onClick={() => scrollToId("contact")}
                className="link-line text-[0.7rem] font-normal uppercase tracking-[0.26em] text-ivory/90"
              >
                Book a consultation
              </button>
            </div>
          </div>

          <div className="hero-fade hidden items-end gap-10 md:flex">
            <div className="text-right text-[0.65rem] uppercase leading-[2] tracking-[0.3em] text-ivory/60">
              <p>Est. {SITE.established}</p>
              <p>Marble · Porcelain · Onyx · Stone</p>
            </div>
            <button
              onClick={() => scrollToId("collections")}
              className="flex flex-col items-center gap-4"
              aria-label="Scroll to collections"
            >
              <span className="text-[0.62rem] uppercase tracking-[0.4em] text-ivory/70 [writing-mode:vertical-rl]">
                Scroll
              </span>
              <span className="scroll-cue relative block h-16 w-px overflow-hidden bg-ivory/25" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
