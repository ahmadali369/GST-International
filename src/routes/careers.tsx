import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, SectionEyebrow, SectionTitle } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — GST Group" },
      { name: "description", content: "Join GST Group — engineers, fabricators, project managers and more across our global offices." },
      { property: "og:title", content: "Careers — GST Group" },
      { property: "og:description", content: "Build a career with one of the region's most trusted contracting powerhouses." },
    ],
  }),
  component: Careers,
});

const ROLES = [
  { title: "Senior Structural Engineer", loc: "Riyadh, KSA", type: "Full-time" },
  { title: "BIM Coordinator", loc: "Dubai, UAE", type: "Full-time" },
  { title: "Façade Project Manager", loc: "Dubai, UAE", type: "Full-time" },
  { title: "Business Development Lead — UAE", loc: "Dubai, UAE", type: "Full-time" },
  { title: "Project Manager — Metal Works", loc: "Riyadh, KSA", type: "Full-time" },
  { title: "MEP Design Engineer", loc: "Lahore, PK", type: "Full-time" },
  { title: "QHSE Officer", loc: "NEOM, KSA", type: "Site-based" },
  { title: "Glass Fabrication Foreman", loc: "Jeddah, KSA", type: "Full-time" },
];

function Careers() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Careers"
        title={<>Engineer your career<br />with GST.</>}
        subtitle="We hire engineers, project managers, fabricators and craftsmen who pursue precision and take pride in lasting work."
      />

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-20">
        <div className="mx-auto max-w-[1536px] grid sm:grid-cols-3 gap-4">
          {[
            { v: "205+", l: "Skilled Professionals" },
            { v: "5", l: "Global Offices" },
            { v: "25+", l: "Years of Excellence" },
          ].map((it) => (
            <Tilt key={it.l} className="glass rounded-2xl">
              <div className="p-6 text-center">
                <div className="font-display text-3xl text-metallic tilt-layer">{it.v}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-2">{it.l}</div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="mx-auto max-w-[1536px] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <SectionEyebrow>Open Positions</SectionEyebrow>
              <SectionTitle>Join the team</SectionTitle>
            </div>
            <a href="mailto:careers@gstsaudi.com" className="btn-glass self-start"><span>careers@gstsaudi.com</span> <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="grid gap-3">
            {ROLES.map((r) => (
              <Tilt key={r.title} max={5} lift={4} className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between hover:-translate-y-0.5 transition group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 grid place-items-center text-primary"><Briefcase className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-display text-white">{r.title}</h4>
                    <div className="text-xs text-foreground/60 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {r.loc}</span>
                      <span>· {r.type}</span>
                    </div>
                  </div>
                </div>
                <a href={`mailto:careers@gstsaudi.com?subject=${encodeURIComponent(`Application: ${r.title} (${r.loc})`)}`} className="btn-glass text-sm"><span>Apply</span> <ArrowRight className="w-4 h-4" /></a>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
