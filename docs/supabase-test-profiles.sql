-- Run supabase-schema.sql first.
-- Then run this file in Supabase SQL Editor to enable the two test logins.

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
  'ONG de resgate e adocao responsavel atuando em Salvador no resgate de caes e gatos abandonados.'
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
