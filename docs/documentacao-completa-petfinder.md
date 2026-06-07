# Documentação Completa do Projeto PetFinder

Última análise: 7 de junho de 2026.

## 1. Visão Geral do Projeto

O PetFinder é uma aplicação web para adoção responsável de cães e gatos. A proposta do produto é conectar pessoas interessadas em adotar animais a ONGs e protetores que precisam divulgar pets resgatados, organizar informações básicas dos animais e receber pedidos iniciais de adoção.

O problema central que o sistema resolve é a falta de um fluxo digital simples, organizado e confiável para adoção. Em muitos processos reais, as informações ficam espalhadas em redes sociais, mensagens diretas, grupos de WhatsApp e planilhas internas. O PetFinder concentra a descoberta dos pets, os dados das ONGs, o contato com a organização responsável e um formulário inicial de pré-adoção.

O público-alvo é dividido em três grupos principais:

- Adotantes: pessoas que querem encontrar cães ou gatos disponíveis para adoção, filtrar por cidade, espécie, porte, idade e sexo, abrir detalhes do pet e iniciar contato com a ONG.
- ONGs e protetores: organizações que precisam cadastrar pets, editar informações, acompanhar pedidos recebidos e manter seus dados de contato atualizados.
- Administração da plataforma: responsável por acompanhar a operação geral, visualizar ONGs, pets, pedidos e perfis de usuários.

Atualmente o sistema funciona como um SaaS em fase de preparação: tem uma experiência pública navegável, painel de ONG, painel administrativo, integração preparada com Supabase, autenticação social com Google quando Supabase está configurado, fallback local via mocks/localStorage e deploy preparado para Vercel.

O funcionamento geral é:

1. O visitante entra no site e visualiza a landing page.
2. Ele acessa a listagem de pets.
3. Ele busca e filtra animais.
4. Ele abre a página de detalhes de um pet.
5. Ele envia um formulário de pré-adoção.
6. O sistema registra o pedido no Supabase ou localStorage.
7. O sistema abre o WhatsApp da ONG com uma mensagem estruturada.
8. A ONG usa o painel para gerenciar pets e pedidos.
9. O admin usa o painel administrativo para observar a operação.

## 2. Arquitetura do Projeto

O projeto é uma aplicação React com Vite. A arquitetura é client-side, baseada em rotas SPA, componentes reutilizáveis, services para acesso a dados e fallback local.

### Estrutura de Pastas

Estrutura principal:

```text
petfinder/
  src/
    App.jsx
    main.jsx
    index.css
    components/
      auth/
      features/
      layout/
      ui/
    context/
    data/
    hooks/
    pages/
    services/
    utils/
  docs/
  supabase-schema.sql
  vercel.json
  package.json
```

Responsabilidades:

- `src/App.jsx`: define as rotas, lazy loading das páginas e layout principal.
- `src/main.jsx`: ponto de entrada da aplicação React.
- `src/index.css`: estilos globais, Tailwind e classes utilitárias reutilizáveis.
- `src/components`: componentes visuais reutilizáveis.
- `src/pages`: telas completas acessadas por rota.
- `src/services`: camada de dados e integração com Supabase/localStorage.
- `src/context`: estado global de autenticação.
- `src/hooks`: hooks auxiliares, principalmente `useAuth`.
- `src/data`: dados mockados realistas usados no modo local.
- `src/utils`: validações compartilhadas.
- `supabase-schema.sql`: schema do banco e policies RLS.
- `vercel.json`: configuração de rotas para deploy SPA na Vercel.

### Organização dos Componentes

Os componentes ficam separados por finalidade:

- `components/layout`: estrutura persistente da aplicação, como `Header`, `Footer` e `MainLayout`.
- `components/ui`: elementos genéricos de interface, como `Logo`, `ScrollReveal` e `SkeletonCard`.
- `components/features`: componentes ligados ao domínio do produto, como `PetCard`.
- `components/auth`: componentes de autorização, como `ProtectedRoute`.

O `PetCard` é usado em várias telas para exibir resumo de animal com imagem, nome, raça, idade, localização, descrição, tags e link para adoção.

### Organização das Páginas

As páginas principais são:

- `/`: landing page.
- `/pets`: listagem de pets com busca, filtros e carregamento progressivo.
- `/pet/:id`: página de detalhes do pet.
- `/ongs`: listagem de ONGs parceiras.
- `/ong/:id`: perfil de uma ONG específica com seus animais.
- `/login`: login por email/senha e Google.
- `/auth/callback`: callback de autenticação OAuth.
- `/register` e `/registro`: cadastro de ONG.
- `/dashboard`: painel protegido da ONG.
- `/admin`: painel protegido de administração.
- `/caes`, `/gatos`, `/servicos`, `/sobre`, `/blog`, `/governo`, `/petshops`: páginas auxiliares ou institucionais.

