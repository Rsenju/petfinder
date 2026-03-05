import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  AlertCircle,
  Dog,
  Filter,
  Grid3x3,
  List,
  Loader2,
  MapPin,
  Search
} from 'lucide-react';
import { faker } from '@faker-js/faker';

const cn = (...inputs) => twMerge(clsx(inputs));

const SPECIES = ['cachorro', 'gato'];
const SIZES = ['pequeno', 'médio', 'grande'];
const AGES = ['filhote', 'adulto', 'idoso'];
const SEXES = ['macho', 'fêmea'];
const CITIES = [
  'Salvador',
  'Lauro de Freitas'
];

const initialFilterState = {
  city: '',
  species: '',
  size: '',
  age: '',
  sex: '',
  name: ''
};

const usePetFilterStore = create((set) => ({
  filters: initialFilterState,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  setFilters: (next) =>
    set(() => ({
      filters: {
        ...initialFilterState,
        ...next
      }
    })),
  resetFilters: () => set({ filters: initialFilterState })
}));

function usePetFilters() {
  const filters = usePetFilterStore((s) => s.filters);
  const setFilter = usePetFilterStore((s) => s.setFilter);
  const setFilters = usePetFilterStore((s) => s.setFilters);
  const resetFilters = usePetFilterStore((s) => s.resetFilters);

  return { filters, setFilter, setFilters, resetFilters };
}

function parseFiltersFromSearchParams(searchParams) {
  return {
    city: searchParams.get('cidade') || '',
    species: searchParams.get('especie') || '',
    size: searchParams.get('porte') || '',
    age: searchParams.get('idade') || '',
    sex: searchParams.get('sexo') || '',
    name: searchParams.get('nome') || ''
  };
}

function serializeFiltersToSearchParams(filters) {
  const params = new URLSearchParams();

  if (filters.city) params.set('cidade', filters.city);
  if (filters.species) params.set('especie', filters.species);
  if (filters.size) params.set('porte', filters.size);
  if (filters.age) params.set('idade', filters.age);
  if (filters.sex) params.set('sexo', filters.sex);
  if (filters.name) params.set('nome', filters.name);

  return params;
}

function useUrlSync() {
  const { filters, setFilters } = usePetFilters();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const stored = window.localStorage.getItem('petFilters');
    const storedFilters = stored ? JSON.parse(stored) : null;

    const urlFilters = parseFiltersFromSearchParams(searchParams);

    const hasUrlFilters = Object.values(urlFilters).some(Boolean);
    const hasStoredFilters = storedFilters && Object.values(storedFilters).some(Boolean);

    if (hasUrlFilters) {
      setFilters(urlFilters);
      return;
    }

    if (hasStoredFilters) {
      setFilters(storedFilters);
    }
  }, [searchParams, setFilters]);

  useEffect(() => {
    const params = serializeFiltersToSearchParams(filters);
    setSearchParams(params, { replace: true });
    window.localStorage.setItem('petFilters', JSON.stringify(filters));
  }, [filters, setSearchParams]);
}

function generatePet(id) {
  const species = faker.helpers.arrayElement(SPECIES);
  const size = faker.helpers.arrayElement(SIZES);
  const age = faker.helpers.arrayElement(AGES);
  const sex = faker.helpers.arrayElement(SEXES);
  const city = faker.helpers.arrayElement(CITIES);

  return {
    id,
    name: faker.person.firstName(),
    species,
    size,
    age,
    sex,
    city,
    description: faker.lorem.sentence(),
    imageUrl: faker.image.urlLoremFlickr({ category: 'animals', width: 400, height: 300 }),
    createdAt: faker.date.recent({ days: 60 }).toISOString()
  };
}

const ALL_PETS = Array.from({ length: 1200 }, (_, index) => generatePet(index + 1));

