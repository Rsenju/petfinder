import { useState } from 'react';
import { MapPin, Phone, Clock, Star, Search } from 'lucide-react';

const petshops = [
  {
    id: 1,
    name: "Pet Feliz",
    city: "Salvador",
    neighborhood: "Barra",
    address: "Av. Oceânica, 123",
    phone: "(71) 99999-1111",
    services: ["Banho", "Tosa", "Veterinário", "Hotel"],
    rating: 4.8,
    hours: "08:00 - 19:00",
    image: "https://images.unsplash.com/photo-1628009368231-7603352989c3?w=400"
  },
  {
    id: 2,
    name: "Amigo Pet",
    city: "Salvador",
    neighborhood: "Itaigara",
    address: "Rua das Flores, 456",
    phone: "(71) 99999-2222",
    services: ["Banho", "Ração", "Acessórios", "Tosa"],
    rating: 4.5,
    hours: "09:00 - 20:00",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"
  },
  {
    id: 3,
    name: "Pet Care Premium",
    city: "Lauro de Freitas",
    neighborhood: "Centro",
    address: "Av. Santos Dumont, 789",
    phone: "(71) 99999-3333",
    services: ["Veterinário 24h", "Banho", "Tosa", "Hotel", "Creche"],
    rating: 4.9,
    hours: "24 horas",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
  },
  {
    id: 4,
    name: "Mundo Animal",
    city: "Salvador",
    neighborhood: "Pituba",
    address: "Av. Paulo VI, 321",
    phone: "(71) 99999-4444",
    services: ["Ração", "Acessórios", "Medicamentos", "Banho"],
    rating: 4.3,
    hours: "08:30 - 21:00",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400"
  },
  {
    id: 5,
    name: "Petz Salvador",
    city: "Salvador",
    neighborhood: "Shopping da Bahia",
    address: "Av. Tancredo Neves, 1000",
    phone: "(71) 99999-5555",
    services: ["Banho", "Tosa", "Veterinário", "Ração", "Acessórios"],
    rating: 4.6,
    hours: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400"
  },
  {
    id: 6,
    name: "Cobasi Lauro",
    city: "Lauro de Freitas",
    neighborhood: "Vilas do Atlântico",
    address: "Estrada do Coco, 1500",
    phone: "(71) 99999-6666",
    services: ["Ração", "Acessórios", "Banho", "Tosa", "Veterinário"],
    rating: 4.4,
    hours: "09:00 - 21:00",
    image: "https://images.unsplash.com/photo-1597843786411-a7fa8ad49a95?w=400"
  }
];

const allServices = ["Todos", "Banho", "Tosa", "Veterinário", "Hotel", "Ração", "Acessórios", "Creche"];

export default function PetShops() {
  const [selectedService, setSelectedService] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPetshops = petshops.filter(shop => {
    const matchesService = selectedService === "Todos" || shop.services.includes(selectedService);
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Pet Shops Parceiros
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Encontre os melhores pet shops em Salvador e Lauro de Freitas
        </p>
      </div>

      {/* Busca */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, cidade ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filtros de serviço */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {allServices.map(service => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedService === service
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Grid de pet shops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPetshops.map(shop => (
          <div 
            key={shop.id}
            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={shop.image} 
                alt={shop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-slate-900/90 px-2 py-1 rounded-lg flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold">{shop.rating}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {shop.name}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{shop.neighborhood}, {shop.city} - BA</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {shop.services.map(service => (
                  <span 
                    key={service}
                    className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md"
                  >
                    {service}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>{shop.hours}</span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{shop.phone}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Ver perfil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPetshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">Nenhum pet shop encontrado com esses filtros.</p>
        </div>
      )}
    </div>
  );
}