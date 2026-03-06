import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { faker } from '@faker-js/faker';
import { AdoptionForm } from '../components/features/AdoptionForm';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dog,
  Heart,
  Home,
  Info,
  Instagram,
  MapPin,
  Maximize2,
  MessageCircle,
  Play,
  Share2,
  ShieldCheck,
  X
} from 'lucide-react';

const cn = (...inputs) => twMerge(clsx(inputs));

const ageLabel = (idade) => {
  if (!idade) return '';
  const valor = idade.valor ?? idade.value ?? idade.amount;
  const tipo = idade.tipo ?? idade.unit ?? 'anos';

  if (!valor) return '';
  if (tipo === 'meses') {
    return `${valor} ${valor === 1 ? 'mês' : 'meses'}`;
  }
  return `${valor} ${valor === 1 ? 'ano' : 'anos'}`;
};

const temperamentoLabel = (value) => {
  const map = {
    docil: 'Dócil',
    brincalhao: 'Brincalhão',
    calmo: 'Calmo',
    ativo: 'Ativo',
    protetor: 'Protetor',
    sociavel: 'Sociável',
    timido: 'Tímido'
  };
  return map[value] ?? value;
};

const condicaoLabel = (value) => {
  const map = {
    cegueira: 'Cegueira',
    sem_pata: 'Amputação',
    cardiopatia: 'Cardiopatia',
    surdez: 'Surdez',
    cuidados_continuos: 'Cuidados contínuos'
  };
  return map[value] ?? value;
};

const matchSchema = z.object({
  temOutrosPets: z.enum(['sim', 'nao']),
  tempoEmCasa: z.enum(['pouco', 'medio', 'muito']),
  espaco: z.enum(['pequeno', 'medio', 'grande']),
  experiencia: z.enum(['iniciante', 'intermediario', 'avancado'])
});

const adoptionSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo'),
  email: z.string().email('Informe um e-mail válido'),
  telefone: z.string().min(8, 'Informe um telefone válido'),
  cidade: z.string().min(2, 'Informe sua cidade'),
  tipoMoradia: z.enum(['casa', 'apartamento', 'sitio']),
  possuiQuintal: z.enum(['sim', 'nao']),
  permiteInterior: z.enum(['sim', 'nao']),
  jaTevePets: z.enum(['sim', 'nao']),
  possuiPetsAtuais: z.enum(['sim', 'nao']),
  tempoDisponivel: z.enum(['pouco', 'medio', 'muito'])
});

const useFavoritesStore = create((set) => ({
  favorites: {},
  toggleFavorite: (id) =>
    set((state) => {
      const isFav = !!state.favorites[id];
      const next = { ...state.favorites };
      if (isFav) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return { favorites: next };
    })
}));

