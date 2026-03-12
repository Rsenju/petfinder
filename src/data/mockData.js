// ==================== PETS ====================
export const allPets = [
  // Cachorros
  {
    id: 'pet_001',
    name: 'Thor',
    species: 'dog',
    breed: 'Golden Retriever',
    age: '2 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Thor é um cachorro super carinhoso e brincalhão. Adora crianças e outros animais.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Brincalhão', 'Carinhoso', 'Castrado'],
    views: 245,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'pet_002',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamês',
    age: '1 ano',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Luna é uma gatinha calma e amorosa. Perfeita para apartamentos.',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Calma', 'Apartamento', 'Vacinada'],
    views: 189,
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'pet_003',
    name: 'Max',
    species: 'dog',
    breed: 'Vira-lata',
    age: '3 anos',
    ageType: 'adulto',
    size: 'médio',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Max é muito leal e protetor. Ideal para casas com quintal.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Leal', 'Protetor', 'Brincalhão'],
    views: 156,
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 'pet_004',
    name: 'Mia',
    species: 'cat',
    breed: 'Persa',
    age: '4 anos',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Mia é uma gatinha elegante e tranquila. Adora colo.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Tranquila', 'Colo', 'Elegante'],
    views: 312,
    createdAt: '2024-02-10T16:00:00Z'
  },
  {
    id: 'pet_005',
    name: 'Bob',
    species: 'dog',
    breed: 'Bulldog Francês',
    age: '2 anos',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'macho',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Bob é cheio de energia e adora brincar. Ótimo para apartamentos.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Energético', 'Apartamento', 'Sociável'],
    views: 178,
    createdAt: '2024-02-15T11:00:00Z'
  },
  {
    id: 'pet_006',
    name: 'Nina',
    species: 'cat',
    breed: 'Maine Coon',
    age: '3 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Nina é uma gata majestosa e independente. Adora ambientes espaçosos.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Majestosa', 'Independente', 'Espaçosa'],
    views: 234,
    createdAt: '2024-02-20T13:00:00Z'
  },
  {
    id: 'pet_007',
    name: 'Toby',
    species: 'dog',
    breed: 'Beagle',
    age: '1 ano',
    ageType: 'filhote',
    size: 'médio',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Toby é um filhote cheio de curiosidade. Precisa de paciência e treinamento.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Filhote', 'Curioso', 'Em treinamento'],
    views: 445,
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'pet_008',
    name: 'Mel',
    species: 'cat',
    breed: 'Angorá',
    age: '5 anos',
    ageType: 'adulto',
    size: 'médio',
    sex: 'fêmea',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Mel é uma gata carinhosa que adora brincar com bolinhas de lã.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Carinhosa', 'Brincalhona', 'Peluda'],
    views: 198,
    createdAt: '2024-03-05T14:00:00Z'
  },
  {
    id: 'pet_009',
    name: 'Rex',
    species: 'dog',
    breed: 'Pastor Alemão',
    age: '4 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Rex é muito inteligente e obediente. Ótimo para guarda e companhia.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Inteligente', 'Obediente', 'Guarda'],
    views: 367,
    createdAt: '2024-03-10T09:30:00Z'
  },
  {
    id: 'pet_010',
    name: 'Chanel',
    species: 'cat',
    breed: 'Sphynx',
    age: '2 anos',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Chanel é uma gata sem pelos super carinhosa. Precisa de cuidados especiais com a pele.',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Sem pelos', 'Carinhosa', 'Cuidados especiais'],
    views: 289,
    createdAt: '2024-03-12T11:00:00Z'
  },
  {
    id: 'pet_011',
    name: 'Duke',
    species: 'dog',
    breed: 'Labrador',
    age: '6 meses',
    ageType: 'filhote',
    size: 'grande',
    sex: 'macho',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Duke é um filhote de labrador muito brincalhão. Adora água!',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Filhote', 'Brincalhão', 'Adora água'],
    views: 523,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'pet_012',
    name: 'Princesa',
    species: 'cat',
    breed: 'Ragdoll',
    age: '3 anos',
    ageType: 'adulto',
    size: 'médio',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Princesa é uma gata super relaxada que adora ser carregada.',
    image: 'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Relaxada', 'Carinhosa', 'Docil'],
    views: 334,
    createdAt: '2024-03-18T15:00:00Z'
  },
  // Pets idosos
  {
    id: 'pet_013',
    name: 'Fred',
    species: 'dog',
    breed: 'Poodle',
    age: '10 anos',
    ageType: 'idoso',
    size: 'pequeno',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Fred é um senhorzinho tranquilo que busca um lar calmo para seus últimos anos.',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Idoso', 'Tranquilo', 'Calmo'],
    views: 145,
    createdAt: '2024-03-20T09:00:00Z'
  },
  {
    id: 'pet_014',
    name: 'Bela',
    species: 'cat',
    breed: 'Vira-lata',
    age: '8 anos',
    ageType: 'idoso',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Bela é uma gatinha idosa muito meiga. Adora dormir ao sol.',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Idosa', 'Meiga', 'Dorminhoca'],
    views: 167,
    createdAt: '2024-03-22T14:00:00Z'
  },
  // Mais variedade
  {
    id: 'pet_015',
    name: 'Spike',
    species: 'dog',
    breed: 'Pitbull',
    age: '3 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Spike é um cachorro forte mas muito gentil. Ótimo com crianças.',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Forte', 'Gentil', 'Protetor'],
    views: 298,
    createdAt: '2024-03-25T11:00:00Z'
  },
  {
    id: 'pet_016',
    name: 'Lola',
    species: 'cat',
    breed: 'Bengal',
    age: '2 anos',
    ageType: 'adulto',
    size: 'médio',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Lola é uma gata ativa e brincalhona. Precisa de espaço para correr.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Ativa', 'Brincalhona', 'Ágil'],
    views: 276,
    createdAt: '2024-03-28T10:00:00Z'
  },
  {
    id: 'pet_017',
    name: 'Teddy',
    species: 'dog',
    breed: 'Shih Tzu',
    age: '4 anos',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'macho',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Teddy é um companheiro fiel. Adora passeios curtos e colo.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Fiel', 'Companheiro', 'Carinhoso'],
    views: 389,
    createdAt: '2024-04-01T09:00:00Z'
  },
  {
    id: 'pet_018',
    name: 'Mimi',
    species: 'cat',
    breed: 'Scottish Fold',
    age: '1 ano',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Mimi é uma gatinha com orelhinhas dobradas. Super fotogênica!',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Fotogênica', 'Dócil', 'Especial'],
    views: 412,
    createdAt: '2024-04-05T13:00:00Z'
  },
  {
    id: 'pet_019',
    name: 'Zeus',
    species: 'dog',
    breed: 'Rottweiler',
    age: '5 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Zeus é um cão de guarda excelente. Muito leal à família.',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Guarda', 'Leal', 'Protetor'],
    views: 267,
    createdAt: '2024-04-08T11:00:00Z'
  },
  {
    id: 'pet_020',
    name: 'Nina',
    species: 'cat',
    breed: 'Vira-lata',
    age: '6 meses',
    ageType: 'filhote',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Nina é uma filhote muito curiosa. Está aprendendo a usar a caixinha.',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Filhote', 'Curiosa', 'Em aprendizado'],
    views: 356,
    createdAt: '2024-04-10T10:00:00Z'
  },
  {
    id: 'pet_021',
    name: 'Thor',
    species: 'dog',
    breed: 'Husky Siberiano',
    age: '3 anos',
    ageType: 'adulto',
    size: 'grande',
    sex: 'macho',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Thor precisa de espaço e exercício. Adora correr!',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&auto=format&fit=crop&q=80',
    ong: 'Cão Sem Dono',
    status: 'available',
    tags: ['Energético', 'Corredor', 'Espaçoso'],
    views: 423,
    createdAt: '2024-04-12T09:00:00Z'
  },
  {
    id: 'pet_022',
    name: 'Luna',
    species: 'cat',
    breed: 'Abissínio',
    age: '2 anos',
    ageType: 'adulto',
    size: 'pequeno',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Luna é uma gata ativa e inteligente. Adora brincadeiras interativas.',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Inteligente', 'Ativa', 'Brincalhona'],
    views: 289,
    createdAt: '2024-04-15T14:00:00Z'
  },
  {
    id: 'pet_023',
    name: 'Bobby',
    species: 'dog',
    breed: 'Cocker Spaniel',
    age: '7 anos',
    ageType: 'idoso',
    size: 'médio',
    sex: 'macho',
    city: 'Lauro de Freitas',
    location: 'Lauro de Freitas, BA',
    description: 'Bobby é um cachorro maduro e tranquilo. Ótimo companheiro para idosos.',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&auto=format&fit=crop&q=80',
    ong: 'Amigo de Patas',
    status: 'available',
    tags: ['Idoso', 'Tranquilo', 'Companheiro'],
    views: 198,
    createdAt: '2024-04-18T10:00:00Z'
  },
  {
    id: 'pet_024',
    name: 'Mia',
    species: 'cat',
    breed: 'British Shorthair',
    age: '4 anos',
    ageType: 'adulto',
    size: 'médio',
    sex: 'fêmea',
    city: 'Salvador',
    location: 'Salvador, BA',
    description: 'Mia é uma gata britânica super calma. Perfeita para apartamento.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop&q=80',
    ong: 'Gatíneos do Bem',
    status: 'available',
    tags: ['Calma', 'Apartamento', 'Independente'],
    views: 334,
    createdAt: '2024-04-20T11:00:00Z'
  }
];

