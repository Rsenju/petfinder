# Refatoracao da Camada de Dados

Especificacao tecnica para reorganizacao da arquitetura de dados

---

## Contexto

Projeto React 19 + Vite + TailwindCSS v4.

Stack instalado:
- react-router-dom v7
- @tanstack/react-query v5
- zustand
- framer-motion

---

## Restricoes

- NAO criar nova estrutura de pastas
- Trabalhar dentro das pastas existentes:
  - src/data
  - src/api
  - src/utils
  - src/hooks

---

## Estrutura Alvo

### 1. src/data/mockData.js

Transformar em fonte central de dados estaticos.

Exportar:
- ongs - Array de ONGs
- pets - Array de pets

Funcoes auxiliares:
- getOngById(id) - Busca ONG por ID
- getPetsByOng(ongId) - Filtra pets por ONG
- getFilteredOngs(filters) - Filtros combinados
- getFilteredPets(filters) - Filtros combinados

Regras:
- Apenas dados e funcoes puras
- NENHUMA logica de React
- NENHUM side effect

---

### 2. src/api/ongs.js

Camada de API para ONGs.

Implementar:
```javascript
fetchOngs(filters) -> Promise<Ong[]>
fetchOngById(id) -> Promise<Ong>
```

Comportamento:

- Simular delay de rede (500-1500ms)
- Usar mockData como fonte
- Retornar Promise resolvida/rejeitada
- Tratar erros com mensagens amigaveis
---

### 3. src/api/pets.js

Camada de API para Pets.

Implementar:
```javascript
fetchPets(filters) -> Promise<Pet[]>
fetchPetById(id) -> Promise<Pet>
fetchPetsByOng(ongId) -> Promise<Pet[]>
```

Comportamento:
Mesmo padrao de ongs.js
Filtros combinaveis (cidade, especie, porte, etc.)
Paginacao opcional

---

### 4. Hooks

useOngs.js

- Usar React Query v5
- Consumir api/ongs.js
- Cache e stale time configurados
- Retornar: { data, isLoading, error, refetch }

usePets.js

- Usar React Query v5
- Consumir api/pets.js
- Filtros como query key
- Retornar: { data, isLoading, error, refetch }

## Regras de Arquitetura

```plain
FLUXO OBRIGATORIO

Page -> Hook -> API -> MockData

NAO: Page NUNCA acessa mockData
NAO: Page NUNCA chama fetch direto
SIM: Hook chama API
SIM: API usa mockData
SIM: mockData eh fonte estatica
```
## Criterios de Aceitacao

- [ ] mockData exporta dados e funcoes puras
- [ ] API simula delay e retorna Promises
- [ ] Hooks usam React Query corretamente
- [ ] Nenhuma pagina importa mockData diretamente
- [ ] Nenhuma pagina chama funcoes de API diretamente
- [ ] Imports existentes nao quebram
- [ ] Codigo organizado e documentado

## Padroes de Codigo

- Nomes em camelCase
- Funcoes async/await
- Error handling com try/catch
- JSDoc para tipos
- Sem console.log em producao
---
## Implementacao

Implementar em: src/data/mockData.js, src/api/ongs.js, src/api/pets.js, src/hooks/useOngs.js, src/hooks/usePets.js
---