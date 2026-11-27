import { TRUST } from "../data/content";
import { Words } from "./ui/Words";

const ICONS: Record<string, React.ReactNode> = {
  gem: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h7v7h-7z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h12v10H2zM14 9h4l4 4v3h-8" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  heart: <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" />,
};

export function WhyUs() {
  return (
    <section id="why" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6" data-reveal="fade">
              05 — Why XYZ...... Tiles
            </p>
            <h2 className="h2" data-split>
              <Words text="The quiet confidence of *getting it right.*" />
            </h2>
            <p className="mt-8 max-w-md text-[0.98rem] leading-[1.9] text-charcoal/70" data-reveal>
              Luxury is not only how a surface looks. It is the certainty behind it — the sourcing, the supply, the
              guidance and the care that follow long after installation.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px bg-charcoal/10 sm:grid-cols-2">
              {TRUST.map((t, i) => (
                <div
                  key={t.title}
                  data-reveal
                  data-delay={(i % 2) * 0.1}
                  className="group relative bg-white p-8 transition-colors duration-700 hover:bg-ivory md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B89B68"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-700 ease-[var(--ease-lux)] group-hover:-translate-y-1 group-hover:scale-110"
                      aria-hidden="true"
                    >
                      {ICONS[t.icon]}
                    </svg>
                    <span className="text-[0.65rem] tracking-[0.3em] text-charcoal/30">0{i + 1}</span>
                  </div>
                  <h3 className="display mt-10 text-[1.7rem] leading-tight md:text-[1.9rem]">{t.title}</h3>
                  <p className="mt-4 text-[0.9rem] leading-[1.8] text-charcoal/65">{t.text}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-1000 ease-[var(--ease-lux)] group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
