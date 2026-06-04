import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dog,
  Home,
  Info,
  Instagram,
  MapPin,
  Maximize2,
  MessageCircle,
  Play,
  Share2,
  ShieldCheck,
  X,
} from "lucide-react";
import { buildWhatsAppUrl, createAdoptionRequest } from "../services/adoptionService";
import { getPetById, listPets } from "../services/petService";

const cn = (...inputs) => twMerge(clsx(inputs));

const ageLabel = (idade) => {
  if (!idade) return "";
  const valor = idade.valor ?? idade.value ?? idade.amount;
  const tipo = idade.tipo ?? idade.unit ?? "anos";

  if (!valor) return "";
  if (tipo === "meses") {
    return `${valor} ${valor === 1 ? "mÃªs" : "meses"}`;
  }
  return `${valor} ${valor === 1 ? "ano" : "anos"}`;
};

const temperamentoLabel = (value) => {
  const map = {
    docil: "DÃ³cil",
    brincalhao: "BrincalhÃ£o",
    calmo: "Calmo",
    ativo: "Ativo",
    protetor: "Protetor",
    sociavel: "SociÃ¡vel",
    timido: "TÃ­mido",
  };
  return map[value] ?? value;
};

const condicaoLabel = (value) => {
  const map = {
    cegueira: "Cegueira",
    sem_pata: "AmputaÃ§Ã£o",
    cardiopatia: "Cardiopatia",
    surdez: "Surdez",
    cuidados_continuos: "Cuidados contÃ­nuos",
  };
  return map[value] ?? value;
};

const matchSchema = z.object({
  temOutrosPets: z.enum(["sim", "nao"]),
  tempoEmCasa: z.enum(["pouco", "medio", "muito"]),
  espaco: z.enum(["pequeno", "medio", "grande"]),
  experiencia: z.enum(["iniciante", "intermediario", "avancado"]),
});

const adoptionSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  telefone: z.string().min(8, "Informe um telefone valido"),
  bairro: z.string().min(2, "Informe o bairro onde mora"),
  casaPreparada: z.enum(["sim", "parcialmente", "nao"]),
  precisaDicas: z.enum(["sim", "nao"]),
  experienciaPets: z.enum(["sim", "nao"]),
});

const mapPetToDetail = (pet) => ({
  id: pet.id,
  nome: pet.name,
  especie: pet.species === "dog" ? "cachorro" : pet.species === "cat" ? "gato" : pet.species,
  raca: pet.breed,
  idade: {
    valor: Number.parseInt(pet.age, 10) || pet.age || "Adulto",
    tipo: String(pet.age || "").includes("mes") ? "meses" : "anos",
  },
  porte: pet.size,
  sexo: pet.sex || pet.gender,
  vacinado: true,
  castrado: pet.tags?.some((tag) => String(tag).toLowerCase().includes("castrad")) || false,
  vermifugado: true,
  condicoesEspeciais: [],
  temperamento: pet.tags || ["docil", "sociavel"],
  historia: pet.description,
  status: pet.status,
  personality: pet.personality,
  healthStatus: pet.healthStatus,
  childrenCompatibility: pet.childrenCompatibility,
  catsCompatibility: pet.catsCompatibility,
  dogsCompatibility: pet.dogsCompatibility,
  energyLevel: pet.energyLevel,
  city: pet.city,
  neighborhood: pet.neighborhood,
  sourcePet: pet,
  ong: {
    nome: pet.ongData?.name || pet.ong || "ONG Parceira",
    contato: pet.ongData?.whatsapp || "(71) 99999-0000",
    cidade: pet.city || pet.ongData?.city || "Salvador",
    bairro: pet.neighborhood || pet.ongData?.neighborhood || "",
    email: pet.ongData?.email || "contato@ong.org",
    whatsapp: pet.ongData?.whatsapp || "(71) 99999-0000",
    id: pet.ong_id || pet.ongData?.id,
  },
  gallery: [
    {
      id: `${pet.id}-main`,
      type: "image",
      thumbUrl: pet.image || pet.image_url,
      fullUrl: pet.image || pet.image_url,
      alt: `Foto de ${pet.name}`,
    },
  ],
});

