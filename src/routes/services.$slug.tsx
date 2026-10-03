import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionEyebrow, SectionTitle } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { SERVICES } from "@/data/services";
import { ArrowRight, Check } from "lucide-react";
import { ITServices } from "@/components/ITServices";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = SERVICES.find((x) => x.slug === params.slug);
    const title = s ? `${s.title} — GST Group` : "Service — GST Group";
    return {
      meta: [
        { title },
        { name: "description", content: s?.desc ?? "GST Group specialized service." },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.desc ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const s = SERVICES.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    // Return only serializable data — the service object holds a React icon component,
    // which cannot be serialized for SSR/hydration (it blanked the page on direct load).
    return { slug: s.slug };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl">Service not found</h1>
        <Link to="/services" className="btn-glass inline-flex"><span>All services</span></Link>
      </div>
    </div>
  ),
});

const CAPABILITIES: Record<string, string[]> = {
  "design-engineering": ["Structural & MEP design", "BIM modeling (LOD 300–500)", "3D visualization & VR walkthroughs", "Value engineering", "Shop drawings & approvals"],
  "metal-works": ["Heavy steel structures", "Architectural staircases", "Handrails & balustrades", "Cladding & façade frames", "Stainless fabrication"],
  "glass-works": ["Structural glazing systems", "Unitized curtain walls", "Skylights & canopies", "Frameless partitions", "Safety & laminated glass"],
  "aluminum-works": ["Doors, windows & facades", "Louvers & sun-shades", "Skylights & cladding", "Weatherproof systems", "Custom anodized finishes"],
  "interior-fitout": ["Ceilings & flooring", "Bespoke joinery", "Movable partitions", "Turnkey commercial fitouts", "Premium residential interiors"],
  "civil-works": ["Site preparation", "Concrete & foundations", "Masonry & blockwork", "Waterproofing", "Infrastructure & roads"],
  "ac-ducting": ["HVAC system design", "Ducting fabrication", "Chilled water systems", "Insulation & TAB", "Energy-efficient retrofits"],
  "mep-firefighting": ["Plumbing & drainage", "Fire alarm systems", "Sprinkler & hydrant systems", "Smoke management", "NFPA / SBC compliance"],
  "electrical-works": ["LV/MV power distribution", "Lighting design", "Cable management", "BMS & low-voltage", "Preventive maintenance"],
  "vehicle-tracking": ["GPS tracking devices", "Real-time monitoring", "Fleet management", "Geo-fencing", "24/7 support"],
  "it-services": ["Custom software", "Cloud & infrastructure", "Cybersecurity", "ERP implementation", "Digital transformation"],
};

function ServiceDetail() {
  const { slug } = Route.useParams();
  const s = SERVICES.find((x) => x.slug === slug)!;
  const caps = CAPABILITIES[s.slug] ?? [];
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 xl:px-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1536px] grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 animate-rise">
            <SectionEyebrow>Specialized Service</SectionEyebrow>
            <h1 className="font-display text-5xl lg:text-6xl text-metallic">{s.title}</h1>
            <p className="text-foreground/75 text-lg max-w-xl">{s.desc}</p>
            <div className="flex gap-3">
              <Link to="/contact" className="btn-glass"><span>Discuss your project</span> <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/services" className="btn-glass"><span>All services</span></Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Tilt max={9} className="glass-strong rounded-3xl overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-6 w-14 h-14 rounded-2xl glass-strong grid place-items-center tilt-layer">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl text-white mb-3">Capabilities</h3>
                <ul className="space-y-2">
                  {caps.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-foreground/75">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {s.slug === "it-services" && <ITServices />}

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
        <div className="mx-auto max-w-[1536px] grid md:grid-cols-3 gap-4">
          {[
            { v: "End-to-end", l: "From design to handover" },
            { v: "ISO Quality", l: "9001 · 14001 · 45001" },
            { v: "On-time", l: "Schedule discipline" },
          ].map((it) => (
            <Tilt key={it.l} className="glass rounded-2xl">
              <div className="p-7 text-center">
                <div className="font-display text-2xl text-metallic tilt-layer">{it.v}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-2">{it.l}</div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
        <div className="mx-auto max-w-[1536px]">
          <div className="flex items-end justify-between mb-8">
            <SectionTitle>Other services</SectionTitle>
            <Link to="/services" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Tilt key={o.slug} className="glass rounded-2xl overflow-hidden">
                <Link to="/services/$slug" params={{ slug: o.slug }} className="group block h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={o.img} alt={o.title} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg glass-strong grid place-items-center text-white tilt-layer-sm"><o.icon className="w-4 h-4" /></div>
                  </div>
                  <div className="p-5 tilt-layer-sm">
                    <h4 className="font-display text-white">{o.title}</h4>
                    <div className="mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition flex items-center gap-1">Explore <ArrowRight className="w-3.5 h-3.5" /></div>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
