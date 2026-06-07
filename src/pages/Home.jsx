import { Link } from "react-router-dom";
import { Search, ShieldCheck, Users } from "lucide-react";
import { featuredPets, stats } from "../data/mockData";
import PetCard from "../components/features/PetCard";

export default function Home() {
  return (
    <main>
      <section className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Adoção responsável
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Encontre um pet pronto para ganhar uma família.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              O PetFinder conecta adotantes a ONGs, com filtros, detalhes claros e contato direto pelo WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/pets" className="btn-primary inline-flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                Buscar pets
              </Link>
              <Link to="/login" className="btn-secondary inline-flex items-center justify-center">
                Entrar como ONG
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <Stat value={stats.totalPets} label="Pets" />
              <Stat value={stats.registeredOngs} label="ONGs" />
              <Stat value={stats.successRate} label="Sucesso" />
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&auto=format&q=80"
            alt="Cachorro e gato juntos"
            className="h-[420px] w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Pets disponíveis</h2>
            <p className="mt-2 text-slate-400">Alguns amigos esperando uma conversa com a ONG.</p>
          </div>
          <Link to="/pets" className="text-sm font-semibold text-blue-300 hover:text-blue-200">Ver todos</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950 px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <Info icon={ShieldCheck} title="Fluxo responsável" text="O formulário organiza os primeiros dados e abre o WhatsApp da ONG responsável." />
          <Info icon={Users} title="Painel da ONG" text="ONGs podem cadastrar pets, editar dados de contato e acompanhar pedidos." />
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

function Info({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <Icon className="h-7 w-7 text-blue-300" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-400">{text}</p>
    </div>
  );
}