const createMockPet = (id) => {
  const especie = faker.helpers.arrayElement(['cachorro', 'gato']);
  const porte = faker.helpers.arrayElement(['pequeno', 'medio', 'grande']);
  const sexo = faker.helpers.arrayElement(['macho', 'femea']);

  const nome = faker.person.firstName();
  const cidade = faker.location.city();

  const baseImage = faker.image.urlLoremFlickr({ category: 'animals', width: 1200, height: 800 });
  const thumbImage = faker.image.urlLoremFlickr({ category: 'animals', width: 400, height: 300 });

  const condicoesPool = ['cegueira', 'sem_pata', 'cardiopatia', 'surdez', 'cuidados_continuos'];
  const temperamentoPool = ['docil', 'brincalhao', 'calmo', 'ativo', 'protetor', 'sociavel'];

  const condicoesEspeciais = faker.helpers.arrayElements(condicoesPool, {
    min: 0,
    max: 2
  });
  const temperamento = faker.helpers.arrayElements(temperamentoPool, {
    min: 2,
    max: 4
  });

  const hasVideo = faker.datatype.boolean(0.4);
  const hasPanorama = faker.datatype.boolean(0.3);

  const gallery = [
    {
      id: `${id}-main`,
      type: 'image',
      thumbUrl: thumbImage,
      fullUrl: baseImage,
      alt: `Foto de ${nome}, ${especie} para adoção em ${cidade}`
    },
    {
      id: `${id}-2`,
      type: 'image',
      thumbUrl: faker.image.urlLoremFlickr({ category: 'animals', width: 400, height: 300 }),
      fullUrl: faker.image.urlLoremFlickr({ category: 'animals', width: 1200, height: 800 }),
      alt: `Outra foto de ${nome}`
    },
    {
      id: `${id}-3`,
      type: hasPanorama ? 'panorama' : 'image',
      thumbUrl: faker.image.urlLoremFlickr({ category: 'nature', width: 400, height: 300 }),
      fullUrl: faker.image.urlLoremFlickr({ category: 'nature', width: 1600, height: 900 }),
      alt: hasPanorama ? `Foto panorâmica do espaço do pet ${nome}` : `Ambiente onde ${nome} vive`
    }
  ];

  if (hasVideo) {
    gallery.push({
      id: `${id}-video`,
      type: 'video',
      thumbUrl: faker.image.urlLoremFlickr({ category: 'animals', width: 400, height: 300 }),
      fullUrl: faker.image.urlLoremFlickr({ category: 'animals', width: 1200, height: 800 }),
      alt: `Vídeo do pet ${nome}`
    });
  }

  return {
    id,
    nome,
    especie,
    raca: faker.animal.dog(),
    idade: { valor: faker.number.int({ min: 1, max: 14 }), tipo: 'anos' },
    porte,
    sexo,
    vacinado: faker.datatype.boolean(0.8),
    castrado: faker.datatype.boolean(0.7),
    vermifugado: faker.datatype.boolean(0.75),
    condicoesEspeciais,
    temperamento,
    historia: faker.lorem.paragraphs({ min: 1, max: 2 }),
    ong: {
      nome: faker.company.name(),
      contato: faker.phone.number(),
      cidade,
      email: faker.internet.email(),
      whatsapp: faker.phone.number('###########')
    },
    gallery
  };
};

const fetchPetById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return createMockPet(id);
};

const fetchSimilarPets = async (pet) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const similar = Array.from({ length: 4 }, (_, index) => {
    const base = createMockPet(`${pet.id}-similar-${index + 1}`);
    return {
      ...base,
      especie: pet.especie,
      porte: pet.porte,
      ong: { ...base.ong, nome: pet.ong.nome }
    };
  });
  return similar;
};

const badgeClass =
  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight';

const badgePositive = 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100';
const badgeNeutral = 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
const badgeWarning = 'bg-amber-50 text-amber-700 ring-1 ring-amber-100';

const stepTitles = ['Dados pessoais', 'Moradia', 'Experiência com pets'];

