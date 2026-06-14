# Aplicação do banco de produção

Projeto esperado: `yfbewvcyxlnwxqlvzmic`.

## Ordem de execução

1. Abra **Supabase > SQL Editor** no projeto correto.
2. Crie uma nova consulta e cole somente o conteúdo de `supabase-schema.sql`.
3. Execute e confirme que não houve erro.
4. Crie outra consulta e cole o conteúdo de `docs/supabase-production-seed.sql`.
5. Execute e confirme os resultados: `total_ongs = 3` e seis pets para cada `ong_id`.
6. Em **Settings > API > Data API**, confirme que o schema `public` está exposto.
7. Em **Authentication > Users**, mantenha os usuários admin e ONG já criados.
8. Em **Table Editor > profiles**, confirme os vínculos abaixo.

```sql
select id, email, role, ong_id
from public.profiles
order by role, email;
```

Resultado esperado para as contas atuais:

- `admin@petfinder.local`: `role = admin`, `ong_id = null`.
- `ong@petfinder.local`: `role = ong`, `ong_id = ong_salvador`.

## Validação do schema e dos dados

```sql
select column_name
from information_schema.columns
where table_schema = 'public'
  and table_name = 'pets'
order by ordinal_position;

select count(*) as total_ongs
from public.ongs
where id in ('ong_salvador', 'ong_lauro', 'ong_feira');

select ong_id, count(*) as total_pets
from public.pets
where ong_id in ('ong_salvador', 'ong_lauro', 'ong_feira')
group by ong_id
order by ong_id;

select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles', 'ongs', 'pets', 'adoption_requests', 'reports')
order by tablename, policyname;
```

## Atualização do cache da API

O schema e o seed já executam o comando abaixo. Rode novamente apenas se o painel ainda mostrar coluna ou relacionamento ausente.

```sql
notify pgrst, 'reload schema';
```

Não cole mensagens do console do navegador no SQL Editor. O editor aceita apenas SQL.
