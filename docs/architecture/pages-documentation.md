# 📁 Documentação - Pasta `pages/`

> Componentes de páginas do PetFinder - Interface de usuário e fluxos de navegação

---

## 📋 Feature List

```bash
pages/
├── 📰 Blog.jsx              # Blog com dicas e guias para tutores
├── 🏛️ CadastroOng.jsx       # Formulário multi-step de cadastro de ONG
├── 🐕 Caes.jsx              # Listagem de cães para adoção
├── 🐈 Gatos.jsx             # Listagem de gatos para adoção
├── ⚖️ Government.jsx        # Direitos dos animais e canais de denúncia
├── 🏠 Home.jsx              # Landing page com hero e destaques
├── 🔐 Login.jsx             # Tela de autenticação com social login
├── 📊 OngDashboard.jsx      # Dashboard administrativo de ONG
├── 🏛️ OngProfile.jsx        # Perfil público detalhado da ONG
├── 🏛️ Ongs.jsx              # Listagem e busca de ONGs parceiras
├── 🐾 PetDetail.jsx         # Perfil completo do pet com match e adoção
├── 🔍 Pets.jsx              # Listagem filtrável de pets (infinite scroll)
├── 🛍️ PetShops.jsx          # Diretório de pet shops parceiros
├── 📝 Register.jsx          # Cadastro de usuário multi-step com verificação
├── 🛠️ Servicos.jsx          # Catálogo de serviços oferecidos
└── ℹ️ Sobre.jsx             # Página institucional sobre a plataforma
```

```bash
Resumo de Implementação
├── Blog           ✅ Implementado    → Blog.jsx
├── CadastroOng    ✅ Implementado    → CadastroOng.jsx
├── Caes           ✅ Implementado    → Caes.jsx
├── Gatos          ✅ Implementado    → Gatos.jsx
├── Government     ✅ Implementado    → Government.jsx
├── Home           ✅ Implementado    → Home.jsx
├── Login          ✅ Implementado    → Login.jsx
├── OngDashboard   ✅ Implementado    → OngDashboard.jsx
├── OngProfile     ✅ Implementado    → OngProfile.jsx
├── Ongs           ✅ Implementado    → Ongs.jsx
├── PetDetail      ✅ Implementado    → PetDetail.jsx
├── Pets           ✅ Implementado    → Pets.jsx
├── PetShops       ✅ Implementado    → PetShops.jsx
├── Register       ✅ Implementado    → Register.jsx
├── Servicos       ✅ Implementado    → Servicos.jsx
└── Sobre          ✅ Implementado    → Sobre.jsx
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                   Pages Layer                           │
├─────────────────────────────────────────────────────────┤
│  Cada página é um componente de rota que:             │
│  ├── Gerencia estado local (filtros, formulários)       │
│  ├── Consome hooks customizados (usePets, useOngs)      │
│  ├── Renderiza seções modulares                         │
│  └── Integra com React Router (useParams, navigate)     │
├─────────────────────────────────────────────────────────┤
│  Padrões Comuns:                                        │
│  ├── mockData para desenvolvimento                      │
│  ├── Framer Motion para animações                       │
│  ├── Tailwind + clsx para estilização condicional       │
│  └── Zod + react-hook-form para validação               │
└─────────────────────────────────────────────────────────┘
```

### Page Pattern
```bash
Standard Page Structure
├── Imports (React, Router, Hooks, Icons, Components)
├── Component Function
│   ├── Estados (useState para UI local)
│   ├── Hooks (usePets, useOngs, useSearchParams)
│   ├── Efeitos (useEffect para side effects)
│   ├── Handlers (callbacks de eventos)
│   └── Retorno: JSX com sections semanticas
└── Export default
```

---

## 🗂️ File Structure

```bash
src/pages/
├── Blog.jsx              # Blog educacional
├── CadastroOng.jsx       # Cadastro de ONG (3 steps)
├── Caes.jsx              # Cães para adoção
├── Gatos.jsx             # Gatos para adoção
├── Government.jsx        # Proteção animal
├── Home.jsx              # Landing page
├── Login.jsx             # Autenticação
├── OngDashboard.jsx      # Dashboard ONG
├── OngProfile.jsx        # Perfil público ONG
├── Ongs.jsx              # Lista de ONGs
├── PetDetail.jsx         # Detalhes do pet
├── Pets.jsx              # Busca de pets
├── PetShops.jsx          # Pet shops
├── Register.jsx          # Cadastro usuário
├── Servicos.jsx          # Serviços
└── Sobre.jsx             # Sobre nós
```

