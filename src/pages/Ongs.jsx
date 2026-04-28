import { useState } from 'react';
import { Search, MapPin, Filter, Building2, Phone, Mail, Globe, CheckCircle } from 'lucide-react';

const mockOngs = [
  {
    id: 1,
    name: "ONG Kilback - Schuster",
    city: "Salvador",
    state: "BA",
    neighborhood: "Johannaland",
    verified: true,
    phone: "(71) 99999-1111",
    email: "contato@kilback.org",
    website: "www.kilback.org",
    description: "Especializada em resgate e adoção de cães e gatos em situação de vulnerabilidade.",
    petsCount: 24,
    image: "https://images.unsplash.com/photo-1601758124096-1fd661873b95?w=400"
  },
  {
    id: 2,
    name: "Amigo Animal",
    city: "Lauro de Freitas",
    state: "BA",
    neighborhood: "Centro",
    verified: true,
    phone: "(71) 99999-2222",
    email: "contato@amigoanimal.org",
    description: "Trabalhamos com castração gratuita e adoção responsável há mais de 10 anos.",
    petsCount: 18,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400"
  },
  {
    id: 3,
    name: "Lar dos Peludos",
    city: "Salvador",
    state: "BA",
    neighborhood: "Pituba",
    verified: false,
    phone: "(71) 99999-3333",
    email: "lar@peludos.org",
    description: "Abrigo temporário para pets abandonados. Adoção e apadrinhamento.",
    petsCount: 32,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400"
  }
];

const cities = ["Todas", "Salvador", "Lauro de Freitas"];

export default function Ongs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [showFilters, setShowFilters] = useState(false);

  const filteredOngs = mockOngs.filter(ong => {
    const matchesSearch = ong.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ong.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Todas' || ong.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-emerald-400 mb-4">
          <Building2 className="w-4 h-4" />
          <span className="uppercase tracking-wider">Encontre ONGs confiáveis</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">ONGs de adoção parceiras</h1>
            <p className="text-slate-400 max-w-2xl">
              Explore ONGs especializadas em adoção responsável. Use os filtros para encontrar organizações na sua cidade ou próximas de você.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800 px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>{filteredOngs.length} ONGs encontradas</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por cidade ou bairro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              <Search className="w-5 h-5" />
              Buscar
            </button>
          </div>

          {/* Filtros */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            
            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Cidade</label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lista de ONGs */}
        {filteredOngs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOngs.map(ong => (
              <div 
                key={ong.id}
                className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl group"
              >
                {/* Imagem */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={ong.image} 
                    alt={ong.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{ong.name}</h3>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <MapPin className="w-4 h-4" />
                      {ong.neighborhood}, {ong.city} - {ong.state}
                    </div>
                  </div>
                  {ong.verified && (
                    <div className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-300 font-medium">Verificada</span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {ong.description}
                  </p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      {ong.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {ong.email}
                    </div>
                    {ong.website && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Globe className="w-4 h-4 text-slate-500" />
                        {ong.website}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-slate-400 text-sm">
                      <span className="text-white font-bold">{ong.petsCount}</span> pets disponíveis
                    </span>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700">
            <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma ONG encontrada com esses filtros</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Tente remover alguns filtros ou buscar por outra cidade. Novas ONGs podem ser adicionadas ao sistema em breve.
            </p>
          </div>
        )}

        {/* Map placeholder */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
          <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Mapa será carregado assim que houver ONGs.</p>
        </div>
      </div>
    </div>
  );
}