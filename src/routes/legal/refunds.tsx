import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal/refunds")({
  head: () => ({
    meta: seo({
      title: "Refund Policy",
      description: "Refund information for NursingExam.guide purchases made via Gumroad.",
    }),
  }),
  component: () => (
    <LegalPage title="Refund Policy" intro="Refund information for premium resources and bundles.">
      <h2>Where purchases happen</h2>
      <p>
        All purchases are made through Gumroad. Refund requests are handled through your Gumroad
        receipt.
      </p>
      <h2>Refund terms</h2>
      <p>Final refund terms for each product are shown on its Gumroad page.</p>
    </LegalPage>
  ),
});
