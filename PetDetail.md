Contexto:
Projeto React 19 + Vite + TailwindCSS v4.
Stack já instalado:

* react-router-dom v7
* @tanstack/react-query v5
* zustand
* framer-motion
* react-hook-form + zod
* use-debounce
* lucide-react
* date-fns
* clsx + tailwind-merge
* msw + faker (mock API)

⚠️ Não recriar projeto.
⚠️ Não instalar dependências.
⚠️ Implementar tudo dentro de `PetDetail.jsx`.

---

# 🎯 Objetivo

Criar uma página de detalhes do pet com UX premium, performance otimizada, acessibilidade avançada e arquitetura escalável.

---

# 🖼 1️⃣ Galeria & Mídia (estilo Airbnb)

Implementar:

* Galeria com thumbnails laterais
* Imagem principal com zoom (hover ou click)
* Modal fullscreen com navegação por setas
* Lazy load progressivo:

  * Thumbnail primeiro
  * Versão HD depois
* Suporte a:

  * Vídeo do pet (se disponível)
  * Foto 360° panorâmica (se disponível)

Usar framer-motion para animações suaves.

---

# 📊 2️⃣ Informações estruturadas

Usar o seguinte schema como base:

```js
const petSchema = {
  nome: "Luna",
  especie: "cachorro",
  raca: "Vira-lata",
  idade: { valor: 2, tipo: "anos" },
  porte: "medio",
  sexo: "femea",
  vacinado: true,
  castrado: true,
  vermifugado: true,
  condicoesEspeciais: ["cegueira", "sem_pata"],
  temperamento: ["docil", "brincalhao", "calmo"],
  historia: "Resgatada das ruas em 2023...",
  ong: { nome: "Amigo Fiel", contato: "..." }
}
```

Exibir:

* Badges visuais para vacinado / castrado / vermifugado
* Tags para temperamento
* Indicador visual para condições especiais
* Seção “História”
* Informações da ONG com botão de contato

---

# 🧠 3️⃣ Funcionalidades avançadas

### ✔ Simulador de Match

Pequeno formulário que calcula compatibilidade (mockado).
Exibir resultado com porcentagem animada.

### ✔ Formulário de pré-adoção (multi-step wizard)

* React Hook Form
* Validação com Zod
* Etapas:

  1. Dados pessoais
  2. Moradia
  3. Experiência com pets
* Barra de progresso animada

### ✔ Favoritar

* Salvar em Zustand
* Exibir toast animado ao favoritar
* Ícone interativo (lucide-react)

### ✔ Compartilhar

Botões:

* WhatsApp
* Instagram Story (simulação de deep link)

### ✔ Pets similares

Buscar via React Query:

* Mesma ONG
  OU
* Mesma espécie + porte

---

# ♿ 4️⃣ Acessibilidade (nível profissional)

* Skip to content
* Alt text detalhado nas imagens
* Navegação completa por teclado
* Foco visível
* Contraste adequado (WCAG AAA)
* aria-label onde necessário

---

# 🚀 5️⃣ Performance

* React Query v5 para buscar pet por ID
* Cache inteligente
* Skeleton loading
* Lazy loading de mídia
* Evitar re-render desnecessário

---

# 🎨 Estilo

* Tailwind v4
* Layout responsivo
* Microinterações com framer-motion
* Visual moderno e elegante
* Código limpo e escalável

---

⚠️ Importante:

* Código completo
* Estrutura profissional
* Separar lógica da UI quando possível
* Pensar como produto real de marketplace de adoção

Implemente tudo dentro de `PetDetail.jsx`.
