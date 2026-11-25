import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { ProductCard, ProductGrid } from "@/components/site/product-card";
import { Button } from "@/components/ui/button";
import {
  bundleSavings,
  formatPrice,
  getBundle,
  getBundleProducts,
  getSubject,
} from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/bundles/$bundle")({
  loader: ({ params }) => {
    const bundle = getBundle(params.bundle);
    if (!bundle) throw notFound();
    return { bundle };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo({
          title: loaderData.bundle.name,
          description: loaderData.bundle.shortDescription,
          type: "product",
          image: loaderData.bundle.coverImage,
        })
      : seo({
          title: "Bundle not found",
          description: "This bundle could not be found.",
          noindex: true,
        }),
  }),
  component: BundlePage,
});

function BundlePage() {
  const { bundle } = Route.useLoaderData();
  const items = getBundleProducts(bundle);
  const savings = bundleSavings(bundle);
  const subject = getSubject(bundle.subject);
  return (
    <>
      <PageHeader
        eyebrow={subject ? `${subject.name} bundle` : "Bundle"}
        title={bundle.name}
        intro={bundle.shortDescription}
        crumbs={[{ label: "Bundles", to: "/bundles" }, { label: bundle.name }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          {bundle.status === "coming-soon" ? (
            <Button variant="soft" size="xl" disabled>
              Coming soon
            </Button>
          ) : (
            <Button asChild variant="hero" size="xl">
              <a href={bundle.gumroadUrl} target="_blank" rel="noopener noreferrer">
                Buy bundle — {formatPrice(bundle.price, bundle.currency)} <ArrowUpRight />
              </a>
            </Button>
          )}
          {savings && (
            <span className="text-sm font-semibold text-sage-deep">
              Save {formatPrice(savings, bundle.currency)}
            </span>
          )}
        </div>
      </PageHeader>
      <div className="container-page py-16">
        <div className="prose-page max-w-3xl">
          {bundle.description.split("\n\n").map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>
        <h2 className="mt-14 mb-8 text-3xl">Included in this bundle</h2>
        <ProductGrid>
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ProductGrid>
      </div>
    </>
  );
}
