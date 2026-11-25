import { SITE, waLink } from "../data/site";
import { scrollToId } from "../lib/motion";
import { WhatsAppIcon } from "./Catalogue";

export function Footer() {
  const links = [
    ["collections", "Collections"],
    ["catalogue", "Catalogue"],
    ["inspiration", "Inspiration"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  return (
    <footer className="bg-[#161615] px-6 pb-10 pt-20 text-ivory md:px-12 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display text-[clamp(3.2rem,11vw,10rem)] leading-[0.9] tracking-[0.06em]">
              {SITE.brand.toUpperCase()}
            </p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.5em] text-gold">{SITE.brandSuffix}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 md:col-span-3" aria-label="Footer">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
                className="link-line w-fit text-[0.75rem] uppercase tracking-[0.22em] text-ivory/70 hover:text-ivory"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Visit &amp; connect</p>
            <p className="text-sm leading-[1.9] text-ivory/60">
              {SITE.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <a href={SITE.phoneHref} className="mt-4 block text-ivory">
              {SITE.phoneDisplay}
            </a>
            <div className="mt-6 flex gap-5">
              {SITE.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[0.65rem] uppercase tracking-[0.22em] text-ivory/60 hover:text-ivory"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/40 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.brand} {SITE.brandSuffix}. All rights reserved.
          </p>
          <p>Sample imagery shown for demonstration · Photography via Pexels</p>
          <a
            href={waLink(`Hello ${SITE.brand}`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-ivory/60 hover:text-gold"
          >
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
