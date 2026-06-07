# PetFinder

PetFinder é uma plataforma web para adoção responsável de cães e gatos, conectando ONGs/protetores a pessoas interessadas em adotar.

O app funciona em dois modos:

- **Supabase configurado:** usa Supabase Auth, Google Login, RLS e dados persistidos no banco.
- **Supabase ausente:** usa mocks e `localStorage` para desenvolvimento local.

## Funcionalidades

- Listagem de pets com busca, filtros, estado vazio e carregamento.
- Detalhe do pet com dados da ONG e formulário de pré-adoção.
- Pedido de adoção salvo e enviado para o WhatsApp da ONG com mensagem estruturada.
- Login por email/senha e Google OAuth via Supabase Auth.
- Cadastro de ONG com dados de contato, cidade, bairro e descrição.
- Painel da ONG para cadastrar, editar, remover e alterar status dos pets.
- Upload de fotos horizontais dos pets com validação, preview, otimização em WebP e galeria.
- Google Maps para pets e ONGs, com filtros por cidade, bairro e distância aproximada.
- Mapa regional para pet shops e serviços parceiros.
- Perfil avançado do pet com saúde, carteira de vacinação, histórico veterinário, microchip, peso, comportamento, rotina, alimentação e observações da ONG.
- Catálogo de parceiros/pet shops com serviços, fonte pública, WhatsApp, Instagram, localização e fallback local.
- Hub de utilidade pública com vacinação, castração, zoonoses, documentos, microchip e viagens com fontes oficiais.
- Blog educativo com 10 artigos sobre higiene, vacinação, alimentação, ansiedade, adaptação, adoção responsável, socialização, castração, enriquecimento ambiental e saúde preventiva.
- Painel admin com visão de ONGs, pets, pedidos e perfis.
- Configuração pronta para Vercel SPA com `vercel.json`.

## Tecnologias

React, Vite, React Router, Tailwind CSS, Supabase, React Hook Form, Zod, TanStack Query, Framer Motion e Lucide React.

## Como Rodar

```bash
npm install
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_ENABLE_SUPABASE_PARTNERS=false
```

Use apenas a chave pública anon/publishable no frontend. Nunca coloque `service_role` no cliente.

`VITE_GOOGLE_MAPS_API_KEY` habilita o mapa interativo com marcadores; sem ela, o app usa um embed do Google Maps. A tabela `partners` no Supabase é opcional no v1: deixe `VITE_ENABLE_SUPABASE_PARTNERS=false` enquanto ela não existir para manter o fallback local e evitar erro 404.

## Supabase

1. Crie ou abra o projeto Supabase.
2. Execute `supabase-schema.sql` no SQL Editor.
3. Em Authentication > Providers, habilite Google.
4. Configure a URL de callback autorizada:

```text
http://localhost:5173/auth/callback
https://seu-dominio.vercel.app/auth/callback
```

5. Configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` localmente e na Vercel.

O schema cria:

- `profiles`: role do usuário (`adopter`, `ong`, `admin`) e vínculo com ONG.
- `ongs`: dados da ONG e dono autenticado.
- `pets`: pets da ONG, status e campos usados pelo frontend.
- `pet-images`: bucket público do Supabase Storage para fotos otimizadas dos pets.
- `partners`: pet shops e serviços parceiros exibidos no hub regional.
- `adoption_requests`: pedidos enviados pelo formulário.

As policies RLS permitem leitura pública de ONGs e pets disponíveis, criação pública de pedidos de adoção, gestão de pets apenas pela ONG dona e visão administrativa para perfis `admin`.

Quando o Supabase não está configurado, as imagens selecionadas são convertidas para base64 e persistidas no `localStorage` apenas para desenvolvimento.

Pets e ONGs também podem armazenar `latitude` e `longitude`; quando esses campos não existem, o frontend usa coordenadas aproximadas por cidade e bairro para o mapa regional.

## Contas Locais de Desenvolvimento

Quando Supabase não está configurado, o app aceita:

```text
ONG: ong@petfinder.local / ong123
Admin: admin@petfinder.local / admin123
```

Em produção, crie usuários pelo Supabase Auth e ajuste `profiles.role` para liberar acesso a `/dashboard` ou `/admin`.

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
- Variáveis: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_MAPS_API_KEY`, `VITE_ENABLE_SUPABASE_PARTNERS`

O `vercel.json` redireciona rotas internas para `index.html`, evitando erro em refresh direto de SPA.
