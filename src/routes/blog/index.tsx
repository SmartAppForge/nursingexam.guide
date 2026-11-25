import { createFileRoute, Link } from "@tanstack/react-router";

import { EmptyState, PageHeader } from "@/components/site/page-header";
import { getPosts } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: seo({
      title: "Nursing Study Blog",
      description:
        "Study guides, exam strategies and subject reviews for NCLEX-RN and HESI A2 preparation.",
    }),
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <PageHeader eyebrow="Blog" title="Study guides & exam tips" crumbs={[{ label: "Blog" }]} />
      <div className="container-page py-16">
        {posts.length === 0 ? (
          <EmptyState title="Articles coming soon">
            The first study guides are on their way.
          </EmptyState>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$post"
                params={{ post: p.slug }}
                className="group overflow-hidden rounded-3xl border bg-card shadow-soft"
              >
                {p.coverImage && (
                  <img
                    src={p.coverImage}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="p-7">
                  <time className="text-xs text-muted-foreground" dateTime={p.publishedAt}>
                    {new Date(p.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" })}
                  </time>
                  <h2 className="mt-2 text-2xl group-hover:text-primary">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
