import { EmptyState, PageHeader, SectionHeading } from "@/components/site/page-header";
import { ProductCard, ProductGrid } from "@/components/site/product-card";
import { EXAMS } from "@/content/exams";
import type { ExamId } from "@/content/types";
import { getProductsForExam } from "@/lib/catalog";

export function ExamHub({ exam, image, alt }: { exam: ExamId; image: string; alt: string }) {
  const info = EXAMS[exam];
  const items = getProductsForExam(exam);
  const free = items.filter((p) => p.access === "free");
  const premium = items.filter((p) => p.access === "paid");
  return (
    <>
      <PageHeader
        eyebrow={info.tagline}
        title={`${info.name} preparation`}
        intro={info.description}
      />
      <div className="container-page py-16">
        <img
          src={image}
          alt={alt}
          width={1280}
          height={960}
          className="aspect-[21/9] w-full rounded-3xl object-cover shadow-soft"
        />
        <div className="mt-16 space-y-20">
          {items.length === 0 && (
            <EmptyState title="Resources coming soon">
              {info.name} resources are being prepared.
            </EmptyState>
          )}
          {free.length > 0 && (
            <section>
              <SectionHeading eyebrow="Free" title={`Free ${info.name} resources`} />
              <ProductGrid>
                {free.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </ProductGrid>
            </section>
          )}
          {premium.length > 0 && (
            <section>
              <SectionHeading eyebrow="Premium" title={`Premium ${info.name} resources`} />
              <ProductGrid>
                {premium.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </ProductGrid>
            </section>
          )}
        </div>
        <p className="mt-16 text-xs text-muted-foreground">
          {exam === "nclex-rn"
            ? "NCLEX-RN® is a registered trademark of the National Council of State Boards of Nursing, Inc. (NCSBN), which is not affiliated with this site."
            : "HESI® is a registered trademark of Elsevier, which is not affiliated with this site."}
        </p>
      </div>
    </>
  );
}
