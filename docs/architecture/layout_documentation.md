# 🏗️ Layout Components Documentation

> Componentes estruturais do PetFinder - Header, Footer, Sidebar e estruturas de página

---

## 📋 Feature List

```bash
components/layout/
├── 🦶 Footer.jsx           # Rodapé completo do site
│   ├── Grid 4 colunas responsivo
│   ├── Links rápidos + Contato + Redes sociais
│   ├── Bottom bar com copyright
│   └── Dark mode support
│
├── 🧭 Header.jsx           # Cabeçalho sticky com navegação
│   ├── Navegação desktop (7 links)
│   ├── Search input (desktop)
│   ├── Ações: Contato, User, Login
│   ├── Menu mobile colapsável
│   └── Modal de contato de emergência
│
├── 📐 MainLayout.jsx       # Layout principal da aplicação
│   ├── Estrutura: Header + Outlet + Footer
│   ├── Flexbox column layout
│   └── min-h-screen bg-slate-900
│
├── 📱 MobileMenu.jsx       # Menu mobile (atualmente vazio)
│   └── Placeholder para futura implementação
│
└── 📑 Sidebar.jsx          # Navegação lateral
    ├── NavItems dinâmicos (top + bottom)
    ├── NavLink com active state
    ├── Sticky positioning
    └── Suporte a ongMode
```

```bash
Resumo de Implementação
├── Footer          ✅ Implementado    → Footer.jsx
├── Header          ✅ Implementado    → Header.jsx
├── MainLayout      ✅ Implementado    → MainLayout.jsx
├── MobileMenu      ⚠️  Vazio          → MobileMenu.jsx
└── Sidebar         ✅ Implementado    → Sidebar.jsx
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                 Layout Components Layer                 │
├─────────────────────────────────────────────────────────┤
│  Estrutura de página (MainLayout)                       │
│  ├── Header (sticky top-0)                              │
│  ├── <Outlet /> (conteúdo dinâmico do React Router)    │
│  └── Footer (border-t)                                  │
├─────────────────────────────────────────────────────────┤
│  Navegação                                              │
│  ├── Header: Navegação principal + ações rápidas        │
│  └── Sidebar: Navegação lateral (dashboard/áreas)     │
├─────────────────────────────────────────────────────────┤
│  Composição                                             │
│  └── Todos usam componentes UI (Logo, Button, Input)    │
└─────────────────────────────────────────────────────────┘
```

### Responsive Strategy
```bash
Breakpoints
├── Mobile (< 768px)
│   ├── Header: Menu hamburguer + drawer
│   ├── Search: Oculto
│   └── Footer: Grid 1 coluna
│
├── Tablet (768px - 1024px)
│   ├── Header: Navegação visível
│   ├── Search: Oculto
│   └── Footer: Grid 2 colunas
│
└── Desktop (> 1024px)
    ├── Header: Tudo visível
    ├── Search: Input presente
    └── Footer: Grid 4 colunas
```

---

## 🗂️ File Structure

```bash
src/components/layout/
├── Footer.jsx              # Rodapé com links e contato
├── Header.jsx              # Cabeçalho com navegação
├── MainLayout.jsx          # Layout wrapper (Outlet)
├── MobileMenu.jsx          # Menu mobile (placeholder)
└── Sidebar.jsx             # Navegação lateral
```

---

## 💻 Code Documentation

### `Footer.jsx` - Rodapé Completo

**Purpose**: Rodapé institucional com navegação, contato e redes sociais.

**🎨 Estrutura**:

```bash
Footer Structure
├── Main Footer (bg-gray-50 dark:bg-gray-900)
│   ├── max-w-7xl mx-auto px-4 py-12
│   └── Grid: grid-cols-1 md:grid-cols-4 gap-8
│
├── Coluna 1: Brand
│   ├── Logo (size="md")
│   └── Tagline: "Conectando corações e patinhas..."
│
├── Coluna 2: Links Rápidos
│   ├── h4: "Links Rápidos"
│   └── ul space-y-2
│       ├── /pets → Adotar um Pet
│       ├── /ongs → ONGs Parceiras
│       ├── /cadastro-ong → Cadastrar ONG
│       └── /sobre → Sobre Nós
│
├── Coluna 3: Contato
│   ├── h4: "Contato"
│   └── ul space-y-3
│       ├── Mail icon + contato@petfinder.com.br
│       ├── Phone icon + (71) 99999-9999
│       └── MapPin icon + Lauro de Freitas, BA
│
└── Coluna 4: Redes Sociais
    ├── h4: "Redes Sociais"
    └── flex gap-4
        ├── Instagram (hover:bg-blue-600)
        ├── Facebook (hover:bg-blue-600)
        └── Twitter (hover:bg-blue-600)

Bottom Bar (border-t)
├── flex flex-col md:flex-row justify-between
├── Copyright: © {currentYear} PetFinder — Feito com ❤️ em Salvador
└── Links: Privacidade | Termos de Uso
```

**⚙️ Dynamic Year**:

```javascript
const currentYear = new Date().getFullYear();
// Usado no: © {currentYear} PetFinder
```

