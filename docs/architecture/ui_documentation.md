# 🎨 UI Components Documentation

> Componentes de interface reutilizáveis - Design System base do PetFinder

---

## 📋 Feature List

```bash
components/ui/
├── 🏷️ Badge.jsx            # Badges coloridos com variantes
│   ├── 6 variantes de cor (default, success, warning, danger, info, purple)
│   ├── 3 tamanhos (sm, md, lg)
│   └── rounded-full
│
├── 🔘 Button.jsx           # Botões com estados e loading
│   ├── 5 variantes (primary, secondary, danger, outline, ghost)
│   ├── 3 tamanhos (sm, md, lg)
│   ├── Estado isLoading com spinner
│   └── Estados disabled
│
├── 🃏 Card.jsx             # Container de card com sub-componentes
│   ├── Card (container principal)
│   ├── CardHeader (com border-b)
│   ├── CardBody (conteúdo)
│   └── CardFooter (com border-t)
│
├── 📝 Input.jsx            # Input de formulário com ícone e erro
│   ├── Label opcional
│   ├── Ícone à esquerda
│   ├── Estado de erro (borda vermelha)
│   └── forwardRef para integração com React Hook Form
│
├── 🐾 Logo.jsx             # Logo com ícone e texto
│   ├── 4 tamanhos (sm, md, lg, xl)
│   ├── Gradiente blue→purple
│   ├── Link para home (quando showText)
│   └── Modo ícone apenas (showText=false)
│
├── ✨ ScrollReveal.jsx      # Animação de entrada ao scroll
│   ├── 4 direções (up, down, left, right)
│   ├── Viewport detection (once: true)
│   └── Easing customizado
│
└── 💀 SkeletonCard.jsx     # Card placeholder para loading
    ├── Animação pulse
    ├── Aspect ratio 4/3 para imagem
    └── 3 linhas de texto simuladas
```

```bash
Resumo de Implementação
├── Badge          ✅ Implementado    → Badge.jsx
├── Button         ✅ Implementado    → Button.jsx
├── Card           ✅ Implementado    → Card.jsx (com sub-componentes)
├── Input          ✅ Implementado    → Input.jsx
├── Logo           ✅ Implementado    → Logo.jsx
├── ScrollReveal   ✅ Implementado    → ScrollReveal.jsx
└── SkeletonCard   ✅ Implementado    → SkeletonCard.jsx
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                  UI Components Layer                    │
├─────────────────────────────────────────────────────────┤
│  Design System Atomic                                   │
│  ├── Atoms: Badge, Button, Input, Logo                  │
│  ├── Molecules: Card (composto de sub-componentes)   │
│  └── Effects: ScrollReveal, SkeletonCard                │
├─────────────────────────────────────────────────────────┤
│  Padrões Consistentes                                   │
│  ├── Variantes: variant + size props                    │
│  ├── className prop para extensibilidade                │
│  ├── ...props spread para atributos nativos             │
│  └── forwardRef para integração com forms               │
└─────────────────────────────────────────────────────────┘
```

### Design Tokens (Implícitos)

```bash
Cores de Variantes
├── Badge
│   ├── default:  bg-gray-100    text-gray-800
│   ├── success:  bg-green-100    text-green-800
│   ├── warning:  bg-yellow-100   text-yellow-800
│   ├── danger:   bg-red-100      text-red-800
│   ├── info:     bg-blue-100     text-blue-800
│   └── purple:   bg-purple-100   text-purple-800
│
└── Button
    ├── primary:   bg-blue-600     hover:bg-blue-700     text-white
    ├── secondary: bg-gray-200     hover:bg-gray-300     text-gray-800
    ├── danger:    bg-red-600      hover:bg-red-700      text-white
    ├── outline:   border-2 border-blue-600              text-blue-600
    └── ghost:     hover:bg-gray-100                     text-gray-700

Tamanhos (Badge & Button)
├── sm:  px-2   py-0.5  text-xs
├── md:  px-2.5 py-0.5  text-sm  (Badge)
│      ou px-4   py-2    text-base (Button)
└── lg:  px-3   py-1    text-base (Badge)
       ou px-6   py-3    text-lg   (Button)
```

---

## 🗂️ File Structure

```bash
src/components/ui/
├── Badge.jsx               # Componente de badge/tag
├── Button.jsx              # Botão com variantes
├── Card.jsx                # Card container + Header/Body/Footer
├── Input.jsx               # Input de formulário
├── Logo.jsx                # Logo da aplicação
├── ScrollReveal.jsx        # Wrapper de animação scroll
└── SkeletonCard.jsx        # Skeleton loading state
```

---

## 💻 Code Documentation

### `Badge.jsx` - Componente de Badge

**Purpose**: Elemento visual para tags, status e categorias.

**📡 Props Interface**:

