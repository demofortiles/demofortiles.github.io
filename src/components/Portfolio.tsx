import { PROJECTS, type Project } from "../data/content";
import { Img } from "./ui/Img";
import { Words } from "./ui/Words";

/** Asymmetric editorial layout: each project gets its own grid placement. */
const LAYOUT = [
  "md:col-span-7 md:col-start-1 [--ar:4/3]",
  "md:col-span-4 md:col-start-9 md:mt-32 [--ar:3/4]",
  "md:col-span-5 md:col-start-2 md:-mt-8 [--ar:1/1]",
  "md:col-span-6 md:col-start-7 md:mt-24 [--ar:16/11]",
  "md:col-span-10 md:col-start-2 md:mt-12 [--ar:21/9]",
];

export function Portfolio() {
  return (
    <section id="projects" className="bg-ivory px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6" data-reveal="fade">
              06 — Selected Projects
            </p>
            <h2 className="h2" data-split>
              <Words text="Spaces we are *proud* to have shaped." />
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-[1.9] text-charcoal/70" data-reveal>
            Residences, hotels and architectural landmarks — sample project gallery. Replace with your own completed work.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-28 md:grid-cols-12 md:gap-y-12">
          {PROJECTS.map((p, i) => (
            <Item key={p.id} p={p} cls={LAYOUT[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ p, cls, index }: { p: Project; cls: string; index: number }) {
  return (
    <article className={`group ${cls}`}>
      <div
        data-mask={index % 2 ? "down" : "up"}
        className="relative aspect-[4/3] w-full overflow-hidden bg-beige md:aspect-[var(--ar)]"
      >
        <div data-mask-img className="absolute inset-0">
          <div data-parallax="5" className="absolute inset-x-0 -top-[7%] h-[114%]">
            <Img
              src={p.img}
              alt={`${p.title} — ${p.type}`}
              sizes={index === 4 ? "84vw" : "(min-width: 768px) 55vw, 92vw"}
              width={1400}
              className="h-full w-full object-cover transition-transform duration-[1800ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute bottom-5 left-5 translate-y-3 text-[0.65rem] uppercase tracking-[0.3em] text-white opacity-0 transition-all duration-700 ease-[var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
          View project
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6" data-reveal>
        <div>
          <p className="eyebrow mb-2">{p.type}</p>
          <h3 className="display text-3xl md:text-[2.2rem]">{p.title}</h3>
        </div>
        <p className="pt-1 text-right text-[0.65rem] uppercase leading-[2] tracking-[0.26em] text-charcoal/50">
          {p.location}
          <br />
          {p.year}
        </p>
      </div>
    </article>
  );
}