**🎨 Dark Mode Support**:

```bash
Dark Mode Classes
├── bg-gray-50 dark:bg-gray-900
├── border-gray-200 dark:border-gray-800
├── text-gray-900 dark:text-white
├── text-gray-600 dark:text-gray-400
└── hover:text-blue-600 dark:hover:text-blue-400
```

**💡 Usage Example**:

```javascript
import Footer from '../components/layout/Footer';

// Usado automaticamente em MainLayout
// Ou standalone:
<Footer />
```

---

### `Header.jsx` - Cabeçalho de Navegação

**Purpose**: Header sticky com navegação principal, busca e ações do usuário.

**📡 State Management**:

```bash
Estados Internos
├── isMenuOpen: boolean         # Controla menu mobile
└── isContactModalOpen: boolean # Controla modal de emergência

Hooks Externos
├── useNavigate()               # Navegação programática
└── useAuth()                   # Auth context
    ├── user: object | null
    ├── isAuthenticated: boolean
    └── isOng: boolean
```

**🧭 Navigation Links**:

```bash
navLinks Array (7 links)
├── { to: "/caes", label: "Cachorros" }
├── { to: "/gatos", label: "Gatos" }
├── { to: "/servicos", label: "Serviços" }
├── { to: "/ongs", label: "ONGs" }
├── { to: "/petshops", label: "Pet Shops" }
├── { to: "/blog", label: "Blog" }
└── { to: "/governo", label: "Governo" }
```

**🎨 Layout Structure**:

```bash
Header (sticky top-0 z-50)
├── Container (max-w-7xl mx-auto px-4)
│   └── flex justify-between h-16
│
├── Left: Logo
│   └── <Logo size="md" />
│
├── Center: Desktop Navigation (hidden md:flex)
│   └── nav flex items-center gap-1
│       └── Mapeia navLinks
│           └── Link: px-3 py-2 text-sm font-medium
│               └── hover: text-white + bg-slate-800
│
├── Center: Search (hidden lg:flex)
│   └── flex-1 max-w-xs mx-4
│       └── relative w-full
│           ├── Search icon (absolute left-3)
│           └── input: pl-9 pr-4 py-2
│               └── bg-slate-800 border-slate-600
│
└── Right: Desktop Actions (hidden md:flex)
    ├── Phone button (handlePhoneClick)
    │   └── title: "Contato de Emergência"
    │   └── Phone icon (text-slate-400)
    │
    ├── User button (handleUserClick)
    │   ├── isAuthenticated ? text-blue-400 : text-slate-400
    │   └── title: isAuthenticated ? "Minha Conta" : "Entrar"
    │
    └── Login Link (se !isAuthenticated)
        └── bg-blue-600 text-white px-4 py-2

Mobile Menu Button (md:hidden)
├── onClick: setIsMenuOpen(!isMenuOpen)
└── Icon: Menu || X (alterna)

Mobile Menu Drawer (isMenuOpen && md:hidden)
├── border-t border-slate-700 bg-slate-900
├── nav: px-4 py-4 space-y-2
│   └── Mapeia navLinks (links verticais)
└── Section: "Contato de Emergência"
    ├── Phone button
    ├── User button
    └── Login Link (se !isAuthenticated)
```

**🔄 Handlers**:

```javascript
const handleUserClick = () => {
  if (isAuthenticated && isOng) {
    navigate("/dashboard");
  } else {
    navigate("/login");
  }
};

const handlePhoneClick = () => {
  setIsContactModalOpen(true);
};
```

**📞 Contact Modal (Emergência)**:

```bash
Modal Overlay (fixed inset-0 z-[60])
├── bg-black/50 backdrop-blur-sm
├── Container (max-w-md w-full)
│   ├── Header: "Contato de Emergência" + Phone icon
│   └── Close button (X)
│
└── Cards de Contato
    ├── Emergência Veterinária 24h
    │   ├── bg-red-500/10 border-red-500/30
    │   └── (71) 99999-9999
    │
    ├── Suporte PetFinder
    │   ├── bg-blue-500/10 border-blue-500/30
    │   └── contato@petfinder.com.br
    │
    └── Denúncias de Maus-tratos
        ├── bg-green-500/10 border-green-500/30
        └── 0800-123-4567
```

**💡 Usage Example**:

```javascript
import Header from '../components/layout/Header';

// Usado automaticamente em MainLayout
// Ou standalone:
<Header />
```

---

### `MainLayout.jsx` - Layout Principal

**Purpose**: Wrapper estrutural que envolve todas as páginas com Header e Footer.

**🎨 Estrutura**:

```bash
MainLayout
├── div.min-h-screen.bg-slate-900.text-white.flex.flex-col
│   ├── Header (sticky)
│   ├── main.flex-1
│   │   └── <Outlet />        # Conteúdo dinâmico das rotas
│   └── Footer
```

**⚙️ React Router Integration**:

```javascript
import { Outlet } from 'react-router-dom';
// Outlet renderiza o componente da rota atual
```

**💡 Usage Example**:

