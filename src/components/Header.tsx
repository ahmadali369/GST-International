import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/gst-logo.png";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/CartDrawer";
import { openQuote } from "@/lib/quote";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blogs" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    const measure = () => {
      setScrolled(window.scrollY > 30);

      const header = headerRef.current;
      if (!header) return;

      const previousPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = "none";
      const point = document.elementFromPoint(
        window.innerWidth / 2,
        Math.min(header.getBoundingClientRect().bottom + 8, window.innerHeight - 1),
      );
      header.style.pointerEvents = previousPointerEvents;
      setLightSurface(Boolean(point?.closest(".light-band")));
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8 xl:px-10 pt-3 sm:pt-4">
        <div className={`glass-strong header-shell mx-auto max-w-[1536px] rounded-2xl transition-all duration-500 ${lightSurface ? "light-header" : ""} ${scrolled ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : ""}`}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 py-3">
            <Link to="/" className="flex items-center gap-3 group hover-3d">
              <img
                src={logo}
                alt="GST Group logo"
                width={485}
                height={409}
                className="header-logo h-10 w-auto object-contain drop-shadow-[0_0_18px_oklch(1_0_0/0.25)]"
              />
              <div className="leading-tight hidden sm:block">
                <div className="font-display font-bold text-white text-sm tracking-wide">GST Group</div>
                <div className="text-xs uppercase tracking-[0.12em] text-foreground/65 whitespace-nowrap">Saudi Arabia · Dubai · Pakistan · UK</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Primary call to action */}
              <button
                type="button"
                onClick={openQuote}
                className="hidden sm:inline-flex items-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98]"
              >
                Get a Quote
              </button>
              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-lg glass hover:bg-white/10 transition-all duration-300 group"
                aria-label={`Quote list with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              >
                <ShoppingCart className="w-5 h-5 text-white/85 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold leading-none px-1 animate-rise">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2.5 rounded-lg glass"
                aria-label="Menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div id="mobile-nav" className="lg:hidden border-t border-white/10 px-4 pb-4 pt-2 animate-rise">
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
                className="mt-3 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:hidden"
              >
                Get a Quote
              </button>
            </div>
          )}
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
