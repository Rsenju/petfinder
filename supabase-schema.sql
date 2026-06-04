create table if not exists public.ongs (
  id text primary key,
  name text not null,
  email text not null,
  whatsapp text not null,
  city text not null,
  neighborhood text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.pets (
  id text primary key,
  ong_id text not null references public.ongs(id) on delete cascade,
  name text not null,
  species text not null,
  gender text,
  size text,
  age text,
  city text not null,
  neighborhood text,
  description text,
  image_url text,
  status text not null default 'available' check (status in ('available', 'in_process', 'adopted')),
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

alter table public.ongs enable row level security;
alter table public.pets enable row level security;
alter table public.adoption_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.ongs to anon, authenticated;
grant select on public.pets to anon, authenticated;
grant insert on public.adoption_requests to anon, authenticated;
grant select, insert, update, delete on public.ongs to authenticated;
grant select, insert, update, delete on public.pets to authenticated;
grant select on public.adoption_requests to authenticated;

create policy "Public can read ongs" on public.ongs for select using (true);
create policy "Public can read pets" on public.pets for select using (true);
create policy "Public can create adoption requests" on public.adoption_requests for insert with check (true);
create policy "Authenticated can manage ongs" on public.ongs for all to authenticated using (true) with check (true);
create policy "Authenticated can manage pets" on public.pets for all to authenticated using (true) with check (true);
create policy "Authenticated can read adoption requests" on public.adoption_requests for select to authenticated using (true);
