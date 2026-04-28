<p align="right">
  <a href="README.md">🇧🇷 PT</a> | 
  <a href="README_EN.md">🇺🇸 EN</a> | 
  <a href="README_DE.md">🇩🇪 DE</a>
</p>

# 🐾 PetFinder

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12-EF44A5?logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

<p align="center">
  Plataforma web para adoção de animais de estimação, conectando pets de ONGs a tutores responsáveis em todo o Brasil.
</p>

---

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura](#estrutura)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🎯 Sobre

O **PetFinder** é uma aplicação web desenvolvida para facilitar a adoção responsável de animais de estimação. O sistema conecta ONGs cadastradas com potenciais adotantes em todo o Brasil, centralizando informações e promovendo o bem-estar animal.

A plataforma foi construída com foco em **performance**, **acessibilidade** e **experiência do usuário**, utilizando as tecnologias mais modernas do ecossistema React.

> Projeto desenvolvido com foco em UX/UI, acessibilidade e performance.

---

## ✨ Funcionalidades

- 🔍 **Busca avançada** de pets por cidade, espécie, porte e idade
- 🏠 **Cadastro de ONGs** com painel administrativo
- ❤️ **Sistema de favoritos** para salvar pets de interesse
- 📱 **Design responsivo** para mobile e desktop
- ⚡ **Carregamento rápido** com Vite e lazy loading
- 🎭 **Animações fluidas** com Framer Motion
- 🧪 **Testes automatizados** com Playwright e Vitest

---

## 🛠️ Tecnologias

### Frontend

- [React 19](https://react.dev/) - Biblioteca JavaScript para construção de interfaces
- [Vite 7](https://vitejs.dev/) - Build tool rápida para desenvolvimento
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utilitário
- [Framer Motion 12](https://www.framer.com/motion/) - Biblioteca de animações
- [React Router DOM 7](https://reactrouter.com/) - Roteamento de páginas

### Estado e Dados

- [Zustand 5](https://github.com/pmndrs/zustand) - Gerenciamento de estado global
- [TanStack Query 5](https://tanstack.com/query/latest) - Gerenciamento de estado de servidor
- [Axios](https://axios-http.com/) - Cliente HTTP
- [Zod](https://zod.dev/) - Validação de esquemas
- [React Hook Form](https://react-hook-form.com/) - Formulários controlados

### UI e Ícones

- [Lucide React](https://lucide.dev/) - Ícones
- [React Icons](https://react-icons.github.io/react-icons/) - Ícones adicionais
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis (Dialog)
- [Swiper](https://swiperjs.com/) - Carrosséis

### Desenvolvimento

- [ESLint](https://eslint.org/) - Linting de código
- [Playwright](https://playwright.dev/) - Testes E2E
- [MSW](https://mswjs.io/) - Mock de APIs
- [Vitest](https://vitest.dev/) - Testes unitários
- [Faker](https://fakerjs.dev/) - Geração de dados fake

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/Rsenju/projeto_petfinder.git

# Entre na pasta
cd petfinder-react

# Instale as dependências
npm install
```

---

## 📖 Uso

### Desenvolvimento

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Build de produção
npm run lint     # Executa o linter
npm run preview  # Preview do build de produção
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173`.

### Estrutura de branches

- `main` - Código em produção
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades

---

## 📁 Estrutura

| Diretório                  | Descrição                                  |
| -------------------------- | ------------------------------------------ |
| `src/components/features/` | Componentes específicos de funcionalidades |
| `src/components/layout/`   | Estrutura da página (Header, Footer)       |
| `src/components/ui/`       | Elementos reutilizáveis (botões, inputs)   |
| `src/context/`             | Context API                                |
| `src/hooks/`               | Custom hooks                               |
| `src/pages/`               | Páginas da aplicação                       |
| `src/data/`                | Dados mockados para desenvolvimento        |
| `public/`                  | Assets estáticos (imagens, favicon)        |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Padrão de commits

| Prefixo     | Descrição           |
| ----------- | ------------------- |
| `feat:`     | Nova funcionalidade |
| `fix:`      | Correção de bug     |
| `docs:`     | Documentação        |
| `style:`    | Formatação          |
| `refactor:` | Refatoração         |
| `test:`     | Testes              |

---

## 👩‍💻 Autora

Rebeca Machado - Desenvolvedora Front-end

- [LinkedIn](https://www.linkedin.com/in/rebeca-sena-rms2007)
- [GitHub](https://github.com/Rsenju)
- [Portfólio](https://rebecamachadofrontend.vercel.app/)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

<p align="center">
  Feito com ❤️ e 🐾 para ajudar animais a encontrarem um lar
</p>
