# 📋 PetFinder - Guia de Páginas e Componentes

## 🎯 Páginas (`/src/pages/`)

| Página | URL | O que faz |
|--------|-----|-----------|
| **Home** | `/` | Página inicial com banner, pets em destaque e chamadas para ação |
| **Pets** | `/pets` | Listagem completa de pets com filtros e busca |
| **PetDetail** | `/pets/:id` | Perfil detalhado de um pet específico com botão de adoção |
| **Ongs** | `/ongs` | Listagem de ONGs parceiras com filtros por cidade/estado |
| **OngProfile** | `/ongs/:id` | Perfil público de uma ONG com seus pets e informações |
| **Login** | `/login` | Tela de entrada para usuários cadastrados |
| **Register** | `/register` | Cadastro de novo usuário (adotante) |
| **CadastroOng** | `/cadastro-ong` | Formulário multi-etapas para ONGs se cadastrarem na plataforma |
| **Sobre** | `/sobre` | Página institucional com missão, valores e estatísticas do projeto |

---

## 🔌 API (`/src/api/`)

| Arquivo | Função |
|---------|--------|
| **client.js** | Configuração base do Axios (URL, headers, interceptores de token) |
| **auth.js** | Endpoints: login, registro, logout, recuperar senha, verificar email |
| **ongs.js** | Endpoints: listar, criar, editar, excluir ONGs, busca por proximidade |
| **pets.js** | Endpoints: listar, criar, editar, excluir pets, favoritar, busca |

---

## 🧩 Componentes de Features (`/src/components/features/`)

| Componente | O que renderiza |
|------------|---------------|
| **PetCard** | Card visual de pet com foto, nome, raça, idade e botão de favoritar |
| **OngCard** | Card de ONG com logo, nome, localização, avaliação e contato |
| **ThemeToggle** | Botão de alternar entre tema claro/escuro (sol/lua) |
| **EmailVerification** | Tela de "verifique seu email" com reenvio de link |
| **SocialLogin** | Botões de "Entrar com Google/Facebook" |
| **FilterSection** | Painel colapsável de filtros (espécie, porte, idade, etc) |
| **SearchBar** | Campo de busca com ícone de lupa e botão de limpar |
| **OngDashboard** | Painel administrativo completo da ONG (estatísticas, menu lateral) |

---

## 🎨 Componentes de Layout (`/src/components/layout/`)

| Componente | O que renderiza |
|------------|---------------|
| **Header** | Cabeçalho fixo com logo, menu de navegação e botão de login |
| **Footer** | Rodapé com links úteis, redes sociais e copyright |
| **Sidebar** | Menu lateral desktop para navegação interna |
| **MobileMenu** | Menu hambúrguer deslizante para versão mobile |

---

## 🧱 Componentes UI (`/src/components/ui/`)

| Componente | Props principais | O que faz |
|------------|------------------|-----------|
| **Button** | `variant`, `size`, `isLoading`, `onClick` | Botão estilizado com variantes (primary, outline, danger) |
| **Card** | `hover`, `className` | Container com borda arredondada e sombra |
| **Input** | `label`, `error`, `icon`, `type` | Campo de texto com label, ícone e mensagem de erro |
| **Badge** | `variant`, `size` | Etiqueta colorida para status (success, warning, danger, info) |
| **ScrollReveal** | `animation`, `delay` | Animação de entrada ao rolar a página |
| **SkeletonCard** | - | Placeholder cinza de carregamento |

---

## 🌍 Contexts (`/src/context/`)

| Contexto | Estado global | Métodos |
|----------|---------------|---------|
| **AuthContext** | `user`, `isAuthenticated`, `isLoading` | `login()`, `logout()`, `register()`, `updateUser()` |
| **ThemeContext** | `theme` (light/dark) | `toggleTheme()`, `setLightTheme()`, `setDarkTheme()` |

---

## 🪝 Hooks (`/src/hooks/`)

| Hook | Retorna | Uso |
|------|---------|-----|
| **useAuth** | `{ user, login, logout, isAuthenticated }` | Acessar dados do usuário logado |
| **useGeolocation** | `{ location, error, getCurrentPosition }` | Pegar coordenadas GPS do usuário |
| **useOngs** | `{ ongs, loading, fetchOngs, createOng }` | Buscar e gerenciar ONGs |
| **usePets** | `{ pets, loading, toggleFavorite, searchPets }` | Buscar e gerenciar pets |
| **useTheme** | `{ theme, toggleTheme, isDark }` | Alternar tema claro/escuro |

---

## 🛠️ Utilitários

| Arquivo | Conteúdo |
|---------|----------|
| **validations.js** | Funções: `isValidEmail()`, `isValidCPF()`, `isValidCNPJ()`, `isValidPhone()` |
| **mockData.js** | Dados falsos de pets e ONGs para testes sem backend |

---

## ⚙️ Configuração

| Arquivo | Função |
|---------|--------|
| **App.jsx** | Define todas as rotas da aplicação com React Router |
| **main.jsx** | Ponto de entrada: renderiza App no DOM, importa CSS |
| **tailwind.config.js** | Cores personalizadas, fontes, breakpoints do Tailwind |

---

## 📝 Documentação

| Arquivo | Idioma |
|---------|--------|
| **README.md** | Português (BR) |
| **README_EN.md** | English |
| **README_DE.md** | Deutsch |

---

## 🚀 Fluxo de Uso Típico

1. Usuário entra na Home (/)
↓
2.Clica em "Adotar" → vai para Pets (/pets)
↓
3.Usa SearchBar + FilterSection para encontrar pet
↓
4.Clica no PetCard → vai para PetDetail (/pets/:id)
↓
5.Clica "Quero Adotar" → abre modal/login
↓
6.ONG cadastra-se em CadastroOng (/cadastro-ong)
↓
7.ONG acessa OngDashboard para gerenciar pets
---

