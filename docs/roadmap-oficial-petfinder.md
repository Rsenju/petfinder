# Roadmap Oficial — PetFinder

Última atualização: 7 de junho de 2026.

## Visão do Produto

O PetFinder é uma plataforma SaaS de adoção responsável focada em:

- conexão entre ONGs e adotantes;
- fluxo simples via WhatsApp;
- experiência limpa e moderna;
- informações úteis para tutores;
- confiança e moderação;
- descoberta local de pets.

O sistema não deve virar:

- rede social;
- fórum;
- sistema gamificado;
- chat interno;
- plataforma burocrática;
- aplicativo visualmente poluído.

O foco do produto é:

- adoção rápida;
- experiência humana;
- navegação simples;
- confiança;
- UX moderna;
- informações úteis.

## Situação Atual do Projeto

### Já concluído

- React + Vite.
- Tailwind CSS.
- Supabase integrado.
- Estrutura SaaS organizada.
- Deploy preparado para Vercel.
- README.
- Arquivos `.env` e `.env.example`.
- `vercel.json`.
- Camada `services/`.
- Hooks.
- Utilitários.
- Contexto de autenticação.
- Páginas principais.
- Dashboard da ONG.
- Fluxo inicial de adoção.
- Filtros.
- Detalhes dos pets.
- Integração com WhatsApp.
- Responsividade parcial.

## Prioridade Real

### Alta Prioridade

1. Sprint 1 — Estabilização e Polimento.
2. Sprint 2 — Sistema de ONGs e Moderação.
3. Sprint 3 — Sistema Profissional de Imagens.

### Média Prioridade

4. Sprint 4 — Geolocalização e Mapa.
5. Sprint 5 — Perfil Avançado dos Pets.

### Expansão Futura

6. Sprint 6 — Serviços e Parceiros.
7. Sprint 7 — Utilidade Pública e Governo.
8. Sprint 8 — Blog Educativo.

## Sprint 1 — Estabilização e Polimento

### Objetivo

Corrigir bugs e deixar o sistema consistente, confiável e pronto para deploy público.

### Correções Críticas

- Corrigir formulário WhatsApp.
- Corrigir scroll quebrado.
- Corrigir imagens cortadas.
- Corrigir imagens aleatórias.
- Corrigir navbar inconsistente.
- Corrigir responsividade.
- Corrigir encoding UTF-8.
- Remover favoritos completamente.

### Console e Build

- Remover warnings.
- Remover APIs depreciadas.
- Corrigir imports quebrados.
- Corrigir erros React.
- Corrigir build warnings.

### UX

- Loading states.
- Mensagens de erro.
- Mensagens de sucesso.
- Feedback visual.
- Estados vazios.

### Mobile

Testar em:

- 360px.
- 390px.
- 768px.

Corrigir:

- overflow;
- grids quebrados;
- imagens;
- modais;
- navbar mobile.

### Resultado Esperado

Sistema estável, consistente e pronto para deploy público.

### Critérios de Aceite

- `npm run lint` sem erros.
- `npm run build` sem erros.
- Fluxo de adoção abre WhatsApp com mensagem correta.
- Nenhum texto visível com encoding quebrado.
- Listagem, detalhe, ONGs, login, dashboard e admin sem erros de console críticos.
- Layout funcional em mobile, tablet e desktop.

## Sprint 2 — Sistema de ONGs e Moderação

### Objetivo

Transformar o PetFinder em uma plataforma confiável, com controle administrativo real sobre ONGs, pets e denúncias.

### ONGs

Implementar:

- aprovação de ONG pelo admin;
- selo "ONG verificada";
- status da ONG:
  - pendente;
  - aprovada;
  - rejeitada.

### Admin

Implementar:

- aprovar ONG;
- bloquear ONG;
- remover pets;
- moderar conteúdo;
- visualizar denúncias.

### Denúncias

Usuários podem denunciar:

- imagens incorretas;
- informações falsas;
- maus-tratos;
- spam;
- conteúdo inadequado.

### Resultado Esperado

Sistema moderado, seguro e com maior confiança pública.

### Critérios de Aceite

- ONGs novas entram como pendentes.
- Admin consegue aprovar ou rejeitar uma ONG.
- ONGs rejeitadas/bloqueadas não aparecem como parceiras ativas.
- Pets podem ser removidos ou ocultados pelo admin.
- Denúncias ficam disponíveis para análise administrativa.

## Sprint 3 — Sistema Profissional de Imagens

### Objetivo

Melhorar a qualidade visual do produto e evitar imagens incorretas, desalinhadas ou inadequadas.

### Upload Real

Implementar:

- upload via Supabase Storage;
- múltiplas imagens por pet;
- preview antes de salvar;
- definição de capa do pet.

