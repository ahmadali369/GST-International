import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { SectionEyebrow, SectionTitle } from "@/components/Section";
import { IT_SERVICES, IT_SERVICE_CATEGORIES, type ITService } from "@/data/it-services";
import { useCart } from "@/hooks/useCart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function ServiceCard({ service }: { service: ITService }) {
  const { addItem, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = isInCart(service.id);
  const Icon = service.icon;

  const handleAdd = () => {
    if (inCart) return;
    addItem({
      id: service.id,
      name: service.name,
      description: service.description,
      category: service.category,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className={`it-service-card group relative flex flex-col rounded-2xl bg-white border overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] ${
        service.category === "odoo"
          ? "border-[#714B67]/30 hover:border-[#714B67]"
          : "border-neutral-200/90 hover:border-amber-300/80"
      }`}
    >
      {/* Visual Header Banner matching Specialized Services style */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.img}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 img-scrim" />

        {/* Floating Glass Icon Badge */}
        <div className="on-dark absolute top-3.5 left-3.5 w-10 h-10 rounded-xl glass-strong grid place-items-center text-white tilt-layer-sm shadow-md group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Odoo / IT badge */}
        {service.category === "odoo" ? (
          <span className="on-dark absolute top-3.5 right-3.5 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-white bg-[#714B67] border border-[#875A7B]/60 rounded-full px-3 py-1 shadow-md backdrop-blur-md">
            Odoo
          </span>
        ) : (
          <span className="on-dark absolute top-3.5 right-3.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-white/90 bg-black/40 border border-white/20 rounded-full px-2.5 py-0.5 backdrop-blur-md">
            IT Service
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-[15px] font-semibold text-neutral-900 leading-snug tracking-tight group-hover:text-amber-700 transition-colors">
            {service.name}
          </h3>
          <p className="mt-2 text-[13px] text-neutral-500 leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={inCart}
          className={`mt-5 inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-300
            ${
              inCart
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-neutral-900 on-dark border border-neutral-900 hover:bg-amber-600 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-600/20 active:scale-[0.97]"
            }`}
        >
          {inCart || justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function ITServices() {
  const odooServices = IT_SERVICES.filter((s) => s.category === "odoo");
  const itServices = IT_SERVICES.filter((s) => s.category === "it");

  return (
    <section id="it-services" className="light-band relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1536px]">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <SectionEyebrow>Digital Solutions</SectionEyebrow>
          <SectionTitle>IT Services</SectionTitle>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base">
            Professional digital solutions designed to help your business grow, operate smarter, and stay ahead.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="odoo" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-neutral-100 border border-neutral-200/80 rounded-full p-1 h-auto">
              {IT_SERVICE_CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-full px-6 py-2.5 text-sm font-medium text-neutral-500 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm transition-all"
                >
                  {cat.label}
                  <span className="ml-2 text-[10px] font-bold bg-neutral-200/80 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 text-neutral-400 rounded-full px-2 py-0.5">
                    {cat.id === "odoo" ? odooServices.length : itServices.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="odoo">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {odooServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="it">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {itServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
