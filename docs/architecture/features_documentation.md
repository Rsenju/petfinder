# 🧩 Features Components Documentation

> Componentes de funcionalidades específicas do PetFinder - Formulários, filtros, cards e sliders

---

## 📋 Feature List

```bash
components/features/
├── 📝 AdoptionForm.jsx       # Formulário multi-etapas de adoção
│   ├── 8 etapas com validação Zod
│   ├── Animações Framer Motion
│   ├── React Hook Form + useFieldArray
│   └── Schema complexo com condicionais
│
├── 🔍 FilterSection.jsx      # Painel de filtros colapsável
│   ├── Filtros dinâmicos (select/checkbox/text)
│   ├── Contador de filtros ativos
│   └── Botão limpar filtros
│
├── 🏛️ OngCard.jsx            # Card de exibição de ONG
│   ├── Layout com Card, CardBody, CardFooter
│   ├── Badge de pets disponíveis e avaliação
│   ├── Ações: favoritar, ver detalhes, contato
│   └── Informações de contato (tel/email)
│
├── 🐾 PetCard.jsx            # Card de exibição de Pet
│   ├── Layout grid ou list (prop controlada)
│   ├── Animações Framer Motion
│   ├── Badge da ONG parceira
│   ├── Tags do pet (vacinado, castrado, etc)
│   └── Link para página de detalhes /pet/:id
│
├── 🔎 SearchBar.jsx          # Barra de busca com input
│   ├── Input controlado com React state
│   ├── Botão limpar (X) quando tem texto
│   ├── Submit com preventDefault
│   └── Ícone de busca + botão submit
│
└── 💬 TestimonialsSlider.jsx # Carrossel de depoimentos
    ├── Swiper com EffectCoverflow
    ├── Navegação customizada
    ├── Autoplay com pauseOnMouseEnter
    └── Indicadores de slide ativo
```

```bash
Resumo de Implementação
├── AdoptionForm     ✅ Implementado    → AdoptionForm.jsx
├── FilterSection    ✅ Implementado    → FilterSection.jsx
├── OngCard          ✅ Implementado    → OngCard.jsx
├── PetCard          ✅ Implementado    → PetCard.jsx
├── SearchBar        ✅ Implementado    → SearchBar.jsx
└── TestimonialsSlider ✅ Implementado  → TestimonialsSlider.jsx
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│              Features Components Layer                  │
├─────────────────────────────────────────────────────────┤
│  Cada componente é uma feature completa e independente  │
│  ├── Props bem definidas para reusabilidade             │
│  ├── Callbacks (onSubmit, onChange, onClick)           │
│  └── Composição com UI components (Card, Button, etc)   │
├─────────────────────────────────────────────────────────┤
│  Padrões Comuns:                                        │
│  ├── className prop para estilização externa          │
│  ├── defaultProps para valores padrão                 │
│  └── export default + named export                      │
└─────────────────────────────────────────────────────────┘
```

### Dependências Principais
```bash
Features Dependencies
├── Framer Motion        → Animações (PetCard, AdoptionForm)
├── React Hook Form        → Forms (AdoptionForm)
├── Zod + ZodResolver      → Validação (AdoptionForm)
├── Swiper                 → Carrossel (TestimonialsSlider)
├── Lucide React           → Ícones (todos)
└── clsx + tailwind-merge  → Classes dinâmicas (AdoptionForm)
```

---

## 🗂️ File Structure

```bash
src/components/features/
├── AdoptionForm.jsx         # Formulário de adoção (8 steps)
├── FilterSection.jsx        # Componente de filtros
├── OngCard.jsx              # Card de ONG
├── PetCard.jsx              # Card de Pet
├── SearchBar.jsx            # Barra de pesquisa
└── TestimonialsSlider.jsx   # Slider de depoimentos
```

---

## 💻 Code Documentation

### `AdoptionForm.jsx` - Formulário de Adoção Multi-Etapas

**Purpose**: Formulário completo de adoção com 8 etapas, validação robusta e animações.

**📡 Schema de Validação (Zod)**:

