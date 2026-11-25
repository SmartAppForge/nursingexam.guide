import { bundles } from "@/content/bundles";
import { posts } from "@/content/posts";
import { products } from "@/content/products";
import { SITE } from "@/content/site";
import { subjects } from "@/content/subjects";
import type { Bundle, Catalog, ExamId, Product } from "@/content/types";

export const catalog: Catalog = { subjects, products, bundles };

const bySort = <T extends { sortOrder: number }>(a: T, b: T) => a.sortOrder - b.sortOrder;

export const isFreeEbook = (p: Product) => p.type === "ebook" && p.access === "free";
export const isFreeApp = (p: Product) => p.type === "interactive-app" && p.access === "free";
export const isPremium = (p: Product) => p.access === "paid";

export function getSubjects(c: Catalog = catalog) {
  return [...c.subjects].sort(bySort);
}
export function getSubject(slug: string, c: Catalog = catalog) {
  return c.subjects.find((s) => s.slug === slug);
}
export function getProduct(slug: string, c: Catalog = catalog) {
  return c.products.find((p) => p.slug === slug);
}
export function getBundle(slug: string, c: Catalog = catalog) {
  return c.bundles.find((b) => b.slug === slug);
}
export function getFreeEbooks(c: Catalog = catalog) {
  return c.products.filter(isFreeEbook).sort(bySort);
}
export function getFreeApps(c: Catalog = catalog) {
  return c.products.filter(isFreeApp).sort(bySort);
}
export function getPremium(c: Catalog = catalog) {
  return c.products.filter(isPremium).sort(bySort);
}
export function getFeaturedPremium(c: Catalog = catalog) {
  return getPremium(c).filter((p) => p.featured);
}
export function getBundles(c: Catalog = catalog) {
  return [...c.bundles].sort(bySort);
}
export function getProductsForSubject(slug: string, c: Catalog = catalog) {
  return c.products.filter((p) => p.subjects.includes(slug)).sort(bySort);
}
export function getBundlesForSubject(slug: string, c: Catalog = catalog) {
  return c.bundles.filter((b) => b.subject === slug).sort(bySort);
}
export function getProductsForExam(exam: ExamId, c: Catalog = catalog) {
  return c.products.filter((p) => p.exams.includes(exam)).sort(bySort);
}
export function getBundleProducts(bundle: Bundle, c: Catalog = catalog) {
  return bundle.productSlugs.map((s) => getProduct(s, c)).filter((p): p is Product => Boolean(p));
}

export function getPosts() {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** Pads a list to `count` entries with nulls, used for "coming soon" slots. */
export function fillSlots<T>(items: T[], count: number): (T | null)[] {
  return Array.from({ length: Math.max(count, items.length) }, (_, i) => items[i] ?? null);
}

export function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/**
 * Savings = sum of included product prices − bundle price.
 * Returns null unless every included product is paid, priced in the bundle's currency,
 * and the bundle is actually cheaper.
 */
export function bundleSavings(bundle: Bundle, c: Catalog = catalog): number | null {
  const items = bundle.productSlugs.map((s) => getProduct(s, c));
  if (items.length === 0) return null;
  let total = 0;
  for (const p of items) {
    if (!p || p.access !== "paid" || p.price == null || p.currency !== bundle.currency) return null;
    total += p.price;
  }
  const savings = Math.round((total - bundle.price) * 100) / 100;
  return savings > 0 ? savings : null;
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Returns a list of human-readable problems. Empty list = catalog is valid.
 * With `requireComplete`, the exact free-item counts are enforced.
 */
export function validateCatalog(
  c: Catalog,
  opts: { requireComplete: boolean } = { requireComplete: SITE.catalogComplete },
): string[] {
  const errors: string[] = [];
  const subjectSlugs = new Set(c.subjects.map((s) => s.slug));
  const productSlugs = new Set<string>();

  const dupes = (list: { slug: string }[], label: string) => {
    const seen = new Set<string>();
    for (const { slug } of list) {
      if (seen.has(slug)) errors.push(`Duplicate ${label} slug "${slug}"`);
      seen.add(slug);
    }
  };
  dupes(c.subjects, "subject");
  dupes(c.products, "product");
  dupes(c.bundles, "bundle");

  for (const p of c.products) {
    productSlugs.add(p.slug);
    if (!p.gumroadUrl || !isHttpsUrl(p.gumroadUrl))
      errors.push(`Product "${p.slug}" is missing a valid Gumroad URL`);
    if (p.access === "paid" && (p.price == null || p.price <= 0 || !p.currency))
      errors.push(`Paid product "${p.slug}" has no price`);
    if (p.access === "free" && p.price != null)
      errors.push(`Free product "${p.slug}" must not have a price`);
    for (const s of p.subjects)
      if (!subjectSlugs.has(s))
        errors.push(`Product "${p.slug}" references unknown subject "${s}"`);
  }

  for (const b of c.bundles) {
    if (!b.gumroadUrl || !isHttpsUrl(b.gumroadUrl))
      errors.push(`Bundle "${b.slug}" is missing a valid Gumroad URL`);
    if (!(b.price > 0) || !b.currency) errors.push(`Bundle "${b.slug}" has no price`);
    if (!subjectSlugs.has(b.subject))
      errors.push(`Bundle "${b.slug}" references unknown subject "${b.subject}"`);
    if (b.productSlugs.length === 0) errors.push(`Bundle "${b.slug}" includes no products`);
    for (const s of b.productSlugs)
      if (!productSlugs.has(s)) errors.push(`Bundle "${b.slug}" references unknown product "${s}"`);
  }

  const ebooks = c.products.filter(isFreeEbook).length;
  const apps = c.products.filter(isFreeApp).length;
  const check = (n: number, label: string) => {
    if (opts.requireComplete ? n !== 4 : n > 4)
      errors.push(`Expected exactly 4 ${label}, found ${n}`);
  };
  check(ebooks, "free ebooks");
  check(apps, "free Interactive Apps");

  return errors;
}