As páginas são carregadas com `React.lazy` e `Suspense`, o que reduz o carregamento inicial e melhora a organização do bundle.

### Gerenciamento de Estado

O estado é dividido em três níveis:

- Estado local de componente: usado para filtros, formulários, abas, loading, erros e mensagens.
- Contexto global de autenticação: `AuthContext` mantém `user`, `isAuthenticated`, `isLoading`, `login`, `logout`, `register`, `loginGoogle` e `updateUser`.
- Persistência local/Supabase: services gravam e leem dados em Supabase quando configurado ou em `localStorage` quando não configurado.

Também há uso de `TanStack Query` na página de detalhe do pet para buscar pet e pets similares com cache básico e `staleTime`.

### Serviços

Os services centralizam a comunicação com dados:

- `supabaseClient.js`: cria o client Supabase se as variáveis existem.
- `storage.js`: encapsula chaves e operações de localStorage.
- `petService.js`: lista, normaliza, salva e remove pets.
- `ongService.js`: lista, normaliza e salva ONGs.
- `authService.js`: login local, login Supabase, Google OAuth, registro de ONG, logout e perfis.
- `adoptionService.js`: cria pedidos de adoção, monta mensagem e gera link WhatsApp.

Essa separação é importante porque a UI não precisa saber se os dados vieram do Supabase ou do fallback local.

### Mocks e localStorage

O arquivo `src/data/mockData.js` contém:

- 3 ONGs realistas da Bahia.
- 18 pets: 6 por ONG, sendo 3 cães e 3 gatos por organização.
- listas de opções de saúde para cães e gatos.
- opções de energia e compatibilidade.
- estatísticas e pets em destaque.

Quando Supabase não está configurado, o sistema usa `localStorage` para:

- `petfinder:pets`: pets locais.
- `petfinder:pets_seed_version`: versão do seed de pets.
- `petfinder:ongs`: ONGs locais.
- `petfinder:ongs_seed_version`: versão do seed de ONGs.
- `petfinder:adoption_requests`: pedidos de adoção.
- `petfinder:auth_user`: usuário autenticado local.
- `token`: token local de sessão.

As versões de seed evitam que dados mockados antigos continuem aparecendo indefinidamente depois de alterações no projeto.

### Fluxo de Dados

Fluxo público de pets:

```text
Pets.jsx
  chama listPets()
    se Supabase configurado: lê public.pets
    se Supabase ausente: lê localStorage ou mockData
  aplica filtros no client
  renderiza PetCard
```

Fluxo de detalhe:

```text
PetDetail.jsx
  usa useParams para obter id
  chama getPetById()
  normaliza pet para modelo de detalhe
  mostra galeria, dados, ONG, simulador, formulário e similares
```

Fluxo de adoção:

```text
AdoptionFormLocal
  valida dados com Zod/react-hook-form
  chama createAdoptionRequest()
    tenta Supabase
    se erro ou Supabase ausente: grava localStorage
  chama buildWhatsAppUrl()
  abre WhatsApp em nova janela
```

Fluxo de painel ONG:

```text
OngDashboard
  pega user do AuthContext
  identifica ongId
  chama listPets({ ongId }) e listAdoptionRequests({ ongId })
  permite criar, editar, excluir e alterar status de pets
  permite atualizar dados da ONG
```

## 3. Tecnologias Utilizadas

### React

React é a base da interface. O projeto usa componentes funcionais, hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) e contexto para autenticação. Ele foi escolhido por permitir uma interface modular e reutilizável.

### Vite

Vite é usado como ferramenta de build e servidor de desenvolvimento. Ele oferece inicialização rápida, hot reload e build otimizado para produção em `dist/`.

Scripts:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

### React Router

`react-router-dom` gerencia a navegação SPA. As rotas são definidas em `App.jsx`, com layout compartilhado e rotas protegidas para ONG/admin.

### Tailwind CSS

Tailwind é usado para estilização utilitária. O projeto tem um tema visual escuro, com classes para botões, cards, campos e formulário de adoção definidas em `index.css`.

### Supabase

Supabase é a fonte real de dados quando configurado. O projeto usa:

- Supabase Auth.
- Google OAuth.
- Tabelas `profiles`, `ongs`, `pets`, `adoption_requests`.
- Row Level Security.
- Policies para leitura pública e escrita protegida.

### React Hook Form e Zod

