import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  LayoutDashboard,
  LogOut,
  PawPrint,
  Plus,
  Save,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { COMPATIBILITY_OPTIONS, ENERGY_LEVELS, HEALTH_OPTIONS_BY_SPECIES } from "../data/mockData";
import { listAdoptionRequests } from "../services/adoptionService";
import { deletePet, listPets, savePet } from "../services/petService";
import { upsertOng } from "../services/ongService";

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
  status: "available",
  personality: "",
  healthStatus: "saudavel",
  vaccinated: true,
  castrated: false,
  childrenCompatibility: "boa",
  catsCompatibility: "nao testado",
  dogsCompatibility: "nao testado",
  energyLevel: "medio",
};

const statusLabels = {
  available: "Disponivel",
  in_process: "Em processo",
  adopted: "Adotado",
};

const anyImageExtension = /\.(jpe?g|png|webp|gif|svg|bmp|avif)(\?.*)?$/i;
const allowedImageExtension = /\.(jpe?g|png|webp)(\?.*)?$/i;

const menuItems = [
  { id: "overview", label: "Visao Geral", icon: LayoutDashboard },
  { id: "pets", label: "Meus Pets", icon: PawPrint },
  { id: "adoptions", label: "Adocoes", icon: Users },
  { id: "settings", label: "Configuracoes", icon: Settings },
];

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
        if (isMounted) setError(loadError.message || "Nao foi possivel carregar o painel.");
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
    if (!petForm.name || !petForm.city || !petForm.description) {
      showMessage("Preencha nome, cidade e descricao do pet.");
      return;
    }
    if (petForm.image) {
      const validation = await validateHorizontalImage(petForm.image);
      if (!validation.valid) {
        showMessage(validation.message);
        return;
      }
    }

    const saved = await savePet({
      ...petForm,
      id: editingPetId,
      ong_id: ongId,
      ong: ong?.name,
      ongData: ong,
      location: `${petForm.city}, BA`,
      image_url: petForm.image,
      personality: petForm.personality,
      healthStatus: petForm.healthStatus,
      vaccinated: petForm.vaccinated,
      castrated: petForm.castrated,
      childrenCompatibility: petForm.childrenCompatibility,
      catsCompatibility: petForm.catsCompatibility,
      dogsCompatibility: petForm.dogsCompatibility,
      energyLevel: petForm.energyLevel,
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
      status: pet.status,
      personality: pet.personality || "",
      healthStatus: pet.healthStatus || "saudavel",
      vaccinated: Boolean(pet.vaccinated),
      castrated: Boolean(pet.castrated),
      childrenCompatibility: pet.childrenCompatibility || "boa",
      catsCompatibility: pet.catsCompatibility || "nao testado",
      dogsCompatibility: pet.dogsCompatibility || "nao testado",
      energyLevel: pet.energyLevel || "medio",
    });
    setActiveTab("pets");
  };

  const handleDeletePet = async (id) => {
    const confirmed = window.confirm("Remover este pet? Esta acao nao pode ser desfeita.");
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
            <p className="p-8 text-center text-slate-400">Nenhum pedido de adocao recebido ainda.</p>
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
          <h2 className="text-lg font-semibold">Proximas acoes</h2>
          <p className="mt-2 text-slate-400">
            Mantenha WhatsApp, cidade e bairro atualizados para receber pedidos de adocao corretamente.
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

function validateHorizontalImage(url) {
  if (anyImageExtension.test(url) && !allowedImageExtension.test(url)) {
    return Promise.resolve({
      valid: false,
      message: "Use imagem horizontal em JPG, PNG ou WEBP.",
    });
  }

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(
        image.naturalWidth > image.naturalHeight
          ? { valid: true }
          : { valid: false, message: "A imagem precisa ser horizontal, com largura maior que altura." },
      );
    };
    image.onerror = () => {
      resolve({ valid: false, message: "Nao foi possivel validar a imagem. Confira a URL informada." });
    };
    image.src = url;
  });
}

