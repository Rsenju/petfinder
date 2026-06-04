import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AuthCallback() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (user?.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }
    if (user?.role === "ong") {
      navigate("/dashboard", { replace: true });
      return;
    }
    navigate("/pets", { replace: true });
  }, [isLoading, navigate, user]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-300" />
        <h1 className="mt-4 text-xl font-semibold">Finalizando seu acesso</h1>
        <p className="mt-2 text-sm text-slate-400">
          Estamos verificando sua conta e preparando a proxima tela.
        </p>
      </div>
    </main>
  );
}
