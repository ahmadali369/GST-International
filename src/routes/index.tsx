import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Globe2, Award, Clock, Users, ChevronRight,
  ShieldCheck, MapPin, Quote, PenTool, Factory, Truck, CheckCircle2, Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoFull from "@/assets/gst-logo.png";
import businessBayImage from "@/assets/images.jfif?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionEyebrow, SectionTitle } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/blog";
import { STATS } from "@/data/stats";
import { openQuote } from "@/lib/quote";
import { ITServices } from "@/components/ITServices";
import { OdooFeatureEcosystem } from "@/components/OdooFeatureEcosystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GST Group — Engineering & Construction Powerhouse" },
      { name: "description", content: "GST Group transforms big designs into built realities — metal works, glass works, MEP, civil & engineering across Saudi Arabia, Dubai, Pakistan & the UK." },
      { property: "og:title", content: "GST Group — The Glass Monolith" },
      { property: "og:description", content: "A multidisciplinary contracting powerhouse now expanding across Dubai and the wider UAE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PROJECTS = [
  { name: "King Abdullah Financial District", loc: "Riyadh, KSA", scope: "Glass balustrades, aluminum systems, metal works", img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=1200&q=80" },
  { name: "NEOM", loc: "NEOM, KSA", scope: "Steel structures, staircases, infrastructure", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" },
  { name: "Red Sea Development", loc: "Red Sea, KSA", scope: "Steel structures, façades, finishing", img: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1200&q=80" },
  { name: "Business Bay Towers", loc: "Dubai, UAE", scope: "Curtain walls, aluminum façades, fitout", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80" },
];

const DUBAI_GALLERY = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80", label: "Downtown Dubai" },
  { img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80", label: "Dubai Marina" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80", label: "Sheikh Zayed Road" },
  { img: businessBayImage, label: "Business Bay" },
];

const CLIENTS = [
  "Depa Arabia", "Red Sea Global", "Coastal Contracting", "Apsal Paul",
  "Shapoorji Pallonji", "DEPA Interiors", "Adex Contracting", "Alghanim International",
  "Ahmadiah Contracting", "Maramer", "MEFSCO", "ARASCO",
  "Saudi Ceramics", "Yamama Cement", "Riyadh Cement", "Unibeton",
];

function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <StatsStrip />
      <DubaiSpotlight />
      <ITServices />
      <Services />
      <Projects />
      <Industries />
      <Process />
      <WhyUs />
      <OdooFeatureEcosystem />
      <Certifications />
      <Testimonials />
      <GlobalPresence />
      <Clients />
      <LatestInsights />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

const COMPANIES = [
  { name: "General Solutions Contracting Company", desc: "Turnkey Civil & Structural Engineering", tag: "500+ Delivered Projects" },
  { name: "Hulul Alkhalij Technical Services L.L.C", desc: "Gulf Technical & Civil Solutions", tag: "Dubai · ISO Certified" },
  { name: "General Solutions Trading Company (Private) Limited", desc: "Global Materials & Supply Chain", tag: "Import / Export Hub" },
  { name: "Bright Star Contracting Company (Private) Limited", desc: "Architectural Lighting & Design", tag: "Design Excellence" },
  { name: "Innovative Design And Engineering Consultancy Limited", desc: "Tech & Smart Systems Integration", tag: "AI & Smart Automation" },
  { name: "GST International", desc: "KSA", tag: "High-Voltage Engineering" },
  { name: "Signature Salon", desc: "Luxury Beauty & Spa Services", tag: "Hospitality & Wellness" },
  { name: "Lazeez Point", desc: "Gourmet Food & Hospitality Chain", tag: "Multi-Cuisine Restaurant" },
];

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, sy: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      setTilt((t) => ({ ...t, x: (e.clientX / w - 0.5) * 14, y: (e.clientY / h - 0.5) * 10 }));
    };
    const onScroll = () => setTilt((t) => ({ ...t, sy: Math.min(window.scrollY, 600) }));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden pt-32 sm:pt-36 pb-16">
      <div className="absolute inset-0" style={{ transform: `translate3d(0,${tilt.sy * 0.2}px,0)` }}>
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&auto=format&fit=crop"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />

      {/* Ghost wordmark behind the hub */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-28 sm:top-32 inset-x-0 text-center font-display font-extrabold uppercase select-none
                   text-[6.5vw] sm:text-[8vw] leading-[0.95] tracking-[0.02em] text-white/[0.05] overflow-hidden"

        style={{ transform: `translate3d(${tilt.x * 0.3}px,${-tilt.sy * 0.1}px,0)` }}
      >
        GST Group
        <span className="block">of Companies</span>
      </div>

      <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
        {/* Central hub */}
        <div className="relative flex flex-col items-center">
          <Tilt max={14} lift={14} style={{ transform: `translate3d(${tilt.x * 0.4}px,${tilt.y * 0.4}px,0)` }}>
            <div className="relative w-[200px] h-[200px] sm:w-[215px] sm:h-[215px] rounded-full glass shine-sweep flex items-center justify-center">
              <img
                src={logoFull}
                alt="GST Group"
                width={485}
                height={409}
                className="relative w-[72%] h-auto object-contain drop-shadow-[0_0_40px_oklch(1_0_0/0.25)] tilt-layer"
              />
            </div>
          </Tilt>

          <Tilt max={10} lift={6} className="mt-6">
            <h1 className="inline-flex rounded-full glass px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/85">
              <span className="sr-only">GST Group — Engineering &amp; Construction Powerhouse · </span>
              Group of Companies
            </h1>
          </Tilt>
        </div>

        {/* Veins — connectors from hub to subsidiary cards */}
        <div className="relative h-16 sm:h-24 lg:h-28" aria-hidden>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="veinFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            {[150, 450, 750, 1050].map((x, i) => (
              <g key={x}>
                <path
                  d={`M600 0 C600 65, ${x} 55, ${x} 120`}
                  fill="none"
                  stroke="url(#veinFade)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={`M600 0 C600 65, ${x} 55, ${x} 120`}
                  fill="none"
                  stroke="oklch(1 0 0 / 0.9)"
                  strokeWidth="1.5"
                  strokeDasharray="6 190"
                  vectorEffect="non-scaling-stroke"
                  className="vein-flow"
                  style={{ animationDelay: `${(x / 300) * 0.5}s` }}
                />
                <circle cx={x} cy="120" r="2.5" fill="oklch(1 0 0 / 0.7)" />
              </g>
            ))}
            <circle cx="600" cy="0" r="3.5" fill="oklch(1 0 0 / 0.85)" />
          </svg>
        </div>

        {/* Subsidiary grid — both rows remain visibly linked to the central hub */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {COMPANIES.slice(0, 4).map((c, i) => (
            <Tilt key={c.name} max={12} lift={14} className="h-full">
              <div className="group relative h-full min-h-[172px] rounded-2xl glass shine-sweep p-5 flex flex-col animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="absolute top-4 right-4 w-7 h-7 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 group-hover:text-white transition tilt-layer-sm">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <h3 className="font-display text-[15px] leading-[1.3] font-semibold text-white pr-10 min-h-[58px] tracking-[-0.03em] tilt-layer">{c.name}</h3>
                <p className="mt-3 text-[13px] leading-snug text-foreground/70 tilt-layer-sm">{c.desc}</p>
                <div className="hairline mt-auto mb-3" />
                <div className="flex items-center justify-between text-xs tilt-layer-sm">
                  <span className="flex items-center gap-1.5 text-xs text-foreground/60"><ShieldCheck className="w-3.5 h-3.5 shrink-0" />{c.tag}</span>
                  <Link to="/services" className="text-white/90 font-medium hover:text-white">Details</Link>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        <div className="relative hidden h-12 lg:block" aria-hidden>
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full overflow-visible">
            {[150, 450, 750, 1050].map((x, i) => (
              <g key={x}>
                <path d={`M${x} 0 L${x} 48`} fill="none" stroke="oklch(1 0 0 / 0.28)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path
                  d={`M${x} 0 L${x} 48`}
                  fill="none"
                  stroke="oklch(1 0 0 / 0.9)"
                  strokeWidth="1.5"
                  strokeDasharray="5 43"
                  vectorEffect="non-scaling-stroke"
                  className="vein-flow"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <circle cx={x} cy="48" r="2.5" fill="oklch(1 0 0 / 0.7)" />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 items-stretch">
          {COMPANIES.slice(4).map((c, i) => (
            <Tilt key={c.name} max={12} lift={14} className="h-full">
              <div className="group relative h-full min-h-[172px] rounded-2xl glass shine-sweep p-5 flex flex-col animate-rise" style={{ animationDelay: `${(i + 4) * 60}ms` }}>
                <span className="absolute top-4 right-4 w-7 h-7 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 group-hover:text-white transition tilt-layer-sm">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <h3 className="font-display text-[15px] leading-[1.3] font-semibold text-white pr-10 min-h-[58px] tracking-[-0.03em] tilt-layer">{c.name}</h3>
                <p className="mt-3 text-[13px] leading-snug text-foreground/70 tilt-layer-sm">{c.desc}</p>
                <div className="hairline mt-auto mb-3" />
                <div className="flex items-center justify-between text-xs tilt-layer-sm">
                  <span className="flex items-center gap-1.5 text-xs text-foreground/60"><ShieldCheck className="w-3.5 h-3.5 shrink-0" />{c.tag}</span>
                  <Link to="/services" className="text-white/90 font-medium hover:text-white">Details</Link>
                </div>
              </div>
            </Tilt>
          ))}
        </div>


        {/* Primary CTAs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={openQuote} className="btn-glass hover-3d">
            <span>Get a Quote</span> <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/portfolio" className="inline-flex items-center gap-1.5 px-4 py-3 text-sm text-foreground/75 transition hover:text-white">
            View our work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-foreground/55">
          {[
            { Icon: Award, label: "ISO 9001 · 14001 · 45001" },
            { Icon: Clock, label: `${STATS.years} years of excellence` },
            { Icon: Globe2, label: `${STATS.offices} global offices` },
          ].map(({ Icon, label }) => (
            <div key={label} className="hover-3d rounded-full glass px-4 py-2 flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" /> {label}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}


function StatsStrip() {
  const items = [
    { v: STATS.projects, l: "Projects Delivered" },
    { v: STATS.offices, l: "Global Offices" },
    { v: STATS.professionals, l: "Skilled Professionals" },
    { v: STATS.years, l: "Years of Excellence" },
  ];
  return (
    <section className="relative -mt-8 px-4 sm:px-6 lg:px-8 xl:px-10 z-10">
      <div className="mx-auto max-w-[1536px] grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <Tilt key={it.l} max={8} lift={6} className="glass-strong rounded-3xl">
            <div className="p-8 text-center">
              <div className="font-display text-4xl lg:text-5xl text-metallic tilt-layer">{it.v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{it.l}</div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

function DubaiSpotlight() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="mx-auto max-w-[1536px] relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <SectionEyebrow>Now in Dubai</SectionEyebrow>
          <SectionTitle>New chapter.<br />New skyline.</SectionTitle>
          <p className="text-foreground/70">
            GST Group has officially opened its Dubai operation — bringing our façade, glazing, metal
            fabrication, fitout and MEP capability to the UAE market. Same engineering discipline,
            same ISO-certified processes, now delivered from the heart of Business Bay.
          </p>
          <ul className="space-y-3">
            {[
              "Curtain walls & structural glazing for UAE towers",
              "Turnkey commercial & hospitality fitouts",
              "MEP, fire fighting & HVAC packages",
              "Local UAE workforce backed by our Riyadh fabrication hub",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 text-sm text-foreground/75">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {x}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/contact" className="btn-glass"><span>Talk to the Dubai team</span> <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          {DUBAI_GALLERY.map((g, i) => (
            <Tilt key={g.label} max={12} className={`rounded-2xl glass overflow-hidden ${i % 2 ? "mt-8" : ""}`}>
              <div className="relative aspect-[4/5]">
                <img
                  src={g.img}
                  alt={`${g.label}, Dubai`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                <div className="absolute bottom-4 left-4 tilt-layer">
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">Dubai · UAE</div>
                  <div className="font-display text-white">{g.label}</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="light-band relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1536px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <SectionEyebrow>Our Expertise</SectionEyebrow>
            <SectionTitle>Specialized<br />Services</SectionTitle>
          </div>
          <p className="text-foreground/70 max-w-md">
            Eleven integrated disciplines — engineered, fabricated and delivered under one roof.
            Precision craftsmanship at every interface.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <Tilt key={s.slug} className="rounded-2xl glass overflow-hidden">
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group block h-full">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 img-scrim" />
                  <div className="on-dark absolute top-4 left-4 w-10 h-10 rounded-xl glass-strong grid place-items-center tilt-layer-sm">
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 space-y-2 tilt-layer-sm">
                  <h3 className="font-display text-lg text-white">{s.title}</h3>
                  <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">{s.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="mx-auto max-w-[1536px] relative">
        <div className="text-center space-y-3 mb-14">
          <SectionEyebrow>Our Portfolio</SectionEyebrow>
          <SectionTitle>Completed Projects</SectionTitle>
          <p className="text-foreground/70 max-w-2xl mx-auto">From Red Sea Global to SABIC Jubail and now Business Bay — 25+ years of executing complex projects on time with superior quality.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((p) => (
            <Tilt key={p.name} className="rounded-2xl glass overflow-hidden">
              <article className="group relative h-full">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 img-scrim" />
                </div>
                <div className="on-dark absolute inset-0 p-5 flex flex-col justify-end tilt-layer">
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">{p.loc}</div>
                  <h3 className="font-display text-lg text-white mt-1">{p.name}</h3>
                  <p className="text-xs text-foreground/70 mt-2 line-clamp-2">{p.scope}</p>
                </div>
              </article>
            </Tilt>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/portfolio" className="btn-glass"><span>See All Projects</span> <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: PenTool, n: "01", t: "Design & Engineer", d: "Concept studies, BIM coordination, shop drawings and value engineering before a single bolt is cut." },
    { icon: Factory, n: "02", t: "Fabricate", d: "In-house steel, aluminum and glass fabrication under strict QA/QC with full material traceability." },
    { icon: Truck, n: "03", t: "Install", d: "Certified site crews, method statements and HSE-led installation on live construction programmes." },
    { icon: ShieldCheck, n: "04", t: "Handover & Care", d: "Testing, commissioning, snag-free handover and long-term maintenance support." },
  ];
  return (
    <section className="light-band relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1536px]">
        <div className="text-center space-y-3 mb-14">
          <SectionEyebrow>How We Work</SectionEyebrow>
          <SectionTitle>From drawing board<br />to handover</SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <Tilt key={s.n} className="glass rounded-2xl">
              <div className="p-7 space-y-4 h-full">
                <div className="flex items-center justify-between tilt-layer-sm">
                  <div className="w-11 h-11 rounded-xl glass-strong grid place-items-center text-white">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="font-display text-3xl text-white/15">{s.n}</span>
                </div>
                <h3 className="font-display text-lg text-white">{s.t}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{s.d}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    { c: "ISO 9001:2015", d: "Quality Management" },
    { c: "ISO 14001:2015", d: "Environmental Management" },
    { c: "ISO 45001:2018", d: "Occupational Health & Safety" },
    { c: "Saudi Building Code", d: "Full compliance" },
  ];
  return (
    <section className="light-band relative px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
      <div className="mx-auto max-w-[1536px]">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Accredited</SectionEyebrow>
          <SectionTitle>Certifications & Standards</SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((x) => (
            <Tilt key={x.c} max={9} className="glass rounded-2xl">
              <div className="p-7 text-center space-y-2 h-full">
                <Award className="w-7 h-7 mx-auto text-primary tilt-layer-sm" />
                <div className="font-display text-white text-lg">{x.c}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-foreground/55">{x.d}</div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "GST delivered our façade package ahead of programme and with zero snags at handover. Exceptional coordination.", n: "Project Director", c: "Red Sea Global" },
    { q: "Their in-house fabrication meant fewer interfaces and faster decisions. A genuinely integrated contractor.", n: "Construction Manager", c: "Shapoorji Pallonji" },
    { q: "Safety culture and quality documentation were best-in-class throughout our industrial expansion.", n: "Head of Projects", c: "SABIC Jubail" },
  ];
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28">
      <div className="mx-auto max-w-[1536px]">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Client Voices</SectionEyebrow>
          <SectionTitle>What partners say</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t) => (
            <Tilt key={t.c} className="glass rounded-2xl">
              <div className="p-8 space-y-5 h-full">
                <Quote className="w-7 h-7 text-white/25 tilt-layer-sm" />
                <p className="text-sm text-foreground/80 leading-relaxed">"{t.q}"</p>
                <div className="hairline" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-display text-sm">{t.n}</div>
                    <div className="text-xs text-foreground/55">{t.c}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalPresence() {
  const offices = [
    { city: "Riyadh", country: "Saudi Arabia", tag: "Headquarters", img: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1000&q=80" },
    { city: "Dubai", country: "United Arab Emirates", tag: "Newly Opened", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80" },
    { city: "Lahore", country: "Pakistan", tag: "Engineering Hub", img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1000&q=80" },
    { city: "Gujranwala", country: "Pakistan", tag: "Master City Office", img: "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?w=1000&q=80" },
    { city: "London", country: "United Kingdom", tag: "Commercial Office", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&q=80" },
  ];
  return (
    <section className="light-band relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="mx-auto max-w-[1536px] relative">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Global Footprint</SectionEyebrow>
          <SectionTitle>Five offices. One standard.</SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {offices.map((o) => (
            <Tilt key={o.city} className="rounded-2xl glass overflow-hidden">
              <div className="relative aspect-[3/4] group">
                <img src={o.img} alt={`${o.city} office`} loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 img-scrim" />
                <div className="on-dark absolute inset-x-0 bottom-0 p-5 tilt-layer">
                  <div className="text-xs uppercase tracking-[0.25em] text-primary flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {o.tag}
                  </div>
                  <div className="font-display text-xl text-white mt-1">{o.city}</div>
                  <div className="text-xs text-foreground/60">{o.country}</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="text-center space-y-3 mb-12 px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionEyebrow>Trusted Partners</SectionEyebrow>
        <SectionTitle>Major Clients</SectionTitle>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-3 animate-marquee w-max">
          {row.map((c, i) => (
            <div key={i} className="glass rounded-full px-6 py-3 text-sm text-foreground/80 whitespace-nowrap hover-3d">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
      <Tilt max={5} lift={4} className="mx-auto max-w-[1536px] glass-strong rounded-3xl overflow-hidden">
        <div className="p-10 md:p-16 text-center relative">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative space-y-6 tilt-layer-sm">
            <SectionEyebrow>Let's Build</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-metallic max-w-2xl mx-auto">Have a project in mind? Let's engineer it together.</h2>
            <p className="text-foreground/70 max-w-xl mx-auto">Talk to our engineers about your next milestone — design, build or fitout — in Riyadh, Dubai, Lahore or London.</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link to="/contact" className="btn-glass"><span>Start a Project</span> <ArrowRight className="w-4 h-4" /></Link>
              <a href="mailto:sales@gstsaudi.com" className="inline-flex items-center px-4 py-3 text-sm text-foreground/75 transition hover:text-white">sales@gstsaudi.com</a>
            </div>
          </div>
        </div>
      </Tilt>
    </section>
  );
}

const INDUSTRIES = [
  { name: "Commercial & High-Rise", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80" },
  { name: "Hospitality & Retail", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80" },
  { name: "Industrial & Energy", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80" },
  { name: "Healthcare & Education", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&q=80" },
  { name: "Residential Communities", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80" },
  { name: "Infrastructure", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80" },
];

function Industries() {
  return (
    <section className="light-band relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1536px] relative">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Sectors We Serve</SectionEyebrow>
          <SectionTitle>Industries in our portfolio</SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((it) => (
            <Tilt key={it.name} className="rounded-2xl glass overflow-hidden">
              <div className="relative h-56 group">
                <img src={it.img} alt={it.name} loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 img-scrim" />
                <div className="on-dark absolute inset-x-0 bottom-0 p-5 tilt-layer">
                  <div className="font-display text-lg text-white">{it.name}</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: ShieldCheck, t: "HSE First", d: "Zero-harm culture with documented method statements and daily toolbox talks on every site." },
  { icon: Factory, t: "In-house Fabrication", d: "Our own metal and glass workshops keep quality, cost and delivery under one roof." },
  { icon: Clock, t: "On-time Delivery", d: "Programme-driven planning with weekly look-aheads and transparent client reporting." },
  { icon: Users, t: `${STATS.professionals} Specialists`, d: "Engineers, fabricators, MEP technicians and project managers across four countries." },
];

function WhyUs() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="mx-auto max-w-[1536px] relative">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Why GST Group</SectionEyebrow>
          <SectionTitle>Built on discipline, not promises</SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w) => (
            <Tilt key={w.t} className="rounded-2xl glass p-6 h-full">
              <div className="space-y-3 tilt-layer-sm">
                <w.icon className="w-6 h-6 text-primary" />
                <div className="font-display text-lg text-white">{w.t}</div>
                <p className="text-sm text-foreground/60 leading-relaxed">{w.d}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestInsights() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1536px] relative">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <SectionEyebrow>Newsroom</SectionEyebrow>
            <SectionTitle>Latest insights</SectionTitle>
          </div>
          <Link to="/blog" className="glass rounded-full px-5 py-2.5 text-sm text-white inline-flex items-center gap-2 hover-3d">
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Tilt key={p.slug} className="rounded-2xl glass overflow-hidden h-full">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block h-full group">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                </div>
                <div className="p-6 space-y-2 tilt-layer-sm">
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">{p.category}</div>
                  <div className="font-display text-base text-white leading-snug">{p.title}</div>
                  <p className="text-sm text-foreground/60 line-clamp-2">{p.excerpt}</p>
                  <div className="text-xs text-foreground/60 pt-1">{p.date} · {p.readTime}</div>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Which countries does GST Group operate in?", a: "Saudi Arabia (Riyadh HQ), the UAE (Dubai), Pakistan (Lahore and Gujranwala Master City) and the United Kingdom." },
  { q: "Do you handle design as well as execution?", a: "Yes. Our consultancy arm produces shop drawings, structural calculations and 3D coordination before fabrication begins." },
  { q: "Are your works ISO certified?", a: "Our quality, environmental and occupational-health systems follow ISO 9001, ISO 14001 and ISO 45001 frameworks." },
  { q: "How quickly can you mobilise on a new project?", a: "Typical mobilisation for a Gulf project is two to three weeks from award, subject to scope and permits." },
];

function FAQ() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="mx-auto max-w-4xl relative">
        <div className="text-center space-y-3 mb-12">
          <SectionEyebrow>Questions</SectionEyebrow>
          <SectionTitle>Frequently asked</SectionTitle>
        </div>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <Tilt key={f.q} max={4} lift={3} className="rounded-2xl glass p-6">
              <div className="space-y-2 tilt-layer-sm">
                <div className="font-display text-base text-white flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> {f.q}
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed pl-6">{f.a}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
