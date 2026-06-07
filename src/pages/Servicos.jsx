import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Instagram, MapPin, MessageCircle, Navigation, Scissors, ShieldCheck, Store } from "lucide-react";
import RegionalMap from "../components/features/RegionalMap";
import { CITIES } from "../data/mockData";
import { LOCATION_OPTIONS, withDistance } from "../data/geoData";
import { listPartners } from "../services/partnerService";
import { buildWhatsAppUrl } from "../services/adoptionService";

const SERVICE_OPTIONS = [
  ["banho", "Banho"],
  ["tosa", "Tosa"],
  ["vacina", "Vacinação"],
  ["exames", "Exames"],
  ["veterinario", "Veterinário"],
  ["racao", "Ração"],
  ["farmacia", "Farmácia pet"],
  ["acessorios", "Acessórios"],
];

export default function Servicos() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    service: "",
    origin: "",
  });

  const origin = useMemo(
    () => LOCATION_OPTIONS.find((item) => item.id === filters.origin) || null,
    [filters.origin],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadPartners() {
      setIsLoading(true);
      setError("");
      try {
        const data = await listPartners();
        if (isMounted) setPartners(data);
      } catch (loadError) {
        if (isMounted) setError(loadError.message || "Não foi possível carregar parceiros.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleShops = useMemo(
    () =>
      partners
        .map((shop) => withDistance(shop, origin))
        .filter((shop) => {
          if (filters.city && shop.city !== filters.city) return false;
          if (filters.service && !shop.services.includes(filters.service)) return false;
          return true;
        })
        .sort((a, b) => (origin ? (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999) : 0)),
    [filters, origin, partners],
  );

  const mapMarkers = useMemo(
    () => visibleShops.map((shop) => ({
      ...shop,
      type: "petshop",
      description: shop.services.map(labelService).join(", "),
    })),
    [visibleShops],
  );

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <Store className="h-4 w-4" />
            Rede local
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Serviços e pet shops parceiros</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Encontre apoio perto de você para banho, tosa, vacinação, exames, veterinário, ração e itens essenciais.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:w-[680px]">
          <Select
            value={filters.city}
            onChange={(value) => updateFilter("city", value)}
            options={[["", "Todas as cidades"], ...CITIES.map((city) => [city, city])]}
          />
          <Select
            value={filters.service}
            onChange={(value) => updateFilter("service", value)}
            options={[["", "Todos os serviços"], ...SERVICE_OPTIONS]}
          />
          <label className="relative">
            <Navigation className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <select
              value={filters.origin}
              onChange={(event) => updateFilter("origin", event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-10 text-sm text-white outline-none focus:border-blue-400"
            >
              <option value="">Distância de...</option>
              {LOCATION_OPTIONS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </label>
        </div>
      </div>

      <RegionalMap
        className="mt-8"
        title="Mapa de serviços locais"
        description="Pet shops e clínicas parceiras nas regiões prioritárias."
        markers={mapMarkers}
        origin={origin}
      />

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/15 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-xl border border-slate-700 bg-slate-800">
            <div className="h-44 bg-slate-700" />
            <div className="space-y-3 p-5">
              <div className="h-6 w-2/3 rounded bg-slate-700" />
              <div className="h-4 w-1/2 rounded bg-slate-700" />
              <div className="h-16 rounded bg-slate-700" />
            </div>
          </div>
        )) : visibleShops.map((shop) => (
          <article key={shop.id} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
            <img src={shop.image} alt={shop.name} className="h-44 w-full object-cover object-center" loading="lazy" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{shop.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4" />
                    {shop.neighborhood}, {shop.city}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-500/25">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Parceiro
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">{shop.address}</p>
              <p className="mt-2 text-xs text-slate-400">{shop.openingHours}</p>
              {typeof shop.distanceKm === "number" && (
                <p className="mt-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  {shop.distanceKm.toFixed(1)} km da origem selecionada
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {shop.services.map((service) => (
                  <span key={service} className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-xs text-blue-200">
                    <Scissors className="h-3.5 w-3.5" />
                    {labelService(service)}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a
                  href={buildWhatsAppUrl(shop.whatsapp, `Olá! Encontrei ${shop.name} no PetFinder e gostaria de confirmar informações.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                {getInstagramUrl(shop.instagram) ? (
                  <a
                    href={getInstagramUrl(shop.instagram)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300">
                    <Instagram className="h-4 w-4" />
                    {shop.instagram}
                  </span>
                )}
              </div>
              {shop.sourceUrl && (
                <a
                  href={shop.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-medium text-blue-300 hover:text-blue-200"
                >
                  Fonte: {shop.sourceLabel}. Confirme dados antes de ir.
                </a>
              )}
            </div>
          </article>
        ))}
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
        className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-400"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>{label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
    </label>
  );
}

function labelService(service) {
  return SERVICE_OPTIONS.find(([value]) => value === service)?.[1] || service;
}

function getInstagramUrl(instagram) {
  if (!instagram) return "";
  if (/^https?:\/\//i.test(instagram)) return instagram;
  if (instagram.startsWith("@")) return `https://www.instagram.com/${instagram.slice(1)}`;
  return "";
}
