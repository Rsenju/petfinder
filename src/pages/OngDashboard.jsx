import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  PawPrint,
  Plus,
  Save,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { COMPATIBILITY_OPTIONS, ENERGY_LEVELS, HEALTH_OPTIONS_BY_SPECIES } from "../data/mockData";
import { createImagePreview, uploadPetImages, validateRemoteHorizontalImage } from "../services/imageService";
import { listAdoptionRequests } from "../services/adoptionService";
import { deletePet, listPets, savePet } from "../services/petService";
import { upsertOng } from "../services/ongService";
import { createId } from "../services/storage";

const emptyPet = {
  name: "",
  species: "dog",
  breed: "",
  age: "",
  ageType: "adulto",
  size: "medio",
  sex: "macho",
  city: "Salvador",
  neighborhood: "",
  description: "",
  image: "",
  gallery: [],
  imageFiles: [],
  imagePreviews: [],
  status: "available",
  personality: "",
  healthStatus: "saudavel",
  vaccinated: true,
  castrated: false,
  childrenCompatibility: "boa",
  catsCompatibility: "não testado",
  dogsCompatibility: "não testado",
  energyLevel: "medio",
  vaccinationRecord: "",
  veterinaryHistory: "",
  specialNeeds: "",
  medications: "",
  microchip: false,
  weight: "",
  behaviorProfile: "",
  adaptationNeeds: "",
  routine: "",
  feeding: "",
  ongNotes: "",
};

const statusLabels = {
  available: "Disponível",
  in_process: "Em processo",
  adopted: "Adotado",
};

const menuItems = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "pets", label: "Meus Pets", icon: PawPrint },
  { id: "adoptions", label: "Adoções", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
];

const ADVANCED_HEALTH_OPTIONS = {
  vaccinationRecord: [
    ["", "Selecionar situação"],
    ["Vacinas essenciais em dia.", "Vacinas essenciais em dia"],
    ["Vacinação em atualização pela ONG.", "Vacinação em atualização"],
    ["Primeira dose aplicada; reforço pendente.", "Primeira dose aplicada"],
    ["Sem registro confirmado no momento.", "Sem registro confirmado"],
  ],
  veterinaryHistory: [
    ["", "Selecionar histórico"],
    ["Avaliação veterinária recente sem alterações importantes.", "Avaliação recente sem alterações"],
    ["Avaliado pela ONG e liberado para adoção responsável.", "Liberado para adoção"],
    ["Acompanhamento preventivo recomendado.", "Acompanhamento preventivo"],
    ["Retorno veterinário indicado após adaptação.", "Retorno após adaptação"],
  ],
  specialNeeds: [
    ["", "Selecionar necessidade"],
    ["Não possui necessidades especiais conhecidas.", "Sem necessidade especial"],
    ["Precisa de ambiente calmo e rotina previsível.", "Ambiente calmo"],
    ["Precisa de adaptação gradual no novo lar.", "Adaptação gradual"],
    ["Precisa de acompanhamento simples por idade.", "Acompanhamento por idade"],
  ],
  medications: [
    ["", "Selecionar medicação"],
    ["Não usa medicação contínua.", "Não usa medicação contínua"],
    ["Sem medicação fixa no momento.", "Sem medicação fixa"],
    ["Uso pontual conforme orientação veterinária.", "Uso pontual orientado"],
    ["Manter retorno indicado pela ONG.", "Retorno indicado pela ONG"],
  ],
};

