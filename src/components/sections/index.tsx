import type {
  HeaderData,
  HeroData,
  FeaturesData,
  TestimonialsData,
  GalleryData,
  ContactData,
  FooterData,
} from "@/lib/types";

// ─── Header ───────────────────────────────────────────────────────────────────

export function HeaderSection({ data }: { data: HeaderData }) {
  const links = (data.links || "").split(",").map((l) => l.trim()).filter(Boolean);
  return (
    <header
      style={{ background: `${data.ctaBg}18`, borderBottom: `2px solid ${data.ctaBg}40` }}
      className="flex items-center justify-between px-8 py-4"
    >
      <div className="text-lg font-bold" style={{ color: data.ctaBg }}>
        {data.brand}
      </div>
      <nav className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            onClick={(e) => e.preventDefault()}
          >
            {link}
          </a>
        ))}
      </nav>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="rounded-md px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: data.ctaBg }}
      >
        {data.ctaText}
      </a>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section
      className="flex flex-col items-center gap-5 px-10 py-20 text-center"
      style={{ background: data.bgColor || "#ffffff" }}
    >
      <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900">
        {data.title}
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-slate-500">{data.subtitle}</p>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="mt-2 inline-block rounded-lg px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: data.btnBg }}
      >
        {data.btnText}
      </a>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

export function FeaturesSection({ data }: { data: FeaturesData }) {
  const features = [
    { icon: data.f1icon, title: data.f1, desc: data.f1d },
    { icon: data.f2icon, title: data.f2, desc: data.f2d },
    { icon: data.f3icon, title: data.f3, desc: data.f3d },
  ];
  return (
    <section className="px-10 py-16" style={{ background: data.bg || "#F8FAFC" }}>
      <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">{data.title}</h2>
      <p className="mb-10 text-center text-sm text-slate-500">{data.subtitle}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 text-3xl">{f.icon}</div>
            <h3 className="mb-1.5 text-base font-semibold text-slate-900">{f.title}</h3>
            <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export function TestimonialsSection({ data }: { data: TestimonialsData }) {
  const testimonials = [
    { quote: data.q1, author: data.a1, role: data.r1 },
    { quote: data.q2, author: data.a2, role: data.r2 },
  ];
  return (
    <section className="bg-white px-10 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">{data.title}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-xl bg-slate-50 p-6"
            style={{ borderLeft: `3px solid ${data.accentColor || "#6366F1"}` }}
          >
            <blockquote className="mb-4 text-sm italic leading-relaxed text-slate-600">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="text-sm font-semibold text-slate-900">{t.author}</div>
            <div className="text-xs text-slate-400">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function GallerySection({ data }: { data: GalleryData }) {
  const images = [data.img1, data.img2, data.img3, data.img4, data.img5, data.img6];
  return (
    <section className="bg-slate-50 px-10 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">{data.title}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((url, i) =>
          url ? (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ) : (
            <div
              key={i}
              className="aspect-[4/3] flex items-center justify-center rounded-xl bg-slate-200 text-2xl text-slate-400"
            >
              🖼️
            </div>
          )
        )}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export function ContactSection({ data }: { data: ContactData }) {
  return (
    <section className="px-10 py-16" style={{ background: data.bg || "#ffffff" }}>
      <h2 className="mb-2 text-3xl font-bold text-slate-900">{data.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-slate-500">{data.subtitle}</p>
      <div className="flex max-w-lg flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
          readOnly
        />
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
          readOnly
        />
        <textarea
          placeholder="Your message..."
          rows={4}
          className="resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
          readOnly
        />
        <button
          className="w-fit rounded-lg px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: data.btnBg || "#6366F1" }}
          onClick={(e) => e.preventDefault()}
        >
          {data.btnText || "Send Message"}
        </button>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function FooterSection({ data }: { data: FooterData }) {
  const links = (data.links || "").split(",").map((l) => l.trim()).filter(Boolean);
  return (
    <footer
      className="flex flex-col items-center justify-between gap-4 px-10 py-8 md:flex-row"
      style={{ background: data.bg || "#0F172A" }}
    >
      <div className="text-base font-bold text-white">{data.brand}</div>
      <nav className="flex gap-5">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="text-xs text-slate-500">{data.copy}</div>
    </footer>
  );
}