```bash
adoptionFormSchema (Zod)
├── Etapa 1: Dados Pessoais
│   ├── fullName: string (min 3)
│   ├── age: number (min 18)
│   ├── neighborhood: string
│   ├── city: string
│   ├── phone: regex \(\d{2}\) \d{5}-\d{4}
│   └── email: email
│
├── Etapa 2: Informações da Casa
│   ├── hasScreens: boolean
│   ├── hasWindows: boolean
│   ├── hasStreetAccess: boolean
│   ├── hasSpace: boolean
│   └── spaceDescription: string (optional)
│
├── Etapa 3: Família
│   ├── hasChildren: boolean
│   ├── childrenCount: number (optional)
│   ├── childrenAges: string (optional)
│   ├── hasElderly: boolean
│   ├── elderlyCondition: string (optional)
│   └── hasAllergies: boolean + allergyDetails
│
├── Etapa 4: Outros Animais
│   ├── hasOtherPets: boolean
│   └── otherPets: array(petSchema)
│       ├── type: enum['dog', 'cat', 'other']
│       ├── quantity: number (min 1)
│       ├── name: string (optional)
│       ├── hasDisease: boolean + diseaseDescription
│       └── isAggressive: boolean
│
├── Etapa 5: Rotina
│   ├── aloneTime: string
│   ├── whereWhenAlone: string (min 5)
│   ├── travelCaretaker: string (min 3)
│   └── workType: enum['presencial', 'hibrido', 'remoto']
│
├── Etapa 6: Pet Escolhido
│   ├── petId: string
│   └── petName: string
│
├── Etapa 7: Compromissos
│   ├── lifetimeCommitment: boolean (refine: true)
│   ├── financialAwareness: boolean (refine: true)
│   └── previousAdoption: boolean + details
│
└── Etapa 8: Termo
    └── responsibilityTerm: boolean (refine: true)
```

**🎯 Constantes do Formulário**:

```bash
STEPS Array
├── { id: 1, title: 'Dados Pessoais', icon: Users }
├── { id: 2, title: 'Sua Casa', icon: Home }
├── { id: 3, title: 'Família', icon: Heart }
├── { id: 4, title: 'Outros Pets', icon: PawPrint }
├── { id: 5, title: 'Rotina', icon: Briefcase }
├── { id: 6, title: 'Pet Escolhido', icon: PawPrint }
├── { id: 7, title: 'Compromissos', icon: Heart }
└── { id: 8, title: 'Finalização', icon: Check }

LIFE_EXPECTANCY
├── dog: '10-13 anos (média)'
└── cat: '12-18 anos (média)'

COSTS_ESTIMATE
├── dog
│   ├── monthly: 'R$ 150-400'
│   ├── vet: 'R$ 200-800/ano'
│   └── emergency: 'R$ 500-3000'
└── cat
    ├── monthly: 'R$ 100-300'
    ├── vet: 'R$ 150-600/ano'
    └── emergency: 'R$ 400-2500'
```

**⚙️ React Hook Form Config**:

```javascript
const {
  register,
  handleSubmit,
  watch,
  setValue,
  control,
  formState: { errors },
  trigger,
} = useForm({
  resolver: zodResolver(adoptionFormSchema),
  mode: 'onChange',        // Validação em tempo real
  defaultValues: {
    hasScreens: false,
    hasWindows: false,
    // ... todos os defaults
  },
});
```

**🔄 useFieldArray para Pets Dinâmicos**:

```javascript
const { fields, append, remove } = useFieldArray({
  control,
  name: 'otherPets',       // Campo array no schema
});

// Adicionar novo pet
const addPet = () => {
  append({
    type: 'dog',
    quantity: 1,
    hasDisease: false,
    isAggressive: false,
  });
};
```

**🎨 Animações (Framer Motion)**:

```bash
AnimatePresence (transição entre etapas)
├── initial={{ opacity: 0, x: 20 }}
├── animate={{ opacity: 1, x: 0 }}
├── exit={{ opacity: 0, x: -20 }}
└── mode="wait" (espera sair antes de entrar)

Step Indicator
├── motion.div com scale
├── isActive → scale: 1.1 + bg-white
├── isCompleted → bg-green-400
└── !isActive && !isCompleted → bg-white/20

Progress Bar
├── motion.div width animado
├── transition: { duration: 0.3 }
└── width: `${(currentStep / 8) * 100}%`
```

**💡 Usage Example**:

```javascript
import { AdoptionForm } from '../components/features/AdoptionForm';

<AdoptionForm
  petId="123"
  petName="Rex"
  petType="dog"
  onSubmit={(data) => console.log(data)}
  onCancel={() => navigate(-1)}
/>
```

---

### `FilterSection.jsx` - Painel de Filtros

**Purpose**: Componente colapsável de filtros com múltiplos tipos de input e contador de ativos.

**📡 Props Interface**:

```bash
FilterSection Props
├── filters: object           # Estado atual dos filtros
├── onChange: function        # Callback quando filtro muda
├── availableFilters: array   # Configuração dos filtros disponíveis
└── className: string         # Classes adicionais (opcional)

availableFilters Item
├── key: string               # Chave do filtro
├── label: string             # Label exibido
├── type: 'select' | 'checkbox' | 'text'
├── options: array            # Para select/checkbox
│   ├── value: string
│   └── label: string
└── placeholder: string       # Para type='text'
```