function PetForm({ form, setForm, onSubmit, editing, onCancel }) {
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <Plus className="h-5 w-5 text-blue-300" />
        {editing ? "Editar pet" : "Cadastrar pet"}
      </h2>
      <div className="grid gap-3">
        <Input label="Nome" value={form.name} onChange={(value) => update("name", value)} required />
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Especie" value={form.species} onChange={(value) => update("species", value)} options={[["dog", "Cachorro"], ["cat", "Gato"]]} />
          <Select label="Status" value={form.status} onChange={(value) => update("status", value)} options={Object.entries(statusLabels)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Raca" value={form.breed} onChange={(value) => update("breed", value)} />
          <Input label="Idade" value={form.age} onChange={(value) => update("age", value)} placeholder="2 anos" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Porte" value={form.size} onChange={(value) => update("size", value)} options={[["pequeno", "Pequeno"], ["medio", "Medio"], ["grande", "Grande"]]} />
          <Select label="Sexo" value={form.sex} onChange={(value) => update("sex", value)} options={[["macho", "Macho"], ["femea", "Femea"]]} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Personalidade" value={form.personality} onChange={(value) => update("personality", value)} placeholder="carinhoso e tranquilo" />
          <Select
            label="Status de saude"
            value={form.healthStatus}
            onChange={(value) => update("healthStatus", value)}
            options={(HEALTH_OPTIONS_BY_SPECIES[form.species] || []).map((value) => [value, value])}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Vacinacao" value={String(form.vaccinated)} onChange={(value) => update("vaccinated", value === "true")} options={[["true", "Vacinado"], ["false", "Nao vacinado"]]} />
          <Select label="Castracao" value={String(form.castrated)} onChange={(value) => update("castrated", value === "true")} options={[["true", "Castrado"], ["false", "Nao castrado"]]} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Criancas" value={form.childrenCompatibility} onChange={(value) => update("childrenCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
          <Select label="Gatos" value={form.catsCompatibility} onChange={(value) => update("catsCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Caes" value={form.dogsCompatibility} onChange={(value) => update("dogsCompatibility", value)} options={COMPATIBILITY_OPTIONS.map((item) => [item.value, item.label])} />
          <Select label="Nivel de energia" value={form.energyLevel} onChange={(value) => update("energyLevel", value)} options={ENERGY_LEVELS.map((item) => [item.value, item.label])} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Cidade" value={form.city} onChange={(value) => update("city", value)} required />
          <Input label="Bairro" value={form.neighborhood} onChange={(value) => update("neighborhood", value)} />
        </div>
        <Input label="URL da foto" value={form.image} onChange={(value) => update("image", value)} />
        <p className="-mt-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">
          Use apenas imagens horizontais em JPG, PNG ou WEBP, preferencialmente 1200x800 ou proporcao 3:2 / 4:3.
        </p>
        <label className="text-sm text-slate-300">
          Descricao
          <textarea
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            className="mt-1 min-h-28 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-400"
            required
          />
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">
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
            <img src={pet.image || pet.image_url} alt={pet.name} className="h-20 w-20 rounded-lg bg-slate-950 object-contain" />
            <div>
              <h3 className="font-semibold">{pet.name}</h3>
              <p className="text-sm text-slate-400">{pet.city} - {pet.age || "idade nao informada"}</p>
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
              <button onClick={() => onEdit(pet)} className="rounded-lg border border-slate-600 p-2 text-slate-200 hover:bg-slate-700" aria-label="Editar pet">
                <Edit3 className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(pet.id)} className="rounded-lg border border-red-500/30 p-2 text-red-300 hover:bg-red-500/10" aria-label="Remover pet">
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
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Nome da ONG" value={form.name || ""} onChange={(value) => update("name", value)} required />
        <Input label="Email" value={form.email || ""} onChange={(value) => update("email", value)} />
        <Input label="WhatsApp" value={form.whatsapp || ""} onChange={(value) => update("whatsapp", value)} required />
        <Input label="Cidade" value={form.city || ""} onChange={(value) => update("city", value)} required />
        <Input label="Bairro" value={form.neighborhood || ""} onChange={(value) => update("neighborhood", value)} />
      </div>
      <label className="mt-3 block text-sm text-slate-300">
        Descricao
        <textarea
          value={form.description || ""}
          onChange={(event) => update("description", event.target.value)}
          className="mt-1 min-h-28 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-400"
        />
      </label>
      <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">
        <Save className="h-4 w-4" />
        Salvar dados
      </button>
    </form>
  );
}

function Input({ label, value, onChange, required, placeholder }) {
  return (
    <label className="text-sm text-slate-300">
      {label}
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="text-sm text-slate-300">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-400"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}