### Tratamento Automático

Implementar:

- compressão;
- resize;
- fundo branco automático quando necessário;
- padronização visual;
- validação de proporção.

### Regras

Implementar:

- impedir imagens inválidas;
- impedir espécies erradas;
- usar placeholders corretos;
- aceitar apenas imagens coerentes com espécie, porte e idade.

### Resultado Esperado

Imagens profissionais, coerentes e consistentes em toda a plataforma.

### Critérios de Aceite

- ONG consegue subir imagem sem usar URL externa.
- Imagens verticais são bloqueadas ou tratadas adequadamente.
- Imagens aparecem corretamente em cards, detalhe e similares.
- Cada pet tem imagem de capa.
- Galeria permite múltiplas imagens.

## Sprint 4 — Geolocalização e Mapa

### Objetivo

Fortalecer a descoberta local de pets e ONGs.

### Mapa Real

Implementar:

- pets no mapa;
- ONGs no mapa;
- pet shops no mapa.

### Busca

Implementar:

- pets próximos;
- distância em KM;
- filtro por bairro;
- filtro por cidade.

### Localização Inicial

Regiões prioritárias:

- Salvador;
- Lauro de Freitas;
- Feira de Santana.

### Resultado Esperado

Experiência regional/local forte, facilitando adoções próximas ao adotante.

## Sprint 5 — Perfil Avançado dos Pets

### Objetivo

Melhorar confiança e adoção responsável com perfis mais completos.

### Saúde

Implementar:

- carteira de vacinação;
- histórico veterinário;
- necessidades especiais;
- medicações;
- microchipagem;
- peso.

### Perfil Comportamental

Implementar:

- nível de energia;
- adaptação;
- comportamento;
- convivência com:
  - crianças;
  - gatos;
  - cães.

### Informações Adicionais

Implementar:

- rotina;
- alimentação;
- observações da ONG.

### Resultado Esperado

Perfis completos, profissionais e mais confiáveis para decisão de adoção.

## Sprint 6 — Serviços e Parceiros

### Objetivo

Transformar o PetFinder em um hub útil para tutores, sem perder o foco principal em adoção.

### Pet Shops Parceiros

Adicionar 5 pet shops reais contendo:

- foto;
- endereço;
- WhatsApp;
- Instagram;
- localização.

### Serviços

Adicionar categorias:

- banho;
- tosa;
- vacinação;
- exames;
- veterinário;
- ração.

### Página de Serviços

Implementar:

- cards profissionais;
- filtros;
- localização.

### Resultado Esperado

Ecossistema útil além da adoção, com serviços relevantes para tutores.

## Sprint 7 — Utilidade Pública e Governo

### Objetivo

Adicionar informações públicas úteis e confiáveis para tutores.

### Informações Oficiais

Documentar:

- vacinação obrigatória;
- vacinação recomendada;
- microchipagem;
- viagens com pets;
- transporte aéreo;
- cuidados legais.

### Serviços Públicos

Adicionar:

- telefones;
- endereços;
- vacinação pública;
- castração pública;
- hospitais veterinários públicos;
- carteirinha pet.

### Regiões

Cobrir:

- Salvador;
- Lauro de Freitas;
- Feira de Santana.

### Resultado Esperado

Hub confiável de informações públicas relacionadas a pets.

## Sprint 8 — Blog Educativo

### Objetivo

Criar conteúdo útil, confiável e acessível para tutores e adotantes.

### Blog

Criar 10 artigos com embasamento real sobre:

- higiene;
- vacinação;
- alimentação;
- ansiedade;
- adaptação;
- adoção responsável;
- socialização;
- castração;
- enriquecimento ambiental;
- saúde preventiva.

### Regras Editoriais

- Sem achismos.
- Sem clickbait.
- Linguagem acessível.
- Conteúdo baseado em fontes confiáveis.
- Quando envolver saúde animal, recomendar acompanhamento veterinário.

### Resultado Esperado

Conteúdo educativo profissional que fortalece autoridade e confiança do PetFinder.

## Objetivo Final

O PetFinder deve se tornar:

- plataforma SaaS de adoção responsável;
- sistema moderno e confiável;
- hub útil para tutores;
- referência regional de adoção;
- produto real utilizável;
- projeto escalável;
- plataforma pronta para expansão futura.

## Ordem Recomendada de Execução

1. Finalizar Sprint 1 antes de adicionar novas funcionalidades.
2. Corrigir problemas críticos de login, encoding, responsividade e imagens.
3. Validar Supabase, autenticação e policies RLS.
4. Implementar moderação/admin real.
5. Implementar upload profissional de imagens.
6. Só depois expandir para mapa, serviços, utilidade pública e blog.

