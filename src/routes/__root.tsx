import { Outlet, Link, createRootRoute, HeadContent, Scripts, redirect } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";
import { FloatingActions } from "@/components/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";

function NotFoundComponent() {
  return (
    <div className="min-h-screen">
    <Header />
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 pt-28">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  // Canonicalise URLs: /ABOUT -> /about (avoids duplicate content).
  beforeLoad: ({ location }) => {
    const path = location.pathname;
    if (path !== path.toLowerCase()) {
      throw redirect({ href: path.toLowerCase() + location.searchStr + location.hash, statusCode: 301 });
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GST Group — Engineering & Contracting" },
      { name: "description", content: "GST Group builds across Saudi Arabia, Dubai, Pakistan and the UK — metal, glass, civil, MEP and interior fitout contracting." },
      { name: "author", content: "GST Group" },
      { property: "og:title", content: "GST Group — Engineering & Contracting" },
      { property: "og:description", content: "Transforming big designs into built realities across KSA, Dubai, Pakistan and the UK." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "preconnect", href: "https://fonts.cdnfonts.com" },
      { rel: "stylesheet", href: "https://fonts.cdnfonts.com/css/conthrax" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },


    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <FloatingActions />
      <Toaster position="top-center" />
    </CartProvider>
  );
}
