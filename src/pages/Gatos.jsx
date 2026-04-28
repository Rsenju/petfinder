import { useState } from 'react';
import { Search, Filter, Cat } from 'lucide-react';
import PetCard from '../components/features/PetCard';

const mockCats = [
  {
    id: 1,
    name: "Mimi",
    breed: "Siamês",
    age: "2 anos",
    location: "Salvador, BA",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
    tags: ["Calma", "Castrada", "Vacinada"],
    size: "Pequeno"
  },
  {
    id: 2,
    name: "Frajola",
    breed: "Vira-lata",
    age: "1 ano",
    location: "Lauro de Freitas, BA",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400",
    tags: ["Brincalhão", "Castrado", "Vacinado"],
    size: "Pequeno"
  },
  {
    id: 3,
    name: "Luna",
    breed: "Persa",
    age: "3 anos",
    location: "Salvador, BA",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    tags: ["Dócil", "Castrada", "Vacinada"],
    size: "Pequeno"
  }
];

export default function Gatos() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCats = mockCats.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-4">
          <Cat className="w-8 h-8 text-pink-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Gatos para Adoção
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Adote um gatinho e ganhe um companheiro para a vida toda.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCats.map(cat => (
          <PetCard key={cat.id} pet={cat} />
        ))}
      </div>

      {filteredCats.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">Nenhum gato encontrado.</p>
        </div>
      )}
    </div>
  );
}