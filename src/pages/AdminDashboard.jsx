import { useEffect, useState } from "react";
import { Building2, PawPrint, Users } from "lucide-react";
import { listAdoptionRequests } from "../services/adoptionService";
import { listProfiles } from "../services/authService";
import { listOngs } from "../services/ongService";
import { listPets } from "../services/petService";

export default function AdminDashboard() {
  const [data, setData] = useState({ ongs: [], pets: [], requests: [], profiles: [] });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      setError("");
      try {
        const [ongs, pets, requests, profiles] = await Promise.all([
          listOngs(),
          listPets(),
          listAdoptionRequests(),
          listProfiles(),
        ]);
        if (isMounted) setData({ ongs, pets, requests, profiles });
      } catch (loadError) {
        if (isMounted) setError(loadError.message || "Nao foi possivel carregar o admin.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const pendingProfiles = data.profiles.filter((profile) => profile.role === "adopter" && !profile.ong_id);

  const cards = [
    { label: "ONGs cadastradas", value: data.ongs.length, icon: Building2 },
    { label: "Pets cadastrados", value: data.pets.length, icon: PawPrint },
    { label: "Pedidos de adocao", value: data.requests.length, icon: Users },
    { label: "Perfis sem ONG", value: pendingProfiles.length, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Administracao
          </p>
          <h1 className="mt-2 text-3xl font-bold">Painel PetFinder</h1>
          <p className="mt-2 text-slate-400">
            Visao geral operacional do sistema.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300">
            Carregando dados administrativos...
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                <Icon className="h-6 w-6 text-blue-300" />
                <p className="mt-4 text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-slate-400">{card.label}</p>
              </div>
            );
          })}
        </div>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <div className="border-b border-slate-700 p-4">
            <h2 className="font-semibold">ONGs cadastradas</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {data.ongs.map((ong) => (
              <div key={ong.id} className="grid gap-2 p-4 sm:grid-cols-[1.5fr_1fr_1fr]">
                <span className="font-medium">{ong.name}</span>
                <span className="text-slate-400">{ong.city}</span>
                <span className="text-slate-400">{ong.whatsapp}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <div className="border-b border-slate-700 p-4">
            <h2 className="font-semibold">Pedidos de adocao recentes</h2>
          </div>
          {data.requests.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Nenhum pedido registrado ainda.</p>
          ) : (
            <div className="divide-y divide-slate-700">
              {data.requests.slice(0, 8).map((request) => (
                <div key={request.id} className="grid gap-2 p-4 sm:grid-cols-[1fr_1fr_1fr]">
                  <span className="font-medium">{request.adopter_name}</span>
                  <span className="text-slate-400">{request.adopter_phone}</span>
                  <span className="text-slate-400">{request.pets?.name || request.pet_id}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <div className="border-b border-slate-700 p-4">
            <h2 className="font-semibold">Usuarios e permissoes</h2>
          </div>
          {data.profiles.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Nenhum perfil encontrado.</p>
          ) : (
            <div className="divide-y divide-slate-700">
              {data.profiles.map((profile) => (
                <div key={profile.id} className="grid gap-2 p-4 sm:grid-cols-[1.5fr_1fr_1fr]">
                  <span className="font-medium">{profile.name || profile.email}</span>
                  <span className="text-slate-400">{profile.role}</span>
                  <span className={profile.ong_id ? "text-emerald-300" : "text-amber-300"}>
                    {profile.ong_id ? "ONG vinculada" : "Sem ONG vinculada"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
