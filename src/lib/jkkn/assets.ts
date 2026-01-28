import campusImg from "@/assets/jkkn-campus.jpg";
import founderImg from "@/assets/jkkn-founder.jpg";

import instDental from "@/assets/jkkn/institution-dental.jpg";
import instEngg from "@/assets/jkkn/institution-engg.jpg";
import instPharmacy from "@/assets/jkkn/institution-pharmacy.jpg";
import instAhs from "@/assets/jkkn/institution-ahs.jpg";
import instCas from "@/assets/jkkn/institution-cas.jpg";
import instEducation from "@/assets/jkkn/institution-education.jpg";
import instSchool from "@/assets/jkkn/institution-school.jpg";

import news1 from "@/assets/jkkn/news-1.png";
import news2 from "@/assets/jkkn/news-2.jpg";
import news3 from "@/assets/jkkn/news-3.jpeg";

import buzz1 from "@/assets/jkkn/buzz-1.jpg";
import buzz2 from "@/assets/jkkn/buzz-2.jpg";
import buzz3 from "@/assets/jkkn/buzz-3.jpg";

import recruiterTcs from "@/assets/jkkn/recruiter-tcs.png";
import recruiterInfosys from "@/assets/jkkn/recruiter-infosys.png";
import recruiterWipro from "@/assets/jkkn/recruiter-wipro.jpg";
import recruiterCognizant from "@/assets/jkkn/recruiter-cognizant.jpg";
import recruiterHcl from "@/assets/jkkn/recruiter-hcl.png";

export const JKKN_ASSETS = {
  campus: campusImg,
  founder: founderImg,
  instDental,
  instEngg,
  instPharmacy,
  instAhs,
  instCas,
  instEducation,
  instSchool,
  news1,
  news2,
  news3,
  buzz1,
  buzz2,
  buzz3,
  tcs: recruiterTcs,
  infosys: recruiterInfosys,
  wipro: recruiterWipro,
  cognizant: recruiterCognizant,
  hcl: recruiterHcl,
} as const;

export type JkknAssetKey = keyof typeof JKKN_ASSETS;