const BEHAVIOR_ROUTINE_OPTIONS = {
  behaviorProfile: [
    ["", "Selecionar perfil"],
    ["Dócil e sociável.", "Dócil e sociável"],
    ["Calmo e observador.", "Calmo e observador"],
    ["Brincalhão e ativo.", "Brincalhão e ativo"],
    ["Tímido no início, mas ganha confiança com paciência.", "Tímido no início"],
    ["Carinhoso e apegado à rotina.", "Carinhoso e rotineiro"],
  ],
  adaptationNeeds: [
    ["", "Selecionar adaptação"],
    ["Adaptação tranquila, sem necessidade especial.", "Adaptação tranquila"],
    ["Adaptação gradual ao novo lar nos primeiros dias.", "Adaptação gradual"],
    ["Precisa de apresentação cuidadosa a outros animais.", "Apresentação cuidadosa"],
    ["Precisa de família paciente e ambiente previsível.", "Família paciente"],
  ],
  routine: [
    ["", "Selecionar rotina"],
    ["Rotina simples com alimentação, descanso e interação diária.", "Rotina simples"],
    ["Precisa de passeios curtos e rotina estável.", "Passeios curtos"],
    ["Vai bem em apartamento com enriquecimento ambiental.", "Apartamento com enriquecimento"],
    ["Precisa de espaço seguro e supervisão inicial.", "Espaço seguro"],
  ],
  feeding: [
    ["", "Selecionar alimentação"],
    ["Ração seca de boa qualidade, conforme porte e idade.", "Ração seca adequada"],
    ["Alimentação orientada pela ONG no contato inicial.", "Orientação da ONG"],
    ["Pode precisar de transição alimentar gradual.", "Transição gradual"],
    ["Sensibilidade alimentar leve; evitar trocas bruscas.", "Evitar trocas bruscas"],
  ],
};

const withCurrentOption = (options, value) => {
  if (!value || options.some(([optionValue]) => optionValue === value)) return options;
  return [...options, [value, value]];
};

const formGridClass = "grid gap-4 md:grid-cols-2";
const fieldLabelClass = "block min-w-0 text-sm font-medium leading-5 text-slate-300";
const controlClass =
  "mt-1.5 h-11 w-full min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm leading-5 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";

const healthOptionLabel = (value) => {
  const labels = {
    saudavel: "Saudável",
    vermifugado: "Vermifugado",
    vacinado: "Vacinado",
    castrado: "Castrado",
    "em tratamento contra doenca do carrapato": "Em tratamento contra doença do carrapato",
    "histórico de sarna tratada": "Histórico de sarna tratada",
    "pele sensivel": "Pele sensível",
    "dermatite leve": "Dermatite leve",
    "alergia alimentar": "Alergia alimentar",
    "ansiedade por abandono": "Ansiedade por abandono",
    "muito assustado no inicio": "Muito assustado no início",
    "precisa ganhar peso": "Precisa ganhar peso",
    "otite leve": "Otite leve",
    "precisa de adaptação com outros cães": "Precisa de adaptação com outros cães",
    idoso: "Idoso",
    "baixa visão": "Baixa visão",
    "FIV positivo": "FIV positivo",
    "FELV positivo": "FELV positivo",
    "histórico de esporotricose tratada": "Histórico de esporotricose tratada",
    "sensibilidade alimentar": "Sensibilidade alimentar",
    "muito timido": "Muito tímido",
    "problema respiratorio leve": "Problema respiratório leve",
    "infeccao ocular tratada": "Infecção ocular tratada",
    "precisa de ambiente calmo": "Precisa de ambiente calmo",
  };

  return labels[value] || value;
};

