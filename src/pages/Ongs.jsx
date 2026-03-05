import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MapPin, ShieldCheck, SlidersHorizontal } from 'lucide-react';

import useOngs from '../hooks/useOngs';
import useGeolocation from '../hooks/useGeolocation';
import OngCard from '../components/features/OngCard';
import SearchBar from '../components/features/SearchBar';
import FilterSection from '../components/features/FilterSection';
import SkeletonCard from '../components/ui/SkeletonCard';

const cn = (...inputs) => twMerge(clsx(inputs));

const initialFilters = {
  city: '',
  verified: '',
  query: '',
  nearMe: false
};

function parseFiltersFromSearchParams(searchParams) {
  return {
    city: searchParams.get('cidade') || '',
    verified: searchParams.get('verificada') || '',
    query: searchParams.get('q') || '',
    nearMe: searchParams.get('perto') === '1'
  };
}

function serializeFiltersToSearchParams(filters) {
  const params = new URLSearchParams();

  if (filters.city) params.set('cidade', filters.city);
  if (filters.verified) params.set('verificada', filters.verified);
  if (filters.query) params.set('q', filters.query);
  if (filters.nearMe) params.set('perto', '1');

  return params;
}

function OngsMap({ ongs }) {
  if (!ongs || !ongs.length) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 text-xs text-slate-500">
        Mapa será carregado assim que houver ONGs.
      </div>
    );
  }

  const cityGroups = ongs.reduce((acc, ong) => {
    const city = ong.city || ong.cidade || 'Outras cidades';
    if (!acc[city]) acc[city] = 0;
    acc[city] += 1;
    return acc;
  }, {});

  return (
    <section
      aria-label="Mapa aproximado das ONGs"
      className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4 text-slate-50 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-xs font-semibold text-slate-50 sm:text-sm">Mapa das ONGs</h2>
            <p className="text-[11px] text-slate-400">
              Visualização aproximada por cidade, para dar uma noção de concentração.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 grid gap-2 text-[11px] sm:grid-cols-3">
        {Object.entries(cityGroups).map(([city, count]) => (
          <div
            key={city}
            className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2 text-slate-100"
          >
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <span className="max-w-[130px] truncate">{city}</span>
            </div>
            <span className="rounded-full bg-slate-900/50 px-2 py-0.5 text-[10px] font-medium">
              {count} ONG{count > 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[10px] text-slate-500">
        Dados apenas ilustrativos. O mapa real poderá ser integrado futuramente com um provedor de
        mapas.
      </p>
    </section>
  );
}

export default function OngsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [searchValue, setSearchValue] = useState('');

  const { location, isLocating, requestLocation } = useGeolocation?.() || {
    location: null,
    isLocating: false,
    requestLocation: () => {}
  };

  useEffect(() => {
    const stored = window.localStorage.getItem('ongFilters');
    const storedFilters = stored ? JSON.parse(stored) : null;

    const urlFilters = parseFiltersFromSearchParams(searchParams);
    const hasUrlFilters = Object.values(urlFilters).some(Boolean);
    const hasStoredFilters = storedFilters && Object.values(storedFilters).some(Boolean);

    if (hasUrlFilters) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
      setSearchValue(urlFilters.query || '');
      return;
    }

    if (hasStoredFilters) {
      setFilters((prev) => ({ ...prev, ...storedFilters }));
      setSearchValue(storedFilters.query || '');
    }
  }, [searchParams]);

  useEffect(() => {
    const params = serializeFiltersToSearchParams(filters);
    setSearchParams(params, { replace: true });
    window.localStorage.setItem('ongFilters', JSON.stringify(filters));
  }, [filters, setSearchParams]);

  const { data: ongs = [], isLoading, isFetching } = useOngs(filters, location);

  const cities = useMemo(() => {
    const set = new Set();
    ongs.forEach((ong) => {
      if (ong.city || ong.cidade) {
        set.add(ong.city || ong.cidade);
      }
    });
    return Array.from(set).sort();
  }, [ongs]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setFilters((prev) => ({
      ...prev,
      query: value
    }));
  };

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({
      ...prev,
      ...partial
    }));
  };

  const handleToggleNearMe = () => {
    const next = !filters.nearMe;
    setFilters((prev) => ({
      ...prev,
      nearMe: next
    }));
    if (next && requestLocation) {
      requestLocation();
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchValue('');
  };

  const isEmpty = !isLoading && !isFetching && ongs.length === 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Encontre ONGs confiáveis</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              ONGs de adoção parceiras
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Explore ONGs especializadas em adoção responsável. Use os filtros para encontrar
              organizações na sua cidade ou próximas de você.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
              {ongs.length.toLocaleString('pt-BR')} ONG
              {ongs.length === 1 ? '' : 's'} encontradas
            </span>
          </div>
        </header>

        <section className="mb-5 space-y-3 sm:mb-6">
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Buscar por nome da ONG..."
          />

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-sm sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="inline-flex items-center gap-1 font-medium">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filtros</span>
              </div>
            </div>

            <FilterSection
              cities={cities}
              filters={filters}
              onChange={handleFilterChange}
              onToggleNearMe={handleToggleNearMe}
              onReset={handleResetFilters}
              isLocating={isLocating}
            />
          </div>
        </section>

        <section aria-label="Mapa de ONGs" className="mb-6">
          <OngsMap ongs={ongs} />
        </section>

        <main>
          {isLoading ? (
            <Motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </Motion.div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-12 text-center shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Nenhuma ONG encontrada com esses filtros
              </h2>
              <p className="mt-1 max-w-md text-sm text-slate-500">
                Tente remover alguns filtros ou buscar por outra cidade. Novas ONGs podem ser
                adicionadas ao sistema em breve.
              </p>
            </div>
          ) : (
            <Motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {ongs.map((ong) => (
                <OngCard key={ong.id} ong={ong} />
              ))}
            </Motion.div>
          )}
        </main>
      </div>
    </div>
  );
}