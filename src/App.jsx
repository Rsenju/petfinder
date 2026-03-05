import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetail from './pages/PetDetail';
import Ongs from './pages/Ongs';
import Login from './pages/Login';
import Register from './pages/Register';  // ← VERIFIQUE ESTA LINHA

function AppContent() {
  const { theme } = useTheme();
  
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  }, [theme]);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/ongs" element={<Ongs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />  //
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;