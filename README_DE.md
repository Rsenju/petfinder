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
  Webplattform zur Adoption von Haustieren, die Tiere von NGOs mit verantwortungsvollen Besitzern in ganz Brasilien verbindet.
</p>

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Funktionen](#funktionen)
- [Technologien](#technologien)
- [Installation](#installation)
- [Nutzung](#nutzung)
- [Struktur](#struktur)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)

---

## 🎯 Über das Projekt

**PetFinder** ist eine Webanwendung, die die verantwortungsvolle Adoption von Haustieren erleichtern soll. Das System verbindet registrierte NGOs mit potenziellen Adoptanten in ganz Brasilien, zentralisiert Informationen und fördert das Tierwohl.

Die Plattform wurde mit Fokus auf **Performance**, **Barrierefreiheit** und **Benutzererfahrung** entwickelt und nutzt die modernsten Technologien des React-Ökosystems.

> Projekt entwickelt mit Fokus auf UX/UI, Barrierefreiheit und Performance.

---

## ✨ Funktionen

- 🔍 **Erweiterte Suche** nach Haustieren nach Stadt, Art, Größe und Alter
- 🏠 **NGO-Registrierung** mit Admin-Dashboard
- ❤️ **Favoritensystem** zum Speichern interessanter Tiere
- 📱 **Responsives Design** für Mobilgeräte und Desktop
- ⚡ **Schnelles Laden** mit Vite und Lazy Loading
- 🎭 **Flüssige Animationen** mit Framer Motion
- 🧪 **Automatisierte Tests** mit Playwright und Vitest

---

## 🛠️ Technologien

### Frontend

- [React 19](https://react.dev/) - JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen
- [Vite 7](https://vitejs.dev/) - Schnelles Build-Tool für die Entwicklung
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-First CSS-Framework
- [Framer Motion 12](https://www.framer.com/motion/) - Animationsbibliothek
- [React Router DOM 7](https://reactrouter.com/) - Seiten-Routing

### State & Daten

- [Zustand 5](https://github.com/pmndrs/zustand) - Globales State-Management
- [TanStack Query 5](https://tanstack.com/query/latest) - Server-State-Management
- [Axios](https://axios-http.com/) - HTTP-Client
- [Zod](https://zod.dev/) - Schema-Validierung
- [React Hook Form](https://react-hook-form.com/) - Kontrollierte Formulare

### UI & Icons

- [Lucide React](https://lucide.dev/) - Icons
- [React Icons](https://react-icons.github.io/react-icons/) - Zusätzliche Icons
- [Radix UI](https://www.radix-ui.com/) - Barrierefreie Komponenten (Dialog)
- [Swiper](https://swiperjs.com/) - Karussells

### Entwicklung

- [ESLint](https://eslint.org/) - Code-Linting
- [Playwright](https://playwright.dev/) - E2E-Tests
- [MSW](https://mswjs.io/) - API-Mocking
- [Vitest](https://vitest.dev/) - Unit-Tests
- [Faker](https://fakerjs.dev/) - Generierung von Fake-Daten

---

## 🚀 Installation

### Voraussetzungen

- Node.js 18+
- npm oder yarn

### Schritt für Schritt

```bash
# Repository klonen
git clone https://github.com/Rsenju/projeto_petfinder.git

# In den Ordner wechseln
cd petfinder-react

# Abhängigkeiten installieren
npm install
```

---

## 📖 Nutzung

### Entwicklung

```bash
npm run dev      # Entwicklungsserver starten
npm run build    # Produktions-Build
npm run lint     # Linter ausführen
npm run preview  # Vorschau des Produktions-Builds
```

Der Entwicklungsserver ist unter `http://localhost:5173` verfügbar.

### Branch-Struktur

- `main` - Produktionscode
- `develop` - Entwicklung
- `feature/*` - Neue Funktionen

---

## 📁 Struktur

| Verzeichnis                | Beschreibung                                 |
| -------------------------- | -------------------------------------------- |
| `src/components/features/` | Funktionsspezifische Komponenten             |
| `src/components/layout/`   | Seitenstruktur (Header, Footer)              |
| `src/components/ui/`       | Wiederverwendbare Elemente (Buttons, Inputs) |
| `src/context/`             | Context API                                  |
| `src/hooks/`               | Custom Hooks                                 |
| `src/pages/`               | Anwendungsseiten                             |
| `src/data/`                | Mock-Daten für die Entwicklung               |
| `public/`                  | Statische Assets (Bilder, Favicon)           |

---

## 🤝 Mitwirken

Beiträge sind willkommen! Folgen Sie diesen Schritten:

1. **Fork** das Projekt
2. Erstellen Sie einen **Branch** (`git checkout -b feature/neue-funktion`)
3. **Committen** Sie Ihre Änderungen (`git commit -m 'feat: fügt neue Funktion hinzu'`)
4. **Pushen** Sie zum Branch (`git push origin feature/neue-funktion`)
5. Eröffnen Sie einen **Pull Request**

### Commit-Konventionen

| Präfix      | Beschreibung  |
| ----------- | ------------- |
| `feat:`     | Neue Funktion |
| `fix:`      | Bugfix        |
| `docs:`     | Dokumentation |
| `style:`    | Formatierung  |
| `refactor:` | Refactoring   |
| `test:`     | Tests         |

---

## 👩‍💻 Autorin

Rebeca Machado - Frontend-Entwicklerin

- [LinkedIn](https://www.linkedin.com/in/rebeca-sena-rms2007)
- [GitHub](https://github.com/Rsenju)
- [Portfolio](https://rebecamachadofrontend.vercel.app/)

---

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

<p align="center">
  Gemacht mit ❤️ und 🐾, um Tieren zu helfen, ein Zuhause zu finden
</p>
