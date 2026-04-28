# 📡 API Layer Documentation

> Camada de integração com backend - Cliente HTTP centralizado e endpoints organizados por domínio

---

## 📋 Feature List

```bash
api/
├── 🔧 client.js          # HTTP Client centralizado
│   ├── Axios instance com timeout 10s
│   ├── Request Interceptor: Auto-inject JWT Bearer Token
│   └── Response Interceptor: Handler 401 (logout) / 403 (denied)
│
├── 🔐 auth.js            # Autenticação & Segurança
│   ├── Login/Logout tradicional
│   ├── Registro de usuários
│   ├── Recuperação de senha (forgot/reset)
│   ├── Verificação de email (verify/resend)
│   └── Login Social (Google, Facebook, etc)
│
├── 🏛️ ongs.js            # Gestão de ONGs
│   ├── CRUD completo de ONGs
│   ├── Busca geolocalizada (nearby: lat/long/radius)
│   ├── Busca por localização (cidade/estado)
│   ├── Upload de logo (multipart/form-data)
│   └── Estatísticas da ONG (dashboard stats)
│
└── 🐾 pets.js            # Gestão de Pets
    ├── CRUD completo de pets
    ├── Busca avançada com filtros múltiplos
    ├── Sistema de favoritos (toggle/list)
    ├── Upload de fotos (múltiplos arquivos)
    ├── Listagem por ONG específica
    └── Recomendação de pets similares
```

```bash
Resumo de Implementação
├── HTTP Client    ✅ Implementado    → client.js
├── Auth API       ✅ Implementado    → auth.js
├── ONGs API       ✅ Implementado    → ongs.js
└── Pets API       ✅ Implementado    → pets.js
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                    API Layer (src/api/)                 │
├─────────────────────────────────────────────────────────┤
│  client.js (Axios Instance)                             │
│  ├── Base URL configurável via ENV                     │
│  ├── Timeout: 10s                                       │
│  ├── Request Interceptor: Injeta Bearer Token           │
│  └── Response Interceptor: Handler 401/403 + Redirect   │
├─────────────────────────────────────────────────────────┤
│  Domain APIs (auth.js | ongs.js | pets.js)              │
│  ├── Métodos organizados por entidade                   │
│  ├── Retornam Promises (async/await ready)              │
│  └── Reutilizam apiClient centralizado                  │
└─────────────────────────────────────────────────────────┘
```

### Security Features

```bash
Security Layer
├── ✅ JWT Auto-Injection
│   └── Funcionalidade: Token do localStorage adicionado automaticamente
│       em todas as requisições via header Authorization: Bearer {token}
│
├── ✅ 401 Unauthorized Handler
│   └── Funcionalidade: Logout automático + redirect para /login
│       quando token é inválido ou expirado
│
├── ✅ 403 Forbidden Handler
│   └── Funcionalidade: Logging de acessos negados no console
│       para debugging de permissões
│
└── ✅ Multipart Support
    └── Funcionalidade: Headers adaptativos para upload de arquivos
        Content-Type: multipart/form-data (automático em uploads)
```

### Error Handling Strategy

```bash
Error Handler (Response Interceptor)
├── 401 Unauthorized
│   ├── Ação: localStorage.removeItem('token')
│   ├── Ação: window.location.href = '/login'
│   └── Páginas afetadas: Todas as rotas protegidas
│
├── 403 Forbidden
│   ├── Ação: console.error('Acesso negado')
│   ├── Ação: Possível toast notification
│   └── Páginas afetadas: Todas as requisições
│
└── 500+ Server Error
    ├── Ação: Promise.reject(error)
    └── Páginas afetadas: Tratamento local no componente/hook
```

---

## 🗂️ File Structure

```bash
src/api/
├── client.js          # HTTP Client centralizado (Axios)
├── auth.js            # Autenticação e gestão de usuários
├── ongs.js            # Operações relacionadas a ONGs
└── pets.js            # Operações relacionadas a Pets
```

---

## 💻 Code Documentation

### `client.js` - HTTP Client Centralizado

**Purpose**: Configuração base do Axios com interceptors para autenticação e tratamento de erros globais.

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**🔧 Configurações**:
- `baseURL`: URL da API via variável de ambiente `VITE_API_URL` ou fallback local
- `timeout`: 10 segundos para evitar requisições travadas
- `headers`: Content-Type padrão JSON

**🔄 Request Interceptor**:
```javascript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```
- **Funcionalidade**: Injeta automaticamente o token JWT do localStorage em todas as requisições
- **Benefício**: Não precisa passar token manualmente em cada chamada

