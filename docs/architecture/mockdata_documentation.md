# 📊 MockData Documentation

> Dados mockados para desenvolvimento e testes do PetFinder

---

## 📋 Feature List

```bash
data/
└── 📊 mockData.js           # Dados fictícios para desenvolvimento
    ├── 🐾 allPets (24 pets)   # Array completo de pets disponíveis
    ├── ⭐ featuredPets (6)    # Subset para destaque na Home
    ├── 🏛️ ongs (6 ongs)       # ONGs parceiras cadastradas
    ├── 🏙️ CITIES              # Cidades atendidas
    ├── 🎚️ SPECIES             # Espécies (Cachorro/Gato)
    ├── 📏 SIZES               # Portes (Pequeno/Médio/Grande)
    ├── 🎂 AGES                # Faixas etárias (Filhote/Adulto/Idoso)
    ├── ⚤ SEXES                # Sexos (Macho/Fêmea)
    ├── 📈 stats               # Estatísticas gerais
    ├── 💬 testimonials (6)    # Depoimentos de usuários
    ├── ✨ features (3)         # Features da plataforma
    ├── 📝 blogPosts (4)       # Posts do blog/cuidados
    └── 🏪 services (3)         # Serviços parceiros (vets/petshops)
```

```bash
Resumo de Implementação
├── allPets          ✅ 24 pets         → Array completo
├── featuredPets     ✅ 6 pets          → Slice dos primeiros
├── ongs             ✅ 6 ongs          → ONGs parceiras
├── Filtros          ✅ 5 arrays        → Opções de filtro
├── stats            ✅ 4 métricas       → Estatísticas
├── testimonials     ✅ 6 depoimentos   → Social proof
├── features         ✅ 3 features      → Value proposition
├── blogPosts        ✅ 4 posts         → Conteúdo
└── services         ✅ 3 serviços      → Parceiros
```

---

## 📢 Broadcast

### Data Structure
```
┌─────────────────────────────────────────────────────────┐
│                   MockData Architecture                 │
├─────────────────────────────────────────────────────────┤
│  allPets: Array[24]                                     │
│  ├── id: pet_001 → pet_024                             │
│  ├── species: dog | cat                                 │
│  ├── status: 'available' (todos)                        │
│  └── location: Salvador, BA | Lauro de Freitas, BA    │
├─────────────────────────────────────────────────────────┤
│  ongs: Array[6]                                         │
│  ├── id: ong_001 → ong_006                             │
│  └── city: Salvador | Lauro de Freitas                 │
├─────────────────────────────────────────────────────────┤
│  Filtros: Arrays de opções                             │
│  └── Usados em FilterSection e selects                 │
└─────────────────────────────────────────────────────────┘
```

### Image Sources
```bash
Imagens (Unsplash)
├── Pets: photos.unsplash.com (dog/cat photos)
├── ONGs: photos.unsplash.com (shelter/pet photos)
├── Avatares: i.pravatar.cc (depoimentos)
└── Blog: photos.unsplash.com (care/health photos)
```

---

## 🗂️ File Structure

```bash
src/data/
└── mockData.js             # Exporta todos os dados mockados
```

---

## 💻 Code Documentation

### `allPets` - Array de Pets (24 items)

**Purpose**: Dados completos de pets para listagem, filtros e páginas de detalhe.

**📡 Schema**:

```bash
Pet Object
├── id: string              # Formato: 'pet_XXX' (001-024)
├── name: string            # Nome do pet
├── species: 'dog' | 'cat'  # Espécie
├── breed: string           # Raça ou 'Vira-lata'
├── age: string             # Idade em anos/meses (ex: '2 anos')
├── ageType: string         # 'filhote' | 'adulto' | 'idoso'
├── size: string            # 'pequeno' | 'médio' | 'grande'
├── sex: string             # 'macho' | 'fêmea'
├── city: string            # Cidade (Salvador | Lauro de Freitas)
├── location: string        # Cidade + Estado
├── description: string      # Descrição detalhada
├── image: string           # URL Unsplash
├── ong: string             # Nome da ONG responsável
├── status: 'available'      # Status (todos available)
├── tags: string[]          # Array de tags/características
├── views: number           # Contador de visualizações
└── createdAt: ISO string   # Data de cadastro
```