const fetchPetById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const pet = await getPetById(id);
  return pet ? mapPetToDetail(pet) : null;
};

const fetchSimilarPets = async (pet) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const pets = await listPets();
  const similar = pets
    .filter((item) => item.id !== pet.id && (item.species === pet.sourcePet?.species || item.city === pet.city))
    .slice(0, 4)
    .map(mapPetToDetail);
  return similar;
};

const badgeClass =
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight";

const badgePositive =
  "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30";
const badgeNeutral = "bg-slate-700 text-slate-300 ring-1 ring-slate-600";
const badgeWarning = "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30";

function MatchSimulator({ pet }) {
  const [formValues, setFormValues] = useState({
    temOutrosPets: "nao",
    tempoEmCasa: "medio",
    espaco: "medio",
    experiencia: "intermediario",
  });
  const [matchResult, setMatchResult] = useState(null);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    const parsed = matchSchema.safeParse(formValues);
    if (!parsed.success) {
      setMatchResult({
        value: 40,
        status: "Ajuste alguns pontos para um match melhor.",
      });
      return;
    }

    let score = 60;

    if (formValues.tempoEmCasa === "muito") score += 15;
    if (formValues.espaco === "grande") score += 10;
    if (formValues.experiencia === "avancado") score += 10;
    if (formValues.temOutrosPets === "sim") score += 5;

    if (pet.porte === "grande" && formValues.espaco === "pequeno") score -= 15;
    if (
      pet.temperamento?.includes("ativo") &&
      formValues.tempoEmCasa === "pouco"
    )
      score -= 10;

    const value = Math.max(20, Math.min(100, score));

    const status =
      value >= 85
        ? "Match perfeito! VocÃªs tÃªm tudo para dar muito certo."
        : value >= 70
          ? "Ã“timo match! Com alguns cuidados extras, serÃ¡ uma Ã³tima adoÃ§Ã£o."
          : "Talvez seja melhor conversar com a ONG para entender melhor as necessidades do pet.";

    setMatchResult({ value, status });
  };

  return (
    <section
      aria-labelledby="match-simulator-title"
      className="rounded-3xl border border-slate-700 bg-slate-800/90 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2
            id="match-simulator-title"
            className="text-sm font-semibold text-white sm:text-base"
          >
            Simulador de Match
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Descubra o quÃ£o compatÃ­vel vocÃª Ã© com {pet.nome}.
          </p>
        </div>
      </div>

      <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            VocÃª jÃ¡ tem outros pets?
          </label>
          <div className="flex gap-1.5">
            {["sim", "nao"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleChange("temOutrosPets", value)}
                className={cn(
                  "flex-1 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  formValues.temOutrosPets === value
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                    : "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500",
                )}
              >
                {value === "sim" ? "Sim" : "NÃ£o"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Quanto tempo vocÃª passa em casa?
          </label>
          <select
            value={formValues.tempoEmCasa}
            onChange={(event) =>
              handleChange("tempoEmCasa", event.target.value)
            }
            className="h-9 w-full rounded-full border border-slate-600 bg-slate-700 px-3 text-xs text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
          >
            <option value="pouco">Pouco (atÃ© 4h)</option>
            <option value="medio">MÃ©dio (4h a 8h)</option>
            <option value="muito">Muito (mais de 8h)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            EspaÃ§o disponÃ­vel
          </label>
          <select
            value={formValues.espaco}
            onChange={(event) => handleChange("espaco", event.target.value)}
            className="h-9 w-full rounded-full border border-slate-600 bg-slate-700 px-3 text-xs text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
          >
            <option value="pequeno">Pequeno</option>
            <option value="medio">MÃ©dio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-500">
            Sua experiÃªncia com pets
          </label>
          <select
            value={formValues.experiencia}
            onChange={(event) =>
              handleChange("experiencia", event.target.value)
            }
            className="h-9 w-full rounded-full border border-slate-600 bg-slate-700 px-3 text-xs text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">IntermediÃ¡rio</option>
            <option value="avancado">AvanÃ§ado</option>
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
            className="flex items-center gap-2 text-xs text-slate-300"
          >
            <div className="relative h-10 w-10">
              <svg
                className="h-10 w-10 -rotate-90"
                viewBox="0 0 36 36"
                aria-hidden="true"
              >
                <path
                  className="text-slate-700"
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
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
                {matchResult.value}%
              </div>
            </div>
            <p className="max-w-[220px] text-[11px] text-slate-400">
              {matchResult.status}
            </p>
          </Motion.div>
        )}
      </div>
    </section>
  );
}

