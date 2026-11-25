import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, MonitorSmartphone } from "lucide-react";

import { PageHeader, SectionHeading } from "@/components/site/page-header";
import { ProductCard, ProductGrid, SlotCard } from "@/components/site/product-card";
import { SITE } from "@/content/site";
import { fillSlots, getFreeApps, getFreeEbooks } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/free-resources")({
  head: () => ({
    meta: seo({
      title: "Free Nursing Ebooks & Interactive Apps",
      description:
        "Download four free nursing ebooks and four free interactive study apps for NCLEX-RN and HESI A2 preparation.",
    }),
  }),
  component: FreeResources,
});

function FreeResources() {
  const ebooks = fillSlots(getFreeEbooks(), SITE.freeEbookSlots);
  const apps = fillSlots(getFreeApps(), SITE.freeAppSlots);
  return (
    <>
      <PageHeader
        eyebrow="Free resources"
        title="Four free ebooks. Four free interactive apps."
        intro="Download instantly through Gumroad — no account needed on this site."
        crumbs={[{ label: "Free Resources" }]}
      />
      <div className="container-page space-y-20 py-16">
        <section>
          <SectionHeading eyebrow="Read" title="Free ebooks" />
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4 text-sage-deep" /> PDF downloads via Gumroad
          </div>
          <ProductGrid>
            {ebooks.map((p, i) =>
              p ? (
                <ProductCard key={p.slug} product={p} />
              ) : (
                <SlotCard key={i} type="ebook" index={i} />
              ),
            )}
          </ProductGrid>
        </section>
        <section>
          <SectionHeading eyebrow="Practise" title="Free Interactive Apps" />
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MonitorSmartphone className="size-4 text-sage-deep" /> Interactive study tools
          </div>
          <ProductGrid>
            {apps.map((p, i) =>
              p ? (
                <ProductCard key={p.slug} product={p} />
              ) : (
                <SlotCard key={i} type="interactive-app" index={i} />
              ),
            )}
          </ProductGrid>
        </section>
      </div>
    </>
  );
}
