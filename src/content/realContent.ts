import campusImg from "@/assets/jkkn-campus.jpg";
import founderImg from "@/assets/jkkn-founder.jpg";
import jkknLogo from "@/assets/jkkn-logo.svg";

import instDental from "@/assets/jkkn/institution-dental.jpg";
import instEngg from "@/assets/jkkn/institution-engg.jpg";
import instPharmacy from "@/assets/jkkn/institution-pharmacy.jpg";

export const REAL_CONTENT = {
  WEBSITE_NAME: "JKKN Institutions",
  TAGLINE: "AI Empowered Campus",

  LOGO_IMAGE_SRC: jkknLogo,
  LOGO_IMAGE_ALT: "JKKN Institutions",

  HERO_TITLE: "India’s First AI-Integrated Campus",
  HERO_SUBTITLE: "Empowering learners with future-ready education, innovation, and industry connection.",
  CTA_TEXT_1: "ONLINE ADMISSIONS 2026-27",
  CTA_TEXT_2: "Explore Programs",

  NAV_MENU_LABELS: ["Home", "About", "Our Colleges", "Our Schools", "Courses Offered", "Facilities", "Contact"],
  NAV_MORE_LABELS: ["News & Events", "Careers", "Gallery"],
  NAV_MORE_TRIGGER: "More",

  HERO_IMAGE_SRC: campusImg,
  EVENT_IMAGE_SRC_1: instDental,
  EVENT_IMAGE_SRC_2: founderImg,
  EVENT_IMAGE_SRC_3: instEngg,

  EVENT_TITLE_1: "Industry Connect – AI & Process Consulting",
  EVENT_TITLE_2: "Campus Recruitment Drive",
  EVENT_TITLE_3: "LinkedIn Live Webinar",

  SECTION_TEXT_CONTENT:
    "This is sample real content for preview. Replace via your injection system without changing layout.",

  CONTACT_EMAIL: "info@jkkn.ac.in",
  CONTACT_PHONE: "+91 93458 55001",
  ADDRESS: "JKKN Campus, Kumarapalayam, Erode, Tamil Nadu",
} as const;
