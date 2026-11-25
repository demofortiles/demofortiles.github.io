import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, isSmallScreen, prefersReducedMotion } from "../lib/motion";

/**
 * Declarative scroll animations driven by data attributes:
 *  - data-split           → masked word reveal for <Words> inside
 *  - data-reveal="up|fade|left|right" (+ data-delay)
 *  - data-mask="up|left|right|down"  → clip-path image reveal (inner <img> scales down)
 *  - data-parallax="8"    → scrubbed parallax (percent of element height)
 *  - data-line            → horizontal line draw
 *
 * Lighter on mobile (no scrub parallax, shorter travel). Skipped for reduced motion.
 */
export function useScrollAnimations() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const small = isSmallScreen();

    const ctx = gsap.context(() => {
      /* word reveals */
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const words = el.querySelectorAll(".word");
        if (!words.length) return;
        gsap.set(words, { yPercent: 115 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(words, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: small ? 0.04 : 0.07 }),
        });
      });

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.delay || "0");
        const dist = small ? 24 : 44;
        const from: gsap.TweenVars = { opacity: 0 };
        if (kind === "up") from.y = dist;
        if (kind === "left") from.x = -dist;
        if (kind === "right") from.x = dist;
        gsap.set(el, from);
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 1.2, delay, ease: "power3.out", clearProps: "transform" }),
        });
      });

      /* clip-path image masks */
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const dir = el.dataset.mask || "up";
        const hidden: Record<string, string> = {
          up: "inset(100% 0% 0% 0%)",
          down: "inset(0% 0% 100% 0%)",
          left: "inset(0% 100% 0% 0%)",
          right: "inset(0% 0% 0% 100%)",
        };
        const img = el.querySelector<HTMLElement>("[data-mask-img]");
        gsap.set(el, { clipPath: hidden[dir] || hidden.up });
        if (img) gsap.set(img, { scale: 1.25 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
            if (img) gsap.to(img, { scale: 1, duration: 2.2, ease: "expo.out" });
          },
        });
      });

      /* parallax (disabled on small screens for performance) */
      if (!small) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "8");
          gsap.fromTo(
            el,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }

      /* line draws */
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: el,
          start: "top 95%",
          once: true,
          onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.6, ease: "expo.out" }),
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);
}
