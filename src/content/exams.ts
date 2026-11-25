import type { ExamId } from "./types";

export interface Exam {
  id: ExamId;
  name: string;
  tagline: string;
  description: string;
}

export const EXAMS: Record<ExamId, Exam> = {
  "nclex-rn": {
    id: "nclex-rn",
    name: "NCLEX-RN",
    tagline: "Licensure exam for registered nurses",
    description:
      "Focused review resources for the NCLEX-RN, organised by subject so you can study the areas that matter most for licensure.",
  },
  "hesi-a2": {
    id: "hesi-a2",
    name: "HESI A2",
    tagline: "Nursing school admission assessment",
    description:
      "Preparation resources for the HESI A2 admission assessment, from anatomy and physiology to core academic skills.",
  },
};

export const EXAM_LIST = Object.values(EXAMS);
