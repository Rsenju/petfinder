import { useState } from 'react';
import { Search, Filter, Dog } from 'lucide-react';
import PetCard from '../components/features/PetCard';

const mockDogs = [
  {
    id: 1,
    name: "Thor",
    breed: "Golden Retriever",
    age: "2 anos",
    location: "Salvador, BA",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    tags: ["Brincalhão", "Castrado", "Vacinado"],
    size: "Grande"
  },
  {
    id: 2,
    name: "Luna",
    breed: "Vira-lata",
    age: "1 ano",
    location: "Lauro de Freitas, BA",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    tags: ["Dócil", "Castrada", "Vacinada"],
    size: "Médio"
  },
  {
    id: 3,
    name: "Max",
    breed: "Pastor Alemão",
    age: "3 anos",
    location: "Salvador, BA",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400",
    tags: ["Protetor", "Castrado", "Vacinado"],
    size: "Grande"
  }
];

export default function Caes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('Todos');

  const filteredDogs = mockDogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize === 'Todos' || dog.size === selectedSize;
    return matchesSearch && matchesSize;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
          <Dog className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Cachorros para Adoção
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Encontre seu melhor amigo. Temos diversos cães esperando por um lar amoroso.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="Todos">Todos os portes</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDogs.map(dog => (
          <PetCard key={dog.id} pet={dog} />
        ))}
      </div>

      {filteredDogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">Nenhum cachorro encontrado com esses filtros.</p>
        </div>
      )}
    </div>
  );
}