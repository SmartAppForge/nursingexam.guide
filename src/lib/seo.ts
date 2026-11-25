import { SITE } from "@/content/site";

interface SeoInput {
  title: string;
  description: string;
  type?: "website" | "article" | "product";
  /** Absolute https URL only. */
  image?: string | undefined;
  noindex?: boolean;
}

export function seo({ title, description, type = "website", image, noindex }: SeoInput) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const meta: Record<string, string>[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (image && image.startsWith("https://")) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  return meta;
}