function AdoptionFormLocal({ pet }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      bairro: "",
      casaPreparada: "sim",
      precisaDicas: "nao",
      experienciaPets: "sim",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    setSubmitError("");
    const labels = {
      sim: "Sim",
      nao: "Nao",
      parcialmente: "Parcialmente",
    };
    const request = {
      adopter_name: values.nome,
      adopter_phone: values.telefone,
      adopter_neighborhood: values.bairro,
      home_prepared: labels[values.casaPreparada],
      needs_guidance: labels[values.precisaDicas],
      has_or_had_pets: labels[values.experienciaPets],
    };

    try {
      const saved = await createAdoptionRequest({
        pet: {
          id: pet.id,
          name: pet.nome,
          city: pet.city || pet.ong.cidade,
          ong_id: pet.ong.id,
        },
        request,
      });
      window.open(buildWhatsAppUrl(pet.ong.whatsapp, saved.message), "_blank", "noopener,noreferrer");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || "Nao foi possivel enviar o pedido agora.");
    }
  };

  return (
    <section
      aria-labelledby="adoption-form-title"
      className="rounded-3xl border border-slate-700 bg-slate-800/90 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id="adoption-form-title" className="text-sm font-semibold text-white sm:text-base">
            Formulario de pre-adocao
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Envie seus dados principais para a ONG continuar pelo WhatsApp.
          </p>
        </div>
      </div>

      {submitted ? (
        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-6 text-center"
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-white sm:text-base">
            Pedido enviado com sucesso
          </h3>
          <p className="mt-1 max-w-xs text-xs text-slate-400">
            O WhatsApp da ONG foi aberto com sua mensagem organizada.
          </p>
        </Motion.div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs text-slate-300" noValidate>
            {submitError && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/15 p-3 text-rose-100">
                {submitError}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <AdoptionInput label="Nome completo" error={errors.nome?.message}>
                <input type="text" {...register("nome")} className="adoption-field" />
              </AdoptionInput>
              <AdoptionInput label="Telefone / WhatsApp" error={errors.telefone?.message}>
                <input type="tel" {...register("telefone")} className="adoption-field" />
              </AdoptionInput>
              <AdoptionInput label="Bairro onde mora" error={errors.bairro?.message}>
                <input type="text" {...register("bairro")} className="adoption-field" />
              </AdoptionInput>
              <AdoptionInput label="Casa preparada para receber o pet?" error={errors.casaPreparada?.message}>
                <select {...register("casaPreparada")} className="adoption-field">
                  <option value="sim">Sim</option>
                  <option value="parcialmente">Parcialmente</option>
                  <option value="nao">Ainda nao</option>
                </select>
              </AdoptionInput>
              <AdoptionInput label="Precisa de dicas da ONG?" error={errors.precisaDicas?.message}>
                <select {...register("precisaDicas")} className="adoption-field">
                  <option value="nao">Nao</option>
                  <option value="sim">Sim</option>
                </select>
              </AdoptionInput>
              <AdoptionInput label="Ja possui ou ja teve animais?" error={errors.experienciaPets?.message}>
                <select {...register("experienciaPets")} className="adoption-field">
                  <option value="sim">Sim</option>
                  <option value="nao">Nao</option>
                </select>
              </AdoptionInput>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar e falar no WhatsApp"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </FormProvider>
      )}
    </section>
  );
}

