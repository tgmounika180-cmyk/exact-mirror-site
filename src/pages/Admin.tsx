import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import {
  fetchHomepageHero,
  fetchHomepageInstitutions,
  fetchHomepagePartners,
  fetchHomepagePosts,
  fetchSiteFooterLinks,
  fetchSiteNavLabels,
  fetchSiteSettings,
  type HomepageHeroRow,
  type HomepageInstitutionRow,
  type HomepagePartnerRow,
  type HomepagePostRow,
  type SiteSettingsRow,
} from "@/lib/jkkn/content";

import { JKKN_ASSETS, type JkknAssetKey } from "@/lib/jkkn/assets";

async function setRoleByEmail(email: string, role: "admin" | "editor") {
  const { data, error } = await supabase.functions.invoke("admin-set-role", { body: { email, role } });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || "Failed to set role");
  return data;
}

function AssetSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = useMemo(() => Object.keys(JKKN_ASSETS) as JkknAssetKey[], []);
  return (
    <select
      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((k) => (
        <option key={k} value={k}>
          {k}
        </option>
      ))}
    </select>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();

  const [roleEmail, setRoleEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");

  const heroQ = useQuery({ queryKey: ["homepage", "hero"], queryFn: fetchHomepageHero });
  const instQ = useQuery({ queryKey: ["homepage", "institutions"], queryFn: fetchHomepageInstitutions });
  const newsQ = useQuery({ queryKey: ["homepage", "posts", "news"], queryFn: () => fetchHomepagePosts("news") });
  const buzzQ = useQuery({ queryKey: ["homepage", "posts", "buzz"], queryFn: () => fetchHomepagePosts("buzz") });
  const partnersQ = useQuery({ queryKey: ["homepage", "partners"], queryFn: fetchHomepagePartners });

  const siteSettingsQ = useQuery({ queryKey: ["site", "settings"], queryFn: fetchSiteSettings });
  const navLabelsQ = useQuery({ queryKey: ["site", "nav-labels"], queryFn: fetchSiteNavLabels });
  const footerLinksQ = useQuery({ queryKey: ["site", "footer-links"], queryFn: fetchSiteFooterLinks });

  const [heroDraft, setHeroDraft] = useState<HomepageHeroRow | null>(null);
  const [siteDraft, setSiteDraft] = useState<SiteSettingsRow | null>(null);
  const [navDraft, setNavDraft] = useState<Record<string, string>>({});
  const [footerLinksDraft, setFooterLinksDraft] = useState<Record<string, string>>({});

  useMemo(() => {
    if (!heroDraft && heroQ.data) setHeroDraft(heroQ.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroQ.data]);

  useMemo(() => {
    if (!siteDraft && siteSettingsQ.data) setSiteDraft(siteSettingsQ.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteSettingsQ.data]);

  useMemo(() => {
    if ((navLabelsQ.data ?? []).length && Object.keys(navDraft).length === 0) {
      setNavDraft((navLabelsQ.data ?? []).reduce<Record<string, string>>((acc, row) => {
        acc[row.key] = row.label;
        return acc;
      }, {}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navLabelsQ.data]);

  useMemo(() => {
    if ((footerLinksQ.data ?? []).length && Object.keys(footerLinksDraft).length === 0) {
      setFooterLinksDraft((footerLinksQ.data ?? []).reduce<Record<string, string>>((acc, row) => {
        acc[row.key] = row.label;
        return acc;
      }, {}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerLinksQ.data]);

  const siteSettingsSchema = useMemo(
    () =>
      z.object({
        topbar_phone: z.string().trim().min(3).max(50),
        topbar_email: z.string().trim().email().max(255),
        contact_address: z.string().trim().min(3).max(500),
        contact_phone: z.string().trim().min(3).max(50),
        contact_email: z.string().trim().email().max(255),
        footer_description: z.string().trim().min(1).max(800),
        about_text: z.string().trim().min(1).max(2000),
      }),
    [],
  );

  async function saveHero() {
    if (!heroDraft) return;
    try {
      await supabase
        .from("homepage_hero")
        .update({
          badge: heroDraft.badge,
          headline: heroDraft.headline,
          subheadline: heroDraft.subheadline,
          cta1_label: heroDraft.cta1_label,
          cta1_href: heroDraft.cta1_href,
          cta2_label: heroDraft.cta2_label,
          cta2_href: heroDraft.cta2_href,
          background_image_key: heroDraft.background_image_key,
        })
        .eq("id", heroDraft.id)
        .throwOnError();

      await qc.invalidateQueries({ queryKey: ["homepage", "hero"] });
      toast({ title: "Saved", description: "Hero updated." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save" , variant: "destructive" });
    }
  }

  async function saveSiteSettings() {
    if (!siteDraft) return;
    try {
      const parsed = siteSettingsSchema.parse({
        topbar_phone: siteDraft.topbar_phone,
        topbar_email: siteDraft.topbar_email,
        contact_address: siteDraft.contact_address,
        contact_phone: siteDraft.contact_phone,
        contact_email: siteDraft.contact_email,
        footer_description: siteDraft.footer_description,
        about_text: siteDraft.about_text,
      });

      await supabase
        .from("site_settings")
        .update(parsed)
        .eq("id", siteDraft.id)
        .throwOnError();

      await qc.invalidateQueries({ queryKey: ["site", "settings"] });
      toast({ title: "Saved", description: "Site settings updated." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save", variant: "destructive" });
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  async function onSetRole(e: React.FormEvent) {
    e.preventDefault();
    try {
      await setRoleByEmail(roleEmail, role);
      toast({ title: "Role updated", description: `${roleEmail} is now ${role}.` });
      setRoleEmail("");
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to set role", variant: "destructive" });
    }
  }

  // Minimal CRUD for lists (edit inline fields + save)
  async function saveInstitution(row: HomepageInstitutionRow) {
    await supabase
      .from("homepage_institutions")
      .update({ name: row.name, description: row.description, href: row.href, image_key: row.image_key, sort_order: row.sort_order })
      .eq("id", row.id)
      .throwOnError();
    await qc.invalidateQueries({ queryKey: ["homepage", "institutions"] });
  }

  async function savePost(row: HomepagePostRow) {
    await supabase
      .from("homepage_posts")
      .update({ title: row.title, date_text: row.date_text, excerpt: row.excerpt, href: row.href, image_key: row.image_key, sort_order: row.sort_order })
      .eq("id", row.id)
      .throwOnError();
    await qc.invalidateQueries({ queryKey: ["homepage", "posts", row.type] });
  }

  async function savePartner(row: HomepagePartnerRow) {
    await supabase.from("homepage_partners").update({ name: row.name, image_key: row.image_key, sort_order: row.sort_order }).eq("id", row.id).throwOnError();
    await qc.invalidateQueries({ queryKey: ["homepage", "partners"] });
  }

  async function saveNavLabel(key: string) {
    await supabase.from("site_nav_labels").update({ label: navDraft[key] ?? "" }).eq("key", key).throwOnError();
    await qc.invalidateQueries({ queryKey: ["site", "nav-labels"] });
    // These appear in header across pages
    await qc.invalidateQueries({ queryKey: ["site", "settings"] });
  }

  async function saveFooterLink(key: string) {
    await supabase.from("site_footer_links").update({ label: footerLinksDraft[key] ?? "" }).eq("key", key).throwOnError();
    await qc.invalidateQueries({ queryKey: ["site", "footer-links"] });
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
            <p className="text-sm text-muted-foreground">Signed in as {user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/">View site</a>
            </Button>
            <Button variant="secondary" onClick={signOut}>Sign out</Button>
          </div>
        </div>

        <Separator className="my-6" />

        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-bold">Set admin/editor by email</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ask the user to sign up first, then assign a role here.</p>
            <form className="mt-4 grid gap-3 md:grid-cols-[1fr_200px_140px]" onSubmit={onSetRole}>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={roleEmail} onChange={(e) => setRoleEmail(e.target.value)} placeholder="name@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={role} onChange={(e) => setRole(e.target.value as any)}>
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">Set role</Button>
              </div>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">Bootstrap: if no admins exist yet, the first logged-in user can assign the first role.</p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Tabs defaultValue="hero">
            <TabsList>
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="site">Site</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="buzz">Buzz</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {!heroDraft ? (
                    <p className="text-sm text-muted-foreground">Loading…</p>
                  ) : (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Badge</Label>
                        <Input value={heroDraft.badge} onChange={(e) => setHeroDraft({ ...heroDraft, badge: e.target.value })} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Headline</Label>
                        <Input value={heroDraft.headline} onChange={(e) => setHeroDraft({ ...heroDraft, headline: e.target.value })} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Subheadline</Label>
                        <Input value={heroDraft.subheadline} onChange={(e) => setHeroDraft({ ...heroDraft, subheadline: e.target.value })} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Background image</Label>
                        <AssetSelect value={heroDraft.background_image_key} onChange={(v) => setHeroDraft({ ...heroDraft, background_image_key: v })} />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label>CTA 1 label</Label>
                          <Input value={heroDraft.cta1_label} onChange={(e) => setHeroDraft({ ...heroDraft, cta1_label: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                          <Label>CTA 1 link</Label>
                          <Input value={heroDraft.cta1_href} onChange={(e) => setHeroDraft({ ...heroDraft, cta1_href: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                          <Label>CTA 2 label</Label>
                          <Input value={heroDraft.cta2_label} onChange={(e) => setHeroDraft({ ...heroDraft, cta2_label: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                          <Label>CTA 2 link</Label>
                          <Input value={heroDraft.cta2_href} onChange={(e) => setHeroDraft({ ...heroDraft, cta2_href: e.target.value })} />
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button onClick={saveHero}>Save hero</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="site" className="mt-4">
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-base font-bold">Top bar + Contact + Footer + About</h2>
                    {!siteDraft ? (
                      <p className="mt-2 text-sm text-muted-foreground">Loading…</p>
                    ) : (
                      <div className="mt-4 grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Top bar phone</Label>
                            <Input value={siteDraft.topbar_phone} onChange={(e) => setSiteDraft({ ...siteDraft, topbar_phone: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Top bar email</Label>
                            <Input value={siteDraft.topbar_email} onChange={(e) => setSiteDraft({ ...siteDraft, topbar_email: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>About section text</Label>
                          <Input value={siteDraft.about_text} onChange={(e) => setSiteDraft({ ...siteDraft, about_text: e.target.value })} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Contact phone (footer)</Label>
                            <Input value={siteDraft.contact_phone} onChange={(e) => setSiteDraft({ ...siteDraft, contact_phone: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Contact email (footer)</Label>
                            <Input value={siteDraft.contact_email} onChange={(e) => setSiteDraft({ ...siteDraft, contact_email: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>Address (footer)</Label>
                          <Input value={siteDraft.contact_address} onChange={(e) => setSiteDraft({ ...siteDraft, contact_address: e.target.value })} />
                        </div>

                        <div className="grid gap-2">
                          <Label>Footer description</Label>
                          <Input value={siteDraft.footer_description} onChange={(e) => setSiteDraft({ ...siteDraft, footer_description: e.target.value })} />
                        </div>

                        <div className="pt-2">
                          <Button onClick={saveSiteSettings}>Save site settings</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-base font-bold">Navigation menu labels (text only)</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Links remain unchanged; only label text is editable.</p>
                    <div className="mt-4 grid gap-3">
                      {(navLabelsQ.data ?? []).map((row) => (
                        <div key={row.key} className="grid gap-2 md:grid-cols-[220px_1fr_120px] md:items-end">
                          <div className="text-sm font-semibold">{row.key}</div>
                          <div className="grid gap-2">
                            <Label className="sr-only">Label</Label>
                            <Input
                              value={navDraft[row.key] ?? row.label}
                              onChange={(e) => setNavDraft((prev) => ({ ...prev, [row.key]: e.target.value }))}
                            />
                          </div>
                          <Button
                            variant="outline"
                            onClick={() =>
                              saveNavLabel(row.key)
                                .then(() => toast({ title: "Saved" }))
                                .catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))
                            }
                          >
                            Save
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-base font-bold">Footer quick links labels (text only)</h2>
                    <div className="mt-4 grid gap-3">
                      {(footerLinksQ.data ?? []).map((row) => (
                        <div key={row.key} className="grid gap-2 md:grid-cols-[220px_1fr_120px] md:items-end">
                          <div className="text-sm font-semibold">{row.key}</div>
                          <div className="grid gap-2">
                            <Label className="sr-only">Label</Label>
                            <Input
                              value={footerLinksDraft[row.key] ?? row.label}
                              onChange={(e) => setFooterLinksDraft((prev) => ({ ...prev, [row.key]: e.target.value }))}
                            />
                          </div>
                          <Button
                            variant="outline"
                            onClick={() =>
                              saveFooterLink(row.key)
                                .then(() => toast({ title: "Saved" }))
                                .catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))
                            }
                          >
                            Save
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="institutions" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {(instQ.data ?? []).map((row) => (
                    <div key={row.id} className="grid gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-6">
                      <div className="md:col-span-2">
                        <div className="text-sm font-semibold">{row.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{row.href}</div>
                      </div>
                      <div className="md:col-span-2 text-sm text-muted-foreground">{row.description}</div>
                      <div className="md:col-span-1">
                        <AssetSelect value={row.image_key} onChange={async (v) => {
                          await saveInstitution({ ...row, image_key: v });
                        }} />
                      </div>
                      <Button className="md:col-span-1" variant="outline" onClick={() => saveInstitution(row).then(() => toast({ title: "Saved" })).catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))}>
                        Save
                      </Button>
                    </div>
                  ))}
                  <p className="mt-4 text-xs text-muted-foreground">For now this view supports quick image swaps + save; we can expand to full inline editing next.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {(newsQ.data ?? []).map((row) => (
                    <div key={row.id} className="grid gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-6">
                      <div className="md:col-span-2 text-sm font-semibold">{row.title}</div>
                      <div className="md:col-span-1 text-sm text-muted-foreground">{row.date_text}</div>
                      <div className="md:col-span-2">
                        <AssetSelect value={row.image_key} onChange={async (v) => {
                          await savePost({ ...row, image_key: v });
                        }} />
                      </div>
                      <Button className="md:col-span-1" variant="outline" onClick={() => savePost(row).then(() => toast({ title: "Saved" })).catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))}>
                        Save
                      </Button>
                    </div>
                  ))}
                  <p className="mt-4 text-xs text-muted-foreground">Same as above; we can expand to full edit/create/delete next.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buzz" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {(buzzQ.data ?? []).map((row) => (
                    <div key={row.id} className="grid gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-6">
                      <Input className="md:col-span-2" value={row.title} readOnly />
                      <Input className="md:col-span-1" value={row.date_text} readOnly />
                      <div className="md:col-span-2">
                        <AssetSelect value={row.image_key} onChange={async (v) => {
                          await savePost({ ...row, image_key: v });
                        }} />
                      </div>
                      <Button className="md:col-span-1" variant="outline" onClick={() => savePost(row).then(() => toast({ title: "Saved" })).catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))}>
                        Save
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="partners" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {(partnersQ.data ?? []).map((row) => (
                    <div key={row.id} className="grid gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-5">
                      <Input className="md:col-span-2" value={row.name} readOnly />
                      <div className="md:col-span-2">
                        <AssetSelect value={row.image_key} onChange={async (v) => {
                          await savePartner({ ...row, image_key: v });
                        }} />
                      </div>
                      <Button className="md:col-span-1" variant="outline" onClick={() => savePartner(row).then(() => toast({ title: "Saved" })).catch((e) => toast({ title: "Error", description: e.message, variant: "destructive" }))}>
                        Save
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