function MatchSimulator({ pet }) {
  const [formValues, setFormValues] = useState({
    temOutrosPets: 'nao',
    tempoEmCasa: 'medio',
    espaco: 'medio',
    experiencia: 'intermediario'
  });
  const [matchResult, setMatchResult] = useState(null);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    const parsed = matchSchema.safeParse(formValues);
    if (!parsed.success) {
      setMatchResult({ value: 40, status: 'Ajuste alguns pontos para um match melhor.' });
      return;
    }

    let score = 60;

    if (formValues.tempoEmCasa === 'muito') score += 15;
    if (formValues.espaco === 'grande') score += 10;
    if (formValues.experiencia === 'avancado') score += 10;
    if (formValues.temOutrosPets === 'sim') score += 5;

    if (pet.porte === 'grande' && formValues.espaco === 'pequeno') score -= 15;
    if (pet.temperamento?.includes('ativo') && formValues.tempoEmCasa === 'pouco') score -= 10;

    const value = Math.max(20, Math.min(100, score));

    const status =
      value >= 85
        ? 'Match perfeito! Vocês têm tudo para dar muito certo.'
        : value >= 70
          ? 'Ótimo match! Com alguns cuidados extras, será uma ótima adoção.'
          : 'Talvez seja melhor conversar com a ONG para entender melhor as necessidades do pet.';

    setMatchResult({ value, status });
  };

  return (
    <section
      aria-labelledby="match-simulator-title"
      className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2
            id="match-simulator-title"
            className="text-sm font-semibold text-slate-900 sm:text-base"
          >
            Simulador de Match
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Descubra o quão compatível você é com {pet.nome}.
          </p>
        </div>
      </div>

      <div className="grid gap-3 text-xs text-slate-700 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Você já tem outros pets?
          </label>
          <div className="flex gap-1.5">
            {['sim', 'nao'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleChange('temOutrosPets', value)}
                className={cn(
                  'flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  formValues.temOutrosPets === value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                )}
              >
                {value === 'sim' ? 'Sim' : 'Não'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Quanto tempo você passa em casa?
          </label>
          <select
            value={formValues.tempoEmCasa}
            onChange={(event) => handleChange('tempoEmCasa', event.target.value)}
            className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          >
            <option value="pouco">Pouco (até 4h)</option>
            <option value="medio">Médio (4h a 8h)</option>
            <option value="muito">Muito (mais de 8h)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Espaço disponível
          </label>
          <select
            value={formValues.espaco}
            onChange={(event) => handleChange('espaco', event.target.value)}
            className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          >
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Sua experiência com pets
          </label>
          <select
            value={formValues.experiencia}
            onChange={(event) => handleChange('experiencia', event.target.value)}
            className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.97]"
        >
          Calcular compatibilidade
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        {matchResult && (
          <Motion.div
            key={matchResult.value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-xs text-slate-700"
          >
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <path
                  className="text-slate-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831"
                />
                <Motion.path
                  className="text-emerald-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: matchResult.value / 100 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-slate-800">
                {matchResult.value}%
              </div>
            </div>
            <p className="max-w-[220px] text-[11px] text-slate-600">{matchResult.status}</p>
          </Motion.div>
        )}
      </div>
    </section>
  );
}

function AdoptionFormLocal({ pet }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      cidade: '',
      tipoMoradia: 'apartamento',
      possuiQuintal: 'nao',
      permiteInterior: 'sim',
      jaTevePets: 'nao',
      possuiPetsAtuais: 'nao',
      tempoDisponivel: 'medio'
    },
    mode: 'onBlur'
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepTitles.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const progress = ((step + 1) / stepTitles.length) * 100;

  return (
    <section
      aria-labelledby="adoption-form-title"
      className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2
            id="adoption-form-title"
            className="text-sm font-semibold text-slate-900 sm:text-base"
          >
            Formulário de pré-adoção
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Preencha as etapas para que a ONG possa conhecer melhor você.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Etapa {step + 1} de {stepTitles.length}
          </span>
          <span>{stepTitles[step]}</span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-100">
          <Motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {submitted ? (
        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-6 text-center"
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            Pré-adoção enviada com sucesso!
          </h3>
          <p className="mt-1 max-w-xs text-xs text-slate-500">
            A equipe da ONG {pet.ong.nome} entrará em contato com você em breve para continuar o
            processo.
          </p>
        </Motion.div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-xs text-slate-700"
            noValidate
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <Motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      {...register('nome')}
                      className={cn(
                        'h-9 w-full rounded-full border bg-white px-3 text-xs outline-none',
                        errors.nome
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200'
                      )}
                    />
                    {errors.nome && (
                      <p className="text-[11px] text-rose-500">{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">E-mail</label>
                    <input
                      type="email"
                      {...register('email')}
                      className={cn(
                        'h-9 w-full rounded-full border bg-white px-3 text-xs outline-none',
                        errors.email
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200'
                      )}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      {...register('telefone')}
                      className={cn(
                        'h-9 w-full rounded-full border bg-white px-3 text-xs outline-none',
                        errors.telefone
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200'
                      )}
                    />
                    {errors.telefone && (
                      <p className="text-[11px] text-rose-500">{errors.telefone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">Cidade</label>
                    <input
                      type="text"
                      {...register('cidade')}
                      className={cn(
                        'h-9 w-full rounded-full border bg-white px-3 text-xs outline-none',
                        errors.cidade
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200'
                      )}
                    />
                    {errors.cidade && (
                      <p className="text-[11px] text-rose-500">{errors.cidade.message}</p>
                    )}
                  </div>
                </Motion.div>
              )}

              {step === 1 && (
                <Motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Tipo de moradia
                    </label>
                    <select
                      {...register('tipoMoradia')}
                      className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
                    >
                      <option value="apartamento">Apartamento</option>
                      <option value="casa">Casa</option>
                      <option value="sitio">Sítio / Chácara</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Possui quintal?
                    </label>
                    <div className="flex gap-1.5">
                      {['sim', 'nao'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => methods.setValue('possuiQuintal', value)}
                          className={cn(
                            'flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                            methods.watch('possuiQuintal') === value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          )}
                        >
                          {value === 'sim' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      O pet poderá ficar dentro de casa?
                    </label>
                    <div className="flex gap-1.5">
                      {['sim', 'nao'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => methods.setValue('permiteInterior', value)}
                          className={cn(
                            'flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                            methods.watch('permiteInterior') === value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          )}
                        >
                          {value === 'sim' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>
                </Motion.div>
              )}

              {step === 2 && (
                <Motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Já teve pets antes?
                    </label>
                    <div className="flex gap-1.5">
                      {['sim', 'nao'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => methods.setValue('jaTevePets', value)}
                          className={cn(
                            'flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                            methods.watch('jaTevePets') === value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          )}
                        >
                          {value === 'sim' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Possui pets atualmente?
                    </label>
                    <div className="flex gap-1.5">
                      {['sim', 'nao'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => methods.setValue('possuiPetsAtuais', value)}
                          className={cn(
                            'flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                            methods.watch('possuiPetsAtuais') === value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          )}
                        >
                          {value === 'sim' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium text-slate-500">
                      Tempo disponível por dia para o pet
                    </label>
                    <select
                      {...register('tempoDisponivel')}
                      className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
                    >
                      <option value="pouco">Pouco (até 2h)</option>
                      <option value="medio">Médio (2h a 4h)</option>
                      <option value="muito">Muito (mais de 4h)</option>
                    </select>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium transition',
                  step === 0
                    ? 'cursor-not-allowed text-slate-300'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <ChevronLeft className="h-3 w-3" />
                Voltar
              </button>

              {step < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  Próxima etapa
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Enviar pré-adoção
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </section>
  );
}

function MediaGallery({ pet }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainMedia = pet.gallery[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % pet.gallery.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + pet.gallery.length) % pet.gallery.length);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, pet.gallery.length]);

  return (
    <section aria-label={`Galeria de mídia do pet ${pet.nome}`} className="space-y-3">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="order-2 flex w-full gap-2 md:order-1 md:w-28 md:flex-col">
          {pet.gallery.map((media, index) => (
            <button
              key={media.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'group relative overflow-hidden rounded-2xl border transition',
                activeIndex === index
                  ? 'border-emerald-500 ring-2 ring-emerald-200'
                  : 'border-transparent hover:border-slate-300'
              )}
            >
              <img
                src={media.thumbUrl}
                alt={media.alt}
                loading="lazy"
                className="h-20 w-full object-cover md:h-20"
              />
              {media.type === 'video' && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                  <Play className="h-5 w-5 drop-shadow" />
                </div>
              )}
              {media.type === 'panorama' && (
                <div className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                  360°
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="order-1 relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 md:order-2">
          <Motion.div
            key={mainMedia.id}
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-64 w-full cursor-zoom-in overflow-hidden sm:h-80 md:h-96"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={mainMedia.fullUrl}
              alt={mainMedia.alt}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
              <Dog className="h-3.5 w-3.5" />
              <span className="capitalize">{pet.especie}</span>
            </div>
            <button
              type="button"
              aria-label="Ver mídia em tela cheia"
              className="pointer-events-auto absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/60 p-1.5 text-white shadow-sm transition hover:bg-black/80"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </Motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[11px] text-white">
            <span className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1">
              <Info className="h-3.5 w-3.5" />
              <span>Zoom disponível</span>
            </span>
            <span className="rounded-full bg-black/45 px-2 py-0.5">
              {activeIndex + 1} / {pet.gallery.length}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria em tela cheia do pet ${pet.nome}`}
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between px-4 py-3 text-xs text-slate-100">
                <div className="flex items-center gap-2">
                  <Dog className="h-4 w-4" />
                  <span>
                    {pet.nome} · {pet.especie}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-1.5 text-slate-50 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label="Mídia anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label="Próxima mídia"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <Motion.div
                  key={mainMedia.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[80vh] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-2"
                >
                  <img
                    src={mainMedia.fullUrl}
                    alt={mainMedia.alt}
                    className="h-full w-full max-h-[76vh] object-contain"
                  />
                </Motion.div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SimilarPets({ basePet }) {
  const { data: similarPets = [], isLoading } = useQuery({
    queryKey: ['similarPets', basePet.id],
    queryFn: () => fetchSimilarPets(basePet),
    enabled: !!basePet,
    staleTime: 5 * 60 * 1000
  });

  if (!basePet) return null;

  return (
    <section aria-labelledby="similar-pets-title" className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2
          id="similar-pets-title"
          className="text-sm font-semibold text-slate-900 sm:text-base"
        >
          Pets similares
        </h2>
        <p className="text-[11px] text-slate-500">
          Mesma ONG ou perfil parecido com {basePet.nome}.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white/60 p-3"
            >
              <div className="mb-3 h-28 rounded-xl bg-slate-200" />
              <div className="mb-1 h-4 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {similarPets.map((pet) => (
            <article
              key={pet.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                <img
                  src={pet.gallery[0].thumbUrl}
                  alt={pet.gallery[0].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                  {pet.porte} · {pet.sexo === 'femea' ? 'Fêmea' : 'Macho'}
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 text-xs text-slate-700">
                <h3 className="text-sm font-semibold text-slate-900">{pet.nome}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {pet.ong.cidade}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function PetDetailPage() {
  const { id } = useParams();
  const petId = id ?? '1';

  const { data: pet, isLoading, isError } = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => fetchPetById(petId),
    staleTime: 5 * 60 * 1000
  });

  const isFavorite = useFavoritesStore((state) => !!state.favorites[petId]);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const toastTimeoutRef = useRef(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, variant = 'success') => {
    setToast({ message, variant });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(petId);
    showToast(
      isFavorite
        ? `${pet?.nome ?? 'Pet'} removido dos favoritos.`
        : `${pet?.nome ?? 'Pet'} adicionado aos favoritos!`,
      isFavorite ? 'neutral' : 'success'
    );
  };

  const handleShareWhatsApp = () => {
    if (!pet) return;
    const url = window.location.href;
    const text = `Olha este pet para adoção: ${pet.nome} · ${pet.especie} · ${url}`;
    const link = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleShareInstagram = () => {
    if (!pet) return;
    showToast(
      'Abrindo câmera do Instagram (simulação). Use o link do pet na sua story.',
      'neutral'
    );
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const structuredTemperamento = useMemo(
    () => pet?.temperamento?.map((value) => temperamentoLabel(value)) ?? [],
    [pet?.temperamento]
  );

  const structuredCondicoes = useMemo(
    () => pet?.condicoesEspeciais?.map((value) => condicaoLabel(value)) ?? [],
    [pet?.condicoesEspeciais]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <a
        href="#pet-detail-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para conteúdo principal
      </a>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-6 w-2/3 rounded bg-slate-200" />
            <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              <div className="h-80 rounded-3xl bg-slate-200" />
              <div className="space-y-3">
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="mt-4 h-10 w-full rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        ) : isError || !pet ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-lg font-semibold text-slate-900">
              Não foi possível carregar os detalhes do pet
            </h1>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Tente atualizar a página ou voltar para a lista de pets para escolher outro amigo.
            </p>
          </div>
        ) : (
          <>
            <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-600">
                  <Dog className="h-3.5 w-3.5" />
                  <span>Detalhes do pet</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {pet.nome}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {pet.ong.cidade}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="capitalize">{pet.especie}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="capitalize">{pet.porte}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{ageLabel(pet.idade)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="capitalize">{pet.sexo === 'femea' ? 'Fêmea' : 'Macho'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition',
                    isFavorite
                      ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  )}
                  aria-pressed={isFavorite}
                  aria-label={
                    isFavorite
                      ? 'Remover pet dos favoritos'
                      : 'Adicionar pet aos favoritos para acompanhar depois'
                  }
                >
                  <Heart
                    className={cn(
                      'h-4 w-4',
                      isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-500'
                    )}
                  />
                  <span>{isFavorite ? 'Favoritado' : 'Favoritar'}</span>
                </button>

                <div className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Adoção responsável
                </div>
              </div>
            </header>

            <main
              id="pet-detail-main"
              className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.35fr)]"
            >
              <div className="space-y-5">
                <MediaGallery pet={pet} />

                <section
                  aria-labelledby="pet-info-title"
                  className="mt-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2
                      id="pet-info-title"
                      className="text-sm font-semibold text-slate-900 sm:text-base"
                    >
                      Informações sobre {pet.nome}
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      <Info className="h-3.5 w-3.5" />
                      Perfil verificado pela ONG
                    </span>
                  </div>

                  <div className="grid gap-4 text-xs text-slate-700 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Dados gerais
                      </h3>
                      <dl className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                        <div>
                          <dt className="text-[11px] text-slate-500">Espécie</dt>
                          <dd className="font-medium capitalize text-slate-900">{pet.especie}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Raça</dt>
                          <dd className="font-medium text-slate-900">{pet.raca}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Porte</dt>
                          <dd className="font-medium capitalize text-slate-900">{pet.porte}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Idade</dt>
                          <dd className="font-medium text-slate-900">{ageLabel(pet.idade)}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Saúde
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={cn(badgeClass, pet.vacinado ? badgePositive : badgeNeutral)}>
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.vacinado ? 'Vacinado' : 'Não vacinado'}
                        </span>
                        <span className={cn(badgeClass, pet.castrado ? badgePositive : badgeNeutral)}>
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.castrado ? 'Castrado' : 'Não castrado'}
                        </span>
                        <span
                          className={cn(
                            badgeClass,
                            pet.vermifugado ? badgePositive : badgeNeutral
                          )}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.vermifugado ? 'Vermifugado' : 'Não vermifugado'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Temperamento
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {structuredTemperamento.map((label) => (
                          <span
                            key={label}
                            className={cn(
                              badgeClass,
                              'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                            )}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {structuredCondicoes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Condições especiais
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {structuredCondicoes.map((label) => (
                            <span
                              key={label}
                              className={cn(badgeClass, badgeWarning, 'flex items-center gap-1')}
                            >
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {label}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Pets com condições especiais também merecem um lar. A ONG dará todo apoio
                          necessário.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-700">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      História
                    </h3>
                    <p className="leading-relaxed text-slate-700">{pet.historia}</p>
                  </div>
                </section>
              </div>

              <aside className="space-y-4 md:space-y-5">
                <section
                  aria-labelledby="ong-section-title"
                  className="rounded-3xl border border-slate-200 bg-slate-900 px-5 py-4 text-slate-50 shadow-sm"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                      <Home className="h-4 w-4" />
                    </div>
                    <div>
                      <h2
                        id="ong-section-title"
                        className="text-sm font-semibold text-white sm:text-base"
                      >
                        ONG {pet.ong.nome}
                      </h2>
                      <p className="mt-1 text-xs text-slate-300">
                        Organização parceira verificada. Todas as adoções passam por entrevista e
                        termo de responsabilidade.
                      </p>
                    </div>
                  </div>

                  <dl className="space-y-1.5 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{pet.ong.cidade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span>WhatsApp: {pet.ong.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                      <span>E-mail: {pet.ong.email}</span>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.97]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Falar com a ONG
                    </button>
                    <button
                      type="button"
                      onClick={handleShareInstagram}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-600 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-50 shadow-sm transition hover:bg-slate-800 active:scale-[0.97]"
                    >
                      <Share2 className="h-4 w-4" />
                      Compartilhar perfil
                    </button>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400">
                    Seus dados serão compartilhados apenas com a ONG responsável por este pet.
                  </p>
                </section>

                <MatchSimulator pet={pet} />

                <AdoptionFormLocal pet={pet} />

                <section
                  aria-label="Compartilhar pet"
                  className="rounded-3xl border border-dashed border-slate-300 bg-slate-100/80 p-4 text-xs text-slate-700"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-slate-500" />
                    <h2 className="text-xs font-semibold text-slate-900">
                      Compartilhe {pet.nome} com seus amigos
                    </h2>
                  </div>
                  <p className="mb-3 text-[11px] text-slate-500">
                    Quanto mais pessoas conhecerem {pet.nome}, maiores as chances de encontrar um
                    lar.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={handleShareInstagram}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#962fbf] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:brightness-105"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      Story no Instagram
                    </button>
                  </div>
                </section>
              </aside>
            </main>

            <SimilarPets basePet={pet} />
          </>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-none fixed bottom-4 left-1/2 z-40 w-full max-w-xs -translate-x-1/2 px-4"
          >
            <div
              className={cn(
                'pointer-events-auto flex items-center gap-2 rounded-2xl px-3 py-2 text-xs shadow-lg',
                toast.variant === 'success'
                  ? 'bg-emerald-600 text-emerald-50'
                  : 'bg-slate-900 text-slate-50'
              )}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
                {toast.variant === 'success' ? (
                  <Heart className="h-3.5 w-3.5" />
                ) : (
                  <Info className="h-3.5 w-3.5" />
                )}
              </span>
              <p className="flex-1">{toast.message}</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}