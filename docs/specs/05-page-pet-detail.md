# Pagina: Detalhes do Pet (PetDetail.jsx)

Especificacao de implementacao da pagina de perfil completo do pet

---
## Contexto

Projeto React 19 + Vite + TailwindCSS v4.

Stack instalado:
- react-router-dom v7
- @tanstack/react-query v5
- zustand
- framer-motion
- react-hook-form + zod
- use-debounce
- lucide-react
- date-fns
- clsx + tailwind-merge
- msw + faker (mock API)

---
## Restricoes

- Nao recriar projeto
- Nao instalar dependencias
- Implementar tudo dentro de PetDetail.jsx
- UX premium e acessibilidade profissional

---
## Funcionalidades

### 1. Galeria e Midia (Estilo Airbnb)

Layout:
- Thumbnails laterais (esquerda)
- Imagem principal (direita, maior)
- Grid adaptativo responsivo

Interacoes:
- Hover na thumbnail -> preview na principal
- Click na principal -> modal fullscreen
- Modal com navegacao por setas (<- ->)
- Teclado: ESC fecha, setas navegam
- Lazy load progressivo (thumbnail -> HD)

Suporte a:
- Imagens estaticas (padrao)
- Video do pet (se disponivel)
- Foto 360 panoramica (se disponivel)

Animacoes:
- Framer-motion: fade, scale, slide
- Transicoes suaves entre midias

---
### 2. Informacoes Estruturadas

Schema base:

```javascript
const petSchema = {
  nome: "Luna",
  especie: "cachorro",
  raca: "Vira-lata",
  idade: { valor: 2, tipo: "anos" },
  porte: "medio",
  sexo: "femea",
  vacinado: true,
  castrado: true,
  vermifugado: true,
  condicoesEspeciais: ["cegueira", "sem_pata"],
  temperamento: ["docil", "brincalhao", "calmo"],
  historia: "Resgatada das ruas em 2023...",
  ong: { 
    nome: "Amigo Fiel", 
    contato: "(71) 99999-9999",
    email: "contato@amigofiel.org"
  }
}

```
Visualizacao:

- Badges para vacinado/castrado/vermifugado (cores semanticas)
- Tags de temperamento (pills coloridas)
- Alerta visual para condicoes especiais (icone + descricao)
- Secao "Historia" com texto completo
- Card da ONG com foto, nome, contato, botao de acao

---
### 3. Funcionalidades Avancadas

#### A) Simulador de Match

Formulario interativo:

- Voce tem outros pets? (sim/nao)
- Tempo disponivel por dia? (pouco/medio/muito)
- Tipo de moradia? (apartamento/casa/sitio)
- Experiencia com pets? (iniciante/intermediario/avancado)

Resultado:

- Porcentagem de compatibilidade (0-100%)
- Animacao de preenchimento (circular progress)
- Mensagem personalizada baseada no score

#### B) Formulario de Pre-Adocao (Multi-step)

Wizard 3 etapas:

1. Dados pessoais (nome, email, telefone, cidade)
2. Moradia (tipo, quintal, permite interior)
3. Experiencia (ja teve pets, pets atuais, tempo disponivel)

Tecnologia:

- React Hook Form para controle
- Zod para validacao de schemas
- Barra de progresso animada entre steps

#### C) Favoritar

- Icone de coracao (lucide-react)
- Zustand para persistencia global
- Toast animado ao favoritar/desfavoritar
- Estado sincronizado na UI

#### D) Compartilhar

- WhatsApp: Link com mensagem pre-preenchida
- Instagram Story: Simulacao de deep link (ou copy link)

#### E) Pets Similares

- Busca via React Query
- Criterios: mesma ONG OU mesma especie + porte
- Grid de 4 cards abaixo do perfil principal

---
### 4. Acessibilidade (WCAG AAA)

Requisitos obrigatorios:

- Skip to content link (visivel apenas ao focar)
- Alt text detalhado em todas as imagens
- Navegacao completa por teclado (Tab, Enter, Escape)
- Foco visivel em todos os elementos interativos
- Contraste de cores adequado (4.5:1 minimo)
- ARIA labels em botoes sem texto
- Semantica HTML correta (article, section, aside)

---
### 5. Performance

Otimizacoes:

- React Query para cache de pet por ID
- Stale time: 5 minutos
- Skeleton loading durante fetch
- Lazy loading de midia (intersection observer)
- Memoizacao de componentes pesados
- Evitar re-render desnecessario

---
## Estilo

Tailwind v4:

- Layout responsivo (mobile-first)
- Microinteracoes em todos os elementos interativos
- Visual moderno, elegante, tipo "Airbnb para pets"
- Espacamentos generosos, tipografia clara

Framer Motion:

- Animacoes de entrada (fade + slide)
- Transicoes entre estados
- Hover effects suaves
---

## Estrutura do Arquivo

```jsx
// PetDetail.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Share2, MessageCircle } from 'lucide-react';

// Sub-componentes (definidos no mesmo arquivo)
function MediaGallery({ pet }) {...}
function PetInfo({ pet }) {...}
function MatchSimulator({ pet }) {...}
function AdoptionForm({ pet }) {...}
function SimilarPets({ petId }) {...}

// Store Zustand (favoritos)
const useFavoritesStore = create((set) => ({
  favorites: {},
  toggleFavorite: (id) => set(...),
}));

export default function PetDetail() {
  const { id } = useParams();
  const { data: pet, isLoading } = useQuery({
    queryKey: ['pet', id],
    queryFn: () => fetchPetById(id),
  });
  
  const isFavorite = useFavoritesStore(...);
  
  if (isLoading) return <PetDetailSkeleton />;
  if (!pet) return <NotFound />;
  
  return (
    <article className="min-h-screen bg-white">
      <MediaGallery pet={pet} />
      
      <div className="grid lg:grid-cols-3 gap-8 p-4 lg:p-8">
        <div className="lg:col-span-2 space-y-8">
          <PetInfo pet={pet} />
          <MatchSimulator pet={pet} />
        </div>
        
        <aside className="space-y-6">
          <OngCard ong={pet.ong} />
          <AdoptionForm pet={pet} />
          <ShareButtons pet={pet} />
        </aside>
      </div>
      
      <SimilarPets petId={id} />
    </article>
  );
}

```
---

## Criterios de Aceitacao

- [ ] Galeria estilo Airbnb funcional
- [ ] Modal fullscreen com navegacao por setas/teclado
- [ ] Suporte a video e panorama 360
- [ ] Informacoes estruturadas com schema completo
- [ ] Badges de saude (vacinado/castrado/vermifugado)
- [ ] Tags de temperamento
- [ ] Alerta de condicoes especiais
- [ ] Simulador de match com porcentagem animada
- [ ] Formulario multi-step (3 etapas)
- [ ] Validacao com Zod
- [ ] Favoritar com Zustand
- [ ] Compartilhar WhatsApp/Instagram
- [ ] Pets similares com React Query
- [ ] Skip to content (acessibilidade)
- [ ] Navegacao por teclado completa
- [ ] Contraste WCAG AAA
- [ ] ARIA labels
- [ ] React Query para cache
- [ ] Skeleton loading
- [ ] Lazy loading de midia
- [ ] Codigo limpo e escalavel
---

## Implementacao

Arquivo: src/pages/PetDetail.jsx

Dependencias: Todas ja instaladas

Tempo estimado: 10-12 horas

Complexidade: Alta (pagina mais completa do projeto)
---