-- Editable site-wide content (nav/topbar/about/contact/footer)

-- Navigation labels (text only)
CREATE TABLE IF NOT EXISTS public.site_nav_labels (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_nav_labels ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_nav_labels' AND policyname = 'Site nav labels are publicly readable'
  ) THEN
    CREATE POLICY "Site nav labels are publicly readable"
    ON public.site_nav_labels
    FOR SELECT
    USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_nav_labels' AND policyname = 'Editors can manage site nav labels'
  ) THEN
    CREATE POLICY "Editors can manage site nav labels"
    ON public.site_nav_labels
    FOR ALL
    USING (public.can_edit_content(auth.uid()))
    WITH CHECK (public.can_edit_content(auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_nav_labels_updated_at'
  ) THEN
    CREATE TRIGGER update_site_nav_labels_updated_at
    BEFORE UPDATE ON public.site_nav_labels
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Footer quick links labels (text only)
CREATE TABLE IF NOT EXISTS public.site_footer_links (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_footer_links ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_footer_links' AND policyname = 'Site footer links are publicly readable'
  ) THEN
    CREATE POLICY "Site footer links are publicly readable"
    ON public.site_footer_links
    FOR SELECT
    USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_footer_links' AND policyname = 'Editors can manage site footer links'
  ) THEN
    CREATE POLICY "Editors can manage site footer links"
    ON public.site_footer_links
    FOR ALL
    USING (public.can_edit_content(auth.uid()))
    WITH CHECK (public.can_edit_content(auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_footer_links_updated_at'
  ) THEN
    CREATE TRIGGER update_site_footer_links_updated_at
    BEFORE UPDATE ON public.site_footer_links
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Single-row site settings (contact + footer + about text)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topbar_phone TEXT NOT NULL DEFAULT '',
  topbar_email TEXT NOT NULL DEFAULT '',
  contact_address TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  footer_description TEXT NOT NULL DEFAULT '',
  about_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_settings' AND policyname = 'Site settings are publicly readable'
  ) THEN
    CREATE POLICY "Site settings are publicly readable"
    ON public.site_settings
    FOR SELECT
    USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_settings' AND policyname = 'Editors can manage site settings'
  ) THEN
    CREATE POLICY "Editors can manage site settings"
    ON public.site_settings
    FOR ALL
    USING (public.can_edit_content(auth.uid()))
    WITH CHECK (public.can_edit_content(auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_settings_updated_at'
  ) THEN
    CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Seed defaults (idempotent)
INSERT INTO public.site_settings (
  topbar_phone,
  topbar_email,
  contact_address,
  contact_phone,
  contact_email,
  footer_description,
  about_text
)
SELECT
  '+91 93458 55001',
  'info@jkkn.ac.in',
  'JKKN Campus, Placeholder Address',
  '+91 93458 55001',
  'info@jkkn.ac.in',
  'Placeholder description matching the footer’s informational block.',
  'Neutral placeholder paragraph matching the about/journey content block.'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- Seed nav labels (idempotent)
INSERT INTO public.site_nav_labels(key, label)
VALUES
  ('home', 'Home'),
  ('about', 'About'),
  ('our_colleges', 'Our Colleges'),
  ('our_schools', 'Our Schools'),
  ('courses_offered', 'Courses Offered'),
  ('facilities', 'Facilities'),
  ('more', 'More'),
  ('more_news_events', 'News & Events'),
  ('more_careers', 'Careers'),
  ('more_gallery', 'Gallery'),
  ('contact', 'Contact'),
  ('admissions_cta', 'ONLINE ADMISSIONS 2026-27')
ON CONFLICT (key) DO NOTHING;

-- Seed footer quick links (idempotent)
INSERT INTO public.site_footer_links(key, label)
VALUES
  ('about', 'About'),
  ('our_colleges', 'Our Colleges'),
  ('admissions', 'Admissions'),
  ('contact', 'Contact')
ON CONFLICT (key) DO NOTHING;