---

## 💻 Code Documentation

### `Blog.jsx` - Blog Educativo

**Purpose**: Portal de conteúdo educacional com artigos categorizados sobre cuidados com pets.

**📡 State Definitions**:

```bash
Estados
├── selectedCategory: string  # Categoria ativa ("Todos" | "Adoção" | "Saúde" | ...)
└── filteredPosts: array      # Posts filtrados por categoria (computed)
```

**⚙️ Data Structure**:

```bash
blogPosts: array
├── id: number
├── title: string           # Título do artigo
├── excerpt: string         # Resumo
├── icon: LucideIcon        # Ícone representativo
├── category: string        # Categoria para filtro
└── color: string            # Classes Tailwind para badge colorido

categories: array            # ["Todos", "Adoção", "Alimentação", ...]
```

**🔄 Filter Logic**:

```javascript
const filteredPosts = selectedCategory === "Todos" 
  ? blogPosts 
  : blogPosts.filter(post => post.category === selectedCategory);
```

**💡 Usage Example**:

```javascript
// Rota: /blog
// Não requer autenticação
// Componentes utilizados: Ícones do Lucide React
```

---

### `CadastroOng.jsx` - Cadastro de ONG Multi-step

**Purpose**: Formulário wizard de 3 etapas para cadastro de novas ONGs na plataforma.

**📡 State Definitions**:

```bash
Estados
├── step: number                    # Etapa atual (1-3)
├── formData: object                # Dados acumulados do formulário
│   ├── nome, cnpj, email, telefone
│   ├── endereco, cidade, estado, cep
│   ├── descricao, website, logo
├── errors: object                   # Erros de validação por campo
└── success: boolean                 # Flag de conclusão
```

**⚙️ Methods**:

```bash
validateStep(currentStep)
├── Valida campos obrigatórios da etapa atual
├── Retorna boolean (true = válido)
└── Seta errors state se inválido

handleNext()
├── Chama validateStep(step)
├── Se válido: incrementa step
└── Se inválido: mantém na etapa atual

handleBack()
└── Decrementa step (mínimo 1)

handleChange(e)
├── Atualiza formData[name] = value
└── Limpa error do campo modificado

handleFileChange(e)
└── Atualiza formData.logo com File object

handleSubmit(e)
├── Converte formData para FormData (multipart)
├── Chama createOng(ongData) do hook
├── Em sucesso: setSuccess(true) + redirect
└── Em erro: setErrors({ submit: message })
```

**🔄 Step Flow**:

```bash
Step 1: Dados da ONG
├── Nome (obrigatório)
├── CNPJ (obrigatório)
├── Email (obrigatório)
└── Telefone (obrigatório)

Step 2: Endereço
├── Endereço completo (obrigatório)
├── Cidade (obrigatório)
├── Estado (obrigatório)
└── CEP (obrigatório)

Step 3: Sobre a ONG
├── Descrição (obrigatório, min 50 chars)
├── Website (opcional)
└── Logo upload (opcional, max 5MB)
```

**💡 Usage Example**:

```javascript
import { CadastroOng } from '../pages/CadastroOng';
import { useOngs } from '../hooks/useOngs';

// Rota: /cadastro-ong
// Requer: useOngs provider
// Redireciona para: /ongs após sucesso
```

---

### `Caes.jsx` - Listagem de Cães

**Purpose**: Página dedicada à listagem de cães disponíveis para adoção com filtros.

**📡 State Definitions**:

```bash
Estados
├── searchTerm: string        # Filtro por nome/raça
└── selectedSize: string     # Filtro por porte ("Todos" | "Pequeno" | "Médio" | "Grande")
```

**⚙️ Filter Logic**:

```bash
filteredDogs (computed)
├── matchesSearch: name.toLowerCase().includes(searchTerm) 
│                  OR breed.toLowerCase().includes(searchTerm)
├── matchesSize: selectedSize === "Todos" OR size === selectedSize
└── Retorna: intersection de ambos
```