**🔄 Response Interceptor**:
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 - Não autorizado: faz logout
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // 403 - Proibido: log de acesso negado
      if (error.response.status === 403) {
        console.error('Acesso negado');
      }
    }
    return Promise.reject(error);
  }
);
```
- **401 Handler**: Limpa sessão e redireciona para login (segurança)
- **403 Handler**: Apenas log (para debugging de permissões)

---

### `auth.js` - API de Autenticação

**Purpose**: Endpoints para gestão de usuários, autenticação e segurança.

**📡 Endpoints Disponíveis**:

```bash
auth.js
├── POST /auth/login              # Login tradicional
│   └── body: { email, password }
│
├── POST /auth/register           # Registro de novo usuário
│   └── body: { name, email, password, ... }
│
├── POST /auth/logout             # Logout do sistema
│   └── headers: Authorization: Bearer {token}
│
├── GET  /auth/me                 # Dados do usuário logado
│   └── headers: Authorization: Bearer {token}
│
├── PUT  /auth/profile            # Atualização de perfil
│   └── body: { name, phone, avatar, ... }
│
├── POST /auth/forgot-password    # Recuperação de senha
│   └── body: { email }
│
├── POST /auth/reset-password     # Reset de senha com token
│   └── body: { token, newPassword }
│
├── GET  /auth/verify-email       # Verificação de email
│   └── query: ?token={token}
│
├── POST /auth/resend-verification # Reenvio de email de verificação
│   └── body: { email }
│
└── POST /auth/social/:provider   # Login social (Google, Facebook, etc)
    └── body: { token }
        params: provider = google | facebook
```

**💡 Usage Example**:
```javascript
import { authApi } from './api/auth';

// Login
const response = await authApi.login({ email: 'user@example.com', password: '123456' });
localStorage.setItem('token', response.data.token);

// Verificar email (ex: da URL ?token=abc123)
await authApi.verifyEmail(urlToken);

// Login com Google
const googleToken = await getGoogleToken();
await authApi.socialLogin('google', googleToken);
```

---

### `ongs.js` - API de ONGs

**Purpose**: Operações CRUD e funcionalidades específicas para Organizações Não-Governamentais.

**📡 Endpoints Disponíveis**:

```bash
ongs.js
├── GET    /ongs                  # Listar todas as ONGs
│   └── query: { page, limit, search }
│
├── GET    /ongs/:id              # Detalhes de uma ONG específica
│   └── params: id
│
├── POST   /ongs                  # Criar nova ONG
│   └── body: { name, cnpj, description, address, ... }
│
├── PUT    /ongs/:id              # Atualizar dados da ONG
│   ├── params: id
│   └── body: { name, description, ... } (partial)
│
├── DELETE /ongs/:id              # Remover ONG
│   └── params: id
│
├── GET    /ongs/nearby            # Busca geolocalizada (próximas)
│   └── query: { latitude, longitude, radius = 50km }
│
├── GET    /ongs/search            # Busca por cidade/estado
│   └── query: { cidade, estado }
│
├── POST   /ongs/:id/logo          # Upload de logo da ONG
│   ├── params: id
│   └── body: FormData (multipart/form-data)
│       └── field: logo (File)
│
└── GET    /ongs/:id/stats         # Estatísticas da ONG (dashboard)
    └── params: id
        returns: { totalPets, adoptedPets, pendingPets, totalViews }
```

**🎯 Funcionalidades Especiais**:

**Geolocalização**:
```javascript
// Buscar ONGs próximas (raio de 50km padrão)
const nearby = await ongsApi.getNearby(-23.5505, -46.6333, 30);

// Busca por cidade/estado
const ongsSP = await ongsApi.searchByLocation('São Paulo', 'SP');
```

**Upload de Logo**:
```javascript
const formData = new FormData();
formData.append('logo', fileInput.files[0]);

await ongsApi.uploadLogo(ongId, formData);
// Note: Header 'Content-Type': 'multipart/form-data' automático
```

**💡 Usage Example**:
```javascript
import { ongsApi } from './api/ongs';

// Listar com paginação
const { data } = await ongsApi.getAll({ page: 1, limit: 10, search: 'amigos' });

// Criar ONG
const newOng = await ongsApi.create({
  name: 'Amigos dos Pets',
  description: 'ONG dedicada ao resgate animal',
  cnpj: '12.345.678/0001-90',
  address: { city: 'São Paulo', state: 'SP' }
});

