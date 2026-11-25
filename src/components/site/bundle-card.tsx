import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Bundle } from "@/content/types";
import { bundleSavings, formatPrice, getSubject } from "@/lib/catalog";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const savings = bundleSavings(bundle);
  const subject = getSubject(bundle.subject);
  return (
    <Link
      to="/bundles/$bundle"
      params={{ bundle: bundle.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      {bundle.coverImage ? (
        <img
          src={bundle.coverImage}
          alt={bundle.name}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className="bg-cta grid aspect-[16/9] place-items-center">
          <Layers className="size-10 text-primary/50" strokeWidth={1.25} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {subject && <Badge variant="neutral">{subject.name}</Badge>}
          <Badge variant="neutral">{bundle.productSlugs.length} resources</Badge>
          {savings && <Badge variant="free">Save {formatPrice(savings, bundle.currency)}</Badge>}
        </div>
        <h3 className="mt-3 text-2xl group-hover:text-primary">{bundle.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {bundle.shortDescription}
        </p>
        <p className="mt-auto pt-5 font-semibold">{formatPrice(bundle.price, bundle.currency)}</p>
      </div>
    </Link>
  );
}