**📊 Mock Data Structure**:

```bash
mockDogs: array
├── id: number
├── name: string
├── breed: string
├── age: string
├── location: string
├── image: string (URL Unsplash)
├── tags: array[string]       # ["Brincalhão", "Castrado", ...]
└── size: string               # "Pequeno" | "Médio" | "Grande"
```

**💡 Usage Example**:

```javascript
// Rota: /caes
// Componentes: PetCard (shared), ícones Dog/Search/Filter
// Integração: mockData local (substituir por API em produção)
```

---

### `Gatos.jsx` - Listagem de Gatos

**Purpose**: Página dedicada à listagem de gatos disponíveis para adoção.

**📡 State Definitions**:

```bash
Estados
└── searchTerm: string        # Filtro por nome/raça
```

**⚙️ Filter Logic**:

```bash
filteredCats (computed)
└── name.toLowerCase().includes(searchTerm) 
    OR breed.toLowerCase().includes(searchTerm)
```

**📊 Mock Data Structure**:

```bash
mockCats: array
├── id: number
├── name: string
├── breed: string
├── age: string
├── location: string
├── image: string (URL Unsplash)
├── tags: array[string]
└── size: string               # Sempre "Pequeno" para gatos
```

**💡 Usage Example**:

```javascript
// Rota: /gatos
// Design: Header com ícone Cat rosa (bg-pink-500/20)
// Simplificado: Apenas busca por texto (sem filtro de porte)
```

---

### `Government.jsx` - Direitos dos Animais

**Purpose**: Página informativa sobre leis de proteção animal e canais de denúncia.

**📡 Data Structure**:

```bash
services: array               # Cards de ação rápida
├── id: number
├── title: string             # "Denunciar maus-tratos", "Castração gratuita"...
├── description: string
├── icon: LucideIcon
├── action: string            # Texto do CTA
├── color: string             # Classes Tailwind
├── phone?: string            # Opcional (para denúncias)
└── org?: string              # Órgão responsável

laws: array                   # Legislação vigente
├── title: string             # Nome da lei
├── description: string       # Resumo
└── penalty: string           # Pena aplicável

contacts: array               # Canais de denúncia
├── name: string              # "IBAMA", "Polícia Civil"...
├── phone: string
└── description: string
```

**🔄 Render Sections**:

```bash
Layout
├── Hero (título + descrição)
├── Grid de serviços (4 cards)
├── Seção de leis (3 cards com alerta de penalidade)
├── Banner de contatos (gradiente + grid)
└── Passo a passo de como denunciar (4 steps)
```

**💡 Usage Example**:

```javascript
// Rota: /government
// Tipo: Página estática informativa
// Destaque: Card de denúncia com telefone 0800 em destaque
```

---

### `Home.jsx` - Landing Page

**Purpose**: Página inicial com hero animado, estatísticas, pets em destaque e depoimentos.

**📡 State Definitions**:

```bash
Estados
├── isLoading: boolean         # Simula carregamento de pets
└── selectedCity: string        # Filtro prévio no hero ("" | "salvador" | "lauro")
```

**⚙️ Hooks**:

```bash
useScroll() (Framer Motion)
├── scrollY: number             # Posição Y do scroll
├── heroY: transform            # Parallax do hero (0 -> 150px)
└── heroOpacity: transform      # Fade out (1 -> 0)

useEffect (mount)
└── setTimeout 1000ms para simular loading
```

**🔄 Sections**:

```bash
Home Layout
├── Hero Section (full height)
│   ├── Background decorativo (blur circles)
│   ├── Título animado (gradient text)
│   ├── Busca por cidade (select)
│   ├── Stats cards flutuantes
│   └── Scroll indicator animado
├── Como Funciona (3 features)
├── Pets em Destaque (grid 6 pets)
│   ├── Skeleton loading
│   └── PetCard components
├── Depoimentos (TestimonialsSlider)
└── CTA Final (cadastro de ONG)
```

**💡 Usage Example**:

```javascript
// Rota: / (index)
// Animações: Framer Motion (parallax, stagger, float)
// Dados: featuredPets, stats, testimonials (mockData)
// Responsivo: Mobile-first com breakpoints md/lg
```

