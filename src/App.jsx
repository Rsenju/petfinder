import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetail from './pages/PetDetail';
import Ongs from './pages/Ongs';
import OngProfile from './pages/OngProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import CadastroOng from './pages/CadastroOng';
import Sobre from './pages/Sobre';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/pets/:id" element={<PetDetail />} />
              <Route path="/ongs" element={<Ongs />} />
              <Route path="/ongs/:id" element={<OngProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cadastro-ong" element={<CadastroOng />} />
              <Route path="/sobre" element={<Sobre />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;