**🐾 Pets Catalogados**:

```bash
allPets (24 total)
├── Cachorros (12)
│   ├── pet_001: Thor (Golden Retriever, 2a)
│   ├── pet_003: Max (Vira-lata, 3a)
│   ├── pet_005: Bob (Bulldog Francês, 2a)
│   ├── pet_007: Toby (Beagle, 1a - filhote)
│   ├── pet_009: Rex (Pastor Alemão, 4a)
│   ├── pet_011: Duke (Labrador, 6m - filhote)
│   ├── pet_013: Fred (Poodle, 10a - idoso)
│   ├── pet_015: Spike (Pitbull, 3a)
│   ├── pet_017: Teddy (Shih Tzu, 4a)
│   ├── pet_019: Zeus (Rottweiler, 5a)
│   ├── pet_021: Thor (Husky, 3a)
│   └── pet_023: Bobby (Cocker Spaniel, 7a - idoso)
│
└── Gatos (12)
    ├── pet_002: Luna (Siamês, 1a)
    ├── pet_004: Mia (Persa, 4a)
    ├── pet_006: Nina (Maine Coon, 3a)
    ├── pet_008: Mel (Angorá, 5a)
    ├── pet_010: Chanel (Sphynx, 2a)
    ├── pet_012: Princesa (Ragdoll, 3a)
    ├── pet_014: Bela (Vira-lata, 8a - idosa)
    ├── pet_016: Lola (Bengal, 2a)
    ├── pet_018: Mimi (Scottish Fold, 1a)
    ├── pet_020: Nina (Vira-lata, 6m - filhote)
    ├── pet_022: Luna (Abissínio, 2a)
    └── pet_024: Mia (British Shorthair, 4a)
```

**📊 Distribuição**:

```bash
Por Espécie
├── Cachorros: 12 (50%)
└── Gatos: 12 (50%)

Por Idade
├── Filhotes: 4 (Toby, Duke, Nina-filhote, Nina-gato)
├── Adultos: 16
└── Idosos: 4 (Fred, Bela, Bobby)

Por Porte
├── Pequeno: 8
├── Médio: 8
└── Grande: 8

Por Cidade
├── Salvador: 18 (75%)
└── Lauro de Freitas: 6 (25%)

Por ONG
├── Amigo de Patas: 8
├── Gatíneos do Bem: 8
└── Cão Sem Dono: 8
```

**💡 Usage Example**:

```javascript
import { allPets, featuredPets } from '../data/mockData';

// Listar todos
const pets = allPets;

// Filtrar
const dogs = allPets.filter(pet => pet.species === 'dog');
const availableInSalvador = allPets.filter(
  pet => pet.city === 'Salvador' && pet.status === 'available'
);

// Buscar por ID
const pet = allPets.find(p => p.id === 'pet_001');

// Destacados na Home (primeiros 6)
const featured = featuredPets; // allPets.slice(0, 6)
```

---

### `ongs` - Array de ONGs (6 items)

**Purpose**: Dados das ONGs parceiras para listagem e perfis.

**📡 Schema**:

```bash
ONG Object
├── id: string              # Formato: 'ong_XXX' (001-006)
├── name: string            # Nome da ONG
├── description: string      # Descrição da missão
├── image: string           # URL Unsplash
├── city: string            # Cidade principal
├── address: string         # Endereço completo
├── phone: string           # Telefone de contato
├── email: string           # Email institucional
├── website: string         # Site (sem http)
├── petsCount: number        # Pets disponíveis
├── adoptionsCount: number  # Total de adoções realizadas
└── createdAt: string       # Data de fundação
```

**🏛️ ONGs Cadastradas**:

```bash
ongs (6 total)
├── ong_001: Amigo de Patas
│   ├── Cidade: Salvador
│   ├── Pets: 45
│   └── Adoções: 230
│
├── ong_002: Gatíneos do Bem
│   ├── Cidade: Salvador
│   ├── Pets: 32
│   └── Adoções: 180
│
├── ong_003: Cão Sem Dono
│   ├── Cidade: Lauro de Freitas
│   ├── Pets: 28
│   └── Adoções: 156
│
├── ong_004: Patitas Felices
│   ├── Cidade: Salvador
│   ├── Pets: 38
│   └── Adoções: 195
│
├── ong_005: Lar dos Peludos
│   ├── Cidade: Lauro de Freitas
│   ├── Pets: 22
│   └── Adoções: 89
│
└── ong_006: Anjos de Patas
    ├── Cidade: Salvador
    ├── Pets: 55
    └── Adoções: 310
```

