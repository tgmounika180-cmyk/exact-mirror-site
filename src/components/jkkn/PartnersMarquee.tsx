import type { ReactNode } from "react";

function MarqueeTrack({ children }: { children: ReactNode }) {
  return <div className="flex min-w-full items-center gap-10 px-6">{children}</div>;
}

export function PartnersMarquee() {
  // Neutral placeholders to preserve the structure.
  const logos = Array.from({ length: 10 }).map((_, i) => ({ id: i, label: `Partner ${i + 1}` }));

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
                <div
                  key={l.id}
                  className="flex h-16 w-40 items-center justify-center rounded-md border bg-card text-sm font-semibold text-card-foreground"
                >
                  {l.label}
                </div>
              ))}
            </MarqueeTrack>
            <MarqueeTrack>
              {logos.map((l) => (
                <div
                  key={`dup-${l.id}`}
                  className="flex h-16 w-40 items-center justify-center rounded-md border bg-card text-sm font-semibold text-card-foreground"
                >
                  {l.label}
                </div>
              ))}
            </MarqueeTrack>
          </div>
        </div>
      </div>
    </section>
  );
}