```bash
Badge Props
├── children: node            # Conteúdo do badge
├── variant: string           # 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'
├── size: string              # 'sm' | 'md' | 'lg'
└── className: string         # Classes adicionais
```

**⚙️ Implementation**:

```javascript
const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
};
```

**🎨 Base Styles**:

```bash
Base Classes
├── inline-flex items-center
├── rounded-full
├── font-medium
└── Combinação de variant + size + className
```

**💡 Usage Examples**:

```javascript
import { Badge } from '../components/ui/Badge';

// Status variants
<Badge variant="success">Adotado</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="danger">Urgente</Badge>
<Badge variant="info">Disponível</Badge>

// Sizes
<Badge size="sm">Pequeno</Badge>
<Badge size="md">Médio</Badge>
<Badge size="lg">Grande</Badge>

// With icon
<Badge variant="purple">
  <Star className="w-3 h-3 mr-1" />
  Premium
</Badge>
```

---

### `Button.jsx` - Componente de Botão

**Purpose**: Botão interativo com múltiplas variantes, tamanhos e estados.

**📡 Props Interface**:

```bash
Button Props
├── children: node            # Conteúdo do botão
├── variant: string           # 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
├── size: string              # 'sm' | 'md' | 'lg'
├── isLoading: boolean        # Mostra spinner
├── disabled: boolean         # Desabilita botão
├── className: string         # Classes adicionais
├── type: string              # 'button' | 'submit' | 'reset'
├── onClick: function         # Handler de clique
└── ...props                  # Outros atributos HTML
```

**⚙️ Implementation**:

```javascript
const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  ghost: 'hover:bg-gray-100 text-gray-700',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const baseStyles = `
  inline-flex items-center justify-center 
  rounded-lg font-medium 
  transition-colors 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
  disabled:opacity-50 disabled:cursor-not-allowed
`;
```

**🔄 Loading State**:

```bash
isLoading Behavior
├── disabled = true (implícito)
├── Loader2 icon (lucide-react)
├── animate-spin no ícone
└── mr-2 no ícone para espaçamento
```

**💡 Usage Examples**:

```javascript
import { Button } from '../components/ui/Button';

// Variants
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="danger">Perigoso</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>

// States
<Button isLoading>Carregando...</Button>
<Button disabled>Desabilitado</Button>

// With icon
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Adicionar
</Button>

// Submit
<Button type="submit" variant="primary">
  Enviar
</Button>
```

---

### `Card.jsx` - Container de Card

**Purpose**: Container visual com estrutura Header/Body/Footer.

**📡 Componentes Exportados**:

```bash
Card Exports
├── Card (container principal)
├── CardHeader (cabeçalho com border)
├── CardBody (conteúdo principal)
└── CardFooter (rodapé com border)
```

**⚙️ Implementation**:

```bash
Card
├── Props: children, className, hover
├── Classes:
│   ├── bg-white
│   ├── rounded-xl
│   ├── shadow-md
│   ├── overflow-hidden
│   └── hover:shadow-lg transition-shadow (se hover=true)
│
CardHeader
├── Props: children, className
└── Classes: p-4 border-b border-gray-100
│
CardBody
├── Props: children, className
└── Classes: p-4
│
CardFooter
├── Props: children, className
└── Classes: p-4 border-t border-gray-100
```

**💡 Usage Examples**:

```javascript
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Card simples
<Card>
  <CardBody>Conteúdo aqui</CardBody>
</Card>

// Card completo com hover
<Card hover className="max-w-sm">
  <CardHeader>
    <h3 className="font-bold">Título</h3>
  </CardHeader>
  <CardBody>
    <p>Descrição do card...</p>
  </CardBody>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Cancelar</Button>
    <Button>Confirmar</Button>
  </CardFooter>
</Card>

// Card usado em OngCard (exemplo real)
<Card hover className="h-full flex flex-col">
  <CardBody className="flex-1">
    {/* Conteúdo */}
  </CardBody>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Ver Detalhes</Button>
    <Button variant="primary">Contato</Button>
  </CardFooter>
</Card>
```

---

### `Input.jsx` - Input de Formulário

**Purpose**: Campo de entrada com suporte a label, ícone e mensagem de erro.

**📡 Props Interface**:

```bash
Input Props (forwardRef)
├── label: string             # Label opcional acima do input
├── error: string             # Mensagem de erro
├── icon: Component           # Ícone Lucide (ex: Search, Mail)
├── className: string         # Classes adicionais
└── ...props                  # Atributos HTML do input
```

**⚙️ Implementation**:

