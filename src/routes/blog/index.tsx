import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { POSTS } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blogs & Insights — GST Group Engineering Journal" },
      { name: "description", content: "Engineering insights, project stories and industry updates from GST Group across Saudi Arabia, Dubai, Pakistan and the UK." },
      { property: "og:title", content: "GST Group Blogs & Insights" },
      { property: "og:description", content: "Façade engineering, steel fabrication, MEP compliance and sustainable construction insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Blogs & Insights"
        title={<>Notes from the <br />engineering floor.</>}
        subtitle="Project stories, technical deep-dives and company news from across our Saudi, Dubai, Pakistan and UK operations."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <Tilt max={5} className="glass-strong rounded-3xl overflow-hidden">
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="grid md:grid-cols-2 gap-0 group">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img src={featured.img} alt={featured.title} loading="lazy" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-8 sm:p-10 space-y-4">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                  Featured · {featured.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-white leading-tight">{featured.title}</h2>
                <p className="text-foreground/70 text-sm leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-foreground/55">
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
                <span className="btn-glass inline-flex text-sm"><span>Read article</span><ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          </Tilt>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => (
            <Tilt key={p.slug} className="glass rounded-2xl overflow-hidden h-full">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block h-full group">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  <span className="absolute left-4 bottom-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white tilt-layer-sm">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-lg text-white leading-snug">{p.title}</h3>
                  <p className="text-sm text-foreground/65 line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-foreground/50 border-t border-white/10">
                    <span>{p.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{p.readTime}</span>
                  </div>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
