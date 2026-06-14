import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  Building2,
  CheckCircle2,
  Eye,
  Flag,
  PawPrint,
  ShieldCheck,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { listAdoptionRequests } from "../services/adoptionService";
import { listProfiles } from "../services/authService";
import { listOngs, ONG_APPROVAL_STATUS, updateOngModeration } from "../services/ongService";
import { deletePet, listPets } from "../services/petService";
import { listReports, REPORT_REASONS, updateReportStatus } from "../services/reportService";

const ongStatusLabel = {
  pending: "Pendente",
  approved: "Aprovada",
  rejected: "Rejeitada",
  blocked: "Bloqueada",
};

const reportStatusLabel = {
  open: "Aberta",
  reviewing: "Em análise",
  resolved: "Resolvida",
  dismissed: "Descartada",
};

export default function AdminDashboard() {
  const [data, setData] = useState({ ongs: [], pets: [], requests: [], profiles: [], reports: [] });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [ongs, pets, requests, profiles, reports] = await Promise.all([
        listOngs({ includeInactive: true }),
        listPets({ includeInactive: true }),
        listAdoptionRequests(),
        listProfiles(),
        listReports(),
      ]);
      setData({ ongs, pets, requests, profiles, reports });
    } catch (loadError) {
      setError(loadError.message || "Não foi possível carregar o admin.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pendingProfiles = data.profiles.filter((profile) => profile.role === "adopter" && !profile.ong_id);
  const pendingOngs = data.ongs.filter((ong) => ong.approvalStatus === ONG_APPROVAL_STATUS.pending);
  const openReports = data.reports.filter((report) => report.status === "open");

  const cards = [
    { label: "ONGs cadastradas", value: data.ongs.length, icon: Building2 },
    { label: "ONGs pendentes", value: pendingOngs.length, icon: ShieldCheck },
    { label: "Pets cadastrados", value: data.pets.length, icon: PawPrint },
    { label: "Denúncias abertas", value: openReports.length, icon: Flag },
    { label: "Pedidos de adoção", value: data.requests.length, icon: Users },
    { label: "Perfis sem ONG", value: pendingProfiles.length, icon: Users },
  ];

  const reportsByReason = useMemo(() => {
    const map = new Map(REPORT_REASONS.map((reason) => [reason.value, reason.label]));
    return (reason) => map.get(reason) || reason;
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2400);
  };

  const handleOngStatus = async (ong, approvalStatus) => {
    await updateOngModeration(ong.id, { approvalStatus });
    showMessage(`ONG ${ongStatusLabel[approvalStatus].toLowerCase()} com sucesso.`);
    await load();
  };

  const handleDeletePet = async (pet) => {
    const confirmed = window.confirm(`Remover o pet ${pet.name}? Esta acao não pode ser desfeita.`);
    if (!confirmed) return;
    await deletePet(pet.id);
    showMessage("Pet removido pela moderação.");
    await load();
  };

  const handleReportStatus = async (report, status) => {
    await updateReportStatus(report.id, status);
    showMessage("Denuncia atualizada.");
    await load();
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Administração
          </p>
          <h1 className="mt-2 text-3xl font-bold">Painel PetFinder</h1>
          <p className="mt-2 text-slate-400">
            Central de moderação, confiança e visão operacional do sistema.
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
        {message && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-sm text-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
          <SectionHeader title="ONGs cadastradas" description="Aprove, rejeite ou bloqueie organizações parceiras." />
          <div className="divide-y divide-slate-700">
            {data.ongs.map((ong) => (
              <article key={ong.id} className="grid gap-4 p-4 lg:grid-cols-[1.3fr_0.8fr_0.7fr_auto] lg:items-center">
                <div>
                  <h3 className="font-semibold">{ong.name}</h3>
                  <p className="text-sm text-slate-400">{ong.city} - {ong.neighborhood}</p>
                  <p className="text-xs text-slate-500">{ong.email}</p>
                </div>
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${ongStatusClass(ong.approvalStatus)}`}>
                  {ongStatusLabel[ong.approvalStatus] || ong.approvalStatus}
                </span>
                <span className={ong.verified ? "text-sm text-emerald-300" : "text-sm text-slate-500"}>
                  {ong.verified ? "Selo verificado" : "Sem selo"}
                </span>
                <div className="flex flex-wrap gap-2">
                  <ActionButton label="Aprovar" icon={ShieldCheck} onClick={() => handleOngStatus(ong, "approved")} />
                  <ActionButton label="Rejeitar" icon={XCircle} onClick={() => handleOngStatus(ong, "rejected")} tone="warning" />
                  <ActionButton label="Bloquear" icon={Ban} onClick={() => handleOngStatus(ong, "blocked")} tone="danger" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <SectionHeader title="Moderação de pets" description="Remova pets com imagens incorretas, informações falsas ou conteúdo inadequado." />
          <div className="divide-y divide-slate-700">
            {data.pets.slice(0, 12).map((pet) => (
              <article key={pet.id} className="grid gap-4 p-4 lg:grid-cols-[72px_1.2fr_0.8fr_auto] lg:items-center">
                <img src={pet.image || pet.image_url} alt={pet.name} className="h-16 w-20 rounded-lg object-cover object-center" />
                <div>
                  <h3 className="font-semibold">{pet.name}</h3>
                  <p className="text-sm text-slate-400">{pet.city} - {pet.breed}</p>
                </div>
                <span className="text-sm text-slate-400">{pet.ong}</span>
                <div className="flex gap-2">
                  <a href={`/pet/${pet.id}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700">
                    <Eye className="h-3.5 w-3.5" />
                    Ver
                  </a>
                  <ActionButton label="Remover" icon={Trash2} onClick={() => handleDeletePet(pet)} tone="danger" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <SectionHeader title="Denúncias" description="Analise problemas reportados por visitantes." />
          {data.reports.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Nenhuma denuncia registrada ainda.</p>
          ) : (
            <div className="divide-y divide-slate-700">
              {data.reports.map((report) => (
                <article key={report.id} className="grid gap-4 p-4 lg:grid-cols-[1fr_0.8fr_0.8fr_auto] lg:items-center">
                  <div>
                    <h3 className="font-semibold">{reportsByReason(report.reason)}</h3>
                    <p className="text-sm text-slate-400">{report.description || "Sem descrição adicional."}</p>
                    <p className="text-xs text-slate-500">Pet: {report.pets?.name || report.pet_id}</p>
                  </div>
                  <span className="text-sm text-slate-400">{report.reporter_contact || "Contato não informado"}</span>
                  <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${reportStatusClass(report.status)}`}>
                    {reportStatusLabel[report.status] || report.status}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <ActionButton label="Analisar" icon={Eye} onClick={() => handleReportStatus(report, "reviewing")} />
                    <ActionButton label="Resolver" icon={CheckCircle2} onClick={() => handleReportStatus(report, "resolved")} />
                    <ActionButton label="Descartar" icon={XCircle} onClick={() => handleReportStatus(report, "dismissed")} tone="warning" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <SectionHeader title="Usuários e permissões" description="Perfis autenticados e vínculos com ONGs." />
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

function SectionHeader({ title, description }) {
  return (
    <div className="border-b border-slate-700 p-4">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick, tone = "default" }) {
  const toneClass = {
    default: "border-slate-600 text-slate-200 hover:bg-slate-700",
    warning: "border-amber-500/40 text-amber-200 hover:bg-amber-500/10",
    danger: "border-red-500/40 text-red-200 hover:bg-red-500/10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold ${toneClass[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function ongStatusClass(status) {
  const map = {
    pending: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/20",
    approved: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/20",
    rejected: "bg-slate-700 text-slate-200 ring-1 ring-slate-600",
    blocked: "bg-red-500/15 text-red-200 ring-1 ring-red-500/20",
  };
  return map[status] || map.pending;
}

function reportStatusClass(status) {
  const map = {
    open: "bg-red-500/15 text-red-200 ring-1 ring-red-500/20",
    reviewing: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/20",
    resolved: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/20",
    dismissed: "bg-slate-700 text-slate-200 ring-1 ring-slate-600",
  };
  return map[status] || map.open;
}