// Estatísticas para dashboard
const stats = await ongsApi.getStats(ongId);
// Retorna: { totalPets, adoptedPets, pendingPets, totalViews }
```

---

### `pets.js` - API de Pets

**Purpose**: Gestão completa de animais para adoção, incluindo favoritos e busca avançada.

**📡 Endpoints Disponíveis**:

```bash
pets.js
├── GET    /pets                  # Listar todos os pets (com filtros)
│   └── query: { species, size, age, status, city, ... }
│
├── GET    /pets/:id              # Detalhes de um pet específico
│   └── params: id
│
├── POST   /pets                  # Cadastrar novo pet
│   └── body: { name, species, breed, age, size, description, ongId, ... }
│
├── PUT    /pets/:id              # Atualizar dados do pet
│   ├── params: id
│   └── body: { ... } (partial)
│
├── DELETE /pets/:id              # Remover pet
│   └── params: id
│
├── GET    /pets/search            # Busca avançada com texto
│   └── query: { q: "cachorro", species, size, age, ... }
│
├── POST   /pets/:id/favorite      # Toggle favoritar/desfavoritar
│   └── params: id
│       auth: Bearer Token required
│
├── GET    /pets/favorites         # Listar favoritos do usuário logado
│   └── auth: Bearer Token required
│
├── POST   /pets/:id/photos        # Upload de fotos do pet
│   ├── params: id
│   └── body: FormData (multipart/form-data)
│       └── fields: photos[] (File array)
│
├── GET    /ongs/:ongId/pets       # Listar pets de uma ONG específica
│   └── params: ongId
│
└── GET    /pets/:id/similar       # Buscar pets similares (recomendações)
    └── params: id
```

**🎯 Funcionalidades Especiais**:

**Busca Avançada**:
```javascript
// Busca com filtros múltiplos
const results = await petsApi.search('cachorro', {
  size: 'medium',
  age: 'young',
  gender: 'female',
  city: 'São Paulo'
});
```

**Sistema de Favoritos**:
```javascript
// Adicionar/remover favorito (toggle automático)
await petsApi.toggleFavorite(petId);

// Listar meus favoritos
const favorites = await petsApi.getFavorites();
```

**Upload Múltiplo de Fotos**:
```javascript
const formData = new FormData();
files.forEach((file, index) => {
  formData.append(`photos[${index}]`, file);
});

await petsApi.uploadPhotos(petId, formData);
```

**Recomendações**:
```javascript
// Buscar pets similares ao atual (para "Você também pode gostar")
const similar = await petsApi.getSimilar(currentPetId);
```

**💡 Usage Example**:
```javascript
import { petsApi } from './api/pets';

// Listar com filtros
const pets = await petsApi.getAll({
  species: 'dog',
  size: 'small',
  status: 'available'
});

// Cadastrar novo pet
const newPet = await petsApi.create({
  name: 'Rex',
  species: 'dog',
  breed: 'SRD',
  age: 2,
  size: 'medium',
  description: 'Muito brincalhão!',
  ongId: '123'
});

// Buscar pets da ONG para dashboard
const ongPets = await petsApi.getByOng(ongId);
```

---

## 🔗 Integration Patterns

### Como usar nas páginas

**Com Hooks Customizados** (recomendado):
```javascript
// hooks/usePets.js
import { petsApi } from '../api/pets';

export const usePets = () => {
  const fetchPets = async (filters) => {
    try {
      const response = await petsApi.getAll(filters);
      return response.data;
    } catch (error) {
      // Erro 401 já é tratado no interceptor
      // Aqui tratamos apenas erros de negócio
      throw error;
    }
  };

  return { fetchPets };
};
```

**Diretamente nos Componentes**:
```javascript
// pages/PetDetail.jsx
import { petsApi } from '../api/pets';

const PetDetail = ({ id }) => {
  useEffect(() => {
    petsApi.getById(id)
      .then(res => setPet(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          navigate('/not-found');
        }
      });
  }, [id]);
};
```

---

## 📝 Notes & Best Practices

1. **Sempre use os métodos das APIs** ao invés de chamar `apiClient` diretamente (exceto em casos especiais)
2. **Erros 401 são tratados automaticamente** - não precisa implementar logout manual
3. **Uploads usam FormData** - as APIs já configuram headers corretos
4. **Parâmetros de busca** são sempre passados como objeto `params` ou argumentos separados
5. **Retornos são Promises** - use `async/await` ou `.then().catch()`

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação da camada API com Axios
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Adicionado interceptors de autenticação
│   │   ├── Request Interceptor: JWT auto-inject
│   │   └── Response Interceptor: 401/403 handlers
│   └── Autor: @Rsenju
│
├── 2026-03-11
│   ├── [+] Implementado upload de arquivos (multipart/form-data)
│   │   ├── ongs.js: uploadLogo()
│   │   └── pets.js: uploadPhotos()
│   └── Autor: @Rsenju
│
└── 2026-03-10
    ├── [+] Adicionado endpoints de geolocalização
    │   └── ongs.js: getNearby() + searchByLocation()
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Camada de Integração API*
