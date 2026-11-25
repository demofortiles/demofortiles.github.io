import { useEffect, useState } from "react";
import { COLLECTIONS, type CategoryId } from "../data/content";
import { SITE, waLink } from "../data/site";
import { Magnetic } from "./ui/Magnetic";
import { WhatsAppIcon } from "./Catalogue";
import { Words } from "./ui/Words";

export interface Prefill {
  nonce: number;
  category?: CategoryId;
  message?: string;
}

const PROJECT_TYPES = [
  "Private residence",
  "Villa / Luxury home",
  "Renovation",
  "Hotel / Hospitality",
  "Commercial / Retail",
  "Architect / Designer",
  "Builder / Contractor",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

const emptyForm = { name: "", phone: "", category: "", projectType: "", message: "" };

export function Contact({ prefill }: { prefill: Prefill }) {
  const [form, setForm] = useState(emptyForm);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (!prefill.nonce) return;
    const cat = COLLECTIONS.find((c) => c.id === prefill.category)?.name ?? "";
    setForm((f) => ({ ...f, category: cat || f.category, message: prefill.message ?? f.message }));
    setStatus("idle");
  }, [prefill]);

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k === "name" || k === "phone") setFieldErrors((fe) => ({ ...fe, [k]: undefined }));
  };

  const whatsappFromForm = () =>
    waLink(
      `Hello ${SITE.brand}, my name is ${form.name || "—"}.\nInterested in: ${form.category || "—"}\nProject: ${
        form.projectType || "—"
      }\nPhone: ${form.phone || "—"}\n\n${form.message}`
    );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (honey) return; // bot

    const errs: typeof fieldErrors = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 7) errs.phone = "Please enter a valid phone number.";
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    if (!SITE.web3formsAccessKey) {
      setStatus("error");
      setError(
        "Our online enquiry service is not connected yet, so your message has not been sent. Please send it via WhatsApp instead — it takes seconds."
      );
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: SITE.web3formsAccessKey,
          subject: `New tile enquiry — ${form.category || "General"} (${form.name})`,
          from_name: `${SITE.brand} Website`,
          name: form.name,
          phone: form.phone,
          interested_category: form.category || "Not specified",
          project_type: form.projectType || "Not specified",
          message: form.message || "(no message)",
          botcheck: "",
        }),
      });
      let data: { success?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (res.ok && data.success) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
        setError(data.message || "We couldn't send your enquiry. Please try again or contact us on WhatsApp.");
      }
    } catch {
      setStatus("error");
      setError("Network error — your enquiry was not sent. Please check your connection, or reach us on WhatsApp.");
    }
  }

  return (
    <section id="contact" className="relative bg-charcoal px-6 py-24 text-ivory md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6" data-reveal="fade">
              09 — Enquiries
            </p>
            <h2 className="h2" data-split>
              <Words text="Let’s begin your *project.*" />
            </h2>
            <p className="mt-8 max-w-md text-[0.98rem] leading-[1.9] text-ivory/60" data-reveal>
              Tell us about your space. A design consultant will respond personally — usually within one working day —
              with guidance, samples and pricing.
            </p>

            <div className="mt-12 space-y-8" data-reveal>
              <a
                href={waLink(`Hello ${SITE.brand}, I'd like to discuss a tile project.`)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 border border-ivory/15 p-5 transition-colors duration-500 hover:border-gold"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-charcoal">
                  <WhatsAppIcon size={22} />
                </span>
                <span>
                  <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-gold">Chat on WhatsApp</span>
                  <span className="display block text-2xl">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">Call</p>
                  <a href={SITE.phoneHref} className="link-line text-lg">
                    {SITE.phoneDisplay}
                  </a>
                  <p className="eyebrow mb-3 mt-6">Email</p>
                  <a href={`mailto:${SITE.email}`} className="link-line break-all text-[0.95rem]">
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-3">Showroom</p>
                  <address className="not-italic leading-[1.8] text-ivory/75">
                    {SITE.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <div className="mt-3 text-[0.8rem] leading-[1.8] text-ivory/50">
                    {SITE.address.hours.map((h) => (
                      <p key={h}>{h}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-ivory/15 bg-[#2a2a27]">
                {SITE.googleMapsEmbedUrl ? (
                  <iframe
                    title="Showroom location on Google Maps"
                    src={SITE.googleMapsEmbedUrl}
                    className="absolute inset-0 h-full w-full grayscale"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(244,240,232,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,.12) 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                      }}
                    />
                    <svg width="30" height="38" viewBox="0 0 24 30" fill="none" stroke="#B89B68" strokeWidth="1" className="relative">
                      <path d="M12 29s9-8.5 9-16A9 9 0 0 0 3 13c0 7.5 9 16 9 16z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    <p className="relative text-[0.62rem] uppercase tracking-[0.28em] text-ivory/60">
                      Google Maps placeholder
                    </p>
                    <a
                      href={SITE.googleMapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line relative text-[0.65rem] uppercase tracking-[0.24em] text-gold"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7" data-reveal data-delay="0.1">
            <div className="border border-ivory/12 bg-ivory/[0.03] p-6 sm:p-10 md:p-14">
              {status === "success" ? (
                <div className="fade-swap py-10 text-center" role="status">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#B89B68" strokeWidth="0.8" className="mx-auto">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M7.5 12.5l3 3 6-7" />
                  </svg>
                  <h3 className="display mt-8 text-4xl md:text-5xl">Thank you.</h3>
                  <p className="mx-auto mt-5 max-w-sm text-ivory/65">
                    Your enquiry has been received. Our team will contact you shortly.
                  </p>
                  <button className="btn btn-light mt-10" onClick={() => setStatus("idle")}>
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-9">
                  <div>
                    <h3 className="display text-3xl md:text-4xl">Enquiry form</h3>
                    <p className="mt-2 text-sm text-ivory/50">Fields marked * are required.</p>
                  </div>

                  <div className="grid gap-9 sm:grid-cols-2">
                    <Field label="Full name *" error={fieldErrors.name}>
                      <input
                        className="field"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        aria-invalid={!!fieldErrors.name}
                      />
                    </Field>
                    <Field label="Phone number *" error={fieldErrors.phone}>
                      <input
                        className="field"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+00 00000 00000"
                        aria-invalid={!!fieldErrors.phone}
                      />
                    </Field>
                    <Field label="Interested tile category">
                      <select className="field" name="category" value={form.category} onChange={set("category")}>
                        <option value="">Select a collection</option>
                        {COLLECTIONS.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </Field>
                    <Field label="Project type">
                      <select className="field" name="projectType" value={form.projectType} onChange={set("projectType")}>
                        <option value="">Select project type</option>
                        {PROJECT_TYPES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Message">
                    <textarea
                      className="field resize-none"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your space, approximate area and timeline…"
                    />
                  </Field>

                  {/* Honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                    name="botcheck"
                  />

                  {status === "error" && (
                    <div role="alert" className="border border-red-400/40 bg-red-500/10 p-5 text-sm leading-relaxed text-red-100">
                      <p>{error}</p>
                      <a
                        href={whatsappFromForm()}
                        target="_blank"
                        rel="noreferrer"
                        className="link-line mt-3 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory"
                      >
                        <WhatsAppIcon size={14} /> Send via WhatsApp instead
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Magnetic>
                      <button type="submit" disabled={status === "sending"} className="btn btn-gold">
                        {status === "sending" ? "Sending…" : "Submit enquiry"}
                      </button>
                    </Magnetic>
                    <a
                      href={whatsappFromForm()}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/80"
                    >
                      <WhatsAppIcon size={15} /> or WhatsApp us
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.62rem] uppercase tracking-[0.28em] text-gold">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
