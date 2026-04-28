
# Pagina: Listagem de Pets (Pets.jsx)

Especificacao de implementacao da pagina de busca e listagem de pets

---

## Contexto

Projeto React 19 + Vite + TailwindCSS v4.

Stack instalado:
- react-router-dom v7
- @tanstack/react-query v5
- zustand
- framer-motion
- react-hook-form + zod
- use-debounce
- date-fns
- clsx + tailwind-merge
- lucide-react
- @faker-js/faker (mock)
- msw (mock API)

---

## Restricoes

- NAO recriar o projeto
- NAO instalar dependencias adicionais
- Implementar tudo dentro de Pets.jsx
- Preparar para backend real futuramente

---

## Funcionalidades

### 1. Listagem de Pets

Requisitos:
- Exibir lista de pets (mockados via MSW ou faker)
- Suportar 1000+ registros
- Layout alternavel: Grid / List
- Cards animados com framer-motion

Performance:
- Virtualizacao manual simples (sem libs extras) 
- OU infinite scroll otimizado
- Lazy loading de imagens
- Memoizacao adequada (React.memo, useMemo)

---

### 2. Filtros Combinados

Filtros disponiveis:

| Filtro | Tipo | UI |
|--------|------|-----|
| cidade | select | Dropdown |
| especie | select | Dropdown (cachorro/gato) |
| porte | select | Dropdown (pequeno/medio/grande) |
| idade | select | Dropdown (filhote/adulto/idoso) |
| sexo | select | Dropdown (macho/femea) |
| busca por nome | text | Input com autocomplete |

Requisitos tecnicos:
- Filtros combinaveis (todos juntos)
- Sincronizar com URL: /pets?cidade=salvador&especie=cachorro
- Ler filtros da URL ao carregar a pagina
- Persistir filtros no localStorage
- Usar Zustand para estado global de filtros
- Debounce na busca por nome (300ms)

---

```markdown
### 3. Performance

React Query v5:

```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['pets', filters],
  queryFn: () => fetchPets(filters),
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 10 * 60 * 1000, // 10 minutos
});

```

Otimizacoes:

- Skeleton loading enquanto carrega
- Evitar re-render desnecessario
- Memoizar componentes de lista
- Virtualizar lista longa (opcional)
---

### 4. UX Senior

Elementos:

```markdown
| Elemento         | Descricao                                      |
| ---------------- | ---------------------------------------------- |
| Sticky Filters   | Barra de filtros fixa no topo ao scrollar      |
| Toggle Grid/List | Botao para alternar visualizacao               |
| Empty State      | Ilustracao + mensagem quando nao ha resultados |
| Loading State    | Skeleton animado                               |
| Transicoes       | Framer-motion para entrada/saida de elementos  |
| Responsivo       | Mobile-first (sm -> md -> lg)                  |
```
---

### 5. Arquitetura

Separar logica da UI:

```plain
Pets.jsx (pagina)
├── hooks/
│   ├── usePetFilters.js      # Logica de filtros
│   └── useUrlSync.js         # Sincronizacao com URL
├── store/
│   └── useFilterStore.js     # Zustand store
├── api/
│   └── fetchPets.js          # Funcao de fetch simulada
└── componentes internos
    ├── PetGrid.jsx
    ├── PetList.jsx
    └── FilterBar.jsx
```

Preparado para backend real:

- Interface clara entre API e UI
- Facil substituir mock por fetch real
- Tipagem com JSDoc ou TypeScript (opcional)

---
## Estilo

Tailwind v4:

- Design moderno e limpo
- Espacamentos consistentes (sistema 4px/8px)
- Cores semanticas (primary, secondary, success, warning, error)
- Classes organizadas com clsx + tailwind-merge

Exemplo:

```jsx
className={cn(
  "flex items-center gap-2 px-4 py-2 rounded-lg",
  "bg-blue-600 text-white hover:bg-blue-700",
  "transition-colors duration-200",
  isActive && "ring-2 ring-blue-400"
)}

```

## Estrutura do Arquivo

```jsx
// Pets.jsx
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { create } from 'zustand';
import { motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import { cn } from '../utils/cn';

// Store Zustand
const useFilterStore = create((set) => ({
  filters: { city: '', species: '', ... },
  setFilter: (key, value) => set(...),
  clearFilters: () => set(...),
}));

// Hook customizado
function usePetFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilter } = useFilterStore();
  // ... logica de sync URL/store
  
  return { filters, setFilter, clearFilters };
}

// Componente principal
export default function Pets() {
  const { filters } = usePetFilters();
  const [debouncedSearch] = useDebounce(filters.name, 300);
  
  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets', { ...filters, name: debouncedSearch }],
    queryFn: () => fetchPets({ ...filters, name: debouncedSearch }),
  });
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  return (
    <div className="min-h-screen bg-gray-50">
      <StickyFilters 
        filters={filters} 
        onChange={setFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      {isLoading ? (
        <SkeletonGrid count={12} />
      ) : pets?.length > 0 ? (
        <motion.div layout>
          {viewMode === 'grid' ? (
            <PetGrid pets={pets} />
          ) : (
            <PetList pets={pets} />
          )}
        </motion.div>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </div>
  );
}

```
---

## Criterios de Aceitacao

- [ ] Listagem com 1000+ registros performatica
- [ ] Filtros combinaveis funcionando
- [ ] Sincronizacao com URL implementada
- [ ] Persistencia no localStorage
- [ ] Zustand store para filtros
- [ ] Debounce na busca por nome
- [ ] React Query para cache
- [ ] Toggle Grid/List funcional
- [ ] Sticky filters no scroll
- [ ] Skeleton loading
- [ ] Empty state elegante
- [ ] Animacoes com framer-motion
- [ ] Responsivo (mobile-first)
- [ ] Codigo limpo e escalavel
- [ ] Preparado para backend real
---

## Implementacao

Arquivo: src/pages/Pets.jsx

Dependencias: Todas ja instaladas

Tempo estimado: 8-10 horas
---