---

### `Login.jsx` - Autenticação

**Purpose**: Tela de login com autenticação tradicional e social login (preparado).

**📡 State Definitions**:

```bash
Estados
├── showPassword: boolean       # Toggle visibilidade senha
├── isLoading: boolean         # Estado de submit
└── loginError: string         # Mensagem de erro
```

**⚙️ Form Handling**:

```bash
react-hook-form + zod
├── resolver: zodResolver(loginSchema)
├── mode: 'onBlur'             # Valida ao perder foco
├── register('email')          # Input binding
├── register('password')
└── handleSubmit(onSubmit)

onSubmit(data)
├── setIsLoading(true)
├── Simula API (setTimeout 1500ms)
├── Teste: email === 'erro@teste.com' → throw Error
├── Sucesso: navigate('/')
└── Erro: setLoginError(message)
```

**🔄 UI Flow**:

```bash
Layout Split
├── Lado Esquerdo (branding)
│   ├── Logo animada (spring)
│   ├── Título "Bem-vindo ao PetFinder"
│   ├── Imagem de pets
│   └── Stats (500+ adotados, 50+ ONGs, 2 cidades)
└── Lado Direito (formulário)
    ├── Header "Acesse sua conta"
    ├── Error alert (condicional)
    ├── Input email (com ícone Mail)
    ├── Input password (com toggle Eye/EyeOff)
    ├── Link "Esqueceu senha?"
    ├── Botão Entrar (loading spinner)
    └── Link para registro
```

**💡 Usage Example**:

```javascript
// Rota: /login
// Validação: loginSchema (zod) - email válido, senha min 6 chars
// Dica de teste: usar 'erro@teste.com' para simular erro
```

---

### `OngDashboard.jsx` - Dashboard Administrativo

**Purpose**: Interface administrativa para ONGs gerenciarem pets, adoções e configurações.

**📡 State Definitions**:

```bash
Estados
├── activeTab: string          # "overview" | "pets" | "adoptions" | "settings"
└── isMobileMenuOpen: boolean  # Toggle menu mobile
```

**⚙️ Props**:

```bash
OngDashboard({ ongData, children })
├── ongData: object            # Dados da ONG logada
│   ├── nome, logo
│   ├── petsCount, adoptionsCount
│   ├── monthlyViews, pendingRequests
└── children?: node            # Conteúdo customizado (opcional)
```

**🔄 Tab System**:

```bash
menuItems: array
├── { id: "overview", label: "Visão Geral", icon: LayoutDashboard }
├── { id: "pets", label: "Meus Pets", icon: PawPrint }
├── { id: "adoptions", label: "Adoções", icon: Users }
└── { id: "settings", label: "Configurações", icon: Settings }

renderContent()
├── switch(activeTab)
│   case "overview": → OverviewTab
│   case "pets": → PetsTab
│   case "adoptions": → AdoptionsTab
│   case "settings": → SettingsTab
└── default: OverviewTab
```

**📊 Sub-components**:

```bash
OverviewTab
├── Stats cards (4 métricas)
│   ├── Pets Cadastrados (blue)
│   ├── Adoções Realizadas (green)
│   ├── Visualizações/Mês (purple)
│   └── Solicitações Pendentes (yellow)
└── Grid 2 cols: Atividades Recentes + Próximas Interações

PetsTab / AdoptionsTab / SettingsTab
├── Header com título e descrição
└── Placeholder para conteúdo futuro
```

**💡 Usage Example**:

```javascript
import { OngDashboard } from '../pages/OngDashboard';
import { useAuth } from '../hooks/useAuth';

// Rota: /dashboard (protegida)
// Requer: Autenticação como ONG
// Hook: useAuth para logout
// Layout: Sidebar (desktop) / Header mobile
```

---

### `OngProfile.jsx` - Perfil Público da ONG

**Purpose**: Página pública detalhada de uma ONG com timeline, transparência e pets disponíveis.

**📡 State Definitions**:

```bash
Estados (implícitos via hooks)
├── ong: object                # Dados da ONG (useOngs)
├── pets: array                # Pets da ONG (usePets)
├── isLoadingOngs: boolean
├── isLoadingPets: boolean
└── isOngError: boolean
```