```bash
Structure
├── Container (w-full)
│   ├── Label (opcional)
│   │   └── block text-sm font-medium text-gray-700 mb-1
│   │
│   └── Input Wrapper (relative)
│       ├── Icon Container (condicional)
│       │   ├── absolute inset-y-0 left-0 pl-3
│       │   └── Icon className="h-5 w-5 text-gray-400"
│       │
│       └── Input
│           ├── block w-full rounded-lg border-gray-300
│           ├── shadow-sm focus:border-blue-500 focus:ring-blue-500
│           ├── Icon ? pl-10 : pl-3
│           ├── pr-3 py-2
│           ├── error ? border-red-500 focus:border-red-500
│           └── disabled:bg-gray-100
│
└── Error Message (condicional)
    └── mt-1 text-sm text-red-600
```

**🔄 forwardRef**:

```javascript
export const Input = forwardRef(({ ... }, ref) => {
  return (
    <input ref={ref} ... />
  );
});

Input.displayName = 'Input';  // Para DevTools
```

**💡 Usage Examples**:

```javascript
import { Input } from '../components/ui/Input';
import { Search, Mail, Lock } from 'lucide-react';

// Input simples
<Input placeholder="Digite aqui..." />

// Com label
<Input label="Email" type="email" placeholder="seu@email.com" />

// Com ícone
<Input icon={Search} placeholder="Buscar..." />
<Input icon={Mail} label="Email" type="email" />
<Input icon={Lock} label="Senha" type="password" />

// Com erro
<Input 
  label="Email" 
  error="Email inválido" 
  placeholder="seu@email.com" 
/>

// Com React Hook Form
import { useForm } from 'react-hook-form';

const { register } = useForm();

<Input 
  label="Nome"
  {...register('name')}
  ref={register('name').ref}  // forwardRef faz isso automaticamente
/>
```

---

### `Logo.jsx` - Logo da Aplicação

**Purpose**: Logo com ícone de pata, gradiente e texto opcional.

**📡 Props Interface**:

```bash
Logo Props
├── size: string              # 'sm' | 'md' | 'lg' | 'xl'
├── showText: boolean         # Mostrar ou não o texto "PetFinder"
└── className: string         # Classes adicionais
```

**⚙️ Size Configurations**:

```javascript
const sizes = {
  sm: { container: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-lg' },
  md: { container: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-xl' },
  lg: { container: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-2xl' },
  xl: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-3xl' },
};
```

**🎨 Visual Structure**:

```bash
Logo Structure
├── Container (flex items-center gap-3)
│   ├── Icon Container
│   │   ├── {container} (ex: w-10 h-10)
│   │   ├── bg-gradient-to-br from-blue-500 to-purple-600
│   │   ├── rounded-xl
│   │   ├── shadow-lg
│   │   └── PawPrint icon ({icon} class, text-white)
│   │
│   └── Text (condicional: showText)
│       ├── font-bold
│       ├── {text} (ex: text-xl)
│       └── text-gray-900 dark:text-white
│
└── Wrapper (condicional)
    ├── showText ? Link to="/" : div
    └── hover:opacity-80 transition-opacity (no Link)
```

**💡 Usage Examples**:

```javascript
import Logo from '../components/ui/Logo';

// Tamanhos
<Logo size="sm" />
<Logo size="md" />    // Default
<Logo size="lg" />
<Logo size="xl" />

// Com texto (default)
<Logo showText={true} />   // "🐾 PetFinder"

// Apenas ícone
<Logo showText={false} />  // Só a pata

// Uso em Header/Footer
<Logo size="md" />  // Header
<Logo size="md" />  // Footer

// Uso em página de login (grande)
<Logo size="xl" className="mx-auto mb-8" />
```

---

### `ScrollReveal.jsx` - Animação de Scroll

**Purpose**: Wrapper que anima children quando entram na viewport.

**📡 Props Interface**:

```bash
ScrollReveal Props
├── children: node            # Conteúdo a ser animado
├── delay: number             # Delay em segundos (default: 0)
└── direction: string         # 'up' | 'down' | 'left' | 'right'
```

**⚙️ Implementation**:

```javascript
const directions = {
  up: { y: 40, x: 0 },      // Vem de baixo
  down: { y: -40, x: 0 },   // Vem de cima
  left: { y: 0, x: 40 },    // Vem da direita
  right: { y: 0, x: -40 },  // Vem da esquerda
};

<motion.div
  initial={{ opacity: 0, ...directions[direction] }}
  whileInView={{ opacity: 1, y: 0, x: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ 
    duration: 0.6, 
    delay,
    ease: [0.22, 1, 0.36, 1]  // Custom cubic-bezier
  }}
>
  {children}
</motion.div>
```

**🎨 Animation Details**:

```bash
Animation Config
├── Initial: opacity: 0 + offset (40px)
├── WhileInView: opacity: 1 + x:0 y:0
├── Viewport: once: true (anima só 1x)
├── Viewport Margin: -50px (começa antes de entrar totalmente)
├── Duration: 0.6s
├── Delay: customizável
└── Easing: [0.22, 1, 0.36, 1] (ease-out-quint)
```

