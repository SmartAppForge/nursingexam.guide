import { createFileRoute } from "@tanstack/react-router";

import { BundleCard } from "@/components/site/bundle-card";
import { EmptyState, PageHeader } from "@/components/site/page-header";
import { getBundles } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/bundles/")({
  head: () => ({
    meta: seo({
      title: "Nursing Study Bundles by Subject",
      description:
        "Save with subject bundles that group premium nursing resources together, purchased securely via Gumroad.",
    }),
  }),
  component: BundlesPage,
});

function BundlesPage() {
  const bundles = getBundles();
  return (
    <>
      <PageHeader
        eyebrow="Educational bundles"
        title="Subject bundles"
        intro="Every premium resource for a subject, grouped together at a lower price."
        crumbs={[{ label: "Bundles" }]}
      />
      <div className="container-page py-16">
        {bundles.length === 0 ? (
          <EmptyState title="Bundles coming soon">Subject bundles are being prepared.</EmptyState>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bundles.map((b) => (
              <BundleCard key={b.slug} bundle={b} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