// Manter featuredPets para a Home
export const featuredPets = allPets.slice(0, 6);

// ==================== ONGs ====================
export const ongs = [
  {
    id: 'ong_001',
    name: 'Amigo de Patas',
    description: 'ONG dedicada ao resgate e adoção de cães e gatos em situação de vulnerabilidade.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop&q=80',
    city: 'Salvador',
    address: 'Rua das Flores, 123 - Pituba',
    phone: '(71) 99999-1111',
    email: 'contato@amigodepatas.org',
    website: 'www.amigodepatas.org',
    petsCount: 45,
    adoptionsCount: 230,
    createdAt: '2020-03-15'
  },
  {
    id: 'ong_002',
    name: 'Gatíneos do Bem',
    description: 'Especializada em gatos, oferecemos abrigo, castração e adoção responsável.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
    city: 'Salvador',
    address: 'Av. das Acácias, 456 - Barra',
    phone: '(71) 99999-2222',
    email: 'gatinhos@ong.org',
    website: 'www.gatineosdobem.org',
    petsCount: 32,
    adoptionsCount: 180,
    createdAt: '2019-07-20'
  },
  {
    id: 'ong_003',
    name: 'Cão Sem Dono',
    description: 'Resgatamos cães abandonados e preparamos para uma nova família.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=80',
    city: 'Lauro de Freitas',
    address: 'Rua do Sol, 789 - Centro',
    phone: '(71) 99999-3333',
    email: 'caosemdono@ong.org',
    website: 'www.caosemdono.org',
    petsCount: 28,
    adoptionsCount: 156,
    createdAt: '2021-01-10'
  },
  {
    id: 'ong_004',
    name: 'Patitas Felices',
    description: 'Trabalhamos com animais de todas as espécies, focando em educação e adoção.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80',
    city: 'Salvador',
    address: 'Rua das Palmeiras, 321 - Itaigara',
    phone: '(71) 99999-4444',
    email: 'patitas@ong.org',
    website: 'www.patitasfelices.org',
    petsCount: 38,
    adoptionsCount: 195,
    createdAt: '2018-11-05'
  },
  {
    id: 'ong_005',
    name: 'Lar dos Peludos',
    description: 'Abrigo para animais idosos e com necessidades especiais.',
    image: 'https://images.unsplash.com/photo-1601758124096-1fd661873b95?w=400&auto=format&fit=crop&q=80',
    city: 'Lauro de Freitas',
    address: 'Av. Principal, 555 - Vilas do Atlântico',
    phone: '(71) 99999-5555',
    email: 'lardospeludos@ong.org',
    website: 'www.lardospeludos.org',
    petsCount: 22,
    adoptionsCount: 89,
    createdAt: '2022-05-15'
  },
  {
    id: 'ong_006',
    name: 'Anjos de Patas',
    description: 'Rede de voluntários dedicados ao resgate e adoção de animais abandonados.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=400&auto=format&fit=crop&q=80',
    city: 'Salvador',
    address: 'Rua das Mangueiras, 888 - Rio Vermelho',
    phone: '(71) 99999-6666',
    email: 'anjos@ong.org',
    website: 'www.anjosdepatas.org',
    petsCount: 55,
    adoptionsCount: 310,
    createdAt: '2017-09-20'
  }
];

