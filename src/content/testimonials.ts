import type { Testimonial } from "./types";

/** Only real testimonials published with the student's permission. */
export interface TestimonialWithVideo extends Testimonial {
  videoUrl?: string;
}

export const testimonials: TestimonialWithVideo[] = [
  {
    id: "testimonial-1",
    quote:
      "These resources helped me pass my NCLEX-RN exam on the first try. The organization by subject made studying so much more efficient.",
    author: "Sarah J.",
    videoUrl: "https://www.youtube.com/embed/Zw-GWQ5Xjf0",
  },
  {
    id: "testimonial-2",
    quote:
      "The HESI A2 practice questions were exactly what I needed to feel prepared for the admission assessment.",
    author: "Marcus K.",
    videoUrl: "https://www.youtube.com/embed/2HIiLTAtBlU",
  },
  {
    id: "testimonial-3",
    quote:
      "I love how accessible the free ebooks are. No account needed, just instant download and studying.",
    author: "Priya R.",
    videoUrl: "https://www.youtube.com/embed/K5A-aKohmfo",
  },
  {
    id: "testimonial-4",
    quote:
      "The video breakdown of each body system gave me the confidence I needed for my nursing fundamentals class.",
    author: "Tom W.",
    videoUrl: "https://www.youtube.com/embed/mf_VQO9SOvk",
  },
];