Usados para formulários e validação:

- login;
- cadastro de ONG;
- formulário de pré-adoção;
- simulador de match.

Zod define regras e mensagens; React Hook Form gerencia estado, erros e envio.

### TanStack Query

Usado na página de detalhes do pet para buscar dados e cachear resultados. Ele ajuda a separar estado de busca do estado visual.

### Framer Motion

Usado para animações suaves, como entrada de elementos, transições e feedback visual em algumas páginas.

### Lucide React

Biblioteca de ícones usada em botões, cards, navegação, painéis e estados visuais.

### Outras dependências

- `clsx` e `tailwind-merge`: composição de classes CSS.
- `date-fns`: disponível para manipulação de datas, embora não seja amplamente usada ainda.
- `@supabase/supabase-js`: client oficial Supabase.
- `eslint`: lint do projeto.
- `@playwright/test` e `vitest`: instalados, mas sem suíte de testes completa atualmente.

## 4. Funcionalidades do Sistema

### Landing Page

A landing page (`Home.jsx`) apresenta a proposta principal: adoção responsável e conexão direta com ONGs.

Ela contém:

- Hero escuro com headline principal.
- Texto de apoio explicando o PetFinder.
- Botão para buscar pets.
- Botão para entrar como ONG.
- Estatísticas de pets, ONGs e sucesso.
- Imagem principal de cachorro e gato.
- Seção de pets disponíveis com cards em destaque.
- Seção de benefícios com fluxo responsável e painel da ONG.

As chamadas para ação principais são:

- "Buscar pets", que leva para `/pets`.
- "Entrar como ONG", que leva para `/login`.
- "Ver todos", na seção de pets, que também leva para `/pets`.

### Listagem de Pets

A página `/pets` permite navegar pelos animais cadastrados.

Funcionalidades:

- Busca por nome.
- Filtro por cidade.
- Filtro por espécie.
- Filtro por porte.
- Filtro por idade.
- Filtro por sexo.
- Alternância entre grade e lista.
- Contador de resultados.
- Sincronização dos filtros com a URL via query params.
- Estado de carregamento com skeleton.
- Estado vazio.
- Carregamento progressivo de 12 em 12 itens.
- Infinite scroll usando `IntersectionObserver`.

Filtros usam os campos:

- `city`
- `species`
- `size`
- `ageType`
- `sex`
- `name`

O card do pet mostra:

- imagem horizontal;
- nome;
- raça e idade;
- cidade;
- descrição curta;
- tags principais;
- link "Quero adotar".

### Página do Pet

A página `/pet/:id` é a tela mais completa do produto.

Ela mostra:

- nome do pet;
- cidade;
- espécie;
- porte;
- idade;
- sexo;
- galeria de mídia;
- botão de zoom/tela cheia;
- dados gerais;
- status de saúde;
- vacinação;
- castração;
- compatibilidade com crianças, gatos e cães;
- personalidade;
- histórico;
- dados da ONG responsável;
- contato por WhatsApp;
- simulação de compartilhamento no Instagram;
- simulador de match;
- formulário de pré-adoção;
- pets similares.

O mapeamento do pet para detalhe é feito por `mapPetToDetail`, que transforma campos vindos de mock/Supabase no formato usado pela página.

### Simulador de Match

O simulador calcula uma pontuação simples com base em:

- se o adotante tem outros pets;
- quanto tempo passa em casa;
- espaço disponível;
- experiência com pets.

Ele aumenta ou reduz a pontuação conforme porte e temperamento do animal. O resultado é uma porcentagem com mensagem textual. É uma funcionalidade de experiência, não uma avaliação oficial ou veterinária.

### Formulário de Pré-Adoção

O formulário fica na página do pet.

Campos:

- nome completo;
- telefone/WhatsApp;
- bairro onde mora;
- casa preparada para receber o pet;
- precisa de dicas da ONG;
- já possui ou já teve animais.

Validação:

- nome mínimo de 2 caracteres;
- telefone mínimo de 8 caracteres;
- bairro mínimo de 2 caracteres;
- campos seletivos obrigatórios.

Ao enviar:

1. O formulário monta um objeto `request`.
2. `createAdoptionRequest()` monta a mensagem.
3. O pedido é salvo no Supabase, se possível.
4. Se Supabase falhar ou não existir, o pedido é salvo no localStorage.
5. O sistema gera a URL do WhatsApp com `buildWhatsAppUrl()`.
6. O WhatsApp abre com a mensagem estruturada.

Exemplo de mensagem:

```text
Ola! Tenho interesse em adotar o pet Thor.

Nome: Rebeca Machado
Telefone: 71994043159
Bairro: vila praiana
Minha casa esta preparada: Sim
Preciso de dicas da ONG: Sim
Já tive ou tenho outros animais: Sim
```

### ONGs Parceiras

A página `/ongs` lista ONGs parceiras.

Funcionalidades:

- carregamento via `listOngs()`;
- fallback local;
- cards clicáveis;
- imagem da ONG;
- cidade e bairro;
- descrição;
- quantidade de pets;
- indicação de WhatsApp;
- link para perfil da ONG.

A página `/ong/:id` mostra:

- hero da ONG;
- selo de ONG verificada;
- cidade e bairro;
- descrição;
- endereço;
- área atendida;
- responsável;
- ano de atuação;
- WhatsApp;
- e-mail;
- Instagram;
- botão "Falar com a ONG";
- estatísticas de pets disponíveis, em processo e adotados;
- grid dos animais daquela ONG;
- filtros por status dos pets.

### Dashboard da ONG

A rota `/dashboard` é protegida por `ProtectedRoute role="ong"`.

Abas:

- Visão Geral.
- Meus Pets.
- Adoções.
- Configurações.

Visão Geral:

- total de pets cadastrados;
- pets disponíveis;
- pets em processo;
- pets adotados;
- orientação para manter contatos atualizados.

Meus Pets:

- cadastro de pet;
- edição de pet;
- exclusão com confirmação;
- alteração de status;
- filtro por status;
- validação de imagem horizontal;
- formulário com dados de saúde, compatibilidade e energia.

Campos do cadastro/edição:

- nome;
- espécie;
- status;
- raça;
- idade;
- porte;
- sexo;
- personalidade;
- status de saúde;
- vacinação;
- castração;
- compatibilidade com crianças;
- compatibilidade com gatos;
- compatibilidade com cães;
- nível de energia;
- cidade;
- bairro;
- URL da foto;
- descrição.

O sistema aceita apenas imagens horizontais em JPG, PNG ou WEBP e tenta validar largura maior que altura carregando a imagem.

Adoções:

- lista pedidos recebidos;
- mostra nome do adotante;
- telefone;
- bairro;
- mensagem completa.

Configurações:

- permite atualizar dados básicos da ONG:
  - nome;
  - email;
  - WhatsApp;
  - cidade;
  - bairro;
  - descrição.

Observação: embora o perfil público da ONG tenha endereço, área atendida, responsável, ano e Instagram, o formulário de configurações da ONG ainda não edita todos esses campos.

### Login

A página `/login` oferece:

- login por email/senha;
- login com Google;
- mostrar/ocultar senha;
- validação com Zod;
- mensagens de erro;
- contas locais de teste quando Supabase não está configurado.

Contas locais:

```text
ONG: ong@petfinder.local / ong123
Admin: admin@petfinder.local / admin123
```

Fluxo com Supabase:

- email/senha usa `supabase.auth.signInWithPassword()`;
- Google usa `supabase.auth.signInWithOAuth({ provider: "google" })`;
- callback vai para `/auth/callback`;
- o usuário é redirecionado conforme role:
  - admin: `/admin`;
  - ong: `/dashboard`;
  - adopter: `/pets`.

Fluxo sem Supabase:

- autenticação é feita contra usuários mockados em `authService.js`;
- sessão é gravada no localStorage;
- `AuthContext` restaura a sessão ao carregar a aplicação.

Limitação importante: atualmente `Login.jsx` ainda espera que `login()` retorne `{ success, user }`, mas `AuthContext.login()` retorna o usuário diretamente. Isso é uma inconsistência funcional que deve ser corrigida para o login por email/senha funcionar de forma confiável.

### Cadastro de ONG

A página `/register` permite criar cadastro de ONG.

Campos:

- nome do responsável;
- nome da ONG;
- email;
- WhatsApp;
- senha;
- confirmação de senha;
- cidade;
- bairro;
- descrição.

Validação:

- nome e nome da ONG com mínimo de 3 caracteres;
- email válido;
- senha com pelo menos 8 caracteres;
- confirmação obrigatória;
- WhatsApp com mínimo de 10 caracteres;
- cidade obrigatória;
- confirmação de senha igual à senha.

Com Supabase:

- cria usuário em `auth.users`;
- cria ONG em `public.ongs`;
- cria/atualiza profile com role `ong` e vínculo `ong_id`.

Sem Supabase:

- cria ONG local;
- cria sessão local com role `ong`;
- redireciona para `/dashboard`.

### Admin

A rota `/admin` é protegida por `ProtectedRoute role="admin"`.

