import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Syringe,
} from "lucide-react";
import { CITIES } from "../data/mockData";
import {
  OFFICIAL_GUIDES,
  PUBLIC_CATEGORIES,
  PUBLIC_CHECKLIST,
  PUBLIC_SERVICES,
} from "../data/publicUtilityData";

export default function Government() {
  const [filters, setFilters] = useState({
    city: "",
    category: "",
  });

  const visibleServices = useMemo(
    () =>
      PUBLIC_SERVICES.filter((service) => {
        if (filters.city && service.city !== filters.city) return false;
        if (filters.category && service.category !== filters.category) return false;
        return true;
      }),
    [filters],
  );

  const visibleGuides = useMemo(
    () =>
      OFFICIAL_GUIDES.filter((guide) => {
        if (filters.category && guide.category !== filters.category) return false;
        return true;
      }),
    [filters.category],
  );

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              <Building2 className="h-4 w-4" />
              Utilidade publica
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Governo e cuidados oficiais</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              Informações oficiais e links úteis para vacinação, castração, zoonoses,
              viagens com pets e documentos. Confirme sempre no canal oficial antes
              de se deslocar.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:w-[520px]">
            <Select
              value={filters.city}
              onChange={(value) => updateFilter("city", value)}
              options={[["", "Todas as cidades"], ...CITIES.map((city) => [city, city])]}
            />
            <Select
              value={filters.category}
              onChange={(value) => updateFilter("category", value)}
              options={[["", "Todos os temas"], ...PUBLIC_CATEGORIES]}
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Esta pagina e um guia informativo. Regras, horarios e pontos de atendimento
              podem mudar. Para saúde animal, viagens ou documentos, valide com veterinário
              e órgão oficial responsável.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <SectionTitle
            icon={Syringe}
            title="Serviços públicos por cidade"
            description="Vacina, castração, zoonoses e canais municipais nas regioes prioritarias."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {visibleServices.map((service) => (
              <article key={service.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {categoryLabel(service.category)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-white">{service.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">{service.agency}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-500/25">
                    {service.city}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{service.description}</p>
                <InfoLine icon={CheckCircle2} label="Requisitos" value={service.requirements} />
                <InfoLine icon={Phone} label="Contato" value={service.contact} />
                <InfoLine icon={MapPin} label="Endereco" value={service.address} />
                <SourceLink label={service.sourceLabel} url={service.sourceUrl} />
              </article>
            ))}
          </div>

          {visibleServices.length === 0 && (
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-8 text-center text-sm text-slate-400">
              Nenhum servico encontrado para os filtros selecionados.
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-slate-700 bg-slate-800 p-5">
            <SectionTitle
              icon={ShieldCheck}
              title="Checklist do tutor"
              description="Itens basicos para manter o pet regularizado e protegido."
              compact
            />
            <ul className="mt-4 space-y-3">
              {PUBLIC_CHECKLIST.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-800 p-5">
            <SectionTitle
              icon={FileText}
              title="Guias oficiais"
              description="Regras nacionais e orientações para documentos, viagens e vacinas."
              compact
            />
            <div className="mt-4 space-y-3">
              {visibleGuides.map((guide) => (
                <article key={guide.id} className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {categoryLabel(guide.category)}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">{guide.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{guide.summary}</p>
                  <p className="mt-2 text-xs font-medium text-blue-200">{guide.action}</p>
                  <SourceLink label={guide.sourceLabel} url={guide.sourceUrl} />
                </article>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function Select({ value, onChange, options }) {
  return (
    <label className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-400"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>{label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
    </label>
  );
}

function SectionTitle({ icon: Icon, title, description, compact = false }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-300" />
        <h2 className={`${compact ? "text-base" : "text-xl"} font-semibold text-white`}>{title}</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="mt-3 flex gap-2 text-sm text-slate-300">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
      <p>
        <span className="font-medium text-slate-200">{label}: </span>
        {value}
      </p>
    </div>
  );
}

function SourceLink({ label, url }) {
  if (!url) {
    return <p className="mt-3 text-xs text-slate-500">Fonte: {label}</p>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-300 hover:text-blue-200"
    >
      Fonte: {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function categoryLabel(category) {
  return PUBLIC_CATEGORIES.find(([value]) => value === category)?.[1] || category;
}
