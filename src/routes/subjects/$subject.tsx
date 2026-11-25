import { createFileRoute, notFound } from "@tanstack/react-router";

import { BundleCard } from "@/components/site/bundle-card";
import { EmptyState, PageHeader, SectionHeading } from "@/components/site/page-header";
import { ProductCard, ProductGrid } from "@/components/site/product-card";
import { getBundlesForSubject, getProductsForSubject, getSubject } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/subjects/$subject")({
  loader: ({ params }) => {
    const subject = getSubject(params.subject);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo({
          title: `${loaderData.subject.name} — Nursing Study Resources`,
          description: loaderData.subject.description,
          image: loaderData.subject.image,
        })
      : seo({
          title: "Subject not found",
          description: "This subject could not be found.",
          noindex: true,
        }),
  }),
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();
  const items = getProductsForSubject(subject.slug);
  const free = items.filter((p) => p.access === "free");
  const premium = items.filter((p) => p.access === "paid");
  const bundles = getBundlesForSubject(subject.slug);

  return (
    <>
      <PageHeader
        eyebrow="Subject"
        title={subject.name}
        intro={subject.description}
        crumbs={[{ label: "Subjects", to: "/subjects" }, { label: subject.name }]}
      />
      <div className="container-page space-y-20 py-16">
        {items.length === 0 && bundles.length === 0 && (
          <EmptyState title="Resources coming soon">
            Resources for this subject are being prepared.
          </EmptyState>
        )}
        {free.length > 0 && (
          <section>
            <SectionHeading eyebrow="Free" title="Free resources" />
            <ProductGrid>
              {free.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </ProductGrid>
          </section>
        )}
        {premium.length > 0 && (
          <section>
            <SectionHeading eyebrow="Premium" title="Premium resources" />
            <ProductGrid>
              {premium.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </ProductGrid>
          </section>
        )}
        {bundles.length > 0 && (
          <section>
            <SectionHeading eyebrow="Bundle" title={`${subject.name} bundle`} />
            <div className="grid gap-6 md:grid-cols-3">
              {bundles.map((b) => (
                <BundleCard key={b.slug} bundle={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
