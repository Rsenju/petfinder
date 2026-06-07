import { Link } from "react-router-dom";
import { AlertCircle, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/25">
        <AlertCircle className="h-7 w-7" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Página não encontrada</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Essa rota não existe no PetFinder</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
        O endereço pode ter mudado ou o link pode estar incorreto. Continue pela busca de pets ou volte para a página inicial.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link to="/pets" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          <Search className="h-4 w-4" />
          Buscar pets
        </Link>
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Home className="h-4 w-4" />
          Ir para o início
        </Link>
      </div>
    </main>
  );
}
