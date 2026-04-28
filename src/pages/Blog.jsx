import { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  HeartPulse, 
  AlertTriangle, 
  Stethoscope, 
  Bandage, 
  Sparkles, 
  Shield, 
  Cat, 
  Dog, 
  Bone, 
  Trash2,
  Scissors,
  Utensils,
  HelpCircle
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Dicas para uma boa adoção",
    excerpt: "Prepare sua casa e sua rotina para receber um novo amigo de quatro patas.",
    icon: BookOpen,
    category: "Adoção",
    color: "bg-blue-500/20 text-blue-300"
  },
  {
    id: 2,
    title: "Calculadora de ração",
    excerpt: "Descubra quanto de ração seu pet precisa de acordo com peso e porte.",
    icon: Calculator,
    category: "Alimentação",
    color: "bg-green-500/20 text-green-300"
  },
  {
    id: 3,
    title: "Doenças comuns em pets",
    excerpt: "Como evitar, tratar e quando procurar ajuda veterinária.",
    icon: HeartPulse,
    category: "Saúde",
    color: "bg-red-500/20 text-red-300"
  },
  {
    id: 4,
    title: "Alimentos e plantas tóxicas",
    excerpt: "O que você pode e não pode dar ao seu pet. Lista completa de toxicidades.",
    icon: AlertTriangle,
    category: "Segurança",
    color: "bg-orange-500/20 text-orange-300"
  },
  {
    id: 5,
    title: "Primeira ida ao veterinário",
    excerpt: "Quais perguntas fazer e como preparar seu pet para a consulta.",
    icon: Stethoscope,
    category: "Saúde",
    color: "bg-emerald-500/20 text-emerald-300"
  },
  {
    id: 6,
    title: "Primeiros socorros para pets",
    excerpt: "O que fazer em emergências antes de chegar ao veterinário.",
    icon: Bandage,
    category: "Emergência",
    color: "bg-rose-500/20 text-rose-300"
  },
  {
    id: 7,
    title: "Planner de organização",
    excerpt: "Como manter a casa limpa no dia a dia com um pet.",
    icon: Sparkles,
    category: "Dicas",
    color: "bg-purple-500/20 text-purple-300"
  },
  {
    id: 8,
    title: "Segurança no lar",
    excerpt: "Como ter um lar seguro para todos, incluindo seu pet.",
    icon: Shield,
    category: "Segurança",
    color: "bg-indigo-500/20 text-indigo-300"
  },
  {
    id: 9,
    title: "Adotei um gato e agora?",
    excerpt: "Dicas de adaptação. Quanto tempo demora? Como facilitar?",
    icon: Cat,
    category: "Adoção",
    color: "bg-pink-500/20 text-pink-300"
  },
  {
    id: 10,
    title: "Adotei um cão e agora?",
    excerpt: "Adaptação, tapete higiênico e dicas de adestramento.",
    icon: Dog,
    category: "Adoção",
    color: "bg-amber-500/20 text-amber-300"
  },
  {
    id: 11,
    title: "Como escolher a ração correta",
    excerpt: "Guia completo para selecionar a melhor alimentação.",
    icon: Bone,
    category: "Alimentação",
    color: "bg-cyan-500/20 text-cyan-300"
  },
  {
    id: 12,
    title: "Qual areia escolher?",
    excerpt: "Tipos de areia, vantagens e desvantagens de cada uma.",
    icon: Trash2,
    category: "Dicas",
    color: "bg-gray-500/20 text-gray-300"
  },
  {
    id: 13,
    title: "DIY: Brinquedos e arranhadores",
    excerpt: "Faça você mesmo casinhas, brinquedos e arranhadores.",
    icon: Scissors,
    category: "DIY",
    color: "bg-teal-500/20 text-teal-300"
  },
  {
    id: 14,
    title: "Qual pet combina comigo?",
    excerpt: "Teste interativo para descobrir seu pet ideal.",
    icon: HelpCircle,
    category: "Interativo",
    color: "bg-violet-500/20 text-violet-300"
  },
  {
    id: 15,
    title: "Receitas naturais",
    excerpt: "Comidas caseiras saudáveis para seu pet.",
    icon: Utensils,
    category: "Alimentação",
    color: "bg-lime-500/20 text-lime-300"
  }
];

const categories = ["Todos", "Adoção", "Alimentação", "Saúde", "Segurança", "Dicas", "DIY", "Emergência", "Interativo"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = selectedCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Blog PetFinder
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Dicas, guias e informações para cuidar melhor do seu pet
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => {
          const IconComponent = post.icon;
          return (
            <article 
              key={post.id}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${post.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6" />
              </div>
              
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                {post.category}
              </span>
              
              <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              
              <button className="mt-4 text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Ler mais →
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}