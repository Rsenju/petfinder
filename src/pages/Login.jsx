import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft, PawPrint, AlertCircle } from 'lucide-react';
import { loginSchema } from '../utils/validations';
import Logo from "../components/ui/Logo";     // ✅ Certo


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Valida quando sai do campo
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      // Simula API de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simula erro de credenciais (para teste)
      if (data.email === 'erro@teste.com') {
        throw new Error('Credenciais inválidas');
      }
      
      console.log('Login bem-sucedido:', data);
      navigate('/');
    } catch (error) {
      setLoginError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { value: '500+', label: 'Pets Adotados' },
    { value: '50+', label: 'ONGs Parceiras' },
    { value: '2', label: 'Cidades' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Botão voltar */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Voltar</span>
      </motion.button>

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Lado esquerdo - Branding */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between relative">
          <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <Logo size="xl" />
          </motion.div>

            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              Bem-vindo ao
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"
            >
              PetFinder
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mt-4 text-lg"
            >
              Encontre seu amigo peludo hoje mesmo! 🐾
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-4 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&auto=format&fit=crop&q=80"
                alt="Cachorro e gato"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 mt-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-orange-400">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="lg:w-1/2 bg-white/5 backdrop-blur-sm p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2">Acesse sua conta</h3>
            <p className="text-white/60 mb-8">Entre com suas credenciais para continuar</p>

            {/* Erro de login */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Digite seu email"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                      : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Senha */}
              <div>
                <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <Lock className="w-4 h-4" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all pr-12 ${
                      errors.password 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                        : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Esqueceu senha */}
              <div className="text-right">
                <Link to="/recuperar-senha" className="text-white/60 text-sm hover:text-white transition-colors">
                  Esqueceu sua senha?
                </Link>
              </div>

              {/* Botão entrar */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    Entrar
                  </>
                )}
              </motion.button>
            </form>

            {/* Link registro */}
            <p className="text-center text-white/60 mt-6 text-sm">
              Não tem uma conta?{' '}
              <Link to="/registro" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                Registre-se
              </Link>
            </p>

            {/* Dica de teste */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl">
              <p className="text-white/40 text-xs text-center">
                💡 Dica: Use <span className="text-cyan-400">erro@teste.com</span> para simular erro de login
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}