-- Roles
create type public.app_role as enum ('admin', 'editor');

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create or replace function public.can_edit_content(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(_user_id, 'admin') or public.has_role(_user_id, 'editor')
$$;

create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Common updated_at helper
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at_column();

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id);

-- Content tables (public read, admin/editor write)
create table if not exists public.homepage_hero (
  id uuid primary key default gen_random_uuid(),
  badge text not null default '',
  headline text not null default '',
  subheadline text not null default '',
  cta1_label text not null default '',
  cta1_href text not null default '#',
  cta2_label text not null default '',
  cta2_href text not null default '#',
  background_image_key text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homepage_hero enable row level security;
create trigger update_homepage_hero_updated_at
before update on public.homepage_hero
for each row
execute function public.update_updated_at_column();

create policy "Homepage hero is publicly readable"
on public.homepage_hero
for select
using (true);

create policy "Editors can manage homepage hero"
on public.homepage_hero
for all
to authenticated
using (public.can_edit_content(auth.uid()))
with check (public.can_edit_content(auth.uid()));

create table if not exists public.homepage_institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image_key text not null,
  href text not null default '#',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homepage_institutions enable row level security;
create trigger update_homepage_institutions_updated_at
before update on public.homepage_institutions
for each row
execute function public.update_updated_at_column();

create policy "Homepage institutions are publicly readable"
on public.homepage_institutions
for select
using (true);

create policy "Editors can manage homepage institutions"
on public.homepage_institutions
for all
to authenticated
using (public.can_edit_content(auth.uid()))
with check (public.can_edit_content(auth.uid()));

create type public.homepage_post_type as enum ('news', 'buzz');

create table if not exists public.homepage_posts (
  id uuid primary key default gen_random_uuid(),
  type public.homepage_post_type not null,
  title text not null,
  date_text text not null default '',
  excerpt text not null default '',
  image_key text not null,
  href text not null default '#',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homepage_posts enable row level security;
create trigger update_homepage_posts_updated_at
before update on public.homepage_posts
for each row
execute function public.update_updated_at_column();

create policy "Homepage posts are publicly readable"
on public.homepage_posts
for select
using (true);

create policy "Editors can manage homepage posts"
on public.homepage_posts
for all
to authenticated
using (public.can_edit_content(auth.uid()))
with check (public.can_edit_content(auth.uid()));

create table if not exists public.homepage_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_key text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homepage_partners enable row level security;
create trigger update_homepage_partners_updated_at
before update on public.homepage_partners
for each row
execute function public.update_updated_at_column();

create policy "Homepage partners are publicly readable"
on public.homepage_partners
for select
using (true);

create policy "Editors can manage homepage partners"
on public.homepage_partners
for all
to authenticated
using (public.can_edit_content(auth.uid()))
with check (public.can_edit_content(auth.uid()));
