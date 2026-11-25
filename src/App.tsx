import { useCallback, useEffect, useState } from "react";
import { About } from "./components/About";
import { Catalogue, WhatsAppIcon } from "./components/Catalogue";
import { Collections } from "./components/Collections";
import { Contact, type Prefill } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Inspiration } from "./components/Inspiration";
import { Marquee } from "./components/Marquee";
import { Portfolio } from "./components/Portfolio";
import { Preloader } from "./components/Preloader";
import { Signature } from "./components/Signature";
import { Testimonials } from "./components/Testimonials";
import { WhyUs } from "./components/WhyUs";
import type { CategoryId, Product } from "./data/content";
import { SITE, waLink } from "./data/site";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import { initSmoothScroll, scrollToId, startScroll, stopScroll } from "./lib/motion";

export default function App() {
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });

  useScrollAnimations();

  /* Smooth scrolling (Lenis) — locked until the intro curtain lifts */
  useEffect(() => {
    const destroy = initSmoothScroll();
    if (!ready) stopScroll();
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    if (ready) startScroll();
  }, [ready]);

  const onReveal = useCallback(() => setReady(true), []);

  const exploreCollection = useCallback((id: CategoryId) => {
    setCategory(id);
    scrollToId("catalogue");
  }, []);

  const enquire = useCallback((p: Product) => {
    setPrefill({
      nonce: Date.now(),
      category: p.category,
      message: `I'm interested in ${p.name} (${p.material}, ${p.finish}). Please share pricing and availability for ${p.dimensions[0]}.`,
    });
    scrollToId("contact");
  }, []);

  return (
    <div className="relative">
      <Preloader onReveal={onReveal} />
      <Header visible={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Collections onExplore={exploreCollection} />
        <Catalogue category={category} setCategory={setCategory} onEnquire={enquire} />
        <Inspiration />
        <Signature />
        <WhyUs />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact prefill={prefill} />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={waLink(`Hello ${SITE.brand}, I'd like to enquire about your tiles.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-charcoal shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[var(--ease-lux)] hover:scale-110 hover:bg-charcoal hover:text-gold md:bottom-8 md:right-8 ${
          ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
}
