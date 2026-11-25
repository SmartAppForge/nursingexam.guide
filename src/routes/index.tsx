import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers, MonitorSmartphone, ShieldCheck } from "lucide-react";

import anatomyImg from "@/assets/anatomy-systems.jpg";
import heroImg from "@/assets/hero-heart.jpg";
import hesiImg from "@/assets/exam-hesi.jpg";
import nclexImg from "@/assets/exam-nclex.jpg";
import { BundleCard } from "@/components/site/bundle-card";
import { SectionHeading } from "@/components/site/page-header";
import { ProductCard, ProductGrid, SlotCard } from "@/components/site/product-card";
import { Button } from "@/components/ui/button";
import { EXAMS } from "@/content/exams";
import { SITE } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import {
  fillSlots,
  getBundles,
  getFeaturedPremium,
  getFreeApps,
  getFreeEbooks,
  getPosts,
  getSubjects,
} from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "NursingExam.guide — NCLEX-RN & HESI A2 Study Resources",
      description:
        "Free nursing ebooks, interactive study apps and premium NCLEX-RN and HESI A2 preparation resources, organised by subject.",
    }),
  }),
  component: Home,
});

function Home() {
  const ebooks = fillSlots(getFreeEbooks(), SITE.freeEbookSlots);
  const apps = fillSlots(getFreeApps(), SITE.freeAppSlots);
  const subjects = getSubjects();
  const featured = getFeaturedPremium().slice(0, 4);
  const bundles = getBundles().slice(0, 3);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden border-b border-border/60">
        <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow animate-rise">NCLEX-RN · HESI A2 · Nursing school</p>
            <h1 className="animate-rise mt-4 text-5xl leading-[1.02] md:text-7xl">
              Nursing exam preparation,{" "}
              <em className="text-primary not-italic md:italic">made clear.</em>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:80ms]">
              Free ebooks, interactive study apps and premium review resources — organised by
              subject, built for nursing students and healthcare professionals.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:160ms]">
              <Button asChild variant="hero" size="xl">
                <Link to="/free-resources">
                  Get Free Ebooks <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/premium">Browse Premium</Link>
              </Button>
            </div>
            <dl className="animate-rise mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-6 [animation-delay:240ms]">
              <div>
                <dt className="text-xs text-muted-foreground">Free ebooks</dt>
                <dd className="font-display text-3xl">4</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Interactive apps</dt>
                <dd className="font-display text-3xl">4</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Exams covered</dt>
                <dd className="font-display text-3xl">2</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-primary-soft blur-3xl" aria-hidden />
            <img
              src={heroImg}
              alt="Realistic 3D anatomical model of the human heart"
              width={1536}
              height={1152}
              className="animate-float relative mx-auto w-full max-w-xl mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* Exam paths */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Choose your exam" title="Two paths, one clear plan" />
        <div className="grid gap-6 md:grid-cols-2">
          {(
            [
              {
                to: "/exams/nclex-rn",
                exam: EXAMS["nclex-rn"],
                img: nclexImg,
                alt: "Registered nurse reviewing notes on a tablet",
              },
              {
                to: "/exams/hesi-a2",
                exam: EXAMS["hesi-a2"],
                img: hesiImg,
                alt: "Nursing student studying with an anatomical lung model",
              },
            ] as const
          ).map(({ to, exam, img, alt }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-3xl border bg-card shadow-soft transition-all hover:shadow-lift"
            >
              <div className="overflow-hidden">
                <img
                  src={img}
                  alt={alt}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-7">
                <div>
                  <p className="eyebrow">{exam.tagline}</p>
                  <h3 className="mt-2 text-3xl">{exam.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {exam.description}
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free resources */}
      <section className="bg-band border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Free resources"
            title="Start studying today — free"
            intro="Four free ebooks and four free interactive apps. Download instantly through Gumroad, no account needed on this site."
            action={
              <Button asChild variant="soft">
                <Link to="/free-resources">See all free resources</Link>
              </Button>
            }
          />
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="size-4 text-sage-deep" /> Free ebooks
          </div>
          <ProductGrid>
            {ebooks.map((p, i) =>
              p ? (
                <ProductCard key={p.slug} product={p} />
              ) : (
                <SlotCard key={i} type="ebook" index={i} />
              ),
            )}
          </ProductGrid>
          <div className="mt-12 mb-5 flex items-center gap-2 text-sm font-semibold">
            <MonitorSmartphone className="size-4 text-sage-deep" /> Free Interactive Apps
          </div>
          <ProductGrid>
            {apps.map((p, i) =>
              p ? (
                <ProductCard key={p.slug} product={p} />
              ) : (
                <SlotCard key={i} type="interactive-app" index={i} />
              ),
            )}
          </ProductGrid>
        </div>
      </section>

      {/* Subjects */}
      <section className="container-page py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative order-2 lg:order-1">
            <img
              src={anatomyImg}
              alt="Realistic 3D model of the complete human anatomical systems"
              loading="lazy"
              width={1024}
              height={1280}
              className="mx-auto max-h-[560px] w-auto mix-blend-multiply"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Browse by subject"
              title="Every body system, organised the way you study"
              intro="Each subject brings together its free resources, premium products and a discounted bundle in one place."
            />
            {subjects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {subjects.map((s) => (
                  <Link
                    key={s.slug}
                    to="/subjects/$subject"
                    params={{ subject: s.slug }}
                    className="group flex items-center justify-between rounded-2xl border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-soft"
                  >
                    <span className="font-medium">{s.name}</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed bg-surface p-6 text-sm text-muted-foreground">
                The subject library is being finalised and will appear here soon.
              </div>
            )}
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/subjects">
                View all subjects <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium */}
      {featured.length > 0 && (
        <section className="container-page pb-20 md:pb-24">
          <SectionHeading
            eyebrow="Premium resources"
            title="Go deeper with premium review"
            action={
              <Button asChild variant="soft">
                <Link to="/premium">All premium resources</Link>
              </Button>
            }
          />
          <ProductGrid>
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ProductGrid>
        </section>
      )}

      {/* How it works + bundles */}
      <section className="bg-cta py-20 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Simple, transparent, no sign-up" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "Pick a subject or exam",
                text: "Find the free and premium resources that match what you’re studying.",
              },
              {
                icon: BookOpen,
                title: "Review what’s inside",
                text: "Every resource has a clear details page so you know exactly what you get.",
              },
              {
                icon: ShieldCheck,
                title: "Get it on Gumroad",
                text: "Free downloads and purchases are handled securely by Gumroad.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-3xl bg-card/80 p-7 shadow-soft backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-4xl text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          {bundles.length > 0 && (
            <div className="mt-16">
              <SectionHeading
                eyebrow="Educational bundles"
                title="Save with subject bundles"
                action={
                  <Button asChild variant="soft">
                    <Link to="/bundles">All bundles</Link>
                  </Button>
                }
              />
              <div className="grid gap-6 md:grid-cols-3">
                {bundles.map((b) => (
                  <BundleCard key={b.slug} bundle={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container-page py-20 md:py-24">
          <SectionHeading
            eyebrow="Testimonials"
            title="From nursing students"
            action={
              <Button asChild variant="soft">
                <Link to="/testimonials">Read more</Link>
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.id} className="rounded-3xl border bg-card p-7 shadow-soft">
                <blockquote className="font-display text-xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  {t.author}
                  {t.role && ` · ${t.role}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Blog */}
      {posts.length > 0 && (
        <section className="container-page py-20 md:py-24">
          <SectionHeading
            eyebrow="From the blog"
            title="Study guides & exam tips"
            action={
              <Button asChild variant="soft">
                <Link to="/blog">All articles</Link>
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$post"
                params={{ post: p.slug }}
                className="group rounded-3xl border bg-card p-7 shadow-soft"
              >
                <h3 className="text-2xl group-hover:text-primary">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="container-page pt-20 md:pt-24">
        <div className="relative overflow-hidden rounded-[2rem] border bg-hero px-8 py-16 text-center md:px-16">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl md:text-5xl">
            Your next study session starts with a free ebook.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/free-resources">
                Get Free Ebooks <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="soft" size="xl">
              <Link to="/subjects">Browse subjects</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
