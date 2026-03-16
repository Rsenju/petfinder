# 🔐 AuthContext Documentation

> Contexto de autenticação do PetFinder - Gestão global de estado do usuário

---

## 📋 Feature List

```bash
context/
└── 🔐 AuthContext.jsx      # Contexto global de autenticação
    ├── Estados: user, isLoading, isAuthenticated
    ├── Persistência: localStorage (token JWT)
    ├── Auto-check: Valida token ao montar
    └── Métodos: login, register, logout, updateUser, forgot/reset password
```

```bash
Resumo de Implementação
├── AuthContext    ✅ Implementado    → AuthContext.jsx
└── AuthProvider   ✅ Implementado    → Provedor do contexto
```

---

## 📢 Broadcast

### Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                   AuthContext Layer                     │
├─────────────────────────────────────────────────────────┤
│  React Context API + useState/useCallback               │
│  ├── Provider envolve a aplicação (main.jsx)            │
│  ├── Consumo via useAuth() hook                         │
│  └── Persistência: localStorage (token JWT)             │
├─────────────────────────────────────────────────────────┤
│  Fluxo de Autenticação                                  │
│  1. App inicia → checkAuth() verifica token             │
│  2. Token válido → busca user → setUser()               │
│  3. Login/Register → salva token → setUser()            │
│  4. Logout → remove token → setUser(null)             │
└─────────────────────────────────────────────────────────┘
```

### State Management Flow
```bash
Auth State Machine
├── INITIAL
│   └── isLoading: true
│
├── CHECKING_TOKEN
│   ├── localStorage.getItem('token')
│   ├── Se token: authApi.getMe()
│   └── Transição → AUTHENTICATED ou UNAUTHENTICATED
│
├── AUTHENTICATED
│   ├── user: UserObject
│   ├── isAuthenticated: true
│   └── isLoading: false
│
└── UNAUTHENTICATED
    ├── user: null
    ├── isAuthenticated: false
    └── isLoading: false
```

---

## 🗂️ File Structure

```bash
src/context/
└── AuthContext.jsx         # Contexto + Provider de autenticação
```

---

## 💻 Code Documentation

### `AuthContext.jsx` - Contexto de Autenticação

**Purpose**: Gerenciamento global do estado de autenticação com persistência local.

**📡 Exports**:

```bash
Exports
├── AuthContext               # Context object (createContext)
└── AuthProvider              # Componente provedor
```

**⚙️ State Definitions**:

```bash
Estados Internos
├── user: null | Object       # Dados do usuário logado
├── isLoading: true           # Estado de carregamento inicial
└── isAuthenticated: false    # Flag de autenticação
```

**🔄 Auto-Check no Mount (useEffect)**:

```bash
useEffect: checkAuth()
├── 1. Busca token no localStorage
├── 2. Se existe token:
│   ├── Tenta: authApi.getMe()
│   ├── Sucesso: setUser(response.data) + setIsAuthenticated(true)
│   └── Erro: localStorage.removeItem('token')
└── 3. Sempre: setIsLoading(false)

Dependências: [] (roda 1x ao montar)
```

**📡 Métodos Disponíveis**:

```bash
AuthContext Value
├── user: Object | null
├── isAuthenticated: boolean
├── isLoading: boolean
│
├── login(credentials)
│   ├── authApi.login(credentials)
│   ├── localStorage.setItem('token', token)
│   ├── setUser(userData)
│   └── setIsAuthenticated(true)
│   └── return: userData
│
├── register(userData)
│   ├── authApi.register(userData)
│   ├── localStorage.setItem('token', token)
│   ├── setUser(newUser)
│   └── setIsAuthenticated(true)
│   └── return: newUser
│
├── logout()
│   ├── try: authApi.logout()
│   ├── finally:
│   │   ├── localStorage.removeItem('token')
│   │   ├── setUser(null)
│   │   └── setIsAuthenticated(false)
│   └── Obs: Sempre limpa local, mesmo se API falhar
│
├── updateUser(userData)
│   ├── authApi.updateProfile(userData)
│   ├── setUser(response.data)
│   └── return: response.data
│
├── forgotPassword(email)
│   └── authApi.forgotPassword(email)
│
└── resetPassword(token, newPassword)
    └── authApi.resetPassword(token, newPassword)
```

**⚙️ Implementation Details**:

```javascript
// Criação do contexto
export const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-check ao montar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await authApi.getMe();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }

      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Métodos com useCallback (memoization)
  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    const { user: userData, token } = response.data;

    localStorage.setItem('token', token);
    setUser(userData);

    return userData;
  }, []);

  // ... outros métodos

  // Value object exposto
  const value = {
    user,
    isAuthenticated: !!user,  // Boolean conversion
    isLoading,
    login,
    logout,
    register,
    updateUser,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

**🎨 Uso com Hook Customizado**:

```bash
useAuth Hook (em hooks/useAuth.js)
├── import { AuthContext } from '../context/AuthContext'
├── import { useContext } from 'react'
└── export const useAuth = () => useContext(AuthContext)

Retorna:
├── user
├── isAuthenticated
├── isLoading
├── login
├── logout
├── register
├── updateUser
├── forgotPassword
└── resetPassword
```

**💡 Usage Examples**:

```javascript
// 1. Provider em main.jsx
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// 2. Consumo em componentes
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Olá, {user.name}</span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <Link to="/login">Entrar</Link>
      )}
    </header>
  );
}

// 3. Login em página
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login falhou');
    }
  };
}

// 4. Proteção de rotas
function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
```

---

## 🔒 Security Considerations

```bash
Segurança
├── ✅ Token salvo em localStorage (persistência)
├── ✅ Auto-check de token ao iniciar app
├── ✅ Logout sempre limpa localStorage (even on API error)
├── ✅ API calls incluem token via interceptor (client.js)
├── ⚠️  localStorage é vulnerável a XSS
│   └── Mitigação: Sanitize inputs, CSP headers
└── ⚠️  Não há refresh token implementado
    └── Sugestão: Implementar refresh token rotation
```

---

## 🔄 Integration Patterns

### Com API Layer

```bash
AuthContext → API
├── Usa authApi de '../api/auth'
├── Métodos async/await
└── Erros propagam para chamador (try/catch no componente)

API → AuthContext
├── client.js interceptor adiciona token automaticamente
├── 401 errors são tratados no interceptor (logout automático)
└── AuthContext não precisa tratar 401
```

### Com Router

```bash
Router Integration
├── AuthProvider envolve Router (ou é envolvido por)
├── PrivateRoute usa isAuthenticated
├── PublicRoute pode redirecionar se já logado
└── Header consome contexto para mostrar usuário
```

---

## 📝 Notes & Best Practices

1. **useCallback**: Todos os métodos usam useCallback para evitar re-renders desnecessários
2. **isAuthenticated**: Computado como `!!user` (conversão booleana)
3. **Error Handling**: Erros de API propagam para componentes (não tratados no contexto)
4. **Logout Seguro**: Sempre limpa localStorage mesmo se API falhar (finally block)
5. **Loading State**: isLoading é true até checkAuth completar (evita flash de login)

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação do AuthContext com React Context API
│   ├── [+] Implementado auto-check de token no mount
│   ├── [+] Métodos: login, register, logout, updateUser
│   └── Autor: @Rsenju
│
└── 2026-03-12
    ├── [+] Adicionado forgotPassword e resetPassword
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - AuthContext Layer*
