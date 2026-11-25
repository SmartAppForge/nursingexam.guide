import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: seo({ title: "Cookie Policy", description: "How NursingExam.guide uses cookies." }),
  }),
  component: () => (
    <LegalPage title="Cookie Policy" intro="How this site uses cookies.">
      <h2>Current use</h2>
      <p>This site does not use accounts and does not set advertising cookies.</p>
      <h2>Gumroad</h2>
      <p>When you open a Gumroad link, Gumroad may set its own cookies under its own policies.</p>
    </LegalPage>
  ),
});