**💡 Usage Examples**:

```javascript
import ScrollReveal from '../components/ui/ScrollReveal';

// Direção padrão (up)
<ScrollReveal>
  <h2>Título da seção</h2>
</ScrollReveal>

// Direções diferentes
<ScrollReveal direction="up">    {/* Vem de baixo */}
<ScrollReveal direction="down">  {/* Vem de cima */}
<ScrollReveal direction="left">   {/* Vem da direita */}
<ScrollReveal direction="right">  {/* Vem da esquerda */}

// Com delay (stagger effect)
<ScrollReveal delay={0}>
  <Card>Primeiro</Card>
</ScrollReveal>
<ScrollReveal delay={0.1}>
  <Card>Segundo</Card>
</ScrollReveal>
<ScrollReveal delay={0.2}>
  <Card>Terceiro</Card>
</ScrollReveal>

// Uso em seções da Home
<ScrollReveal direction="up">
  <section className="py-20">
    <h2>Como Funciona</h2>
    {/* ... */}
  </section>
</ScrollReveal>
```

---

### `SkeletonCard.jsx` - Card de Loading

**Purpose**: Placeholder visual para estados de carregamento.

**🎨 Structure**:

```bash
SkeletonCard
├── Container (card overflow-hidden)
│   └── animate-pulse
│
├── Image Placeholder
│   ├── aspect-[4/3]
│   └── bg-gray-300 dark:bg-gray-700
│
└── Content (p-6 space-y-3)
    ├── Title Line
    │   ├── h-6 (altura)
    │   ├── bg-gray-300 dark:bg-gray-700
    │   ├── rounded
    │   └── w-2/3 (largura parcial)
    │
    ├── Subtitle Line
    │   ├── h-4
    │   ├── bg-gray-300 dark:bg-gray-700
    │   ├── rounded
    │   └── w-1/2
    │
    └── Tags (flex gap-2)
        ├── Tag 1: h-6 w-16
        └── Tag 2: h-6 w-16
            └── bg-gray-300 dark:bg-gray-700 rounded
```

**💡 Usage Examples**:

```javascript
import SkeletonCard from '../components/ui/SkeletonCard';

// Lista de skeletons durante loading
{isLoading ? (
  <>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </>
) : (
  pets.map(pet => <PetCard key={pet.id} pet={pet} />)
)}

// Grid de skeletons
<div className="grid grid-cols-3 gap-6">
  {[1, 2, 3, 4, 5, 6].map((i) => (
    <SkeletonCard key={i} />
  ))}
</div>
```

---

## 🔄 Integration Patterns

### Composição com Features

```bash
UI → Features Usage
├── Button
│   ├── Usado em: OngCard (CardFooter)
│   ├── Usado em: FilterSection (limpar filtros)
│   └── Usado em: SearchBar (submit)
│
├── Card + CardBody + CardFooter
│   └── Usado em: OngCard (estrutura completa)
│
├── Badge
│   ├── Usado em: OngCard (pets count, rating)
│   └── Usado em: FilterSection (contador de filtros)
│
├── Input
│   ├── Usado em: SearchBar (input de busca)
│   └── Usado em: AdoptionForm (via componente custom)
│
├── Logo
│   ├── Usado em: Header
│   └── Usado em: Footer
│
├── ScrollReveal
│   └── Usado em: Home (seções)
│
└── SkeletonCard
    └── Usado em: Pets (loading state)
```

### Form Integration

```bash
Input + React Hook Form
├── forwardRef permite ref pass-through
├── register('fieldName') funciona diretamente
└── Error message integrada com validação Zod

Exemplo:
<Input
  label="Email"
  icon={Mail}
  error={errors.email?.message}
  {...register('email')}
/>
```

---

## 📝 Notes & Best Practices

1. **Badge**: Use variantes semânticas (success para positivo, danger para erro)
2. **Button**: Sempre use `type="button"` exceto quando for submit de form
3. **Card**: Use `hover` prop para cards clicáveis (feedback visual)
4. **Input**: O `forwardRef` é essencial para integração com bibliotecas de form
5. **Logo**: `showText={false}` é útil para favicon ou loading states
6. **ScrollReveal**: Use `delay` para criar efeito stagger em listas
7. **SkeletonCard**: Mantenha mesmas dimensões do Card real para evitar layout shift

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do Badge com 6 variantes
│   ├── [+] Criação do Button com loading state
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Implementado Card com sub-componentes
│   ├── [+] Input com forwardRef e ícone
│   └── Autor: @Rsenju
│
├── 2026-03-11
│   ├── [+] Logo com gradiente e 4 tamanhos
│   ├── [+] ScrollReveal com 4 direções
│   └── Autor: @Rsenju
│
└── 2026-03-10
    ├── [+] SkeletonCard para estados de loading
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - UI Components Layer*
