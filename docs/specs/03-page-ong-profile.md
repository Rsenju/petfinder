
# Pagina: Perfil da ONG (OngProfile.jsx)

Especificacao de implementacao da pagina publica de perfil de ONG

---

## Contexto

Projeto React 19 + Vite + TailwindCSS v4.

Stack instalado:
- react-router-dom v7
- @tanstack/react-query v5
- framer-motion
- lucide-react

Rota: /ongs/:id

---

## Restricoes

- Seguir arquitetura atual
- Buscar dados via useOngs ou funcao especifica em api/ongs.js
- NAO acessar mockData diretamente na pagina
- Separar logica de renderizacao da UI

---

## Funcionalidades

### 1. Roteamento

```javascript
// Rota dinamica
/ongs/:id

// Exemplo
/ongs/123 -> Perfil da ONG com ID 123
```

### 2. Dados da Pagina

Parametro da URL:
- id (string) - ID da ONG

Hooks utilizados:
- useParams() - Extrair ID da URL
- useOngs() ou funcao especifica - Buscar dados da ONG
- usePets() - Buscar pets desta ONG

---

## Responsabilidades

Pagina (OngProfile.jsx)

Orquestracao:
- Extrair ID da URL
- Buscar dados da ONG via hook
- Buscar pets da ONG via hook
- Renderizar secoes em ordem

## Secoes a Renderizar:

```markdown
| Secao                | Componente        | Dados                        |
| -------------------- | ----------------- | ---------------------------- |
| Header institucional | Inline            | nome, logo, cidade, verified |
| Badge verificada     | Badge (ui)        | verified (boolean)           |
| Timeline de resgates | Inline/Componente | array de eventos             |
| Depoimentos          | Inline/Componente | array de depoimentos         |
| Secao transparencia  | Inline/Componente | metricas, links              |
| Botao doar           | Inline            | onClick para modal/link      |
| Lista de pets        | PetCard (grid)    | pets da ONG                  |
```
---

## Integracoes

## Busca de Dados

```plain
URL (/ongs/123)
    |
useParams() -> id = "123"
    |
useOngs({ id }) -> ongData
    |
usePets({ ongId: id }) -> petsData
    |
Render

Regra: NUNCA buscar mockData diretamente. Sempre via hooks.
```
---

## UX/UI

### Layout

```plain
[Header Institucional]
  - Logo, nome, badge verificado
  - Cidade, estado
  - Botao "Apoiar esta ONG"

[Grid 2 cols]
  Coluna principal (2fr):
    - Timeline de resgates
    - Depoimentos
    - Transparencia
  
  Sidebar (1fr):
    - Info de contato
    - Redes sociais
    - Dados bancarios (doacao)

[Full width]
  - Lista de pets da ONG (grid 3 cols)
  ```

### Estados

  ```markdown
  | Estado    | Comportamento                        |
| --------- | ------------------------------------ |
| Loading   | Skeleton em todas as secoes          |
| Error     | Mensagem + botao voltar para /ongs   |
| Not found | 404 customizado "ONG nao encontrada" |
| Success   | Render completo com animacoes        |
```

### Animacoes

- ScrollReveal em cada secao
- Framer-motion: fade-in + slide-up
- Stagger nos cards de pets
- Hover effects nos botoes
---

## Estrutura do Arquivo

```jsx
// OngProfile.jsx
import { useParams } from 'react-router-dom';
import { useOngs } from '../hooks/useOngs';
import { usePets } from '../hooks/usePets';
import { Badge } from '../components/ui/Badge';
import { PetCard } from '../components/features/PetCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';

// Sub-componentes (definidos no mesmo arquivo ou separados)
function OngHeader({ ong }) {...}
function TimelineSection({ timeline }) {...}
function TestimonialsSection({ testimonials }) {...}
function TransparencySection({ transparency }) {...}
function OngPetsSection({ pets, isLoading }) {...}

export default function OngProfile() {
  const { id } = useParams();
  const { data: ong, isLoading: isLoadingOng } = useOngs({ id });
  const { data: pets, isLoading: isLoadingPets } = usePets({ ongId: id });
  
  if (isLoadingOng) return <OngProfileSkeleton />;
  if (!ong) return <NotFound />;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <OngHeader ong={ong} />
      
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <TimelineSection timeline={ong.timeline} />
          <TestimonialsSection testimonials={ong.testimonials} />
          <TransparencySection transparency={ong.transparency} />
        </div>
        
        <aside className="space-y-6">
          <DonationCard ong={ong} />
          <ContactCard ong={ong} />
        </aside>
      </div>
      
      <OngPetsSection pets={pets} isLoading={isLoadingPets} />
    </div>
  );
}
```
---

## Schema de Dados Esperado

```javascript
// ONG
{
  id: "123",
  nome: "Amigo Fiel",
  logo: "https://...",
  verified: true,
  cidade: "Salvador",
  estado: "BA",
  descricao: "...",
  timeline: [
    { date: "2020", evento: "Fundacao", descricao: "..." },
    { date: "2021", evento: "100 resgates", descricao: "..." }
  ],
  testimonials: [
    { autor: "Maria", texto: "...", pet: "Luna" }
  ],
  transparency: {
    doacoesRecebidas: "R$ 50.000",
    animaisResgatados: 200,
    animaisAdotados: 150
  },
  dadosBancarios: {
    banco: "Itau",
    agencia: "0001",
    conta: "12345-6"
  }
}
```
---

## Criterios de Aceitacao

- [ ] Rota /ongs/:id funcional
- [ ] Usa useParams para extrair ID
- [ ] Busca ONG via hook (nao mockData direto)
- [ ] Busca pets via usePets com ongId
- [ ] Renderiza todas as 7 secoes especificadas
- [ ] Usa componente Badge para verificacao
- [ ] Usa PetCard para lista de pets
- [ ] ScrollReveal aplicado
- [ ] Skeleton loading completo
- [ ] Estado de erro tratado
- [ ] Layout responsivo
- [ ] Codigo separado em sub-componentes
---

## Implementacao

Arquivo: src/pages/OngProfile.jsx

Dependencias: Stack existente

Tempo estimado: 6-8 horas
---