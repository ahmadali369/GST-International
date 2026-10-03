import { MapPin } from "lucide-react";
import dottedMap from "@/assets/world-dotted.png";

type Marker = { code: string; country: string; city: string; x: number; y: number };

// x / y are percentages on the equirectangular map above
export const COUNTRY_MARKERS: Marker[] = [
  { code: "KSA", country: "Saudi Arabia", city: "Riyadh — HQ", x: 62.97, y: 36.27 },
  { code: "UAE", country: "United Arab Emirates", city: "Dubai — New Office", x: 65.35, y: 36.6 },
  { code: "PK", country: "Pakistan", city: "Lahore & Gujranwala", x: 70.65, y: 32.47 },
  { code: "UK", country: "United Kingdom", city: "London", x: 49.96, y: 21.38 },
];

export function WorldMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-card p-4 shadow-2xl sm:p-8">
      <div className="relative w-full aspect-[2/1]">
        <img
          src={dottedMap}
          alt="World map highlighting GST Group offices in Saudi Arabia, UAE, Pakistan and the UK"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain opacity-90"
        />

        {COUNTRY_MARKERS.map((m, i) => (
          <div
            key={m.code}
            className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
              style={{ animation: `map-ping 2.8s ease-out ${i * 0.5}s infinite` }}
              aria-hidden
            />
            <span
              className="absolute inset-0 -m-2 rounded-full bg-primary/20 blur-md animate-pulse-glow"
              style={{ animationDelay: `${i * 0.4}s` }}
              aria-hidden
            />
            <span className="relative block h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 transition-transform duration-300 group-hover:scale-150" />
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-6 whitespace-nowrap rounded-xl glass px-3 py-1.5 opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition duration-300">
              <div className="text-xs font-display text-foreground">{m.country}</div>
              <div className="text-xs text-foreground/70">{m.city}</div>
            </div>
            <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-primary">
              {m.code}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COUNTRY_MARKERS.map((m, i) => (
          <div
            key={m.code}
            className="premium-card hover-3d rounded-2xl p-4 animate-rise"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="flex items-center gap-2 text-foreground font-display text-sm">
              <MapPin className="w-4 h-4 text-primary" /> {m.country}
            </div>
            <div className="mt-1 text-xs text-foreground/65">{m.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
