import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, SectionEyebrow } from "@/components/Section";
import { Tilt } from "@/components/Tilt";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GST Group" },
      { name: "description", content: "Talk to GST Group — Riyadh HQ with offices in UAE, Pakistan & UK. sales@gstsaudi.com · 0114 509354" },
      { property: "og:title", content: "Contact GST Group" },
      { property: "og:description", content: "Get in touch with our engineers about your next project." },
    ],
  }),
  component: Contact,
});

const OFFICES = [
  { city: "Riyadh", country: "Saudi Arabia · HQ", phone: "0114 509354", email: "sales@gstsaudi.com" },
  { city: "Dubai", country: "United Arab Emirates · New", phone: "+971 4 000 0000", email: "uae@gstsaudi.com" },
  { city: "Lahore", country: "Pakistan", phone: "+92 42 000 0000", email: "pk@gstsaudi.com" },
  { city: "London", country: "United Kingdom", phone: "+44 20 0000 0000", email: "uk@gstsaudi.com" },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Contact Us"
        title={<>Let's engineer<br />your next milestone.</>}
        subtitle="Tell us about your project — design, build, fabricate or fit-out — and our engineers will get back within one business day."
      />

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-20">
        <div className="mx-auto max-w-[1536px] grid lg:grid-cols-5 gap-6">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 space-y-5"
          >
            <SectionEyebrow>Project Inquiry</SectionEyebrow>
            <h2 className="font-display text-2xl text-white">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" name="name" required />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" />
            </div>
            <Field label="Project type" name="type" placeholder="Metal works, glass, MEP, fitout..." />
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">Project details</label>
              <textarea
                rows={5}
                required
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Scope, location, timeline..."
              />
            </div>
            <button type="submit" className="btn-glass">
              <span>{sent ? "Message sent ✓" : "Send message"}</span> {!sent && <Send className="w-4 h-4" />}
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <Tilt max={6} className="glass-strong rounded-3xl p-7 space-y-4">
              <h3 className="font-display text-lg text-white">Direct contact</h3>
              <a href="mailto:sales@gstsaudi.com" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-white"><Mail className="w-4 h-4 text-primary" /> sales@gstsaudi.com</a>
              <a href="tel:+966114509354" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-white"><Phone className="w-4 h-4 text-primary" /> 0114 509354</a>
              <div className="flex items-start gap-3 text-sm text-foreground/80"><MapPin className="w-4 h-4 text-primary mt-0.5" /> Riyadh, Kingdom of Saudi Arabia</div>
            </Tilt>
            <Tilt max={6} className="glass-strong rounded-3xl p-7 space-y-3">
              <h3 className="font-display text-lg text-white">Working hours</h3>
              <div className="text-sm text-foreground/70">Sun – Thu · 09:00 – 18:00 AST</div>
              <div className="hairline" />
              <div className="text-xs text-foreground/55">Emergency on-site coordination available 24/7 for active projects.</div>
            </Tilt>
          </aside>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10 pb-32">
        <div className="mx-auto max-w-[1536px]">
          <SectionEyebrow>Global Offices</SectionEyebrow>
          <h2 className="font-display text-3xl lg:text-4xl text-metallic mt-3 mb-8">Find us across four countries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICES.map((o) => (
              <Tilt key={o.city} className="glass rounded-2xl p-6 space-y-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{o.country}</div>
                <h3 className="font-display text-xl text-white">{o.city}</h3>
                <div className="hairline" />
                <a href={`tel:${o.phone}`} className="flex items-center gap-2 text-xs text-foreground/70 hover:text-white"><Phone className="w-3.5 h-3.5 text-primary" /> {o.phone}</a>
                <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-xs text-foreground/70 hover:text-white"><Mail className="w-3.5 h-3.5 text-primary" /> {o.email}</a>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-foreground/60">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
