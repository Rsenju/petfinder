import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import PetCard from "../components/features/PetCard";
import { getOngById } from "../services/ongService";
import { listPets } from "../services/petService";
import { buildWhatsAppUrl } from "../services/adoptionService";

const statusLabel = {
  available: "Disponiveis",
  in_process: "Em processo",
  adopted: "Adotados",
};

export default function OngProfile() {
  const { id } = useParams();
  const [ong, setOng] = useState(null);
  const [pets, setPets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("available");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setError("");
      try {
        const [ongData, petsData] = await Promise.all([getOngById(id), listPets()]);
        if (!ongData) throw new Error("ONG não encontrada.");
        if (!isMounted) return;
        setOng(ongData);
        setPets(petsData.filter((pet) => pet.ong_id === ongData.id || pet.ong === ongData.name));
      } catch (loadError) {
        if (isMounted) setError(loadError.message || "Não foi possível carregar a ONG.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const stats = useMemo(() => {
    const available = pets.filter((pet) => pet.status === "available").length;
    const inProcess = pets.filter((pet) => pet.status === "in_process").length;
    const adopted = pets.filter((pet) => pet.status === "adopted").length;
    return { available, inProcess, adopted, total: pets.length };
  }, [pets]);

  const visiblePets = pets.filter((pet) => pet.status === statusFilter);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-40 rounded bg-slate-800" />
          <div className="h-72 rounded-2xl bg-slate-800" />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-64 rounded-2xl bg-slate-800" />
            <div className="h-64 rounded-2xl bg-slate-800" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !ong) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Não foi possível abrir esta ONG</h1>
        <p className="mt-2 text-sm text-slate-400">{error || "Tente voltar para a lista de ONGs."}</p>
        <Link to="/ongs" className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Voltar para ONGs
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/ongs" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Voltar para ONGs
      </Link>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
        <div className="relative h-72 bg-slate-950">
          <img src={ong.image} alt={ong.name} className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            {ong.verified && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-500/30">
                <ShieldCheck className="h-4 w-4" />
                ONG parceira verificada
              </div>
            )}
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{ong.name}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <MapPin className="h-4 w-4" />
              {ong.city} - {ong.neighborhood}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
          <h2 className="text-xl font-semibold text-white">Sobre a ONG</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{ong.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoItem icon={MapPin} label="Endereco" value={ong.address || `${ong.city} - ${ong.neighborhood}`} />
            <InfoItem icon={HeartHandshake} label="Area atendida" value={ong.serviceArea || ong.city} />
            <InfoItem icon={Building2} label="Responsável" value={ong.responsible || ong.name} />
            <InfoItem icon={Calendar} label="Atuando desde" value={ong.foundedAt || "Não informado"} />
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
          <h2 className="text-xl font-semibold text-white">Contato</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <ContactLine icon={Phone} value={ong.whatsapp} />
            <ContactLine icon={Mail} value={ong.email} href={ong.email ? `mailto:${ong.email}` : ""} />
            <ContactLine icon={Instagram} value={ong.instagram || "Instagram não informado"} href={getInstagramUrl(ong.instagram)} />
          </div>

          <a
            href={buildWhatsAppUrl(ong.whatsapp, `Olá! Gostaria de falar com a ${ong.name} pelo PetFinder.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com a ONG
          </a>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat value={stats.available} label="Disponiveis" />
            <Stat value={stats.inProcess} label="Processo" />
            <Stat value={stats.adopted} label="Adotados" />
          </div>
        </aside>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Animais da ONG</h2>
            <p className="mt-1 text-sm text-slate-400">
              {stats.total} pets cadastrados por {ong.name}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusLabel).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 ring-1 ring-slate-700 hover:bg-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {visiblePets.length ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center text-sm text-slate-400">
            Nenhum pet nesta categoria agora.
          </div>
        )}
      </section>
    </main>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}

function ContactLine({ icon: Icon, value, href = "" }) {
  const content = (
    <>
      <Icon className="h-4 w-4 text-slate-500" />
      <span className="min-w-0 break-words">{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="flex items-center gap-2 hover:text-white"
      >
        {content}
      </a>
    );
  }

  return (
    <p className="flex items-center gap-2">
      {content}
    </p>
  );
}

function getInstagramUrl(instagram) {
  if (!instagram) return "";
  if (/^https?:\/\//i.test(instagram)) return instagram;
  if (instagram.startsWith("@")) return `https://www.instagram.com/${instagram.slice(1)}`;
  return "";
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-3">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] text-slate-400">{label}</p>
    </div>
  );
}
