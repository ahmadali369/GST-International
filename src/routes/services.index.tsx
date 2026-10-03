import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { SERVICES } from "@/data/services";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — GST Group" },
      { name: "description", content: "Design & engineering, metal works, glass works, MEP & fire fighting and more — eleven integrated disciplines under one roof." },
      { property: "og:title", content: "Specialized Services — GST Group" },
      { property: "og:description", content: "Eleven integrated construction & engineering disciplines delivered with precision craftsmanship." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Our Expertise"
        title={<>Eleven disciplines.<br />One precision team.</>}
        subtitle="From design and engineering to metal, glass, civil, MEP and IT — we cover the full lifecycle of complex builds, fully integrated under one roof."
      />

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-32">
        <div className="mx-auto max-w-[1536px] grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <Tilt key={s.slug} className="rounded-2xl glass overflow-hidden">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group block h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl glass-strong grid place-items-center text-white tilt-layer-sm">
                    <s.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 space-y-3 tilt-layer-sm">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-white">{s.title}</h3>
                    <ArrowRight className="w-4 h-4 mt-1.5 shrink-0 text-foreground/60 group-hover:text-white group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-sm text-foreground/65 leading-relaxed">{s.desc}</p>
                  <div className="pt-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    View details <ArrowRight className="w-3.5 h-3.5" />
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