**⚙️ State Management**:

```bash
Estados Internos
├── isOpen: boolean           # Controla visibilidade do painel
│   └── Toggle: setIsOpen(!isOpen)
│
└── activeFiltersCount: number
    └── Computado: Object.values(filters).filter(Boolean).length
```

**🔄 Handlers**:

```javascript
// Atualizar filtro específico
const handleFilterChange = useCallback((key, value) => {
  onChange({ ...filters, [key]: value });
}, [filters, onChange]);

// Limpar todos os filtros
const handleClearFilters = useCallback(() => {
  onChange({});              // Objeto vazio
}, [onChange]);
```

**🎨 Renderização Condicional por Tipo**:

```bash
Filter Type Rendering
├── type === 'select'
│   └── <select> com <option value="">Todos</option>
│
├── type === 'checkbox'
│   └── Mapeia options em <label><input type="checkbox"></label>
│   └── Lógica: checked={(filters[key] || []).includes(option.value)}
│   └── Update: e.target.checked ? [...current, value] : filter(v => v !== value)
│
└── default (text)
    └── <input type={filter.type || 'text'} />
```

**💡 Usage Example**:

```javascript
import { FilterSection } from '../components/features/FilterSection';

const [filters, setFilters] = useState({});

const availableFilters = [
  {
    key: 'species',
    label: 'Espécie',
    type: 'select',
    options: [
      { value: 'dog', label: 'Cachorro' },
      { value: 'cat', label: 'Gato' },
    ]
  },
  {
    key: 'size',
    label: 'Porte',
    type: 'checkbox',
    options: [
      { value: 'small', label: 'Pequeno' },
      { value: 'medium', label: 'Médio' },
      { value: 'large', label: 'Grande' },
    ]
  }
];

<FilterSection
  filters={filters}
  onChange={setFilters}
  availableFilters={availableFilters}
/>
```

---

### `OngCard.jsx` - Card de ONG

**Purpose**: Exibição compacta de informações de uma ONG com ações rápidas.

**📡 Props Interface**:

```bash
OngCard Props
├── ong: object               # Dados da ONG
│   ├── id: string/number
│   ├── nome: string
│   ├── logo: string (URL)
│   ├── descricao: string
│   ├── cidade: string
│   ├── estado: string
│   ├── telefone: string
│   ├── email: string
│   ├── petsCount: number
│   └── avaliacao: number
├── onViewDetails: function   # Callback ver detalhes
├── onContact: function       # Callback contato
├── onFavorite: function      # Callback favoritar (opcional)
├── isFavorite: boolean       # Estado de favorito
└── className: string         # Classes adicionais
```

**🎨 Layout Structure**:

```bash
Card Structure
├── Card (hover effect)
│   ├── CardBody
│   │   ├── Header (flex justify-between)
│   │   │   ├── Left: Logo + Nome + Localização
│   │   │   │   ├── img (rounded-full, 64x64)
│   │   │   │   ├── h3 (nome, line-clamp-1)
│   │   │   │   └── MapPin + cidade/estado
│   │   │   └──
│   │   │       └── Right: Botão favoritar (Heart icon)
│   │   │           ├── isFavorite ? fill-red-500 : text-gray-400
│   │   │           └── onClick={() => onFavorite(id)}
│   │   ├──
│   │   ├── Descrição (p, line-clamp-3)
│   │   ├──
│   │   ├── Badges (flex-wrap gap-2)
│   │   │   ├── Badge info: {petsCount} pets disponíveis
│   │   │   └── Badge success: ⭐ {avaliacao.toFixed(1)}
│   │   └──
│   │   └── Contato (space-y-2)
│   │       ├── Phone + telefone
│   │       └── Mail + email
│   └──
│   └── CardFooter (flex gap-2)
│       ├── Button outline (flex-1): Ver Detalhes
│       │   └── onClick={() => onViewDetails(ong)}
│       └── Button primary (flex-1): Contato
│           └── onClick={() => onContact(ong)}
```

**💡 Usage Example**:

```javascript
import { OngCard } from '../components/features/OngCard';

<OngCard
  ong={ongData}
  onViewDetails={(ong) => navigate(`/ong/${ong.id}`)}
  onContact={(ong) => window.open(`mailto:${ong.email}`)}
  onFavorite={(id) => toggleFavoriteOng(id)}
  isFavorite={favorites.includes(ongData.id)}
/>
```