async function fetchPets(filters) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  let result = ALL_PETS;

  if (filters.city) {
    result = result.filter((pet) => pet.city === filters.city);
  }

  if (filters.species) {
    result = result.filter((pet) => pet.species === filters.species);
  }

  if (filters.size) {
    result = result.filter((pet) => pet.size === filters.size);
  }

  if (filters.age) {
    result = result.filter((pet) => pet.age === filters.age);
  }

  if (filters.sex) {
    result = result.filter((pet) => pet.sex === filters.sex);
  }

  if (filters.name) {
    const term = filters.name.toLowerCase();
    result = result.filter((pet) => pet.name.toLowerCase().includes(term));
  }

  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function SkeletonCard({ layout }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur-sm',
        layout === 'grid' ? 'flex flex-col' : 'flex flex-row gap-4'
      )}
    >
      <div
        className={cn(
          'bg-slate-200',
          layout === 'grid' ? 'h-40 w-full rounded-t-2xl' : 'h-24 w-32 rounded-l-2xl'
        )}
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="mt-1 h-3 w-full rounded bg-slate-200" />
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-3 w-1/3 rounded bg-slate-200" />
          <div className="h-8 w-20 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

const MotionCard = motion.article;

const petCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const layoutTransition = { type: 'spring', stiffness: 200, damping: 22, mass: 0.8 };

function PetCard({ pet, layout }) {
  return (
    <MotionCard
      variants={petCardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35 }}
      className={cn(
        'group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg',
        layout === 'grid' ? 'flex flex-col' : 'flex flex-row gap-4'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-slate-100',
          layout === 'grid' ? 'h-44 w-full' : 'h-28 w-36 flex-shrink-0'
        )}
      >
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-75" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
          <Dog className="h-3.5 w-3.5" />
          <span className="capitalize">{pet.species}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{pet.name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 capitalize">
                <MapPin className="h-3 w-3" />
                {pet.city}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="capitalize">{pet.size}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="capitalize">{pet.age}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="capitalize">{pet.sex}</span>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-xs text-slate-600">{pet.description}</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            Disponível para adoção
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.97]"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </MotionCard>
  );
}

