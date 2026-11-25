import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/site/page-header";
import { getProductsForSubject, getSubjects } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/subjects/")({
  head: () => ({
    meta: seo({
      title: "Nursing Subjects",
      description:
        "Browse nursing study resources by subject — free ebooks, interactive apps, premium products and bundles.",
    }),
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const subjects = getSubjects();
  return (
    <>
      <PageHeader
        eyebrow="Subjects"
        title="Study by subject"
        intro="Every subject collects its free resources, premium products and bundle in one place."
        crumbs={[{ label: "Subjects" }]}
      />
      <div className="container-page py-16">
        {subjects.length === 0 ? (
          <EmptyState title="Subjects coming soon">
            The subject library is being finalised.
          </EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <Link
                key={s.slug}
                to="/subjects/$subject"
                params={{ subject: s.slug }}
                className="group overflow-hidden rounded-3xl border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="bg-cta aspect-[4/3]" />
                )}
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-2xl group-hover:text-primary">{s.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {getProductsForSubject(s.slug).length} resources
                    </p>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
