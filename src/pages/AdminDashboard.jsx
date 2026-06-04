import { useEffect, useState } from "react";
import { Building2, PawPrint, Users } from "lucide-react";
import { listOngs } from "../services/ongService";
import { listPets } from "../services/petService";
import { readStorage, STORAGE_KEYS } from "../services/storage";

export default function AdminDashboard() {
  const [data, setData] = useState({ ongs: [], pets: [], requests: [] });

  useEffect(() => {
    async function load() {
      const [ongs, pets] = await Promise.all([listOngs(), listPets()]);
      setData({
        ongs,
        pets,
        requests: readStorage(STORAGE_KEYS.adoptionRequests, []),
      });
    }
    load();
  }, []);

  const cards = [
    { label: "ONGs cadastradas", value: data.ongs.length, icon: Building2 },
    { label: "Pets cadastrados", value: data.pets.length, icon: PawPrint },
    { label: "Pedidos de adocao", value: data.requests.length, icon: Users },
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
            Visao geral dos dados locais do sistema para preparo de producao.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
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
      </div>
    </div>
  );
}
