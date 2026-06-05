create schema if not exists app_private;

drop table if exists public.favorites;

create table if not exists public.ongs (
  id text primary key,
  owner_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  whatsapp text not null,
  city text not null,
  neighborhood text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'adopter' check (role in ('adopter', 'ong', 'admin')),
  ong_id text references public.ongs(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.pets (
  id text primary key,
  ong_id text not null references public.ongs(id) on delete cascade,
  name text not null,
  species text not null,
  breed text,
  gender text,
  size text,
  age text,
  age_type text,
  city text not null,
  neighborhood text,
  description text not null,
  image_url text,
  status text not null default 'available' check (status in ('available', 'in_process', 'adopted')),
  tags text[] not null default '{}',
  personality text,
  health_status text,
  vaccinated boolean not null default false,
  castrated boolean not null default false,
  children_compatibility text,
  cats_compatibility text,
  dogs_compatibility text,
  energy_level text,
  created_at timestamptz not null default now()
);

create table if not exists public.adoption_requests (
  id text primary key,
  pet_id text not null references public.pets(id) on delete cascade,
  ong_id text not null references public.ongs(id) on delete cascade,
  adopter_name text not null,
  adopter_phone text not null,
  adopter_neighborhood text not null,
  home_prepared text not null,
  needs_guidance text not null,
  has_or_had_pets text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function app_private.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function app_private.owns_ong(target_ong_id text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'ong'
      and ong_id = target_ong_id
  );
$$;

alter table public.ongs enable row level security;
alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.adoption_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.ongs to anon, authenticated;
grant select on public.pets to anon, authenticated;
grant insert on public.adoption_requests to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.ongs to authenticated;
grant select, insert, update, delete on public.pets to authenticated;
grant select on public.adoption_requests to authenticated;

drop policy if exists "Profiles can read own profile" on public.profiles;
drop policy if exists "Admins can read profiles" on public.profiles;
drop policy if exists "Users can create own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Public can read ongs" on public.ongs;
drop policy if exists "Owners can create ongs" on public.ongs;
drop policy if exists "Owners can update own ong" on public.ongs;
drop policy if exists "Admins can delete ongs" on public.ongs;
drop policy if exists "Public can read visible pets" on public.pets;
drop policy if exists "Ongs can create own pets" on public.pets;
drop policy if exists "Ongs can update own pets" on public.pets;
drop policy if exists "Ongs can delete own pets" on public.pets;
drop policy if exists "Public can create adoption requests" on public.adoption_requests;
drop policy if exists "Ongs can read own adoption requests" on public.adoption_requests;

create policy "Profiles can read own profile"
on public.profiles for select to authenticated
using (id = auth.uid());

create policy "Admins can read profiles"
on public.profiles for select to authenticated
using (app_private.is_admin());

create policy "Users can create own profile"
on public.profiles for insert to authenticated
with check (id = auth.uid() and role in ('adopter', 'ong'));

create policy "Users can update own profile"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid() and role in ('adopter', 'ong'));

create policy "Admins can update profiles"
on public.profiles for update to authenticated
using (app_private.is_admin())
with check (app_private.is_admin());

create policy "Public can read ongs"
on public.ongs for select
using (true);

create policy "Owners can create ongs"
on public.ongs for insert to authenticated
with check (owner_user_id = auth.uid() or app_private.is_admin());

create policy "Owners can update own ong"
on public.ongs for update to authenticated
using (owner_user_id = auth.uid() or app_private.is_admin())
with check (owner_user_id = auth.uid() or app_private.is_admin());

create policy "Admins can delete ongs"
on public.ongs for delete to authenticated
using (app_private.is_admin());

create policy "Public can read visible pets"
on public.pets for select
using (
  status = 'available'
  or app_private.is_admin()
  or app_private.owns_ong(ong_id)
);

create policy "Ongs can create own pets"
on public.pets for insert to authenticated
with check (app_private.owns_ong(ong_id) or app_private.is_admin());

create policy "Ongs can update own pets"
on public.pets for update to authenticated
using (app_private.owns_ong(ong_id) or app_private.is_admin())
with check (app_private.owns_ong(ong_id) or app_private.is_admin());

create policy "Ongs can delete own pets"
on public.pets for delete to authenticated
using (app_private.owns_ong(ong_id) or app_private.is_admin());

create policy "Public can create adoption requests"
on public.adoption_requests for insert to anon, authenticated
with check (true);

create policy "Ongs can read own adoption requests"
on public.adoption_requests for select to authenticated
using (app_private.owns_ong(ong_id) or app_private.is_admin());
