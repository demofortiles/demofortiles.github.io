import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../data/content";
import { Words } from "./ui/Words";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 8000);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const t = TESTIMONIALS[i];

  return (
    <section
      id="testimonials"
      className="bg-ivory px-6 py-24 md:px-12 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <p className="eyebrow mb-6" data-reveal="fade">
            08 — Kind Words
          </p>
          <h2 className="h2" data-split>
            <Words text="Trusted by those who *notice* the details." />
          </h2>
        </div>

        <div className="relative mt-16 md:mt-24">
          <span className="display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[9rem] leading-none text-gold/30 md:-top-16 md:text-[14rem]">
            “
          </span>
          <figure key={i} className="fade-swap relative mx-auto min-h-[320px] max-w-4xl text-center md:min-h-[300px]">
            <blockquote className="display text-[1.7rem] leading-[1.35] md:text-[2.6rem]">{t.quote}</blockquote>
            <figcaption className="mt-10">
              <p className="text-[0.75rem] font-normal uppercase tracking-[0.3em]">{t.name}</p>
              <p className="mt-2 text-sm text-charcoal/55">{t.role}</p>
              <p className="mt-5 inline-block border border-gold/50 px-3 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-gold">
                Sample testimonial — replace with a genuine review
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={() => setI((v) => (v - 1 + n) % n)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/25 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-white"
          >
            <svg width="18" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M22 5H1M5 1L1 5l4 4" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                aria-current={k === i}
                className="group flex h-8 items-center"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-[var(--ease-lux)] ${
                    k === i ? "w-12 bg-charcoal" : "w-6 bg-charcoal/30 group-hover:bg-charcoal/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % n)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/25 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-white"
          >
            <svg width="18" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 5h21M17 1l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
