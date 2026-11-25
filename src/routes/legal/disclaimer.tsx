import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal/disclaimer")({
  head: () => ({
    meta: seo({
      title: "Disclaimer",
      description: "Medical, educational and trademark disclaimer for NursingExam.guide.",
    }),
  }),
  component: () => (
    <LegalPage title="Disclaimer" intro="Medical, educational and trademark notices.">
      <h2>Educational content only</h2>
      <p>
        Content on this site is for educational purposes only and is not medical advice. Always
        follow current clinical guidelines, your institution’s policies and the instructions of
        qualified professionals.
      </p>
      <h2>No guarantee of exam results</h2>
      <p>Our resources support your preparation but cannot guarantee any exam outcome.</p>
      <h2>Trademarks</h2>
      <p>
        <strong>NCLEX-RN®</strong> is a registered trademark of the National Council of State Boards
        of Nursing, Inc. (NCSBN). <strong>HESI®</strong> is a registered trademark of Elsevier.
        Neither organisation is affiliated with, sponsors or endorses NursingExam.guide.
      </p>
    </LegalPage>
  ),
});
