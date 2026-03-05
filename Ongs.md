Atualize o arquivo `src/pages/Ongs.jsx`.

⚠️ Respeitar a arquitetura existente.
⚠️ NÃO criar novas pastas.
⚠️ NÃO buscar dados direto na página.
⚠️ Usar os hooks já existentes em `src/hooks/useOngs.js`.
⚠️ Usar componentes já existentes quando possível.

---

# 🎯 Objetivo

Implementar página de listagem de ONGs com:

* Cards reutilizando `components/features/OngCard.jsx`
* Barra de busca reutilizando `components/features/SearchBar.jsx`
* Skeleton reutilizando `components/ui/SkeletonCard.jsx`
* Filtros organizados com `FilterSection.jsx`
* Hook `useOngs` para buscar dados
* Hook `useGeolocation` para "Próximo a mim"

---

# 📦 Responsabilidades

## Página (`Ongs.jsx`)

* Orquestrar layout
* Consumir hook `useOngs`
* Controlar filtros
* Renderizar:

  * Header
  * SearchBar
  * FilterSection
  * Lista de OngCard
  * Empty state
  * Skeleton

## Hook (`useOngs.js`)

* Responsável por:

  * React Query
  * Filtros
  * Cache
  * Chamada à camada `api/ongs.js`

Página NÃO deve chamar `api/` diretamente.

---

# 🗺️ Mapa

Implementar mapa simulado dentro da própria página (componente interno).
Não criar nova pasta.
Simular pins com base nas coordenadas das ONGs do mockData.

---

# 🔎 Filtros

* cidade
* verificada
* busca por nome
* próximo a mim

Sincronizar com URL usando react-router-dom.
Persistir filtros no localStorage.

---

# 🎨 UX

* Layout responsivo
* Skeleton loading
* Empty state
* Microinterações com framer-motion

---

Código limpo.
Respeitar estrutura atual.
Não mover arquivos existentes.
