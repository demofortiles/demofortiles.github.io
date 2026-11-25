import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const mq = (q: string) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(q) : null;

export const prefersReducedMotion = () => !!mq("(prefers-reduced-motion: reduce)")?.matches;
export const isCoarsePointer = () => !!mq("(hover: none), (pointer: coarse)")?.matches;
export const isSmallScreen = () => !!mq("(max-width: 767px)")?.matches;

/* ---------- Smooth scroll (Lenis) ---------- */
let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}