```javascript
// App.jsx ou router config
import MainLayout from './components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pets", element: <Pets /> },
      { path: "/ongs", element: <Ongs /> },
    ]
  }
]);
```

---

### `MobileMenu.jsx` - Menu Mobile (Placeholder)

**Purpose**: Arquivo reservado para implementação futura do menu mobile dedicado.

**Status**: ⚠️ Vazio - implementação atual está inline no Header.jsx

**💡 Future Implementation**:

```javascript
// Possível estrutura futura
export default function MobileMenu({ isOpen, onClose, navLinks }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed inset-0 z-50 bg-slate-900"
        >
          {/* Drawer content */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### `Sidebar.jsx` - Navegação Lateral

**Purpose**: Sidebar de navegação para áreas logadas (dashboard, perfil, etc).

**📡 Props Interface**:

```bash
Sidebar Props
├── className: string         # Classes adicionais
├── customNavItems: array     # Itens de navegação customizados
└── ongMode: boolean          # Flag para modo ONG (reservado)
```

**🧭 Navigation Items**:

```bash
Default Nav Items (top)
├── { path: '/', label: 'Início', icon: Home }
├── { path: '/search', label: 'Buscar', icon: Search }
├── { path: '/favorites', label: 'Favoritos', icon: Heart }
└── { path: '/messages', label: 'Mensagens', icon: MessageCircle }

Bottom Nav Items (footer)
├── { path: '/profile', label: 'Perfil', icon: User }
├── { path: '/settings', label: 'Configurações', icon: Settings }
└── { path: '/help', label: 'Ajuda', icon: HelpCircle }
```

**🎨 Layout Structure**:

```bash
Sidebar (aside)
├── w-64 bg-white border-r border-gray-200
├── flex flex-col h-screen sticky top-0
│
├── Header (p-6)
│   └── h1: "🐾 PetFinder" (text-2xl font-bold text-blue-600)
│
├── Main Nav (flex-1 px-4 space-y-1)
│   └── overflow-y-auto
│       └── Mapeia navItems
│           └── NavLink (key={item.path})
│               ├── flex items-center gap-3
│               ├── px-4 py-3 rounded-lg
│               ├── Icon (w-5 h-5)
│               └── label
│
└── Bottom Nav (p-4 border-t border-gray-200)
    └── space-y-1
        └── Mapeia bottomNavItems
            └── Mesma estrutura do main nav

NavLink Active State
├── isActive
│   ├── bg-blue-50 text-blue-700
│   └── Ícone e texto azul
│
└── !isActive
    ├── text-gray-600
    └── hover: bg-gray-50 text-gray-900
```

**⚙️ Customization**:

```javascript
// Uso com itens customizados
<Sidebar 
  customNavItems={[
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/pets', label: 'Meus Pets', icon: PawPrint },
  ]}
/>
```

**💡 Usage Example**:

```javascript
import { Sidebar } from '../components/layout/Sidebar';

// Layout com sidebar
<div className="flex">
  <Sidebar />
  <main className="flex-1 p-8">
    {/* Conteúdo */}
  </main>
</div>
```

---

## 🔄 Integration Patterns

### MainLayout + Router

```bash
Router Structure
├── / (MainLayout)
│   ├── / → Home
│   ├── /pets → Pets
│   ├── /pet/:id → PetDetail
│   ├── /ongs → Ongs
│   ├── /ong/:id → OngProfile
│   ├── /login → Login
│   └── /register → Register
│
└── /dashboard (Layout com Sidebar)
    ├── /dashboard → Dashboard
    └── /dashboard/pets → ManagePets
```

### Header + Auth Context

```bash
Auth Integration
├── useAuth() provides:
│   ├── isAuthenticated
│   ├── isOng
│   └── user
│
└── Header behavior:
    ├── isAuthenticated && isOng → /dashboard
    ├── isAuthenticated && !isOng → /profile
    └── !isAuthenticated → /login
```

---

## 📝 Notes & Best Practices

1. **Header**: O modal de contato usa `z-[60]` para ficar acima de tudo (header é `z-50`)
2. **MobileMenu**: Está vazio - a implementação atual está inline no Header. Considerar refatorar para componente separado
3. **Sidebar**: Use `customNavItems` para criar navegações específicas (dashboard de ONG, área admin, etc)
4. **Footer**: `currentYear` é computado dinamicamente - sempre mostra o ano atual
5. **MainLayout**: O `flex-1` no main garante que o footer fique no bottom mesmo com pouco conteúdo

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do Footer com grid responsivo e redes sociais
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Implementado Header com navegação e modal de emergência
│   ├── [+] Adicionado 7 links de navegação
│   └── Autor: @Rsenju
│
├── 2026-03-11
│   ├── [+] Criado MainLayout com estrutura Outlet
│   └── Autor: @Rsenju
│
├── 2026-03-10
│   ├── [+] Sidebar com NavLink e active states
│   └── Autor: @Rsenju
│
└── 2026-03-09
    ├── [+] MobileMenu (placeholder para futura implementação)
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Layout Components Layer*