**💡 Usage Example**:

```javascript
import { ongs } from '../data/mockData';

// Listar ONGs
const allOngs = ongs;

// Estatísticas
const totalPetsFromOngs = ongs.reduce((acc, ong) => acc + ong.petsCount, 0);
const totalAdoptions = ongs.reduce((acc, ong) => acc + ong.adoptionsCount, 0);

// Filtrar por cidade
const ongsInSalvador = ongs.filter(ong => ong.city === 'Salvador');
```

---

### Filtros - Arrays de Opções

**Purpose**: Opções para componentes de filtro e selects.

```bash
CITIES (Array<string>)
├── 'Salvador'
└── 'Lauro de Freitas'

SPECIES (Array<{value, label}>)
├── { value: 'dog', label: 'Cachorro' }
└── { value: 'cat', label: 'Gato' }

SIZES (Array<{value, label}>)
├── { value: 'pequeno', label: 'Pequeno' }
├── { value: 'médio', label: 'Médio' }
└── { value: 'grande', label: 'Grande' }

AGES (Array<{value, label}>)
├── { value: 'filhote', label: 'Filhote' }
├── { value: 'adulto', label: 'Adulto' }
└── { value: 'idoso', label: 'Idoso' }

SEXES (Array<{value, label}>)
├── { value: 'macho', label: 'Macho' }
└── { value: 'fêmea', label: 'Fêmea' }
```

**💡 Usage Example**:

```javascript
import { SPECIES, SIZES, AGES, CITIES } from '../data/mockData';

// Em FilterSection
const availableFilters = [
  { key: 'species', label: 'Espécie', type: 'select', options: SPECIES },
  { key: 'size', label: 'Porte', type: 'select', options: SIZES },
  { key: 'age', label: 'Idade', type: 'select', options: AGES },
];

// Em selects
<select>
  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
</select>
```

---

### `stats` - Estatísticas

**Purpose**: Métricas gerais para exibição em dashboards e Home.

```bash
stats Object
├── totalPets: number         # allPets.length (24)
├── registeredOngs: number    # ongs.length (6)
├── adoptionsThisMonth: 45    # Mock: adições mensais
└── successRate: '98%'         # Mock: taxa de sucesso
```

**💡 Usage Example**:

```javascript
import { stats } from '../data/mockData';

// Exibir estatísticas
<div>
  <StatCard value={stats.totalPets} label="Pets Disponíveis" />
  <StatCard value={stats.registeredOngs} label="ONGs Parceiras" />
  <StatCard value={stats.adoptionsThisMonth} label="Adoções este mês" />
  <StatCard value={stats.successRate} label="Taxa de Sucesso" />
</div>
```

---

### `testimonials` - Depoimentos (6 items)

**Purpose**: Social proof para Home e páginas de conversão.

```bash
Testimonial Object
├── id: number              # 1-6
├── name: string            # Nome da pessoa
├── role: string            # 'Adotante' | 'Voluntário' | 'Doador' | 'ONG Parceira'
├── image: string           # URL avatar (i.pravatar.cc)
├── text: string            # Depoimento
└── pet: string | null      # Nome do pet adotado (opcional)
```

**💬 Depoimentos**:

```bash
testimonials (6 total)
├── 1: Maria Silva (Adotante) - Luna (Gata)
├── 2: João Santos (Voluntário)
├── 3: Ana Paula (Adotante) - Thor (Cachorro)
├── 4: Carlos Mendes (Doador)
├── 5: Fernanda Lima (Adotante) - Max (Cachorro)
└── 6: Roberto Almeida (ONG Parceira)
```

**💡 Usage Example**:

```javascript
import { testimonials } from '../data/mockData';

// Em TestimonialsSlider
<TestimonialsSlider testimonials={testimonials} />
```

---

### `features` - Features da Plataforma (3 items)

**Purpose**: Value proposition para seção de features na Home.

