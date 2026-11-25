import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo({
      title: "Contact NursingExam.guide",
      description:
        "Questions about a resource, a Gumroad download or a bundle? Get in touch with NursingExam.guide.",
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about a resource or bundle? We’re happy to help. For order or download issues, your Gumroad receipt also includes support options."
      />
      <div className="container-page py-16">
        <div className="mx-auto max-w-xl rounded-3xl border bg-card p-8 text-center shadow-soft">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
            <Mail className="size-5" />
          </span>
          {SITE.contactEmail ? (
            <>
              <p className="mt-5 font-display text-2xl">{SITE.contactEmail}</p>
              <Button asChild variant="hero" size="xl" className="mt-6">
                <a href={`mailto:${SITE.contactEmail}`}>Send an email</a>
              </Button>
            </>
          ) : (
            <p className="mt-5 text-muted-foreground">
              Our contact email will be published here shortly.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
