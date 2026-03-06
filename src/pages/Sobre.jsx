import React from 'react';
import { Heart, Users, Home, Shield, Target, Globe } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

const values = [
  {
    icon: Heart,
    title: 'Amor aos Animais',
    description: 'Todo pet merece uma segunda chance e um lar cheio de amor.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description: 'Conectamos pessoas e ONGs para fazer a diferença juntos.',
  },
  {
    icon: Home,
    title: 'Lar para Todos',
    description: 'Trabalhamos para que nenhum pet fique sem abrigo.',
  },
  {
    icon: Shield,
    title: 'Transparência',
    description: 'Processos claros e seguros para adoção responsável.',
  },
  {
    icon: Target,
    title: 'Foco em Resultados',
    description: 'Métricas reais de adoções e vidas transformadas.',
  },
  {
    icon: Globe,
    title: 'Alcance Nacional',
    description: 'Presente em todo o Brasil, conectando ONGs de todos os estados.',
  },
];

const stats = [
  { number: '10.000+', label: 'Pets Adotados' },
  { number: '500+', label: 'ONGs Parceiras' },
  { number: '50.000+', label: 'Usuários Ativos' },
  { number: '100+', label: 'Cidades Atendidas' },
];

export function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre o PetFinder
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Somos a ponte entre quem quer adotar e quem precisa de um lar. 
            Nossa missão é transformar vidas, uma adoção de cada vez.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nossa Missão
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                O PetFinder nasceu da vontade de simplificar o processo de adoção 
                no Brasil. Vimos que muitas ONGs incríveis faziam um trabalho 
                maravilhoso, mas tinham dificuldade em alcançar adotantes.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Criamos uma plataforma que conecta essas ONGs a pessoas que 
                querem adotar, tornando o processo mais simples, seguro e 
                transparente.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Acreditamos que a tecnologia pode ser uma ferramenta poderosa 
                para o bem, e usamos isso para ajudar pets a encontrarem 
                famílias amorosas.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-8 flex items-center justify-center">
              <Heart className="w-32 h-32 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} hover>
                  <CardBody className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {value.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team/Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quer fazer parte?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Seja como ONG parceira, voluntário ou adotante, há sempre uma 
            forma de ajudar. Entre em contato conosco!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/cadastro-ong"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Cadastrar minha ONG
            </a>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Falar conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobre;