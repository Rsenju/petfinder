# Documentacao PetFinder

Central de documentacao tecnica do projeto PetFinder.

---

## Especificacoes Tecnicas (specs/)

Requisitos para implementacao futura. Contem especificacoes detalhadas de funcionalidades pendentes.

| Arquivo | Descricao | Status |
|---------|-----------|--------|
| [01 - Refatoracao da Camada de Dados](specs/01-data-layer-refactor.md) | Fluxo Page -&gt; Hook -&gt; API -&gt; MockData | Pendente |
| [02 - Pagina: Listagem de ONGs](specs/02-page-ongs.md) | Busca, filtros e mapa de ONGs | Pendente |
| [03 - Pagina: Perfil da ONG](specs/03-page-ong-profile.md) | Perfil publico com timeline e transparencia | Pendente |
| [04 - Pagina: Listagem de Pets](specs/04-page-pets.md) | Filtros avancados, infinite scroll, grid/list | Pendente |
| [05 - Pagina: Detalhes do Pet](specs/05-page-pet-detail.md) | Galeria, match simulator, formulario de adocao | Pendente |

---

## Arquitetura do Codigo (architecture/)

Documentacao do codigo existente. Referencia tecnica para desenvolvedores.

### Camada de Dados

| Arquivo | Descricao |
|---------|-----------|
| [API](architecture/api_documentation.md) | Funcoes de fetch e integracao com backend |
| [Mock Data](architecture/mockdata_documentation.md) | Dados estaticos para desenvolvimento |
| [Auth Context](architecture/auth_context_documentation.md) | Contexto de autenticacao (Provider/Consumer) |

### Hooks Customizados

| Arquivo | Descricao |
|---------|-----------|
| [Hooks](architecture/hooks_documentation.md) | useAuth, usePets, useOngs, useGeolocation |

### Componentes

| Arquivo | Descricao |
|---------|-----------|
| [Features](architecture/features_documentation.md) | Componentes de funcionalidades (OngCard, PetCard, etc) |
| [Layout](architecture/layout_documentation.md) | Estrutura da pagina (Header, Footer, Sidebar) |
| [UI](architecture/ui_documentation.md) | Elementos reutilizaveis (Button, Input, Card, Badge) |

### Paginas e Utilitarios

| Arquivo | Descricao |
|---------|-----------|
| [Pages](architecture/pages-documentation.md) | 16 paginas da aplicacao documentadas |
| [Utils](architecture/utils_documentation.md) | Validacoes, helpers e funcoes utilitarias |

---

## Guia de Contribuicao

### Para Especificacoes (specs/)

1. Leia o arquivo correspondente antes de iniciar implementacao
2. Siga as restricoes e regras de arquitetura
3. Atualize o status para "Em progresso" ou "Concluido" ao finalizar

### Para Documentacao (architecture/)

1. Mantenha sincronizado com o codigo fonte
2. Atualize quando houver mudancas de API ou comportamento
3. Use exemplos de codigo claros e funcionais

---

## Fluxo de Desenvolvimento

Especificacao (specs/)
|
v
Implementacao (src/)
|
v
Documentacao (architecture/)

---


1. Leia a especificacao em `specs/`
2. Implemente em `src/`
3. Atualize a documentacao em `architecture/` se necessario

---

## Stack Tecnologico

- React 19
- Vite
- TailwindCSS v4
- React Router v7
- TanStack Query v5
- Zustand
- Framer Motion
- React Hook Form + Zod

---

## Contato

Duvidas sobre a documentacao? Consulte a equipe de arquitetura ou abra uma issue no repositorio.