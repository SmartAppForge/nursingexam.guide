/**
 * Site-wide settings. Values marked "pending" must come from the owner —
 * never fill them with invented data.
 */
export const SITE = {
  name: "NursingExam.guide",
  domain: "https://nursingexam.guide",
  tagline: "Nursing exam preparation, made clear.",
  description:
    "Free nursing ebooks, interactive study apps and premium NCLEX-RN and HESI A2 resources, organised by subject.",
  /** Pending from owner. */
  contactEmail: "support@nursingexam.guide",
  /** Pending from owner, e.g. [{ label: "Instagram", href: "https://..." }] */
  socials: [] as { label: string; href: string }[],
  /** Flip to true once the owner's workbook is fully imported; enables strict catalog checks. */
  catalogComplete: false,
  freeEbookSlots: 4,
  freeAppSlots: 4,
} as const;
