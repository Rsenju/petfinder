# PetFinder

Plataforma web de adoção responsável que conecta adotantes, ONGs e protetores de animais. O sistema reúne pets disponíveis, perfis das organizações, formulário de pré-adoção, contato via WhatsApp e áreas privadas para ONGs e administradores.

## Estado atual

- Frontend React responsivo para desktop, tablet e mobile.
- Supabase Auth com login por e-mail e suporte a Google OAuth.
- Persistência real no Supabase quando as variáveis de ambiente estão configuradas.
- Fallback local com mocks e `localStorage` para desenvolvimento sem Supabase.
- Schema, policies RLS e seed de produção disponíveis no repositório.
- Deploy SPA preparado para Vercel.

## Funcionalidades

### Área pública

- Home com pets em destaque, ONGs parceiras e chamadas para adoção.
- Listagem de pets com busca, filtros e modos de visualização.
- Página de detalhes do pet com:
  - galeria de imagens horizontais;
  - informações de saúde, comportamento e rotina;
  - ONG responsável;
  - pets similares clicáveis;
  - favoritos;
  - denúncia de informações incorretas;
  - formulário de pré-adoção.
- Pedido de adoção persistido no Supabase e encaminhado ao WhatsApp da ONG.
- Proteção contra envios repetidos e botão com estado de carregamento.
- Listagem e perfil individual das ONGs.
- Google Maps para pets, ONGs, pet shops e serviços parceiros.
- Blog educativo e hub de utilidade pública.
- Política de Privacidade e Termos de Uso.

### Dashboard da ONG

- Cadastro, edição e exclusão de pets.
- Alteração do status entre disponível, em processo e adotado.
- Validação de imagens horizontais.
- Upload, preview e otimização de imagens em WebP.
- Campos avançados de saúde, vacinação, comportamento, adaptação, alimentação e rotina.
- Visualização dos pedidos de adoção vinculados à ONG.
- Atualização das informações da organização.

### Painel administrativo

- Visão geral de ONGs, pets, pedidos, perfis e denúncias.
- Aprovação, rejeição e bloqueio de ONGs.
- Moderação e remoção de pets.
- Visualização de perfis sem ONG vinculada.
- Tratamento de denúncias.

## Tecnologias

- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Supabase Auth, Database, Storage e RLS
- React Hook Form
- Zod
- TanStack Query
- Framer Motion
- Lucide React
- Playwright
- ESLint

## Como executar

Requisitos:

- Node.js 20 ou superior
- npm

```bash
npm install
npm run dev
```

O Vite normalmente disponibiliza o projeto em:

```text
http://localhost:5173
```

## Variáveis de ambiente

Use o arquivo `.env.example` como referência:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_ENABLE_SUPABASE_PARTNERS=false
```

### Observações

- Use somente a chave pública `anon` ou `publishable` do Supabase no frontend.
- Nunca exponha a chave `service_role`.
- Uma variável vazia em `.env.local` sobrescreve o valor existente em `.env`.
- `VITE_GOOGLE_MAPS_API_KEY` habilita o mapa interativo. Sem ela, o app utiliza o modo alternativo disponível.
- Mantenha `VITE_ENABLE_SUPABASE_PARTNERS=false` enquanto a tabela `partners` não estiver pronta no banco.

## Configuração do Supabase

No SQL Editor do projeto Supabase, execute os arquivos nesta ordem:

1. [`supabase-schema.sql`](./supabase-schema.sql)
2. [`docs/supabase-production-seed.sql`](./docs/supabase-production-seed.sql)

O schema cria ou atualiza:

- `profiles`
- `ongs`
- `pets`
- `adoption_requests`
- `reports`
- `partners`
- bucket `pet-images`
- funções privadas de autorização
- policies RLS

O seed adiciona:

- 3 ONGs da Bahia;
- 18 pets;
- 6 pets vinculados a cada ONG;
- imagens horizontais para pets e ONGs;
- relacionamento correto por `ong_id`.

As instruções completas de aplicação e as consultas de validação estão em:

[`docs/supabase-production-apply.md`](./docs/supabase-production-apply.md)

### Atualização do cache da API

Se o Supabase informar que uma coluna ou relacionamento não existe após executar o SQL:

```sql
notify pgrst, 'reload schema';
```

### Autenticação

Em **Authentication > URL Configuration**, configure:

```text
Site URL:
http://localhost:5173
https://seu-dominio.vercel.app