export function OngDashboard() {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [petForm, setPetForm] = useState(emptyPet);
  const [ongForm, setOngForm] = useState(user?.ong || {});
  const [editingPetId, setEditingPetId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const ong = user?.ong || ongForm;
  const ongId = user?.ongId || ong?.id || "ong_001";

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      setError("");
      try {
        const [data, adoptionRequests] = await Promise.all([
          listPets({ ongId }),
          listAdoptionRequests({ ongId }),
        ]);
        if (isMounted) {
          setPets(data);
          setRequests(adoptionRequests);
        }
      } catch (loadError) {
        if (isMounted) setError(loadError.message || "Não foi possível carregar o painel.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [ongId]);

  useEffect(() => {
    if (user?.ong) setOngForm(user.ong);
  }, [user]);

  const stats = useMemo(
    () => [
      { label: "Pets cadastrados", value: pets.length },
      { label: "Disponiveis", value: pets.filter((pet) => pet.status === "available").length },
      { label: "Em processo", value: pets.filter((pet) => pet.status === "in_process").length },
      { label: "Adotados", value: pets.filter((pet) => pet.status === "adopted").length },
    ],
    [pets],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2400);
  };

  const visiblePets = useMemo(
    () => (statusFilter === "all" ? pets : pets.filter((pet) => pet.status === statusFilter)),
    [pets, statusFilter],
  );

  const handlePetSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!petForm.name || !petForm.city || !petForm.description) {
      showMessage("Preencha nome, cidade e descrição do pet.");
      return;
    }

    const hasNewImageFiles = petForm.imageFiles?.length > 0;
    if (!hasNewImageFiles && !petForm.image && !petForm.gallery?.length) {
      showMessage("Adicione pelo menos uma foto horizontal do pet.");
      return;
    }

    if (!hasNewImageFiles && petForm.image) {
      const validation = await validateRemoteHorizontalImage(petForm.image);
      if (!validation.valid) {
        showMessage(validation.message);
        return;
      }
    }

    try {
      const nextPetId = editingPetId || createId("pet");
      const uploadedImages = hasNewImageFiles
        ? await uploadPetImages(petForm.imageFiles, { petId: nextPetId, ongId })
        : null;
      const currentGallery = petForm.gallery?.length
        ? petForm.gallery
        : [petForm.image].filter(Boolean);
      const gallery = uploadedImages?.urls?.length ? uploadedImages.urls : currentGallery;
      const coverImage = uploadedImages?.coverUrl || petForm.image || gallery[0] || "";

      const saved = await savePet({
        ...petForm,
        id: nextPetId,
        ong_id: ongId,
        ong: ong?.name,
        ongData: ong,
        location: `${petForm.city}, BA`,
        image: coverImage,
        image_url: coverImage,
        gallery,
        imageGallery: gallery,
        imageMetadata: uploadedImages?.metadata || petForm.imageMetadata || {},
        personality: petForm.personality,
        healthStatus: petForm.healthStatus,
        vaccinated: petForm.vaccinated,
        castrated: petForm.castrated,
        childrenCompatibility: petForm.childrenCompatibility,
        catsCompatibility: petForm.catsCompatibility,
        dogsCompatibility: petForm.dogsCompatibility,
        energyLevel: petForm.energyLevel,
        vaccinationRecord: petForm.vaccinationRecord,
        veterinaryHistory: petForm.veterinaryHistory,
        specialNeeds: petForm.specialNeeds,
        medications: petForm.medications,
        microchip: petForm.microchip,
        weight: petForm.weight,
        behaviorProfile: petForm.behaviorProfile,
        adaptationNeeds: petForm.adaptationNeeds,
        routine: petForm.routine,
        feeding: petForm.feeding,
        ongNotes: petForm.ongNotes,
        tags: [petForm.personality, petForm.healthStatus, petForm.energyLevel].filter(Boolean),
      });

      setPets((current) =>
        editingPetId
          ? current.map((pet) => (pet.id === saved.id ? saved : pet))
          : [saved, ...current],
      );
      setPetForm(emptyPet);
      setEditingPetId(null);
      showMessage(editingPetId ? "Pet atualizado com sucesso." : "Pet cadastrado com sucesso.");
    } catch (submitError) {
      setError(submitError.message || "Não foi possível salvar o pet.");
    }
  };

  const handleEditPet = (pet) => {
    setEditingPetId(pet.id);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || "",
      age: pet.age,
      ageType: pet.ageType || "adulto",
      size: pet.size,
      sex: pet.sex,
      city: pet.city,
      neighborhood: pet.neighborhood || "",
      description: pet.description,
      image: pet.image,
      gallery: pet.gallery || [pet.image].filter(Boolean),
      imageFiles: [],
      imagePreviews: pet.gallery || [pet.image].filter(Boolean),
      status: pet.status,
      personality: pet.personality || "",
      healthStatus: pet.healthStatus || "saudavel",
      vaccinated: Boolean(pet.vaccinated),
      castrated: Boolean(pet.castrated),
      childrenCompatibility: pet.childrenCompatibility || "boa",
      catsCompatibility: pet.catsCompatibility || "não testado",
      dogsCompatibility: pet.dogsCompatibility || "não testado",
      energyLevel: pet.energyLevel || "medio",
      vaccinationRecord: pet.vaccinationRecord || "",
      veterinaryHistory: pet.veterinaryHistory || "",
      specialNeeds: pet.specialNeeds || "",
      medications: pet.medications || "",
      microchip: Boolean(pet.microchip),
      weight: pet.weight || "",
      behaviorProfile: pet.behaviorProfile || "",
      adaptationNeeds: pet.adaptationNeeds || "",
      routine: pet.routine || "",
      feeding: pet.feeding || "",
      ongNotes: pet.ongNotes || "",
    });
    setActiveTab("pets");
  };

  const handleDeletePet = async (id) => {
    const confirmed = window.confirm("Remover este pet? Esta ação não pode ser desfeita.");
    if (!confirmed) return;
    await deletePet(id);
    setPets((current) => current.filter((pet) => pet.id !== id));
    showMessage("Pet removido.");
  };

  const handleStatusChange = async (pet, status) => {
    const saved = await savePet({ ...pet, status });
    setPets((current) => current.map((item) => (item.id === pet.id ? saved : item)));
    showMessage("Status atualizado.");
  };

  const handleOngSubmit = async (event) => {
    event.preventDefault();
    if (!ongForm.name || !ongForm.whatsapp || !ongForm.city) {
      showMessage("Preencha nome, WhatsApp e cidade da ONG.");
      return;
    }
    const saved = await upsertOng({ ...ongForm, id: ongId });
    await updateUser({ ong: saved });
    setOngForm(saved);
    showMessage("Dados da ONG atualizados.");
  };

  const renderContent = () => {
    if (activeTab === "pets") {
      return (
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <PetForm
            form={petForm}
            setForm={setPetForm}
            onSubmit={handlePetSubmit}
            editing={Boolean(editingPetId)}
            onCancel={() => {
              setPetForm(emptyPet);
              setEditingPetId(null);
            }}
          />
          <PetsTable
            pets={visiblePets}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onEdit={handleEditPet}
            onDelete={handleDeletePet}
            onStatusChange={handleStatusChange}
          />
        </div>
      );
    }

    if (activeTab === "adoptions") {
      return (
        <section className="rounded-xl border border-slate-700 bg-slate-800">
          <div className="border-b border-slate-700 p-4">
            <h2 className="font-semibold">Pedidos recebidos</h2>
          </div>
          {requests.length === 0 ? (
            <p className="p-8 text-center text-slate-400">Nenhum pedido de adoção recebido ainda.</p>
          ) : (
            <div className="divide-y divide-slate-700">
              {requests.map((request) => (
                <article key={request.id} className="p-4">
                  <p className="font-medium">{request.adopter_name}</p>
                  <p className="text-sm text-slate-400">{request.adopter_phone} - {request.adopter_neighborhood}</p>
                  <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-900 p-3 text-xs text-slate-300">
                    {request.message}
                  </pre>
                </article>
              ))}
            </div>
          )}
        </section>
      );
    }

    if (activeTab === "settings") {
      return <OngSettings form={ongForm} setForm={setOngForm} onSubmit={handleOngSubmit} />;
    }

    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h2 className="text-lg font-semibold">Próximas ações</h2>
          <p className="mt-2 text-slate-400">
            Mantenha WhatsApp, cidade e bairro atualizados para receber pedidos de adoção corretamente.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white md:flex">
      <aside className="border-b border-slate-800 bg-slate-950 p-4 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
        <div className="mb-6">
          <p className="text-sm text-slate-400">Painel da ONG</p>
          <h1 className="mt-1 text-xl font-bold">{ong?.name || "ONG"}</h1>
        </div>
        <nav className="grid gap-2 sm:grid-cols-4 md:grid-cols-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeTab === item.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        {isLoading && (
          <div className="mb-5 rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300">
            Carregando dados do painel...
          </div>
        )}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-100">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-3 text-sm text-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
}

