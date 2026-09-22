import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, SectionEyebrow, SectionTitle } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { WorldMap } from "@/components/WorldMap";
import leader1 from "@/assets/leader-founder.jpg";
import leader2 from "@/assets/leader-chairman.jpg";
import leader3 from "@/assets/leader-cfo.jpg";

import { ArrowRight, Target, Eye, Heart, Shield, Sparkles, Handshake, ScrollText } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GST Group — 25+ Years of Engineering Excellence" },
      { name: "description", content: "Founded in 2000, GST Group is a multidisciplinary contracting powerhouse delivering precision-built projects across KSA, UAE, Pakistan & UK." },
      { property: "og:title", content: "About GST Group" },
      { property: "og:description", content: "A trusted name in construction and engineering across the Kingdom and beyond." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Shield, title: "Integrity in Every Build", desc: "We honor commitments and uphold transparency from blueprint to completion." },
  { icon: Sparkles, title: "Excellence as Standard", desc: "Quality is our foundation — perfection in craftsmanship, safety & precision." },
  { icon: ScrollText, title: "Innovation that Endures", desc: "We embrace new technologies and methods that redefine performance." },
  { icon: Handshake, title: "Partnership & Collaboration", desc: "Strength in teamwork — clients, consultants, and our people together." },
  { icon: Heart, title: "Safety & Sustainability", desc: "We build responsibly — protecting people, clients and the environment." },
  { icon: Target, title: "Trust Built Over Time", desc: "Reliable delivery, ethical practice, lasting client satisfaction." },
];

const LEADERS = [
  {
    name: "Mr. Zahoor Ahmed",
    role: "Founder — GST Group",
    img: leader1,
    quote:
      "When I established GST Group in 2000, my vision was to create a company that stands on trust, quality, and integrity. Today, with a strong leadership team and a committed workforce, our values continue to guide us toward greater milestones.",
  },
  {
    name: "Engr. Asif Mehmood",
    role: "Co-Founder / Chairman",
    img: leader2,
    quote:
      "It is my privilege to lead a company that has grown from humble beginnings into a trusted name in engineering, construction, and industrial solutions. Our success is built on teamwork, uncompromising quality, and earned trust.",
  },
  {
    name: "Mr. Asad Mehmood",
    role: "Country CFO",
    img: leader3,
    quote:
      "Financial strength is the backbone of sustainable growth. My responsibility is to ensure transparency, accountability, and disciplined planning across every project we deliver.",
  },
];


function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="About Us"
        title={<>A multidisciplinary <br />contracting powerhouse.</>}
        subtitle="Established in 2000, GST Group has grown into one of the region's most trusted names in construction and engineering — delivering excellence across borders."
      />

      <section className="light-band px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
        <div className="mx-auto max-w-[1536px] text-center space-y-3 mb-12">
          <SectionEyebrow>Global Footprint</SectionEyebrow>
          <SectionTitle>Where in the world we build</SectionTitle>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Four home markets — Pakistan, Saudi Arabia, the UAE and the United Kingdom — one integrated delivery team.
          </p>
        </div>
        <div className="dark-surface mx-auto max-w-[1536px] rounded-3xl">
          <WorldMap />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-20">
        <div className="mx-auto max-w-[1536px] grid md:grid-cols-2 gap-6">
          <Tilt max={7} className="glass-strong rounded-3xl p-10 space-y-4 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl" />
            <Eye className="w-7 h-7 text-primary" />
            <h3 className="font-display text-2xl text-white">Our Vision</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              To redefine excellence in construction and engineering across the Middle East — delivering innovative, precision-built solutions that inspire confidence, shape skylines and set new industry benchmarks.
            </p>
          </Tilt>
          <Tilt max={7} className="glass-strong rounded-3xl p-10 space-y-4 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/20 blur-3xl" />
            <Target className="w-7 h-7 text-primary" />
            <h3 className="font-display text-2xl text-white">Our Mission</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              To build enduring value for clients, partners and communities by delivering superior engineering, construction and fabrication solutions that combine innovation, craftsmanship and integrity.
            </p>
          </Tilt>
        </div>
      </section>

      <section className="light-band px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
        <div className="mx-auto max-w-[1536px] text-center space-y-3 mb-12">
          <SectionEyebrow>Core Values</SectionEyebrow>
          <SectionTitle>Principles that guide every build</SectionTitle>
        </div>
        <div className="mx-auto max-w-[1536px] grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES.map((v) => (
            <Tilt key={v.title} className="glass rounded-2xl">
              <div className="p-6 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 grid place-items-center text-primary tilt-layer-sm"><v.icon className="w-5 h-5" /></div>
                <h4 className="font-display text-white">{v.title}</h4>
                <p className="text-sm text-foreground/65">{v.desc}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </section>


      <section className="relative px-4 sm:px-6 lg:px-8 xl:px-10 py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1536px] text-center space-y-3 mb-14">
          <SectionEyebrow>Leadership Desk</SectionEyebrow>
          <SectionTitle>Message from Management</SectionTitle>
          <p className="text-sm text-foreground/60 max-w-xl mx-auto">
            Visionary leadership guiding GST Group toward excellence and impact.
          </p>
        </div>
        <div className="relative mx-auto max-w-[1536px] grid md:grid-cols-3 gap-6">
          {LEADERS.map((l) => (
            <Tilt key={l.name} className="group glass rounded-3xl overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={l.img}
                  alt={`${l.name}, ${l.role} at GST Group`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="font-display text-lg text-foreground leading-tight">{l.name}</div>
                  <div className="text-[11px] text-primary uppercase tracking-[0.18em] mt-1">{l.role}</div>
                </div>
              </div>
              <div className="p-7 pt-6 flex-1 flex flex-col gap-4 border-t border-white/10">
                <span className="font-display text-4xl leading-none text-primary/40">&ldquo;</span>
                <p className="text-sm text-foreground/70 leading-relaxed -mt-4">{l.quote}</p>
                <div className="mt-auto h-px w-16 bg-gradient-to-r from-primary to-transparent" />
              </div>
            </Tilt>
          ))}
        </div>
      </section>


      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 pb-24">
        <div className="mx-auto max-w-[1536px] text-center glass-strong rounded-3xl p-8 sm:p-12 space-y-5">
          <SectionTitle>Build with us</SectionTitle>
          <p className="text-foreground/70 max-w-xl mx-auto">From concept to completion, we are ready to engineer your next milestone.</p>
          <Link to="/contact" className="btn-glass inline-flex"><span>Get in touch</span> <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
