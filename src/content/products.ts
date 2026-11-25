import type { Product } from "./types";

/**
 * Source of truth: owner's workbook.
 * Free items: exactly 4 ebooks (type "ebook", access "free") and
 * exactly 4 Interactive Reactive Apps (type "interactive-app", access "free").
 */
type ExamId = "nclex-rn" | "hesi-a2";

interface FreeSpec {
  id: string;
  name: string;
  type: "ebook" | "interactive-app";
  gumroadUrl: string;
  imageUrl: string;
  exams?: ExamId[];
}

interface PaidSpec {
  id: string;
  name: string;
  subject: string;
  appUrl?: string;
  ebookUrl?: string;
  bundleUrl?: string;
  imageUrl: string;
  exams?: ExamId[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const driveImage = (url: string) => {
  const id = url.match(/\/d\/([^/]+)/)?.[1];
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200` : undefined;
};

const freeSpecs: FreeSpec[] = [
  {
    id: "PRODUCT_001",
    name: "NCLEX-RN Exam Practice Questions",
    type: "interactive-app",
    gumroadUrl: "https://ebookservice.gumroad.com/l/sayyzs",
    imageUrl: "https://drive.google.com/file/d/1smNq7ZcY0iL1fV3mBmiF1BTXS/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_002",
    name: "HESI A2 Assessment Exam Practice Questions",
    type: "interactive-app",
    gumroadUrl: "https://ebookservice.gumroad.com/l/muaywm",
    imageUrl:
      "https://drive.google.com/file/d/1Mhet694iGxI67bXUQi-klnggJaDsvfyJ/view?usp=drive_link",
    exams: ["hesi-a2"],
  },
  {
    id: "PRODUCT_003",
    name: "Mental Health Disorders Exam Practice Questions",
    type: "interactive-app",
    gumroadUrl: "https://ebookservice.gumroad.com/l/wtsvwo",
    imageUrl:
      "https://drive.google.com/file/d/1QridxlRT0iZxF0RtpOprJMYFyCjICX_A/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_004",
    name: "Fundamental of Nursing Exam Practice Questions",
    type: "interactive-app",
    gumroadUrl: "https://ebookservice.gumroad.com/l/kfljk",
    imageUrl:
      "https://drive.google.com/file/d/1Y27wlDKbdDcG4XAafrTSWO1G_3SfjAcZ/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_005",
    name: "Hematology NCLEX Questions and Answers",
    type: "ebook",
    gumroadUrl: "https://ebookservice.gumroad.com/l/wpoesr",
    imageUrl:
      "https://drive.google.com/file/d/1CSf8y666fog-mcdiOGW1kzsaot2i_heo/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_006",
    name: "Pharmacology Study Guide",
    type: "ebook",
    gumroadUrl: "https://ebookservice.gumroad.com/l/craxuh",
    imageUrl:
      "https://drive.google.com/file/d/1iJ3X8CnlwODwUCOhGiaLMysCiE_seKch/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_007",
    name: "Mental Health Test Prototype",
    type: "ebook",
    gumroadUrl: "https://ebookservice.gumroad.com/l/lxsxhf",
    imageUrl:
      "https://drive.google.com/file/d/1mfxfxke1ehbMUJzrx8SL6kC13skKywXo/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_008",
    name: "NCLEX-RN Practice Questions Prototype",
    type: "ebook",
    gumroadUrl: "https://ebookservice.gumroad.com/l/sbeikv",
    imageUrl:
      "https://drive.google.com/file/d/1EPXEiKCGTZ04la0nsdK_3Dpmv2HyAcbH/view?usp=drive_link",
    exams: ["nclex-rn"],
  },
];

const paidSpecs: PaidSpec[] = [
  {
    id: "PRODUCT_009",
    name: "Anatomy and Physiology",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/tqsxaf",
    ebookUrl: "https://ebookservice.gumroad.com/l/iwcntv",
    bundleUrl: "https://ebookservice.gumroad.com/l/retzdm",
    imageUrl:
      "https://drive.google.com/file/d/1jmdEPvaE7XvPjb4VG2ELc8j_UOteeXbL/view?usp=drive_link",
  },
  {
    id: "PRODUCT_010",
    name: "Fundamental of Nursing",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/mpyypd",
    ebookUrl: "https://ebookservice.gumroad.com/l/orqisl",
    bundleUrl: "https://ebookservice.gumroad.com/l/jbbgzd",
    imageUrl:
      "https://drive.google.com/file/d/1od26EzrNoUJ2UONykmZuQbElOCyTKCzZ/view?usp=drive_link",
  },
  {
    id: "PRODUCT_011",
    name: "Maternity Nursing",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/aeotnh",
    ebookUrl: "https://ebookservice.gumroad.com/l/uszqc",
    bundleUrl: "https://ebookservice.gumroad.com/l/uzbncf",
    imageUrl: "https://drive.google.com/file/d/18xR6MK1BXy66E6PWMFcvORtOIlzRSCl2/view?usp=sharing",
  },
  {
    id: "PRODUCT_012",
    name: "Dosage Calculation Project",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/ttsqti",
    ebookUrl: "https://ebookservice.gumroad.com/l/ikhbp",
    bundleUrl: "https://ebookservice.gumroad.com/l/uzbncf",
    imageUrl: "https://drive.google.com/file/d/1EJZVPnsvv3f6uaK3E_rF12ii26GmvLj2/view?usp=sharing",
  },
  {
    id: "PRODUCT_013",
    name: "Head To Toe Assessment Project",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/rjhwl",
    ebookUrl: "https://ebookservice.gumroad.com/l/colwi",
    bundleUrl: "https://ebookservice.gumroad.com/l/hklxuj",
    imageUrl:
      "https://drive.google.com/file/d/1DNmVOyYCeoQGNAf1GaOXjmcBh7qkdr99/view?usp=drive_link",
  },
  {
    id: "PRODUCT_014",
    name: "Microbiology Note",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/snlnob",
    ebookUrl: "https://ebookservice.gumroad.com/l/yksfyg",
    bundleUrl: "https://ebookservice.gumroad.com/l/kkbzgs",
    imageUrl:
      "https://drive.google.com/file/d/1IWRgDUWdJvwC2yjGMIi_87WT9P9h5vRZ/view?usp=drive_link",
  },
  {
    id: "PRODUCT_015",
    name: "Pathophysiology",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/thwvev",
    ebookUrl: "https://ebookservice.gumroad.com/l/kkbzgs",
    bundleUrl: "https://ebookservice.gumroad.com/l/kkbzgs",
    imageUrl:
      "https://drive.google.com/file/d/1ThHWwveTR6TZEo3jP8kt4zTZuZV8xn_K/view?usp=drive_link",
  },
  {
    id: "PRODUCT_016",
    name: "Pediatrics",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/lmfpoc",
    ebookUrl: "https://ebookservice.gumroad.com/l/cewdy",
    bundleUrl: "https://ebookservice.gumroad.com/l/agelfi",
    imageUrl:
      "https://drive.google.com/file/d/1AhU8xCzv2X8jK66qfeAE1FMMU41EUWHO/view?usp=drive_link",
  },
  {
    id: "PRODUCT_017",
    name: "Pharmacology",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/rudfrw",
    ebookUrl: "https://ebookservice.gumroad.com/l/cewdy",
    bundleUrl: "https://ebookservice.gumroad.com/l/agelfi",
    imageUrl:
      "https://drive.google.com/file/d/1CvwF5z6mbfpcdPmg5XreKGsoUOdn15NN/view?usp=drive_link",
  },
  {
    id: "PRODUCT_018",
    name: "Nursing Assessment",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/okrtze",
    imageUrl:
      "https://drive.google.com/file/d/13B_20PuY2NSOARztlNyRvGNtKH7Zt_Mz/view?usp=drive_link",
  },
  {
    id: "PRODUCT_019",
    name: "Nursing Fundamentals",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/oqdqqg",
    imageUrl:
      "https://drive.google.com/file/d/1LKxLk9o-BxJxZixa_xFgeYJKjwVmrrtb/view?usp=drive_link",
  },
  {
    id: "PRODUCT_020",
    name: "Fluid & Acid-Base Balance",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/vuwhem",
    imageUrl:
      "https://drive.google.com/file/d/1sx1lLnq_DhsYhps2nyCvFSmAxZXkNDCv/view?usp=drive_link",
  },
  {
    id: "PRODUCT_021",
    name: "Infection Control & Prevention",
    subject: "nursing-core",
    appUrl: "https://ebookservice.gumroad.com/l/krief",
    imageUrl:
      "https://drive.google.com/file/d/1VOAggX5SGzRbwE2XTyFu5ektFH9zvb5U/view?usp=drive_link",
  },
  {
    id: "PRODUCT_022",
    name: "ABG_s Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/dnhcll",
    ebookUrl: "https://ebookservice.gumroad.com/l/otjnbt",
    bundleUrl: "https://ebookservice.gumroad.com/l/kqsam",
    imageUrl:
      "https://drive.google.com/file/d/1T63Xg9DiqBYTufP32hQRbGVSeCELBU6K/view?usp=drive_link",
  },
  {
    id: "PRODUCT_023",
    name: "Cardiovascular Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/uqbvca",
    ebookUrl: "https://ebookservice.gumroad.com/l/dwamx",
    bundleUrl: "https://ebookservice.gumroad.com/l/duwvep",
    imageUrl:
      "https://drive.google.com/file/d/1LKDnmmx2IC34TEMvRHq4DwP3K8LOP6c6/view?usp=drive_link",
  },
  {
    id: "PRODUCT_024",
    name: "Critical Care",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/dilxtb",
    ebookUrl: "https://ebookservice.gumroad.com/l/tisaqk",
    bundleUrl: "https://ebookservice.gumroad.com/l/nsumozj",
    imageUrl:
      "https://drive.google.com/file/d/1Mq4cAwpwEZg54VX1d6XsyZft_IZ-E7bx/view?usp=drive_link",
  },
  {
    id: "PRODUCT_025",
    name: "Electrolyte Imbalances",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/grrqfn",
    ebookUrl: "https://ebookservice.gumroad.com/l/yghwg",
    bundleUrl: "https://ebookservice.gumroad.com/l/phfipf",
    imageUrl:
      "https://drive.google.com/file/d/18PD0hS7VJt0QfXleZ8jodHH5H2I7pMt5/view?usp=drive_link",
  },
  {
    id: "PRODUCT_026",
    name: "Endocrine Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/efipal",
    ebookUrl: "https://ebookservice.gumroad.com/l/eakvrx",
    bundleUrl: "https://ebookservice.gumroad.com/l/ddtqv",
    imageUrl:
      "https://drive.google.com/file/d/1Ki2AgSCXP2W0bkd5M5hWrrXbG24srn_3/view?usp=drive_link",
  },
  {
    id: "PRODUCT_027",
    name: "Gastrointestinal Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/mtiejz",
    ebookUrl: "https://ebookservice.gumroad.com/l/ueyuux",
    bundleUrl: "https://ebookservice.gumroad.com/l/ueyuux",
    imageUrl:
      "https://drive.google.com/file/d/1R-1EUo5YrBBWec4MuLJneTAzfzF9AWET/view?usp=drive_link",
  },
  {
    id: "PRODUCT_028",
    name: "Hematology Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/nwsgee",
    ebookUrl: "https://ebookservice.gumroad.com/l/nfwivp",
    bundleUrl: "https://ebookservice.gumroad.com/l/opfxon",
    imageUrl:
      "https://drive.google.com/file/d/16SGo9VC_ekn01EB62ssFuqtg5U-B6K3P/view?usp=drive_link",
  },
  {
    id: "PRODUCT_029",
    name: "Mental Health Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/iqxlnj",
    ebookUrl: "https://ebookservice.gumroad.com/l/hxydm",
    bundleUrl: "https://ebookservice.gumroad.com/l/lkhdhr",
    imageUrl:
      "https://drive.google.com/file/d/1hYOVXf2m8RpPoxUg12YL38XN3HWJV82E/view?usp=drive_link",
  },
  {
    id: "PRODUCT_030",
    name: "Musculoskeletal Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/uxkvfh",
    ebookUrl: "https://ebookservice.gumroad.com/l/zakehd",
    bundleUrl: "https://ebookservice.gumroad.com/l/lzwol",
    imageUrl:
      "https://drive.google.com/file/d/1mbr-wIWN7L6U8Zr20kH4DJd5eQmDJgBm/view?usp=drive_link",
  },
  {
    id: "PRODUCT_031",
    name: "Neurology Study Guide",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/rrofws",
    ebookUrl: "https://ebookservice.gumroad.com/l/iykpqd",
    bundleUrl: "https://ebookservice.gumroad.com/l/fpbdbz",
    imageUrl:
      "https://drive.google.com/file/d/1Kv_Meo_HqFews2GNIxE1DUoLwfD45chA/view?usp=drive_link",
  },
  {
    id: "PRODUCT_032",
    name: "Renal_Urinary Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/rcjphr",
    ebookUrl: "https://ebookservice.gumroad.com/l/yghwg",
    bundleUrl: "https://ebookservice.gumroad.com/l/uuguuz",
    imageUrl:
      "https://drive.google.com/file/d/1csqumhDtvJRiNw2MrKD72UBxJSOYYADG/view?usp=drive_link",
  },
  {
    id: "PRODUCT_033",
    name: "Respiratory System Disorders",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/onouwg",
    ebookUrl: "https://ebookservice.gumroad.com/l/eiahaa",
    bundleUrl: "https://ebookservice.gumroad.com/l/eiahaa",
    imageUrl:
      "https://drive.google.com/file/d/1_jbx1q3oc1vD9rpoTZFCCfoY6CjsW6vj/view?usp=drive_link",
  },
  {
    id: "PRODUCT_034",
    name: "Medical-Surgical Nursing",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/adjmpc",
    imageUrl:
      "https://drive.google.com/file/d/1qF42A9KKJGz_NzwTvq23y37geuk95k2k/view?usp=drive_link",
  },
  {
    id: "PRODUCT_035",
    name: "Gerontological Nursing",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/mgoqc",
    imageUrl:
      "https://drive.google.com/file/d/1Gg4Trq-F-8bMF7OQwozIYfsfOiVJm9nK/view?usp=drive_link",
  },
  {
    id: "PRODUCT_036",
    name: "Oncology Nursing",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/wiaiwr",
    imageUrl:
      "https://drive.google.com/file/d/1jeQ6jlVeZhT7Mj_MpX_9LbamG8MDpSkv/view?usp=drive_link",
  },
  {
    id: "PRODUCT_037",
    name: "Wound Care & Skin Integrity",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/zyaipt",
    imageUrl:
      "https://drive.google.com/file/d/1DenyZvOT9892kl2YI8L3dtKbx42w1QZc/view?usp=drive_link",
  },
  {
    id: "PRODUCT_038",
    name: "Emergency & Disaster Nursing",
    subject: "nursing-specialties",
    appUrl: "https://ebookservice.gumroad.com/l/P7hYgHoNh3Ohi7fYDFFRwqQbeezIgFI8",
    imageUrl: "https://drive.google.com/file/d/1P7hYgHoNh3Ohi7fYDFFRwqQbeezIgFI8/view?usp=sharing",
  },
  {
    id: "PRODUCT_039",
    name: "NCLEX-RN Practice Questions",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/wizck",
    ebookUrl: "https://ebookservice.gumroad.com/l/gmxzqb",
    bundleUrl: "https://ebookservice.gumroad.com/l/tqmepv",
    imageUrl: "https://drive.google.com/file/d/1lCeudwz8VSPiHwjDErD4RTdACMiMVvQN/view",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_040",
    name: "HESI A2",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/htapfa",
    ebookUrl: "https://ebookservice.gumroad.com/l/gbanmv",
    bundleUrl: "https://ebookservice.gumroad.com/l/nzybjj",
    imageUrl: "https://drive.google.com/file/d/1Cybkkxg6JKaoucGwLx2Vb_edIxBrhhh1/view",
    exams: ["hesi-a2"],
  },
  {
    id: "PRODUCT_041",
    name: "HESI Nursing",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/sfctt",
    ebookUrl: "https://ebookservice.gumroad.com/l/hbgshy",
    bundleUrl: "https://ebookservice.gumroad.com/l/zjqys",
    imageUrl: "https://drive.google.com/file/d/1W9-r7xOBBwt7o1n2FchrwlpZFIXp4EwN/view?usp=sharing",
    exams: ["hesi-a2"],
  },
  {
    id: "PRODUCT_042",
    name: "NCLEX Pharmacology",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/yvogpw",
    ebookUrl: "https://ebookservice.gumroad.com/l/eknkz",
    bundleUrl: "https://ebookservice.gumroad.com/l/gxgnk",
    imageUrl: "https://drive.google.com/file/d/1uqlv0kNHMC80hVH2okQMk4YE-_yjC5vJ/view?usp=sharing",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_043",
    name: "NCLEX Prioritization & Delegation",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/qrsapf",
    ebookUrl: "https://ebookservice.gumroad.com/l/bunabe",
    bundleUrl: "https://ebookservice.gumroad.com/l/foixg",
    imageUrl: "https://drive.google.com/file/d/1Cw8-IWz2GFizzYKrQtPFTkss9D2pUk9C/view?usp=sharing",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_044",
    name: "NCLEX Clinical Judgment",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/rciin",
    ebookUrl: "https://ebookservice.gumroad.com/l/xjqnx",
    bundleUrl: "https://ebookservice.gumroad.com/l/oresj",
    imageUrl: "https://drive.google.com/file/d/1R-6bhxO9QI8Qdc1LAs3-5hSA1_E-afRh/view?usp=sharing",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_045",
    name: "NCLEX NGN Case Studies",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/mxfywg",
    imageUrl: "https://drive.google.com/file/d/1ccPx0G4O8Ypv7Tr0sZsBuiUoCwk3EtJU/view?usp=sharing",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_046",
    name: "NCLEX Comprehensive Practice",
    subject: "nclex-exam-prep",
    appUrl: "https://ebookservice.gumroad.com/l/ielutq",
    imageUrl: "https://drive.google.com/file/d/1u03Z28kI9eo8-vssIT9JSdJTAMzVg-vV/view",
    exams: ["nclex-rn"],
  },
  {
    id: "PRODUCT_047",
    name: "Nursing Leadership & Management",
    subject: "professional-nursing",
    appUrl: "https://ebookservice.gumroad.com/l/mxgsth",
    imageUrl:
      "https://drive.google.com/file/d/1u0kdJ8lCi4lCP8FW7CylBUm8shyaEPbt/view?usp=drive_link",
  },
  {
    id: "PRODUCT_048",
    name: "Nursing Ethics, Legal & Professional Practice",
    subject: "professional-nursing",
    appUrl: "https://ebookservice.gumroad.com/l/ryndgv",
    imageUrl:
      "https://drive.google.com/file/d/1-ebTaDqnVt2PAFWZsEyI5Fg6g3fyWLwF/view?usp=drive_link",
  },
  {
    id: "PRODUCT_049",
    name: "Nursing Research & Evidence-Based Practice",
    subject: "professional-nursing",
    appUrl: "https://ebookservice.gumroad.com/l/fehxwy",
    imageUrl:
      "https://drive.google.com/file/d/18LPL5o3Az0Yl-jM4kzRYP72PNAooiqTu/view?usp=drive_link",
  },
  {
    id: "PRODUCT_050",
    name: "Community & Public Health Nursing",
    subject: "professional-nursing",
    appUrl: "https://ebookservice.gumroad.com/l/witqqp",
    imageUrl:
      "https://drive.google.com/file/d/1KUONYvjP5F4wiYTES0bfC0dNq_PmcbE7/view?usp=drive_link",
  },
  {
    id: "PRODUCT_051",
    name: "Nursing Communication & Therapeutic Communication",
    subject: "professional-nursing",
    appUrl: "https://ebookservice.gumroad.com/l/diwkgb",
    imageUrl:
      "https://drive.google.com/file/d/1WPAPqzoVVM8NPrDhqH8wFcdWtk3y9iSc/view?usp=drive_link",
  },
];

const freeProducts: Product[] = freeSpecs.map((item) => ({
  slug: `${slugify(item.name)}-${item.type === "ebook" ? "ebook" : "app"}`,
  name: item.name,
  type: item.type,
  access: "free",
  gumroadUrl: item.gumroadUrl,
  subjects: [
    item.id === "PRODUCT_001" ||
    item.id === "PRODUCT_002" ||
    item.id === "PRODUCT_003" ||
    item.id === "PRODUCT_004"
      ? "free-exam-practice"
      : "nclex-exam-prep",
  ],
  exams: item.exams ?? [],
  shortDescription: item.name,
  description: item.name,
  whatsInside: [],
  coverImage: driveImage(item.imageUrl),
  featured: item.type === "interactive-app",
  sortOrder: Number(item.id.slice(-3)),
  status: "published",
}));

const paidProducts: Product[] = paidSpecs.flatMap((item) => {
  const baseSlug = slugify(item.name);
  const coverImage = driveImage(item.imageUrl);
  const products: Product[] = [];
  if (item.appUrl) {
    products.push({
      slug: `${baseSlug}-app`,
      name: item.name,
      type: "interactive-app",
      access: "paid",
      price: 9.98,
      currency: "USD",
      gumroadUrl: item.appUrl,
      subjects: [item.subject],
      exams: item.exams ?? [],
      shortDescription: `${item.name} interactive nursing resource`,
      description: `${item.name} study resource.`,
      whatsInside: [],
      coverImage,
      featured: item.id === "PRODUCT_009" || item.id === "PRODUCT_039",
      sortOrder: Number(item.id.slice(-3)),
      status: "published",
    });
  }
  if (item.ebookUrl) {
    products.push({
      slug: `${baseSlug}-ebook`,
      name: `${item.name} Ebook`,
      type: "ebook",
      access: "paid",
      price: 9.98,
      currency: "USD",
      gumroadUrl: item.ebookUrl,
      subjects: [item.subject],
      exams: item.exams ?? [],
      shortDescription: `${item.name} ebook`,
      description: `${item.name} ebook study resource.`,
      whatsInside: [],
      coverImage,
      featured: false,
      sortOrder: Number(item.id.slice(-3)) + 0.1,
      status: "published",
    });
  }
  return products;
});

export const products: Product[] = [...freeProducts, ...paidProducts];
