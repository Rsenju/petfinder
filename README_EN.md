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
  Web platform for pet adoption, connecting animals from NGOs to responsible owners across Brazil.
</p>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**PetFinder** is a web application developed to facilitate responsible pet adoption. The system connects registered NGOs with potential adopters across Brazil, centralizing information and promoting animal welfare.

The platform was built with a focus on **performance**, **accessibility**, and **user experience**, using the most modern technologies in the React ecosystem.

> Project developed with a focus on UX/UI, accessibility, and performance.

---

## ✨ Features

- 🔍 **Advanced search** for pets by city, species, size, and age
- 🏠 **NGO registration** with admin dashboard
- ❤️ **Favorites system** to save pets of interest
- 📱 **Responsive design** for mobile and desktop
- ⚡ **Fast loading** with Vite and lazy loading
- 🎭 **Smooth animations** with Framer Motion
- 🧪 **Automated testing** with Playwright and Vitest

---

## 🛠️ Technologies

### Frontend

- [React 19](https://react.dev/) - JavaScript library for building user interfaces
- [Vite 7](https://vitejs.dev/) - Fast build tool for development
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion 12](https://www.framer.com/motion/) - Animation library
- [React Router DOM 7](https://reactrouter.com/) - Page routing

### State & Data

- [Zustand 5](https://github.com/pmndrs/zustand) - Global state management
- [TanStack Query 5](https://tanstack.com/query/latest) - Server state management
- [Axios](https://axios-http.com/) - HTTP client
- [Zod](https://zod.dev/) - Schema validation
- [React Hook Form](https://react-hook-form.com/) - Controlled forms

### UI & Icons

- [Lucide React](https://lucide.dev/) - Icons
- [React Icons](https://react-icons.github.io/react-icons/) - Additional icons
- [Radix UI](https://www.radix-ui.com/) - Accessible components (Dialog)
- [Swiper](https://swiperjs.com/) - Carousels

### Development

- [ESLint](https://eslint.org/) - Code linting
- [Playwright](https://playwright.dev/) - E2E testing
- [MSW](https://mswjs.io/) - API mocking
- [Vitest](https://vitest.dev/) - Unit testing
- [Faker](https://fakerjs.dev/) - Fake data generation

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Step by step

```bash
# Clone the repository
git clone https://github.com/Rsenju/projeto_petfinder.git

# Enter the folder
cd petfinder-react

# Install dependencies
npm install
```

---

## 📖 Usage

### Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run linter
npm run preview  # Preview production build
```

The development server will be available at `http://localhost:5173`.

### Branch structure

- `main` - Production code
- `develop` - Development
- `feature/*` - New features

---

## 📁 Structure

| Directory                  | Description                         |
| -------------------------- | ----------------------------------- |
| `src/components/features/` | Feature-specific components         |
| `src/components/layout/`   | Page structure (Header, Footer)     |
| `src/components/ui/`       | Reusable elements (buttons, inputs) |
| `src/context/`             | Context API                         |
| `src/hooks/`               | Custom hooks                        |
| `src/pages/`               | Application pages                   |
| `src/data/`                | Mock data for development           |
| `public/`                  | Static assets (images, favicon)     |

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the project
2. Create a **branch** (`git checkout -b feature/new-feature`)
3. **Commit** your changes (`git commit -m 'feat: adds new feature'`)
4. **Push** to the branch (`git push origin feature/new-feature`)
5. Open a **Pull Request**

### Commit conventions

| Prefix      | Description   |
| ----------- | ------------- |
| `feat:`     | New feature   |
| `fix:`      | Bug fix       |
| `docs:`     | Documentation |
| `style:`    | Formatting    |
| `refactor:` | Refactoring   |
| `test:`     | Tests         |

---

## 👩‍💻 Author

Rebeca Machado - Front-end Developer

- [LinkedIn](https://www.linkedin.com/in/rebeca-sena-rms2007)
- [GitHub](https://github.com/Rsenju)
- [Portfolio](https://rebecamachadofrontend.vercel.app/)

---

## 📄 License

This project is licensed under the MIT License.

<p align="center">
  Made with ❤️ and 🐾 to help animals find a home
</p>
