import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Layers, ShieldCheck } from "lucide-react";

import anatomyImg from "@/assets/anatomy-systems.jpg";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seo({
      title: "About NursingExam.guide",
      description:
        "Why NursingExam.guide exists: clear, well-organised nursing study resources for NCLEX-RN and HESI A2 preparation.",
    }),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Clear, trustworthy nursing study resources"
        intro="NursingExam.guide brings together free and premium resources for nursing students and healthcare professionals — organised by subject, focused on NCLEX-RN and HESI A2."
      />
      <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          {[
            {
              icon: BookOpen,
              title: "Free to start",
              text: "Four free ebooks and four free interactive apps so anyone can begin studying today.",
            },
            {
              icon: Layers,
              title: "Organised by subject",
              text: "Resources are grouped by subject and exam, so you can focus on exactly what you need to review.",
            },
            {
              icon: ShieldCheck,
              title: "Simple and private",
              text: "No accounts on this site. Downloads and purchases are handled securely by Gumroad.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5 rounded-3xl border bg-card p-6 shadow-soft">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-3xl border border-dashed bg-surface p-6 text-sm text-muted-foreground">
            Founder profile and credentials coming soon.
          </div>
          <Button asChild variant="hero" size="xl">
            <Link to="/free-resources">Explore free resources</Link>
          </Button>
        </div>
        <img
          src={anatomyImg}
          alt="Realistic 3D model of human anatomical systems"
          loading="lazy"
          width={1024}
          height={1280}
          className="mx-auto max-h-[620px] w-auto mix-blend-multiply"
        />
      </div>
    </>
  );
}
