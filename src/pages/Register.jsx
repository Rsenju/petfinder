import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <PawPrint className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Criar conta</h1>
        <p className="text-white/60 mb-8">Página de registro em construção</p>
        
        <Link 
          to="/login" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
        >
          Ir para Login
        </Link>
      </motion.div>
    </div>
  );
}