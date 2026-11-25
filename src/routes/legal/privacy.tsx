import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: seo({
      title: "Privacy Policy",
      description: "How NursingExam.guide handles your information.",
    }),
  }),
  component: () => (
    <LegalPage title="Privacy Policy" intro="How this site handles your information.">
      <h2>No accounts on this site</h2>
      <p>
        NursingExam.guide does not offer user accounts, logins or student profiles, and does not
        store payment details.
      </p>
      <h2>Purchases and downloads</h2>
      <p>
        All free downloads and purchases are completed on Gumroad. Information you provide there is
        handled under{" "}
        <a href="https://gumroad.com/privacy" target="_blank" rel="noopener noreferrer">
          Gumroad’s privacy policy
        </a>
        .
      </p>
      <h2>Contact</h2>
      <p>If you email us, we use your message only to respond to you.</p>
    </LegalPage>
  ),
});
