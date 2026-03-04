import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Shield, PawPrint } from 'lucide-react';
import PetCard from '../components/features/PetCard';  // ← CORRIGIDO

// ... resto do código igual
// Dados mockados - depois virão da API
const featuredPets = [
  {
    id: 1,
    name: 'Luna',
    age: '2 anos',
    breed: 'Vira-lata',
    location: 'Salvador',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60',
    tags: ['Vacinada', 'Castrada'],
  },
  {
    id: 2,
    name: 'Thor',
    age: '1 ano',
    breed: 'Pastor Alemão',
    location: 'Lauro de Freitas',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=60',
    tags: ['Vermifugado'],
  },
  {
    id: 3,
    name: 'Mia',
    age: '3 anos',
    breed: 'Siamês',
    location: 'Salvador',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60',
    tags: ['Vacinada'],
  },
];

const features = [
  {
    icon: MapPin,
    title: 'Encontre ONGs',
    description: 'ONGs de Salvador e Lauro de Freitas cadastradas, prontas para ajudar.',
  },
  {
    icon: PawPrint,
    title: 'Conheça os Pets',
    description: 'Informações completas: idade, vacinas, condições especiais e histórico.',
  },
  {
    icon: Shield,
    title: 'Adote com Segurança',
    description: 'Processo transparente para garantir uma adoção consciente.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Adoção Consciente{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  Começa Aqui
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Encontre cães e gatos disponíveis em Salvador e Lauro de Freitas. 
                Adote, cuide e faça a diferença na vida de um pet.
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white 
                                   focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                   dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none">
                    <option>Salvador</option>
                    <option>Lauro de Freitas</option>
                  </select>
                </div>
                <Link to="/pets" className="btn-primary text-center py-3 px-8">
                  Buscar
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  500+ adoções
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  ONGs verificadas
                </span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop&q=80"
                alt="Cães felizes"
                className="rounded-3xl shadow-2xl animate-float object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">+50</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pets adotados este mês</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Seu portal completo para adoção consciente e cuidados com pets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group hover:-translate-y-1 transition-transform">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pets em Destaque */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Pets Disponíveis
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conheça alguns dos pets esperando por um lar
              </p>
            </div>
            <Link to="/pets" className="hidden sm:block text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Ver todos →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/pets" className="btn-secondary inline-block">
              Ver todos os pets
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                É uma ONG parceira?
              </h2>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Cadastre seus pets gratuitamente e alcance mais famílias dispostas a adotar com responsabilidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cadastro-ong" className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
                  Cadastrar ONG
                </Link>
                <Link to="/sobre" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Saiba mais
                </Link>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
        </div>
      </section>
    </div>
  );
}