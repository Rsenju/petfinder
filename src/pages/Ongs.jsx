import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, Phone, Users } from "lucide-react";
import { listOngs } from "../services/ongService";

export default function Ongs() {
  const [ongs, setOngs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOngs() {
      setIsLoading(true);
      setError("");
      try {
        const data = await listOngs();
        if (isMounted) setOngs(data);
      } catch (loadError) {
        if (isMounted) setError(loadError.message || "Nao foi possivel carregar as ONGs.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadOngs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <Building2 className="h-4 w-4" />
            Rede parceira
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">ONGs parceiras</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Conheca as organizacoes verificadas, veja seus contatos e encontre os animais disponiveis em cada uma.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-xl border border-slate-700 bg-slate-800 p-5">
              <div className="h-40 rounded-lg bg-slate-700" />
              <div className="mt-4 h-6 w-2/3 rounded bg-slate-700" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-700" />
              <div className="mt-4 h-16 rounded bg-slate-700" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/15 p-4 text-sm text-rose-100">
          {error}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ongs.map((ong) => (
            <Link
              key={ong.id}
              to={`/ong/${ong.id}`}
              className="group flex h-full flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/60 hover:bg-slate-800/90 hover:shadow-xl"
            >
              <img
                src={ong.image}
                alt={ong.name}
                className="h-40 w-full rounded-lg object-cover object-center"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="mt-4 text-xl font-semibold text-white">{ong.name}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4" />
                  {ong.city} - {ong.neighborhood}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{ong.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-2.5 py-1">
                    <Users className="h-3.5 w-3.5" />
                    {ong.petsCount || 0} pets
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-2.5 py-1">
                    <Phone className="h-3.5 w-3.5" />
                    WhatsApp
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-300 transition group-hover:text-blue-200">
                  Ver perfil da ONG
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
