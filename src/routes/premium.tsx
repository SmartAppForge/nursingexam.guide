import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { EmptyState, PageHeader } from "@/components/site/page-header";
import { ProductCard, ProductGrid } from "@/components/site/product-card";
import { EXAM_LIST } from "@/content/exams";
import type { ExamId } from "@/content/types";
import { getPremium, getSubjects } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: seo({
      title: "Premium Nursing Resources",
      description:
        "Premium NCLEX-RN and HESI A2 study resources, filterable by subject and exam. Purchased securely through Gumroad.",
    }),
  }),
  component: PremiumPage,
});

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function PremiumPage() {
  const all = getPremium();
  const subjects = getSubjects();
  const [subject, setSubject] = useState<string | null>(null);
  const [exam, setExam] = useState<ExamId | null>(null);

  const items = useMemo(
    () =>
      all.filter(
        (p) => (!subject || p.subjects.includes(subject)) && (!exam || p.exams.includes(exam)),
      ),
    [all, subject, exam],
  );

  return (
    <>
      <PageHeader
        eyebrow="Premium"
        title="Premium nursing resources"
        intro="In-depth review materials for NCLEX-RN and HESI A2. Each purchase is handled securely by Gumroad."
        crumbs={[{ label: "Premium" }]}
      />
      <div className="container-page py-14">
        {all.length === 0 ? (
          <EmptyState title="Premium catalog coming soon">
            Premium resources are being added to the catalog.
          </EmptyState>
        ) : (
          <>
            <div className="mb-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-2 w-16">Exam</span>
                <Chip active={!exam} onClick={() => setExam(null)}>
                  All
                </Chip>
                {EXAM_LIST.map((e) => (
                  <Chip key={e.id} active={exam === e.id} onClick={() => setExam(e.id)}>
                    {e.name}
                  </Chip>
                ))}
              </div>
              {subjects.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow mr-2 w-16">Subject</span>
                  <Chip active={!subject} onClick={() => setSubject(null)}>
                    All
                  </Chip>
                  {subjects.map((s) => (
                    <Chip
                      key={s.slug}
                      active={subject === s.slug}
                      onClick={() => setSubject(s.slug)}
                    >
                      {s.name}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
            {items.length === 0 ? (
              <EmptyState title="No matches">Try a different subject or exam.</EmptyState>
            ) : (
              <ProductGrid>
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </ProductGrid>
            )}
          </>
        )}
      </div>
    </>
  );
}
