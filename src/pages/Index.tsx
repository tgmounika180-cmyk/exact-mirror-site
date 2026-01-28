import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TopBar } from "@/components/jkkn/TopBar";
import { MainNav } from "@/components/jkkn/MainNav";
import { PartnersMarquee } from "@/components/jkkn/PartnersMarquee";
import { SiteFooter } from "@/components/jkkn/SiteFooter";

import { JKKN_ASSETS } from "@/lib/jkkn/assets";
import {
  fetchHomepageHero,
  fetchHomepageInstitutions,
  fetchHomepagePartners,
  fetchHomepagePosts,
} from "@/lib/jkkn/content";

const Index = () => {
  useEffect(() => {
    document.title = "Best College in Erode Region – JKKN Institutions";
  }, []);

  const heroQ = useQuery({ queryKey: ["homepage", "hero"], queryFn: fetchHomepageHero });
  const institutionsQ = useQuery({ queryKey: ["homepage", "institutions"], queryFn: fetchHomepageInstitutions });
  const newsQ = useQuery({ queryKey: ["homepage", "posts", "news"], queryFn: () => fetchHomepagePosts("news") });
  const buzzQ = useQuery({ queryKey: ["homepage", "posts", "buzz"], queryFn: () => fetchHomepagePosts("buzz") });
  const partnersQ = useQuery({ queryKey: ["homepage", "partners"], queryFn: fetchHomepagePartners });

  const hero = heroQ.data;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <MainNav />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={(JKKN_ASSETS as Record<string, string>)[hero?.background_image_key ?? "campus"] ?? JKKN_ASSETS.campus}
              alt="JKKN Campus"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-hero-overlay" />
          </div>

          <div className="relative">
            <div className="container pb-20 pt-16">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center rounded-full bg-secondary px-4 py-1 text-xs font-bold tracking-wide text-secondary-foreground">
                  {hero?.badge || "AI Empowered Campus"}
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl">
                  {hero?.headline || "India’s First AI-Integrated Campus"}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">
                  {hero?.subheadline || ""}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button variant="secondary" size="lg">
                    {hero?.cta1_label || "ONLINE ADMISSIONS 2026-27"}
                  </Button>
                  <Button variant="outline" size="lg" className="bg-background/70">
                    {hero?.cta2_label || "Explore Programs"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JKKN100 / FOUNDER */}
        <section className="bg-background">
          <div className="container py-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="overflow-hidden rounded-xl border">
                <img src={JKKN_ASSETS.founder} alt="Founder portrait" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">JKKN100 - Celebrating a Century of Excellence</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Kodai Vallal Shri. J.K.K. Nataraja Chettiar</h2>
                <p className="mt-1 text-sm text-muted-foreground">1925–1995</p>
                <p className="mt-5 leading-relaxed text-foreground/90">
                  Neutral placeholder copy preserving the two-paragraph legacy narrative structure.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button>Watch Tribute Video</Button>
                  <Button variant="outline">Learn More About Our Journey</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + WHY US */}
        <section className="bg-muted">
          <div className="container py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Est. 1952</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">JKKN Institutions</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
                  Neutral placeholder paragraph matching the about/journey content block.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "74+ Years of Legacy",
                  "50,000+ Learners",
                  "92%+ Placement",
                  "NAAC A Accredited",
                  "Modern Infrastructure",
                  "Global Alumni Network",
                ].map((label) => (
                  <Card key={label} className="bg-background">
                    <CardContent className="p-5">
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Placeholder supporting line.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-primary text-primary-foreground">
          <div className="container py-10">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="text-3xl font-bold">74+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-sm opacity-90">Learners Worldwide</div>
              </div>
              <div>
                <div className="text-3xl font-bold">92%+</div>
                <div className="text-sm opacity-90">Placement Success</div>
              </div>
            </div>
          </div>
        </section>

        {/* INSTITUTIONS GRID */}
        <section className="bg-background">
          <div className="container py-16">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold text-muted-foreground">Our Institutions</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Explore Our Colleges & Schools</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(institutionsQ.data ?? []).slice(0, 6).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <img
                    src={(JKKN_ASSETS as Record<string, string>)[item.image_key]}
                    alt={item.name}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                  <CardContent className="p-5">
                    <p className="text-base font-bold tracking-tight">{item.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS + BUZZ */}
        <section className="bg-muted">
          <div className="container py-16">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex items-end justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">College News</h2>
                  <a className="text-sm font-semibold text-primary hover:underline" href="#">
                    View all
                  </a>
                </div>
                <div className="grid gap-4">
                  {(newsQ.data ?? []).map((n) => (
                    <Card key={n.id} className="bg-background">
                      <CardContent className="flex gap-4 p-4">
                        <img
                          src={(JKKN_ASSETS as Record<string, string>)[n.image_key]}
                          alt={n.title}
                          className="h-20 w-28 shrink-0 rounded-md object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">{n.date_text}</p>
                          <p className="mt-1 font-semibold">{n.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{n.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-end justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Latest Buzz</h2>
                  <a className="text-sm font-semibold text-primary hover:underline" href="#">
                    View all
                  </a>
                </div>
                <div className="grid gap-4">
                  {(buzzQ.data ?? []).map((b) => (
                    <Card key={b.id} className="bg-background">
                      <CardContent className="flex gap-4 p-4">
                        <img
                          src={(JKKN_ASSETS as Record<string, string>)[b.image_key]}
                          alt={b.title}
                          className="h-20 w-28 shrink-0 rounded-md object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">{b.date_text}</p>
                          <p className="mt-1 font-semibold">{b.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{b.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <PartnersMarquee
          logos={(partnersQ.data ?? []).map((p) => ({ id: p.id, name: p.name, imageKey: p.image_key }))}
        />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
