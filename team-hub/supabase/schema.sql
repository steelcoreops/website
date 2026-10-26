-- Steel Core Team Hub: schema, access rules and helpers.
-- Run once in the Supabase SQL editor, then run seed.sql.
--
-- Model
--   profiles       one row per person who can sign in (created automatically on invite)
--   spaces         a tenant / audience, e.g. Delivery Partners, Employees
--   space_members  which members can see which spaces
--   topics         groups of pages inside a space, e.g. Onboarding, Policies
--   pages          content inside a space, built from blocks, optionally filed under a topic
--   acknowledgements  who has confirmed they read which version of a page, and when
--
-- Roles
--   admin   the Steel Core team: sees every space, creates, edits and deletes content, manages people
--   member  sees published pages in the spaces they are assigned to, nothing else
--
-- Files
--   Uploads live in the private hub-files storage bucket under <space id>/…, so anyone who
--   can see a space can open its files through a short-lived signed link, and nobody else can.
--
-- Acknowledgements
--   A page with requires_ack asks members to confirm they have read it. Each confirmation
--   records the page's version at the time. An admin bumps the version when a change is
--   significant enough that everyone should confirm again; earlier records are kept.
--
-- Revoking access sets profiles.active = false (content is blocked immediately by the
-- policies below) and bans the auth user so their session cannot be refreshed.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- tables

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  organisation text,
  role text not null default 'member' check (role in ('admin', 'member')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.spaces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  description text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table public.space_members (
  space_id uuid not null references public.spaces (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary key (space_id, user_id)
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces (id) on delete cascade,
  name text not null,
  description text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces (id) on delete cascade,
  topic_id uuid references public.topics (id) on delete set null,
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and slug <> 'new'),
  title text not null,
  eyebrow text,
  summary text,
  blocks jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  requires_ack boolean not null default false,
  version int not null default 1 check (version > 0),
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null,
  unique (space_id, slug)
);

create table public.acknowledgements (
  page_id uuid not null references public.pages (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  version int not null,
  acknowledged_at timestamptz not null default now(),
  primary key (page_id, user_id, version)
);

create index pages_space_sort on public.pages (space_id, sort);
create index topics_space_sort on public.topics (space_id, sort);
create index space_members_user on public.space_members (user_id);
create index acknowledgements_user on public.acknowledgements (user_id);

-- ---------------------------------------------------------------- helpers
-- security definer so policies can call them without recursing through RLS.

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin' and active);
$$;

create or replace function public.can_view_space(sid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (
    select 1 from space_members m join profiles p on p.id = m.user_id
    where m.space_id = sid and m.user_id = auth.uid() and p.active
  );
$$;

-- Sign-in activity for the members screen. Returns nothing unless the caller is an admin.
create or replace function public.member_activity()
returns table (id uuid, last_sign_in_at timestamptz, email_confirmed_at timestamptz)
language sql stable security definer set search_path = public, auth as $$
  select u.id, u.last_sign_in_at, u.email_confirmed_at from auth.users u where public.is_admin();
$$;

-- The only way to record an acknowledgement. Always stamps the page's current version, so a
-- member cannot sign an old version or a page they cannot see.
create or replace function public.acknowledge_page(pid uuid)
returns timestamptz language plpgsql security definer set search_path = public as $$
declare
  v int;
  at timestamptz;
begin
  if not exists (select 1 from profiles where id = auth.uid() and active) then
    raise exception 'Your access has been removed.';
  end if;
  select version into v from pages
  where id = pid and published and requires_ack and public.can_view_space(space_id);
  if v is null then
    raise exception 'This page does not need acknowledging.';
  end if;
  insert into acknowledgements (page_id, user_id, version) values (pid, auth.uid(), v)
  on conflict (page_id, user_id, version) do nothing;
  select acknowledged_at into at from acknowledgements where page_id = pid and user_id = auth.uid() and version = v;
  return at;
end;
$$;

revoke execute on function public.is_admin(), public.can_view_space(uuid), public.member_activity(), public.acknowledge_page(uuid) from public, anon;
grant execute on function public.is_admin(), public.can_view_space(uuid), public.member_activity(), public.acknowledge_page(uuid) to authenticated;

-- ---------------------------------------------------------------- triggers

-- Every new auth user gets a profile. Signups are disabled, so this only fires on invite.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, lower(new.email), new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_page()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  new.updated_by = coalesce(auth.uid(), new.updated_by);
  return new;
end;
$$;

create trigger pages_touch
  before insert or update on public.pages
  for each row execute function public.touch_page();

-- ---------------------------------------------------------------- row level security

alter table public.profiles enable row level security;
alter table public.spaces enable row level security;
alter table public.space_members enable row level security;
alter table public.topics enable row level security;
alter table public.pages enable row level security;
alter table public.acknowledgements enable row level security;

-- profiles: you can read your own (even when revoked, so the app can say so); admins read and edit all.
create policy "profiles read" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles admin update" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- spaces
create policy "spaces read" on public.spaces
  for select to authenticated using (public.can_view_space(id));
create policy "spaces admin insert" on public.spaces
  for insert to authenticated with check (public.is_admin());
create policy "spaces admin update" on public.spaces
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "spaces admin delete" on public.spaces
  for delete to authenticated using (public.is_admin());

-- space_members
create policy "members read" on public.space_members
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "members admin insert" on public.space_members
  for insert to authenticated with check (public.is_admin());
create policy "members admin delete" on public.space_members
  for delete to authenticated using (public.is_admin());

-- topics
create policy "topics read" on public.topics
  for select to authenticated using (public.can_view_space(space_id));
create policy "topics admin insert" on public.topics
  for insert to authenticated with check (public.is_admin());
create policy "topics admin update" on public.topics
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "topics admin delete" on public.topics
  for delete to authenticated using (public.is_admin());

-- pages: members only ever see published pages in their own spaces.
create policy "pages read" on public.pages
  for select to authenticated using (public.is_admin() or (published and public.can_view_space(space_id)));
create policy "pages admin insert" on public.pages
  for insert to authenticated with check (public.is_admin());
create policy "pages admin update" on public.pages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "pages admin delete" on public.pages
  for delete to authenticated using (public.is_admin());

-- acknowledgements: read your own; admins read all. Written only through acknowledge_page().
create policy "acknowledgements read" on public.acknowledgements
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------- grants
-- Explicit, so nothing depends on project defaults. Signed-out visitors get nothing.

revoke all on public.profiles, public.spaces, public.space_members, public.topics, public.pages, public.acknowledgements from anon;
grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.spaces, public.space_members, public.topics, public.pages to authenticated;
grant select on public.acknowledgements to authenticated;

-- The server function (api/members.ts) uses the service_role key. Newer Supabase projects do not
-- grant it table access by default, so grant it here. It bypasses row level security, server side only.
grant usage on schema public to service_role;
grant all on public.profiles, public.spaces, public.space_members, public.topics, public.pages, public.acknowledgements to service_role;

-- ---------------------------------------------------------------- file storage
-- Private bucket, 50 MB per file. The first folder of every path is the space id.

insert into storage.buckets (id, name, public, file_size_limit)
values ('hub-files', 'hub-files', false, 52428800)
on conflict (id) do nothing;

create or replace function public.space_of_path(path text)
returns uuid language sql immutable as $$
  select case when split_part(path, '/', 1) ~ '^[0-9a-f-]{36}$' then split_part(path, '/', 1)::uuid end;
$$;

create policy "hub files read" on storage.objects
  for select to authenticated using (bucket_id = 'hub-files' and public.can_view_space(public.space_of_path(name)));
create policy "hub files admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'hub-files' and public.is_admin());
create policy "hub files admin update" on storage.objects
  for update to authenticated using (bucket_id = 'hub-files' and public.is_admin());
create policy "hub files admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'hub-files' and public.is_admin());
