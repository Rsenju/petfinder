# 🪝 Custom Hooks Documentation

> Hooks customizados do PetFinder - Abstração de lógica de estado e efeitos

---

## 📋 Feature List

```bash
hooks/
├── 🔐 useAuth.js           # Hook de autenticação
│   ├── Consome AuthContext
│   ├── Wrappers com try/catch
│   └── Flags: isOng, isAdmin
│
├── 📍 useGeolocation.js    # Hook de geolocalização
│   ├── Geolocation API
│   ├── Cálculo de distância (Haversine)
│   └── Error handling detalhado
│
├── 🏛️ useOngs.js          # Hook de gestão de ONGs
│   ├── CRUD completo
│   ├── Paginação
│   └── Busca geolocalizada
│
└── 🐾 usePets.js          # Hook de gestão de Pets
    ├── CRUD completo
    ├── Filtros dinâmicos
    ├── Favoritar
    └── Paginação
```

```bash
Resumo de Implementação
├── useAuth           ✅ Implementado    → useAuth.js
├── useGeolocation    ✅ Implementado    → useGeolocation.js
├── useOngs           ✅ Implementado    → useOngs.js
└── usePets           ✅ Implementado    → usePets.js
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                   Custom Hooks Layer                    │
├─────────────────────────────────────────────────────────┤
│  Cada hook encapsula:                                   │
│  ├── Estado local (useState)                           │
│  ├── Efeitos colaterais (useEffect)                    │
│  ├── Callbacks memoizados (useCallback)                │
│  └── Integração com API layer                          │
├─────────────────────────────────────────────────────────┤
│  Padrões Comuns:                                        │
│  ├── Estados: data, loading, error                     │
│  ├── Retorno: objeto com estados + métodos             │
│  └── Opções: options = {} parâmetro                    │
└─────────────────────────────────────────────────────────┘
```

### Hook Pattern
```bash
Standard Hook Structure
├── Imports (React, API)
├── Hook function(options = {})
│   ├── Estados (useState)
│   ├── Efeitos (useEffect)
│   ├── Callbacks (useCallback)
│   └── Retorno: { data, loading, error, methods }
└── Export default/named
```

---

## 🗂️ File Structure

```bash
src/hooks/
├── useAuth.js              # Hook de autenticação
├── useGeolocation.js       # Hook de geolocalização
├── useOngs.js              # Hook de ONGs
└── usePets.js              # Hook de Pets
```

---

## 💻 Code Documentation

### `useAuth.js` - Hook de Autenticação

**Purpose**: Interface simplificada para consumir AuthContext com handlers seguros.

**📡 Implementation**:

```bash
useAuth Hook
├── Import: AuthContext from '../context/AuthContext'
├── useContext(AuthContext)
├── Guard: if (!context) throw Error
│
├── Extração de context:
│   ├── user, isAuthenticated, isLoading
│   ├── login, logout, register (originais)
│   ├── updateUser, forgotPassword, resetPassword
│
├── Wrappers com try/catch:
│   ├── handleLogin(credentials)
│   │   └── return: { success: boolean, error?: string }
│   ├── handleRegister(userData)
│   │   └── return: { success: boolean, error?: string }
│   └── handleLogout()
│       └── return: { success: boolean, error?: string }
│
└── Retorno:
    ├── user, isAuthenticated, isLoading
    ├── isOng: user?.tipo === 'ong'
    ├── isAdmin: user?.tipo === 'admin'
    ├── login: handleLogin
    ├── logout: handleLogout
    ├── register: handleRegister
    └── updateUser, forgotPassword, resetPassword
```

**⚙️ Error Handling**:

```javascript
const handleLogin = useCallback(async (credentials) => {
  try {
    await login(credentials);  // Original do context
    return { success: true };   // Sempre retorna objeto
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao fazer login' 
    };
  }
}, [login]);
```

**💡 Usage Example**:

```javascript
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login, isAuthenticated, isOng, user } = useAuth();

  const handleSubmit = async (values) => {
    const result = await login(values);

    if (result.success) {
      navigate(isOng ? '/dashboard' : '/');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div>
      {isAuthenticated && <span>Bem-vindo, {user.name}</span>}
    </div>
  );
}
```

---

### `useGeolocation.js` - Hook de Geolocalização

**Purpose**: Acesso à Geolocation API com tratamento de erros e cálculo de distância.

**📡 State Definitions**:

