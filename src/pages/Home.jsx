import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, Heart, Shield, PawPrint, ChevronDown, Star } from 'lucide-react';
import { featuredPets, stats, testimonials, features } from '../data/mockData';
import PetCard from '../components/features/PetCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import TestimonialsSlider from '../components/features/TestimonialsSlider';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const { scrollY } = useScroll();
  
  // Parallax effect para o hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    // Simula loading de dados
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* SEO Meta Tags (simulado - usar react-helmet na produção) */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            style={{ y: heroY }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: heroY }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div className="text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Mais de {stats.adoptionsThisMonth} adoções este mês
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                Adoção Consciente{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Começa Aqui
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0"
              >
                Encontre cães e gatos disponíveis em Salvador e Lauro de Freitas. 
                Adote com segurança e transforme uma vida.
              </motion.p>

              {/* Busca */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
              >
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Todas as cidades</option>
                    <option value="salvador">Salvador</option>
                    <option value="lauro">Lauro de Freitas</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <Link 
                  to="/pets" 
                  className="btn-primary text-center py-4 px-8 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Buscar pets
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-8 pt-4"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPets}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pets disponíveis</p>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.registeredOngs}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ONGs parceiras</p>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.successRate}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de sucesso</p>
                </div>
              </motion.div>
            </div>

            {/* Imagem Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop&q=80"
                  alt="Cães felizes"
                  className="rounded-3xl shadow-2xl object-cover h-[600px] w-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Floating card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Heart className="w-7 h-7 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">+500</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Adoções realizadas</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="Usuário"
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 dark:text-white">Adotantes felizes</p>
                      <p className="text-gray-500 dark:text-gray-400">Junte-se a nós</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Como Funciona
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Seu portal completo para adoção consciente e cuidados com pets
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="card p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {feature.icon === 'MapPin' && <MapPin className={`w-10 h-10 text-${feature.color}-600 dark:text-${feature.color}-400`} />}
                    {feature.icon === 'Heart' && <Heart className={`w-10 h-10 text-${feature.color}-600 dark:text-${feature.color}-400`} />}
                    {feature.icon === 'Shield' && <Shield className={`w-10 h-10 text-${feature.color}-600 dark:text-${feature.color}-400`} />}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pets em Destaque */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <div className="text-center md:text-left">
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  Pets Disponíveis
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Conheça alguns dos pets esperando por um lar amoroso
                </p>
              </div>
              <Link 
                to="/pets" 
                className="btn-secondary inline-flex items-center gap-2"
              >
                Ver todos
                <PawPrint className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              featuredPets.map((pet, index) => (
                <PetCard key={pet.id} pet={pet} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Histórias de Amor
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Veja o impacto que a adoção responsável faz na vida das pessoas
              </p>
            </div>
          </ScrollReveal>

          <TestimonialsSlider />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              É uma ONG parceira?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Cadastre seus pets gratuitamente e alcance milhares de famílias dispostas a adotar com responsabilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/cadastro-ong" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Cadastrar ONG
              </Link>
              <Link 
                to="/sobre" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Saiba mais
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}