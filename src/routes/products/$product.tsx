import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { CoverTile, GumroadButton, ProductCard, TYPE_META } from "@/components/site/product-card";
import { Badge } from "@/components/ui/badge";
import { EXAMS } from "@/content/exams";
import { catalog, getProduct, getSubject } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/$product")({
  loader: ({ params }) => {
    const product = getProduct(params.product);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: seo({
          title: "Resource not found",
          description: "This resource could not be found.",
          noindex: true,
        }),
      };
    const p = loaderData.product;
    return {
      meta: seo({
        title: p.name,
        description: p.shortDescription,
        type: "product",
        image: p.coverImage,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.shortDescription,
            ...(p.coverImage?.startsWith("https://") ? { image: p.coverImage } : {}),
            offers: {
              "@type": "Offer",
              url: p.gumroadUrl,
              price: p.access === "free" ? 0 : p.price,
              priceCurrency: p.currency ?? "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const subjects = p.subjects.map((s) => getSubject(s)).filter((s) => s !== undefined);
  const related = catalog.products
    .filter((o) => o.slug !== p.slug && o.subjects.some((s) => p.subjects.includes(s)))
    .slice(0, 4);
  const listLink = p.access === "free" ? ("/free-resources" as const) : ("/premium" as const);

  return (
    <>
      <PageHeader
        eyebrow={`${p.access === "free" ? "Free" : "Premium"} ${TYPE_META[p.type].label}`}
        title={p.name}
        intro={p.shortDescription}
        crumbs={[
          { label: p.access === "free" ? "Free Resources" : "Premium", to: listLink },
          { label: p.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <GumroadButton product={p} size="xl" />
          <span className="text-xs text-muted-foreground">Opens Gumroad in a new tab</span>
        </div>
      </PageHeader>
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <CoverTile type={p.type} image={p.coverImage} alt={p.name} />
          {p.gallery && p.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {p.gallery.map((g) => (
                <img
                  key={g}
                  src={g}
                  alt=""
                  loading="lazy"
                  className="aspect-square rounded-xl object-cover"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5">
            {p.exams.map((e) => (
              <Badge key={e} variant="premium">
                {EXAMS[e].name}
              </Badge>
            ))}
            {subjects.map((s) => (
              <Link key={s.slug} to="/subjects/$subject" params={{ subject: s.slug }}>
                <Badge variant="neutral">{s.name}</Badge>
              </Link>
            ))}
          </div>
          <div className="prose-page mt-6">
            {p.description.split("\n\n").map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          {p.whatsInside.length > 0 && (
            <div className="mt-8 rounded-3xl border bg-surface p-7">
              <h2 className="text-2xl">What’s inside</h2>
              <ul className="mt-4 space-y-3">
                {p.whatsInside.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage-deep" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 text-sm">
            {p.format && (
              <div>
                <dt className="text-muted-foreground">Format</dt>
                <dd className="mt-1 font-medium">{p.format}</dd>
              </div>
            )}
            {p.length && (
              <div>
                <dt className="text-muted-foreground">Length</dt>
                <dd className="mt-1 font-medium">{p.length}</dd>
              </div>
            )}
          </dl>
          <div className="mt-8">
            <GumroadButton product={p} size="xl" />
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="container-page pb-8">
          <h2 className="mb-8 text-3xl">Related resources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
