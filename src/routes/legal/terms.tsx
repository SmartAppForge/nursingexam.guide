import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: seo({
      title: "Terms of Use",
      description: "Terms for using NursingExam.guide and its resources.",
    }),
  }),
  component: () => (
    <LegalPage title="Terms of Use" intro="The terms for using this site and its resources.">
      <h2>Educational use</h2>
      <p>
        Resources are provided for personal educational use. They do not replace official exam
        materials, coursework or clinical training.
      </p>
      <h2>Purchases</h2>
      <p>
        Purchases are processed by Gumroad and are also subject to{" "}
        <a href="https://gumroad.com/terms" target="_blank" rel="noopener noreferrer">
          Gumroad’s terms
        </a>
        .
      </p>
      <h2>Intellectual property</h2>
      <p>
        All resources remain the property of NursingExam.guide and may not be resold or
        redistributed.
      </p>
    </LegalPage>
  ),
});
