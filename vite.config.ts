// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const SERVICES = [
  "design-engineering", "metal-works", "glass-works", "aluminum-works", "interior-fitout",
  "civil-works", "ac-ducting", "mep-firefighting", "electrical-works", "vehicle-tracking", "it-services",
];
const BLOG = [
  "glass-facades-gulf-climate", "gst-group-expands-to-dubai", "steel-fabrication-quality-control",
];

// `GITHUB_PAGES=1 npm run build` produces a fully static, pre-rendered site (dist/client)
// that can be hosted on GitHub Pages. The default build targets Cloudflare Workers.
const staticPages = process.env.GITHUB_PAGES === "1";
const base = process.env.PAGES_BASE ?? "/GST-International/";

export default staticPages
  ? defineConfig({
      nitro: false,
      tanstackStart: {
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoSubfolderIndex: true,
        },
        pages: [
          "/", "/about", "/services", "/portfolio", "/blog", "/careers", "/contact",
          ...SERVICES.map((s) => `/services/${s}`),
          ...BLOG.map((s) => `/blog/${s}`),
        ].map((path) => ({ path })),
      },
      vite: { base },
    })
  : defineConfig();
