import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Chrome,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { loginSchema } from "../utils/validations";
import { useAuth } from "../hooks/useAuth";
import Logo from "../components/ui/Logo";
import { isSupabaseConfigured } from "../services/supabaseClient";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login, loginGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await login(data);
      if (!result.success) {
        throw new Error(result.error);
      }

      const user = result.user;
      navigate(user?.role === "admin" || user?.tipo === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      setLoginError(error.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setLoginError("");
    try {
      await loginGoogle();
    } catch (error) {
      setLoginError(error.message || "Não foi possível entrar com Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[0.95fr_1.05fr]"
      >
        <section className="hidden bg-slate-800 p-10 lg:block">
          <Logo size="xl" />
          <h1 className="mt-10 text-4xl font-bold text-white">
            Acesso PetFinder
          </h1>
          <p className="mt-4 max-w-sm text-slate-300">
            Entre como ONG para gerenciar pets e dados de contato, ou como admin para acompanhar os dados do sistema.
          </p>
          {!isSupabaseConfigured && (
            <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900/70 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Contas de teste</p>
              <p className="mt-3">ONG: ong@petfinder.local / ong123</p>
              <p>Admin: admin@petfinder.local / admin123</p>
            </div>
          )}
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-white">Entrar</h2>
          <p className="mt-2 text-slate-400">
            Use uma conta de ONG ou administrador para continuar.
          </p>

          {loginError && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {loginError}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || !isSupabaseConfigured}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Chrome className="h-5 w-5" />
            {isGoogleLoading ? "Abrindo Google..." : "Entrar com Google"}
          </button>
          {!isSupabaseConfigured && (
            <p className="mt-2 text-center text-xs text-slate-500">
              Configure o Supabase para ativar login social.
            </p>
          )}

          <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
            <span className="h-px flex-1 bg-slate-800" />
            <span>ou entre com email</span>
            <span className="h-px flex-1 bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="ong@petfinder.local"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
                <Lock className="h-4 w-4" />
                Senha
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-white"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Entrando..." : "Entrar"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Ainda não tem cadastro?{" "}
            <Link to="/register" className="font-medium text-blue-300 hover:text-blue-200">
              Criar conta
            </Link>
          </p>
        </section>
      </motion.div>
    </div>
  );
}
