import type { Subject } from "./types";

/** Source of truth: owner's workbook. */
export const subjects: Subject[] = [
  {
    slug: "free-exam-practice",
    name: "Free Exam Practice",
    description: "Free nursing exam practice resources.",
    sortOrder: 1,
  },
  {
    slug: "nursing-core",
    name: "Nursing Core",
    description: "Core nursing knowledge, skills and study resources.",
    sortOrder: 2,
  },
  {
    slug: "nursing-specialties",
    name: "Nursing Specialties",
    description: "Specialty nursing resources for clinical and exam preparation.",
    sortOrder: 3,
  },
  {
    slug: "nclex-exam-prep",
    name: "NCLEX & Exam Prep",
    description: "NCLEX-RN and HESI preparation resources.",
    sortOrder: 4,
  },
  {
    slug: "professional-nursing",
    name: "Professional Nursing",
    description: "Professional practice, leadership, ethics and public health resources.",
    sortOrder: 5,
  },
];
