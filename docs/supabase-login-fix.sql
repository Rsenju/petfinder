-- PetFinder login fix
-- Use this in Supabase SQL Editor when Auth users already exist,
-- but the app shows: "Could not find the table 'public.profiles'".

create schema if not exists app_private;

create table if not exists public.ongs (
  id text primary key,
  owner_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  whatsapp text not null,
  city text not null,
  neighborhood text,
  address text,
  service_area text,
  responsible text,
  founded_at text,
  instagram text,
  approval_status text not null default 'approved',
  is_verified boolean not null default true,
  moderation_note text,
  description text,
  created_at timestamptz not null default now()
);

alter table public.ongs add column if not exists owner_user_id uuid references auth.users(id) on delete set null;
alter table public.ongs add column if not exists email text;
alter table public.ongs add column if not exists whatsapp text;
alter table public.ongs add column if not exists city text;
alter table public.ongs add column if not exists neighborhood text;
alter table public.ongs add column if not exists address text;
alter table public.ongs add column if not exists service_area text;
alter table public.ongs add column if not exists responsible text;
alter table public.ongs add column if not exists founded_at text;
alter table public.ongs add column if not exists instagram text;
alter table public.ongs add column if not exists approval_status text not null default 'approved';
alter table public.ongs add column if not exists is_verified boolean not null default true;
alter table public.ongs add column if not exists moderation_note text;
alter table public.ongs add column if not exists description text;
alter table public.ongs add column if not exists created_at timestamptz not null default now();

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'adopter' check (role in ('adopter', 'ong', 'admin')),
  ong_id text references public.ongs(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists role text not null default 'adopter';
alter table public.profiles add column if not exists ong_id text references public.ongs(id) on delete set null;
alter table public.profiles add column if not exists created_at timestamptz not null default now();

alter table public.pets add column if not exists breed text;
alter table public.pets add column if not exists age_type text;
alter table public.pets add column if not exists latitude numeric;
alter table public.pets add column if not exists longitude numeric;
alter table public.pets add column if not exists image_gallery text[] not null default '{}';
alter table public.pets add column if not exists image_metadata jsonb not null default '{}';
alter table public.pets add column if not exists tags text[] not null default '{}';
alter table public.pets add column if not exists personality text;
alter table public.pets add column if not exists health_status text;
alter table public.pets add column if not exists vaccinated boolean not null default false;
alter table public.pets add column if not exists castrated boolean not null default false;
alter table public.pets add column if not exists children_compatibility text;
alter table public.pets add column if not exists cats_compatibility text;
alter table public.pets add column if not exists dogs_compatibility text;
alter table public.pets add column if not exists energy_level text;
alter table public.pets add column if not exists vaccination_record text;
alter table public.pets add column if not exists veterinary_history text;
alter table public.pets add column if not exists special_needs text;
alter table public.pets add column if not exists medications text;
alter table public.pets add column if not exists microchip boolean not null default false;
alter table public.pets add column if not exists weight text;
alter table public.pets add column if not exists behavior_profile text;
alter table public.pets add column if not exists adaptation_needs text;
alter table public.pets add column if not exists routine text;
alter table public.pets add column if not exists feeding text;
alter table public.pets add column if not exists ong_notes text;

create table if not exists public.adoption_requests (
  id text primary key,
  pet_id text,
  ong_id text references public.ongs(id) on delete set null,
  adopter_name text not null,
  adopter_phone text not null,
  adopter_neighborhood text,
  home_prepared text,
  needs_guidance text,
  has_or_had_pets text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.adoption_requests add column if not exists pet_id text;
alter table public.adoption_requests add column if not exists ong_id text references public.ongs(id) on delete set null;
alter table public.adoption_requests add column if not exists adopter_name text;
alter table public.adoption_requests add column if not exists adopter_phone text;
alter table public.adoption_requests add column if not exists adopter_neighborhood text;
alter table public.adoption_requests add column if not exists home_prepared text;
alter table public.adoption_requests add column if not exists needs_guidance text;
alter table public.adoption_requests add column if not exists has_or_had_pets text;
alter table public.adoption_requests add column if not exists message text;
alter table public.adoption_requests add column if not exists status text not null default 'new';
alter table public.adoption_requests add column if not exists created_at timestamptz not null default now();

create table if not exists public.reports (
  id text primary key,
  pet_id text,
  ong_id text references public.ongs(id) on delete set null,
  reason text not null,
  description text,
  reporter_name text,
  reporter_contact text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.reports add column if not exists pet_id text;
alter table public.reports add column if not exists ong_id text references public.ongs(id) on delete set null;
alter table public.reports add column if not exists reason text;
alter table public.reports add column if not exists description text;
alter table public.reports add column if not exists reporter_name text;
alter table public.reports add column if not exists reporter_contact text;
alter table public.reports add column if not exists status text not null default 'open';
alter table public.reports add column if not exists created_at timestamptz not null default now();

do $$
begin
  if to_regclass('public.pets') is not null
    and not exists (
      select 1 from pg_constraint
      where conname = 'adoption_requests_pet_id_fkey'
        and conrelid = 'public.adoption_requests'::regclass
    )
  then
    alter table public.adoption_requests
      add constraint adoption_requests_pet_id_fkey
      foreign key (pet_id) references public.pets(id)
      on delete cascade
      not valid;
  end if;

  if to_regclass('public.pets') is not null
    and not exists (
      select 1 from pg_constraint
      where conname = 'reports_pet_id_fkey'
        and conrelid = 'public.reports'::regclass
    )
  then
    alter table public.reports
      add constraint reports_pet_id_fkey
      foreign key (pet_id) references public.pets(id)
      on delete cascade
      not valid;
  end if;
end $$;

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
    select 1
    from public.profiles
    join public.ongs on ongs.id = profiles.ong_id
    where profiles.id = auth.uid()
      and profiles.role = 'ong'
      and profiles.ong_id = target_ong_id
      and ongs.owner_user_id = auth.uid()
  );
$$;

create or replace function app_private.can_set_profile_ong(
  profile_id uuid,
  profile_role text,
  profile_ong_id text
)
returns boolean
language sql
security definer
set search_path = public
as $$
  select profile_id = auth.uid()
    and (
      (profile_role = 'adopter' and profile_ong_id is null)
      or (
        profile_role = 'ong'
        and profile_ong_id is not null
        and exists (
          select 1
          from public.ongs
          where ongs.id = profile_ong_id
            and ongs.owner_user_id = auth.uid()
        )
      )
    );
$$;

alter table public.ongs enable row level security;
alter table public.profiles enable row level security;
alter table public.adoption_requests enable row level security;
alter table public.reports enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.ongs to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.ongs to authenticated;
grant insert on public.adoption_requests to anon, authenticated;
grant select, update on public.adoption_requests to authenticated;
grant insert on public.reports to anon, authenticated;
grant select, update on public.reports to authenticated;

drop policy if exists "Public can read approved ongs" on public.ongs;
drop policy if exists "Authenticated users can read profiles" on public.profiles;
drop policy if exists "Users can create own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Public can create adoption requests" on public.adoption_requests;
drop policy if exists "Authenticated users can read adoption requests" on public.adoption_requests;
drop policy if exists "Authenticated users can update adoption requests" on public.adoption_requests;
drop policy if exists "Public can create reports" on public.reports;
drop policy if exists "Authenticated users can read reports" on public.reports;
drop policy if exists "Authenticated users can update reports" on public.reports;

create policy "Public can read approved ongs"
on public.ongs for select
using (approval_status = 'approved');

create policy "Authenticated users can read profiles"
on public.profiles for select to authenticated
using (id = auth.uid() or app_private.is_admin());

create policy "Users can create own profile"
on public.profiles for insert to authenticated
with check (app_private.can_set_profile_ong(id, role, ong_id));

create policy "Users can update own profile"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (app_private.can_set_profile_ong(id, role, ong_id));

create policy "Admins can update profiles"
on public.profiles for update to authenticated
using (app_private.is_admin())
with check (app_private.is_admin());

create policy "Public can create adoption requests"
on public.adoption_requests for insert
with check (true);

create policy "Authenticated users can read adoption requests"
on public.adoption_requests for select to authenticated
using (app_private.is_admin() or app_private.owns_ong(ong_id));

create policy "Authenticated users can update adoption requests"
on public.adoption_requests for update to authenticated
using (app_private.is_admin() or app_private.owns_ong(ong_id))
with check (app_private.is_admin() or app_private.owns_ong(ong_id));

create policy "Public can create reports"
on public.reports for insert
with check (true);

create policy "Authenticated users can read reports"
on public.reports for select to authenticated
using (app_private.is_admin());

create policy "Authenticated users can update reports"
on public.reports for update to authenticated
using (app_private.is_admin())
with check (app_private.is_admin());

insert into public.ongs (
  id,
  owner_user_id,
  name,
  email,
  whatsapp,
  city,
  neighborhood,
  address,
  service_area,
  responsible,
  founded_at,
  instagram,
  approval_status,
  is_verified,
  description
) values (
  'ong_salvador',
  'c7e36dec-21e0-4dee-93fd-21d59adce824',
  'Patinhas de Salvador',
  'contato@patinhasdesalvador.org',
  '(71) 99991-1201',
  'Salvador',
  'Rio Vermelho',
  'Rua Conselheiro Pedro Luiz, 214 - Rio Vermelho, Salvador - BA',
  'Salvador, especialmente Brotas, Barra, Rio Vermelho, Ondina e Itapua',
  'Equipe Patinhas de Salvador',
  '2019',
  '@patinhasdesalvador',
  'approved',
  true,
  'ONG de resgate e adoção responsável atuando em Salvador no resgate de cães e gatos abandonados.'
)
on conflict (id) do update set
  owner_user_id = excluded.owner_user_id,
  name = excluded.name,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  city = excluded.city,
  neighborhood = excluded.neighborhood,
  address = excluded.address,
  service_area = excluded.service_area,
  responsible = excluded.responsible,
  founded_at = excluded.founded_at,
  instagram = excluded.instagram,
  approval_status = excluded.approval_status,
  is_verified = excluded.is_verified,
  description = excluded.description;

insert into public.profiles (id, name, email, role, ong_id)
values
  (
    '91a90f50-4abe-46c5-afcf-6373afe28285',
    'Administrador PetFinder',
    'admin@petfinder.local',
    'admin',
    null
  ),
  (
    'c7e36dec-21e0-4dee-93fd-21d59adce824',
    'Amigo de Patas',
    'ong@petfinder.local',
    'ong',
    'ong_salvador'
  )
on conflict (id) do update set
  name = excluded.name,
  email = excluded.email,
  role = excluded.role,
  ong_id = excluded.ong_id;

notify pgrst, 'reload schema';
