import { faker } from '@faker-js/faker/locale/pt_BR';

export const featuredPets = [
  {
    id: 'pet_001',
    name: 'Luna',
    age: '2 anos',
    breed: 'Vira-lata',
    location: 'Salvador - Pituba',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60',
    tags: ['Vacinada', 'Castrada', 'Dócil'],
    status: 'disponivel',
    views: 156,
    favorites: 23,
    ong: 'Amigo Fiel'
  },
  {
    id: 'pet_002',
    name: 'Thor',
    age: '1 ano',
    breed: 'Pastor Alemão Mix',
    location: 'Lauro de Freitas - Centro',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=60',
    tags: ['Vermifugado', 'Brincalhão'],
    status: 'disponivel',
    views: 89,
    favorites: 15,
    ong: 'Lar dos Peludos'
  },
  {
    id: 'pet_003',
    name: 'Mia',
    age: '3 anos',
    breed: 'Siamês',
    location: 'Salvador - Barra',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60',
    tags: ['Vacinada', 'Calma'],
    status: 'disponivel',
    views: 201,
    favorites: 34,
    ong: 'Gatil da Barra'
  },
  {
    id: 'pet_004',
    name: 'Max',
    age: '6 meses',
    breed: 'Golden Retriever',
    location: 'Salvador - Itaigara',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&auto=format&fit=crop&q=60',
    tags: ['Filhote', 'Vacinado'],
    status: 'disponivel',
    views: 312,
    favorites: 67,
    ong: 'Amigo Fiel'
  },
  {
    id: 'pet_005',
    name: 'Nina',
    age: '4 anos',
    breed: 'SRD (Sem Raça Definida)',
    location: 'Lauro de Freitas - Ipitanga',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop&q=60',
    tags: ['Castrada', 'Cuidados especiais'],
    status: 'disponivel',
    views: 78,
    favorites: 12,
    ong: 'Vida Animal'
  },
  {
    id: 'pet_006',
    name: 'Simba',
    age: '2 anos',
    breed: 'Maine Coon Mix',
    location: 'Salvador - Rio Vermelho',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop&q=60',
    tags: ['Vacinado', 'Sociável'],
    status: 'disponivel',
    views: 145,
    favorites: 28,
    ong: 'Gatil da Barra'
  }
];

export const stats = {
  adoptionsThisMonth: 47,
  totalPets: 156,
  registeredOngs: 12,
  successRate: '94%'
};


export const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Adotante",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Adotei meu gatinho Luna através do PetFinder. O processo foi super tranquilo e a ONG me deu todo suporte!",
    pet: "Luna (Gata)"
  },
  {
    id: 2,
    name: "João Santos",
    role: "Voluntário",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Como voluntário em uma ONG parceira, vejo diariamente o impacto que a plataforma tem na vida dos animais.",
    pet: null
  },
  {
    id: 3,
    name: "Ana Paula",
    role: "Adotante",
    image: "https://i.pravatar.cc/150?img=5",
    text: "Meu cachorro Thor mudou minha vida. Encontrei ele aqui e foi amor à primeira vista. Super recomendo!",
    pet: "Thor (Cachorro)"
  },
  {
    id: 4,
    name: "Carlos Mendes",
    role: "Doador",
    image: "https://i.pravatar.cc/150?img=8",
    text: "Faço doações mensais para ONGs cadastradas. A transparência do PetFinder me dá segurança para ajudar.",
    pet: null
  },
  {
    id: 5,
    name: "Fernanda Lima",
    role: "Adotante",
    image: "https://i.pravatar.cc/150?img=9",
    text: "Processo rápido e seguro. Em uma semana já estava com meu novo melhor amigo em casa!",
    pet: "Max (Cachorro)"
  },
  {
    id: 6,
    name: "Roberto Almeida",
    role: "ONG Parceira",
    image: "https://i.pravatar.cc/150?img=11",
    text: "A plataforma aumentou em 300% nossas adoções. É uma ferramenta essencial para qualquer ONG.",
    pet: null
  }
];

export const features = [
  {
    icon: 'MapPin',
    title: 'Encontre ONGs',
    description: 'ONGs de Salvador e Lauro de Freitas cadastradas, prontas para ajudar.',
    color: 'blue'
  },
  {
    icon: 'Heart',
    title: 'Conheça os Pets',
    description: 'Informações completas: idade, vacinas, condições especiais e histórico.',
    color: 'rose'
  },
  {
    icon: 'Shield',
    title: 'Adote com Segurança',
    description: 'Processo transparente para garantir uma adoção consciente.',
    color: 'green'
  }
];