---

### `PetCard.jsx` - Card de Pet

**Purpose**: Card visual para exibição de pets com suporte a layout grid ou lista.

**📡 Props Interface**:

```bash
PetCard Props
├── pet: object               # Dados do pet
│   ├── id: string/number
│   ├── name: string
│   ├── image: string (URL)
│   ├── age: string
│   ├── breed: string
│   ├── location: string
│   ├── ong || ongName: string
│   ├── tags: array
│   └── description: string (opcional)
├── index: number             # Para delay na animação
└── layout: 'grid' | 'list'   # Layout do card
```

**🎨 Layout Variants**:

```bash
Layout: 'grid' (default)
├── motion.div
│   ├── rounded-2xl
│   ├── overflow-hidden
│   ├── border border-slate-700
│   └── hover:border-blue-500/50
├── Imagem Container
│   ├── aspect-[4/3]
│   ├── img: object-cover + hover:scale-105
│   ├── Badge ONG (absolute top-3 left-3)
│   └── Botão favorito (absolute top-3 right-3, opacity-0 group-hover:opacity-100)
└── Conteúdo (p-5)
    ├── Nome + Idade (flex justify-between)
    ├── Raça
    ├── Localização (MapPin)
    ├── Tags (flex-wrap, max 3 tags)
    └── Link "Quero adotar" (w-full)

Layout: 'list'
├── motion.div
│   └── flex flex-row
├── Imagem Container
│   └── w-48 h-48 (fixo)
└── Conteúdo (flex-1 justify-center)
    ├── Todos os campos do grid
    ├── Descrição (line-clamp-2, se existir)
    └── Link "Quero adotar" (mt-auto w-fit px-6)
```

**🎬 Animações (Framer Motion)**:

```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ 
  duration: 0.4, 
  delay: index * 0.05   // Stagger effect
}}
```

**🎨 Styling Highlights**:

```bash
Visual Effects
├── group-hover:scale-105 na imagem
├── group-hover:opacity-100 no botão favorito
├── bg-gradient-to-t from-black/60 via-transparent to-transparent
├── ring-2 ring-blue-100 dark:ring-blue-900 (avatar em testimonials)
└── hover:bg-blue-500 hover:text-white no botão de ação
```

**💡 Usage Example**:

```javascript
import PetCard from '../components/features/PetCard';

// Grid layout (default)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {pets.map((pet, index) => (
    <PetCard key={pet.id} pet={pet} index={index} />
  ))}
</div>

// List layout
<div className="flex flex-col gap-4">
  {pets.map((pet, index) => (
    <PetCard key={pet.id} pet={pet} index={index} layout="list" />
  ))}
</div>
```

---

### `SearchBar.jsx` - Barra de Pesquisa

**Purpose**: Input de busca com ícone, botão submit e botão limpar.

**📡 Props Interface**:

```bash
SearchBar Props
├── onSearch: function        # Callback com query string
├── placeholder: string       # Default: 'Buscar...'
├── initialValue: string      # Valor inicial
└── className: string         # Classes adicionais
```

**⚙️ State & Handlers**:

```bash
Estado Interno
└── query: string             # Valor do input

Handlers
├── handleSubmit(e)
│   ├── e.preventDefault()
│   └── onSearch(query.trim())
│
└── handleClear()
    ├── setQuery('')
    └── onSearch('')          # Dispara busca vazia
```

**🎨 Estrutura**:

```bash
<form> (flex gap-2)
├── <div> relative flex-1
│   ├── Input (type="text", value={query})
│   └── Botão X (condicional: query && ...)
│       └── absolute inset-y-0 right-0
│       └── onClick={handleClear}
│
└── <Button type="submit" variant="primary">
    ├── Search icon (w-4 h-4 mr-2)
    └── "Buscar"
```

**💡 Usage Example**:

```javascript
import { SearchBar } from '../components/features/SearchBar';

const handleSearch = (query) => {
  setSearchParams({ q: query });
  // ou: fetchPets({ search: query })
};

<SearchBar
  onSearch={handleSearch}
  placeholder="Buscar pets por nome, raça..."
  initialValue={searchParams.get('q') || ''}
/>
```

---

### `TestimonialsSlider.jsx` - Carrossel de Depoimentos

**Purpose**: Slider de depoimentos com efeito coverflow, navegação customizada e autoplay.

**📡 Swiper Configuration**:

