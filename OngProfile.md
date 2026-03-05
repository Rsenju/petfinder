Criar o arquivo `src/pages/OngProfile.jsx`.

⚠️ Seguir arquitetura atual.
⚠️ Buscar dados via `useOngs` ou criar função específica em `api/ongs.js`.
⚠️ Não acessar mockData diretamente na página.

---

# 🎯 Objetivo

Criar página pública da ONG acessada por:

/ongs/:id

---

# 📦 Responsabilidades

## Página

* Pegar ID via react-router-dom
* Consumir hook que busca ONG por ID
* Renderizar:

  * Header institucional
  * Badge verificada (usar `components/ui/Badge.jsx`)
  * Timeline de resgates
  * Depoimentos
  * Seção transparência
  * Botão doar
  * Lista de pets da ONG (reutilizar `PetCard.jsx`)

---

# 🔁 Integrações

* Buscar pets da ONG via `usePets`
* Não buscar dados direto do mock

---

# 🎨 UX

* Layout responsivo
* ScrollReveal já existente
* Animações com framer-motion
* Skeleton enquanto carrega

---

Separar lógica de renderização.
Não misturar regra de negócio na UI.
