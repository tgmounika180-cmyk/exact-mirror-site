import type { ReactNode } from "react";

import recruiterTcs from "@/assets/jkkn/recruiter-tcs.png";
import recruiterInfosys from "@/assets/jkkn/recruiter-infosys.png";
import recruiterWipro from "@/assets/jkkn/recruiter-wipro.jpg";
import recruiterCognizant from "@/assets/jkkn/recruiter-cognizant.jpg";
import recruiterHcl from "@/assets/jkkn/recruiter-hcl.png";

function MarqueeTrack({ children }: { children: ReactNode }) {
  return <div className="flex min-w-full items-center gap-10 px-6">{children}</div>;
}

export function PartnersMarquee() {
  const logos = [
    { id: "tcs", src: recruiterTcs, alt: "TCS" },
    { id: "infosys", src: recruiterInfosys, alt: "Infosys" },
    { id: "wipro", src: recruiterWipro, alt: "Wipro" },
    { id: "cognizant", src: recruiterCognizant, alt: "Cognizant" },
    { id: "hcl", src: recruiterHcl, alt: "HCL" },
  ];

  return (
    <section className="bg-muted">
      <div className="container py-12">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground">Trusted Partners</p>
          <h2 className="text-2xl font-bold tracking-tight">Our College Recruiters</h2>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-background">
          <div className="flex w-[200%] animate-marquee">
            <MarqueeTrack>
              {logos.map((l) => (
                <div key={l.id} className="flex h-16 w-40 items-center justify-center rounded-md border bg-card">
                  <img src={l.src} alt={l.alt} className="h-10 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </MarqueeTrack>
            <MarqueeTrack>
              {logos.map((l) => (
                <div key={`dup-${l.id}`} className="flex h-16 w-40 items-center justify-center rounded-md border bg-card">
                  <img src={l.src} alt={l.alt} className="h-10 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </MarqueeTrack>
          </div>
        </div>
      </div>
    </section>
  );
}
