import { createFileRoute } from "@tanstack/react-router";

import { EmptyState, PageHeader } from "@/components/site/page-header";
import { EXAMS } from "@/content/exams";
import { testimonials } from "@/content/testimonials";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: seo({
      title: "Student Testimonials",
      description:
        "What nursing students say about NursingExam.guide resources for NCLEX-RN and HESI A2 preparation.",
    }),
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="From nursing students"
        intro="Real feedback from students who studied with our resources."
      />
      <div className="container-page py-16">
        {testimonials.length === 0 ? (
          <EmptyState title="Testimonials coming soon">
            Verified student testimonials will be published here.
          </EmptyState>
        ) : (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="mb-6 break-inside-avoid rounded-3xl border bg-card p-7 shadow-soft"
              >
                <blockquote className="font-display text-xl leading-snug">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  {t.author}
                  {t.role && ` · ${t.role}`}
                  {t.exam && ` · ${EXAMS[t.exam].name}`}
                </figcaption>

                {/* YouTube Shorts embed responsive */}
                {t.videoUrl && (
                  <div className="responsive-youtube-wrapper mt-4">
                    <iframe
                      width="100%"
                      height="280"
                      src={t.videoUrl}
                      title={`Testimonial video: ${t.author}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