**⚙️ Hooks**:

```bash
useParams()
└── id: string                 # ID da ONG da URL

useOngs({ id })
├── data: ongs[]               # Lista de ONGs
└── Deriva: ong (find by id)

usePets({ ongId }, { enabled: !!ong?.id })
├── data: pets[]               # Pets filtrados por ONG
└── Executa apenas quando ong.id existe
```

**🔄 Component Hierarchy**:

```bash
OngProfilePage
├── OngHeader
│   ├── Badge "ONG Verificada" (condicional)
│   ├── Localização e data de fundação
│   └── Contador de resgates
├── Grid 2 cols
│   ├── Coluna principal (2fr)
│   │   ├── TimelineSection (resgates ao longo dos anos)
│   │   ├── TestimonialsSection (depoimentos)
│   │   └── TransparencySection (métricas e links)
│   └── Sidebar (1.3fr)
│       ├── Apoie esta ONG (doação)
│       └── Sobre a equipe
└── OngPetsSection (full width)
    ├── Grid de PetCards
    └── Estados: loading / empty / data
```

**💡 Usage Example**:

```javascript
// Rota: /ongs/:id
// Params: id (string)
// Features: Timeline animada, métricas de transparência
// Empty state: "Nenhum pet disponível no momento"
```

---

### `Ongs.jsx` - Listagem de ONGs

**Purpose**: Diretório de ONGs parceiras com busca, filtros e visualização em cards.

**📡 State Definitions**:

```bash
Estados
├── searchTerm: string         # Busca por nome/descrição
├── selectedCity: string       # Filtro por cidade ("Todas" | "Salvador" | ...)
└── showFilters: boolean       # Toggle painel de filtros avançados
```

**⚙️ Filter Logic**:

```bash
filteredOngs (computed)
├── matchesSearch: name.includes(searchTerm) 
│                  OR description.includes(searchTerm)
├── matchesCity: selectedCity === "Todas" OR city === selectedCity
└── Retorna: intersection de ambos
```

**📊 Mock Data Structure**:

```bash
mockOngs: array
├── id: number
├── name: string
├── city, state, neighborhood
├── verified: boolean          # Badge azul
├── phone, email, website
├── description: string
├── petsCount: number
└── image: string (URL Unsplash)

cities: array                  # ["Todas", "Salvador", "Lauro de Freitas"]
```

**🔄 Layout**:

```bash
Ongs Page
├── Header
│   ├── Badge "Encontre ONGs confiáveis"
│   ├── Título e descrição
│   └── Contador de resultados
├── Search Bar (sticky style)
│   ├── Input de busca (com ícone MapPin)
│   ├── Botão Buscar
│   └── Toggle filtros avançados
├── Grid de ONGs (3 cols)
│   └── Card com:
│       ├── Imagem (hover zoom)
│       ├── Badge "Verificada" (condicional)
│       ├── Info de contato
│       ├── Serviços (tags)
│       └── CTA "Ver perfil"
└── Map placeholder (futuro)
```

**💡 Usage Example**:

```javascript
// Rota: /ongs
// Filtros: Cidade (dropdown), Busca textual
// Design: Cards com glassmorphism (backdrop-blur)
// Responsivo: 1 col mobile, 2 cols tablet, 3 cols desktop
```

---

### `PetDetail.jsx` - Perfil Completo do Pet

**Purpose**: Página detalhada do pet com galeria de mídia, simulador de match e formulário de adoção.

**📡 State Definitions**:

```bash
Estados Locais
├── activeIndex: number              # Índice da mídia ativa na galeria
├── isModalOpen: boolean              # Modal de tela cheia
├── isFavorite: boolean                # Estado de favorito (zustand store)
├── toast: { message, variant }       # Notificações temporárias
├── matchResult: { value, status }    # Resultado do simulador
└── form states (AdoptionFormLocal)
    ├── step: number (0-2)
    ├── submitted: boolean
    └── formData (react-hook-form)
```

**⚙️ Store (Zustand)**:

```bash
useFavoritesStore
├── favorites: { [id]: boolean }
└── toggleFavorite(id)                # Alterna estado de favorito
```

**🔄 Component Hierarchy**:

```bash
PetDetailPage
├── Skip link (acessibilidade)
├── Header (breadcrumb + ações)
│   ├── Título, localização, tags
│   ├── Botão Favoritar (heart)
│   └── Badge "Adoção responsável"
├── Grid 2 cols
│   ├── Main (2fr)
│   │   ├── MediaGallery
│   │   │   ├── Thumbnails (lateral)
│   │   │   ├── Main image (com zoom)
│   │   │   └── Modal fullscreen
│   │   └── PetInfoSection
│   │       ├── Dados gerais (grid)
│   │       ├── Saúde (badges vacinado/castrado)
│   │       ├── Temperamento (tags)
│   │       ├── Condições especiais (alerta)
│   │       └── História (texto)
│   └── Sidebar (1.35fr)
│       ├── ONG Info (contato)
│       ├── MatchSimulator
│       │   ├── Form interativo
│       │   └── Resultado em donut chart
│       ├── AdoptionFormLocal (3 steps)
│       └── Share buttons (WhatsApp/Instagram)
└── SimilarPets (grid 4 cols)
```

**📊 Schemas**:

```bash
matchSchema (zod)
├── temOutrosPets: enum["sim", "nao"]
├── tempoEmCasa: enum["pouco", "medio", "muito"]
├── espaco: enum["pequeno", "medio", "grande"]
└── experiencia: enum["iniciante", "intermediario", "avancado"]

adoptionSchema (zod)
├── nome: string (min 2)
├── email: string (email válido)
├── telefone: string (min 8)
├── cidade: string (min 2)
├── tipoMoradia: enum["casa", "apartamento", "sitio"]
├── possuiQuintal: enum["sim", "nao"]
├── permiteInterior: enum["sim", "nao"]
├── jaTevePets: enum["sim", "nao"]
├── possuiPetsAtuais: enum["sim", "nao"]
└── tempoDisponivel: enum["pouco", "medio", "muito"]
```

**⚙️ Key Handlers**:

```bash
handleFavoriteClick()
├── toggleFavorite(petId)
└── showToast(`${pet.nome} adicionado/removido dos favoritos`)

handleShareWhatsApp()
├── Constrói mensagem com dados do pet
└── Abre link wa.me com texto encoded

handleShareInstagram()
└── Simula abertura do Instagram (story)
```

**💡 Usage Example**:

```javascript
// Rota: /pets/:id
// Params: id (string)
// Features: Galeria com suporte a vídeo/panorama, Match 360°, Form multi-step
// Acessibilidade: Skip link, ARIA labels, keyboard navigation na galeria
```

---

### `Pets.jsx` - Busca Avançada de Pets

**Purpose**: Listagem completa de pets com filtros múltiplos, infinite scroll e alternância de layout.

**📡 State Definitions**:

```bash
Estados
├── isLoading: boolean              # Loading inicial
├── layout: string                  # "grid" | "list"
├── visibleCount: number             # 12 (incrementa +12)
├── loadMoreRef: ref                 # IntersectionObserver target
└── filters: object
    ├── city: string                 # URL param: ?cidade=
    ├── species: string              # URL param: ?especie=
    ├── size: string                 # URL param: ?porte=
    ├── age: string                  # URL param: ?idade=
    ├── sex: string                  # URL param: ?sexo=
    └── name: string                 # URL param: ?nome=
```

**⚙️ Hooks**:

```bash
useSearchParams()
├── Leitura inicial dos filtros da URL
└── Sync automático ao alterar filters

useMemo (filteredPets)
├── Aplica todos os filtros ativos
└── Retorna array filtrado

useEffect (IntersectionObserver)
├── Observa loadMoreRef
├── Quando visível: visibleCount += 12
└── Cleanup ao desmontar
```

**🔄 Filter System**:

```bash
Filtros disponíveis
├── Cidade: dropdown (CITIES)
├── Espécie: dropdown (SPECIES) - cachorro/gato
├── Porte: dropdown (SIZES) - pequeno/medio/grande
├── Idade: dropdown (AGES) - filhote/adulto/idoso
├── Sexo: dropdown (SEXES) - macho/femea
└── Nome: input de busca textual

activeFiltersCount (computed)
└── Object.values(filters).filter(Boolean).length
```

**🔄 Layout Modes**:

```bash
Grid Layout (default)
├── 1 col mobile
├── 2 cols tablet
└── 3 cols desktop
└── PetCard padrão

List Layout
├── 1 col full width
└── PetCard adaptado (horizontal)
```

**💡 Usage Example**:

```javascript
// Rota: /pets
// Query params: Todos os filtros são sincronizados com URL
├── ?cidade=salvador&especie=cachorro&porte=pequeno
// Infinite scroll: Carrega 12 em 12
// Performance: IntersectionObserver com rootMargin 200px
```

---

### `PetShops.jsx` - Diretório de Pet Shops

**Purpose**: Listagem de pet shops parceiros com filtros por serviço e localização.

**📡 State Definitions**:

```bash
Estados
├── selectedService: string    # "Todos" | "Banho" | "Tosa" | ...
└── searchTerm: string         # Busca por nome/cidade/bairro
```

**⚙️ Filter Logic**:

```bash
filteredPetshops (computed)
├── matchesService: selectedService === "Todos" 
│                  OR services.includes(selectedService)
├── matchesSearch: name.includes(searchTerm)
│                  OR city.includes(searchTerm)
│                  OR neighborhood.includes(searchTerm)
└── Retorna: intersection de ambos
```

**📊 Data Structure**:

```bash
petshops: array
├── id: number
├── name: string
├── city, neighborhood, address
├── phone: string
├── services: array[string]    # ["Banho", "Tosa", "Veterinário", ...]
├── rating: number               # 0-5 (ex: 4.8)
├── hours: string                # "08:00 - 19:00" | "24 horas"
└── image: string (URL Unsplash)

allServices: array              # ["Todos", "Banho", "Tosa", ...]
```

**🔄 Layout**:

```bash
PetShops Page
├── Header (título + descrição)
├── Busca (input com ícone Search)
├── Filtros de serviço (pills horizontais)
│   └── Toggle active state
└── Grid 3 cols
    └── Card com:
        ├── Imagem (hover zoom)
        ├── Rating badge (top-right)
        ├── Nome e localização
        ├── Tags de serviços
        ├── Horário de funcionamento
        └── CTA "Ver perfil"
```

**💡 Usage Example**:

```javascript
// Rota: /pet-shops
// Filtros: Pills de serviço (UI similar ao Blog)
// Dados: Mock local (substituir por API geolocalizada)
```

---

### `Register.jsx` - Cadastro de Usuário Multi-step

**Purpose**: Formulário wizard de 3 etapas com verificação de email e social login.

**📡 State Definitions**:

```bash
Estados
├── currentStep: number (1-3)
├── showPassword: boolean
├── showConfirmPassword: boolean
├── isLoading: boolean
├── registerError: string
├── isEmailVerified: boolean
├── showVerification: boolean
└── verificationCode: array[6]   # 6 dígitos
```

**⚙️ Form Handling**:

```bash
react-hook-form + zod
├── resolver: zodResolver(registerSchema)
├── mode: 'onBlur'
├── Fields: name, email, password, confirmPassword
└── watchPassword: para strength meter

Step 1: Dados pessoais
├── Social login buttons (Google, Facebook, Apple)
├── Input nome
└── Input email

Step 2: Segurança
├── Input senha (com strength meter)
├── Input confirmar senha
└── Requisitos visuais (checklist)

Step 3: Verificação
├── Modal de código (6 inputs)
├── Validação: código === "123456"
└── Resumo dos dados + termos
```

**🔄 Step Validation**:

```bash
trigger(fields)
├── Step 1: ['name', 'email']
├── Step 2: ['password', 'confirmPassword']
└── Retorna boolean (prosseguir se true)

nextStep()
├── Se step 2: chama sendVerificationCode()
│   ├── Simula envio de email
│   ├── setShowVerification(true)
│   └── Código fixo: "123456"
└── Se válido: incrementa currentStep

prevStep()
└── Decrementa + setShowVerification(false)
```

**⚙️ Password Strength**:

```bash
getPasswordStrength(password)
├── Score 0-5 baseado em:
│   ├── Length >= 8
│   ├── Uppercase [A-Z]
│   ├── Lowercase [a-z]
│   ├── Number [0-9]
│   └── Special char [!@#$...]
└── Retorna: { strength, label, color }

Visualização
├── Barra de progresso (0-100%)
├── Label dinâmico ("Muito fraca" → "Muito forte")
└── Checklist de requisitos (5 itens)
```

