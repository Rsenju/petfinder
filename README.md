# PetFinder

Plataforma web para adocao responsavel de caes e gatos, conectando ONGs/protetores a pessoas interessadas em adotar.

O projeto funciona localmente com `localStorage` e esta preparado para evoluir para Supabase sem espalhar chamadas de banco pelos componentes.

## Ambientes

- Producao Vercel: https://petfinder-six.vercel.app/
- Repositorio GitHub: https://github.com/Rsenju/petfinder
- Supabase URL: https://yfbewvcyxlnwxqlvzmic.supabase.co

## Funcionalidades

- Home com pets em destaque e chamadas para adocao.
- Listagem de pets com busca, filtros e estado vazio.
- Pagina de detalhes com informacoes do pet, ONG e formulario de pre-adocao.
- Envio do pedido para o WhatsApp da ONG com mensagem estruturada.
- Login local para ONG e administrador.
- Painel da ONG com cadastro, edicao, remocao e status dos pets.
- Edicao de dados da ONG, incluindo WhatsApp, cidade e bairro.
- Painel administrativo com visao geral de ONGs, pets e pedidos.
- Persistencia local por `localStorage`.
- Preparacao para Vercel e Supabase.

## Tecnologias

React, Vite, React Router, Tailwind CSS, React Hook Form, Zod, TanStack Query, Framer Motion e Lucide React.

## Como Rodar

```bash
npm install
npm run dev
```

Depois acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Contas de Teste

ONG:

```text
email: ong@petfinder.local
senha: ong123
```

Administrador:

```text
email: admin@petfinder.local
senha: admin123
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Variaveis de Ambiente

Copie `.env.example` para `.env` quando for conectar ao Supabase:

```env
VITE_SUPABASE_URL=https://yfbewvcyxlnwxqlvzmic.supabase.co
VITE_SUPABASE_ANON_KEY=
```

Sem essas variaveis, o app usa dados mockados e `localStorage`.

## Supabase

A camada de servico fica em `src/services`:

- `supabaseClient.js`: cliente REST usando `import.meta.env`.
- `petService.js`: listagem, detalhe, cadastro, edicao e remocao de pets.
- `ongService.js`: listagem e atualizacao de ONGs.
- `authService.js`: sessao local e contas de teste.
- `adoptionService.js`: pedidos de adocao e URL de WhatsApp.

O schema inicial esta em `supabase-schema.sql` e cria `ongs`, `pets` e `adoption_requests` com RLS, grants e policies basicas.

Para ativar o modo Supabase em producao:

1. Abra o SQL Editor do projeto `yfbewvcyxlnwxqlvzmic`.
2. Execute o conteudo de `supabase-schema.sql`.
3. Copie a chave publica anon/publishable do Supabase.
4. Configure na Vercel:

```env
VITE_SUPABASE_URL=https://yfbewvcyxlnwxqlvzmic.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica
```

## Deploy na Vercel

Configuracao esperada:

- Build command: `npm run build`
- Output directory: `dist`

O `vercel.json` inclui rewrite para SPA e evita erro ao atualizar rotas internas.

## Fluxo Principal

1. Usuario acessa `/pets`.
2. Filtra ou busca um pet.
3. Abre `/pet/:id`.
4. Preenche o formulario de pre-adocao.
5. O pedido e salvo localmente ou no Supabase configurado.
6. O WhatsApp da ONG abre com nome, telefone, bairro, pet, cidade e respostas do adotante.

## Observacoes de Producao

- Nao coloque chaves reais no codigo.
- Use apenas `VITE_SUPABASE_ANON_KEY` no frontend.
- Antes de producao, troque as contas locais por Supabase Auth.
- Ajuste as policies para que cada ONG gerencie apenas seus proprios pets.