Redirect URLs:
http://localhost:5173/auth/callback
https://seu-dominio.vercel.app/auth/callback
```

Para Google Login:

1. Habilite Google em **Authentication > Providers**.
2. Configure o Client ID e o Client Secret.
3. No Google Cloud, autorize:

```text
https://SEU-PROJECT-REF.supabase.co/auth/v1/callback
```

## Regras de acesso

As policies RLS foram preparadas para garantir:

- visitante lê apenas ONGs aprovadas e pets públicos;
- visitante pode criar pedidos de adoção e denúncias;
- adotante não acessa dados administrativos;
- ONG visualiza seu próprio perfil e gerencia apenas os próprios pets;
- ONG visualiza somente pedidos vinculados aos seus pets;
- admin pode moderar ONGs, pets, perfis e denúncias.

Depois de aplicar uma alteração no schema, valide novamente as policies no projeto Supabase real.

## Imagens

- Pets aceitam somente imagens horizontais.
- O dashboard valida proporção, formato e tamanho.
- Em modo Supabase, os arquivos são enviados ao bucket `pet-images`.
- Em modo local, previews podem ser armazenados no navegador para desenvolvimento.
- ONGs utilizam `image_url` no banco.
- As três ONGs oficiais possuem fallback por `id`, evitando imagens quebradas enquanto o banco ainda não possui `image_url`.
- Se uma URL externa falhar, a interface exibe um placeholder visual em vez do ícone de imagem quebrada.

## Contas de desenvolvimento

As contas abaixo funcionam no fallback local. Também funcionam no Supabase quando os usuários e perfis correspondentes forem criados:

```text
Administrador
E-mail: admin@petfinder.local
Senha: admin123

ONG
E-mail: ong@petfinder.local
Senha: ong123
```

Perfis esperados:

```text
admin@petfinder.local -> role: admin
ong@petfinder.local   -> role: ong, ong_id: ong_salvador
```

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Home |
| `/pets` | Listagem de pets |
| `/pet/:id` | Detalhes e pré-adoção |
| `/ongs` | ONGs parceiras |
| `/ong/:id` | Perfil da ONG e seus animais |
| `/servicos` | Serviços parceiros |
| `/petshops` | Pet shops e mapa |
| `/blog` | Conteúdo educativo |
| `/governo` | Informações de utilidade pública |
| `/login` | Login |
| `/register` | Cadastro |
| `/auth/callback` | Retorno do OAuth |
| `/dashboard` | Painel protegido da ONG |
| `/admin` | Painel protegido do administrador |
| `/privacidade` | Política de Privacidade |
| `/termos` | Termos de Uso |

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Antes de publicar:

```bash
npm run lint
npm run build
```

## Deploy na Vercel

Configuração:

```text
Build command: npm run build
Output directory: dist
```

Cadastre na Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_ENABLE_SUPABASE_PARTNERS`

O `vercel.json` redireciona as rotas internas para `index.html`, permitindo atualizar diretamente páginas como `/pet/:id`, `/dashboard`, `/admin`, `/privacidade` e `/termos`.

## Documentação

- [`docs/documentacao-completa-petfinder.md`](./docs/documentacao-completa-petfinder.md)
- [`docs/roadmap-oficial-petfinder.md`](./docs/roadmap-oficial-petfinder.md)
- [`docs/supabase-production-apply.md`](./docs/supabase-production-apply.md)
- [`docs/supabase-production-seed.sql`](./docs/supabase-production-seed.sql)

## Segurança e privacidade

- Dados de pré-adoção são enviados somente à ONG responsável.
- O formulário informa sobre o envio dos dados por WhatsApp.
- Rotas privadas exigem autenticação e role apropriada.
- Permissões reais dependem da aplicação correta das policies RLS no Supabase.
- Chaves administrativas não devem ser incluídas no frontend ou no repositório.
