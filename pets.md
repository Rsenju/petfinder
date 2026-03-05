Contexto:
Projeto React 19 + Vite + TailwindCSS v4.
Já estão instalados:

* react-router-dom v7
* @tanstack/react-query v5
* zustand
* framer-motion
* react-hook-form + zod
* use-debounce
* date-fns
* clsx + tailwind-merge
* lucide-react
* @faker-js/faker (mock)
* msw (mock API)

⚠️ NÃO recriar o projeto.
⚠️ NÃO instalar dependências.
⚠️ Apenas implementar o código completo da página.

---

🎯 Objetivo:
Criar uma página profissional de listagem de pets com filtros avançados, performance otimizada e UX senior.

---

## Funcionalidades obrigatórias

### 1️⃣ Listagem

* Exibir lista de pets (mockados via MSW ou faker)
* Suportar 1000+ registros
* Layout alternável: Grid / List
* Cards animados com framer-motion

---

### 2️⃣ Filtros combinados

Filtros:

* cidade
* especie
* porte
* idade
* sexo
* busca por nome (autocomplete com debounce)

Requisitos:

* Filtros combináveis
* Sincronizar com URL:
  /pets?cidade=salvador&especie=cachorro
* Ler filtros da URL ao carregar
* Persistir filtros no localStorage
* Usar Zustand para estado global de filtros

---

### 3️⃣ Performance

Usar React Query v5:

```js
const { data, isLoading } = useQuery({
  queryKey: ['pets', filters],
  queryFn: () => fetchPets(filters),
  staleTime: 5 * 60 * 1000,
})
```

* Implementar virtualização manual simples (sem libs extras)
  OU
* Implementar infinite scroll otimizado
* Skeleton loading
* Evitar re-render desnecessário (memoização adequada)

---

### 4️⃣ UX Senior

* Sticky Filters (topo fixo)
* Toggle Grid/List
* Empty State elegante com ícone do lucide-react
* Loading state animado
* Transições suaves com framer-motion
* Responsivo (mobile first)

---

### 5️⃣ Arquitetura

Separar lógica da UI:

* Hook usePetFilters
* Hook useUrlSync
* Store com Zustand
* Função fetchPets simulando API real
* Código limpo e escalável
* Preparado para backend real futuramente

---

🎨 Estilo

* Tailwind v4
* Design moderno
* Espaçamentos consistentes
* Classes organizadas com clsx + tailwind-merge

---

⚠️ Importante

* Código completo e funcional
* Sem comentários excessivos
* Estrutura profissional
* Não simplificar demais
* Pensar como produto real de adoção de pets

Implemente tudo dentro do arquivo `Pets.jsx`.
