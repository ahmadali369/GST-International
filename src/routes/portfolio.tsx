import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Section";
import { Tilt } from "@/components/Tilt";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — GST Group" },
      { name: "description", content: "Selected projects from GST Group — KAFD, NEOM, Red Sea Global, SABIC and more." },
      { property: "og:title", content: "Portfolio — GST Group" },
      { property: "og:description", content: "25+ years of complex projects delivered on time with superior quality." },
    ],
  }),
  component: Portfolio,
});

const PROJECTS = [
  { name: "King Abdullah Financial District (KAFD)", loc: "Riyadh, Saudi Arabia", scope: "Glass balustrades, aluminum systems, metal works", img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=1200&q=80", tag: "Iconic" },
  { name: "NEOM — The Line", loc: "NEOM, Saudi Arabia", scope: "Steel structures, staircases, infrastructure", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80", tag: "Mega" },
  { name: "Red Sea Development", loc: "Red Sea, Saudi Arabia", scope: "Steel structures, façades, finishing", img: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1200&q=80", tag: "Tourism" },
  { name: "SABIC Facilities", loc: "Jubail, Saudi Arabia", scope: "Steel structures, drainage, stainless works", img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80", tag: "Industrial" },
  { name: "Business Bay Tower Façade", loc: "Dubai, UAE", scope: "Unitized curtain wall, aluminum cladding", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80", tag: "Dubai" },
  { name: "Dubai Marina Residences", loc: "Dubai, UAE", scope: "Glass balustrades, interior fitout, MEP", img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80", tag: "Dubai" },
  { name: "MEFSCO Industrial Plant", loc: "Riyadh, Saudi Arabia", scope: "Metal fabrication, fencing, road works", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80", tag: "Industrial" },
  { name: "ARASCO Plant", loc: "Al-Kharj, Saudi Arabia", scope: "Stainless steel drains, fencing, railings", img: "https://images.unsplash.com/photo-1531973486364-5fa64260d75b?w=1200&q=80", tag: "Industrial" },
  { name: "Saudi Ceramics", loc: "Riyadh, Saudi Arabia", scope: "Structural & metal works", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80", tag: "Industrial" },
  { name: "Yamama Cement", loc: "Riyadh, Saudi Arabia", scope: "Civil and metal works", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80", tag: "Industrial" },
];

function Portfolio() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Our Portfolio"
        title={<>Built across the Kingdom.<br />Trusted across the region.</>}
        subtitle="A selection of milestone projects delivered for leading developers, contractors and industrial groups."
      />
      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-32">
        <div className="mx-auto max-w-[1536px] grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <Tilt key={p.name} className="rounded-3xl overflow-hidden glass">
              <article className="group relative h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover opacity-85 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="absolute top-4 left-4 glass rounded-full text-xs uppercase tracking-[0.2em] px-3 py-1 text-primary tilt-layer-sm">{p.tag}</div>
                <div className="absolute inset-x-0 bottom-0 p-5 space-y-1 tilt-layer">
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">{p.loc}</div>
                  <h3 className="font-display text-lg text-white">{p.name}</h3>
                  <p className="text-xs text-foreground/70">{p.scope}</p>
                </div>
              </article>
            </Tilt>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