```bash
Estados
├── location: null | {
│   ├── latitude: number
│   ├── longitude: number
│   ├── accuracy: number (metros)
│   └── timestamp: number
│}
├── error: null | string      # Mensagem de erro
└── loading: boolean          # Estado de carregamento
```

**⚙️ Methods**:

```bash
getCurrentPosition()
├── Verifica navigator.geolocation support
├── Chama navigator.geolocation.getCurrentPosition()
├── Opções:
│   ├── enableHighAccuracy: true
│   ├── timeout: 10000 (10s)
│   └── maximumAge: 0
├── Sucesso: setLocation({ latitude, longitude, accuracy, timestamp })
└── Erro: setError() com mensagem específica
    ├── PERMISSION_DENIED → 'Permissão negada'
    ├── POSITION_UNAVAILABLE → 'Localização indisponível'
    ├── TIMEOUT → 'Tempo esgotado'
    └── DEFAULT → 'Erro desconhecido'

calculateDistance(lat1, lon1, lat2, lon2)
├── Fórmula de Haversine
├── R = 6371 (raio Terra em km)
└── Retorna distância em km
```

**🔄 Auto-request**:

```javascript
useEffect(() => {
  if (options.autoRequest) {
    getCurrentPosition();
  }
}, [options.autoRequest, getCurrentPosition]);
```

**💡 Usage Example**:

```javascript
import { useGeolocation } from '../hooks/useGeolocation';

function NearbyOngs() {
  const { location, error, loading, getCurrentPosition, calculateDistance } = useGeolocation({
    autoRequest: true  // Busca automática ao montar
  });

  if (loading) return <Spinner />;
  if (error) return <button onClick={getCurrentPosition}>Tentar novamente</button>;

  return (
    <div>
      <p>Sua localização: {location.latitude}, {location.longitude}</p>
      {ongs.map(ong => {
        const dist = calculateDistance(
          location.latitude, 
          location.longitude,
          ong.lat, 
          ong.lon
        );
        return <OngCard key={ong.id} ong={ong} distance={dist} />;
      })}
    </div>
  );
}
```

---

### `useOngs.js` - Hook de Gestão de ONGs

**Purpose**: CRUD completo de ONGs com paginação e busca geolocalizada.

**📡 State Definitions**:

```bash
Estados
├── ongs: array             # Lista de ONGs
├── ong: null | object      # ONG selecionada (detalhe)
├── loading: boolean
├── error: null | string
└── pagination: {
    ├── page: 1
    ├── limit: 10
    ├── total: 0
    └── totalPages: 0
}
```

**⚙️ Methods**:

```bash
fetchOngs(filters = {})
├── GET /ongs
├── Params: page, limit, ...filters
├── setOngs(response.data.data)
└── Atualiza pagination

fetchOngById(id)
├── GET /ongs/:id
├── setOng(response.data)
└── Retorna dados

createOng(ongData)
├── POST /ongs
├── setOngs(prev => [newOng, ...prev])
└── Retorna novo ONG

updateOng(id, ongData)
├── PUT /ongs/:id
├── Atualiza no array: map(id ? new : old)
├── Se ong.id === id: setOng(updated)
└── Retorna atualizado

deleteOng(id)
├── DELETE /ongs/:id
├── setOngs(prev => filter(id !==))
└── Remove do estado

searchOngsByLocation(lat, lon, radius = 50)
├── GET /ongs/nearby
├── Params: latitude, longitude, radius (km)
└── Retorna ONGs próximas

setPage(page)
└── Atualiza pagination.page

refresh
└── Alias para fetchOngs()
```

**🔄 Auto-fetch**:

```javascript
useEffect(() => {
  if (options.autoFetch) {
    fetchOngs(options.filters);
  }
}, [options.autoFetch, options.filters, fetchOngs]);
```

**💡 Usage Example**:

```javascript
import { useOngs } from '../hooks/useOngs';

function OngsPage() {
  const { 
    ongs, 
    loading, 
    error, 
    pagination,
    fetchOngs,
    setPage 
  } = useOngs({ autoFetch: true });

  return (
    <>
      {ongs.map(ong => <OngCard key={ong.id} ong={ong} />)}
      <Pagination 
        current={pagination.page} 
        total={pagination.totalPages}
        onChange={setPage}
      />
    </>
  );
}
```

---

### `usePets.js` - Hook de Gestão de Pets

