
# Pagina: Listagem de ONGs (Ongs.jsx)

Especificacao de implementacao da pagina de busca e listagem de ONGs

---

## Contexto

Projeto React 19 + Vite + TailwindCSS v4.

Stack instalado:
- react-router-dom v7
- @tanstack/react-query v5
- zustand
- framer-motion
- lucide-react

---

## Restricoes

- Respeitar arquitetura existente
- NAO criar novas pastas
- NAO buscar dados direto na pagina
- Usar hooks existentes em src/hooks/useOngs.js
- Reutilizar componentes existentes

---

## Funcionalidades

### 1. Componentes Reutilizados

| Componente | Origem | Proposito |
|------------|--------|-----------|
| OngCard | components/features/OngCard.jsx | Cards de ONG |
| SearchBar | components/features/SearchBar.jsx | Busca textual |
| SkeletonCard | components/ui/SkeletonCard.jsx | Loading state |
| FilterSection | components/features/FilterSection.jsx | Filtros agrupados |

### 2. Hooks Utilizados

| Hook | Origem | Proposito |
|------|--------|-----------|
| useOngs | src/hooks/useOngs.js | Buscar dados de ONGs |
| useGeolocation | src/hooks/useGeolocation.js | Filtro "Proximo a mim" |

---

## Responsabilidades

### Pagina (Ongs.jsx)

Orquestracao:
- Layout da pagina
- Consumo do hook useOngs
- Controle de estado dos filtros
- Renderizacao condicional

Renderizar:
- Header com titulo e descricao
- SearchBar (busca por nome)
- FilterSection (filtros avancados)
- Lista de OngCard (grid)
- Empty state (quando nao ha resultados)
- Skeleton loading (estado inicial)

### Hook useOngs

Responsabilidades:
- React Query (cache, refetch)
- Aplicacao de filtros
- Chamada a camada api/ongs.js

IMPORTANTE: Pagina NUNCA chama api/ diretamente.

---

## Mapa Interativo

Implementacao: Componente interno na propria pagina.

Funcionalidades:
- Simulacao de mapa (sem lib externa)
- Pins baseados em coordenadas do mockData
- Interacao: hover no card -> highlight no pin
- Interacao: click no pin -> scroll para card

Restricao: Nao criar pasta nova, implementar inline.

---

## Filtros

### Filtros Disponiveis

| Filtro | Tipo | Persistencia |
|--------|------|--------------|
| cidade | select | URL + localStorage |
| verificada | toggle | URL + localStorage |
| busca por nome | text input | URL + localStorage |
| proximo a mim | button | localStorage apenas |

### Sincronizacao

```jsx
// Ler da URL ao carregar
const [searchParams] = useSearchParams();

// Escrever na URL ao alterar
setSearchParams({ cidade: 'Salvador', verificada: 'true' });

// Persistir no localStorage
localStorage.setItem('ongsFilters', JSON.stringify(filters));
```
---

## UX/UI

### Layout Responsivo

```plain
Desktop (lg):
[Header]
[Search + Filtros] [Mapa]
[Grid 3 cols de ONGs]

Tablet (md):
[Header]
[Search + Filtros]
[Grid 2 cols de ONGs]

Mobile (sm):
[Header]
[Search]
[Filtros collapsible]
[Stack de ONGs]
```
## Estados

```markdown
| Estado  | Visual                                |
| ------- | ------------------------------------- |
| Loading | Skeleton cards (6 unidades)           |
| Empty   | Icone + mensagem + CTA limpar filtros |
| Error   | Alert + botao retry                   |
| Success | Grid de OngCards                      |
```

### Microinteracoes

- Hover no card: scale 1.02 + shadow
- Filtro ativo: badge com contador
- Transicoes: framer-motion (fade + slide)
- Loading: pulse animation

---

## Estrutura do Arquivo

```jsx
// Ongs.jsx
import { useOngs } from '../hooks/useOngs';
import { useGeolocation } from '../hooks/useGeolocation';
import { OngCard } from '../components/features/OngCard';
import { SearchBar } from '../components/features/SearchBar';
import { FilterSection } from '../components/features/FilterSection';
import { SkeletonCard } from '../components/ui/SkeletonCard';

export default function Ongs() {
  // Hooks
  const { ongs, isLoading, error } = useOngs(filters);
  const { location } = useGeolocation();
  
  // Estados locais
  const [filters, setFilters] = useState({...});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  
  // Efeitos
  useEffect(() => { /* sync URL */ }, [filters]);
  useEffect(() => { /* load from localStorage */ }, []);
  
  // Handlers
  const handleFilterChange = (key, value) => {...};
  const clearFilters = () => {...};
  
  // Render
  return (...)
}
```
---

## Criterios de Aceitacao

- [ ] Usa useOngs hook (nao chama API direto)
- [ ] Reutiliza componentes existentes
- [ ] Filtros sincronizados com URL
- [ ] Filtros persistidos no localStorage
- [ ] Mapa simulado implementado
- [ ] Layout responsivo
- [ ] Skeleton loading
- [ ] Empty state elegante
- [ ] Animacoes com framer-motion
- [ ] Codigo limpo e organizado

---

## Implementacao

Arquivo: src/pages/Ongs.jsx

Dependencias: Nenhuma (usar stack existente)

Tempo estimado: 4-6 horas
---