export default function PetsPage() {
  const { filters, setFilter, resetFilters } = usePetFilters();
  useUrlSync();

  const [layout, setLayout] = useState('grid');
  const [searchInput, setSearchInput] = useState(filters.name || '');
  const [debouncedSearch] = useDebounce(searchInput, 300);

  useEffect(() => {
    setFilter('name', debouncedSearch);
  }, [debouncedSearch, setFilter]);

  const {
    data: pets = [],
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['pets', filters],
    queryFn: () => fetchPets(filters),
    staleTime: 5 * 60 * 1000
  });

  const [visibleCount, setVisibleCount] = useState(24);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= pets.length) return prev;
            return Math.min(prev + 24, pets.length);
          });
        }
      },
      { root: null, rootMargin: '0px 0px 300px 0px', threshold: 0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [pets.length]);

  const visiblePets = useMemo(() => pets.slice(0, visibleCount), [pets, visibleCount]);

  const nameSuggestions = useMemo(() => {
    if (!searchInput) return [];
    const term = searchInput.toLowerCase();
    const source = pets.length ? pets : ALL_PETS;
    const names = source
      .filter((pet) => pet.name.toLowerCase().includes(term))
      .slice(0, 5)
      .map((pet) => pet.name);
    return Array.from(new Set(names));
  }, [searchInput, pets]);

  const isEmpty = !isLoading && !isFetching && pets.length === 0;

  const handleResetFilters = () => {
    resetFilters();
    setSearchInput('');
    setVisibleCount(24);
  };

  const handleLayoutChange = (nextLayout) => {
    setLayout(nextLayout);
  };

  const handleSuggestionClick = (name) => {
    setSearchInput(name);
    setVisibleCount(24);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              <Dog className="h-3.5 w-3.5" />
              <span>Encontre seu novo amigo</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pets disponíveis para adoção
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Explore centenas de pets em ONGs de todo o Brasil. Use os filtros para encontrar o
              match perfeito para você.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="mr-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {pets.length.toLocaleString('pt-BR')} pets encontrados
            </div>
          </div>
        </header>

        <section className="sticky top-0 z-10 mb-5 -mx-4 border-b border-slate-200 bg-slate-50/90 px-4 pb-3 pt-3 backdrop-blur-md sm:mb-6 sm:border-x sm:rounded-2xl sm:px-5 sm:pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                    setVisibleCount(24);
                  }}
                  placeholder="Buscar por nome do pet..."
                  className="block w-full rounded-full border border-slate-200 bg-white/90 py-2.5 pl-9 pr-10 text-sm text-slate-900 shadow-xs outline-none ring-emerald-100 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {nameSuggestions.length > 0 && (
                <div className="mt-1 rounded-2xl border border-slate-200 bg-white/95 p-2 text-xs text-slate-600 shadow-sm">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    <Filter className="h-3 w-3" />
                    <span>Sugestões de nomes</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {nameSuggestions.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleSuggestionClick(name)}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-800 hover:text-white"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
              <div className="inline-flex items-center rounded-full bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => handleLayoutChange('grid')}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition',
                    layout === 'grid'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  <Grid3x3 className="h-3.5 w-3.5" />
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => handleLayoutChange('list')}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition',
                    layout === 'list'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                  Lista
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-xs transition hover:bg-slate-900 hover:text-white"
              >
                <Filter className="h-3.5 w-3.5" />
                Limpar filtros
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600 sm:mt-4">
            <select
              value={filters.city}
              onChange={(event) => {
                setFilter('city', event.target.value);
                setVisibleCount(24);
              }}
              className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            >
              <option value="">Todas as cidades</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={filters.species}
              onChange={(event) => {
                setFilter('species', event.target.value);
                setVisibleCount(24);
              }}
              className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            >
              <option value="">Todas as espécies</option>
              {SPECIES.map((species) => (
                <option key={species} value={species}>
                  {species.charAt(0).toUpperCase() + species.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.size}
              onChange={(event) => {
                setFilter('size', event.target.value);
                setVisibleCount(24);
              }}
              className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            >
              <option value="">Todos os portes</option>
              {SIZES.map((size) => (
                <option key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.age}
              onChange={(event) => {
                setFilter('age', event.target.value);
                setVisibleCount(24);
              }}
              className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            >
              <option value="">Todas as idades</option>
              {AGES.map((age) => (
                <option key={age} value={age}>
                  {age.charAt(0).toUpperCase() + age.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.sex}
              onChange={(event) => {
                setFilter('sex', event.target.value);
                setVisibleCount(24);
              }}
              className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            >
              <option value="">Todos os sexos</option>
              {SEXES.map((sex) => (
                <option key={sex} value={sex}>
                  {sex.charAt(0).toUpperCase() + sex.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </section>

        <main className="flex-1">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={layoutTransition}
              className={cn(
                'grid gap-4 sm:gap-5',
                layout === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-1'
              )}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} layout={layout} />
              ))}
            </motion.div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Não encontramos pets com esses filtros
              </h2>
              <p className="mt-1 max-w-md text-sm text-slate-500">
                Tente remover alguns filtros ou buscar por outra cidade, porte ou espécie. Existem
                muitos outros pets esperando por você.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
              <motion.div
                key={layout}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={layoutTransition}
                className={cn(
                  'grid gap-4 sm:gap-5',
                  layout === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-1'
                )}
              >
                {visiblePets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} layout={layout} />
                ))}
              </motion.div>

              <div ref={loadMoreRef} className="h-10 w-full" />

              {isFetching && !isLoading && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                  <span>Atualizando lista de pets…</span>
                </div>
              )}

              {visibleCount < pets.length && !isFetching && (
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((prev) => Math.min(prev + 24, pets.length))
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-900 hover:text-white"
                  >
                    <Loader2 className="h-3.5 w-3.5" />
                    Carregar mais pets
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}