**Purpose**: CRUD completo de pets com filtros, paginação e favoritos.

**📡 State Definitions**:

```bash
Estados
├── pets: array             # Lista de pets
├── pet: null | object      # Pet selecionado (detalhe)
├── loading: boolean
├── error: null | string
├── filters: object         # Filtros ativos
└── pagination: {
    ├── page: 1
    ├── limit: 12
    ├── total: 0
    └── totalPages: 0
}
```

**⚙️ Methods**:

```bash
fetchPets(customFilters = {})
├── GET /pets
├── Params: page, limit, ...filters, ...customFilters
├── setPets(response.data.data)
└── Atualiza pagination

fetchPetById(id)
├── GET /pets/:id
├── setPet(response.data)
└── Retorna dados

createPet(petData)
├── POST /pets
├── setPets(prev => [newPet, ...prev])
└── Retorna novo pet

updatePet(id, petData)
├── PUT /pets/:id
├── Atualiza no array: map(id ? new : old)
├── Se pet.id === id: setPet(updated)
└── Retorna atualizado

deletePet(id)
├── DELETE /pets/:id
├── setPets(prev => filter(id !==))
└── Remove do estado

toggleFavorite(id)
├── POST /pets/:id/favorite
├── Atualiza isFavorited no pet específico
└── Retorna status

searchPets(query, searchFilters = {})
├── GET /pets/search
├── Params: q: query, ...searchFilters
└── Retorna resultados

updateFilters(newFilters)
├── setFilters({ ...prev, ...newFilters })
└── Reseta page para 1

clearFilters()
├── setFilters({})
└── Reseta page para 1

setPage(page)
└── Atualiza pagination.page

refresh
└── Alias para fetchPets()
```

**🔄 Filter Management**:

```javascript
const updateFilters = useCallback((newFilters) => {
  setFilters(prev => ({ ...prev, ...newFilters }));
  setPagination(prev => ({ ...prev, page: 1 }));  // Reset page
}, []);

const clearFilters = useCallback(() => {
  setFilters({});
  setPagination(prev => ({ ...prev, page: 1 }));
}, []);
```

**🔄 Auto-fetch**:

```javascript
useEffect(() => {
  if (options.autoFetch) {
    fetchPets();
  }
}, [options.autoFetch, fetchPets]);
```

**💡 Usage Example**:

```javascript
import { usePets } from '../hooks/usePets';

function PetsPage() {
  const { 
    pets, 
    loading, 
    filters,
    pagination,
    updateFilters,
    clearFilters,
    toggleFavorite,
    setPage 
  } = usePets({ 
    autoFetch: true,
    initialFilters: { species: 'dog' }
  });

  return (
    <>
      <FilterSection 
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
      />
      {pets.map(pet => (
        <PetCard 
          key={pet.id} 
          pet={pet}
          onFavorite={() => toggleFavorite(pet.id)}
        />
      ))}
      <Pagination 
        current={pagination.page}
        total={pagination.totalPages}
        onChange={setPage}
      />
    </>
  );
}
```

---

## 🔄 Integration Patterns

### Hook + API

```bash
usePets → petsApi
├── petsApi.getAll() → fetchPets()
├── petsApi.getById() → fetchPetById()
├── petsApi.create() → createPet()
├── petsApi.update() → updatePet()
├── petsApi.delete() → deletePet()
└── petsApi.toggleFavorite() → toggleFavorite()
```

### Hook + Component

```bash
Component → Hook
├── Chama hook: const { data, loading, method } = useX()
├── Renderiza baseado em loading/error/data
└── Chama methods em event handlers
```

---

## 📝 Notes & Best Practices

1. **useAuth**: Sempre use dentro de AuthProvider (verificação automática)
2. **useGeolocation**: Requer HTTPS em produção (exceto localhost)
3. **useOngs/usePets**: `autoFetch: true` para carregar ao montar
4. **Filtros**: Sempre resetam página para 1 ao mudar
5. **Callbacks**: Todos usam useCallback para evitar re-renders
6. **Erros**: Sempre setam error message e propagam throw

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do useAuth com wrappers seguros
│   ├── [+] Criação do useGeolocation com Haversine
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Implementado useOngs com busca geolocalizada
│   └── Autor: @Rsenju
│
└── 2026-03-11
    ├── [+] Implementado usePets com filtros e favoritos
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - Custom Hooks Layer*
