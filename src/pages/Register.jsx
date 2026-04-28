import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, 
  ChevronLeft, PawPrint, Check, AlertCircle 
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { registerSchema } from '../utils/validations';

const steps = [
  { id: 1, title: 'Dados pessoais', description: 'Informações básicas' },
  { id: 2, title: 'Segurança', description: 'Crie sua senha' },
  { id: 3, title: 'Verificação', description: 'Confirme seu email' },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = watch('password');
  const watchAllFields = watch();

  // Login Social
  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
    alert(`Login com ${provider} - Integrar com backend`);
  };

  // Enviar código de verificação
  const sendVerificationCode = async () => {
    const isValid = await trigger(['email']);
    if (!isValid) return false;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Código 123456 enviado para ${getValues('email')}`);
    setIsLoading(false);
    return true;
  };

  const nextStep = async () => {
    if (currentStep === 2) {
      const sent = await sendVerificationCode();
      if (sent) {
        setShowVerification(true);
      }
      return;
    }

    const fieldsToValidate = {
      1: ['name', 'email'],
      2: ['password', 'confirmPassword'],
    };

    const isValid = await trigger(fieldsToValidate[currentStep]);
    if (isValid && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setShowVerification(false);
    }
  };

  // Verificar código
  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setRegisterError('Digite o código completo');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === '123456') {
      setIsEmailVerified(true);
      setShowVerification(false);
      setCurrentStep(3);
      setRegisterError('');
    } else {
      setRegisterError('Código inválido. Tente 123456');
      setVerificationCode(['', '', '', '', '', '']);
    }
    setIsLoading(false);
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const onSubmit = async (data) => {
    if (!isEmailVerified) {
      setRegisterError('Por favor, verifique seu email primeiro');
      return;
    }

    setIsLoading(true);
    setRegisterError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (data.email === 'existe@teste.com') {
        throw new Error('Este email já está cadastrado');
      }

      console.log('Registro bem-sucedido:', data);
      navigate('/login?registered=true');
    } catch (error) {
      setRegisterError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    const labels = ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte', 'Muito forte'];
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-yellow-300', 'bg-green-400', 'bg-green-500'];

    return { strength: score, label: labels[score], color: colors[score] };
  };

  const passwordStrength = getPasswordStrength(watchPassword);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            {/* Social Login */}
            <div className="space-y-3">
              <button onClick={() => handleSocialLogin('Google')} className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-all flex items-center justify-center gap-3 border border-white/10">
                <FcGoogle className="w-5 h-5" />
                Continuar com Google
              </button>
              <button onClick={() => handleSocialLogin('Facebook')} className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-3">
                <FaFacebook className="w-5 h-5" />
                Continuar com Facebook
              </button>
              <button onClick={() => handleSocialLogin('Apple')} className="w-full py-3 px-4 bg-black hover:bg-gray-900 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-3">
                <FaApple className="w-5 h-5" />
                Continuar com Apple
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-transparent text-white/40">ou preencha manualmente</span></div>
            </div>

            {/* Nome */}
            <div>
              <label className="flex items-center gap-2 text-white/80 text-sm mb-2"><User className="w-4 h-4" />Nome completo</label>
              <input {...register('name')} type="text" placeholder="Digite seu nome" className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'}`} />
              {errors.name && <p className="mt-2 text-sm text-red-300 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-white/80 text-sm mb-2"><Mail className="w-4 h-4" />Email</label>
              <input {...register('email')} type="email" placeholder="Digite seu email" className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'}`} />
              {errors.email && <p className="mt-2 text-sm text-red-300 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            {/* Senha */}
            <div>
              <label className="flex items-center gap-2 text-white/80 text-sm mb-2"><Lock className="w-4 h-4" />Senha</label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Crie uma senha segura" className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all pr-12 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {watchPassword && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white/60">Força da senha</span>
                    <span className={`text-xs font-medium ${passwordStrength.strength >= 4 ? 'text-green-400' : passwordStrength.strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }} className={`h-full ${passwordStrength.color} transition-colors duration-300`} />
                  </div>
                </div>
              )}

              <div className="mt-3 space-y-1">
                {[
                  { test: watchPassword?.length >= 8, label: 'Mínimo 8 caracteres' },
                  { test: /[A-Z]/.test(watchPassword), label: 'Letra maiúscula' },
                  { test: /[a-z]/.test(watchPassword), label: 'Letra minúscula' },
                  { test: /[0-9]/.test(watchPassword), label: 'Número' },
                  { test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchPassword), label: 'Caractere especial' },
                ].map((req, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-xs ${req.test ? 'text-green-400' : 'text-white/40'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.test ? 'bg-green-500/20' : 'bg-white/10'}`}>
                      {req.test ? <Check className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/30" />}
                    </div>
                    {req.label}
                  </div>
                ))}
              </div>

              {errors.password && <p className="mt-2 text-sm text-red-300 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password.message}</p>}
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="flex items-center gap-2 text-white/80 text-sm mb-2"><Lock className="w-4 h-4" />Confirme a senha</label>
              <div className="relative">
                <input {...register('confirmPassword')} type={showConfirmPassword ? 'text' : 'password'} placeholder="Digite a senha novamente" className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all pr-12 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400'}`} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-300 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword.message}</p>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {showVerification ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verifique seu email</h3>
                <p className="text-white/60 text-sm mb-6">Digite o código de 6 dígitos enviado para {getValues('email')}</p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {verificationCode.map((digit, idx) => (
                    <input key={idx} id={`code-${idx}`} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(idx, e.target.value)} className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50" />
                  ))}
                </div>

                <button onClick={handleVerifyCode} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50">
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'Verificar código'}
                </button>
                <p className="text-white/30 text-xs mt-4">💡 Código de teste: 123456</p>
              </div>
            ) : (
              <>
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <User className="w-5 h-5 text-cyan-400" />
                    <div><p className="text-white/60 text-xs">Nome</p><p className="text-white font-medium">{watchAllFields.name}</p></div>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <div><p className="text-white/60 text-xs">Email</p><p className="text-white font-medium">{watchAllFields.email}</p></div>
                    {isEmailVerified && <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1"><Check className="w-3 h-3" />Verificado</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <div><p className="text-white/60 text-xs">Senha</p><p className="text-white font-medium">{'•'.repeat(watchAllFields.password?.length || 0)}</p></div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-200 text-sm">Ao criar sua conta, você concorda com nossos <Link to="/termos" className="underline hover:text-green-100">Termos de Uso</Link> e <Link to="/privacidade" className="underline hover:text-green-100">Política de Privacidade</Link>.</p>
                </div>
              </>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)} className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10">
        <ChevronLeft className="w-5 h-5" /><span>Voltar</span>
      </motion.button>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-white/5 p-8 lg:p-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
              <PawPrint className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Criar conta</h2>
            <p className="text-white/60 mb-8">Junte-se à comunidade PetFinder</p>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${currentStep > step.id || (step.id === 3 && isEmailVerified) ? 'bg-green-500 text-white' : currentStep === step.id ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/40'}`}>
                    {currentStep > step.id || (step.id === 3 && isEmailVerified) ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <p className={`font-medium ${currentStep >= step.id ? 'text-white' : 'text-white/40'}`}>{step.title}</p>
                    <p className="text-xs text-white/40">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 p-8 lg:p-12">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {registerError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200"><AlertCircle className="w-5 h-5 flex-shrink-0" /><span className="text-sm">{registerError}</span></motion.div>}

            {!showVerification && (
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={prevStep} type="button" className="px-6 py-3 border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center gap-2"><ArrowLeft className="w-5 h-5" />Voltar</motion.button>}
                {currentStep < 3 ? <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextStep} type="button" disabled={isLoading} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70">{isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><>Próximo</><ArrowRight className="w-5 h-5" /></>}</motion.button> : <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit(onSubmit)} disabled={isLoading || !isEmailVerified} className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">{isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check className="w-5 h-5" />Criar conta</>}</motion.button>}
              </div>
            )}

            <p className="text-center text-white/60 mt-6 text-sm">Já tem uma conta? <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">Faça login</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}