```bash
Swiper Props
├── effect: 'coverflow'
├── grabCursor: true
├── centeredSlides: true
├── slidesPerView: 'auto'
├── loop: true
├── coverflowEffect
│   ├── rotate: 0
│   ├── stretch: 0
│   ├── depth: 100
│   ├── modifier: 2.5
│   └── slideShadows: false
├── navigation
│   ├── prevEl: '.swiper-button-prev-custom'
│   └── nextEl: '.swiper-button-next-custom'
├── autoplay
│   ├── delay: 5000
│   ├── disableOnInteraction: false
│   └── pauseOnMouseEnter: true
└── breakpoints
    ├── 320: { slidesPerView: 1, depth: 50, modifier: 1 }
    ├── 640: { slidesPerView: 2, depth: 100, modifier: 2 }
    └── 1024: { slidesPerView: 3, depth: 100, modifier: 2.5 }
```

**🎨 Slide Structure**:

```bash
SwiperSlide (max-w-md)
├── motion.div (isActive ? scale-100 : scale-90)
│   ├── rounded-3xl
│   ├── p-8
│   ├── shadow-xl
│   └── border border-gray-100
├── Quote icon (w-10 h-10, text-blue-200)
├── Texto do depoimento (text-lg italic, flex-grow)
├── Footer (flex items-center gap-4)
│   ├── Avatar (w-14 h-14, rounded-full, ring-2)
│   ├── Nome (font-bold text-lg)
│   ├── Role (text-sm text-gray-500)
│   └── Pet info (opcional: PawPrint + nome)
│       └── Condicional: {testimonial.pet && (...)}
```

**🎮 Navegação Customizada**:

```bash
Navigation Container (flex justify-center gap-4)
├── Botão Anterior
│   ├── className: swiper-button-prev-custom
│   ├── w-12 h-12 rounded-full
│   ├── bg-white dark:bg-gray-800
│   ├── shadow-lg + border
│   └── hover:bg-blue-50
│
├── Indicadores (flex gap-2)
│   └── Mapeia testimonials
│       ├── w-2 h-2 rounded-full
│       ├── Ativo: w-8 bg-blue-600
│       └── Inativo: bg-gray-300
│
└── Botão Próximo
    └── Mesma estrutura do anterior
    └── className: swiper-button-next-custom
```

**⚙️ State Management**:

```javascript
const [activeIndex, setActiveIndex] = useState(0);

// Atualiza índice no slide change
onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
```

**💡 Usage Example**:

```javascript
import TestimonialsSlider from '../components/features/TestimonialsSlider';

// Dados em mockData.js
const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Adotante',
    image: '/avatar1.jpg',
    text: 'Adotar o Rex mudou minha vida...',
    pet: 'Rex (Golden Retriever)'
  },
  // ...
];

<TestimonialsSlider />
```

---

## 🔄 Integration Patterns

### Composição com UI Components

```bash
Features → UI Components
├── AdoptionForm
│   ├── usa: Input (dos ui components)
│   └── mas: tem lógica complexa própria
│
├── OngCard
│   ├── usa: Card, CardBody, CardFooter
│   ├── usa: Badge
│   └── usa: Button
│
├── FilterSection
│   ├── usa: Input
│   ├── usa: Button
│   └── usa: Badge (para contador)
│
├── SearchBar
│   ├── usa: Input
│   └── usa: Button
│
└── PetCard
    └── não usa UI components (estilização própria com Tailwind)
```

### Callbacks Pattern

```javascript
// Padrão consistente em todos os features
const handleAction = (data) => {
  // Processa dados
  onSubmit(data);    // ou onChange, onClick, etc
};
```

---

## 📝 Notes & Best Practices

1. **AdoptionForm**: Use `mode: 'onChange'` para feedback imediato, mas cuidado com performance em forms grandes
2. **FilterSection**: Sempre forneça um botão "Limpar" quando houver filtros ativos
3. **PetCard**: O layout "list" é ideal para visualização em mobile ou dashboards administrativos
4. **TestimonialsSlider**: O `pauseOnMouseEnter` melhora UX em autoplay
5. **OngCard**: Verifique se `onFavorite` existe antes de renderizar o botão (feature opcional)

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do AdoptionForm com 8 etapas e validação Zod
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Implementado FilterSection com filtros dinâmicos
│   └── Autor: @Rsenju
│
├── 2026-03-11
│   ├── [+] Criado OngCard e PetCard com animações Framer Motion
│   ├── [+] PetCard suporta layouts grid e list
│   └── Autor: @Rsenju
│
├── 2026-03-10
│   ├── [+] SearchBar com input controlado e botão limpar
│   └── Autor: @Rsenju
│
└── 2026-03-09
    ├── [+] TestimonialsSlider com Swiper e efeito Coverflow
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Features Components Layer*
