import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Pets = lazy(() => import("./pages/Pets"));
const PetDetail = lazy(() => import("./pages/PetDetail"));
const Ongs = lazy(() => import("./pages/Ongs"));
const OngProfile = lazy(() => import("./pages/OngProfile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const OngDashboard = lazy(() => import("./pages/OngDashboard").then((module) => ({ default: module.OngDashboard })));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const Government = lazy(() => import("./pages/Government"));
const PetShops = lazy(() => import("./pages/PetShops"));
const Caes = lazy(() => import("./pages/Caes"));
const Gatos = lazy(() => import("./pages/Gatos"));
const Servicos = lazy(() => import("./pages/Servicos"));
const CadastroOng = lazy(() => import("./pages/CadastroOng"));
const Sobre = lazy(() => import("./pages/Sobre"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-slate-900 p-8 text-slate-300">Carregando...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/pet/:id" element={<PetDetail />} />
              <Route path="/caes" element={<Caes />} />
              <Route path="/gatos" element={<Gatos />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/ongs" element={<Ongs />} />
              <Route path="/ong/:id" element={<OngProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/cadastro-ong" element={<CadastroOng />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute role="ong">
                    <OngDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/governo" element={<Government />} />
              <Route path="/petshops" element={<PetShops />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
