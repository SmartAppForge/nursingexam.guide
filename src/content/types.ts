export type ExamId = "nclex-rn" | "hesi-a2";
export type ProductType = "ebook" | "interactive-app" | "premium-product";
export type Access = "free" | "paid";
export type Status = "published" | "coming-soon";

export interface Subject {
  slug: string;
  name: string;
  description: string;
  /** Absolute URL or imported asset path. */
  image?: string;
  sortOrder: number;
}

export interface Product {
  slug: string;
  name: string;
  type: ProductType;
  access: Access;
  /** Paid items only, exactly as in the owner's workbook. */
  price?: number;
  currency?: string;
  /** Required. Exactly as in the owner's workbook. */
  gumroadUrl: string;
  subjects: string[];
  exams: ExamId[];
  format?: string;
  /** e.g. "120 pages" or "300 questions" */
  length?: string;
  shortDescription: string;
  description: string;
  whatsInside: string[];
  coverImage?: string;
  gallery?: string[];
  featured?: boolean;
  sortOrder: number;
  status: Status;
}

export interface Bundle {
  slug: string;
  name: string;
  subject: string;
  productSlugs: string[];
  price: number;
  currency: string;
  gumroadUrl: string;
  shortDescription: string;
  description: string;
  coverImage?: string;
  sortOrder: number;
  status: Status;
}

export interface Testimonial {
  id: string;
  quote: string;
  /** Name or initials, only with the student's permission. */
  author: string;
  role?: string;
  exam?: ExamId;
}

export type BlogCategory =
  | "NCLEX Preparation"
  | "Nursing Fundamentals"
  | "Pharmacology"
  | "Anatomy & Physiology"
  | "Medical-Surgical Nursing"
  | "Nursing Specialties"
  | "Study Strategies";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date */
  publishedAt: string;
  subjects: string[];
  exams: ExamId[];
  coverImage?: string;
  /** Paragraphs; "## " prefix renders a heading. */
  body: string[];
}

export interface Catalog {
  subjects: Subject[];
  products: Product[];
  bundles: Bundle[];
}
