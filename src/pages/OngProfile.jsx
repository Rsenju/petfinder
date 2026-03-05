import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react';

import useOngs from '../hooks/useOngs';
import usePets from '../hooks/usePets';
import PetCard from '../components/features/PetCard';
import Badge from '../components/ui/Badge';
import SkeletonCard from '../components/ui/SkeletonCard';
import ScrollReveal from '../components/ui/ScrollReveal';

const cn = (...inputs) => twMerge(clsx(inputs));

function OngHeader({ ong }) {
  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-600">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Perfil da ONG</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {ong.name}
            </h1>
            {ong.verified && (
              <Badge variant="success" className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verificada
              </Badge>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {ong.city}
            </span>
            {ong.foundedAt && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Ativa desde {ong.foundedAt}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {typeof ong.totalRescues === 'number' && (
            <div className="flex flex-col rounded-2xl bg-slate-900 px-4 py-2 text-right text-slate-50 shadow-sm">
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Resgates realizados
              </span>
              <span className="text-lg font-semibold">
                {ong.totalRescues.toLocaleString('pt-BR')}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ timeline }) {
  if (!timeline || !timeline.length) return null;

  return (
    <ScrollReveal>
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Linha do tempo de resgates
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <TrendingUp className="h-3.5 w-3.5" />
            Impacto ao longo dos anos
          </span>
        </div>
        <ol className="relative mt-3 space-y-4 border-l border-slate-200 pl-4 text-xs text-slate-700">
          {timeline.map((item, index) => (
            <li key={item.id ?? index} className="relative pl-2">
              <div className="absolute -left-[9px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                {item.date && <span className="font-medium">{item.date}</span>}
                {item.label && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{item.label}</span>
                  </>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-slate-700">{item.description}</p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </ScrollReveal>
  );
}

function TestimonialsSection({ testimonials }) {
  if (!testimonials || !testimonials.length) return null;

  return (
    <ScrollReveal delay={0.1}>
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Depoimentos</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Motion.figure
              key={testimonial.id ?? index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-700"
            >
              <blockquote className="leading-relaxed text-slate-700">
                “{testimonial.message}”
              </blockquote>
              <figcaption className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-slate-800">{testimonial.name}</span>
                {testimonial.adoptedPet && <span>Adotou {testimonial.adoptedPet}</span>}
              </figcaption>
            </Motion.figure>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

function TransparencySection({ transparency }) {
  if (!transparency) return null;

  return (
    <ScrollReveal delay={0.15}>
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Transparência e impacto
          </h2>
        </div>
        <div className="grid gap-4 text-xs text-slate-700 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            {transparency.description && (
              <p className="leading-relaxed text-slate-700">{transparency.description}</p>
            )}
            {transparency.links && transparency.links.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                {transparency.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {transparency.metrics && (
            <div className="grid gap-2 rounded-2xl bg-slate-50 p-3">
              {transparency.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2"
                >
                  <span className="text-[11px] text-slate-500">{metric.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{metric.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}

function OngPetsSection({ pets, isLoading }) {
  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Pets desta ONG</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Nenhum pet disponível no momento
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Esta ONG pode estar em período de pausa ou com todos os pets em processo de adoção.
          Volte em alguns dias ou entre em contato para saber mais.
        </p>
      </section>
    );
  }

  return (
    <ScrollReveal delay={0.1}>
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Pets desta ONG</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet, index) => (
            <PetCard key={pet.id} pet={pet} index={index} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

export default function OngProfilePage() {
  const { id } = useParams();
  const ongId = id ?? '';

  const {
    data: ongs = [],
    isLoading: isLoadingOngs,
    isError: isOngError
  } = useOngs({ id: ongId });

  const ong = useMemo(
    () => ongs.find((item) => String(item.id) === String(ongId)) || ongs[0],
    [ongs, ongId]
  );

  const {
    data: pets = [],
    isLoading: isLoadingPets
  } = usePets({ ongId: ong?.id }, { enabled: !!ong?.id });

  if (isLoadingOngs) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          <div className="mb-4 h-7 w-2/3 rounded bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
            <div className="h-60 rounded-3xl bg-slate-200" />
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
              <div className="h-10 w-full rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isOngError || !ong) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 pb-12 pt-6 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Não encontramos essa ONG
          </h1>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Verifique se o link está correto ou volte para a lista de ONGs para escolher outra
            organização.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <OngHeader ong={ong} />

        <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          <div className="space-y-5">
            <TimelineSection timeline={ong.timeline} />
            <TestimonialsSection testimonials={ong.testimonials} />
            <TransparencySection transparency={ong.transparency} />
          </div>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
              <h2 className="mb-2 text-sm font-semibold text-slate-900 sm:text-base">
                Apoie esta ONG
              </h2>
              <p className="text-xs text-slate-600">
                Sua doação ajuda a manter resgates, tratamentos veterinários, alimentação e
                estrutura de acolhimento para dezenas de animais todos os meses.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.97]"
              >
                Quero doar agora
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              {ong.bankInfo && (
                <div className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2 text-[11px] text-emerald-900">
                  <p className="font-semibold">Dados para transferência:</p>
                  <p>{ong.bankInfo}</p>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
              <h2 className="mb-2 text-sm font-semibold text-slate-900 sm:text-base">
                Sobre a equipe
              </h2>
              <p className="text-xs text-slate-600">
                A equipe da {ong.name} conta com voluntários, lares temporários e parceiros
                veterinários que atuam em conjunto para garantir o bem-estar dos animais resgatados.
              </p>
              {typeof ong.teamSize === 'number' && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-700">
                  <Users className="h-3.5 w-3.5" />
                  {ong.teamSize} pessoas na equipe
                </div>
              )}
            </section>
          </aside>
        </div>

        <div className="mt-6">
          <OngPetsSection pets={pets} isLoading={isLoadingPets} />
        </div>
      </div>
    </div>
  );
}

