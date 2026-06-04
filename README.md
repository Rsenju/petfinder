# PetFinder

PetFinder e uma plataforma web para adocao responsavel de caes e gatos, conectando ONGs/protetores a pessoas interessadas em adotar.

O app funciona em dois modos:

- **Supabase configurado:** usa Supabase Auth, Google Login, RLS e dados persistidos no banco.
- **Supabase ausente:** usa mocks e `localStorage` para desenvolvimento local.

## Funcionalidades

- Listagem de pets com busca, filtros, estado vazio e carregamento.
- Detalhe do pet com dados da ONG e formulario de pre-adocao.
- Pedido de adocao salvo e enviado para o WhatsApp da ONG com mensagem estruturada.
- Login por email/senha e Google OAuth via Supabase Auth.
- Cadastro de ONG com dados de contato, cidade, bairro e descricao.
- Painel da ONG para cadastrar, editar, remover e alterar status dos pets.
- Painel admin com visao de ONGs, pets, pedidos e perfis.
- Configuracao pronta para Vercel SPA com `vercel.json`.

## Tecnologias

React, Vite, React Router, Tailwind CSS, Supabase, React Hook Form, Zod, TanStack Query, Framer Motion e Lucide React.

## Como Rodar

```bash
npm install
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Variaveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use apenas a chave publica anon/publishable no frontend. Nunca coloque `service_role` no cliente.

## Supabase

1. Crie ou abra o projeto Supabase.
2. Execute `supabase-schema.sql` no SQL Editor.
3. Em Authentication > Providers, habilite Google.
4. Configure a URL de callback autorizada:

```text
http://localhost:5173/auth/callback
https://seu-dominio.vercel.app/auth/callback
```

5. Configure as variaveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` localmente e na Vercel.

O schema cria:

- `profiles`: role do usuario (`adopter`, `ong`, `admin`) e vinculo com ONG.
- `ongs`: dados da ONG e dono autenticado.
- `pets`: pets da ONG, status e campos usados pelo frontend.
- `adoption_requests`: pedidos enviados pelo formulario.
As policies RLS permitem leitura publica de ONGs e pets disponiveis, criacao publica de pedidos de adocao, gestao de pets apenas pela ONG dona e visao administrativa para perfis `admin`.

## Contas Locais de Desenvolvimento

Quando Supabase nao esta configurado, o app aceita:

```text
ONG: ong@petfinder.local / ong123
Admin: admin@petfinder.local / admin123
```

Em producao, crie usuarios pelo Supabase Auth e ajuste `profiles.role` para liberar acesso a `/dashboard` ou `/admin`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Deploy na Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Variaveis: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

O `vercel.json` redireciona rotas internas para `index.html`, evitando erro em refresh direto de SPA.
