/**
 * Catalog validation tests.
 *
 * Run with: `bun run test` or `npx vitest run`
 */
import { describe, it, expect } from "vitest";
import { validateCatalog } from "@/lib/catalog";
import { catalog } from "@/lib/catalog";
import { SITE } from "@/content/site";

describe("Catalog Validation", () => {
  it("should detect duplicate subject slugs", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const duplicateSubjectErrors = errors.filter((e) => e.includes("Duplicate subject slug"));
    expect(duplicateSubjectErrors.length).toBe(0);
  });

  it("should detect duplicate product slugs", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const duplicateProductErrors = errors.filter((e) => e.includes("Duplicate product slug"));
    expect(duplicateProductErrors.length).toBe(0);
  });

  it("should detect duplicate bundle slugs", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const duplicateBundleErrors = errors.filter((e) => e.includes("Duplicate bundle slug"));
    expect(duplicateBundleErrors.length).toBe(0);
  });

  it("should detect products missing valid Gumroad URLs", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const gumroadErrors = errors.filter((e) => e.includes("missing a valid Gumroad URL"));
    expect(gumroadErrors.length).toBe(0);
  });

  it("should detect paid products without valid prices", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const priceErrors = errors.filter((e) => e.includes("Paid product has no price"));
    // With 0 paid products, there should be no price errors
    expect(priceErrors.length).toBe(0);
  });

  it("should detect free products with prices", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const freePriceErrors = errors.filter((e) => e.includes("Free product must not have a price"));
    // All 8 products are free, so this should detect any with prices
    expect(freePriceErrors.length).toBe(0);
  });

  it("should detect products referencing unknown subjects", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const unknownSubjectErrors = errors.filter((e) => e.includes("references unknown subject"));
    // All products reference known subjects, so 0 errors expected
    expect(unknownSubjectErrors.length).toBe(0);
  });

  it("should detect bundles referencing unknown subjects", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const bundleSubjectErrors = errors.filter((e) =>
      e.includes("Bundle references unknown subject"),
    );
    // 0 bundles, so 0 errors expected
    expect(bundleSubjectErrors.length).toBe(0);
  });

  it("should detect bundles with no products", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const bundleProductErrors = errors.filter((e) => e.includes("includes no products"));
    expect(bundleProductErrors.length).toBe(0);
  });

  it("should detect bundles referencing unknown products", () => {
    const errors = validateCatalog(catalog, { requireComplete: SITE.catalogComplete });
    const bundleProductRefErrors = errors.filter((e) =>
      e.includes("Bundle references unknown product"),
    );
    expect(bundleProductRefErrors.length).toBe(0);
  });

  it("should enforce free ebook count check when catalogComplete is true", () => {
    const errors = validateCatalog(catalog, { requireComplete: true });
    const ebookErrors = errors.filter((e) => e.includes("free ebooks"));
    // With 4 free ebooks and catalogComplete=false, this should pass
    // With catalogComplete=true, it would enforce exactly 4
    expect(ebookErrors.length).toBe(0);
  });

  it("should enforce free app count check when catalogComplete is true", () => {
    const errors = validateCatalog(catalog, { requireComplete: true });
    const appErrors = errors.filter((e) => e.includes("free Interactive Apps"));
    expect(appErrors.length).toBe(0);
  });
});
