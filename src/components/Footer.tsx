import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/gst-logo.png";

const OFFICES = [
  { city: "Riyadh", country: "Saudi Arabia", tag: "HQ" },
  { city: "Dubai", country: "UAE", tag: "New" },
  { city: "Lahore", country: "Pakistan" },
  { city: "Gujranwala", country: "Pakistan" },

  { city: "London", country: "United Kingdom" },
];

export function Footer() {
  return (
    <footer className="relative mt-32">
      <div className="absolute inset-x-0 -top-px hairline" />
      <div className="glass-dark relative">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-10 py-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 hover-3d">
              <img src={logo} alt="GST Group logo" width={485} height={409} className="h-14 w-auto object-contain" />
              <div>
                <div className="font-display font-bold text-white">GST Group</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">Build · Engineer · Deliver</div>
              </div>
            </Link>
            <p className="text-sm text-foreground/70 max-w-sm">
              A multidisciplinary contracting powerhouse — transforming big designs into built realities across Saudi Arabia, Dubai, Pakistan & the UK — now expanding fast in the UAE.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full glass hover:glow-ring transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition">Portfolio</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link to="/services/$slug" params={{ slug: "design-engineering" }} className="hover:text-white transition">Design & Engineering</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "metal-works" }} className="hover:text-white transition">Metal Works</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "glass-works" }} className="hover:text-white transition">Glass Works</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "mep-firefighting" }} className="hover:text-white transition">MEP & Fire Fighting</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3 text-sm text-foreground/70">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Reach Us</h4>
            <a href="mailto:sales@gstsaudi.com" className="flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4 text-primary" /> sales@gstsaudi.com</a>
            <a href="tel:+966114509354" className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4 text-primary" /> 0114 509354</a>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> Riyadh, Kingdom of Saudi Arabia</div>
          </div>
        </div>

        {/* Offices map ribbon */}
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-10 py-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFICES.map((o) => (
              <div key={o.city} className="glass rounded-xl p-4 flex items-center justify-between hover-3d">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary">{o.tag ?? "Office"}</div>
                  <div className="text-white font-display font-semibold">{o.city}</div>
                  <div className="text-xs text-foreground/60">{o.country}</div>
                </div>
                <div className="w-10 h-10 rounded-full grid place-items-center bg-primary/15 text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/50">
            <div>© {new Date().getFullYear()} GST Group. All rights reserved.</div>
            <div>ISO 9001 · 14001 · 45001 Certified</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
