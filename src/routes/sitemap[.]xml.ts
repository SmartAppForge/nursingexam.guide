import { createFileRoute } from "@tanstack/react-router";

import { catalog, getPosts } from "@/lib/catalog";

const STATIC_PATHS = [
  "/",
  "/subjects",
  "/exams/nclex-rn",
  "/exams/hesi-a2",
  "/free-resources",
  "/premium",
  "/bundles",
  "/about",
  "/testimonials",
  "/blog",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclaimer",
  "/legal/refunds",
  "/legal/cookies",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          ...STATIC_PATHS,
          ...catalog.subjects.map((s) => `/subjects/${s.slug}`),
          ...catalog.products.map((p) => `/products/${p.slug}`),
          ...catalog.bundles.map((b) => `/bundles/${b.slug}`),
          ...getPosts().map((p) => `/blog/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
