import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type CrumbPath = "/subjects" | "/bundles" | "/blog" | "/premium" | "/free-resources";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: { label: string; to?: CrumbPath }[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero border-b border-border/60">
      <div className="container-page py-16 md:py-20">
        {crumbs && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow animate-rise">{eyebrow}</p>}
        <h1 className="animate-rise mt-3 max-w-3xl text-4xl leading-[1.08] md:text-6xl">{title}</h1>
        {intro && (
          <p className="animate-rise mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground [animation-delay:80ms]">
            {intro}
          </p>
        )}
        {children && <div className="animate-rise mt-8 [animation-delay:160ms]">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl leading-tight md:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-muted-foreground leading-relaxed">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed bg-surface px-6 py-14 text-center">
      <p className="font-display text-2xl">{title}</p>
      {children && (
        <div className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
