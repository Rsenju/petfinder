import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Dog, 
  X,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { allPets, CITIES, SPECIES, SIZES, AGES, SEXES } from '../data/mockData';
import PetCard from '../components/features/PetCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Pets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef(null);

  // Filtros
  const [filters, setFilters] = useState({
    city: searchParams.get('cidade') || '',
    species: searchParams.get('especie') || '',
    size: searchParams.get('porte') || '',
    age: searchParams.get('idade') || '',
    sex: searchParams.get('sexo') || '',
    name: searchParams.get('nome') || ''
  });

  // Simula loading inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Sync filtros com URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.city) params.set('cidade', filters.city);
    if (filters.species) params.set('especie', filters.species);
    if (filters.size) params.set('porte', filters.size);
    if (filters.age) params.set('idade', filters.age);
    if (filters.sex) params.set('sexo', filters.sex);
    if (filters.name) params.set('nome', filters.name);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Filtrar pets
  const filteredPets = useMemo(() => {
    return allPets.filter(pet => {
      if (filters.city && pet.city !== filters.city) return false;
      if (filters.species && pet.species !== filters.species) return false;
      if (filters.size && pet.size !== filters.size) return false;
      // ✅ CORRIGIDO: Usar ageType em vez de age string
      if (filters.age && pet.ageType !== filters.age) return false;
      if (filters.sex && pet.sex !== filters.sex) return false;
      if (filters.name && !pet.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const visiblePets = filteredPets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPets.length;

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 12, filteredPets.length));
        }
      },
      { rootMargin: '200px' }
    );
    
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredPets.length]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleCount(12);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      species: '',
      size: '',
      age: '',
      sex: '',
      name: ''
    });
    setVisibleCount(12);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                <Dog className="w-4 h-4" />
                <span>Encontre seu novo amigo</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Pets Disponíveis para Adoção
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Explore nossos {allPets.length} pets e encontre o companheiro perfeito para sua família
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filtros */}
      <section className="sticky top-16 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={filters.name}
                onChange={(e) => updateFilter('name', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {filters.name && (
                <button
                  onClick={() => updateFilter('name', '')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filtros Dropdown */}
            <div className="flex flex-wrap gap-2">
              {/* Cidade */}
              <div className="relative">
                <select
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                >
                  <option value="">Todas as cidades</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Espécie */}
              <div className="relative">
                <select
                  value={filters.species}
                  onChange={(e) => updateFilter('species', e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                >
                  <option value="">Todas as espécies</option>
                  {SPECIES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Porte */}
              <div className="relative">
                <select
                  value={filters.size}
                  onChange={(e) => updateFilter('size', e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                >
                  <option value="">Todos os portes</option>
                  {SIZES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Idade */}
              <div className="relative">
                <select
                  value={filters.age}
                  onChange={(e) => updateFilter('age', e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                >
                  <option value="">Todas as idades</option>
                  {AGES.map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sexo */}
              <div className="relative">
                <select
                  value={filters.sex}
                  onChange={(e) => updateFilter('sex', e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                >
                  <option value="">Todos os sexos</option>
                  {SEXES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Limpar filtros */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Limpar ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Layout toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2.5 rounded-xl transition-colors ${
                  layout === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
                title="Visualização em grade"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2.5 rounded-xl transition-colors ${
                  layout === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
                title="Visualização em lista"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>{filteredPets.length} pets encontrados</span>
            {activeFiltersCount > 0 && (
              <span className="text-gray-400">• {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo</span>
            )}
          </div>
        </div>
      </section>

      {/* Lista de Pets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className={`grid gap-6 ${
            layout === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Nenhum pet encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Tente ajustar seus filtros ou buscar por outro nome para encontrar mais resultados.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className={`grid gap-6 ${
                layout === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {visiblePets.map((pet, index) => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  index={index}
                  layout={layout}
                />
              ))}
            </motion.div>

            {/* Load more / Infinite scroll trigger */}
            {hasMore && (
              <div 
                ref={loadMoreRef} 
                className="mt-12 flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Carregar mais pets
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mostrando {visiblePets.length} de {filteredPets.length} pets
                </p>
              </div>
            )}
            
            {/* Mostrar quando todos os pets foram carregados */}
            {!hasMore && filteredPets.length > 12 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Você viu todos os {filteredPets.length} pets! 🐾
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}