import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXAMS } from "@/content/exams";
import type { Product, ProductType } from "@/content/types";
import { formatPrice } from "@/lib/catalog";

export const TYPE_META: Record<ProductType, { label: string; icon: LucideIcon }> = {
  ebook: { label: "Ebook", icon: BookOpen },
  "interactive-app": { label: "Interactive App", icon: MonitorSmartphone },
  "premium-product": { label: "Premium Resource", icon: GraduationCap },
};

export function CoverTile({
  type,
  image,
  alt,
}: {
  type: ProductType;
  image?: string | undefined;
  alt: string;
}) {
  const Icon = TYPE_META[type].icon;
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
    );
  }
  return (
    <div className="bg-cta grid aspect-[4/3] w-full place-items-center rounded-2xl">
      <Icon className="size-10 text-primary/50" strokeWidth={1.25} />
    </div>
  );
}

export function GumroadButton({
  product,
  size = "default",
}: {
  product: Pick<Product, "access" | "gumroadUrl" | "price" | "currency" | "status">;
  size?: "default" | "xl";
}) {
  if (product.status === "coming-soon") {
    return (
      <Button variant="soft" size={size} disabled>
        Coming soon
      </Button>
    );
  }
  const label =
    product.access === "free"
      ? "Download free"
      : `Buy${product.price != null ? ` — ${formatPrice(product.price, product.currency)}` : ""}`;
  return (
    <Button asChild variant={product.access === "free" ? "sage" : "hero"} size={size}>
      <a href={product.gumroadUrl} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight />
      </a>
    </Button>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col rounded-3xl border bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <Link to="/products/$product" params={{ product: product.slug }} className="block">
        <CoverTile type={product.type} image={product.coverImage} alt={product.name} />
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={product.access === "free" ? "free" : "premium"}>
            {product.access === "free" ? "Free" : "Premium"}
          </Badge>
          <Badge variant="neutral">{TYPE_META[product.type].label}</Badge>
          {product.exams.map((e) => (
            <Badge key={e} variant="neutral">
              {EXAMS[e].name}
            </Badge>
          ))}
        </div>
        <h3 className="mt-3 text-xl leading-snug">
          <Link
            to="/products/$product"
            params={{ product: product.slug }}
            className="hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Link
            to="/products/$product"
            params={{ product: product.slug }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Details
          </Link>
          <GumroadButton product={product} />
        </div>
      </div>
    </article>
  );
}

export function SlotCard({ type, index }: { type: ProductType; index: number }) {
  const Icon = TYPE_META[type].icon;
  return (
    <div className="flex flex-col rounded-3xl border border-dashed bg-surface p-3">
      <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl bg-muted/60">
        <Icon className="size-9 text-muted-foreground/40" strokeWidth={1.25} />
      </div>
      <div className="px-3 pt-4 pb-3">
        <Badge variant="free">Free</Badge>
        <p className="mt-3 font-display text-xl text-muted-foreground">
          {TYPE_META[type].label} {index + 1}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}
