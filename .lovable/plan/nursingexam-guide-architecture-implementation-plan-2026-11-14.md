# NursingExam.guide — Architecture & Implementation Plan

## 1. Analysis

NursingExam.guide is a **content and product discovery site**: visitors browse by subject or exam (NCLEX-RN, HESI A2), read about a resource, then leave for Gumroad to download (free) or buy (premium). No accounts, no payments on-site, no learning tracking.

Implications:

- The core of the site is a **well-structured product catalog**, not user features.
- Every "Download" / "Buy" button is an outbound Gumroad link.
- Trust and SEO matter most: clean product pages, real testimonials, blog content, clear medical/trademark disclaimers.
- No login means no database is required for the catalog. A backend is only needed if the contact form should store/send messages.

## 2. Website architecture

```text
/                           Home
/subjects                   All subjects (grid)
/subjects/:subject          One subject: its free items, premium items, bundle
/exams/nclex-rn             NCLEX-RN hub (filtered catalog + guidance)   [recommended]
/exams/hesi-a2              HESI A2 hub                                   [recommended]
/free-resources             4 free ebooks + 4 free Interactive Apps
/premium                    All premium products (filter by subject / exam / type)
/products/:product          Product details (also used for free items)
/bundles                    All subject bundles
/bundles/:bundle            Bundle details (included products, savings)
/about                      Mission, founder/credentials, approach
/testimonials               Student testimonials
/blog                       Article list (filter by subject / exam)
/blog/:post                 Article
/contact                    Contact form + email
/legal/privacy              Privacy policy
/legal/terms                Terms of use
/legal/disclaimer           Medical + NCLEX/HESI trademark disclaimer
/legal/refunds              Refund policy (points to Gumroad terms)
/legal/cookies              Cookie policy (if analytics used)
```

Each page gets its own SEO title, description and social preview. Product, bundle and article pages also get structured data (Product / Article) and appear in a generated sitemap.

## 3. Navigation

**Header (desktop)**

- Logo
- Subjects (dropdown listing every subject)
- Exam Prep (dropdown: NCLEX-RN, HESI A2)
- Free Resources
- Premium
- Bundles
- Blog
- About
- Primary button: "Get Free Ebooks"

**Header (mobile)**: logo + "Free Ebooks" button + menu drawer with the same items, subjects expandable.

**Footer**

- Resources: Free Resources, Premium, Bundles, Subjects, NCLEX-RN, HESI A2
- Company: About, Testimonials, Blog, Contact
- Legal: Privacy, Terms, Disclaimer, Refunds, Cookies
- Short educational disclaimer + "Purchases processed securely by Gumroad"
- Social links

**Home page sections (proposed)**

1. Hero — clinical photography / 3D anatomy, headline, "Get Free Ebooks" + "Browse Premium"
2. Exam paths — NCLEX-RN and HESI A2 cards
3. Free resources — 4 ebooks + 4 Interactive Apps
4. Browse by subject — subject cards with organ/system visuals
5. Featured premium products
6. Bundles highlight
7. Testimonials
8. Latest blog articles
9. Final call to action

## 4. Product catalog structure

Three linked collections, filled from the owner's workbook.

**Subjects**

- slug, name, short description, hero image, sort order

**Products** (one record per ebook, app or premium product)

- slug, name
- type: `ebook` | `interactive-app` | `premium-product`
- access: `free` | `paid`
- price + currency (paid only; exactly as in workbook)
- gumroadUrl (required, exactly as in workbook)
- subjects (one or more subject slugs)
- exams: NCLEX-RN and/or HESI A2
- format (PDF, web app, etc.), page count / question count if applicable
- short description, full description, "what's inside" list
- cover image + optional gallery
- featured flag, sort order, status (`published` | `coming-soon`)

**Bundles**

- slug, name, subject, included product slugs, bundle price, gumroadUrl, description, cover

Built-in safety checks (automated tests) that fail if:

- there are not exactly 4 free ebooks and exactly 4 free Interactive Apps
- any product or bundle is missing a Gumroad URL
- a paid item has no price, or a free item has a price
- a bundle references a product that doesn't exist
- a product references a subject that doesn't exist

Bundle savings ("Save $X") are calculated from included product prices, never typed by hand.

Blog articles live as content files alongside the catalog, tagged by subject and exam so they can be cross-linked from subject and product pages.

## 5. Information & assets needed from the owner

**Catalog (required before Phase 2)**

- The product workbook: names, descriptions, prices, Gumroad URLs, subject and exam for every item
- Details of the 4 free ebooks and 4 free Interactive Apps
- Final list of subjects
- Bundle composition and prices
- Product cover images (or approval to generate covers)

**Brand**

- Logo (SVG preferred) and favicon
- Official brand colors (hex) and fonts, if defined
- Photography and 3D anatomy images, or approval to generate photorealistic ones in that style

**Content**

- About page: mission, founder name, credentials, photo
- Testimonials with names/initials and permission to publish
- Initial blog articles (or topics to draft)
- Contact email and social media links

**Legal**

- Business/legal entity name, country, contact address
- Existing privacy/terms text, or approval to draft standard versions for review
- Refund policy wording

**Launch**

- GitHub account to connect
- Access to the NursingExam.guide domain DNS settings
- Whether to use analytics (affects cookie notice)

## 6. Phased implementation

**Phase 1 — Foundation**
Design system (white, blue, sage; professional typography), header, footer, mobile menu, home page layout, catalog data model and safety checks. Clearly marked placeholders where owner data is pending — no invented names, prices or links.

**Phase 2 — Catalog**
Import the workbook. Subjects, Free Resources, Premium (with filters), Product Details, Bundles, NCLEX-RN and HESI A2 hubs. All buttons link to Gumroad.

**Phase 3 — Content & trust pages**
About, Testimonials, Blog (list + article), Contact form, all Legal pages.

**Phase 4 — SEO, polish & QA**
Per-page SEO, structured data, sitemap and robots, image optimization, accessibility pass, desktop/mobile review.

**Phase 5 — Launch**
Connect GitHub, publish, connect the NursingExam.guide domain.

## Open decisions

1. **Interactive Apps** — hosted on Gumroad only, or should they also open/embed on the site?
2. **Contact form** — simple email link, or a form that stores messages and emails you (needs Lovable Cloud)?
3. **Exam hubs** — include the NCLEX-RN and HESI A2 pages (recommended for SEO)?
4. **Newsletter** — collect emails (e.g. via Gumroad follow), or none for now?

## Technical details

- Stack: TanStack Start (React, file-based routes), Tailwind v4 design tokens, shadcn components restyled to the brand.
- Catalog stored as typed data files in the repo (`src/content/`), editable through GitHub; no database needed. Can move to Lovable Cloud later if a non-technical editing interface is wanted.
- Route files per page above; dynamic routes read from the catalog and return a proper 404 for unknown slugs.
- Gumroad links open in a new tab with `rel="noopener"`; optional UTM tags for tracking.
- Vitest tests enforce the catalog rules listed in section 4.
