import type { ReactNode } from "react";

import { JKKN_ASSETS } from "@/lib/jkkn/assets";

export type PartnerLogo = { id: string; name: string; imageKey: string };

function MarqueeTrack({ children }: { children: ReactNode }) {
  return <div className="flex min-w-full items-center gap-10 px-6">{children}</div>;
}

export function PartnersMarquee({ logos }: { logos?: PartnerLogo[] }) {
  const fallback = [
    { id: "tcs", name: "TCS", imageKey: "tcs" },
    { id: "infosys", name: "Infosys", imageKey: "infosys" },
    { id: "wipro", name: "Wipro", imageKey: "wipro" },
    { id: "cognizant", name: "Cognizant", imageKey: "cognizant" },
    { id: "hcl", name: "HCL", imageKey: "hcl" },
  ] satisfies PartnerLogo[];

  const resolved = (logos?.length ? logos : fallback).map((l) => ({
    id: l.id,
    alt: l.name,
    src: (JKKN_ASSETS as Record<string, string>)[l.imageKey] ?? JKKN_ASSETS.tcs,
  }));

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
              {resolved.map((l) => (
                <div key={l.id} className="flex h-16 w-40 items-center justify-center rounded-md border bg-card">
                  <img src={l.src} alt={l.alt} className="h-10 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </MarqueeTrack>
            <MarqueeTrack>
              {resolved.map((l) => (
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