**💡 Usage Example**:

```javascript
// Rota: /registro
// Schema: registerSchema (zod)
// Features: Social login preparado, verificação email, strength meter
// Dica de teste: Código de verificação é sempre "123456"
```

---

### `Servicos.jsx` - Catálogo de Serviços

**Purpose**: Página de serviços oferecidos pela plataforma e parceiros.

**📡 Data Structure**:

```bash
services: array
├── id: number
├── title: string               # "Banho e Tosa", "Veterinário"...
├── description: string
├── icon: LucideIcon
└── color: string               # Classes Tailwind para badge
```

**🔄 Layout**:

```bash
Servicos Page
├── Header (título + descrição)
└── Grid 3 cols
    └── Card com:
        ├── Ícone grande (hover scale)
        ├── Título
        ├── Descrição
        └── CTA "Saiba mais"
```

**💡 Usage Example**:

```javascript
// Rota: /servicos
// Tipo: Página institucional de serviços
// Design: Cards centralizados com ícones coloridos
```

---

### `Sobre.jsx` - Página Institucional

**Purpose**: Informações sobre a missão, visão, valores e estatísticas da plataforma.

**📡 Data Structure**:

```bash
values: array (6 itens)
├── icon: LucideIcon
├── title: string
└── description: string

stats: array (4 itens)
├── number: string             # "10.000+", "500+"
└── label: string
```

**🔄 Sections**:

```bash
Sobre Page
├── Hero Section (blue gradient)
│   ├── Título "Sobre o PetFinder"
│   └── Missão em destaque
├── Stats Section (gray bg)
│   └── Grid 4 cols (adoções, ONGs, usuários, cidades)
├── Mission Section (2 cols)
│   ├── Texto explicativo
│   └── Ilustração (ícone Heart grande)
├── Values Section (3 cols)
│   └── Cards com ícones
└── CTA Section
    ├── "Quer fazer parte?"
    └── Botões: Cadastrar ONG / Falar conosco
```

**💡 Usage Example**:

```javascript
// Rota: /sobre
// Tipo: Página institucional estática
// Design: Alternância de backgrounds (white/gray)
// Componentes: Card, CardBody (reutilizáveis)
```

---

## 🔄 Integration Patterns

### Page + Hooks

```bash
Pets → usePets
├── usePets({ autoFetch: true })
├── filters → URL params
└── infinite scroll

OngProfile → useOngs + usePets
├── useOngs({ id }) para dados da ONG
└── usePets({ ongId }) para pets da ONG

OngDashboard → useAuth
├── useAuth para logout
└── ongData via props
```

### Page + Form

```bash
CadastroOng / Register / Login
├── react-hook-form para state management
├── zod para validação
└── Componentes Input/Button reutilizáveis
```

### Page + Animation

```bash
Home / PetDetail / Register
├── Framer Motion (motion.div)
├── AnimatePresence para transições
└── useScroll/useTransform para parallax
```

---

## 📝 Notes & Best Practices

1. **Mock Data**: Todas as páginas utilizam `mockData.js` ou dados locais. Migrar para API em produção.
2. **URL Sync**: Pets e filtros sincronizam com query params (shareable links).
3. **Acessibilidade**: Skip links, ARIA labels, keyboard navigation implementados em PetDetail.
4. **Responsividade**: Mobile-first (sm: md: lg: breakpoints) em todas as páginas.
5. **Loading States**: Skeleton cards e spinners para feedback visual.
6. **Error Handling**: Estados de erro com mensagens amigáveis (ex: "Nenhum pet encontrado").
7. **Performance**: IntersectionObserver para lazy loading, useMemo para filtros computados.

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-14
│   ├── [+] Documentação completa das 16 páginas
│   ├── [+] Padrões de arquitetura e integração
│   └── Autor: @Rsenju
│
├── 2026-03-13
│   ├── [+] Implementação PetDetail com match simulator
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] OngDashboard com sistema de tabs
│   └── Autor: @Rsenju
│
└── 2026-03-11
    ├── [+] Home page com parallax e animações
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Pages Layer*
