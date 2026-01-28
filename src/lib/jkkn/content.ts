import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type HomepageHeroRow = Database["public"]["Tables"]["homepage_hero"]["Row"];
export type HomepageInstitutionRow = Database["public"]["Tables"]["homepage_institutions"]["Row"];
export type HomepagePostRow = Database["public"]["Tables"]["homepage_posts"]["Row"];
export type HomepagePartnerRow = Database["public"]["Tables"]["homepage_partners"]["Row"];

export type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
export type SiteNavLabelRow = Database["public"]["Tables"]["site_nav_labels"]["Row"];
export type SiteFooterLinkRow = Database["public"]["Tables"]["site_footer_links"]["Row"];

export async function fetchHomepageHero() {
  const { data, error } = await supabase.from("homepage_hero").select("*").order("created_at", { ascending: true }).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function fetchHomepageInstitutions() {
  const { data, error } = await supabase
    .from("homepage_institutions")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchHomepagePosts(type: "news" | "buzz") {
  const { data, error } = await supabase
    .from("homepage_posts")
    .select("*")
    .eq("type", type)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchHomepagePartners() {
  const { data, error } = await supabase
    .from("homepage_partners")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("*").order("created_at", { ascending: true }).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function fetchSiteNavLabels() {
  const { data, error } = await supabase.from("site_nav_labels").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchSiteFooterLinks() {
  const { data, error } = await supabase.from("site_footer_links").select("*");
  if (error) throw error;
  return data ?? [];
}
