import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetail from "./pages/PetDetail";
import Ongs from "./pages/Ongs";
import OngProfile from "./pages/OngProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { OngDashboard } from "./pages/OngDashboard";
import Blog from "./pages/Blog";
import Government from "./pages/Government";
import PetShops from "./pages/PetShops";
import Caes from "./pages/Caes";
import Gatos from "./pages/Gatos";
import Servicos from "./pages/Servicos";

function App() {
  return (
    <AuthProvider>
      <Router>
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
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<OngDashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/governo" element={<Government />} />
            <Route path="/petshops" element={<PetShops />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;