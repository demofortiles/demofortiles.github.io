import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { SITE } from "../data/site";

/** Cinematic intro: brand reveal + progress, then the curtain lifts to reveal the hero. */
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal();
      setGone(true);
      return;
    }
    const ctx = gsap.context(() => {
      const state = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      tl.from(".pl-char", { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.06 }, 0.1)
        .from(".pl-sub", { opacity: 0, y: 10, duration: 0.9, ease: "power3.out" }, 0.7)
        .to(
          state,
          {
            v: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, "0");
            },
          },
          0.1
        )
        .to(bar.current, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1)
        .to(".pl-content", { opacity: 0, y: -24, duration: 0.55, ease: "power2.in" }, 2.0)
        .call(onReveal, [], 2.35)
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.25, ease: "expo.inOut" }, 2.35);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal text-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div className="pl-content flex flex-col items-center px-6 text-center">
        <div className="overflow-hidden pb-2">
          <div className="display flex text-[clamp(2.8rem,10vw,7rem)] tracking-[0.18em]">
            {SITE.brand
              .toUpperCase()
              .split("")
              .map((c, i) => (
                <span key={i} className="pl-char inline-block">
                  {c}
                </span>
              ))}
          </div>
        </div>
        <p className="pl-sub eyebrow mt-3">{SITE.brandSuffix} · Est. {SITE.established}</p>
        <div className="mt-14 flex w-[min(280px,70vw)] flex-col gap-3">
          <div className="h-px w-full bg-ivory/15">
            <div ref={bar} className="h-px origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
          </div>
          <span ref={count} className="self-end text-[0.65rem] tracking-[0.3em] text-ivory/50">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