// ==================== FILTROS ====================
export const CITIES = ['Salvador', 'Lauro de Freitas'];

export const SPECIES = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' }
];

export const SIZES = [
  { value: 'pequeno', label: 'Pequeno' },
  { value: 'médio', label: 'Médio' },
  { value: 'grande', label: 'Grande' }
];

export const AGES = [
  { value: 'filhote', label: 'Filhote' },
  { value: 'adulto', label: 'Adulto' },
  { value: 'idoso', label: 'Idoso' }
];

export const SEXES = [
  { value: 'macho', label: 'Macho' },
  { value: 'fêmea', label: 'Fêmea' }
];

// ==================== ESTATÍSTICAS ====================
export const stats = {
  totalPets: allPets.length,
  registeredOngs: ongs.length,
  adoptionsThisMonth: 45,
  successRate: '98%'
};

// ==================== DEPOIMENTOS ====================
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

// ==================== FEATURES ====================
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

// ==================== BLOG / CUIDADOS ====================
export const blogPosts = [
  {
    id: 1,
    title: 'Como preparar sua casa para um novo pet',
    excerpt: 'Dicas essenciais para receber um cachorro ou gato em seu lar.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop&q=80',
    category: 'Cuidados',
    date: '2024-03-15',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Vacinas essenciais para cães e gatos',
    excerpt: 'Saiba quais vacinas são obrigatórias e quando aplicar.',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&auto=format&fit=crop&q=80',
    category: 'Saúde',
    date: '2024-03-10',
    readTime: '7 min'
  },
  {
    id: 3,
    title: 'Alimentação adequada para pets idosos',
    excerpt: 'Cuidados especiais com a dieta de animais na terceira idade.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop&q=80',
    category: 'Nutrição',
    date: '2024-03-05',
    readTime: '6 min'
  },
  {
    id: 4,
    title: 'Como socializar um gato resgatado',
    excerpt: 'Passo a passo para ganhar a confiança de um gato de rua.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
    category: 'Comportamento',
    date: '2024-02-28',
    readTime: '8 min'
  }
];

// ==================== SERVIÇOS ====================
export const services = [
  {
    id: 1,
    name: 'VetCare Salvador',
    type: 'Clínica Veterinária',
    address: 'Av. Tancredo Neves, 1234',
    phone: '(71) 99999-7777',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&auto=format&fit=crop&q=80',
    services: ['Consultas', 'Vacinas', 'Cirurgias', 'Emergência 24h']
  },
  {
    id: 2,
    name: 'PetShop Amigo Fiel',
    type: 'Pet Shop',
    address: 'Rua das Hortênsias, 567',
    phone: '(71) 99999-8888',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
    services: ['Banho e Tosa', 'Rações', 'Acessórios', 'Hospedagem']
  },
  {
    id: 3,
    name: 'Clínica Animalia',
    type: 'Clínica Veterinária',
    address: 'Av. ACM, 9012',
    phone: '(71) 99999-9999',
    image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=400&auto=format&fit=crop&q=80',
    services: ['Consultas', 'Exames', 'Ultrassom', 'Castração']
  }
];