Funcionalidades existentes:

- visão geral operacional;
- contagem de ONGs;
- contagem de pets;
- contagem de pedidos de adoção;
- contagem de perfis sem ONG;
- lista de ONGs cadastradas;
- lista de pedidos recentes;
- lista de usuários e permissões.

O painel admin atualmente é mais observacional do que operacional. Ele não possui ainda edição avançada, aprovação manual de ONGs, bloqueio de usuários, moderação de pets ou auditoria.

### Persistência

O sistema opera em dois modos:

#### Modo Supabase

Quando `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` existem:

- pets são lidos/salvos na tabela `pets`;
- ONGs são lidas/salvas na tabela `ongs`;
- pedidos são salvos em `adoption_requests`;
- perfis são lidos em `profiles`;
- autenticação usa Supabase Auth.

#### Modo Local

Quando Supabase não está configurado:

- pets são carregados de mocks e gravados em `localStorage`;
- ONGs são carregadas de mocks e gravadas em `localStorage`;
- pedidos são salvos em `localStorage`;
- autenticação usa usuários mockados;
- sessões são salvas em `petfinder:auth_user` e `token`.

## 5. Fluxo do Usuário

### Usuário Comum

1. Entra no site pela landing page.
2. Lê a proposta do PetFinder.
3. Clica em "Buscar pets" ou acessa `/pets`.
4. Usa filtros de cidade, espécie, porte, idade, sexo ou busca por nome.
5. Visualiza cards de pets.
6. Clica em "Quero adotar".
7. Abre a página de detalhe do pet.
8. Analisa informações de saúde, compatibilidade, personalidade, histórico e ONG responsável.
9. Opcionalmente usa o simulador de match.
10. Preenche o formulário de pré-adoção.
11. Envia o formulário.
12. O sistema registra o pedido.
13. O WhatsApp abre com mensagem pronta para a ONG.
14. A continuidade do processo acontece fora da plataforma, via WhatsApp.

### ONG

1. Acessa `/login`.
2. Entra com conta local ou Supabase.
3. Se tiver role `ong`, acessa `/dashboard`.
4. Visualiza resumo dos pets.
5. Acessa "Meus Pets".
6. Cadastra novo pet ou edita pet existente.
7. Informa dados do animal, saúde, compatibilidade, imagem e descrição.
8. Altera status para disponível, em processo ou adotado.
9. Acompanha pedidos recebidos na aba "Adoções".
10. Atualiza dados básicos da ONG em "Configurações".

### Admin

1. Acessa `/login`.
2. Entra com conta admin.
3. Acessa `/admin`.
4. Visualiza métricas gerais.
5. Consulta ONGs cadastradas.
6. Consulta pedidos recentes.
7. Consulta usuários e roles.
8. Identifica perfis sem ONG vinculada.

## 6. Sistema de Dados

### Estrutura de ONG

Exemplo real do mock:

```js
{
  id: "ong_salvador",
  name: "Patinhas de Salvador",
  description: "ONG de resgate e adoção responsável atuando em Salvador no resgate de cães e gatos abandonados.",
  image: "https://images.unsplash.com/...",
  city: "Salvador",
  neighborhood: "Rio Vermelho",
  address: "Rua Conselheiro Pedro Luiz, 214 - Rio Vermelho, Salvador - BA",
  serviceArea: "Salvador, especialmente Brotas, Barra, Rio Vermelho, Ondina e Itapua",
  responsible: "Equipe Patinhas de Salvador",
  foundedAt: "2019",
  instagram: "@patinhasdesalvador",
  whatsapp: "(71) 99991-1201",
  phone: "(71) 99991-1201",
  email: "contato@patinhasdesalvador.org",
  petsCount: 6,
  adoptionsCount: 214,
  createdAt: "2024-01-10"
}
```

No Supabase, a tabela `ongs` possui:

- `id`
- `owner_user_id`
- `name`
- `email`
- `whatsapp`
- `city`
- `neighborhood`
- `address`
- `service_area`
- `responsible`
- `founded_at`
- `instagram`
- `description`
- `created_at`

### Estrutura de Pet

Exemplo real do mock:

```js
{
  id: "pet_salvador_thor",
  name: "Thor",
  species: "dog",
  breed: "Vira-lata caramelo",
  age: "3 anos",
  ageType: "adulto",
  size: "medio",
  sex: "macho",
  city: "Salvador",
  neighborhood: "Brotas",
  description: "Thor foi resgatado em uma area movimentada de Brotas. E alegre, atento e já esta acostumado com passeios curtos.",
  personality: "brincalhão e leal",
  healthStatus: "vacinado",
  vaccinated: true,
  castrated: true,
  childrenCompatibility: "boa",
  catsCompatibility: "precisa de apresentacao gradual",
  dogsCompatibility: "boa",
  energyLevel: "medio",
  image: dogImages[0],
  ong: "Patinhas de Salvador",
  ong_id: "ong_salvador",
  status: "available"
}
```