function AdoptionInput({ label, error, children }) {
  return (
    <label className="space-y-1.5 text-[11px] font-medium text-slate-500">
      <span>{label}</span>
      {children}
      {error && <p className="text-[11px] text-rose-400">{error}</p>}
    </label>
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
    setActiveIndex(
      (prev) => (prev - 1 + pet.gallery.length) % pet.gallery.length,
    );
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, pet.gallery.length]);

  return (
    <section
      aria-label={`Galeria de mÃ­dia do pet ${pet.nome}`}
      className="space-y-3"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="order-2 flex w-full gap-2 md:order-1 md:w-28 md:flex-col">
          {pet.gallery.map((media, index) => (
            <button
              key={media.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border transition",
                activeIndex === index
                  ? "border-emerald-500 ring-2 ring-emerald-500/30"
                  : "border-transparent hover:border-slate-500",
              )}
            >
              <img
                src={media.thumbUrl}
                alt={media.alt}
                loading="lazy"
                className="h-20 w-full bg-slate-950 object-contain md:h-20"
              />
              {media.type === "video" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                  <Play className="h-5 w-5 drop-shadow" />
                </div>
              )}
              {media.type === "panorama" && (
                <div className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                  360Â°
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="order-1 relative w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 md:order-2">
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
              className="h-full w-full bg-slate-950 object-contain transition duration-500"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
              <Dog className="h-3.5 w-3.5" />
              <span className="capitalize">{pet.especie}</span>
            </div>
            <button
              type="button"
              aria-label="Ver mÃ­dia em tela cheia"
              className="pointer-events-auto absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/60 p-1.5 text-white shadow-sm transition hover:bg-black/80"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </Motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[11px] text-white">
            <span className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1">
              <Info className="h-3.5 w-3.5" />
              <span>Zoom disponÃ­vel</span>
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
            className="fixed inset-0 z-50 bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria em tela cheia do pet ${pet.nome}`}
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between px-4 py-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Dog className="h-4 w-4" />
                  <span>
                    {pet.nome} Â· {pet.especie}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-1.5 text-slate-200 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label="MÃ­dia anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label="PrÃ³xima mÃ­dia"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <Motion.div
                  key={mainMedia.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[80vh] max-w-5xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/60 p-2"
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
    queryKey: ["similarPets", basePet.id],
    queryFn: () => fetchSimilarPets(basePet),
    enabled: !!basePet,
    staleTime: 5 * 60 * 1000,
  });

  if (!basePet) return null;

  return (
    <section aria-labelledby="similar-pets-title" className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2
          id="similar-pets-title"
          className="text-sm font-semibold text-white sm:text-base"
        >
          Pets similares
        </h2>
        <p className="text-[11px] text-slate-400">
          Mesma ONG ou perfil parecido com {basePet.nome}.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-slate-700 bg-slate-800/60 p-3"
            >
              <div className="mb-3 h-28 rounded-xl bg-slate-700" />
              <div className="mb-1 h-4 w-2/3 rounded bg-slate-700" />
              <div className="h-3 w-1/2 rounded bg-slate-700" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {similarPets.map((pet) => (
            <article
              key={pet.id}
              className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                <img
                  src={pet.gallery[0].thumbUrl}
                  alt={pet.gallery[0].alt}
                  loading="lazy"
                  className="h-full w-full bg-slate-950 object-contain transition duration-500"
                />
                <div className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                  {pet.porte} Â· {pet.sexo === "femea" ? "FÃªmea" : "Macho"}
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 text-xs text-slate-300">
                <h3 className="text-sm font-semibold text-white">{pet.nome}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const petId = id ?? "1";

  const {
    data: pet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => fetchPetById(petId),
    staleTime: 5 * 60 * 1000,
  });

  const toastTimeoutRef = useRef(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, variant = "success") => {
    setToast({ message, variant });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const handleShareWhatsApp = () => {
    if (!pet) return;
    const url = window.location.href;
    const text = `Ola! Tenho interesse em saber mais sobre o pet ${pet.nome}. ${url}`;
    const link = buildWhatsAppUrl(pet.ong.whatsapp, text);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleShareInstagram = () => {
    if (!pet) return;
    showToast(
      "Abrindo cÃ¢mera do Instagram (simulaÃ§Ã£o). Use o link do pet na sua story.",
      "neutral",
    );
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const structuredTemperamento = useMemo(
    () => pet?.temperamento?.map((value) => temperamentoLabel(value)) ?? [],
    [pet?.temperamento],
  );

  const structuredCondicoes = useMemo(
    () => pet?.condicoesEspeciais?.map((value) => condicaoLabel(value)) ?? [],
    [pet?.condicoesEspeciais],
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <a
        href="#pet-detail-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para conteÃºdo principal
      </a>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-6 w-2/3 rounded bg-slate-800" />
            <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              <div className="h-80 rounded-3xl bg-slate-800" />
              <div className="space-y-3">
                <div className="h-5 w-3/4 rounded bg-slate-800" />
                <div className="h-4 w-2/3 rounded bg-slate-800" />
                <div className="h-4 w-1/2 rounded bg-slate-800" />
                <div className="mt-4 h-10 w-full rounded-2xl bg-slate-800" />
              </div>
            </div>
          </div>
        ) : isError || !pet ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-lg font-semibold text-white">
              NÃ£o foi possÃ­vel carregar os detalhes do pet
            </h1>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              Tente atualizar a pÃ¡gina ou voltar para a lista de pets para
              escolher outro amigo.
            </p>
          </div>
        ) : (
          <>
            <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-400">
                  <Dog className="h-3.5 w-3.5" />
                  <span>Detalhes do pet</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {pet.nome}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    {pet.ong.cidade}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span className="capitalize">{pet.especie}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span className="capitalize">{pet.porte}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span>{ageLabel(pet.idade)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span className="capitalize">
                    {pet.sexo === "femea" ? "FÃªmea" : "Macho"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm border border-slate-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  AdoÃ§Ã£o responsÃ¡vel
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
                  className="mt-4 rounded-3xl border border-slate-700 bg-slate-800/90 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2
                      id="pet-info-title"
                      className="text-sm font-semibold text-white sm:text-base"
                    >
                      InformaÃ§Ãµes sobre {pet.nome}
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                      <Info className="h-3.5 w-3.5" />
                      Perfil verificado pela ONG
                    </span>
                  </div>

                  <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Dados gerais
                      </h3>
                      <dl className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                        <div>
                          <dt className="text-[11px] text-slate-500">
                            EspÃ©cie
                          </dt>
                          <dd className="font-medium capitalize text-white">
                            {pet.especie}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">RaÃ§a</dt>
                          <dd className="font-medium text-white">{pet.raca}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Porte</dt>
                          <dd className="font-medium capitalize text-white">
                            {pet.porte}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Idade</dt>
                          <dd className="font-medium text-white">
                            {ageLabel(pet.idade)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        SaÃºde
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={cn(
                            badgeClass,
                            pet.vacinado ? badgePositive : badgeNeutral,
                          )}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.vacinado ? "Vacinado" : "NÃ£o vacinado"}
                        </span>
                        <span
                          className={cn(
                            badgeClass,
                            pet.castrado ? badgePositive : badgeNeutral,
                          )}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.castrado ? "Castrado" : "NÃ£o castrado"}
                        </span>
                        <span
                          className={cn(
                            badgeClass,
                            "bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/20",
                          )}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {pet.healthStatus || "saudavel"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Compatibilidade
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={cn(badgeClass, "bg-slate-700 text-slate-300 ring-1 ring-slate-600")}>
                          Criancas: {pet.childrenCompatibility || "nao testado"}
                        </span>
                        <span className={cn(badgeClass, "bg-slate-700 text-slate-300 ring-1 ring-slate-600")}>
                          Gatos: {pet.catsCompatibility || "nao testado"}
                        </span>
                        <span className={cn(badgeClass, "bg-slate-700 text-slate-300 ring-1 ring-slate-600")}>
                          Caes: {pet.dogsCompatibility || "nao testado"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Perfil
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[pet.personality, `energia ${pet.energyLevel || "media"}`, ...structuredTemperamento.slice(0, 2)]
                          .filter(Boolean)
                          .map((label) => (
                            <span
                              key={label}
                              className={cn(
                                badgeClass,
                                "bg-slate-700 text-slate-300 ring-1 ring-slate-600",
                              )}
                            >
                              {label}
                            </span>
                          ))}
                      </div>
                    </div>

                    {structuredCondicoes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          CondiÃ§Ãµes especiais
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {structuredCondicoes.map((label) => (
                            <span
                              key={label}
                              className={cn(
                                badgeClass,
                                badgeWarning,
                                "flex items-center gap-1",
                              )}
                            >
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {label}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Pets com condiÃ§Ãµes especiais tambÃ©m merecem um lar. A
                          ONG darÃ¡ todo apoio necessÃ¡rio.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      HistÃ³ria
                    </h3>
                    <p className="leading-relaxed text-slate-300">
                      {pet.historia}
                    </p>
                  </div>
                </section>
              </div>

              <aside className="space-y-4 md:space-y-5">
                <section
                  aria-labelledby="ong-section-title"
                  className="rounded-3xl border border-slate-700 bg-slate-800 px-5 py-4 text-slate-200 shadow-sm"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <Home className="h-4 w-4" />
                    </div>
                    <div>
                      <h2
                        id="ong-section-title"
                        className="text-sm font-semibold text-white sm:text-base"
                      >
                        ONG {pet.ong.nome}
                      </h2>
                      <p className="mt-1 text-xs text-slate-400">
                        OrganizaÃ§Ã£o parceira verificada. Todas as adoÃ§Ãµes passam
                        por entrevista e termo de responsabilidade.
                      </p>
                    </div>
                  </div>

                  <dl className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      <span>{pet.ong.cidade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                      <span>WhatsApp: {pet.ong.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-3.5 w-3.5 text-slate-500" />
                      <span>E-mail: {pet.ong.email}</span>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.97]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Falar com a ONG
                    </button>
                    <button
                      type="button"
                      onClick={handleShareInstagram}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 shadow-sm transition hover:bg-slate-700 active:scale-[0.97]"
                    >
                      <Share2 className="h-4 w-4" />
                      Compartilhar perfil
                    </button>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-500">
                    Seus dados serÃ£o compartilhados apenas com a ONG responsÃ¡vel
                    por este pet.
                  </p>
                </section>

                <MatchSimulator pet={pet} />

                <AdoptionFormLocal pet={pet} />

                <section
                  aria-label="Compartilhar pet"
                  className="rounded-3xl border border-dashed border-slate-700 bg-slate-800/50 p-4 text-xs text-slate-300"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-slate-500" />
                    <h2 className="text-xs font-semibold text-white">
                      Compartilhe {pet.nome} com seus amigos
                    </h2>
                  </div>
                  <p className="mb-3 text-[11px] text-slate-400">
                    Quanto mais pessoas conhecerem {pet.nome}, maiores as
                    chances de encontrar um lar.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-700"
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
                "pointer-events-auto flex items-center gap-2 rounded-2xl px-3 py-2 text-xs shadow-lg",
                toast.variant === "success"
                  ? "bg-emerald-600 text-emerald-50"
                  : "bg-slate-800 text-slate-200 border border-slate-700",
              )}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/20">
                <Info className="h-3.5 w-3.5" />
              </span>
              <p className="flex-1">{toast.message}</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