```bash
Feature Object
├── icon: string            # Nome do ícone Lucide
├── title: string           # Título
├── description: string     # Descrição
└── color: string           # Cor temática (blue, rose, green)
```

**✨ Features**:

```bash
features (3 total)
├── 1: Encontre ONGs
│   ├── icon: 'MapPin'
│   └── color: 'blue'
│
├── 2: Conheça os Pets
│   ├── icon: 'Heart'
│   └── color: 'rose'
│
└── 3: Adote com Segurança
    ├── icon: 'Shield'
    └── color: 'green'
```

---

### `blogPosts` - Posts do Blog (4 items)

**Purpose**: Conteúdo para seção de cuidados/blog.

```bash
BlogPost Object
├── id: number
├── title: string
├── excerpt: string
├── image: string           # URL Unsplash
├── category: string        # 'Cuidados' | 'Saúde' | 'Nutrição' | 'Comportamento'
├── date: string            # YYYY-MM-DD
└── readTime: string        # 'X min'
```

**📝 Posts**:

```bash
blogPosts (4 total)
├── 1: Como preparar sua casa para um novo pet
│   └── Categoria: Cuidados
├── 2: Vacinas essenciais para cães e gatos
│   └── Categoria: Saúde
├── 3: Alimentação adequada para pets idosos
│   └── Categoria: Nutrição
└── 4: Como socializar um gato resgatado
    └── Categoria: Comportamento
```

---

### `services` - Serviços Parceiros (3 items)

**Purpose**: Serviços locais para recomendação aos adotantes.

```bash
Service Object
├── id: number
├── name: string            # Nome do estabelecimento
├── type: string            # 'Clínica Veterinária' | 'Pet Shop'
├── address: string
├── phone: string
├── image: string           # URL Unsplash
└── services: string[]      # Array de serviços oferecidos
```

**🏪 Serviços**:

```bash
services (3 total)
├── 1: VetCare Salvador
│   ├── Tipo: Clínica Veterinária
│   └── Serviços: Consultas, Vacinas, Cirurgias, Emergência 24h
│
├── 2: PetShop Amigo Fiel
│   ├── Tipo: Pet Shop
│   └── Serviços: Banho e Tosa, Rações, Acessórios, Hospedagem
│
└── 3: Clínica Animalia
    ├── Tipo: Clínica Veterinária
    └── Serviços: Consultas, Exames, Ultrassom, Castração
```

---

## 🔄 Integration Patterns

### Importação Centralizada

```bash
Import Pattern
├── Tudo exportado de '../data/mockData'
├── Named exports para cada dataset
└── Desestruturação no import

Exemplo:
import { allPets, ongs, testimonials } from '../data/mockData';
```

### Uso em Hooks

```javascript
// hooks/usePets.js
import { allPets } from '../data/mockData';

export const usePets = () => {
  const getPets = (filters) => {
    return allPets.filter(pet => {
      // aplica filtros
    });
  };
  return { getPets };
};
```

### Uso em Componentes

```javascript
// components/features/PetCard.jsx
import { allPets } from '../../data/mockData';

// Renderização
allPets.map(pet => <PetCard key={pet.id} pet={pet} />)
```

---

## 📝 Notes & Best Practices

1. **Substituição**: Em produção, substituir por chamadas API reais
2. **IDs**: Manter formato consistente (pet_XXX, ong_XXX)
3. **Imagens**: URLs do Unsplash podem expirar - considerar download local
4. **Dados**: Atualizar datas (createdAt) para manter frescor
5. **Expansão**: Adicionar mais pets/ONGs conforme necessidade de teste

---

## 🔄 Changelog

```bash
CHANGELOG.md
├── 2026-03-13
│   ├── [+] Criação de 24 pets mockados (12 dogs, 12 cats)
│   ├── [+] Criação de 6 ONGs parceiras
│   ├── [+] Arrays de opções para filtros
│   └── Autor: @Rsenju
│
├── 2026-03-12
│   ├── [+] Adicionado testimonials (6 depoimentos)
│   ├── [+] Adicionado features (3 value props)
│   └── Autor: @Rsenju
│
└── 2026-03-11
    ├── [+] Adicionado blogPosts (4 posts)
    ├── [+] Adicionado services (3 parceiros)
    └── Autor: @Rsenju
```

---

*Documentação gerada para PetFinder React - MockData Layer*
