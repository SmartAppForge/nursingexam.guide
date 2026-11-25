import { createFileRoute } from "@tanstack/react-router";

import nclexImg from "@/assets/exam-nclex.jpg";
import { ExamHub } from "@/components/site/exam-hub";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/exams/nclex-rn")({
  head: () => ({
    meta: seo({
      title: "NCLEX-RN Study Resources",
      description:
        "Free and premium NCLEX-RN review resources for nursing students preparing for licensure, organised by subject.",
    }),
  }),
  component: () => (
    <ExamHub exam="nclex-rn" image={nclexImg} alt="Registered nurse reviewing notes on a tablet" />
  ),
});
