import { createFileRoute, notFound } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/page-header";
import { getPost } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$post")({
  loader: ({ params }) => {
    const post = getPost(params.post);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: seo({
          title: "Article not found",
          description: "This article could not be found.",
          noindex: true,
        }),
      };
    const p = loaderData.post;
    return {
      meta: seo({ title: p.title, description: p.excerpt, type: "article", image: p.coverImage }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.publishedAt,
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={post.title}
        intro={post.excerpt}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]}
      />
      <article className="container-page py-16">
        <div className="prose-page mx-auto max-w-3xl">
          {post.body.map((block, i) =>
            block.startsWith("## ") ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>,
          )}
        </div>
      </article>
    </>
  );
}
