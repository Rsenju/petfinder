# 🛠️ Utils Documentation

> Utilitários e helpers do PetFinder - Validações, constantes e formatters

---

## 📋 Feature List

```bash
utils/
├── 📋 constants.js         # Constantes da aplicação (vazio)
│   └── Placeholder para futuras constantes
│
├── 🎨 formatters.js        # Funções de formatação (vazio)
│   └── Placeholder para formatters de data, moeda, etc
│
├── 💬 mockData.js          # Dados mockados (testimonials)
│   └── 6 depoimentos de usuários
│
└── ✅ validations.js        # Schemas de validação Zod
    ├── loginSchema         # Validação de login
    └── registerSchema      # Validação de registro
```

```bash
Resumo de Implementação
├── constants      ⚠️  Vazio          → constants.js
├── formatters     ⚠️  Vazio          → formatters.js
├── mockData       ✅ 6 testimonials  → mockData.js
└── validations    ✅ 2 schemas        → validations.js
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                     Utils Layer                       │
├─────────────────────────────────────────────────────────┤
│  Funções puras e reutilizáveis                          │
│  ├── Sem dependência de React/Componentes               │
│  ├── Podem ser usadas em qualquer lugar                 │
│  └── Testáveis de forma isolada                         │
├─────────────────────────────────────────────────────────┤
│  Categorias:                                            │
│  ├── Validações (Zod schemas)                          │
│  ├── Formatação (data, moeda, texto)                   │
│  ├── Constantes (valores fixos)                        │
│  └── Mock data (dados de teste)                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ File Structure

```bash
src/utils/
├── constants.js            # Constantes da aplicação
├── formatters.js           # Funções de formatação
├── mockData.js             # Dados mockados (testimonials)
└── validations.js          # Schemas Zod
```

---

## 💻 Code Documentation

### `constants.js` - Constantes (Vazio)

**Purpose**: Arquivo reservado para constantes da aplicação.

**Status**: ⚠️ Vazio - implementação futura

**💡 Future Content**:

```javascript
// Possíveis constantes a adicionar
export const APP_NAME = 'PetFinder';
export const APP_VERSION = '1.0.0';
export const DEFAULT_AVATAR = '/default-avatar.png';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const PAGINATION_LIMITS = [12, 24, 48];
```

---

### `formatters.js` - Formatters (Vazio)

**Purpose**: Arquivo reservado para funções de formatação.

**Status**: ⚠️ Vazio - implementação futura

**💡 Future Content**:

```javascript
// Possíveis formatters a adicionar
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatPhone = (value) => {
  // (00) 00000-0000
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};
```

---

### `mockData.js` - Depoimentos

**Purpose**: Dados mockados de depoimentos (duplicado de data/mockData.js).

**📡 Schema**:

```bash
Testimonial Object
├── id: number              # 1-6
├── name: string            # Nome do usuário
├── role: string            # 'Adotante' | 'Voluntário' | 'Doador' | 'ONG Parceira'
├── image: string           # URL avatar (i.pravatar.cc)
├── text: string            # Depoimento
└── pet: string | null      # Nome do pet (opcional)
```

**💬 Depoimentos**:

```bash
testimonials (6 total)
├── 1: Maria Silva (Adotante)
│   ├── Pet: Luna (Gata)
│   └── "Adotei meu gatinho Luna..."
│
├── 2: João Santos (Voluntário)
│   └── "Como voluntário em uma ONG parceira..."
│
├── 3: Ana Paula (Adotante)
│   ├── Pet: Thor (Cachorro)
│   └── "Meu cachorro Thor mudou minha vida..."
│
├── 4: Carlos Mendes (Doador)
│   └── "Faço doações mensais para ONGs..."
│
├── 5: Fernanda Lima (Adotante)
│   ├── Pet: Max (Cachorro)
│   └── "Processo rápido e seguro..."
│
└── 6: Roberto Almeida (ONG Parceira)
    └── "A plataforma aumentou em 300% nossas adoções..."
```

**💡 Usage Example**:

```javascript
import { testimonials } from '../utils/mockData';

// Usar em componentes
<TestimonialsSlider testimonials={testimonials} />
```

---

### `validations.js` - Schemas Zod

**Purpose**: Schemas de validação para formulários de autenticação.

**📡 loginSchema**:

```bash
loginSchema (Zod Object)
├── email: string
│   ├── min(1, 'Email é obrigatório')
│   └── email('Email inválido')
│
└── password: string
    ├── min(1, 'Senha é obrigatória')
    └── min(6, 'Senha deve ter no mínimo 6 caracteres')
```

**📡 registerSchema**:

```bash
registerSchema (Zod Object)
├── name: string
│   ├── min(1, 'Nome é obrigatório')
│   └── min(3, 'Nome deve ter no mínimo 3 caracteres')
│
├── email: string
│   ├── min(1, 'Email é obrigatório')
│   └── email('Email inválido')
│
├── password: string
│   ├── min(1, 'Senha é obrigatória')
│   ├── min(8, 'Senha deve ter no mínimo 8 caracteres')
│   ├── regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
│   ├── regex(/[0-9]/, 'Senha deve conter pelo menos um número')
│   └── regex(/[!@#$%^&*()_+\-=[\]{};':"\|,.<>/?]/, 'Senha deve conter pelo menos um caractere especial')
│
├── confirmPassword: string
│   └── min(1, 'Confirme sua senha')
│
└── Refinement:
    └── password === confirmPassword
        └── message: 'Senhas não conferem'
        └── path: ['confirmPassword']
```

**💡 Usage Example**:

```javascript
import { loginSchema, registerSchema } from '../utils/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Login form
const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(loginSchema)
});

// Register form
const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(registerSchema)
});
```

---

## 🔄 Integration Patterns

### Validação + React Hook Form

```bash
validations.js → Component
├── Import schema
├── useForm({ resolver: zodResolver(schema) })
├── register('fieldName')
└── errors.fieldName?.message
```

### Mock Data + Componentes

```bash
utils/mockData.js → Component
├── Import data
├── Passar como prop
└── Renderizar
```

---

## 📝 Notes & Best Practices

1. **constants.js**: Manter valores que não mudam durante runtime
2. **formatters.js**: Sempre retornar string formatada, nunca modificar input
3. **validations.js**: Mensagens em português para usuários BR
4. **mockData.js**: Considerar unificar com data/mockData.js (duplicação atual)

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do loginSchema e registerSchema
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Adicionado testimonials em mockData.js
│   └── Autor: @Rsenju
│
└── 2026-03-11
    ├── [+] Criados arquivos vazios: constants.js, formatters.js
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Utils Layer*
