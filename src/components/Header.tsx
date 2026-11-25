import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../data/site";
import { scrollToId, startScroll, stopScroll } from "../lib/motion";

const LINKS = [
  { id: "collections", label: "Collections" },
  { id: "catalogue", label: "Catalogue" },
  { id: "inspiration", label: "Inspiration" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
];

export function Header({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const dy = y - lastY.current;
      if (y < 400) setHidden(false);
      else if (dy > 4) setHidden(true);
      else if (dy < -4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    if (open) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    document.body.style.overflow = "";
    startScroll();
    window.setTimeout(() => scrollToId(id), open ? 450 : 0);
  }, [open]);

  const light = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[var(--ease-lux)] ${
          !visible ? "-translate-y-full opacity-0" : hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(32,32,30,0.08)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1800px] items-center justify-between px-6 transition-all duration-700 md:px-12 ${
            scrolled ? "py-4" : "py-6 md:py-8"
          } ${light || open ? "text-ivory" : "text-charcoal"}`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="relative z-[60] flex flex-col leading-none"
            aria-label={`${SITE.brand} ${SITE.brandSuffix} — home`}
          >
            <span className="display text-[1.7rem] font-normal tracking-[0.22em] md:text-[2rem]">
              {SITE.brand.toUpperCase()}
            </span>
            <span className="mt-1.5 text-[0.55rem] font-normal uppercase tracking-[0.5em] text-gold">
              {SITE.brandSuffix}
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="link-line text-[0.7rem] font-normal uppercase tracking-[0.24em]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className={`ml-2 border px-6 py-3 text-[0.68rem] font-normal uppercase tracking-[0.24em] transition-colors duration-500 ${
                light
                  ? "border-ivory/60 hover:bg-ivory hover:text-charcoal"
                  : "border-charcoal/70 hover:bg-charcoal hover:text-ivory"
              }`}
            >
              Enquire
            </a>
          </nav>

          <button
            className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[var(--ease-lux)] ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-lux)] ${
                  open ? "top-1/2 w-full -rotate-45" : "bottom-0 w-2/3 right-0 left-auto"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[45] bg-charcoal text-ivory transition-[clip-path] duration-[900ms] ease-[var(--ease-lux)] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.concat([{ id: "contact", label: "Enquire" }]).map((l, i) => (
              <div key={l.id} className="overflow-hidden border-b border-ivory/10">
                <a
                  href={`#${l.id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  className="display flex items-baseline justify-between py-4 text-[2.4rem] transition-transform duration-[900ms] ease-[var(--ease-lux)] sm:text-5xl"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(105%)",
                    transitionDelay: open ? `${250 + i * 70}ms` : "0ms",
                  }}
                >
                  <span>{l.label}</span>
                  <span className="text-[0.65rem] tracking-[0.3em] text-gold">0{i + 1}</span>
                </a>
              </div>
            ))}
          </nav>
          <div
            className="mt-10 space-y-2 text-sm text-ivory/60 transition-opacity duration-700"
            style={{ opacity: open ? 1 : 0, transitionDelay: open ? "800ms" : "0ms" }}
          >
            <p className="eyebrow mb-3">Showroom enquiries</p>
            <a href={SITE.phoneHref} className="block text-lg text-ivory">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="block">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