Status possíveis:

- `available`: disponível.
- `in_process`: em processo.
- `adopted`: adotado.

Espécies:

- `dog`
- `cat`

Portes:

- `pequeno`
- `medio`
- `grande`

Idades:

- `filhote`
- `adulto`
- `idoso`

### Saúde

O sistema tem opções reutilizáveis por espécie.

Cães:

- saudável;
- vermifugado;
- vacinado;
- castrado;
- em tratamento contra doença do carrapato;
- histórico de sarna tratada;
- pele sensível;
- dermatite leve;
- alergia alimentar;
- ansiedade por abandono;
- muito assustado no início;
- precisa ganhar peso;
- otite leve;
- precisa de adaptação com outros cães;
- idoso;
- baixa visão.

Gatos:

- saudável;
- vermifugado;
- vacinado;
- castrado;
- FIV positivo;
- FELV positivo;
- histórico de esporotricose tratada;
- sensibilidade alimentar;
- muito tímido;
- ansiedade por abandono;
- problema respiratório leve;
- infecção ocular tratada;
- precisa de ambiente calmo;
- idoso.

### Estrutura do Pedido de Adoção

```js
{
  id: "adoption_...",
  pet_id: "pet_salvador_thor",
  ong_id: "ong_salvador",
  adopter_name: "Rebeca Machado",
  adopter_phone: "71994043159",
  adopter_neighborhood: "vila praiana",
  home_prepared: "Sim",
  needs_guidance: "Sim",
  has_or_had_pets: "Sim",
  message: "Ola! Tenho interesse em adotar...",
  created_at: "2026-06-07T..."
}
```

No Supabase, a tabela `adoption_requests` replica esses campos.

### Estrutura de Perfil

No Supabase, `profiles` controla autorização:

- `id`: UUID do usuário em `auth.users`.
- `name`.
- `email`.
- `role`: `adopter`, `ong` ou `admin`.
- `ong_id`: vínculo com ONG.
- `created_at`.

Usuários Google novos entram como `adopter` sem acesso ao dashboard ou admin, a menos que o perfil seja atualizado.

## 7. Responsividade

O projeto usa Tailwind com classes responsivas.

### Desktop

No desktop, o layout favorece:

- grids de 3 colunas para pets e ONGs;
- hero com duas colunas;
- painel da ONG com sidebar lateral;
- página de detalhe com coluna principal e aside de ONG/formulário;
- filtros horizontais na listagem.

### Tablet

Em telas intermediárias:

- grids reduzem para 2 colunas;
- filtros quebram linha;
- cards mantêm proporção horizontal;
- painel da ONG reorganiza elementos.

### Mobile

No mobile:

- layout fica em coluna única;
- filtros empilham;
- cards ocupam largura total;
- sidebar do dashboard vira navegação superior/empilhada;
- botões ficam mais largos;
- formulário de adoção usa grid de uma coluna quando necessário.

Limitação: a responsividade foi trabalhada em classes, mas não há uma suíte automática de testes visuais em 360px, 390px, 768px e desktop.

## 8. UX/UI

### Decisões Visuais

O produto usa tema escuro, com:

- fundo em slate/azul escuro;
- azul como cor principal de ação;
- verde para adoção/WhatsApp/sucesso;
- vermelho para erros;
- amarelo para avisos;
- cards com borda discreta;
- botões arredondados;
- ícones Lucide para reforçar significado.

### Experiência do Usuário

O fluxo público é direto:

- procurar pet;
- abrir detalhes;
- preencher dados mínimos;
- falar com ONG.

O sistema evita exigir login do adotante para iniciar pré-adoção, o que reduz atrito.

### Feedback Visual

Existem estados de:

- carregamento;
- erro;
- vazio;
- sucesso;
- confirmação destrutiva ao excluir pet;
- loading em botões de login/cadastro.

### Navegação

A navegação principal fica no `Header`, com links para:

- Pets;
- ONGs;
- Serviços;
- Login.

O `MainLayout` envolve páginas públicas com header e footer.

### Acessibilidade

Pontos positivos:

- botões com `aria-label` em ações de editar/remover;
- inputs com labels;
- contraste geralmente alto;
- uso de semântica básica de `main`, `section`, `article`, `header`;
- link de pular para conteúdo principal na página do pet.

Pontos a melhorar:

- padronizar acentos e textos com encoding correto em todos os arquivos;
- validar navegação por teclado em modais e menus;
- garantir foco visível em todos os elementos interativos;
- revisar nomes acessíveis de botões de ícone;
- testar leitores de tela.

## 9. Problemas e Limitações Atuais

Esta é uma análise honesta do estado atual.

### Login por Email/Senha tem Inconsistência

`Login.jsx` espera um retorno no formato `{ success, user }`, mas `AuthContext.login()` retorna diretamente o usuário autenticado. Isso pode quebrar o fluxo de login por credenciais. O correto seria ajustar `Login.jsx` para tratar o usuário retornado diretamente ou padronizar o service para retornar `{ success, user }`.

### Encoding ainda aparece quebrado em alguns arquivos

Apesar de parte do projeto já ter sido corrigida, `Pets.jsx` ainda contém textos com mojibake como `Disponíveis`, `Adoção`, `espécies` e outros. Isso precisa ser corrigido em todo o projeto antes de produção.

### Supabase está preparado, mas não totalmente operacional sem configuração externa

O schema existe, RLS existe e o client está pronto, mas o produto depende de:

- projeto Supabase real;
- variáveis de ambiente;
- Google Provider configurado;
- URLs de callback autorizadas;
- usuários/perfis com roles corretas;
- dados reais migrados.

### Upload de Imagens não existe

Hoje os pets usam URL de imagem. O dashboard valida se a imagem é horizontal, mas não oferece upload para Storage. Isso limita o uso real por ONGs.

### Admin é Observacional

O admin lista dados, mas ainda não executa ações críticas, como:

- aprovar ONG;
- vincular usuário a ONG;
- alterar roles;
- moderar pets;
- remover conteúdo;
- auditar pedidos.

### Fluxo de Adoção Ainda é Parcial

O formulário abre WhatsApp e registra pedido, mas não existe:

- status do pedido;
- aprovação/reprovação;
- entrevista;
- termo de responsabilidade;
- histórico por adotante;
- notificação para ONG;
- confirmação de adoção.

### Sem Favoritos

Favoritos foram removidos do produto atual. Não há persistência de favoritos para visitantes ou usuários autenticados.

### Sem Chat Interno

Contato acontece via WhatsApp. Isso é simples e realista para v1, mas limita rastreabilidade.

### Sem Testes Automatizados Reais

Há dependências de Vitest e Playwright, mas não há suíte robusta cobrindo:

- filtros;
- login;
- criação de pet;
- envio de adoção;
- RLS;
- responsividade;
- regressão visual.

### Dependências não usadas

Algumas dependências parecem instaladas mas pouco ou nada usadas no código atual, como `axios`, `zustand`, `swiper`, `use-debounce`, `react-icons`, `msw`, `vitest` e Playwright. Isso aumenta bundle/complexidade potencial e deve ser revisado.

### Dados Mockados e Dados Reais Podem Divergir

O normalizador tenta aproximar campos de mock, localStorage e Supabase. Ainda assim, há risco de divergência entre nomes camelCase e snake_case, principalmente em campos novos.

### Escalabilidade

No modo local e em algumas telas, filtros são feitos no client após carregar todos os pets. Para escala maior, filtros e paginação deveriam ocorrer no banco.

### Segurança

As policies Supabase melhoram segurança, mas ainda é necessário validar:

- se todas as policies funcionam com usuários reais;
- se roles não podem ser autoatribuídas indevidamente;
- se inserts públicos de adoção precisam de rate limiting;
- se dados sensíveis dos adotantes estão protegidos;
- se o admin tem acesso controlado.

## 10. Melhorias Futuras

### Backend Real com Supabase

Prioridade alta:

- configurar projeto Supabase real;
- aplicar `supabase-schema.sql`;
- configurar Google OAuth;
- criar dados iniciais;
- criar perfis admin e ONG;
- validar RLS manualmente.

### Autenticação Real e Aprovação

Melhorias:

- corrigir bug do login;
- implementar fluxo de aprovação de ONG;
- permitir admin vincular usuário a ONG;
- separar cadastro público de ONG de aprovação operacional;
- melhorar recuperação de senha.

### Upload de Imagens

Usar Supabase Storage para:

- upload de fotos dos pets;
- upload de imagens da ONG;
- validação de proporção horizontal antes do upload;
- compressão e preview;
- remoção segura de imagens antigas.

### Painel Avançado da ONG

Adicionar:

- edição completa de dados da ONG;
- gerenciamento de pedidos por status;
- histórico de atendimento;
- observações internas;
- exportação de contatos;
- dashboard com métricas por período.

### Sistema Completo de Adoção

Adicionar:

- etapas do pedido;
- entrevista;
- aprovação;
- termo de responsabilidade;
- confirmação de adoção;
- acompanhamento pós-adoção;
- notificações automáticas.

### Notificações

Possibilidades:

- email para ONG ao receber pedido;
- WhatsApp automático via provedor aprovado;
- aviso para admin sobre novas ONGs;
- lembretes para atualização de pets.

### Favoritos

Reintroduzir favoritos como recurso futuro:

- localStorage para visitantes;
- Supabase para usuários autenticados;
- lista de pets favoritos;
- compartilhamento de favoritos.

### Chat Interno

Um chat interno permitiria:

- histórico centralizado;
- mensagens entre ONG e adotante;
- moderação;
- indicadores de resposta.

### Analytics

Adicionar:

- pets mais visualizados;
- taxa de conversão detalhe/formulário;
- cidades com maior demanda;
- ONGs com mais pedidos;
- funil de adoção.

### Testes

Criar:

- testes unitários para services;
- testes de integração para login e adoção;
- testes E2E com Playwright;
- testes de RLS com usuários Supabase;
- testes visuais responsivos.

### Deploy em Produção

Melhorias:

- configurar Vercel;
- configurar domínio;
- configurar variáveis;
- habilitar analytics;
- revisar headers de segurança;
- monitorar logs;
- criar rotina de backup.

## 11. Preparação para Deploy

### Vercel

O projeto está preparado para deploy na Vercel como SPA Vite.

Configuração esperada:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

O arquivo `vercel.json` contém rewrite:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Isso permite acessar diretamente rotas como:

- `/pet/pet_salvador_thor`
- `/dashboard`
- `/admin`
- `/ong/ong_salvador`

sem erro de refresh.

### Variáveis de Ambiente

Necessárias para Supabase:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Essas variáveis devem existir:

- localmente em `.env`;
- na Vercel em Environment Variables;
- nos ambientes Preview e Production, conforme necessidade.

Nunca usar `service_role` no frontend.

### Build

O build gera arquivos estáticos em `dist/`.

Comando:

```bash
npm run build
```

### Lint

Comando:

```bash
npm run lint
```

O lint atual passa, mas não cobre problemas visuais, problemas de negócio ou inconsistências de retorno como a do login.

### Supabase

Passos de preparação:

1. Criar projeto Supabase.
2. Rodar `supabase-schema.sql`.
3. Configurar Google Provider.
4. Adicionar callbacks:

```text
http://localhost:5173/auth/callback
https://seu-dominio.vercel.app/auth/callback
```

5. Criar usuário admin.
6. Atualizar `profiles.role` para `admin`.
7. Criar/vincular ONGs.
8. Validar RLS com usuários reais.

## 12. Resultado Atual do Sistema

O PetFinder atualmente é um MVP/SaaS v1 em estágio avançado de interface e preparação técnica.

Ele já possui:

- landing page funcional;
- listagem de pets;
- filtros e busca;
- dados mockados realistas da Bahia;
- página detalhada do pet;
- formulário de pré-adoção;
- integração com WhatsApp;
- registro de pedidos;
- listagem e perfil de ONGs;
- dashboard de ONG;
- painel admin;
- autenticação local;
- integração Supabase preparada;
- Google OAuth preparado;
- RLS no schema;
- deploy SPA preparado para Vercel.

Ele ainda precisa, antes de uso real em produção:

- corrigir inconsistência do login;
- corrigir todos os textos com encoding quebrado;
- configurar Supabase real;
- validar RLS;
- implementar upload de imagens;
- completar admin operacional;
- completar fluxo de adoção;
- criar testes automatizados;
- revisar dependências não usadas;
- validar responsividade visual em múltiplos tamanhos.

## 13. Resumo Técnico Executivo

O PetFinder tem uma arquitetura adequada para um MVP de SaaS: React/Vite no frontend, services desacoplados, fallback local para desenvolvimento, schema Supabase para produção e rotas protegidas por role. A aplicação já demonstra o fluxo principal de valor: encontrar pets, entender detalhes, falar com a ONG e permitir que ONGs gerenciem animais.

O maior risco atual não é a interface pública, mas a transição para produção real: autenticação, roles, RLS, upload de imagens, gestão de dados sensíveis e fluxo completo de adoção precisam ser fechados com rigor. A base está boa para evoluir, mas ainda não deve ser tratada como produto pronto para operação pública sem essas correções.