function PetForm({ form, setForm, onSubmit, editing, onCancel }) {
  const [imageError, setImageError] = useState("");
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const previews = form.imagePreviews?.length
    ? form.imagePreviews
    : form.gallery?.length
      ? form.gallery
      : [form.image].filter(Boolean);

  const handleImageFilesChange = async (event) => {
    const files = Array.from(event.target.files || []);
    setImageError("");

    if (!files.length) {
      setForm((current) => ({ ...current, imageFiles: [], imagePreviews: [] }));
      return;
    }

    if (files.length > 5) {
      setImageError("Envie no máximo 5 imagens por pet.");
      event.target.value = "";
      return;
    }

    try {
      const validations = await Promise.all(files.map((file) => createImagePreview(file)));
      const invalid = validations.find((item) => !item.valid);
      if (invalid) {
        setImageError(invalid.message);
        event.target.value = "";
        return;
      }

      setForm((current) => ({
        ...current,
        imageFiles: files,
        imagePreviews: validations.map((item) => item.previewUrl),
        image: validations[0]?.previewUrl || current.image,
      }));
    } catch (fileError) {
      setImageError(fileError.message || "Não foi possível validar as imagens.");
      event.target.value = "";
    }
  };

  const clearImages = () => {
    setImageError("");
    setForm((current) => ({ ...current, image: "", gallery: [], imageFiles: [], imagePreviews: [] }));
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <Plus className="h-5 w-5 text-blue-300" />
        {editing ? "Editar pet" : "Cadastrar pet"}
      </h2>
      <div className="grid gap-4">
        <Input label="Nome" value={form.name} onChange={(value) => update("name", value)} required />
        <div className={formGridClass}>
          <Select label="Espécie" value={form.species} onChange={(value) => update("species", value)} options={[["dog", "Cachorro"], ["cat", "Gato"]]} />
          <Select label="Status" value={form.status} onChange={(value) => update("status", value)} options={Object.entries(statusLabels)} />
        </div>
        <div className={formGridClass}>
          <Input label="Raça" value={form.breed} onChange={(value) => update("breed", value)} />
          <Input label="Idade" value={form.age} onChange={(value) => update("age", value)} placeholder="2 anos" />
        </div>
        <div className={formGridClass}>
          <Select label="Porte" value={form.size} onChange={(value) => update("size", value)} options={[["pequeno", "Pequeno"], ["medio", "Médio"], ["grande", "Grande"]]} />
          <Select label="Sexo" value={form.sex} onChange={(value) => update("sex", value)} options={[["macho", "Macho"], ["femea", "Fêmea"]]} />
        </div>
        <div className={formGridClass}>
          <Input label="Personalidade" value={form.personality} onChange={(value) => update("personality", value)} placeholder="carinhoso e tranquilo" />
          <Select
            label="Status de saúde"
            value={form.healthStatus}
            onChange={(value) => update("healthStatus", value)}
            options={(HEALTH_OPTIONS_BY_SPECIES[form.species] || []).map((value) => [value, healthOptionLabel(value)])}
          />
        </div>
        <div className={formGridClass}>
          <Select label="Vacinação" value={String(form.vaccinated)} onChange={(value) => update("vaccinated", value === "true")} options={[["true", "Vacinado"], ["false", "Não vacinado"]]} />
          <Select label="Castração" value={String(form.castrated)} onChange={(value) => update("castrated", value === "true")} options={[["true", "Castrado"], ["false", "Não castrado"]]} />
        </div>
        <div className={formGridClass}>
          <Select label="Crianças" value={form.childrenCompatibility} onChange={(value) => update("childrenCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
          <Select label="Gatos" value={form.catsCompatibility} onChange={(value) => update("catsCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
        </div>
        <div className={formGridClass}>
          <Select label="Cães" value={form.dogsCompatibility} onChange={(value) => update("dogsCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
          <Select label="Nível de energia" value={form.energyLevel} onChange={(value) => update("energyLevel", value)} options={ENERGY_LEVELS.map((item) => [item.value, item.label])} />
        </div>

        <Fieldset title="Saúde avançada">
          <div className={formGridClass}>
            <Input label="Peso" value={form.weight} onChange={(value) => update("weight", value)} placeholder="14 kg" />
            <Select label="Microchip" value={String(form.microchip)} onChange={(value) => update("microchip", value === "true")} options={[["false", "Não possui"], ["true", "Possui microchip"]]} />
          </div>
          <div className={formGridClass}>
            <Select label="Carteira de vacinação" value={form.vaccinationRecord} onChange={(value) => update("vaccinationRecord", value)} options={withCurrentOption(ADVANCED_HEALTH_OPTIONS.vaccinationRecord, form.vaccinationRecord)} />
            <Select label="Histórico veterinário" value={form.veterinaryHistory} onChange={(value) => update("veterinaryHistory", value)} options={withCurrentOption(ADVANCED_HEALTH_OPTIONS.veterinaryHistory, form.veterinaryHistory)} />
            <Select label="Necessidades especiais" value={form.specialNeeds} onChange={(value) => update("specialNeeds", value)} options={withCurrentOption(ADVANCED_HEALTH_OPTIONS.specialNeeds, form.specialNeeds)} />
            <Select label="Medicações" value={form.medications} onChange={(value) => update("medications", value)} options={withCurrentOption(ADVANCED_HEALTH_OPTIONS.medications, form.medications)} />
          </div>
        </Fieldset>

        <Fieldset title="Comportamento e rotina">
          <div className={formGridClass}>
            <Select label="Perfil comportamental" value={form.behaviorProfile} onChange={(value) => update("behaviorProfile", value)} options={withCurrentOption(BEHAVIOR_ROUTINE_OPTIONS.behaviorProfile, form.behaviorProfile)} />
            <Select label="Adaptação recomendada" value={form.adaptationNeeds} onChange={(value) => update("adaptationNeeds", value)} options={withCurrentOption(BEHAVIOR_ROUTINE_OPTIONS.adaptationNeeds, form.adaptationNeeds)} />
            <Select label="Rotina" value={form.routine} onChange={(value) => update("routine", value)} options={withCurrentOption(BEHAVIOR_ROUTINE_OPTIONS.routine, form.routine)} />
            <Select label="Alimentação" value={form.feeding} onChange={(value) => update("feeding", value)} options={withCurrentOption(BEHAVIOR_ROUTINE_OPTIONS.feeding, form.feeding)} />
          </div>
          <TextArea label="Observações da ONG" value={form.ongNotes} onChange={(value) => update("ongNotes", value)} minHeight="min-h-16" />
        </Fieldset>

        <div className={formGridClass}>
          <Input label="Cidade" value={form.city} onChange={(value) => update("city", value)} required />
          <Input label="Bairro" value={form.neighborhood} onChange={(value) => update("neighborhood", value)} />
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-200">Fotos do pet</p>
              <p className="mt-1 text-xs text-slate-400">
                Use fotos horizontais em JPG, PNG ou WEBP. A primeira imagem será a capa.
              </p>
            </div>
            {previews.length > 0 && (
              <button
                type="button"
                onClick={clearImages}
                className="rounded-lg border border-slate-600 p-2 text-slate-300 hover:bg-slate-800"
                aria-label="Remover imagens selecionadas"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <label className="mt-3 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-950 px-3 py-4 text-center text-sm text-slate-300 hover:border-blue-400 hover:text-blue-200">
            <ImagePlus className="mb-2 h-6 w-6" />
            Selecionar fotos horizontais
            <input
              type="file"
              className="sr-only"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageFilesChange}
            />
          </label>

          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {previews.slice(0, 5).map((url, index) => (
                <div key={`${url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                  <img src={url} alt={`Previa ${index + 1}`} className="h-full w-full object-cover object-center" />
                  {index === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                      Capa
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {imageError && (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-100">
              {imageError}
            </p>
          )}
        </div>
        <Input
          label="URL da foto (opcional)"
          value={form.imageFiles?.length ? "" : form.image}
          onChange={(value) => update("image", value)}
          placeholder="Use se ainda não tiver upload local"
        />
        <TextArea label="Descrição" value={form.description} onChange={(value) => update("description", value)} required minHeight="min-h-28" />
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">
          <Save className="h-4 w-4" />
          {editing ? "Salvar" : "Cadastrar"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-600 px-4 py-2 text-sm">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function PetsTable({ pets, statusFilter, onStatusFilterChange, onEdit, onDelete, onStatusChange }) {
  if (pets.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
        Nenhum pet cadastrado ainda.
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <div className="flex flex-col gap-3 border-b border-slate-700 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold">Pets cadastrados</h2>
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="all">Todos os status</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="divide-y divide-slate-700">
        {pets.map((pet) => (
          <article key={pet.id} className="grid gap-4 p-4 lg:grid-cols-[72px_1fr_auto] lg:items-center">
            <img src={pet.image || pet.image_url} alt={pet.name} className="h-20 w-20 rounded-lg object-cover object-center" />
            <div>
              <h3 className="font-semibold">{pet.name}</h3>
              <p className="text-sm text-slate-400">{pet.city} - {pet.age || "idade não informada"}</p>
              <select
                value={pet.status}
                onChange={(event) => onStatusChange(pet, event.target.value)}
                className="mt-2 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => onEdit(pet)} className="rounded-lg border border-slate-600 p-2 text-slate-200 hover:bg-slate-700" aria-label="Editar pet">
                <Edit3 className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => onDelete(pet.id)} className="rounded-lg border border-red-500/30 p-2 text-red-300 hover:bg-red-500/10" aria-label="Remover pet">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OngSettings({ form, setForm, onSubmit }) {
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  return (
    <form onSubmit={onSubmit} className="max-w-2xl rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="mb-4 font-semibold">Dados da ONG</h2>
      <div className={formGridClass}>
        <Input label="Nome da ONG" value={form.name || ""} onChange={(value) => update("name", value)} required />
        <Input label="Email" value={form.email || ""} onChange={(value) => update("email", value)} />
        <Input label="WhatsApp" value={form.whatsapp || ""} onChange={(value) => update("whatsapp", value)} required />
        <Input label="Cidade" value={form.city || ""} onChange={(value) => update("city", value)} required />
        <Input label="Bairro" value={form.neighborhood || ""} onChange={(value) => update("neighborhood", value)} />
      </div>
      <label className={`${fieldLabelClass} mt-4`}>
        <span className="block whitespace-nowrap">Descrição</span>
        <textarea
          value={form.description || ""}
          onChange={(event) => update("description", event.target.value)}
          className={`${controlClass} min-h-28 resize-y py-2.5`}
        />
      </label>
      <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">
        <Save className="h-4 w-4" />
        Salvar dados
      </button>
    </form>
  );
}

function Input({ label, value, onChange, required, placeholder }) {
  return (
    <label className={fieldLabelClass}>
      <span className="block whitespace-nowrap">{label}</span>
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className={controlClass}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, required, minHeight = "min-h-20" }) {
  return (
    <label className={fieldLabelClass}>
      <span className="block whitespace-nowrap">{label}</span>
      <textarea
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={`${controlClass} ${minHeight} resize-y py-2.5`}
      />
    </label>
  );
}

function Fieldset({ title, children }) {
  return (
    <fieldset className="grid gap-4 rounded-xl border border-slate-700 bg-slate-900/40 p-4">
      <legend className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className={fieldLabelClass}>
      <span className="block whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClass} truncate pr-9`}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}

