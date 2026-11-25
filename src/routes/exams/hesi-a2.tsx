import { createFileRoute } from "@tanstack/react-router";

import hesiImg from "@/assets/exam-hesi.jpg";
import { ExamHub } from "@/components/site/exam-hub";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/exams/hesi-a2")({
  head: () => ({
    meta: seo({
      title: "HESI A2 Study Resources",
      description:
        "Free and premium HESI A2 preparation resources for future nursing students, from anatomy to core academic skills.",
    }),
  }),
  component: () => (
    <ExamHub
      exam="hesi-a2"
      image={hesiImg}
      alt="Nursing student studying with an anatomical lung model"
    />
  ),
});
